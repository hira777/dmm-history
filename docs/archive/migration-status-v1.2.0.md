# migration-status-v1.2.0.md

## 目的

このファイルは、React・TypeScript・Manifest V3 への移行作業の履歴を残すためのものです。
移行作業は完了済みのため、現在は archive として保管しています。

## 現在の全体状況

- 状態: React / TypeScript / Manifest V3 への主要移行は完了
- 優先度が高い作業: 残タスクの整理とリリース前確認
- 現在の大きな課題: 実サイトの DOM 変更に備えた取得処理の保守性を上げる

## 進行ルール

- 作業はフェーズごとのチェックリストで管理する
- 完了したら、確認内容も短く残す
- 保留した場合は、理由を書く

## 作業一覧

- フェーズ 1: **移行準備** — 現状確認から作業ルール作成まで
  - [x] 現状の構成を確認する。
    - [x] Vue 2 / Webpack 4 / Manifest V2 / TypeScript 3 系であることを確認する。
    - [x] 旧構成では `node-sass` が Node.js 24.7.0 で扱いにくいことを確認する。
  - [x] 移行計画を作成する。
    - [x] `docs/migration-plan.md` を追加する。
  - [x] 作業ルールを作成する。
    - [x] `AGENTS.md` を追加する。
  - [x] 進行状況を管理するファイルを作成する。
    - [x] `MIGRATION_STATUS.md` を追加する。

- フェーズ 2: **ビルド基盤の更新** — Node.js 24.7.0 / pnpm / Webpack 5 でビルドできる状態にする
  - [x] Node.js のバージョンを `.node-version` に合わせる。
    - [x] Node.js 24.7.0 を前提にする。
  - [x] パッケージ管理を pnpm に移行する。
    - [x] `packageManager` を pnpm にする。
    - [x] `pnpm-lock.yaml` を追加する。
  - [x] Webpack を更新する。
    - [x] Webpack 5 系へ更新する。
    - [x] `pnpm build` が通ることを確認する。
  - [x] Sass のビルド基盤を更新する。
    - [x] `node-sass` を削除する。
    - [x] Dart Sass の `sass` に置き換える。
    - [x] Bulma を削除し、自前 SCSS に置き換える。
    - [x] Sass 関連のビルド警告を解消する。

- フェーズ 3: **Manifest V3 対応** — Chrome 拡張を MV3 で読み込める状態にする
  - [x] `chrome/manifest.json` を Manifest V3 向けに更新する。
    - [x] `manifest_version` を `3` にする。
    - [x] `browser_action` を `action` に変更する。
    - [x] `permissions` と `host_permissions` を整理する。
  - [x] popup の画面遷移を MV3 向けに変更する。
    - [x] `window.open` を `chrome.tabs.create` に変更する。
  - [x] ビルド済み拡張を Chrome に読み込む。
    - [x] 拡張を読み込み、起動できることを確認する。

- フェーズ 4: **React / TypeScript 移行** — Vue の履歴画面を React に置き換える
  - [x] React の土台を作成する。
    - [x] React / React DOM を追加する。
    - [x] TSX の最小構成を追加する。
    - [x] `pnpm check-types` と `pnpm build` が通ることを確認する。
  - [x] 履歴画面を React に置き換える。
    - [x] Vue の entry を React の entry に変更する。
    - [x] Vue 関連のソースと依存を削除する。
    - [x] `pnpm check-types` と `pnpm build` が通ることを確認する。
  - [x] React 履歴画面を整理する。
    - [x] component / hook / utils に分割する。
    - [x] `pnpm check-types` が通ることを確認する。

- フェーズ 5: **開発環境の整理** — TypeScript / ESLint / Prettier を現在の構成に合わせる
  - [x] 不要な Babel / Jest 関連を削除する。
    - [x] Babel 関連の依存と設定ファイルを削除する。
    - [x] Jest 関連の依存と設定ファイルを削除する。
  - [x] TypeScript と ESLint を更新する。
    - [x] TypeScript 6 系へ更新する。
    - [x] ESLint 10 系へ更新する。
    - [x] ESLint flat config へ移行する。
  - [x] 不要な `jsconfig.json` を削除する。
    - [x] TypeScript 設定へ集約する。
  - [x] Prettier を追加する。
    - [x] Prettier 本体を追加する。
    - [x] Prettier 設定と ignore 設定を追加する。
    - [x] format 用 script を追加する。
  - [x] 既存ファイルを Prettier で整形する。
    - [x] HTML / JSON / SCSS / TypeScript ファイルを整形する。

- フェーズ 6: **テストとドキュメント整備** — 移行後の保守性を上げる
  - [x] テスト方針を決める。
    - [x] Vitest を追加する。
    - [x] まずテストする純粋関数を選ぶ。
  - [x] テストを追加する。
    - [x] keyword の utils から着手する。
    - [x] 既存の utils テストを `chrome/src/utils` 配下へ移動する。
    - [x] historyCard の utils へテストを追加する。
  - [x] README を更新する。
    - [x] Node.js / pnpm / build / test 手順を更新する。
    - [x] Manifest V3 と React 構成に合わせて説明を更新する。

- フェーズ 7: **手動動作確認** — Chrome 拡張として最低限の動作を確認する
  - [x] ビルド済み拡張を Chrome に読み込む。
    - [x] 拡張を起動できることを確認する。
  - [x] 履歴画面の基本動作を確認する。
    - [x] 履歴保存・一覧表示・検索・削除を確認する。
    - [x] popup から履歴画面へ遷移できることを確認する。

## 直近でやること

1. 残っている DMM / FANZA 表記の扱いを確認する
2. 必要であればアイコンやリリース名を FANZA History に合わせる
3. `itemPage` の DOM 取得処理にテストや補助関数を追加する

## 課題・注意点

- Chrome 拡張としての一通りの手動確認は完了済み
- 実サイトの DOM 変更があると `itemPage` の取得処理が壊れる可能性がある

## メモ

- 推奨ブランチ名: `chore/react-ts-mv3-migration`
- Node.js のバージョンは `.node-version` の `24.7.0` に合わせる
- パッケージ管理は pnpm を使う
- 詳細な移行方針は `docs/migration-plan.md` を参照
