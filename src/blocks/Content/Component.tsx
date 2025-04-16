import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { CMSLink } from '../../components/Link'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export const ContentBlock: React.FC<ContentBlockProps> = ({ columns }) => {
  const colsSpanClasses = {
    full: 'col-span-4 lg:col-span-12',
    half: 'col-span-4 lg:col-span-6',
    oneThird: 'col-span-4 lg:col-span-4',
    twoThirds: 'col-span-4 lg:col-span-8',
  }

  return (
    <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
      {columns?.map((col, index) => {
        const {
          enableLink,
          link,
          richText,
          size = 'full',
          enableDownload,
          resourceLabel,
          downloadableResource,
        } = col

        return (
          <div className={cn(colsSpanClasses[size ?? 'full'])} key={index}>
            {richText && <RichText data={richText} enableGutter={false} />}
            {enableLink && <CMSLink {...link} />}
            {enableDownload &&
              downloadableResource &&
              typeof downloadableResource === 'object' &&
              'url' in downloadableResource &&
              downloadableResource.url && (
                <div className="my-4">
                  <Link href={downloadableResource.url} download target="_blank">
                    <Button variant="secondary">
                      <Download className="mr-2 h-4 w-4" />
                      {resourceLabel || 'Download'}
                    </Button>
                  </Link>
                </div>
              )}
          </div>
        )
      })}
    </div>
  )
}
