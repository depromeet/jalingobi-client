import type { Meta, StoryObj } from '@storybook/react';

import { IconSearch } from '@/public/svgs';
import { ChipGroup } from '@/shared/components/chip/Chip';

const meta: Meta<typeof ChipGroup> = {
  title: 'Chip',
  component: ChipGroup,
};

export default meta;

type Story = StoryObj<typeof ChipGroup>;

export const Chip: Story = {
  name: 'Icon Text Chip',
  args: {
    children: (
      <ChipGroup initialChips="chip1">
        <ChipGroup.Chip value="chip1">
          <IconSearch className="mr-1 h-6 w-6" />
          음식
        </ChipGroup.Chip>
      </ChipGroup>
    ),
  },
};

// Tab chip

// export const TabChip: Story = {
//   name: 'Icon chip',
//   args: {
//     children: (
//       <ChipGroup initialChips="chip1">
//         <ChipGroup.Chip
//           value="chip1"
//           className="flex h-10 w-10 rounded-lg px-0 py-0"
//         >
//           <IconSearch className="flex h-6 w-6" />
//         </ChipGroup.Chip>
//       </ChipGroup>
//     ),
//   },
// };

export const WithoutIconChip: Story = {
  name: 'without icon chip',
  args: {
    children: (
      <ChipGroup initialChips="chip1">
        <ChipGroup.Chip value="chip1">검색</ChipGroup.Chip>
      </ChipGroup>
    ),
  },
};

export const Chips: Story = {
  args: {
    children: (
      <ChipGroup initialChips="chip1">
        <ChipGroup.Chip value="chip1">전체</ChipGroup.Chip>
        <ChipGroup.Chip value="chip2">
          <IconSearch className="mr-1 h-6 w-6" />
          음식
        </ChipGroup.Chip>
        <ChipGroup.Chip value="chip3">
          <IconSearch className="mr-1 h-6 w-6" />
          교통
        </ChipGroup.Chip>
      </ChipGroup>
    ),
  },
};
