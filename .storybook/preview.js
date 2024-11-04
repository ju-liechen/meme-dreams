import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { SvgDefs } from 'components/svg-defs'

import 'styles/index.scss'

if (typeof window !== 'undefined') {
  window.nextServerUrl = 'http://localhost:3000'
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const queryClient = new QueryClient()

export const decorators = [
  (Story) => {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
        <SvgDefs />
      </>
    )
  },
]
