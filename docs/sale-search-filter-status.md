# sale-search-filter-status.md

## 目的

このファイルは、セール検索フィルター機能の作業ステップを管理するためのものです。

要件の詳細は `docs/sale-search-filter.md` を参照します。

## 現在の全体状況

- 状態: フェーズ7まで実装済み
- 優先度が高い作業: 確認
- 現在の大きな課題: 実サイトで SPA 遷移と DOM 再描画への追従を確認すること

## 進行ルール

- 作業はフェーズごとのチェックリストで管理する
- 完了したら、確認内容も短く残す
- 保留した場合は、理由を書く
- 実サイトの DOM に依存する処理は、補助関数に分けてテストしやすくする
- 1回の変更で大きく作りすぎず、段階的に確認する

## 作業一覧

- フェーズ 1: **調査と設計** - 実サイトの構造と挙動を確認する
  - [x] 検索窓周辺の DOM 構造を確認する
  - [x] セールリンク一覧の DOM 構造を確認する
  - [x] キーワード検索時の URL 変更の流れを確認する
  - [x] 今回は `/av/list/` の `campaign` のみ扱う方針を確認する
  - [x] プルダウンを差し込む場所を決める

- フェーズ 2: **セール情報の取得** - ページ内リンクからセール選択肢を作る
  - [x] セールリンクから `label` / `paramValue` を抽出する関数を作る
  - [x] `campaign` を持つリンクを取得できるようにする
  - [x] 重複するセール条件を除外する
  - [x] セール情報取得処理のテストを追加する

- フェーズ 3: **スクリプトの土台作成** - 拡張機能として読み込む準備をする
  - [x] content script の入口ファイルを `chrome/src/chrome` に追加する
  - [x] `chrome/webpack.config.js` に新しい entry を追加する
  - [x] `chrome/manifest.json` の `content_scripts` に出力JSを追加する
  - [x] 対象URLの `matches` を `/av/` 配下にする
  - [x] 既存の `historyWatcher.ts` と同じページで動く場合の役割分担を確認する

- フェーズ 4: **UI 追加** - 検索窓付近にプルダウンを表示する
  - [x] 検索窓を見つける処理を作る
  - [x] セール選択用プルダウンを作る
  - [x] 「指定なし」を選択肢に含める
  - [x] 既存レイアウトを大きく崩さない位置に差し込む
  - [x] DOM 再描画時に二重追加されないようにする

- フェーズ 5: **選択状態の保存** - ページ移動後も選択したセールを維持する
  - [x] 選択中のセール条件を `chrome.storage` に保存する
  - [x] 保存済みのセール条件を読み込んで選択状態に戻す
  - [x] 保存済みのセール条件が現在のセール一覧に存在するか確認する
  - [x] 存在しない場合は「指定なし」に戻す
  - [x] 存在しない保存値を削除する

- フェーズ 6: **URL 補正** - 検索時にセール条件を維持する
  - [x] 選択中のセール条件を URL に付ける処理を作る
  - [x] キーワード検索後に `campaign` が消えた場合に復元する
  - [x] 「指定なし」の場合はセール条件を付けない

- フェーズ 7: **SPA 対応** - URL 変更と DOM 再描画に追従する
  - [x] `MutationObserver` で検索窓とセールリンクの出現を監視する
  - [x] `history.pushState` / `history.replaceState` の変更に追従する
  - [x] `popstate` に追従する
  - [x] 既存の `historyWatcher.ts` との役割分担を確認する
  - [x] 監視処理が重くなりすぎないようにする

- フェーズ 8: **確認** - 自動確認と手動確認を行う
  - [ ] `pnpm format:check` を実行する
  - [ ] `pnpm check-types` を実行する
  - [ ] `pnpm test` を実行する
  - [ ] `pnpm build` を実行する
  - [ ] 実サイトで検索窓付近にプルダウンが表示されることを確認する
  - [ ] 「すべてのセール」で検索条件が維持されることを確認する
  - [ ] 特定セールで検索条件が維持されることを確認する
  - [ ] 終了したセール条件が「指定なし」に戻ることを確認する

## フェーズ 1 調査メモ

- 対象は `/av/list/` の `campaign` のみにする
- `point_campaign` は今回の実装対象外にする
- 検索フォームは `form#frmSearch`
- 検索フォームの親は `._n4v1-search`
- `form#frmSearch` の中は `display: table` / `table-cell` 前提のため、プルダウンは `form` 内に入れない
- プルダウンは `._n4v1-search` の直前に差し込む
- セールリンクは左サイドバーの `data-e2eid="sidebar-menu"` 内にある
- セールリンク取得は `/av/list/` かつ `campaign` を持つリンクに絞る
- セール名はリンクの `textContent` から取得し、空白を整理する
- キーワード検索時、`campaign=all`、特定 `campaign`、`campaign` と `key` がある状態の再検索はいずれも検索後 URL から `campaign` が消える
- 検索時に `campaign` が消える前提で、拡張側で復元する

## フェーズ 2 実装メモ

- `chrome/src/utils/saleFilter.ts` にセール情報取得用の純粋関数を追加した
- `createSaleFilter` はリンクの `textContent` を `label` にし、URL の `campaign` を `paramValue` にする
- フェーズ 1 の方針どおり、今回は `/av/list/` の `campaign` のみ対象にした
- `point_campaign` と `/amateur/list/` などは対象外にした
- 同じ `campaign` は `uniqueSaleFilters` で最初の1件だけ残す
- `chrome/src/utils/saleFilter.test.ts` に抽出、対象外リンク、重複除外、DOM 取得のテストを追加した

## フェーズ 3 実装メモ

- `chrome/src/chrome/saleSearchFilter.ts` を追加した
- `chrome/webpack.config.js` に `saleSearchFilter` の entry を追加した
- `chrome/manifest.json` に `build/saleSearchFilter.js` を追加した
- 対象URLは `https://video.dmm.co.jp/av/*` にした
- `historyWatcher.ts` は URL 変更イベントを投げる役、`saleSearchFilter.ts` は通常の content script として UI 追加や保存処理を担当する役に分ける

## フェーズ 4 実装メモ

- `chrome/src/utils/saleSearchFilterUi.ts` にUI追加処理を追加した
- `chrome/src/chrome/saleSearchFilter.scss` にプルダウンのスタイルを追加した
- `form#frmSearch` を起点に `._n4v1-search` を見つける
- セール選択UIは `._n4v1-search` の直前に差し込む
- 先頭の選択肢は「指定なし」にした
- `dmm-history-sale-filter` の固定IDで二重追加を防ぐ
- SPA再描画時は既存のプルダウンを再利用し、選択肢だけ更新する

## フェーズ 5 実装メモ

- `chrome/src/utils/saleSearchFilterStorage.ts` に選択状態の保存と復元処理を追加した
- `chrome/src/utils/saleSearchFilterStorage.test.ts` にセール条件の存在確認テストを追加した
- 選択中のセール条件は `chrome.storage.local` の `saleSearchFilter` に保存する
- 「指定なし」を選んだ場合は保存済みのセール条件を削除する
- 保存済みのセール条件が現在のセール一覧に存在する場合だけ選択状態に戻す
- 保存済みのセール条件が現在のセール一覧に存在しない場合は「指定なし」に戻し、保存値を削除する
- 一致判定は `paramName` と `paramValue` で行う

## フェーズ 6 実装メモ

- `chrome/src/utils/saleSearchFilterUrl.ts` にURL補正用の純粋関数を追加した
- `/av/list/` かつ `key` を持つURLだけをキーワード検索結果として扱う
- 保存済みのセール条件が現在のセール一覧に存在する場合だけURL補正に使う
- キーワード検索後に `campaign` が消えている場合は、選択中の `campaign` を付け直して `location.replace` する
- すでに同じ `campaign` が付いている場合や「指定なし」の場合は補正しない
- 検索フォームには選択中の `campaign` を hidden input として同期し、送信時点でセール条件が付くようにした
- セール条件があるキーワード検索では、フォーム送信時に `/av/list/` のセール条件付きURLへ先に遷移する
- セール条件がある状態でキーワードなし検索をした場合は、`/av/list/?campaign=...` へ遷移する
- URLに `key` と `campaign` がある検索結果では、プルダウン変更時に同じキーワードでセール条件を切り替えて再検索する
- セール解除リンクで同じキーワードの `campaign` なしURLへ遷移する場合は、保存済みのセール条件も解除する
- URLに有効な `campaign` がある場合は、保存済みの選択状態よりURLを優先してプルダウンへ反映する
- `chrome/src/utils/saleSearchFilterUrl.test.ts` にURL補正のテストを追加した

## フェーズ 7 実装メモ

- `chrome/src/chrome/saleSearchFilter.ts` に常時の `MutationObserver` を追加した
- DOM 再描画で検索フォームやセールリンクが差し替わった場合に、セール検索フィルターの処理を再実行する
- 再実行は短い遅延でまとめ、DOM変更が連続した時に処理が走りすぎないようにした
- `history.pushState` / `history.replaceState` の検知は、既存の `historyWatcher.ts` が `URL_CHANGE_EVENT` を投げる役として担当する
- `saleSearchFilter.ts` は `URL_CHANGE_EVENT` と `popstate` を受け取り、UI追加や保存状態の反映をやり直す役にした
- `chrome/src/utils/saleSearchFilterUi.ts` は、選択肢が変わっていない場合に DOM を更新しないようにした
- UI更新による DOM 変更で監視処理が余計に動き続けないようにした

## 直近でやること

1. 実サイトでSPA遷移後もプルダウンが表示されることを確認する
2. 検索結果から別ページへ移動して戻った時の選択状態を確認する
3. フェーズ8の確認項目を進める

## 課題・注意点

- FANZA 側の DOM 変更で壊れる可能性がある
- Vue の SPA らしいため、初回読み込みだけではなく再描画への対応が必要
- セール名は変わる可能性があるため、一致判定は `paramName` と `paramValue` で行う
- 古い `campaign` を使い続けると意図しない検索結果になる可能性がある
- UI を検索窓の左に入れると既存レイアウトを崩す可能性があるため、差し込み位置は実サイトで確認する

## メモ

- 推奨ブランチ名: `feat/sale-search-filter`
- 要件メモ: `docs/sale-search-filter.md`
- セール条件なしの表示名は「指定なし」とする
- 保存済みのセール条件が現在の一覧にない場合は、自動で「指定なし」に戻す
