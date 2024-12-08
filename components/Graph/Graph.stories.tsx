import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {Graph} from './Graph';

const meta: Meta<typeof Graph> = {
  component: Graph,
};

export default meta;

type Story = StoryObj<typeof Graph>;

export const Basic: Story = {args: {}};
