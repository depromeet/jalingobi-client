import React, { MouseEvent } from 'react';

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
    <button
      type="button"
      className={`relative inline-flex aspect-video cursor-pointer items-center ${className}`}
      style={{ width }}
    >
      <input
        type="checkbox"
        id="toggle"
        checked={checked}
        className="peer sr-only"
        onClick={onChange}
      />
      <div
        className={`
        peer
        h-[100%]

        w-[100%]
        rounded-full

        bg-gray-30
        after:absolute
        after:left-[6%]
        after:top-[7.5%]
        after:h-[85%]

        after:w-[48%]
        after:rounded-full
        after:bg-white
        after:transition-all
        after:content-['']
        peer-checked:bg-primary
        peer-checked:after:translate-x-[85%]
        peer-checked:after:border-white
        peer-focus:outline-none
      `}
      />
    </button>
  );
}

function getStyleClassNamesBySize(size: ToggleProps['size']) {
  if (size === 'sm') {
    return '30px';
  }

  return '48px';
}
