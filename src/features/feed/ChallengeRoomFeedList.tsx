import { useRouter } from 'next/router';
import { Fragment, useMemo } from 'react';

import { shallow } from 'zustand/shallow';

import { Spacing } from '@/shared/components';
import { DateChip } from '@/shared/components/date-chip';
import { PageLoading } from '@/shared/components/loading';
import { useIntersectionObserver, useScrollToBottom } from '@/shared/hooks';
import useKeepScrollPosition from '@/shared/hooks/useKeepScrollPosition';
import { useRoom } from '@/shared/store/room';
import { isFeedDateDifferent } from '@/shared/utils/date';

import { MyFeed } from './MyFeed';
import { OthersFeed } from './OthersFeed';
import { useChallengeRoomFeedList } from './queries';

const INITIAL_VALUE_OFFSET_RECORD_ID = 0;

// TODO: 비즈니스 로직을 커스텀 훅으로 빼도 좋을 것.
export const ChallengeRoomFeedList = () => {
  const challengeId = useRoom((state) => state.challengeId, shallow);

  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useChallengeRoomFeedList({
      challengeId,
      offsetRecordId: INITIAL_VALUE_OFFSET_RECORD_ID,
    });

  const router = useRouter();

  const feeds = useMemo(
    () =>
      data ? data.pages.flatMap(({ result }) => result.challengeFeedList) : [],
    [data],
  );

  const hasUsedInfiniteScroll = feeds.length > 20;
  const { bottomRef } = useScrollToBottom({
    earlyReturn: hasUsedInfiniteScroll,
  });
  const { intersectedRef } = useIntersectionObserver(fetchNextPage, {});
  const { containerRef } = useKeepScrollPosition([feeds]);

  const handleClickFeed = (recordId: number) => {
    router.push(
      `/expense-details?challengeId=${challengeId}&recordId=${recordId}`,
    );
  };

  // TODO: react-error-boundary, suspense 도입하기
  if (isLoading) {
    <PageLoading />;
  }

  if (isError) {
    router.push('/not-found');
    return null;
  }

  return (
    <div className="-z-10 bg-gray-10 px-5" ref={containerRef}>
      {hasNextPage && <div ref={intersectedRef} />}
      <ul className="flex flex-col-reverse">
        <Spacing height={32} />
        {/* TODO: 서버 데이터 그대로 넘기기  */}
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
                  onClickFeed={handleClickFeed}
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
                  onClickFeed={handleClickFeed}
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
