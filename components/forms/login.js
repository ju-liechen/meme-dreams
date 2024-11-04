import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'
import { Form, useForm, TextInput, SubmitButton } from 'components/form'
import { queryClient } from 'util/query-client'
import { axiosClient } from 'util/axios-client'

export const Login = ({onSuccess}) => {
  const methods = useForm({
    resolver: yupResolver(
      y.object().shape({
        email: y.string().email().required(),
        password: y.string().required(),
      })
    ),
    onSubmit: async (data) => {
      await axiosClient.post('/public/user/login', data)
      queryClient.resetQueries({
        predicate: query => query.queryKey[0]?.includes('is-logged-in')
      })
      onSuccess?.()
    }
  })
  return (
    <Form methods={methods}>
      <TextInput type='email' name='email' placeholder='email@example.com' />
      <TextInput
        name='password'
        type='password'
        placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
      />
      <SubmitButton>Log in</SubmitButton>
    </Form>
  )
}

