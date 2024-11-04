import Head from 'next/head'
import Link from 'next/link'

const Index = () => {
  return (
    <>
      <Head>
        <title>Next Starter</title>
      </Head>
      <div>
        <Link href='/demo'>Demo</Link>
      </div>
    </>
  )
}

export default Index
