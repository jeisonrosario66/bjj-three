import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {GraphViz} from './GraphViz';

const meta: Meta<typeof GraphViz> = {
  component: GraphViz,
};

export default meta;

type Story = StoryObj<typeof GraphViz>;

export const Basic: Story = {args: {}};
