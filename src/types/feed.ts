export type TEmojiInfo = {
  selectedEmoji: string | null;
  crazy: number;
  regretful: number;
  wellDone: number;
  comment: number;
};

export type TChallengeFeed = {
  isMine: boolean;
  userInfo: {
    imgUrl: string;
    nickname: string;
    currentCharge: number;
  };
  recordInfo: {
    id: number;
    imgUrl: string;
    title: string;
    content: string;
    price: number;
    date: string;
  };
  emojiInfo: TEmojiInfo;
};

export type TMyFeed = {
  recordInfo: {
    id: number;
    imgUrl: string;
    title: string;
    content: string;
    price: number;
    date: string;
  };
  challengeInfo: {
    imgUrl: string;
    title: string;
  };
  emojiInfo: {
    selectedEmoji: string | null;
    crazy: number;
    regretful: number;
    wellDone: number;
    comment: number;
  };
};
