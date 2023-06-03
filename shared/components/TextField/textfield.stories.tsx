// textfield.stories.ts|tsx
import { Meta, StoryObj } from '@storybook/react';

import { TextField } from './textfield';

export default {
  title: 'TextField',
  component: TextField,
} as Meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Price: Story = {
  args: {
    variant: 'price',
  },
};

export const Memo: Story = {
  args: {
    variant: 'memo',
  },
};

export const Comment: Story = {
  args: {
    variant: 'comment',
  },
};
