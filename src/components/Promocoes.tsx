import { WHATSAPP_RESERVA_URL, RODIZIO_DAYS, RODIZIO_TIME } from '../constants'

export default function Promocoes() {
  return (
    <section id="promocoes" className="relative py-0 overflow-hidden">
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1600&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-red/92" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <div className="reveal text-white">
          <span className="font-heading text-brand-yellow text-sm uppercase tracking-[0.3em] font-semibold">
            Promoção especial
          </span>

          <h2 className="font-display text-7xl md:text-8xl leading-none mt-2 mb-1">
            Rodízio
          </h2>
          <h2 className="font-display text-5xl md:text-6xl leading-none text-brand-yellow mb-8">
            de Pizza
          </h2>

          <ul className="space-y-3 mb-10 font-body">
            <li className="flex items-center gap-3 text-lg">
              <span className="text-brand-yellow text-xl">📅</span>
              <span>
                <strong className="font-heading">{RODIZIO_DAYS}</strong> — toda semana
              </span>
            </li>
            <li className="flex items-center gap-3 text-lg">
              <span className="text-brand-yellow text-xl">⏰</span>
              <span>
                <strong className="font-heading">{RODIZIO_TIME}</strong>
              </span>
            </li>
            <li className="flex items-center gap-3 text-lg">
              <span className="text-brand-yellow text-xl">🎂</span>
              <span>
                Aniversariante com <strong className="font-heading">6+ pagantes</strong> não paga o rodízio
              </span>
            </li>
          </ul>

          <a
            href={WHATSAPP_RESERVA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-yellow text-brand-dark font-heading font-bold uppercase tracking-widest px-10 py-4 hover:bg-white transition-colors duration-300 hover:scale-105 active:scale-95 transform"
          >
            Reservar Mesa
          </a>
        </div>

        {/* Right: price card */}
        <div className="reveal flex justify-center md:justify-end">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-center px-12 py-14 shadow-2xl max-w-xs w-full">
            <span className="font-heading text-sm uppercase tracking-[0.3em] text-brand-yellow block mb-4">
              Apenas
            </span>
            <div className="font-display leading-none">
              <span className="text-3xl align-top mt-4 inline-block">R$</span>
              <span className="text-8xl text-brand-yellow">45</span>
              <span className="text-4xl">,90</span>
            </div>
            <span className="font-heading text-sm uppercase tracking-widest text-white/70 block mt-3">
              por pessoa
            </span>
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="font-body text-sm text-white/70 leading-relaxed">
                Pizza à vontade com as melhores combinações da casa
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}