# セール検索フィルターの要件メモ

## 背景

FANZA の検索では、セール一覧や特定セールの一覧にいる状態でキーワード検索をすると、検索後の URL から `campaign` などのセール条件が消えることがある。

例:

```text
https://video.dmm.co.jp/av/list/?campaign=all&sort=suggest
```

上記のセール一覧で `センズリ` を検索すると、以下に遷移する。

```text
https://video.dmm.co.jp/av/list/?key=%E3%82%BB%E3%83%B3%E3%82%BA%E3%83%AA
```

本来は、セール品に絞ったまま検索したい。

一方で、検索結果画面にある `すべてのセール` リンクをクリックした場合は、以下のように `campaign=all` と `key` が両方付いた URL へ遷移できる。

```text
https://video.dmm.co.jp/av/list/?campaign=all&key=%E3%82%BB%E3%83%B3%E3%82%BA%E3%83%AA
```

ただし、その状態から再度キーワード検索をすると、また `campaign` が消える。

このため、特定の操作をした時だけしかセール品検索ができず不便。

## 解決したいこと

FANZA の検索窓からキーワード検索をした時に、選択したセール条件を維持したい。

拡張機能で検索窓の近くにセール選択用のプルダウンを追加し、選択したセールで絞り込んだ検索ができるようにする。

## 想定する仕様

- 検索窓の近くに、セール選択用のプルダウンを追加する
- プルダウンには、現在のページから取得できるセールを表示する
- セール情報は、ページ内にあるセールリンクから取得する
- セール名と URL パラメータをセットで扱う
- 選択したセール条件は、ページを移動しても維持する
- キーワード検索時は、選択中のセール条件を検索後 URL に付ける
- 検索後に FANZA 側の処理でセール条件が消えた場合も、拡張側で復元する
- 保存済みのセール条件が現在ページのセール一覧に存在しない場合は、自動で「指定なし」に戻す
- 古いセール条件を使い続けないように、存在しない保存値は削除する

## セール情報の扱い

セールは時期によって変わるため、固定値として持たない。

ページにアクセスする都度、以下のようなリンクからセール名とパラメータを取得する。

```html
<a href="/av/list/?campaign=ideapocketcp&key=..."
  >アイポケキャンペーン30％OFF第9弾</a
>
```

内部では、以下のような形で持つ。

```ts
type SaleFilter = {
  label: string;
  paramName: 'campaign' | 'point_campaign';
  paramValue: string;
};
```

`campaign` だけでなく、ポイント還元のような `point_campaign` も扱えるようにする。

## 選択状態の扱い

選択中のセール条件は、`chrome.storage` に保存する。

保存する例:

```ts
{
  label: 'アイポケキャンペーン30％OFF第9弾',
  paramName: 'campaign',
  paramValue: 'ideapocketcp'
}
```

保存済みの値が現在ページから取得したセール一覧に存在する場合は、そのセールを選択状態にする。

存在しない場合は、セールが終了した可能性があるため、自動で「指定なし」に戻し、保存済みの値も削除する。

一致判定はセール名ではなく、以下で行う。

```text
paramName
paramValue
```

## URL 補正の例

キーワードが `乳首`、選択中のセールが `campaign=ideapocketcp` の場合。

FANZA 側が以下に遷移したとしても、

```text
https://video.dmm.co.jp/av/list/?key=%E4%B9%B3%E9%A6%96
```

拡張側で以下に補正する。

```text
https://video.dmm.co.jp/av/list/?campaign=ideapocketcp&key=%E4%B9%B3%E9%A6%96
```

## 実装上の注意

FANZA は Vue の SPA アプリケーションのように見えるため、通常のページ読み込みだけではなく、DOM の再描画や URL 変更に追従する必要がある。

そのため、以下を使う想定。

- `MutationObserver`
- `history.pushState` / `history.replaceState` の監視
- `popstate` の監視

既存の `historyWatcher.ts` に URL 変更監視の仕組みがあるため、その考え方を流用できそう。
