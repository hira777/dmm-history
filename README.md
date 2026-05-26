# FANZA History

FANZAの商品閲覧履歴を保存・表示する拡張機能。

現在、拡張機能はChrome Web Store上にホストされていなければインストールできない。

そのため、この拡張を利用するためには拡張の実行ファイルをダウンロードし、それをChromeに読み込む必要がある。詳細は後述。

バージョンのアップデート情報は[こちら](https://github.com/hira777/dmm-history/releases)。

## インストール方法

1. FANZA Historyの実行ファイルである[chrome.zip](https://github.com/hira777/dmm-history/releases/download/v1.0.6/chrome.zip)をダウンロード。
2. ダウンロードした`chrome.zip`を任意の場所に解凍する。
3. 以下のように「パッケージ化されていない拡張機能を読み込む」を選択し、解凍したディレクトリを選択すれば拡張が読み込まれる。

![インストール](./media/install.gif 'インストール')

## 使い方

![インストール](./media/usage.gif '使い方')

- 拡張が有効な状態で、商品ページを開くと履歴が保存されます。
- 拡張をクリックするとポップアップが表示され、「履歴を見る」をクリックすると履歴ページに遷移します。
- 履歴は削除と絞り込み検索ができます。
- 履歴の最大保存数は300であり、それを超えると新しい履歴を追加される度に古い履歴が削除されます。

## 情報の取り扱いに関して

- 本拡張では、ユーザーが訪問した動画商品ページの情報のみを、拡張のローカルストレージに保存して利用しています。
- 本拡張では、個人情報、または機密情報の収集はしておりません。
- 本拡張では、個人情報、または機密情報を送信しておりません。
- 本拡張では、個人情報、または機密情報を第三者に開示しておりません。

## 補足

- 本拡張では履歴ページの商品URLにDMMアフィリエイトIDを追加しています（サイト登録申請はGitHubのリポジトリURLを申請に出したら審査が通りました）。
- 本拡張で利用している画像は、DMMアフィリエイトで画像の使用許可が出ているものを利用しております。

## 開発

技術スタック:

- React
- TypeScript
- Manifest V3

開発環境:

- Node.js
- pnpm

Node.js のバージョンは `.node-version` に書かれているものに合わせてください。

初回は依存パッケージをインストールします。

```bash
pnpm install
```

変更後は、以下のコマンドで問題がないか確認します。

```bash
pnpm check-types
pnpm test
pnpm build
```

- `pnpm check-types`: TypeScript の型エラーがないか確認します。
- `pnpm test`: Vitest でテストを実行します。
- `pnpm build`: Chrome 拡張として読み込むためのファイルを `chrome/build` に出力します。

`pnpm build` 後は、Chrome の拡張機能ページから `chrome` ディレクトリを「パッケージ化されていない拡張機能」として読み込めます。

履歴画面の見た目だけを確認したい場合は、開発サーバーを起動します。

```bash
pnpm dev:history
```

このコマンドでは `http://localhost:8080/history.html` が開きます。
開発サーバーで起動した時だけ仮の履歴データを使うため、Chrome 拡張として読み込まなくても履歴画面の見た目を確認できます。

## リリース手順

リリース時は、`package.json` の `version` を正とします。
`chrome/manifest.json` の `version` は script で同期します。

patch バージョンを上げる場合は、以下を実行します。

```bash
pnpm bump:patch
```

minor または major バージョンを上げる場合は、以下を使います。

```bash
pnpm bump:minor
pnpm bump:major
```

バージョン更新後、変更を commit します。

```bash
git add package.json chrome/manifest.json
git commit -m "chore: バージョンを更新"
```

リリース前に、version 同期、型チェック、テスト、ビルド、zip 作成が通ることを確認します。

```bash
pnpm release:prepare
```

`main` に merge した後、`v1.2.3` のようなタグを作成して push します。

```bash
git tag v1.2.3
git push origin v1.2.3
```

タグを push すると、GitHub Actions が GitHub Release を作成し、`chrome.zip` を添付します。
タグが `main` に含まれない commit を指している場合、Release workflow は失敗します。

## License

[MIT](http://opensource.org/licenses/MIT)
