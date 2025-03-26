'use client'

import { Button, ButtonProps, buttonVariants } from '@/components/ui/button'
import { useAuth } from '@/providers/Auth'
import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LogoutButton = ({
  className,
  variant = 'secondary',
  size,
  asChild = false,
  children = 'Log Out',
  ...props
}: ButtonProps) => {
  const [loading, setLoading] = useState(false)
  const { logout } = useAuth()
  const router = useRouter()

  return (
    <Button
      asChild={asChild}
      className={cn(buttonVariants({ variant: variant, size, className }))}
      onClick={async () => {
        setLoading(true)
        await logout()
        setLoading(false)
        router.refresh()
      }}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
      {children}
    </Button>
  )
}

export default LogoutButton
