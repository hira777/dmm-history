# AGENTS.md

## 目的

このファイルは、このリポジトリで作業する人やエージェント向けの作業ルールをまとめたものです。
Chrome 拡張の保守、改善、リリース作業を安全に進めることを目的とします。

## このプロジェクトの前提

- FANZA の商品閲覧履歴を保存・表示する Chrome 拡張です
- 現在の主な構成は以下です
  - Manifest V3
  - React
  - TypeScript
  - Webpack 5
  - pnpm
  - Vitest
  - ESLint flat config
  - Prettier
- Node.js のバージョンは `.node-version` に合わせます
- パッケージ管理は pnpm を使います
- `package.json` の `version` を正とし、`chrome/manifest.json` の `version` は script で同期します

## 作業前にやること

- 変更前に、何をやるかを短く説明する
- 影響するファイルを確認する
- 既存の変更を勝手に戻さない
- 大きな変更は一度にまとめて入れない
- 質問や相談だけの場合は、ファイルの追加や更新をしない

## 変更単位

1つのコミットや変更セットに、複数の大きな目的を混ぜないこと。

よい例:

- 表示ロジックの改善だけを行う
- `itemPage` の DOM 取得処理だけを整理する
- テスト追加だけを行う
- リリース設定だけを変更する

避けたい例:

- UI 変更、依存更新、リリース設定変更を同時に行う

## コード変更時の注意

- 既存のロジックを変える時は、挙動差分を明確にする
- DOM 取得とデータ整形の責務をできるだけ分ける
- 純粋関数にできる処理は切り出す
- 強い型変換をなるべく減らす
- Chrome API の利用箇所は分かりやすく保つ
- 実サイトの DOM 変更で壊れやすい処理は、テストまたは補助関数で保守しやすくする

## React / UI の方針

- React では関数コンポーネントを使う
- 状態管理はまず React 標準の state で足りるかを確認する
- 重い状態管理ライブラリは必要になるまで入れない
- SCSS は役割ごとに分割し、共通値は `variables` に集約する
- 自前のスタイルを基本とし、UI ライブラリは必要性が明確な場合だけ追加する

## テスト方針

- `describe` と `it` の文言は日本語にする
- まずは純粋関数のテストを優先する
- 次を優先して守る
  - 履歴追加
  - 重複排除
  - 最大件数の制御
  - 検索条件の判定
  - 価格表示とセール判定
- UI テストや E2E テストは、必要性が明確になってから最小限で追加する

## 依存関係の方針

- 依存更新は段階的に行う
- 不要な依存は放置せず削除する
- `node-sass`、Vue、Babel、Jest は再導入しない
- テストは Vitest を使う
- フォーマットは Prettier を使う

## 確認コマンド

変更後は、可能な範囲で次を確認すること。

```bash
pnpm format:check
pnpm check-types
pnpm test
pnpm build
```

必要に応じて ESLint も確認すること。

```bash
pnpm exec eslint chrome/src eslint.config.mjs scripts/sync-version.mjs
```

確認できていないものがあれば、作業報告で明記すること。

## Chrome 拡張としての手動確認

影響がある変更では、可能な範囲で次を確認すること。

- 商品ページを開くと履歴が保存される
- ポップアップから履歴画面を開ける
- 履歴一覧が表示される
- 検索が動く
- 削除が動く

## リリース方針

- バージョン更新は `pnpm bump:patch`、`pnpm bump:minor`、`pnpm bump:major` を使う
- リリース前に `pnpm release:prepare` を実行する
- tag は `main` に含まれる commit にだけ付ける
- `v1.2.3` のような tag を push すると GitHub Release が作成される
- Release workflow は `chrome.zip` を作成して GitHub Release に添付する

## ブランチ運用

- 通常の修正は目的が分かるブランチ名にする
- 例:
  - `fix/history-search`
  - `refactor/item-page-parser`
  - `test/history-utils`
  - `ci/release-workflow`

## 参考ファイル

- 移行計画: `docs/migration-plan.md`
- 移行作業の履歴: `docs/archive/migration-status-v1.2.0.md`
- リリース手順: `README.md`
