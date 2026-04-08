import type { TTextPageData } from '@/shared/types/text-page.type'
import parse from 'html-react-parser'
import { Fragment } from 'react'

interface Props {
  title: string
  preface: string[]
  textPageData: TTextPageData[]
}

export default function TextPage({ title, preface, textPageData }: Props) {
  return (
    <main className={'pt-8 pb-12 px-5 md:py-24 md:px-10'}>
      <section className={'max-w-290 flex flex-col gap-9 md:gap-12 mx-auto'}>
        <h1 className={'text-22 md:text-28 font-medium'}>{title}</h1>
        <div className={'flex flex-col gap-4.5 md:gap-6.5'}>
          {preface.map((item, index) => (
            <p
              key={`preface-${index}`}
              className={'text-sm md:text-base font-medium'}
            >
              {parse(item)}
            </p>
          ))}
        </div>
        <div className={'flex flex-col gap-4.5 md:gap-6.5'}>
          {textPageData.map((item) => (
            <div
              key={item.label}
              className={'flex flex-col gap-4.5 md:gap-6.5'}
            >
              <h2 className={'text-xl md:text-22 font-medium'}>{item.label}</h2>
              {!!item.paragraphs &&
                item.paragraphs.map((paragraph, index) => (
                  <Fragment
                    key={`${item.label.toLowerCase()}-paragraph-${index}`}
                  >
                    <p className={'text-sm md:text-base font-medium'}>
                      {parse(paragraph.text)}
                    </p>
                    {!!paragraph.list && (
                      <ul className={'list-disc pl-5 md:pl-10'}>
                        {paragraph.list.map((listItem, index) => (
                          <li
                            className={'text-sm md:text-base font-medium'}
                            key={`${item.label.toLowerCase()}-list-item-${index}`}
                          >
                            {parse(listItem)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Fragment>
                ))}
              {!!item.subparagraphs &&
                item.subparagraphs.map((subparagraph) => (
                  <div
                    key={subparagraph.label}
                    className={'flex flex-col gap-3.5 md:gap-5.5'}
                  >
                    <h3 className={'text-18 md:text-xl font-medium'}>
                      {subparagraph.label}
                    </h3>
                    {subparagraph.paragraphs.map((paragraph, index) => (
                      <Fragment
                        key={`${subparagraph.label.toLowerCase()}-paragraph-${index}`}
                      >
                        <p className={'text-sm md:text-base font-medium'}>
                          {parse(paragraph.text)}
                        </p>
                        {!!paragraph.list && (
                          <ul className={'list-disc pl-5 md:pl-10'}>
                            {paragraph.list.map((listItem, index) => (
                              <li
                                className={'text-sm md:text-base font-medium'}
                                key={`${subparagraph.label.toLowerCase()}-list-item-${index}`}
                              >
                                {parse(listItem)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </Fragment>
                    ))}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
