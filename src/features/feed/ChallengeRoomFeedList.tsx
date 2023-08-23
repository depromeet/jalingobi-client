import { useRouter } from 'next/router';
import { Fragment, useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash-es';
import { shallow } from 'zustand/shallow';

import { Spacing } from '@/shared/components';
import { useIntersectionObserver, useScrollToBottom } from '@/shared/hooks';
import useKeepScrollPosition from '@/shared/hooks/useKeepScrollPosition';
import { useRoom } from '@/shared/store/room';
import { ChallengeListResponse } from '@/shared/types/feed';

import { EmojiContainer } from '../emoji/EmojiContainer';

import { Feed } from './Feed';
import { FeedCreationDate } from './FeedCreationDate';
import { FeedDate } from './FeedDate';
import { NoChallengeAvailable } from './NoChallengeAvailable';
import { useChallengeRoomFeedList } from './queries';
import { RecrutingChallenge } from './RecrutingChallenge';

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

  const { data, isError, hasNextPage, fetchNextPage } =
    useChallengeRoomFeedList({
      challengeId,
      offsetRecordId: INITIAL_VALUE_OFFSET_RECORD_ID,
    });

  const router = useRouter();

  const feeds = useMemo(
    () =>
      data
        ? data.pages
            .flatMap(({ result }) => result.challengeFeedList)
            .map(({ isMine, userInfo, recordInfo, emojiInfo, challengeInfo }) =>
              isMine
                ? {
                    isMine,
                    recordId: recordInfo.id,
                    recordImgUrl: recordInfo.imgUrl,
                    title: recordInfo.title,
                    price: recordInfo.price,
                    content: recordInfo.content,
                    recordDate: recordInfo.date,
                    challengeId: challengeInfo?.id,
                    emojiInfo,
                  }
                : {
                    isMine,
                    recordId: recordInfo.id,
                    recordImgUrl: recordInfo.imgUrl,
                    title: recordInfo.title,
                    price: recordInfo.price,
                    content: recordInfo.content,
                    recordDate: recordInfo.date,
                    profileImgUrl: userInfo.imgUrl,
                    nickname: userInfo.nickname,
                    currentCharge: userInfo.currentCharge,
                    challengeId: challengeId.toString(),
                    emojiInfo,
                  },
            )
        : [],
    [data],
  );

  const { containerRef } = useKeepScrollPosition([feeds]);
  const hasUsedInfiniteScroll = feeds.length > 20;
  const { bottomRef } = useScrollToBottom({
    earlyReturn: hasUsedInfiniteScroll,
  });
  const { intersectedRef } = useIntersectionObserver(fetchNextPage, {});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClickFeed = (recordId: number, _: string | undefined) => {
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

  // TODO: react-error-boundary

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
        {feeds.map(({ isMine, ...feedData }, index) => {
          return (
            <Fragment key={feedData.recordId}>
              {isMine ? (
                <div>
                  <Feed {...feedData} onClickFeed={handleClickFeed} />
                  <EmojiContainer
                    emojiInfo={feedData.emojiInfo}
                    challengeId={feedData.challengeId}
                    recordId={feedData.recordId}
                  />
                  <FeedCreationDate
                    date={dayjs(feedData.recordDate).format('A hh:mm')}
                  />
                </div>
              ) : (
                <div>
                  <Feed {...feedData} onClickFeed={handleClickFeed} />
                  <EmojiContainer
                    emojiInfo={feedData.emojiInfo}
                    challengeId={feedData.challengeId}
                    recordId={feedData.recordId}
                  />
                  <FeedCreationDate
                    date={dayjs(feedData.recordDate).format('A hh:mm')}
                  />
                </div>
              )}
              <FeedDate
                currentFeedDate={feeds[index].recordDate}
                nextFeedDate={feeds[index + 1]?.recordDate}
              />
            </Fragment>
          );
        })}
        {hasNextPage && <div ref={intersectedRef} />}
        <Spacing height={53} />
      </ul>
      <div ref={bottomRef} />
    </div>
  );
};
