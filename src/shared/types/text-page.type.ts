export type TTextPageData = {
  label: string
  paragraphs?: TTextPageDataParagraph[]
  subparagraphs?: TTextPageDataSubparagraph[]
}

type TTextPageDataParagraph = {
  text: string
  list?: string[]
}

type TTextPageDataSubparagraph = {
  label: string
  paragraphs: TTextPageDataParagraph[]
}
