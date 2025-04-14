import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentWithImageBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Media } from '@/components/Media'

export const ContentWithImageBlock: React.FC<ContentBlockProps> = (props) => {
  const { media, direction, content, enableLink, links } = props

  return (
    <div
      className={cn(
        `flex flex-col lg:flex-row gap-16`,
        direction === 'sideBySideReversed' && 'lg:flex-row-reverse',
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
      <div className={cn('w-full h-full lg:w-1/2 prose flex flex-col lg:mt-14', 'pr-14')}>
        {/* Rich Text Section */}
        <div>
          {content && (
            <RichText className="[&>*:first-child]:mb-4" data={content} enableGutter={false} />
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
  )
}
