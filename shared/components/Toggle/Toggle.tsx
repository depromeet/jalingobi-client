import React, { MouseEvent, useState } from 'react';

interface ToggleProps {
  checked: boolean;
  className?: string;
  size?: 'lg' | 'sm';
  onChange: (e: MouseEvent<HTMLInputElement>) => void;
}

export function Toggle({
  checked,
  onChange,
  size = 'sm',
  className,
}: ToggleProps) {
  const width = getStyleClassNamesBySize(size);

  return (
    <label className={`relative inline-flex items-center cursor-pointer aspect-video ${className}`} style={{ width }} >
      <input type="checkbox" checked={checked} className="sr-only peer" onClick={onChange} />
      <div className={`
        w-[100%]
        h-[100%]

        bg-gray-30
        rounded-full

        peer
        peer-focus:outline-none
        peer-checked:bg-primary
        peer-checked:after:translate-x-[85%]
        peer-checked:after:border-white

        after:w-[48%]
        after:h-[85%]
        after:content-['']
        after:absolute
        after:top-[7.5%]
        after:left-[6%]
        after:bg-white
        after:rounded-full
        after:transition-all
      `}/>
    </label>
  );
}

function getStyleClassNamesBySize(size: ToggleProps['size']) {
  if (size === 'sm') {
    return '30px';
  }

  return '48px';
}
