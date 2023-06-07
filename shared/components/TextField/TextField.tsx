import * as React from 'react';

import { Input, TextArea } from './Input/Input';

// eslint-disable-next-line import/order
import { cva } from 'class-variance-authority';

const textFieldVariants = cva('relative resize-none rounded-lg bg-white', {
  variants: {
    variant: {
      default: '',
      price: '',
      memo: '',
      comment: '',
      custom: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface TextFieldProps {
  value: string;
  variant: 'default' | 'price' | 'memo' | 'comment';
  displayText: string | undefined;
}

const TextField = ({ value, variant, displayText }: TextFieldProps) => {
  return (
    <div className="relative w-[335px] rounded-lg bg-white">
      {variant !== 'memo' ? (
        <Input variant={variant} displayText={displayText} />
      ) : (
        <TextArea variant={variant} displayText={displayText} />
      )}
    </div>
  );
};
TextField.displayName = 'TextField';

export { TextField, textFieldVariants };
