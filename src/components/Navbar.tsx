import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { WHATSAPP_URL } from '../constants'

const links = [
  { label: 'Início',     href: '#inicio'    },
  { label: 'Sobre',      href: '#sobre'      },
  { label: 'Cardápio',   href: '#cardapio'  },
  { label: 'Promoções',  href: '#promocoes' },
  { label: 'Localização',href: '#contato'   },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brand-dark shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex flex-col leading-none">
          <span className="font-display text-3xl text-brand-yellow tracking-wider">
            Paralela
          </span>
          <span className="font-heading text-[10px] text-white tracking-[0.3em] uppercase -mt-1">
            Pizzaria e Restaurante
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-heading text-sm uppercase tracking-widest text-white/80 hover:text-brand-yellow transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm py-2 px-5"
          >
            Peça Agora
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-brand-dark border-t border-white/10">
          <nav className="flex flex-col px-6 py-4 gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-heading text-base uppercase tracking-widest text-white/80 hover:text-brand-yellow transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center"
            >
              Peça Agora
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}