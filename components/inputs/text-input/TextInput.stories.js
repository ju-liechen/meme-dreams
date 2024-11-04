import { TextInput } from './text-input'

export default {
  title: 'Components/Inputs/TextInput',
  component: TextInput,
}

const Template = (args) => <TextInput {...args} />

export const Default = Template.bind({})
Default.args = {
  type: 'text',
  name: 'sample-text-input',
  value: '',
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
