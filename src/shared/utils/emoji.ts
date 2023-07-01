import { EmojiType } from '@/shared/types/feed';

export function createEmojiInfo(
  type: EmojiType,
  count: number,
  selected: EmojiType | null,
) {
  return {
    type,
    count,
    selected: selected === type,
  };
}
