import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import { Input } from '@/shared/components/input';

type StylesNames = {
  rightSection: string;
  input: string;
};

type BaseProps = {
  rightSection?: React.ReactNode;
  classNames?: Partial<StylesNames>;
};

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & BaseProps;

type DisplayTextProps = {
  maxLength?: number;
  value?: string;
};

const DisplayText = ({ maxLength, value }: DisplayTextProps) => {
  return (
    <div className="pointer-events-none relative right-0 top-0 flex h-full items-center px-4 text-gray-50">
      <span className={cn(value?.length && 'text-black')}>{value?.length}</span>
      <p> /</p>
      {maxLength}
    </div>
  );
};

/**
 *
 * @example
 <TextInput
 rightSection={
        <span>
          <IconArrowUpFill />
        </span>
      }
 placeholder="댓글을 남겨보세요."
 />
 */
const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, classNames, rightSection, ...props }, ref) => {
    const [value, setValue] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };
    return (
      <div
        className={cn(
          'font-body-regular-sm relative flex h-11 w-[265px] items-center rounded-lg border-transparent bg-gray-10 caret-[#FF916F] focus:outline-none',
          className,
        )}
      >
        <Input
          ref={ref}
          value={value}
          onChange={handleChange}
          className={cn(classNames?.input)}
          {...props}
        />
        {props.maxLength && (
          <DisplayText
            maxLength={props.maxLength}
            value={props.value?.toString() || value}
          />
        )}
        {rightSection && (
          <div className={cn(classNames?.rightSection, 'pr-4 text-gray-50')}>
            {rightSection}
          </div>
        )}
      </div>
    );
  },
);
TextInput.displayName = 'TestField';

export { TextInput };
