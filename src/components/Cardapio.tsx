import { useEffect, useRef, useState } from 'react'
import { fetchCardapio } from '../lib/sheets'
import type { CardapioItem } from '../lib/sheets'
import { WHATSAPP_URL } from '../constants'

// ─── Dados de fallback (enquanto Sheets não carrega) ────────────────────────
const FALLBACK: CardapioItem[] = [
  // Pizzas Clássicas
  { id: '1',  name: 'Margherita',            description: 'Molho de tomate, mussarela fresca, tomate cereja e manjericão.', category: 'Pizzas Clássicas',       price: '45,00', tag: 'Clássica', imageUrl: '' },
  { id: '2',  name: 'Calabresa',             description: 'Molho de tomate, mussarela, calabresa fatiada e cebola roxa.',   category: 'Pizzas Clássicas',       price: '42,00', tag: 'Favorita', imageUrl: '' },
  { id: '3',  name: 'Portuguesa',            description: 'Molho de tomate, mussarela, presunto, ovo e azeitona.',           category: 'Pizzas Clássicas',       price: '44,00', tag: '',         imageUrl: '' },
  // Pizzas Especiais
  { id: '4',  name: 'Quatro Queijos',        description: 'Mussarela, parmesão, gorgonzola e catupiry.',                     category: 'Pizzas Especiais',       price: '52,00', tag: 'Especial', imageUrl: '' },
  { id: '5',  name: 'Frango c/ Catupiry',    description: 'Frango desfiado temperado com catupiry original.',                category: 'Pizzas Especiais',       price: '50,00', tag: '',         imageUrl: '' },
  // Pizzas Especiais Light
  { id: '6',  name: 'Frango Light',          description: 'Frango grelhado, ricota, tomate cereja e rúcula.',                category: 'Pizzas Especiais Light', price: '48,00', tag: 'Light',    imageUrl: '' },
  // Macarrão
  { id: '7',  name: 'Macarrão ao Sugo',      description: 'Massa ao molho de tomate fresco com manjericão.',                 category: 'Macarrão',               price: '38,00', tag: '',         imageUrl: '' },
  // Lanches
  { id: '8',  name: 'X-Burguer',             description: 'Pão, hambúrguer artesanal, queijo, alface e tomate.',             category: 'Lanches',                price: '28,00', tag: '',         imageUrl: '' },
  // Panquecas
  { id: '9',  name: 'Panqueca de Frango',    description: 'Massa fina recheada com frango desfiado e molho ao sugo.',        category: 'Panquecas',              price: '35,00', tag: '',         imageUrl: '' },
  // Á la carte
  { id: '10', name: 'Filé ao Molho Madeira', description: 'Filé mignon grelhado com molho madeira e batata sauté.',          category: 'Á la carte',             price: '65,00', tag: '',         imageUrl: '' },
  // Prato Executivo
  { id: '11', name: 'Prato do Dia',          description: 'Prato completo com proteína, arroz, feijão e salada.',            category: 'Prato Executivo',        price: '32,00', tag: '',         imageUrl: '' },
  // Porções quentes
  { id: '12', name: 'Frango à Passarinho',   description: 'Frango temperado e frito, crocante por fora e macio por dentro.', category: 'Porções quentes',        price: '45,00', tag: 'Favorita', imageUrl: '' },
  // Porções frias
  { id: '13', name: 'Tábua de Frios',        description: 'Seleção de queijos, embutidos, azeitonas e pães.',                category: 'Porções frias',          price: '55,00', tag: '',         imageUrl: '' },
  // Pizzas doces
  { id: '14', name: 'Chocolate c/ Morango',  description: 'Chocolate ao leite derretido com morangos frescos.',              category: 'Pizzas doces',           price: '48,00', tag: '',         imageUrl: '' },
  // Batata recheada
  { id: '15', name: 'Batata c/ Cheddar',     description: 'Batata assada recheada com cheddar cremoso e bacon.',             category: 'Batata recheada',        price: '32,00', tag: 'Especial', imageUrl: '' },
  // Bordas
  { id: '16', name: 'Borda de Catupiry',     description: 'Borda recheada com catupiry original.',                           category: 'Bordas',                 price: '12,00', tag: '',         imageUrl: '' },
]



// ─── Componente principal ────────────────────────────────────────────────────
export default function Cardapio() {
  const [items, setItems]         = useState<CardapioItem[]>(FALLBACK)
  const [loading, setLoading]     = useState(true)
  const [activeTab, setActiveTab] = useState<string>('')
  const gridRef                   = useRef<HTMLDivElement>(null)
  const tabsRef                   = useRef<HTMLDivElement>(null)

  // Busca do Sheets / API
  useEffect(() => {
    fetchCardapio()
      .then((data) => { if (data.length > 0) setItems(data) })
      .catch(() => console.warn('Cardápio offline — usando dados locais.'))
      .finally(() => setLoading(false))
  }, [])

  // Define aba inicial quando os dados chegam
  useEffect(() => {
    if (!loading && items.length > 0) {
      const firstCategory = getCategories(items)[0]
      setActiveTab((prev) => prev || firstCategory)
    }
  }, [loading, items])

  // Observer para animação dos cards
  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.card-reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    cards.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [activeTab, loading])

  const categories    = getCategories(items)
  const filtered      = items.filter((i) => i.category === activeTab)

  const handleTabClick = (cat: string) => {
    setActiveTab(cat)
    // Scroll suave para a seção
    document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Scroll horizontal nas abas com arrastar
  const handleTabScroll = (e: React.WheelEvent) => {
    if (tabsRef.current) tabsRef.current.scrollLeft += e.deltaY
  }

  return (
    <section id="cardapio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="text-center mb-12 reveal">
          <span className="font-heading text-brand-red text-sm uppercase tracking-[0.3em] font-semibold">
            O que temos para você
          </span>
          <h2 className="section-title text-brand-dark mt-2">Cardápio</h2>
          <div className="mt-4 mx-auto w-16 h-1 bg-brand-yellow" />
          <p className="mt-6 text-brand-dark/60 font-body text-lg max-w-xl mx-auto">
            Escolha sua categoria e monte o seu pedido favorito.
          </p>
        </div>

        {/* ── Abas de categoria ── */}
        {!loading && (
          <div
            ref={tabsRef}
            onWheel={handleTabScroll}
            className="flex gap-2 overflow-x-auto pb-3 mb-10 scrollbar-hide snap-x"
            style={{ scrollbarWidth: 'none' }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleTabClick(cat)}
                className={`
                  snap-start flex-shrink-0 font-heading text-xs uppercase tracking-widest px-5 py-3
                  border-2 transition-all duration-200 whitespace-nowrap
                  ${activeTab === cat
                    ? 'bg-brand-red border-brand-red text-white'
                    : 'border-brand-dark/20 text-brand-dark/60 hover:border-brand-red hover:text-brand-red'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* ── Skeleton ── */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="bg-brand-gray animate-pulse h-80 rounded-sm" />
            ))}
          </div>
        )}

        {/* ── Grid de cards ── */}
        {!loading && (
          <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-brand-dark/40 font-body py-20">
            Nenhum item nesta categoria ainda.
          </p>
        )}

        <p className="text-center mt-12 font-body text-brand-dark/40 text-sm reveal">
          * Preços sujeitos a alteração. Consulte disponibilidade no local.
        </p>
      </div>
    </section>
  )
}

// ─── Card individual ─────────────────────────────────────────────────────────
function MenuCard({ item, index }: { item: CardapioItem; index: number }) {
  const waMessage = encodeURIComponent(
    `Olá! Vim pelo site e gostaria de pedir: *${item.name}*`
  )
  const waUrl = `${WHATSAPP_URL.split('?')[0]}?text=${waMessage}`

  return (
    <div
      className="card-reveal group flex flex-col bg-white border border-brand-gray shadow-sm hover:shadow-lg transition-all duration-300"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Imagem — só renderiza se tiver URL */}
      {item.imageUrl && (
        <div className="relative overflow-hidden h-48">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {item.tag && (
            <span className="absolute top-3 left-3 bg-brand-red text-white font-heading text-xs uppercase tracking-widest px-3 py-1">
              {item.tag}
            </span>
          )}
        </div>
      )}

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 p-5">
        {/* Tag aparece aqui quando não tem imagem */}
        {item.tag && !item.imageUrl && (
          <span className="self-start bg-brand-red text-white font-heading text-xs uppercase tracking-widest px-3 py-1 mb-3">
            {item.tag}
          </span>
        )}
        <h3 className="font-heading text-lg font-bold text-brand-dark uppercase tracking-wide mb-1">
          {item.name}
        </h3>

        {item.description && (
          <p className="font-body text-brand-dark/55 text-sm leading-relaxed mb-4 flex-1">
            {item.description}
          </p>
        )}

        {/* Preço + botão */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-gray">
          <span className="font-display text-2xl text-brand-red leading-none">
            {item.price ? `R$ ${item.price}` : ''}
          </span>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-heading text-xs uppercase tracking-widest px-4 py-2 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Pedir
          </a>
        </div>
      </div>

      {/* Barra vermelha no hover */}
      <div className="h-0.5 bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getCategories(items: CardapioItem[]): string[] {
  const seen = new Set<string>()
  return items
    .map((i) => i.category)
    .filter((cat) => { if (seen.has(cat)) return false; seen.add(cat); return true })
}