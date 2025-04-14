import { CMSLink } from '@/components/Link'
import { DropdownContent, DropdownMenu, DropdownTrigger } from '@/components/ui/DropdownMenu'
import { Header } from '@/payload-types'
import { cn } from '@/utilities/ui'

interface DesktopNavProps extends React.HTMLAttributes<HTMLDivElement> {
  navItems: NonNullable<Header['navItems']>
}

const DesktopNav = ({ className, navItems, ...props }: DesktopNavProps) => {
  return (
    <div className={cn('hidden xl:flex gap-10', className)} {...props}>
      {navItems.map(({ link, type, links, label }, i) => {
        // Return a single link item
        if (type === 'single' && link)
          return <CMSLink key={i} {...link} appearance="link" className="font-normal" />

        // Return a mega menu style link group item
        if (type === 'group' && links && label) {
          return (
            <DropdownMenu key={i}>
              <DropdownTrigger variant="link">{label}</DropdownTrigger>
              <DropdownContent>
                <ul className="flex flex-col px-3">
                  {links.map(({ link }, index) => (
                    <li key={index} className="px-0 list-none">
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
  )
}

export default DesktopNav
