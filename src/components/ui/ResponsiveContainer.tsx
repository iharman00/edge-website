import { HTMLAttributes } from 'react'

interface ResponsiveContainerProps extends HTMLAttributes<HTMLDivElement> {}

export default function ResponsiveContainer({ children, ...props }: ResponsiveContainerProps) {
  return (
    <div
      className="max-w-[96rem] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24"
      {...props}
    >
      {children}
    </div>
  )
}
