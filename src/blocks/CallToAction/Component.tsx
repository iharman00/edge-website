import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="rounded-lg bg-accent text-accent-foreground py-14 px-10 flex flex-col gap-14 md:flex-row justify-start md:justify-between md:items-center my-20">
      <div className="max-w-[48rem] flex items-center ">
        {richText && <RichText className="mb-0 mx-0" data={richText} enableGutter={false} />}
      </div>
      <div className="flex flex-col gap-8">
        {(links || []).map(({ link }, i) => {
          return <CMSLink key={i} size="lg" {...link} />
        })}
      </div>
    </div>
  )
}
