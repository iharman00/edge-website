'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import ResponsiveContainer from '@/components/ui/ResponsiveContainer'
import { CMSLink } from '@/components/Link'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const primaryLink = data?.primaryLink || []

  return (
    <header className="relative z-20 " {...(theme ? { 'data-theme': theme } : {})}>
      <ResponsiveContainer>
        <div className="py-8 flex justify-between items-center">
          <Link href="/">
            <Logo loading="eager" priority="high" />
          </Link>
          <HeaderNav data={data} />
          <CMSLink key={primaryLink[0]?.id} {...primaryLink[0]?.link} />
        </div>
      </ResponsiveContainer>
    </header>
  )
}
