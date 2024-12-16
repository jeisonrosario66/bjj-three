import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {GraphTexture} from './GraphTexture';

const meta: Meta<typeof GraphTexture> = {
  component: GraphTexture,
};

export default meta;

type Story = StoryObj<typeof GraphTexture>;

export const Basic: Story = {args: {}};
