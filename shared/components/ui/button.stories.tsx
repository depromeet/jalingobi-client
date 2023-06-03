// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import { IconAdd } from '@/public/svgs';
import { Button } from '@/shared/components/ui/button';

const meta: Meta<typeof Button> = {
  title: 'ButtonTest',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Contained: Story = {
  args: {
    variant: 'contained',
    size: 'md',
    children: 'Contained',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'contained',
    size: 'md',
    children: (
      <div className="flex">
        <IconAdd />
        Button labeled
      </div>
    ),
  },
};
