import { DatePickerSelect } from './date-picker'

export default {
  title: 'Components/Inputs/DatePickerSelect',
  component: DatePickerSelect,
}

const Template = (args) => <DatePickerSelect {...args} />

export const Default = Template.bind({})
Default.args = {
  id: 'sample-date-picker-id',
  name: 'sample-date-picker',
  label: 'Sample Date Picker Label',
  placeholder: 'Click to select a date',
  readOnly: false,
  className: '',
  validationState: '',
  variation: 'default',
  size: 'medium',
  style: {},
}

export const ReadOnly = Template.bind({})
ReadOnly.args = {
  ...Default.args,
  readOnly: true,
}

export const WithError = Template.bind({})
WithError.args = {
  ...Default.args,
  validationState: 'error',
}
