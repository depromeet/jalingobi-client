import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

const labelVariants = cva(
  'left-5 top-5 h-11 w-[271px] px-3 pl-3 pr-4 text-black caret-[#FF916F]',
  {
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
  },
);

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label
        className={labelVariants({ variant, className })}
        ref={ref}
        {...props}
      />
    );
  },
);
Label.displayName = 'Label';

export { Label, labelVariants };
