import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  return (
    <nav className="flex justify-between gap-10">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" className="font-normal" />
      })}
    </nav>
  )
}
