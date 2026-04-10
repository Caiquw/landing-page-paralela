export default function Sobre() {
    return (
      <section id="sobre" className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="reveal relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-brand-red rounded-sm" />
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
              alt="Interior da Paralela Pizzaria"
              className="relative w-full h-[420px] object-cover rounded-sm shadow-xl"
            />
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-brand-red text-white text-center px-6 py-4 shadow-lg">
              <span className="font-display text-4xl leading-none block">+5</span>
              <span className="font-heading text-xs uppercase tracking-widest">Anos de sabor</span>
            </div>
          </div>
  
          {/* Text */}
          <div className="reveal">
            <span className="font-heading text-brand-red text-sm uppercase tracking-[0.3em] font-semibold">
              Nossa história
            </span>
            <h2 className="section-title text-brand-dark mt-2 mb-6">
              Feito com amor,
              <br />
              <span className="text-brand-red">assado na brasa</span>
            </h2>
            <p className="font-body text-brand-dark/70 text-lg leading-relaxed mb-4">
              A Paralela nasceu do amor pela boa comida e pelo prazer de reunir pessoas ao redor de
              uma mesa. Somos uma pizzaria e restaurante familiar no coração de Orlândia, com o
              compromisso de entregar qualidade em cada fatia.
            </p>
            <p className="font-body text-brand-dark/70 text-lg leading-relaxed mb-8">
              Nossa massa é preparada artesanalmente, com ingredientes frescos selecionados, e
              nossos sabores são criados para agradar todos os paladares — do clássico ao
              especial.
            </p>
  
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 border-t border-brand-dark/10 pt-8">
              {[
                { num: '+40', label: 'Sabores' },
                { num: '7',   label: 'Dias/semana' },
                { num: '😍',  label: 'Clientes felizes' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <span className="font-display text-4xl text-brand-red block">{s.num}</span>
                  <span className="font-heading text-xs uppercase tracking-widest text-brand-dark/60">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }