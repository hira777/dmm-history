export type Prices = number[];
export type History = Readonly<{
  id: string;
  title: string;
  href: string;
  imageUrl: string;
  maker: string;
  label: string;
  prices: Prices;
  salePrices: Prices | null;
  saleLimitTime: string | null;
}>;
export type Histories = History[] | [];
