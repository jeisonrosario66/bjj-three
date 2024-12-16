import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {Texture01} from './Texture01';

const meta: Meta<typeof Texture01> = {
  component: Texture01,
};

export default meta;

type Story = StoryObj<typeof Texture01>;

export const Basic: Story = {args: {}};
