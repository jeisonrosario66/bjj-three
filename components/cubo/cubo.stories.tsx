import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {cubo} from './cube';

const meta: Meta<typeof cubo> = {
  component: cubo,
};

export default meta;

type Story = StoryObj<typeof cubo>;

export const Basic: Story = {args: {}};
