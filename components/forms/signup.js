import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'
import { Form, useForm, TextInput, SubmitButton } from 'components/form'
import { queryClient } from 'util/query-client'
import { axiosClient } from 'util/axios-client'

export const Signup = ({onSuccess, useForm: useFormArgs = {}, ...props}) => {
  const methods = useForm({
    resolver: yupResolver(
      y.object().shape({
        email: y.string().email().required('Email is required'),
        password: y.string().required('Password is required'),
      })
    ),
    onSubmit: async (data) => {
      await axiosClient.post('/public/user/signup', data)
      queryClient.resetQueries({
        predicate: query => query.queryKey[0]?.includes('is-logged-in')
      })
      onSuccess?.()
    },
    ...useFormArgs
  })
  return (
    <Form methods={methods} {...props} >
      <TextInput type='email' name='email' placeholder='email@example.com' />
      <TextInput
        name='password'
        type='password'
        placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
      />
      <SubmitButton>Sign up</SubmitButton>
    </Form>
  )
}

