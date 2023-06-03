import { Meta, StoryObj } from '@storybook/react';

import { Input, TextArea } from './input';

export default {
  title: 'Input',
  component: Input,
} as Meta;

type InputStory = StoryObj<typeof Input>;
type TextAreaStory = StoryObj<typeof TextArea>;

export const Default: InputStory = {
  args: {
    variant: 'default',
  },
  render: (args) => <Input {...args} placeholder="이름을 입력해주세요" />,
};

export const Price: InputStory = {
  args: {
    variant: 'price',
  },
  render: (args) => <Input {...args} placeholder="" />,
};

export const Memo: TextAreaStory = {
  args: {
    variant: 'memo',
  },
  render: (args) => <TextArea {...args} placeholder="메모를 입력해주세요" />,
};

export const Comment: InputStory = {
  args: {
    variant: 'comment',
  },
  render: (args) => <Input {...args} placeholder="댓글을 남겨보세요" />,
};
