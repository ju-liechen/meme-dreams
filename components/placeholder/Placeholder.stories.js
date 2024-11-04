import { Placeholder } from 'components/placeholder'

export default {
  title: 'Components/Placeholder',
  component: Placeholder,
  tags: ['autodocs'],
}

const Template = (props) => <Placeholder {...props} />

export const Basic = Template.bind({})
Basic.args = { name: 'Example placeholder' }
