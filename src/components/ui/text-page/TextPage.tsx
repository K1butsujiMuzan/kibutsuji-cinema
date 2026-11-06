import type { TTextPageData } from '@/shared/types/text-page.type'
import parse from 'html-react-parser'
import { Fragment } from 'react'

type Props = {
  title: string
  preface: string[]
  textPageData: TTextPageData[]
}

export default function TextPage({ title, preface, textPageData }: Props) {
  return (
    <main className={'pb-8 pt-4'}>
      <section className={'flex flex-col gap-5 md:gap-10 container-flex'}>
        <h1 className={'text-2xl md:text-34 font-semibold text-center'}>
          {title}
        </h1>
        <div className={'flex flex-col gap-4 md:gap-6'}>
          {preface.map((item, index) => (
            <p key={`preface-${index}`} className={'text-sm md:text-base'}>
              {parse(item)}
            </p>
          ))}
        </div>
        <div className={'flex flex-col gap-5 md:gap-10'}>
          {textPageData.map((item) => (
            <div key={item.label} className={'flex flex-col gap-4 md:gap-6'}>
              <h2 className={'text-xl md:text-22 font-medium'}>{item.label}</h2>
              {!!item.paragraphs &&
                item.paragraphs.map((paragraph, index) => (
                  <Fragment
                    key={`${item.label.toLowerCase()}-paragraph-${index}`}
                  >
                    <p className={'text-sm md:text-base'}>
                      {parse(paragraph.text)}
                    </p>
                    {!!paragraph.list && (
                      <ul className={'list-disc pl-5 md:pl-10'}>
                        {paragraph.list.map((listItem, index) => (
                          <li
                            className={'text-sm md:text-base'}
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
                        <p className={'text-sm md:text-base'}>
                          {parse(paragraph.text)}
                        </p>
                        {!!paragraph.list && (
                          <ul className={'list-disc pl-5 md:pl-10'}>
                            {paragraph.list.map((listItem, index) => (
                              <li
                                className={'text-sm md:text-base'}
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
