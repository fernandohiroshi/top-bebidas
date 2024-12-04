import Image from 'next/image'

function Hero() {
  return (
    <section className="relative h-[16rem] w-full overflow-x-hidden px-4 md:h-[20rem]">
      <Image
        src="https://images.pexels.com/photos/11945527/pexels-photo-11945527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        height={800}
        width={800}
        quality={100}
        alt="Feature Image"
        className="z-30 h-full w-full object-cover opacity-50"
      />
      <div className="absolute left-0 top-0 z-40 flex h-full w-full items-center justify-center bg-gradient-to-b from-slate-950 to-transparent">
        <div className="flex max-w-[16rem] flex-col text-center md:max-w-md">
          <h2 className="mb-2 animate-pulse text-lg md:text-4xl">
            Tabacaria e Produtos de Narguile.
          </h2>
        </div>
      </div>
    </section>
  )
}

export default Hero
