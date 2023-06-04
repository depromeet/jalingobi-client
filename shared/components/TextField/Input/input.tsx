import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { IconAdd } from '@/public/svgs';

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
    VariantProps<typeof inputVariants> {}

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants> {}

const InputLabel = ({ value, variant }: { value: string; variant: any }) => {
  const getDisplayText = (variant: string) => {
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

  return (
    <div>
      <span className={`text-${value.length > 0 ? 'black' : 'gray'}`}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {variant === 'default' || variant === 'memo' ? `${value}`.length : ''}
      </span>
      <span className={`${variant === 'price' ? 'px-3' : ''}`}>
        {getDisplayText(variant)}
      </span>
    </div>
  );
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, ...props }, ref) => {
    const [_text, setText] = React.useState(props.value || '');
    const text = _text as string;
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
          <InputLabel value={text} variant={variant} />
          {variant === 'comment' ? <IconAdd /> : ''}
        </div>
      </label>
    );
  },
);
Input.displayName = 'Input';

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, variant, ...props }, ref) => {
    const [_text, setText] = React.useState(props.value || '');
    const text = _text as string;
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
      if (props.onChange) {
        props.onChange(e);
      }
    };
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
          <InputLabel value={text} variant={variant} />
          {variant === 'comment' ? <IconAdd /> : ''}
        </div>
      </div>
    );
  },
);
TextArea.displayName = 'TextArea';

export { TextArea, Input, inputVariants };
