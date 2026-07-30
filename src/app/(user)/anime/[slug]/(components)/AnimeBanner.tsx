'use client'

import { useState } from 'react'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'

interface Props {
  image: string
}

export default function AnimeBanner({ image }: Props) {
  const [isError, setIsError] = useState<boolean>(false)

  return (
    <div
      className={
        'relative h-90 rounded-xl overflow-hidden after:content-[""] after:block after:inset-0 after:absolute  after:bg-linear-to-t  after:from-black/90 after:from-10% after:to-black/0 after:to-50%'
      }
    >
      {!isError && image && (
        <CldImage
          className={'object-cover'}
          src={image}
          alt={''}
          fill={true}
          sizes={'100vw'}
          preload={true}
          onError={() => setIsError(true)}
        />
      )}
      {isError && (
        <Image
          className={'object-cover'}
          src={'/images/global/base-banner.png'}
          alt={''}
          fill={true}
          sizes={'100vw'}
          priority={true}
        />
      )}
    </div>
  )
}
