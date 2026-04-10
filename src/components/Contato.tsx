import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react'
import {
  WHATSAPP_URL,
  MAPS_URL,
  MAPS_EMBED_URL,
  PHONE_DISPLAY,
  PHONE_LINK,
  ADDRESS,
  HOURS,
} from '../constants'

export default function Contato() {
  return (
    <section id="contato" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="font-heading text-brand-red text-sm uppercase tracking-[0.3em] font-semibold">
            Nos encontre
          </span>
          <h2 className="section-title text-brand-dark mt-2">Localização & Contato</h2>
          <div className="mt-4 mx-auto w-16 h-1 bg-brand-yellow" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Info cards */}
          <div className="reveal space-y-6">
            <InfoCard
              icon={<MapPin size={22} />}
              label="Endereço"
              value={ADDRESS}
              action={
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-xs uppercase tracking-widest text-brand-red hover:underline"
                >
                  Ver no Google Maps →
                </a>
              }
            />

            <InfoCard
              icon={<Phone size={22} />}
              label="Telefone"
              value={PHONE_DISPLAY}
              action={
                <a
                  href={PHONE_LINK}
                  className="font-heading text-xs uppercase tracking-widest text-brand-red hover:underline"
                >
                  Ligar agora →
                </a>
              }
            />

            <InfoCard
              icon={<Clock size={22} />}
              label="Horário"
              value={HOURS}
            />

            <InfoCard
              icon={<MessageCircle size={22} />}
              label="WhatsApp"
              value="(16) 9.9218-9233"
              action={
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-xs uppercase tracking-widest text-brand-red hover:underline"
                >
                  Enviar mensagem →
                </a>
              }
            />

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center flex-1"
              >
                🍕 Pedir agora
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-brand-dark text-white font-heading font-semibold uppercase tracking-widest px-8 py-4 hover:bg-brand-dark/80 transition-colors"
              >
                📍 Como chegar
              </a>
            </div>
          </div>

          {/* Map embed */}
          <div className="reveal h-[420px] shadow-xl overflow-hidden">
            <iframe
              src={MAPS_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Paralela Pizzaria"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoCard({
  icon,
  label,
  value,
  action,
}: {
  icon: React.ReactNode
  label: string
  value: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-5 p-6 border border-brand-gray bg-brand-gray/40 hover:border-brand-red transition-colors">
      <div className="flex-shrink-0 w-10 h-10 bg-brand-red text-white flex items-center justify-center">
        {icon}
      </div>
      <div>
        <span className="font-heading text-xs uppercase tracking-widest text-brand-dark/50 block mb-1">
          {label}
        </span>
        <p className="font-body text-brand-dark font-semibold text-base">{value}</p>
        {action && <div className="mt-1">{action}</div>}
      </div>
    </div>
  )
}