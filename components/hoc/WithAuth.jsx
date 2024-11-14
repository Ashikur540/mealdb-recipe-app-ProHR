"use client"
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'

const WithAuth = (WrappedComponent) => {

  return function AuthComponent(props) {
    const { user} = useAuth()
    const router = useRouter()

    if (user) {
      router.push("/")
      return null
    }

    return <WrappedComponent {...props} />
  }
}

export default WithAuth