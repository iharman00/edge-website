import { MouseEventHandler, useState } from 'react'
import { Lock, Play } from 'lucide-react'
import { Header } from '@/payload-types'
import { CMSLink } from '../Link'
import { Button } from './button'
import { cn } from '@/utilities/ui'

interface DropDownMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  label: string
  links: NonNullable<Header['navItems']>[number]['links']
  linksOnClick?: MouseEventHandler<HTMLButtonElement>
}

const DropdownMenu = ({ label, links, className, linksOnClick, ...props }: DropDownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      {...props}
    >
      {/* Toggle Dropdown on Click */}
      <Button className="flex items-center gap-2 p-0 font-normal" variant="link">
        {label}
        <Play
          className={`relative top-[1px] size-2.5 transition-transform duration-300 ${
            isOpen ? 'rotate-270' : 'rotate-90'
          }`}
          fill="#000"
          aria-hidden="true"
        />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && links && (
        <ul className="absolute left-0 mt-0.5 w-max bg-white text-foreground shadow-lg rounded-md transition-opacity duration-200 ease-in-out px-4 py-2 flex flex-col">
          {links.map(({ link }, index) => (
            <li key={index} className="px-2 list-none">
              <CMSLink {...link} appearance="link" className="font-normal" onClick={linksOnClick} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DropdownMenu
