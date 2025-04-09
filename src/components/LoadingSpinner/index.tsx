import React from 'react'
import { Loader2 } from 'lucide-react'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/utilities/ui'

type LoadingSpinnerProps = {
  className?: string
} & ComponentPropsWithoutRef<'svg'>

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className, ...props }) => {
  return <Loader2 className={cn('mr-2 h-4 w-4 animate-spin', className)} {...props} />
}

export default LoadingSpinner
