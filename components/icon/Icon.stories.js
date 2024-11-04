import { Icon } from './icon'

export default {
  title: 'Components/Icon',
  component: Icon,
}

const Template = (args) => <Icon {...args} />

export const Default = Template.bind({})
Default.args = {
  name: 'chevron-down',
}
