import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'focus-visible:ring-ring ring-offset-background inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        contained: 'bg-primary hover:bg-primary-dark disabled:bg-gray-30',
        label: 'text-gray-40 underline-offset-4',
      },
      size: {
        lg: 'rounded-lg px-[7.6rem] py-3',
        md: 'rounded-md px-[5.25rem] py-3',
        sm: 'rounded-md px-[3.375rem] py-3',
        xs: 'rounded-md px-9 py-3',
      },
    },
    defaultVariants: {
      variant: 'contained',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        type="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
