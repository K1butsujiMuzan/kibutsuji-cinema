'use client'

import { CldImage } from 'next-cloudinary'
import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  image: string | null
  title: string
  sizes: string
  className?: string
  imageClassName?: string
}

export default function CloudinaryImage({
  image,
  title,
  sizes,
  className,
  imageClassName,
}: Props) {
  const [isError, setIsError] = useState<boolean>(image === null)

  return (
    <div className={cn('relative', className)}>
      {!isError && image && (
        <CldImage
          className={cn('object-cover', imageClassName)}
          src={image}
          alt={title}
          fill={true}
          sizes={sizes}
          onError={() => setIsError(true)}
        />
      )}
      {isError && (
        <Image
          className={cn('object-cover', imageClassName)}
          src={'/images/global/base-avatar.jpg'}
          alt={title}
          fill={true}
          sizes={sizes}
        />
      )}
    </div>
  )
}
