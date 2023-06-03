import React, { ChangeEvent, useState } from 'react';

interface TextFieldsProps {
  value: string;
  className?: string;
  size?: 'lg' | 'sm';
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function TextFields({
  value,
  onChange,
  size = 'sm',
  placeholder = '',
  className,
}: TextFieldsProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(e);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const width = getStyleClassNamesBySize(size);
  const inputStyle = {
    width,
    color: '#1E1E1E',
  };

  const placeholderStyle = {
    color: isFocused ? '#C7C7D0' : '#1E1E1E',
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        className={`rounded ${className}`}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={`${placeholder}`}
        style={inputStyle}
      />
    </div>
  );
}

function getStyleClassNamesBySize(size: TextFieldsProps['size']) {
  if (size === 'sm') {
    return '150px';
  }

  return '325px';
}
