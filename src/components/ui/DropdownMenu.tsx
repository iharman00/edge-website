'use client'

import React, { useState, createContext, ReactNode, useContext, Dispatch, useEffect } from 'react'
import { Play } from 'lucide-react'
import { Button, ButtonProps } from './button'
import { cn } from '@/utilities/ui'

interface DropdownContextType {
  isOpen: boolean
  setIsOpen: Dispatch<React.SetStateAction<DropdownContextType['isOpen']>>
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined)

const useDropdown = () => {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('DropdownMenu must be used within a DropdownProvider context')
  }
  return context
}

const DropdownMenu = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div
        className={cn('relative', className)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        {...props}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

type DropdownTriggerProps = Omit<ButtonProps, 'children'> & {
  children: string
}

const DropdownTrigger = ({
  children,
  className,
  onClick,
  variant = 'secondary',
  ...props
}: DropdownTriggerProps) => {
  const { isOpen, setIsOpen } = useDropdown()
  return (
    <Button
      className={cn('p-0 font-normal', className)}
      onClick={() => setIsOpen((prev) => !prev)}
      variant={variant}
      {...props}
    >
      <div className="flex items-center gap-2 ">
        {children}
        <Play
          className={`relative top-[1px] size-2.5 transition-transform duration-400 ease-in-out ${
            isOpen ? 'rotate-z-270' : 'rotate-z-90'
          }`}
          fill="#000"
          aria-hidden="true"
        />
      </div>
    </Button>
  )
}

const DropdownContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { isOpen } = useDropdown()

  if (isOpen)
    return (
      <div
        className={cn(
          'absolute left-0 mt-0.5 w-max bg-white text-black shadow-lg rounded-md transition-opacity duration-200 ease-in-out px-4 py-2',
          className,
        )}
        {...props}
      />
    )

  return null
}

export { DropdownMenu, DropdownTrigger, DropdownContent }
