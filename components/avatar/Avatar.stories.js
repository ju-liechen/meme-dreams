import { Avatar } from 'components/avatar'

export default {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {},
}

const Template = (props) => <Avatar {...props} />

export const AvatarWithImage = Template.bind({})
export const AvatarNoImage = Template.bind({})

AvatarNoImage.args = {
  firstName: 'Input',
  lastName: 'Logic',
}

AvatarWithImage.args = {
  ...AvatarNoImage.args,
  src: 'https://media.licdn.com/dms/image/C560BAQESPbFa_JOfYA/company-logo_200_200/0/1652984433019?e=2147483647&v=beta&t=67fnAHMzzMt2gMpb8ldY2GoQCWCUB6gjUVpJ_E84UPk',
}
