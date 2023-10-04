import { EditableSpan } from '../components/EditableSpan/EditableSpan'
import { Meta, StoryObj } from '@storybook/react'

// export default {
//     title: 'Editable span',
//     component: EditableSpan
// }
//
// const callback = action('on change')
//
// export const EditableSpanExample = () => <EditableSpan title='Start value' updateItem={callback} />

const meta: Meta<typeof EditableSpan> = {
  title: "TODOLISTS/EditableSpan",
  component: EditableSpan,
  // This component will have an automatically generated Autodocs entry:
  // https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    title: {
      description: "Start value empty. Add value push button set string.",
    },
    updateItem: {
      description: "Value EditableSpan changed",
    },
  },
  args: {
    title: "qqqqqqqqqqq",
  },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const EditableSpanStory: Story = {
  args: {
    title: "AAAAAAAAAAAAAAA",
  },
};
