import { useRouter } from 'next/router'
import { Login as LoginForm } from 'components/forms/login'

const LoginPage = () => {
  const router = useRouter()
  return (
    <>
      <h2>Login</h2>
      <div style={{maxWidth: '20em'}}>
        <LoginForm onSuccess={() => router.push('/demo')} />
      </div>
    </>
  )
}

LoginPage.Layouts = ['DemoLayout']
export default LoginPage
