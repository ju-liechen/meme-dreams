import { Form, useForm, SubmitButton } from 'components/form'
import { axiosClient } from 'util/axios-client'
import { queryClient } from 'util/query-client'

export const LogoutForm = ({onSuccess, submitButton = {}, ...props}) => {
  const methods = useForm({
    onSubmit: async (data) => {
      await axiosClient.post('/user/logout', data)
      queryClient.resetQueries({
        predicate: query => query.queryKey[0]?.includes('is-logged-in')
      })
      onSuccess?.()
    }
  })
  return (
    <Form methods={methods} {...props} >
      <SubmitButton {...submitButton}>Log out</SubmitButton>
    </Form>
  )
}

