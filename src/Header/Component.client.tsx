'use client'

import Link from 'next/link'
import React from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import ResponsiveContainer from '@/components/ui/ResponsiveContainer'
import { cn } from '@/utilities/ui'
import { buttonVariants } from '@/components/ui/button'
import { useAuth } from '@/providers/Auth'
import LogoutButton from '@/components/LogoutButton'
import { ArrowRight } from 'lucide-react'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const { user } = useAuth()

  return (
    <header className="text-foreground relative">
      <ResponsiveContainer>
        <div className="py-8 flex justify-between items-center gap-4">
          <Link href="/">
            <Logo loading="eager" priority="high" />
          </Link>
          <HeaderNav data={data} />
          <div className="hidden xl:block">
            {user ? (
              <LogoutButton />
            ) : (
              <Link href="/login" className={cn(buttonVariants(), 'hidden xl:flex')}>
                Log In <ArrowRight />
              </Link>
            )}
          </div>
        </div>
      </ResponsiveContainer>
    </header>
  )
}
