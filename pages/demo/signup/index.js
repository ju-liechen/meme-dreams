import { useRouter } from 'next/router'
import { Signup as SignupForm } from 'components/forms/signup'

const SignupPage = () => {
  const router = useRouter()
  return (
    <>
      <h2>Signup</h2>
      <div style={{maxWidth: '20em'}}>
        <SignupForm onSuccess={() => router.push('/demo')} />
      </div>
    </>
  )
}

SignupPage.Layouts = ['DemoLayout']
export default SignupPage
