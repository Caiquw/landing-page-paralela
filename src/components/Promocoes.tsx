import { useEffect, useState } from 'react'
import { WHATSAPP_RESERVA_URL, RODIZIO_DAYS, RODIZIO_TIME } from '../constants'

interface RodizioConfig {
  Dias:     string
  Horario:  string
  Preco:    string
  Descricao: string
  AniversarianteTexto: string
}

const FALLBACK: RodizioConfig = {
  Dias:                RODIZIO_DAYS,
  Horario:             RODIZIO_TIME,
  Preco:               '45,90',
  Descricao:           'Pizza à vontade com as melhores combinações da casa',
  AniversarianteTexto: 'Aniversariante com 6+ pagantes não paga o rodízio',
}

export default function Promocoes() {
  const [config, setConfig] = useState<RodizioConfig>(FALLBACK)

  useEffect(() => {
    fetch('/api/rodizio')
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) setConfig({ ...FALLBACK, ...data })
      })
      .catch(() => {/* mantém fallback */})
  }, [])

  return (
    <section id="promocoes" className="relative py-0 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1600&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-red/92" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: texto */}
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
                <strong className="font-heading">{config.Dias}</strong> — toda semana
              </span>
            </li>
            <li className="flex items-center gap-3 text-lg">
              <span className="text-brand-yellow text-xl">⏰</span>
              <span>
                <strong className="font-heading">{config.Horario}</strong>
              </span>
            </li>
            <li className="flex items-center gap-3 text-lg">
              <span className="text-brand-yellow text-xl">🎂</span>
              <span>{config.AniversarianteTexto}</span>
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

        {/* Right: card de preço */}
        <div className="reveal flex justify-center md:justify-end">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-center px-12 py-14 shadow-2xl max-w-xs w-full">
            <span className="font-heading text-sm uppercase tracking-[0.3em] text-brand-yellow block mb-4">
              Apenas
            </span>

            <div className="font-display leading-none">
              <span className="text-3xl align-top mt-4 inline-block">R$</span>
              <span className="text-8xl text-brand-yellow">
                {config.Preco.split(',')[0]}
              </span>
              <span className="text-4xl">,{config.Preco.split(',')[1] ?? '90'}</span>
            </div>

            <span className="font-heading text-sm uppercase tracking-widest text-white/70 block mt-3">
              por pessoa
            </span>

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="font-body text-sm text-white/70 leading-relaxed">
                {config.Descricao}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}