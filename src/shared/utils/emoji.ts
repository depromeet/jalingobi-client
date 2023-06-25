import { emojiType } from '@/types/feed';

export function createEmojiInfo(
  type: emojiType,
  count: number,
  selected: emojiType | null,
) {
  return {
    type,
    count,
    selected: selected === type,
  };
}
