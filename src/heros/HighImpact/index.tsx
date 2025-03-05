import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="relative">
      <div className="container mb-20">
        <div className="max-w-[36.5rem]">
          {richText && <RichText className="mb-8" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-start gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="container relative">
        {/* Accent background extending left but not past the container */}
        <div className="absolute -z-1 top-0 left-[-50vw] w-[calc(40rem+50vw+3rem)] h-full bg-accent rounded-tr-[5rem]"></div>

        {/* Stats Content */}
        <div className="max-w-[40rem] pt-16 pb-14 flex gap-20">
          <div>
            <p className="text-xl font-bold mb-2">145+</p>
            <p>Members</p>
          </div>
          <div>
            <p className="text-xl font-bold mb-2">145+</p>
            <p>Donations Received</p>
          </div>
          <div>
            <p className="text-xl font-bold mb-2">145+</p>
            <p>Events in the last year</p>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="absolute -z-1 -top-56 right-0 bg-accent text-accent-foreground min-w-3/12 h-[36rem]">
        {media && typeof media === 'object' && (
          <Media
            className="absolute -bottom-[8rem] -left-[12rem] max-w-[24rem] aspect-[3/4] object-fit border-2 border-border rounded-md overflow-clip"
            priority
            resource={media}
          />
        )}
      </div>
    </div>
  )
}
