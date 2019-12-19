type ReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? ReturnType<T[K]>
    : never;
};
type Unbox<T> = T extends { [K in keyof T]: infer U } ? U : never;

export type CreatorsActions<T> = Unbox<ReturnTypes<T>>;
