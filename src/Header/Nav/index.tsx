'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { CMSLink } from '@/components/Link'
import { ArrowRight, Menu } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { useAuth } from '@/providers/Auth'
import LogoutButton from '@/components/LogoutButton'
import DropdownMenu from '@/components/ui/DropdownMenu'

export const HeaderNav: React.FC<{
  data: HeaderType
}> = ({ data }) => {
  const { user } = useAuth()
  const [open, setOpen] = React.useState(false)
  const navItems = data?.navItems || []
  return (
    <nav>
      {/* Mobile Navigation */}
      <div className="flex justify-between gap-4 lg:hidden">
        {user ? (
          <LogoutButton />
        ) : (
          <Link href="/login" className={cn(buttonVariants())}>
            Log In <ArrowRight />
          </Link>
        )}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger onClick={() => setOpen(true)}>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="hidden">
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col justify-between items-center gap-10 m-auto">
              {navItems.map(({ link, type, links, label }, i) => {
                // Return a single link item
                if (type === 'single' && link)
                  return (
                    <CMSLink
                      key={i}
                      {...link}
                      appearance="link"
                      className="font-normal"
                      onClick={() => setOpen(false)}
                    />
                  )

                // Return a mega menu style link group item
                if (type === 'group' && links && label) {
                  return (
                    <DropdownMenu
                      key={i}
                      label={label}
                      links={links}
                      linksOnClick={() => setOpen(false)}
                    />
                  )
                }
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex gap-10">
        {navItems.map(({ link, type, links, label }, i) => {
          // Return a single link item
          if (type === 'single' && link)
            return <CMSLink key={i} {...link} appearance="link" className="font-normal" />

          // Return a mega menu style link group item
          if (type === 'group' && links && label) {
            return <DropdownMenu key={i} label={label} links={links} />
          }
        })}
      </div>
    </nav>
  )
}
