import { Checkbox } from './checkbox'

export default {
  title: 'Components/Inputs/Checkbox',
  component: Checkbox,
}

const Template = (args) => <Checkbox {...args} />

export const Default = Template.bind({})
Default.args = {
  id: 'sample-checkbox-id',
  name: 'sample-checkbox-name',
  value: 'sample-value',
  label: 'Sample Label',
}
