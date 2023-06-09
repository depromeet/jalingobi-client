import * as React from 'react';
import { useContext, useMemo } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

type ChipGroupProps = {
  children?: React.ReactNode;
  initialChips: string;
};

type ChipContext = {
  selectedChip: string;
  toggleChip: (chip: string) => void;
};

const ChipGroupContext = React.createContext<ChipContext | undefined>(
  undefined,
);

function ChipGroup({ children, initialChips }: ChipGroupProps) {
  const [selectedChip, setSelectedChip] = React.useState(initialChips);

  const toggleChip = (chip: string) => {
    if (selectedChip === chip) return;
    setSelectedChip(chip);
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
      <div className="flex gap-x-[0.4rem]">{children}</div>
    </ChipGroupContext.Provider>
  );
}

const chipVariants = cva(
  'focus-visible:ring-ring ring-offset-background inline-flex items-center justify-center rounded-full px-1 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
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

interface ChipProps
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
