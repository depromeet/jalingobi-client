import { useRouter } from 'next/router';
import { Fragment, useMemo } from 'react';

import { isEmpty } from 'lodash-es';

import { Spacing } from '@/shared/components';
import { useIntersectionObserver, useScrollToBottom } from '@/shared/hooks';
import useKeepScrollPosition from '@/shared/hooks/useKeepScrollPosition';

import { EmojiContainer } from '../emoji/EmojiContainer';

import { Feed } from './Feed';
import { FeedDate } from './FeedDate';
import { NoChallengeAvailable } from './NoChallengeAvailable';
import { useMyRoomFeedList } from './queries';

const INITIAL_VALUE_OFFSET = 0;

// TODO: 비즈니스 로직을 커스텀 훅으로 빼도 좋을 것.
export const MyRoomFeedList = () => {
  const router = useRouter();

  const { data, isError, hasNextPage, fetchNextPage } = useMyRoomFeedList({
    offset: INITIAL_VALUE_OFFSET,
  });

  const feeds = useMemo(
    () =>
      data
        ? data.pages
            .flatMap(({ result }) => result.myFeedList)
            .map(({ recordInfo, challengeInfo, emojiInfo }) => {
              return {
                recordId: recordInfo.id,
                recordImgUrl: recordInfo.imgUrl,
                title: recordInfo.title,
                price: recordInfo.price,
                content: recordInfo.content,
                recordDate: recordInfo.date,
                challengeId: challengeInfo.id,
                challengeImgUrl: challengeInfo.imgUrl,
                challengeTitle: challengeInfo.title,
                emojiInfo,
              };
            })
        : [],
    [data],
  );

  const { containerRef } = useKeepScrollPosition([feeds]);
  const hasUsedInfiniteScroll = feeds.length > 20;
  const { bottomRef } = useScrollToBottom({
    earlyReturn: hasUsedInfiniteScroll,
  });
  const { intersectedRef } = useIntersectionObserver(fetchNextPage, {});

  const handleClickFeed = (
    recordId: number,
    challengeId: string | undefined,
  ) => {
    router.push(
      `/expense-details?challengeId=${challengeId}&recordId=${recordId}`,
    );
  };

  // TODO: react-error-boundary
  if (isError) {
    router.push('/not-found');
    return null;
  }

  if (isEmpty(feeds)) {
    return (
      <NoChallengeAvailable
        title="아직 지출 기록이 없어요."
        description="거지방 챌린지를 시작해보세요."
      />
    );
  }

  return (
    <div className="-z-10 overflow-y-auto bg-gray-10 px-5" ref={containerRef}>
      <ul className="flex flex-col-reverse">
        <Spacing height={32} />
        {feeds.map((feedData, index) => {
          return (
            <Fragment key={feedData.recordId}>
              <div>
                <Feed {...feedData} onClickFeed={handleClickFeed} />
                <EmojiContainer
                  emojiInfo={feedData.emojiInfo}
                  challengeId={feedData.challengeId}
                  recordId={feedData.recordId}
                />
              </div>
              <FeedDate
                currentFeedDate={feeds[index].recordDate}
                nextFeedDate={feeds[index + 1]?.recordDate}
              />
            </Fragment>
          );
        })}
        {hasNextPage && <div ref={intersectedRef} />}
      </ul>
      <div ref={bottomRef} />
    </div>
  );
};
