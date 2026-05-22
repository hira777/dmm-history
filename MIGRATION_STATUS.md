# MIGRATION_STATUS.md

## 目的

このファイルは、React・TypeScript・Manifest V3 への移行作業の進行状況を管理するためのものです。
作業中に、今どこまで終わったか、次に何をやるか、何が課題かをすぐ確認できるようにします。

## 現在の全体状況

- 状態: ビルド基盤更新中
- 優先度が高い作業: TypeScript 整理
- 現在の大きな課題: Bulma と Sass まわりで非推奨警告が出ている

## 進行ルール

- 状態は `未着手` `進行中` `完了` `保留` で管理する
- 大きな作業はできるだけ小さな単位に分ける
- 完了したら、確認内容も短く残す
- 保留した場合は、理由を書く

## 作業一覧

| 作業 | 状態 | メモ |
| --- | --- | --- |
| 現状の構成確認 | 完了 | Vue 2 / Webpack 4 / Manifest V2 / TypeScript 3 系を確認 |
| 移行計画の作成 | 完了 | `docs/migration-plan.md` を追加済み |
| 作業ルールの作成 | 完了 | `AGENTS.md` を追加済み |
| 現状のビルド確認 | 保留 | 旧構成では `node-sass` が Node.js 24.7.0 で扱いにくいため、移行後に確認する |
| Manifest V3 対応 | 完了 | `manifest_version: 3` へ更新し、拡張の読み込みと起動確認済み |
| ビルド基盤の更新 | 進行中 | pnpm / Webpack 5 / Dart Sass 構成でビルド確認済み |
| React の土台作成 | 完了 | React / TSX の最小構成を追加し、型チェックとビルド確認済み |
| Vue の React 置き換え | 完了 | 履歴画面を React に置き換え、型チェックとビルド確認済み |
| TypeScript 整理 | 進行中 | React 履歴画面を component / hook / utils に分割 |
| テスト追加 | 未着手 | まずは純粋関数から |
| 依存関係の整理 | 進行中 | Babel / Jest 関連を削除 |
| README 更新 | 未着手 | MV3 と新構成に合わせる |

## 直近でやること

1. Sass の非推奨警告をどこまでこの段階で抑えるか決める
2. React 化前に必要な最小テストを検討する
3. TypeScript と lint 設定を整理する

## 課題・注意点

- `node-sass@^4.9.0` は古く、Node.js 24.7.0 環境でそのまま扱いにくい
- Dart Sass への移行後、Bulma 由来の非推奨警告が出ている
- Manifest V2 はすでに使い続けにくい状態なので、MV3 対応を先に進める必要がある
- テストが未整備なので、移行時の壊れ方に気づきにくい

## 完了ログ

### 2026-05-22

- 現状構成を確認
- 移行計画書を追加
- AGENTS.md を追加
- 進行状況管理ファイルを追加
- Node.js 24.7.0 前提で `node-sass` を `sass` に置き換え
- npm から pnpm へ移行
- Webpack 5 系へ更新し、`pnpm build` が通ることを確認
- `pnpm check-types` が通ることを確認
- Manifest V3 へ移行
- popup の履歴画面遷移を `chrome.tabs.create` に変更
- ビルド済み拡張を Chrome に読み込み、起動できることを確認
- React / TSX の最小構成を追加
- `pnpm check-types` と `pnpm build` が通ることを確認
- 履歴画面を React に置き換え
- Vue 関連のソースと依存を削除
- `pnpm check-types` が通ることを確認
- `pnpm build` が通ることを確認
- React 履歴画面を component / hook / utils に分割
- Babel / Jest 関連の依存と設定ファイルを削除

## メモ

- 推奨ブランチ名: `chore/react-ts-mv3-migration`
- Node.js のバージョンは `.node-version` の `24.7.0` に合わせる
- パッケージ管理は pnpm を使う
- 詳細な移行方針は `docs/migration-plan.md` を参照
