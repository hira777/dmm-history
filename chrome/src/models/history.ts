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
  hasSampleVideo: boolean;
  sampleVideoUrl: string | null;
  sampleVideoPlayCount: number | null;
  favoriteCount: number | null;
}>;
export type Histories = History[] | [];
