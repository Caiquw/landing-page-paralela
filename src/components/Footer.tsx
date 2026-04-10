import { INSTAGRAM_URL, MAPS_URL, WHATSAPP_URL, ADDRESS, HOURS, PHONE_DISPLAY } from '../constants'

const navLinks = [
  { label: 'Início',      href: '#inicio'    },
  { label: 'Sobre',       href: '#sobre'      },
  { label: 'Cardápio',    href: '#cardapio'  },
  { label: 'Promoções',   href: '#promocoes' },
  { label: 'Localização', href: '#contato'   },
]

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="mb-4">
            <span className="font-display text-4xl text-brand-yellow tracking-wider block leading-none">
              Paralela
            </span>
            <span className="font-heading text-[10px] tracking-[0.3em] uppercase text-white/50">
              Pizzaria e Restaurante
            </span>
          </div>
          <p className="font-body text-white/50 text-sm leading-relaxed">
            A melhor pizza de Orlândia, feita com amor e ingredientes frescos.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-heading uppercase tracking-widest text-brand-yellow text-sm mb-5">
            Menu
          </h4>
          <ul className="space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-body text-white/50 hover:text-white transition-colors text-sm"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="font-heading uppercase tracking-widest text-brand-yellow text-sm mb-5">
            Informações
          </h4>
          <ul className="space-y-3 font-body text-sm text-white/50">
            <li>{ADDRESS}</li>
            <li>{PHONE_DISPLAY}</li>
            <li>{HOURS}</li>
            <li>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Ver no Google Maps
              </a>
            </li>
          </ul>
        </div>

        {/* Social & CTA */}
        <div>
          <h4 className="font-heading uppercase tracking-widest text-brand-yellow text-sm mb-5">
            Redes Sociais
          </h4>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-body text-sm text-white/50 hover:text-brand-yellow transition-colors mb-8"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            @paralelapizzaria
          </a>

          <div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-center block"
            >
              Peça agora
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-white/30 text-xs font-body">
          <span>© {new Date().getFullYear()} Paralela Pizzaria e Restaurante. Todos os direitos reservados.</span>
          <span>Orlândia, SP</span>
        </div>
      </div>
    </footer>
  )
}