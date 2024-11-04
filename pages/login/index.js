import { useRouter } from 'next/router'
import { Login as LoginForm } from 'components/forms/login'

const LoginPage = () => {
  const router = useRouter()
  return (
    <>
      <h2>Login</h2>
      <LoginForm onSuccess={() => router.push('/')} />
    </>
  )
}

LoginPage.Layouts = ['BaseLayout']
export default LoginPage
