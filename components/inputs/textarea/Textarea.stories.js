import { Textarea } from './textarea' // adjust the import path as needed

export default {
  title: 'Components/Inputs/Textarea',
  component: Textarea,
}

const Template = (args) => <Textarea {...args} />

export const Default = Template.bind({})
Default.args = {
  name: 'sample-textarea',
  value: '',
  rows: '6',
  label: 'Sample Label',
  placeholder: 'Enter some text',
  error: false,
  id: 'sample-id',
}

export const WithError = Template.bind({})
WithError.args = {
  ...Default.args,
  error: true,
}
