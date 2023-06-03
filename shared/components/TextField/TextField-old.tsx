import React, { ChangeEvent, useState } from 'react';

import { cn } from '@/shared/utils';

interface TextFieldsProps {
  value: string;
  className?: string;
  type?: 'default' | 'price' | 'memo' | 'comment';
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function TextFields({
  value,
  onChange,
  type = 'default',
  placeholder = '',
  className,
}: TextFieldsProps) {
  const [text, setText] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setText(newValue);
    onChange(e);
  };

  const getDisplayText = () => {
    if (type === 'price') {
      return ` 원`;
    }
    return `${text.length}/16`;
  };

  const getInputClassName = () => {
    const common =
      'left-5 top-5 h-11 w-[271px] px-3 pr-4 pl-3 text-black caret-[#FF916F]';
    if (type === 'price') {
      return cn(common, 'text-right');
    }
    if (type === 'memo') {
      return cn(common, 'text-right');
    }
    if (type === 'comment') {
      return cn(common, 'text-right');
    }
    return common;
  };

  return (
    <div className="relative rounded-lg bg-white">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder={`${placeholder}`}
        className={getInputClassName()}
      />

      <span className="absolute right-5 top-1/2 -translate-y-1/2 transform text-sm text-[#9EA3AD]">
        {getDisplayText()}
      </span>
    </div>
  );
}
