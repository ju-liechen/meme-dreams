import { BaseLayout } from './base-layout'

export default {
  title: 'Layouts/BaseLayout',
  component: BaseLayout,
}

const Template = (props) => <BaseLayout {...props} />

export const Basic = Template.bind({})

Basic.args = {
  children: (
    <div style={{ background: '#afafaf', padding: '1em' }}>CHILDREN</div>
  ),
}
