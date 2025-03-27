import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import ResponsiveContainer from '@/components/ui/ResponsiveContainer'
import { Media } from '@/components/Media'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { media, size, richText, enableLink, links } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <ResponsiveContainer className="my-16">
      <div
        className={cn(
          `flex flex-col lg:flex-row items-center gap-20`,
          size === 'sideBySideReversed' ? 'lg:flex-row-reverse' : '',
        )}
      >
        {/* Image Section */}
        {media && typeof media === 'object' && (
          <div className="w-full lg:w-1/2 p-2 lg:p-6">
            <Media
              className="object-cover w-full"
              imgClassName="rounded-lg aspect-[4/3]"
              priority
              resource={media}
            />
          </div>
        )}
        {/* Content */}
        <div className="w-full h-full lg:w-1/2 prose flex flex-col">
          {/* Rich Text Section */}
          <div className="">
            {richText && (
              <RichText className="[&>*:first-child]:mb-4" data={richText} enableGutter={false} />
            )}
          </div>
          {/* Link */}
          {enableLink && links && (
            <div className="mt-8">
              {links.map(({ link, id }) => (
                <CMSLink key={id} {...link} />
              ))}
            </div>
          )}
        </div>
      </div>
    </ResponsiveContainer>
  )
}
