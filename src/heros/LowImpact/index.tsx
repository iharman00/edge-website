import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import ResponsiveContainer from '@/components/ui/ResponsiveContainer'

export const LowImpactHero: React.FC<Page['hero']> = ({ content }) => {
  return (
    <div className="bg-background text-foreground pt-8 pb-10">
      <ResponsiveContainer className="max-w-[85rem]">
        <div className="max-w-[40rem]">
          {content && (
            <RichText data={content} enableGutter={false} className="[&>*:first-child]:mb-6" />
          )}
        </div>
      </ResponsiveContainer>
    </div>
  )
}
