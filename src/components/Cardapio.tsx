import { useEffect, useRef, useState } from 'react'
import { fetchPizzas } from '../lib/sheets'
import type { PizzaItem } from '../lib/sheets'

const FALLBACK: PizzaItem[] = [
  { id: '1', name: 'Margherita',        description: 'Molho de tomate, mussarela fresca, tomate cereja e manjericão.', tag: 'Clássica', imageUrl: '' },
  { id: '2', name: 'Calabresa',         description: 'Molho de tomate, mussarela, calabresa fatiada e cebola roxa.',   tag: 'Favorita', imageUrl: '' },
  { id: '3', name: 'Frango c/ Catupiry',description: 'Molho de tomate, mussarela, frango desfiado e catupiry original.', tag: '',       imageUrl: '' },
  { id: '4', name: 'Quatro Queijos',    description: 'Mussarela, parmesão, gorgonzola e catupiry sobre molho branco.', tag: 'Especial', imageUrl: '' },
  { id: '5', name: 'Portuguesa',        description: 'Molho de tomate, mussarela, presunto, ovo, azeitona e cebola.',  tag: '',        imageUrl: '' },
  { id: '6', name: 'Pepperoni',         description: 'Molho de tomate, mussarela e pepperoni importado fatiado.',       tag: 'Premium', imageUrl: '' },
]

const PLACEHOLDER = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80'

export default function Cardapio() {
  const [pizzas, setPizzas]   = useState<PizzaItem[]>(FALLBACK)
  const [loading, setLoading] = useState(true)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchPizzas()
      .then((data) => { if (data.length > 0) setPizzas(data) })
      .catch(() => console.warn('Sheets offline — usando dados locais.'))
      .finally(() => setLoading(false))
  }, [])

  // Roda o observer DEPOIS que os cards são renderizados
  useEffect(() => {
    if (loading || !gridRef.current) return

    const cards = gridRef.current.querySelectorAll('.card-reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    cards.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [loading]) // dispara quando loading muda para false

  return (
    <section id="cardapio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="font-heading text-brand-red text-sm uppercase tracking-[0.3em] font-semibold">
            Nossos sabores
          </span>
          <h2 className="section-title text-brand-dark mt-2">O Cardápio</h2>
          <div className="mt-4 mx-auto w-16 h-1 bg-brand-yellow" />
          <p className="mt-6 text-brand-dark/60 font-body text-lg max-w-xl mx-auto">
            Pizzas artesanais preparadas com ingredientes frescos, assadas na brasa
            para garantir a crocância perfeita.
          </p>
        </div>

        {/* Skeleton enquanto carrega */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="bg-brand-gray animate-pulse h-80 rounded-sm" />
            ))}
          </div>
        )}

        {/* Cards */}
        {!loading && (
          <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pizzas.map((p, i) => (
              <PizzaCard key={p.id} pizza={p} index={i} />
            ))}
          </div>
        )}

        
      </div>
    </section>
  )
}

function PizzaCard({ pizza, index }: { pizza: PizzaItem; index: number }) {
  const imgSrc = pizza.imageUrl || PLACEHOLDER

  return (
    <div
      // card-reveal em vez de reveal — observer próprio do Cardapio cuida disso
      className="card-reveal group relative overflow-hidden bg-brand-gray shadow-md hover:shadow-xl transition-shadow duration-300"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {pizza.tag && (
        <span className="absolute top-4 left-4 z-10 bg-brand-red text-white font-heading text-xs uppercase tracking-widest px-3 py-1">
          {pizza.tag}
        </span>
      )}

      <div className="overflow-hidden h-52">
        <img
          src={imgSrc}
          alt={pizza.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER }}
        />
      </div>

      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-brand-dark uppercase tracking-wide mb-2">
          {pizza.name}
        </h3>
        <p className="font-body text-brand-dark/60 text-sm leading-relaxed">
          {pizza.description}
        </p>
      </div>

      <div className="h-1 bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  )
}