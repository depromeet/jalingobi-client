import { reactType } from '@/types/feed';

export function createEmojiInfo(
  type: reactType,
  count: number,
  selected: reactType | null,
) {
  return {
    type,
    count,
    selected: selected === type,
  };
}
