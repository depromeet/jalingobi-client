import { useEffect, useRef } from 'react';

const useScrollToBottom = ({ earlyReturn }: { earlyReturn?: boolean }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bottomRef.current || earlyReturn) {
      return;
    }

    bottomRef.current.scrollIntoView();
  }, [[bottomRef.current]]);

  return { bottomRef };
};

export { useScrollToBottom };
