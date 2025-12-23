import Premium from '@/ui/premium/Premium'

export default function WelcomePremium() {
  return (
    <section className={'flex flex-col items-center gap-8 md:gap-14'}>
      <h2 className={'text-28 md:text-56 text-center font-bold px-3'}>
        Choose your Premium
      </h2>
      <Premium />
    </section>
  )
}
