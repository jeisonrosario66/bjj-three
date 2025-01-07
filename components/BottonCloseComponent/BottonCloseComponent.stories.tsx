import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {BottonCloseComponent} from './BottonCloseComponent';

const meta: Meta<typeof BottonCloseComponent> = {
  component: BottonCloseComponent,
};

export default meta;

type Story = StoryObj<typeof BottonCloseComponent>;

export const Basic: Story = {args: {}};
