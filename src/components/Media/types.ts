import type { StaticImageData } from 'next/image'
import type { ElementType, Ref } from 'react'

import type { Media as MediaType } from '@/payload-types'
import React from 'react'

export interface Props {
  alt?: string
  className?: React.HtmlHTMLAttributes<HTMLElement>['className']
  fill?: boolean // for NextImage only
  htmlElement?: ElementType | null
  imgClassName?: React.HtmlHTMLAttributes<HTMLElement>['className']
  onClick?: () => void
  onLoad?: () => void
  loading?: 'lazy' | 'eager' // for NextImage only
  priority?: boolean // for NextImage only
  ref?: Ref<HTMLImageElement | HTMLVideoElement | null>
  resource?: MediaType | string | number | null // for Payload media
  size?: string // for NextImage only
  src?: StaticImageData // for static media
  videoClassName?: string
}
