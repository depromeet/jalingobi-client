import React, { RefObject } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
) => {
  const handleClick = (e: MouseEvent) => {
    console.log('first');
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };
  React.useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};
