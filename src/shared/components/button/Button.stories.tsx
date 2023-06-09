// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import { IconSearch } from '@/public/svgs';
import { Button } from '@/shared/components/button/Button';

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
      <>
        <IconSearch className="mr-1 h-6 w-6" />
        Button Label
      </>
    ),
  },
};
