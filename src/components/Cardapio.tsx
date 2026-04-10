interface Pizza {
    name: string
    desc: string
    img: string
    tag?: string
  }
  
  const pizzas: Pizza[] = [
    {
      name: 'Margherita',
      desc: 'Molho de tomate, mussarela fresca, tomate cereja e manjericão.',
      img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80',
      tag: 'Clássica',
    },
    {
      name: 'Calabresa',
      desc: 'Molho de tomate, mussarela, calabresa fatiada e cebola roxa.',
      img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80',
      tag: 'Favorita',
    },
    {
      name: 'Frango c/ Catupiry',
      desc: 'Molho de tomate, mussarela, frango desfiado temperado e catupiry original.',
      img: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500&q=80',
    },
    {
      name: 'Quatro Queijos',
      desc: 'Mussarela, parmesão, gorgonzola e catupiry sobre molho branco.',
      img: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500&q=80',
      tag: 'Especial',
    },
    {
      name: 'Portuguesa',
      desc: 'Molho de tomate, mussarela, presunto, ovo, azeitona e cebola.',
      img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&q=80',
    },
    {
      name: 'Pepperoni',
      desc: 'Molho de tomate, mussarela e pepperoni importado fatiado.',
      img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80',
      tag: 'Premium',
    },
  ]
  
  export default function Cardapio() {
    return (
      <section id="cardapio" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16 reveal">
            <span className="font-heading text-brand-red text-sm uppercase tracking-[0.3em] font-semibold">
              Nossos sabores
            </span>
            <h2 className="section-title text-brand-dark mt-2">
              O Cardápio
            </h2>
            <div className="mt-4 mx-auto w-16 h-1 bg-brand-yellow" />
            <p className="mt-6 text-brand-dark/60 font-body text-lg max-w-xl mx-auto">
              Pizzas artesanais preparadas com ingredientes frescos, assadas na brasa
              para garantir a crocância perfeita.
            </p>
          </div>
  
          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pizzas.map((p, i) => (
              <div
                key={p.name}
                className="reveal group relative overflow-hidden bg-brand-gray shadow-md hover:shadow-xl transition-shadow duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Tag */}
                {p.tag && (
                  <span className="absolute top-4 left-4 z-10 bg-brand-red text-white font-heading text-xs uppercase tracking-widest px-3 py-1">
                    {p.tag}
                  </span>
                )}
  
                {/* Image */}
                <div className="overflow-hidden h-52">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
  
                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-brand-dark uppercase tracking-wide mb-2">
                    {p.name}
                  </h3>
                  <p className="font-body text-brand-dark/60 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
  
                {/* Bottom accent */}
                <div className="h-1 bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            ))}
          </div>
  
          <p className="text-center mt-12 font-body text-brand-dark/50 text-sm reveal">
            * Cardápio completo disponível no local. Consulte nossos sabores sazonais.
          </p>
        </div>
      </section>
    )
  }