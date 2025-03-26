'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { string, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/providers/Auth'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { AuthenticationError } from 'payload'
import ResponsiveContainer from '@/components/ui/ResponsiveContainer'
import LogoutButton from '@/components/LogoutButton'

const formSchema = z.object({
  email: z.string().email().max(150),
  password: z.string().max(150),
})

export default function Page() {
  const { user, login } = useAuth()
  const router = useRouter()

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  // Only allow internal paths and protect against open redirection vulnerabilities
  const isValidCallbackUrl = callbackUrl.startsWith('/') && !callbackUrl.startsWith('//')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await login({ email: values.email, password: values.password })
      toast('Logged In successfully.')
      router.push(isValidCallbackUrl ? callbackUrl : '/')
    } catch (e) {
      if (e instanceof Error) {
        form.setError('email', { message: e.message })
        form.setError('password', { message: e.message })
      } else {
        toast('An unknown error occured, please try again.')
      }
    }
  }

  return (
    <ResponsiveContainer className="flex items-start justify-center pb-20">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        {user ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Log Out?</h1>
            <p className="mb-8">You are already logged In</p>
            <LogoutButton variant="default" />
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-2">Member Login</h1>
              <p>Log in to view member only content</p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          className="h-10"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          placeholder="Enter your password"
                          className="h-10"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full h-10 flex justify-center">
                  {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Log In
                </Button>
              </form>
            </Form>
          </>
        )}
      </div>
    </ResponsiveContainer>
  )
}
