import * as React from 'react';

import { cva } from 'class-variance-authority';

import { Input, TextArea } from './Input/input';

const textFieldVariants = cva('relative resize-none rounded-lg bg-white', {
  variants: {
    variant: {
      default: '',
      price: '',
      memo: '',
      comment: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface TextFieldProps {
  value: string;
  variant: 'default' | 'price' | 'memo' | 'comment';
}

const TextField = ({ value, variant }: TextFieldProps) => {
  return (
    <div className="relative w-[335px] rounded-lg bg-white">
      {variant !== 'memo' ? (
        <Input variant={variant} />
      ) : (
        <TextArea variant={variant} />
      )}
    </div>
  );
};
TextField.displayName = 'TextField';

export { TextField, textFieldVariants };