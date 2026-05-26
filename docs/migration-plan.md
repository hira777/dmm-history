# 移行計画

## 目的

このプロジェクトを、現在の古い構成から次の状態へ移行する。

- Chrome Extension Manifest V3 に対応する
- Vue.js を React に置き換える
- TypeScript を全面的に使う
- 古い依存関係を安全に更新する
- ついでに、今のコードや構成で直した方がよい点を改善する

## 現状整理

現状はおおむね次の構成になっている。

- Vue 2
- Webpack 4
- Manifest V2
- TypeScript 3 系
- Jest 24 系
- テストはほぼ未整備

特に `manifest_version: 2` は先に解消する必要がある。2025年7月24日に Manifest V2 は無効化されているため、2026年5月22日現在は継続利用に向かない。

## 方針

一度に全部変えない。次の順番で段階的に進める。

1. 現状を壊さずに確認できる状態を作る
2. Chrome 拡張として今後も動くように MV3 へ移行する
3. ビルド基盤を新しくする
4. Vue を React に置き換える
5. TypeScript とテストを整える
6. 最後に依存関係を上げ切る

依存更新を最初にまとめてやると、原因の切り分けが難しくなるため避ける。

## 段階ごとの進め方

### 1. 現状確認

#### 目的

移行前の動作を把握し、途中で壊れた時に気づけるようにする。

#### やること

- `npm install` を行い、依存関係が復元できるか確認する
- `npm run build`
- `npm run lint`
- `npm run check-types`
- `npm test`
- Chrome 拡張として最低限の手動確認を行う
- 今の動作を README または別メモに残す

#### 確認したい点

- 商品ページを開くと履歴が保存されるか
- ポップアップから履歴画面を開けるか
- 履歴一覧が表示されるか
- 検索と削除が動くか
- 保存件数の上限処理が正しいか

#### 完了条件

- 現状の成功パターンと失敗パターンが分かる
- 主要な動作確認項目が一覧化されている

### 2. Manifest V3 への移行

#### 目的

Chrome 拡張として今後も動く形にする。

#### やること

- `chrome/manifest.json` を MV3 形式へ変更する
- `browser_action` を `action` へ変更する
- 必要なら `host_permissions` を整理する
- `content_scripts` と `storage` 利用の挙動を確認する
- MV3 で不要または非推奨な書き方を直す

#### このプロジェクトで見ておく点

- 今のところ background script は見当たらないので、MV3 移行は比較的軽い可能性がある
- `window.open` ではなく `chrome.tabs.create` の方が拡張らしい実装として扱いやすい
- 将来 `chrome.*` API の Promise 化も検討できる

#### 完了条件

- MV3 の manifest で拡張が読み込める
- 既存の主要機能が壊れていない

### 3. ビルド基盤の更新

#### 目的

React と新しい TypeScript を扱いやすい構成へ変える。

#### やること

- Webpack 4 を継続するか、Vite などへ移すか決める
- 可能なら Vite ベースへ移行する
- Babel と ts-loader の構成を整理する
- `node-sass` をやめて `sass` へ切り替える
- lint と typecheck の実行方法を新構成に合わせる

#### 推奨

- React 化まで考えると Vite の方が進めやすい
- ただし Chrome 拡張向けの出力構成を確認してから進める

#### 完了条件

- 開発用ビルドと本番用ビルドが安定して動く
- 出力先と拡張の読み込み手順が整理されている

### 4. Vue から React への移行

#### 目的

UI 層を React + TSX に統一する。

#### 対象

- `chrome/src/vue/App.vue`
- `chrome/src/vue/components/*`
- `chrome/src/vue/store/*`
- `chrome/src/vue/histories.ts`

#### やること

- 画面ごとに React コンポーネントへ置き換える
- エントリポイントを `createRoot` ベースへ変更する
- `.vue` を `.tsx` へ移す
- Vuex の状態管理を React 標準の state に寄せる
- 必要なら軽量な状態管理ライブラリを使う

#### 進め方

1. 履歴画面のルートを React 化する
2. ナビゲーション、検索入力、カード一覧の順に小さく移す
3. 最後に状態管理を置き換える
4. Vue と React が混在する期間をできるだけ短くする

#### 完了条件

- Vue 関連パッケージを削除できる
- 履歴画面が React のみで動作する

### 5. TypeScript の整理

#### 目的

型の抜け漏れを減らし、保守しやすくする。

#### やること

- `.js` を必要に応じて `.ts` へ移す
- `.tsx` を使う構成へ統一する
- `tsconfig` を見直す
- 型定義を `models` や `types` に集約する
- DOM 参照や Chrome API の型を明確にする

#### このプロジェクトで改善したい点

- `document.getElementById(...) as HTMLElement` のような強い型変換を減らす
- storage まわりの入出力型をより厳密にする
- URL 文字列組み立てや履歴整形の責務を分ける

#### 完了条件

- `npm run check-types` が通る
- 危ない型変換が減っている

### 6. テスト整備

#### 目的

移行中の壊れ方を早く見つける。

#### やること

- まずは純粋関数からテストを書く
- `chrome/src/utils/history.ts`
- `chrome/src/utils/matchAllKeywords.ts`
- `chrome/src/utils/itemPage.ts` のうち分離しやすい部分
- React 化後は UI テストも最小限追加する

#### テスト方針

- ロジックの単体テストを先に作る
- DOM が必要な部分は後回しでもよい
- `describe` と `it` の文言は日本語にする

#### 完了条件

- 履歴の追加、重複排除、上限処理、検索などがテストで守られている

### 7. 依存関係の更新

#### 目的

最後にまとめて新しい構成へ合わせる。

#### やること

- Vue 系依存を削除する
- React, React DOM, TypeScript, ESLint, Jest などを現在の構成に合わせて更新する
- 不要な Babel 依存を削る
- lockfile を更新する

#### 注意

- 依存更新は段階ごとに分けて commit する
- 大きすぎる一括更新は避ける

#### 完了条件

- 不要な依存が消えている
- 現在の構成で必要な依存だけ残っている

## 今のコードで改善候補

移行とは別に、次の改善余地がある。

- popup の画面遷移処理を見直す
- storage アクセスを一か所に寄せる
- DOM 取得とページ解析処理を分離する
- テストしやすいように純粋関数を増やす
- ディレクトリ名 `vue` は React 化後に役割ベースへ変更する
- README の導入手順を MV3 前提で更新する

## おすすめの作業単位

1. 現状確認と動作確認メモ作成
2. MV3 化
3. ビルド基盤更新
4. React の土台作成
5. 画面移行
6. テスト追加
7. 依存整理

1つの commit に複数の大きな目的を混ぜない方がよい。

## ブランチ案

第一候補:

- `chore/react-ts-mv3-migration`

短めにするなら:

- `chore/react-migration`
- `feature/react-ts-mv3`

この作業は改修範囲が広いため、意味がはっきりする `chore/react-ts-mv3-migration` を推奨する。
