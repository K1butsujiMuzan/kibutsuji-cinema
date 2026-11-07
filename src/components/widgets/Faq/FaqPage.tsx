import { faqData } from '@/components/widgets/Faq/faq.data'
import { FaqCloseIcon, FaqOpenIcon } from '@/components/widgets/Faq/FaqIcons'

export default function FaqPage() {
  return (
    <main className={'pb-8 pt-4'}>
      <section className={'container-flex gap-5 md:gap-10'}>
        <h1 className={'text-2xl md:text-34 font-semibold text-center'}>
          Frequently Asked Questions
        </h1>
        <ul className={'flex flex-col gap-4 justify-center items-center'}>
          {faqData.map((item) => (
            <li key={item.question} className={'w-full'}>
              <details
                className={'group flex flex-col open:gap-3 border-b pb-4'}
              >
                <summary
                  className={
                    'list-none flex justify-between items-center cursor-pointer gap-6'
                  }
                >
                  <h2 className={'text-xl md:text-2xl leading-8 font-medium'}>
                    {item.question}
                  </h2>
                  <FaqOpenIcon />
                  <FaqCloseIcon />
                </summary>
                <p className={'text-base md:text-18 leading-5.5'}>
                  {item.answer}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
