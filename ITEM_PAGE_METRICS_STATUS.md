# ITEM_PAGE_METRICS_STATUS.md

## 目的

このファイルは、商品ページから追加の指標を取得する対応の状況を残すためのものです。
対象は、サンプル動画の有無、サンプル動画の再生回数、お気に入り登録数です。

## 現在の全体状況

- 状態: 実装中
- 対象ページ: URL履歴保存対象の商品ページ
- 現在の大きな課題: 実サイトでiframe内の再生回数を正しく受け取れるか確認する

## 進行ルール

- DOM取得処理は `chrome/src/utils/itemPage.ts` にまとめる
- 履歴保存処理は `chrome/src/chrome/historySaver.ts` にまとめる
- 実サイトのDOM変更に備えて、取得処理にはテストを追加する
- 確認できていないことは、このファイルに残す

## 作業一覧

- フェーズ 1: **履歴データの拡張**
  - [x] `History` 型にサンプル動画関連の項目を追加する
    - [x] `hasSampleVideo` を追加する
    - [x] `sampleVideoPlayCount` を追加する
  - [x] `History` 型にお気に入り登録数を追加する
    - [x] `favoriteCount` を追加する
  - [x] モック履歴と既存テストの履歴データを新しい型に合わせる

- フェーズ 2: **商品ページのDOM取得処理**
  - [x] サンプル動画プレイヤーのiframe有無を取得する
  - [x] サンプル動画の再生回数を取得する
  - [x] お気に入り登録数を取得する
  - [x] 件数文字列を数値に変換する補助関数を追加する
  - [x] 追加した取得処理のテストを追加する

- フェーズ 3: **iframe内の再生回数取得**
  - [x] iframe用のcontent scriptを追加する
  - [x] iframe側から親ページへ再生回数を送る
  - [x] 親ページ側で受け取った再生回数を履歴保存に使う
  - [x] `manifest.json` にiframe用content scriptを追加する
  - [x] `webpack.config.js` にiframe用entryを追加する

- フェーズ 4: **確認**
  - [x] `git diff --check` で空白エラーがないことを確認する
  - [ ] `pnpm format:check` を実行する
  - [ ] `pnpm check-types` を実行する
  - [ ] `pnpm test` を実行する
  - [ ] `pnpm build` を実行する
  - [ ] 実サイトの商品ページで手動確認する

## 手動確認したいこと

- サンプル動画がある商品で `hasSampleVideo` が `true` になる
- サンプル動画がない商品で `hasSampleVideo` が `false` になる
- iframe内の再生回数が `sampleVideoPlayCount` に保存される
- お気に入り登録数が `favoriteCount` に保存される
- 既存の履歴保存、一覧表示、検索、削除が動く

## 課題・注意点

- サンプル動画の再生回数はiframe内にあるため、iframe用content scriptから親ページへ送っている
- この環境では `node`、`pnpm`、`mise` がPATHに無く、型チェックやテストをまだ実行できていない
- 実サイトのDOM構造が変わると、取得処理を見直す必要がある

## メモ

- 推奨ブランチ名: `feat/item-page-metrics`
- 追加した主なファイル:
  - `chrome/src/chrome/sampleVideoReader.ts`
  - `chrome/src/models/sampleVideo.ts`
- 変更した主なファイル:
  - `chrome/src/chrome/historySaver.ts`
  - `chrome/src/utils/itemPage.ts`
  - `chrome/manifest.json`
  - `chrome/webpack.config.js`
