'use client'

import { CldImage } from 'next-cloudinary'
import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Props {
  image: string | null
  title: string
  className?: string
  sizes: string
}

export default function CloudinaryImageButton({
  image,
  title,
  className,
  sizes,
}: Props) {
  const [isError, setIsError] = useState<boolean>(image === null)
  return (
    <button type={'button'} className={cn('relative block', className)}>
      {!isError && image && (
        <CldImage
          className={'rounded-md object-cover'}
          alt={title}
          src={image}
          fill={true}
          onError={() => setIsError(true)}
          sizes={sizes}
        />
      )}
      {isError && (
        <Image
          src={'/images/global/base-avatar.jpg'}
          className={'rounded-md object-cover'}
          alt={title}
          fill={true}
          sizes={sizes}
        />
      )}
    </button>
  )
}
