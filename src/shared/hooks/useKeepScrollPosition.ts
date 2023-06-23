import { useRef, useLayoutEffect, useMemo } from 'react';

const useKeepScrollPosition = (deps: any[]) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousScrollPosition = useRef<number>(0);

  useMemo(() => {
    if (containerRef?.current) {
      const container = containerRef?.current;
      previousScrollPosition.current =
        container.scrollHeight - container.scrollTop;
    }
  }, [...deps]);

  // TODO: window가 아닌 특정 Ref의 scroll값을 변경시키도록 수정하면 좋을 듯.
  useLayoutEffect(() => {
    if (containerRef?.current) {
      const container = containerRef?.current || {};

      window.scrollTo(
        0,
        container.scrollHeight - previousScrollPosition.current,
      );
    }
  }, [...deps]);

  return {
    containerRef,
  };
};

export default useKeepScrollPosition;
