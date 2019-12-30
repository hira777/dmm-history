# メモ

## TSX で styled-components の [css prop](https://www.styled-components.com/docs/api#css-prop)を利用する術がわからなかった。

型エラーは以下を`index.d.ts`とかに記述しておけば解消。

`import {} from 'styled-components/cssprop';`

https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31245#issuecomment-446011384

css prop を利用するためには、`babel-plugin-styled-components`が必要なので、ts-loader と babel-loader を繋いでビルドしたがだめだった（ts-lodaer の時点で JSX はコンパイルされているのでそりゃそうだろうといった感じ）。

[`typescript-plugin-styled-components`](https://github.com/Igorbek/typescript-plugin-styled-components)を利用すれば解決できるかもしれない。