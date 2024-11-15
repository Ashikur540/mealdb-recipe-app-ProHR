"use client"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/providers/AuthProvider'

const WithAuth = (WrappedComponent) => {

  return function AuthComponent(props) {
    const { user } = useAuth()
    const router = useRouter()

    // Don't render the wrapped component if the user is authenticated
    useEffect(() => {
      if (user) {
        router.push("/")
      }
    }, [user, router])
    if (user) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}

export default WithAuth
