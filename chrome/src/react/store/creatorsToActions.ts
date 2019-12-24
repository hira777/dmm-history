type ReturnTypes<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? ReturnType<T[K]>
    : never;
};
type Unbox<T> = T extends { [K in keyof T]: infer U } ? U : never;

export type CreatorsActions<T> = Unbox<ReturnTypes<T>>;
