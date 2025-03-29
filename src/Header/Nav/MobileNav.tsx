'use client'

import { CMSLink } from '@/components/Link'
import LogoutButton from '@/components/LogoutButton'
import { buttonVariants } from '@/components/ui/button'
import { DropdownContent, DropdownMenu, DropdownTrigger } from '@/components/ui/DropdownMenu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Header } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { cn } from '@/utilities/ui'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

interface MobileNavProps extends React.HTMLAttributes<HTMLDivElement> {
  navItems: NonNullable<Header['navItems']>
}

const MobileNav = ({ className, navItems, ...props }: MobileNavProps) => {
  const { user } = useAuth()
  const [isSheetopen, setIsSheetOpen] = useState(false)

  return (
    <div className={cn('flex justify-between gap-4 lg:hidden', className)} {...props}>
      {user ? (
        <LogoutButton />
      ) : (
        <Link href="/login" className={cn(buttonVariants())}>
          Log In
        </Link>
      )}
      <Sheet open={isSheetopen} onOpenChange={(prev) => setIsSheetOpen(prev)}>
        <SheetTrigger onClick={() => setIsSheetOpen(true)}>
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
                    onClick={() => setIsSheetOpen(false)}
                  />
                )

              // Return a mega menu style link group item
              if (type === 'group' && links && label) {
                return (
                  <DropdownMenu key={i}>
                    <DropdownTrigger variant="link" asChild>
                      {label}
                    </DropdownTrigger>
                    <DropdownContent className="-ml-14">
                      <ul className="flex flex-col">
                        {links.map(({ link }, index) => (
                          <li
                            key={index}
                            className="px-0 list-none"
                            onClick={() => setIsSheetOpen(false)}
                          >
                            <CMSLink {...link} appearance="link" className="font-normal" />
                          </li>
                        ))}
                      </ul>
                    </DropdownContent>
                  </DropdownMenu>
                )
              }
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNav
