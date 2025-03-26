import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import ResponsiveContainer from '@/components/ui/ResponsiveContainer'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="bg-background text-foreground pt-8 pb-16">
      <ResponsiveContainer>
        <div className="md:ml-[2rem] lg:ml-[12rem] max-w-[40rem]">
          {children ||
            (richText && (
              <RichText data={richText} enableGutter={false} className="[&>*:first-child]:mb-6" />
            ))}
        </div>
      </ResponsiveContainer>
    </div>
  )
}
