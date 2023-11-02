import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import AppWithRedux from '../AppWithRedux'
import { ReduxStoreProviderDecorator } from '../state/ReduxStoreProviderDecorator'

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AppWithRedux> = {
	title: 'TODOLISTS/AppWithRedux',
	component: AppWithRedux,
	// This component will have an automatically generated Autodocs entry:
	// https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	// More on argTypes:
	// https://storybook.js.org/docs/react/api/argtypes
	argTypes: {
		addItem: {
			description: 'Button clicked inside form',
			action: 'clicked'
		}
	},
	decorators: [ReduxStoreProviderDecorator]
}

export default meta
type Story = StoryObj<typeof AppWithRedux>

export const AppWithReduxStory: Story = {}
