import * as React from 'react';
import { useContext, useMemo } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

type ChipGroupProps = {
  children?: React.ReactNode;
  initialChips: string;
  className?: string;
  onChange?: (chip: string) => void;
};

type ChipContext = {
  selectedChip: string;
  toggleChip: (chip: string) => void;
};

const ChipGroupContext = React.createContext<ChipContext | undefined>(
  undefined,
);

function ChipGroup({
  children,
  initialChips,
  className,
  onChange,
  ...props
}: ChipGroupProps) {
  const [selectedChip, setSelectedChip] = React.useState(initialChips);

  const toggleChip = (chip: string) => {
    if (selectedChip === chip) return;
    setSelectedChip(chip);
    onChange?.(chip);
  };

  const contextValue = useMemo(
    () => ({
      selectedChip,
      toggleChip,
    }),
    [selectedChip],
  );

  return (
    <ChipGroupContext.Provider value={contextValue}>
      <div className={cn('flex gap-x-[0.4rem]', className)} {...props}>
        {children}
      </div>
    </ChipGroupContext.Provider>
  );
}

const chipVariants = cva(
  'inline-flex items-center justify-center rounded-full px-1 py-2 font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        selected: 'bg-primary text-white',
        unSelected: 'bg-gray-20 text-gray-50 hover:bg-primary hover:text-white',
      },
      size: {
        md: 'px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'unSelected',
      size: 'md',
    },
  },
);

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  value: string;
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, size, ...props }, ref) => {
    const context = useContext(ChipGroupContext);
    if (context === undefined) {
      throw new Error('Chip must be used within a ChipGroup');
    }
    const { toggleChip, selectedChip } = context;
    const selected = selectedChip === props.value;
    return (
      <button
        onClick={() => toggleChip(props.value)}
        type="button"
        className={cn(
          chipVariants({
            variant: selected ? 'selected' : 'unSelected',
            size,
            className,
          }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Chip.displayName = 'Chip';
ChipGroup.Chip = Chip;

export { ChipGroup, Chip, chipVariants };
