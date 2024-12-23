import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {PanelData} from './PanelData';

const meta: Meta<typeof PanelData> = {
  component: PanelData,
};

export default meta;

type Story = StoryObj<typeof PanelData>;

export const Basic: Story = {args: {}};
