'use client'

import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/providers/Auth'
import { toast } from 'sonner'
import ResponsiveContainer from '@/components/ui/ResponsiveContainer'
import LogoutButton from '@/components/LogoutButton'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import LoadingSpinner from '@/components/LoadingSpinner'

const formSchema = z.object({
  email: z.string().email().max(150),
  password: z.string().max(150),
})

function CallbackUrlWrapper({ onCallbackUrl }: { onCallbackUrl: (callbackUrl: string) => void }) {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const isValidCallbackUrl = callbackUrl.startsWith('/') && !callbackUrl.startsWith('//')

  useEffect(() => {
    onCallbackUrl(isValidCallbackUrl ? callbackUrl : '/')
  }, [callbackUrl, isValidCallbackUrl, onCallbackUrl])

  return null
}

export default function Page() {
  const { user, login } = useAuth()
  const router = useRouter()

  const [callbackUrl, setCallbackUrl] = useState('/')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await login({ email: values.email, password: values.password })
      toast('Logged In successfully.')
      router.push(callbackUrl)
    } catch (e) {
      if (e instanceof Error) {
        form.setError('email', { message: e.message })
        form.setError('password', { message: e.message })
      } else {
        toast('An unknown error occurred, please try again.')
      }
    }
  }

  return (
    <ResponsiveContainer className="flex items-start justify-center mt-16 mb-24 pt-12 pb-26">
      {/* CallbackUrlWrapper uses useSearchParams() so has to be wrapped with suspense */}
      {/* Read more here - https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
      <Suspense fallback={null}>
        <CallbackUrlWrapper onCallbackUrl={setCallbackUrl} />
      </Suspense>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>{user ? 'You are already logged in.' : 'Member Login'}</CardTitle>
          <CardDescription>
            {user ? 'Do you want to log out?' : 'Log in to view member only content'}
          </CardDescription>
        </CardHeader>
        {user ? (
          <CardContent className="mx-auto">
            <LogoutButton variant="default" />
          </CardContent>
        ) : (
          <CardContent>
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
                <Button
                  className="w-full h-10 flex justify-center"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && <LoadingSpinner />}
                  Log In
                </Button>
              </form>
            </Form>
          </CardContent>
        )}
      </Card>
    </ResponsiveContainer>
  )
}
