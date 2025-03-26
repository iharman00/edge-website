'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import ResponsiveContainer from '@/components/ui/ResponsiveContainer'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { cn } from '@/utilities/ui'
import { Button, buttonVariants } from '@/components/ui/button'
import { useAuth } from '@/providers/Auth'
import LogoutButton from '@/components/LogoutButton'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const { user, logout } = useAuth()
  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className={cn('text-foreground relative pb-16', theme === 'dark' ? `bg-background dark` : '')}
    >
      <ResponsiveContainer>
        <div className="py-8 flex justify-between items-center">
          <Link href="/">
            <Logo loading="eager" priority="high" />
          </Link>
          <HeaderNav data={data} />
          <div className="hidden lg:block">
            {user ? (
              <LogoutButton />
            ) : (
              <Link href="/login" className={cn(buttonVariants(), 'hidden lg:flex')}>
                Log In
              </Link>
            )}
          </div>
        </div>
      </ResponsiveContainer>
    </header>
  )
}
