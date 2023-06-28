/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import { useEffect, useRef } from 'react';

type Option = IntersectionObserverInit & {
  triggerOnlyOnce?: boolean;
};

type IntersectingCallback = (() => void) | (() => Promise<void>);

export default function useIntersectionObserver(
  doWhenIntersecting: IntersectingCallback,
  option: Option,
) {
  const intersectedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!intersectedRef || !intersectedRef.current) {
      return;
    }

    const target = intersectedRef.current;
    const observer = createObserver(doWhenIntersecting, option);
    observer.observe(target);

    return () => observer && observer.disconnect();
  }, [doWhenIntersecting, option, intersectedRef]);

  return { intersectedRef };
}

const createObserver = (
  doWhenIntersecting: IntersectingCallback,
  option: Option,
): IntersectionObserver => {
  const { triggerOnlyOnce = false, ...initOption } = option;

  const callback = getIntersectionObserverCallback(
    doWhenIntersecting,
    triggerOnlyOnce,
  );

  return new IntersectionObserver(callback, initOption);
};

const getIntersectionObserverCallback =
  (
    doWhenIntersecting: IntersectingCallback,
    triggerOnlyOnce = false,
  ): IntersectionObserverCallback =>
  async ([entry], observer) => {
    if (entry.isIntersecting) {
      await doWhenIntersecting();
      triggerOnlyOnce && observer.unobserve(entry.target);
    }
  };
