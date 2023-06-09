import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import { Input } from '@/shared/components/input';

type StylesNames = {
  rightSection: string;
  input: string;
};

type BaseProps = {
  rightSection?: React.ReactNode;
  countLength?: number;
  classNames?: Partial<StylesNames>;
};

type Props = React.HTMLAttributes<HTMLDivElement> & BaseProps;

type DisplayTextProps = {
  maxLength?: number;
  value: string;
};

const DisplayText = ({ maxLength, value }: DisplayTextProps) => {
  return (
    <div className="pointer-events-none relative right-0 top-0 flex h-full items-center px-4 text-gray-50">
      <div>
        <span className={cn(value.length && 'text-black')}>
          {value.length}/
        </span>
        {maxLength}
      </div>
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
const TextInput = React.forwardRef<HTMLInputElement, Props>(
  ({ countLength, className, classNames, rightSection, ...props }, ref) => {
    const [value, setValue] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return (
      <div
        className={cn(
          'font-body-regular-sm relative flex h-11 w-[265px] items-center rounded-lg border-transparent bg-white caret-[#FF916F] focus:outline-none',
          className,
        )}
      >
        <Input
          {...props}
          ref={ref}
          maxLength={countLength}
          onChange={handleChange}
          className={cn(classNames?.input)}
        />
        {countLength && <DisplayText maxLength={countLength} value={value} />}
        {rightSection && (
          <div className={cn(classNames?.rightSection, 'px-4 text-gray-50')}>
            {rightSection}
          </div>
        )}
      </div>
    );
  },
);
TextInput.displayName = 'TestField';

export { TextInput };
