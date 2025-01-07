import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {ModalMenuGeneral} from './ModalMenuGeneral';

const meta: Meta<typeof ModalMenuGeneral> = {
  component: ModalMenuGeneral,
};

export default meta;

type Story = StoryObj<typeof ModalMenuGeneral>;

export const Basic: Story = {args: {}};
