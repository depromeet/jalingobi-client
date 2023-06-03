import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { IconAdd } from '@/public/svgs';

const inputVariants = cva(
  'left-5 top-5 w-[265px] rounded-lg border-transparent bg-white px-3 pl-3 pr-4 text-xs text-black caret-[#FF916F] focus:outline-none',
  {
    variants: {
      variant: {
        default: 'h-[44px]',
        price: 'h-[44px] text-right',
        memo: 'h-[128px] resize-none',
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

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, ...props }, ref) => {
    const [text, setText] = React.useState(props.value || '');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
      if (props.onChange) {
        props.onChange(e);
      }
    };
    const getDisplayText = () => {
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
      <label className="left-5 top-5 h-11 w-[271px] px-3 pl-3 pr-4 text-black caret-[#FF916F]">
        <input
          type="text"
          className={inputVariants({ variant, className })}
          value={text}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        <div />
        <div className="absolute right-5 top-1/2 -translate-y-1/2 transform text-sm text-[#9EA3AD]">
          {variant === 'default' || variant === 'memo' ? `${text}`.length : ''}
          {getDisplayText()}
          {variant === 'comment' ? <IconAdd /> : ''}
        </div>
      </label>
    );
  },
);
Input.displayName = 'Input';

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={inputVariants({ variant, className })}
        ref={ref}
        {...props}
      />
    );
  },
);
TextArea.displayName = 'TextArea';

export { TextArea, Input, inputVariants };
