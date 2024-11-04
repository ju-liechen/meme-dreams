export const ErrorDisplay = ({ error }) => {
  const { message, code } = error
  console.log('ERROR', code, message?.message)
  return (
    <div>
      {code}: {message?.message}
    </div>
  )
}
