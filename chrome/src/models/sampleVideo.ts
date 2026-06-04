export const SAMPLE_VIDEO_INFO_MESSAGE = 'dmm-history:sample-video-info';

export type SampleVideoInfoMessage = Readonly<{
  type: typeof SAMPLE_VIDEO_INFO_MESSAGE;
  itemId: string;
  playCount: number | null;
}>;
