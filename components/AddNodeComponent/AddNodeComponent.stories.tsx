import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {AddNodeComponent} from './AddNodeComponent';

const meta: Meta<typeof AddNodeComponent> = {
  component: AddNodeComponent,
};

export default meta;

type Story = StoryObj<typeof AddNodeComponent>;

export const Basic: Story = {args: {}};
