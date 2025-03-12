'use client'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import ResponsiveContainer from '@/components/ui/ResponsiveContainer'
import { Media } from '@/components/Media'
import { useEffect } from 'react'
import { useHeaderTheme } from '@/providers/HeaderTheme'

type MediumImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
      media?: never
    }
  | (Omit<Page['hero'], 'richText' | 'media' | 'links'> & {
      children?: never
      richText?: Page['hero']['richText']
      media?: Page['hero']['media']
    })

export const MediumImpactHero: React.FC<MediumImpactHeroType> = ({ children, richText, media }) => {
  const { setHeaderTheme } = useHeaderTheme()
  useEffect(() => {
    setHeaderTheme('dark')
    return () => setHeaderTheme('light')
  })
  return (
    <div className="dark pb-14 bg-background text-foreground will-change-transform">
      <ResponsiveContainer>
        <div className="max-w-[40rem] text-center mx-auto">
          {children ||
            (richText && (
              <RichText data={richText} enableGutter={false} className="[&>*:first-child]:mb-8" />
            ))}
        </div>
        {/* Hero Image */}
        {media && typeof media === 'object' && (
          <Media
            className="relative aspect-[4/3] max-w-[40rem] -bottom-44 -mt-20 mx-auto border-2 border-border rounded-md overflow-clip"
            imgClassName="object-cover w-full h-full"
            priority
            resource={media}
          />
        )}
      </ResponsiveContainer>
    </div>
  )
}
