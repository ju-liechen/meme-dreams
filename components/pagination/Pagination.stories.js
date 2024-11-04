import { useState } from 'react'
import { Pagination } from './pagination'

export default {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    totalPages: {
      control: 'number',
    },
    currentPage: {
      control: 'number',
    },
  },
}

const Template = (args) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage)

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  totalPages: 5,
  currentPage: 1,
}

export const MorePages = Template.bind({})
MorePages.args = {
  totalPages: 10,
  currentPage: 5,
}
