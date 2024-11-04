import { RadioButton } from './radio-button'
export default {
  title: 'Components/Inputs/RadioButton',
  component: RadioButton,
}

const Template = (args) => <RadioButton {...args} />

export const Default = Template.bind({})
Default.args = {
  id: 'sample-radio-id',
  name: 'sample-radio-name',
  value: 'sample-value',
  label: 'Sample Label',
}
