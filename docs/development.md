# 開発

## 技術スタック

- React
- TypeScript
- Manifest V3

## 開発環境

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
