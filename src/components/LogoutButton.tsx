'use client'

import { Button, ButtonProps, buttonVariants } from '@/components/ui/button'
import { useAuth } from '@/providers/Auth'
import { cn } from '@/utilities/ui'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LogoutButton = ({
  className,
  variant = 'secondary',
  size,
  children = 'Log Out',
  ...props
}: ButtonProps) => {
  const [loading, setLoading] = useState(false)
  const { logout } = useAuth()
  const router = useRouter()

  return (
    <Button
      className={cn(buttonVariants({ variant: variant, size, className }))}
      onClick={async () => {
        setLoading(true)
        await logout()
        setLoading(false)
        router.refresh()
      }}
      disabled={loading}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
      {children}
    </Button>
  )
}

export default LogoutButton
