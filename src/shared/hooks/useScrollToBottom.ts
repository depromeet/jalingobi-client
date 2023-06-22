import { useEffect, useRef } from 'react';

const useScrollToBottom = (deps?: any) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bottomRef.current) {
      return;
    }
    bottomRef.current.scrollIntoView();
  }, [deps ? [bottomRef.current, deps] : [bottomRef.current]]);

  return { bottomRef };
};

export { useScrollToBottom };
