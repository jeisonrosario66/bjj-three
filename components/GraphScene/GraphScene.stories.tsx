import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {GraphScene} from './GraphScene';

const meta: Meta<typeof GraphScene> = {
  component: GraphScene,
};

export default meta;

type Story = StoryObj<typeof GraphScene>;

export const Basic: Story = {args: {}};
