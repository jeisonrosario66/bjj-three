import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {Cube} from './Cube';

const meta: Meta<typeof Cube> = {
  component: Cube,
};

export default meta;

type Story = StoryObj<typeof Cube>;

export const Basic: Story = {args: {}};
