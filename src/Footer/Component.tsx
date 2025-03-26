import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import ResponsiveContainer from '@/components/ui/ResponsiveContainer'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="bg-secondary text-secondary-foreground mt-24 pt-20 pb-28">
      <ResponsiveContainer className="flex items-start gap-16 ">
        <Link className="flex items-center" href="/">
          <Logo className="w-[20rem]" />
        </Link>
        <nav className="flex flex-wrap gap-10 w-max">
          {navItems.map(({ link }, i) => {
            return (
              <CMSLink
                key={i}
                appearance="link"
                className="font-normal text-secondary-foreground"
                {...link}
              />
            )
          })}
        </nav>
      </ResponsiveContainer>
    </footer>
  )
}
