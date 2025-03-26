'use client'

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

import type { User } from '@/payload-types'
import { toast } from 'sonner'

type Login = (args: { email: string; password: string }) => Promise<User>

type Logout = () => Promise<void>

type AuthContext = {
  user?: null | User
  setUser: (user: null | User) => void
  login: Login
  logout: Logout
}

const Context = createContext({} as AuthContext)

const CLOUD_CONNECTION_ERROR = 'An error occurred while attempting to connect to Payload Cloud'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<null | undefined | User>(undefined)
  const fetchedMe = useRef(false)

  const login = useCallback<Login>(async (args) => {
    try {
      const res = await fetch(`/api/users/login`, {
        method: 'POST',
        body: JSON.stringify({
          email: args.email,
          password: args.password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const { user, errors } = await res.json()

      if (res.ok) {
        if (errors) {
          throw new Error(errors[0].message)
        }
        setUser(user)
        return user
      }

      throw new Error(errors?.[0]?.message || 'An error occurred while attempting to login.')
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`${CLOUD_CONNECTION_ERROR}: An Unknown error occured`)
    }
  }, [])

  const logout = useCallback<Logout>(async () => {
    try {
      const res = await fetch(`/api/users/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        setUser(null)
        toast('Logged Out successfully.')
      } else {
        throw new Error('An error occurred while attempting to logout.')
      }
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error(`${CLOUD_CONNECTION_ERROR}: An Unknown error occured`)
    }
  }, [])

  useEffect(() => {
    if (fetchedMe.current) {
      return
    }
    fetchedMe.current = true

    const fetchMe = async () => {
      try {
        const res = await fetch(`/api/users/me`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const { user, errors } = await res.json()

        if (res.ok) {
          setUser(user || null)
        } else {
          throw new Error(
            errors?.[0]?.message || 'An error occurred while attempting to fetch user.',
          )
        }
      } catch (e) {
        setUser(null)
        if (process.env.NEXT_PUBLIC_OMIT_CLOUD_ERRORS === 'true') {
          return
        }
        if (e instanceof Error) {
          throw new Error(e.message)
        }
        throw new Error(`${CLOUD_CONNECTION_ERROR}: An Unknown error occured`)
      }
    }

    fetchMe()
  }, [])

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  )
}

type UseAuth<T = User> = () => AuthContext

export const useAuth: UseAuth = () => useContext(Context)
