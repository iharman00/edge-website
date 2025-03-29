import type { Header as HeaderType } from '@/payload-types'

import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'

export const HeaderNav: React.FC<{
  data: HeaderType
}> = ({ data }) => {
  const navItems = data?.navItems || []
  return (
    <nav>
      {/* Mobile Navigation */}
      <MobileNav navItems={navItems} />

      {/* Desktop Navigation */}
      <DesktopNav navItems={navItems} />
    </nav>
  )
}
