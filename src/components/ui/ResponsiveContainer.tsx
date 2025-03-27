import { cn } from '@/utilities/ui'
import { HTMLAttributes } from 'react'

type ResponsiveContainerProps = HTMLAttributes<HTMLDivElement>

export default function ResponsiveContainer({ className, ...props }: ResponsiveContainerProps) {
  return (
    <div
      className={cn(
        'container max-w-[96rem] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24',
        className,
      )}
      {...props}
    />
  )
}
