import { ChevronDown } from 'lucide-react'
import { WHATSAPP_URL } from '../constants'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center text-center bg-hero-pizza bg-cover bg-center grain"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-brand-dark/90" />

      {/* Red accent bar bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red" />

      <div className="relative z-10 px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <span className="inline-block bg-brand-red text-white font-heading text-xs uppercase tracking-[0.3em] px-4 py-1.5 mb-6">
          Orlândia • SP
        </span>

        {/* Main headline */}
        <h1 className="font-display text-7xl sm:text-8xl md:text-[9rem] leading-none text-white mb-2">
          A Melhor
        </h1>
        <h1 className="font-display text-7xl sm:text-8xl md:text-[9rem] leading-none text-brand-yellow mb-6">
          Pizza
        </h1>
        <h1 className="font-display text-7xl sm:text-8xl md:text-[9rem] leading-none text-white mb-8">
          de Orlândia
        </h1>

        <p className="font-body text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          Sabores irresistíveis direto do forno para a sua mesa.
          <br />
          <span className="text-brand-yellow font-semibold">
            Rodízio toda Terça e Quinta a partir das 20h.
          </span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            🍕 Peça pelo WhatsApp
          </a>
          <a href="#cardapio" className="btn-outline">
            Ver Cardápio
          </a>
        </div>
      </div>

      {/* Scroll down indicator */}
      <a
        href="#sobre"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-brand-yellow transition-colors animate-bounce z-10"
        aria-label="Rolar para baixo"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  )
}