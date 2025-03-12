'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import ResponsiveContainer from '@/components/ui/ResponsiveContainer'
import { CMSLink } from '@/components/Link'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { cn } from '@/utilities/ui'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const primaryLink = data?.primaryLink || []

  return (
    <header
      className={cn('text-foreground relative pb-16', theme === 'dark' ? `bg-background dark` : '')}
    >
      <ResponsiveContainer>
        <div className="py-8 flex justify-between items-center">
          <Link href="/">
            <Logo loading="eager" priority="high" />
          </Link>
          <HeaderNav data={data} theme={theme} />
          <CMSLink
            key={primaryLink[0]?.id}
            {...primaryLink[0]?.link}
            {...(theme === 'dark' && { appearance: 'outline' })}
            className="hidden lg:flex"
          />
        </div>
      </ResponsiveContainer>
    </header>
  )
}
