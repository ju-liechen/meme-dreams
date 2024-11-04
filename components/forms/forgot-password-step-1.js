import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'
import { Form, useForm, TextInput, SubmitButton } from 'components/form'

export const ForgotPasswordStep1 = ({onSuccess}) => {
  const methods = useForm({
    resolver: yupResolver(
      y.object().shape({
        email: y.string().email().required(),
      })
    ),
    onSubmit: async (data) => {
      await axiosClient.post('/public/user/forgot-password-step-1', data)
      onSuccess?.()
    }
  })
  return (
    <Form methods={methods}>
      <TextInput name='email' placeholder='email@example.com' />
      <SubmitButton>Send Reset Password Link</SubmitButton>
    </Form>
  )
}
