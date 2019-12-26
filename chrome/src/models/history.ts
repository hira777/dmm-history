export type Prices = number[];
export type History = {
  readonly id: string;
  readonly title: string;
  readonly href: string;
  readonly imageUrl: string;
  readonly prices: Prices;
  salePrices: Prices | null;
  saleLimitTime: string | null;
};
export type Histories = History[];
