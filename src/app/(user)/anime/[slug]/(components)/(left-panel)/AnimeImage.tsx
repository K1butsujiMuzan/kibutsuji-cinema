'use client'

import { CldImage } from 'next-cloudinary'
import { useState } from 'react'
import Image from 'next/image'

interface Props {
  image: string | null
  title: string
}

export default function AnimeImage({ image, title }: Props) {
  const [isError, setIsError] = useState<boolean>(image === null)
  return (
    <button type={'button'} className={'relative w-full h-91'}>
      {!isError && image && (
        <CldImage
          className={'rounded-md object-cover'}
          alt={title}
          src={image}
          fill={true}
          onError={() => setIsError(true)}
          sizes={'260px'}
        />
      )}
      {isError && (
        <Image
          src={'/images/global/base-avatar.jpg'}
          className={'rounded-md object-cover'}
          alt={title}
          fill={true}
          sizes={'260px'}
        />
      )}
    </button>
  )
}
