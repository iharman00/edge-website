import { Media } from '@/components/Media'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ImageGalleryBlock as ImageGalleryProps } from '@/payload-types'

const ImageGalleryBlock = ({ images }: ImageGalleryProps) => {
  if (!images || images.length === 0) return null

  return (
    <Carousel className="-my-10">
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id} className="flex justify-center lg:basis-1/2">
            <Media
              resource={image.media}
              className="rounded-xl object-cover w-full aspect-[4/3]"
              imgClassName="rounded-xl object-cover w-full aspect-[4/3]"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className=" inset-x-0 -bottom-16 flex justify-center gap-4 mt-6">
        <CarouselPrevious className="size-10" />
        <CarouselNext className="size-10" />
      </div>
    </Carousel>
  )
}

export default ImageGalleryBlock
