import { Fragment } from 'react';

import { DateChip } from '@/pages/my-poor-room/DateChip';
import { Spacing } from '@/shared/components';
import { useScrollToBottom } from '@/shared/hooks';
import { useRoom } from '@/shared/store/room';
import { isFeedDateDifferent } from '@/shared/utils/date';

import { MyFeed } from './MyFeed';
import { OthersFeed } from './OthersFeed';
import { useChallengeRoomFeedList } from './queries';

export const ChallengeRoomFeedList = () => {
  const challengeId = useRoom((state) => state.challengeId);
  const offsetRecordId = 0;

  const { data, isLoading, isError } = useChallengeRoomFeedList({
    challengeId,
    offsetRecordId,
  });

  const { bottomRef } = useScrollToBottom({ deps: isLoading });

  // TODO: react-error-boundary, suspense 도입하기
  if (isLoading) {
    return <>...Loading</>;
  }

  if (isError) {
    return <>Error Page</>;
  }

  return (
    <div className="-z-10 bg-gray-10 px-5">
      <ul className="flex flex-col-reverse">
        <Spacing height={32} />
        {data.result.challengeFeedList.map(
          ({ isMine, userInfo, recordInfo, emojiInfo }, index) => {
            // TODO: 서버 데이터랑 네이밍 통일
            return (
              <Fragment key={recordInfo.id}>
                {isMine ? (
                  <MyFeed
                    recordId={recordInfo.id}
                    recordImgUrl={recordInfo.imgUrl}
                    title={recordInfo.title}
                    price={recordInfo.price}
                    content={recordInfo.content}
                    recordDate={recordInfo.date}
                    emojiInfo={emojiInfo}
                    onClickFeed={(id) => console.log(`Feed Id: ${id}`)}
                  />
                ) : (
                  <OthersFeed
                    recordId={recordInfo.id}
                    recordImgUrl={recordInfo.imgUrl}
                    title={recordInfo.title}
                    price={recordInfo.price}
                    content={recordInfo.content}
                    recordDate={recordInfo.date}
                    profileImgUrl={userInfo.imgUrl}
                    nickname={userInfo.nickname}
                    currentCharge={userInfo.currentCharge}
                    emojiInfo={emojiInfo}
                    onClickFeed={(id) => console.log(`Feed Id: ${id}`)}
                  />
                )}
                {isFeedDateDifferent({
                  currentFeed: data.result.challengeFeedList[index],
                  nextFeed: data.result.challengeFeedList[index + 1],
                }) ? (
                  <DateChip date={recordInfo.date} />
                ) : (
                  <Spacing height={32} />
                )}
              </Fragment>
            );
          },
        )}
      </ul>
      <div ref={bottomRef} />
    </div>
  );
};
