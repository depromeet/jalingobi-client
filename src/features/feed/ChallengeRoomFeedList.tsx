import { useRouter } from 'next/router';
import { Fragment, useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash-es';
import { shallow } from 'zustand/shallow';

import { Spacing } from '@/shared/components';
import { DateChip } from '@/shared/components/date-chip';
import { PageLoading } from '@/shared/components/loading';
import { useIntersectionObserver, useScrollToBottom } from '@/shared/hooks';
import useKeepScrollPosition from '@/shared/hooks/useKeepScrollPosition';
import { useRoom } from '@/shared/store/room';
import { ChallengeListResponse } from '@/shared/types/feed';
import { isFeedDateDifferent } from '@/shared/utils/date/date';

import { RecrutingChallenge } from './ChallengeRoomRecruting';
import { MyFeed } from './MyFeed';
import { NoChallengeAvailable } from './MyRoomEmpty';
import { OthersFeed } from './OthersFeed';
import { useChallengeRoomFeedList } from './queries';

const INITIAL_VALUE_OFFSET_RECORD_ID = null;

// TODO: 비즈니스 로직을 커스텀 훅으로 빼도 좋을 것.
export const ChallengeRoomFeedList = () => {
  const challengeId = useRoom((state) => state.challengeId, shallow);

  const queryClient = useQueryClient();
  const categoryList = queryClient.getQueryData<ChallengeListResponse>([
    'challengeList',
  ]);

  const currentCategoryInfo =
    categoryList?.result.participatedChallengeList.find(
      ({ challengeId: _challengeId }) => _challengeId === challengeId,
    );

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

  const { containerRef } = useKeepScrollPosition([feeds]);
  const hasUsedInfiniteScroll = feeds.length > 20;
  const { bottomRef } = useScrollToBottom({
    earlyReturn: hasUsedInfiniteScroll,
  });
  const { intersectedRef } = useIntersectionObserver(fetchNextPage, {});

  const handleClickFeed = (recordId: number) => {
    router.push(
      `/expense-details?challengeId=${challengeId}&recordId=${recordId}`,
    );
  };

  if (currentCategoryInfo?.status === 'RECRUITING') {
    return (
      <RecrutingChallenge
        title={currentCategoryInfo?.title}
        participants={currentCategoryInfo?.participants}
        maxParticipants={currentCategoryInfo?.maxParticipants}
      />
    );
  }

  // TODO: react-error-boundary, suspense 도입하기
  if (isLoading) {
    return <PageLoading />;
  }

  if (isError) {
    router.push('/not-found');
    return null;
  }

  if (isEmpty(feeds)) {
    return (
      <NoChallengeAvailable
        title={currentCategoryInfo?.title ?? ''}
        subtitle={`참여 인원 ${currentCategoryInfo?.participants}명 / ${currentCategoryInfo?.maxParticipants}명`}
        description={
          <>
            <p className="font-body-regular-sm text-gray-70">
              아무도 지출 기록을 올리지 않았어요.
            </p>
            <p className="text-gray- font-body-regular-sm">
              지출 기록의 첫번째 주인공이 되어보세요.
            </p>
          </>
        }
      />
    );
  }

  return (
    <div className="-z-10 bg-gray-10 px-5" ref={containerRef}>
      <ul className="flex flex-col-reverse">
        <Spacing height={32} />
        {/* TODO: 서버 데이터 그대로 넘기기  */}
        {feeds.map(
          (
            { isMine, userInfo, recordInfo, emojiInfo, challengeInfo },
            index,
          ) => {
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
                    challengeId={challengeInfo.id}
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
          },
        )}
        {hasNextPage && <div ref={intersectedRef} />}
        <Spacing height={53} />
      </ul>
      <div ref={bottomRef} />
    </div>
  );
};
