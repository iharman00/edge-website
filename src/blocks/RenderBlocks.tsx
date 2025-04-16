import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ContentWithImageBlock } from '@/blocks/ContentWithImage/Component'
import { FormBlock } from '@/blocks/Form/Component'
import EventsBlock from './Events/Component'
import ResponsiveContainer from '@/components/ui/ResponsiveContainer'
import ContentWithStepsBlock from './ContentWithSteps/component'
import { ContentBlock } from './Content/Component'
import ImageGalleryBlock from './ImageGallery/Component'
import { CallToActionBlock } from './CallToAction/Component'

const blockComponents = {
  content: ContentBlock,
  contentWithImage: ContentWithImageBlock,
  contentWithSteps: ContentWithStepsBlock,
  imageGallery: ImageGalleryBlock,
  formBlock: FormBlock,
  eventsBlock: EventsBlock,
  cta: CallToActionBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <ResponsiveContainer key={index} className="my-20 mx-auto max-w-[85rem]">
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </ResponsiveContainer>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
