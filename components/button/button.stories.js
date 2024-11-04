// Button.stories.js
import { Button } from './button'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    href: { control: 'text' },
    target: { control: 'text' },
    variation: {
      control: { type: 'select', options: ['primary', 'secondary'] },
    },
    size: {
      control: { type: 'select', options: ['small', 'medium'] },
    },
    icon: { control: 'text' },
    iconPosition: { control: { type: 'select', options: ['left', 'right'] } },
    iconVariation: { control: 'text' },
    type: {
      control: { type: 'select', options: ['button', 'submit', 'reset'] },
    },
    isLoading: { control: 'boolean' },
    loadingText: { control: 'text' },
    className: { control: 'text' },
  },
}

const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  href: '/',
  target: '_self',
  variation: 'primary',
  size: 'medium',
  children: 'Button Text',
  icon: 'home',
  iconPosition: 'right',
  iconVariation: 'stroked',
  type: 'button',
  isLoading: false,
  loadingText: 'Loading...',
  className: 'custom-class',
}
