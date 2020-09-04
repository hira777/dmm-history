import { Input, InputProps as Props } from './Input';
export { Input };
// 以下のように type を再度 export しないと、Storybook で警告がでる
// Babel が InputProp が type かどうか判断できるようにするため、以下のようにしている。
// https://github.com/babel/babel/issues/6065#issuecomment-321071003
// https://github.com/babel/babel/issues/6065#issuecomment-321121848
export type InputProps = Props;
