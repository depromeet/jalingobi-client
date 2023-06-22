import { Fragment } from 'react';

import { DateChip } from '@/pages/my-poor-room/DateChip';
import { Spacing } from '@/shared/components';
import { useScrollToBottom } from '@/shared/hooks';
import { isFeedDateDifferent } from '@/shared/utils/date';

import { MyFeed } from './MyFeed';
import { useMyRoomFeedList } from './queries';

export const MyRoomFeedList = () => {
  const offset = 0;

  const { data, isLoading, isError } = useMyRoomFeedList({
    offset,
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
    <div className="-z-10 overflow-y-auto bg-gray-10 px-5">
      <ul className="flex flex-col-reverse">
        <Spacing height={32} />
        {data.result.myFeedList.map(
          ({ recordInfo, challengeInfo, emojiInfo }, index) => {
            return (
              <Fragment key={recordInfo.id}>
                {/* TODO: 서버 데이터랑 네이밍 통일 */}
                <MyFeed
                  recordId={recordInfo.id}
                  recordImgUrl={recordInfo.imgUrl}
                  title={recordInfo.title}
                  price={recordInfo.price}
                  content={recordInfo.content}
                  recordDate={recordInfo.date}
                  challengeImgUrl={challengeInfo.imgUrl}
                  challengeTitle={challengeInfo.title}
                  emojiInfo={emojiInfo}
                  onClickFeed={(id) => console.log(`Feed Id: ${id}`)}
                />
                {isFeedDateDifferent({
                  currentFeed: data.result.myFeedList[index],
                  nextFeed: data.result.myFeedList[index + 1],
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
