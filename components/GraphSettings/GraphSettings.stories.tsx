import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {GraphSettings} from './GraphSettings';

const meta: Meta<typeof GraphSettings> = {
  component: GraphSettings,
};

export default meta;

type Story = StoryObj<typeof GraphSettings>;

export const Basic: Story = {args: {}};
