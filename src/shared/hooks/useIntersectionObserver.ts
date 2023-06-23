/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import { RefObject, useEffect } from 'react';

type Option = IntersectionObserverInit & {
  triggerOnlyOnce?: boolean;
};

type IntersectingCallback = (() => void) | (() => Promise<void>);

export default function useIntersectionObserver(
  targetRef: RefObject<HTMLElement>,
  doWhenIntersecting: IntersectingCallback,
  option: Option,
) {
  useEffect(() => {
    if (!targetRef || !targetRef.current) {
      return;
    }

    const target = targetRef.current;
    const observer = createObserver(doWhenIntersecting, option);
    observer.observe(target);

    return () => observer && observer.disconnect();
  }, [doWhenIntersecting, option, targetRef]);
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
