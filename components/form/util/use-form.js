import { useForm as useFormBase } from 'react-hook-form'
import { useStore } from 'util/store'

export const useForm = ({onSubmit, showErrorBanner = true, showErrorNotification = false, ...rest} = {}) => {
  const methods = useFormBase(rest)
  const setNotification = useStore((state) => state.setNotification)
  return {
    onSubmit: ev => {
      methods.clearErrors('root')
      methods.handleSubmit(async data => {
        try {
          const response = await onSubmit(data)
          return response
        } catch (err) {
          errorHandler({err, methods, setNotification, showErrorBanner, showErrorNotification})
        }
      })(ev)
    },
    ...methods
  }
}

const errorHandler = ({err, methods, setNotification, showErrorBanner, showErrorNotification}) => {
  console.error('form error', err)
  const detail = err.response?.data?.detail
  if (detail && typeof detail === 'string') {
    showErrorBanner && methods.setError('root.formError', {type: 'manual', message: detail})
    showErrorNotification && setNotification({type: 'error', text: detail})
    return
  } else if (detail) {
    const messages = parseFieldErrors(detail)
    messages.forEach(err => methods.setError(err.field, {type: 'manual', message: err.message}))
    const formError = 'Looks like there was an error, please try again.'
    showErrorBanner && methods.setError('root.formError', {type: 'manual', message: formError})
    showErrorNotification && setNotification({type: 'error', text: formError})
    return
  }
  const message = 'An unexpected error occured. Try again later.'
  showErrorBanner && methods.setError('root.formError', {type: 'manual', message})
  showErrorNotification && setNotification({type: 'error', text: message})
}

const parseFieldErrors = (detail) => {
  return detail.map((item) => ({
    field: item.loc[item.loc.length - 1],
    message: item.type === 'missing' ? 'This field is required' : (item.ctx?.reason || item.ctx?.error || item.msg),
  }))
}
