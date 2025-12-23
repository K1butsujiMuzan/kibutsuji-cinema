import Image from "next/image";
import type {ISlide} from "@/app/(guest)/welcome/(components)/welcome.data";

interface Props {
  slide: ISlide
}

export default function WelcomeSlide({slide}: Props) {
  return (
    <li className={'min-w-36.25 w-[calc(50%-0.75rem)] sn:w-[calc((100%/3)-0.75rem)] sm:w-1/4 lg:w-1/6 shrink-0 snap-start px-1.25 pt-1.5 sm:px-2.25'}>
      <a
        className={'flex w-full flex-col md:p-1.5 hover:bg-pink-100 dark:hover:bg-gray-600 sm:active:bg-pink-100 sm:dark:active:bg-gray-600 transition duration-300'}
        href={slide.href}
      >
        <Image className={'w-full'} width={180} height={255} src={slide.image} alt={slide.title} />
        <h3 className={'text-sm pt-3'}>{slide.title}</h3>
      </a>
    </li>
  )
}