import { useContext } from 'react';

export default function createUseCtx<T>(
  name: string,
  context: React.Context<T>
): () => T {
  const useCtx = (): T => {
    const ctx = useContext(context);
    // Context Provider の外で Context を利用した場合エラーを出力する
    if (ctx === undefined) {
      throw new Error(`use${name} must be used withing a ${name}Provider.`);
    }
    return ctx;
  };

  return useCtx;
}
