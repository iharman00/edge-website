import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { CMSLink } from '@/components/Link'
import { Menu } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType; theme: string | null }> = ({
  data,
  theme,
}) => {
  const [open, setOpen] = React.useState(false)
  const navItems = data?.navItems || []
  const primaryLink = data?.primaryLink || []
  return (
    <nav>
      {/* Mobile Navigation */}
      <div className="flex justify-between gap-4 lg:hidden">
        <CMSLink
          key={primaryLink[0]?.id}
          {...primaryLink[0]?.link}
          {...(theme === 'dark' && { appearance: 'outline' })}
          className="lg:hidden"
        />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger onClick={() => setOpen(true)}>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="hidden">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col justify-between items-center gap-10 m-auto">
              {navItems.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  appearance="link"
                  className="text-lg"
                  onClick={() => setOpen(false)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex justify-between gap-10">
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="link" className="font-normal" />
        })}
      </div>
    </nav>
  )
}
