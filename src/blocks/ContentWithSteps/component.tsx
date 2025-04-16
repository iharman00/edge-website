'use client'

import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Download } from 'lucide-react'
import { ContentWithStepsBlock as ContentBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { CMSLink } from '@/components/Link'

const ContentWithStepsBlock = ({ steps, content, image }: ContentBlockProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center">
      <div className="space-y-8">
        {content && (
          <RichText className="[&>*:first-child]:mb-4" data={content} enableGutter={false} />
        )}
        <Accordion type="single" collapsible className="w-full" defaultValue="0">
          {steps.map((step, index) => (
            <AccordionItem key={step.id} value={index.toString()} className="w-full border-b-0">
              <AccordionTrigger className="text-base">{step.stepTitle}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <RichText data={step.stepDescription} enableGutter={false} />
                  {step.enableLink && <CMSLink {...step.link} />}
                  {step.enableDownloadableResource &&
                    step.downloadableResource &&
                    typeof step.downloadableResource === 'object' &&
                    'url' in step.downloadableResource &&
                    step.downloadableResource.url && (
                      <div className="my-4">
                        <Link href={step.downloadableResource.url} download target="_blank">
                          <Button variant="default">
                            <Download className="mr-2 h-4 w-4" />
                            {step.resourceLabel || 'Download'}
                          </Button>
                        </Link>
                      </div>
                    )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {image && typeof image === 'object' && (
        <div className="w-full hidden lg:block">
          <Media
            className="object-cover w-full"
            imgClassName="rounded-lg aspect-[4/3]"
            priority
            resource={image}
          />
        </div>
      )}
    </div>
  )
}

export default ContentWithStepsBlock
