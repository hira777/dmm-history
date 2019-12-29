import { DEFAULT_FONT_SIZE } from '@/react/constants';

export default function pxToRem(value: number, font = DEFAULT_FONT_SIZE) {
  return `${value / font}rem`;
}
