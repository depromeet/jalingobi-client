import { Fragment, useMemo, useRef } from 'react';

import { DateChip } from '@/pages/my-poor-room/DateChip';
import { Spacing } from '@/shared/components';
import { useIntersectionObserver, useScrollToBottom } from '@/shared/hooks';
import { useRoom } from '@/shared/store/room';
import { isFeedDateDifferent } from '@/shared/utils/date';

import { MyFeed } from './MyFeed';
import { OthersFeed } from './OthersFeed';
import { useChallengeRoomFeedList } from './queries';

export const ChallengeRoomFeedList = () => {
  const challengeId = useRoom((state) => state.challengeId);

  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useChallengeRoomFeedList({
      challengeId,
      offsetRecordId: null,
    });

  const feeds = useMemo(
    () =>
      data ? data.pages.flatMap(({ result }) => result.challengeFeedList) : [],
    [data],
  );
  const hasUsedInfiniteScroll = feeds.length > 20;

  const { bottomRef } = useScrollToBottom({
    earlyReturn: hasUsedInfiniteScroll,
  });

  const topRef = useRef<HTMLDivElement>(null);
  useIntersectionObserver(topRef, fetchNextPage, {});

  // TODO: react-error-boundary, suspense 도입하기
  if (isLoading) {
    return <>...Loading</>;
  }

  if (isError) {
    return <>Error Page</>;
  }

  return (
    <div className="-z-10 bg-gray-10 px-5">
      {hasNextPage && <div ref={topRef} />}
      <ul className="flex flex-col-reverse">
        <Spacing height={32} />
        {/* TODO: 서버 데이터랑 네이밍 통일 */}
        {feeds.map(({ isMine, userInfo, recordInfo, emojiInfo }, index) => {
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
                currentFeed: feeds[index],
                nextFeed: feeds[index + 1],
              }) ? (
                <DateChip date={recordInfo.date} />
              ) : (
                <Spacing height={32} />
              )}
            </Fragment>
          );
        })}
      </ul>
      <div ref={bottomRef} />
    </div>
  );
};
