import { SelectInput } from './select-input'

export default {
  title: 'Components/Inputs/SelectInput',
  component: SelectInput,
}

const Template = (args) => <SelectInput {...args} />

export const Default = Template.bind({})
Default.args = {
  id: 'sample-id',
  name: 'sample-name',
  label: 'Sample Label',
  placeholder: 'Select an option',
  defaultValue: '',
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ],
  required: false,
}
