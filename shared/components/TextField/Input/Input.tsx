import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { IconArrowUpFill } from '@/public/svgs';

const inputVariants = cva(
  'w-[265px] rounded-lg border-transparent bg-white text-xs text-black caret-[#FF916F] focus:outline-none',
  {
    variants: {
      variant: {
        default: 'h-[44px]',
        price: 'h-[44px] text-right',
        memo: 'h-[128px] resize-none px-3 pt-3',
        comment: 'h-[44px]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  displayText: string | undefined;
}

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants> {
  displayText: string | undefined;
}

export interface DivProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inputVariants> {
  value: string;
  displayText: string | undefined;
}

const InputLabel = React.forwardRef<HTMLDivElement, DivProps>(
  ({ value, displayText, className, variant, ...props }, ref) => {
    return (
      <div>
        {(variant === 'default' || variant === 'memo') && (
          <span className={`text-${value.length > 0 ? 'black' : 'gray'}`}>
            {value.length}
          </span>
        )}
        <span className={`${variant === 'price' && 'px-3'}`}>
          {displayText}
        </span>
      </div>
    );
  },
);
InputLabel.displayName = 'InputLabel';

const getDisplayTextByVariant = (variant: string | null | undefined) => {
  if (variant === 'default') {
    return `/16`;
  }
  if (variant === 'price') {
    return ` 원`;
  }
  if (variant === 'memo') {
    return `/80`;
  }
  if (variant === 'comment') {
    return ``;
  }
  return ``;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ displayText, className, variant, ...props }, ref) => {
    const [text, setText] = React.useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
      if (props.onChange) {
        props.onChange(e);
      }
    };

    const formatNumberWithCommas = (value: string): string => {
      const numericValue = parseFloat(value.replace(/,/g, ''));
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(numericValue)) {
        return value;
      }
      return numericValue.toLocaleString();
    };

    const displayTextValue = displayText || getDisplayTextByVariant(variant);

    return (
      <label className="left-5 top-5 h-11 w-[271px] px-3 pl-3 pr-4 text-black caret-[#FF916F]">
        <input
          type="text"
          className={inputVariants({ variant, className })}
          value={variant === 'price' ? formatNumberWithCommas(text) : text}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        <div className="absolute right-5 top-1/2 w-[26px] -translate-y-1/2 transform text-sm text-[#9EA3AD]">
          <InputLabel
            value={text}
            displayText={displayTextValue}
            variant={variant}
          />
          {variant === 'comment' ? <IconArrowUpFill /> : ''}
        </div>
      </label>
    );
  },
);
Input.displayName = 'Input';

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ displayText, className, variant, ...props }, ref) => {
    const [text, setText] = React.useState('');
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
      if (props.onChange) {
        props.onChange(e);
      }
    };

    const displayTextValue = displayText || getDisplayTextByVariant(variant);
    return (
      <div>
        <textarea
          className={inputVariants({ variant, className })}
          value={text}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        <div className="absolute bottom-[16px] right-5 w-[26px] -translate-y-1/2 transform text-sm text-[#9EA3AD]">
          <InputLabel
            value={text}
            displayText={displayTextValue}
            variant={variant}
          />
          {variant === 'comment' ? <IconArrowUpFill /> : ''}
        </div>
      </div>
    );
  },
);
TextArea.displayName = 'TextArea';

export { TextArea, Input, inputVariants };
