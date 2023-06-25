import { useEffect, useRef } from 'react';

const useScrollToBottom = () => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bottomRef.current) {
      return;
    }
    bottomRef.current.scrollIntoView();
  }, [bottomRef.current]);

  return { bottomRef };
};

export { useScrollToBottom };
