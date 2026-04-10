const images = [
    {
      src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=80',
      alt: 'Pizza artesanal',
      cls: 'row-span-2',
    },
    {
      src: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80',
      alt: 'Pizza pepperoni',
      cls: '',
    },
    {
      src: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&q=80',
      alt: 'Pizza portuguesa',
      cls: '',
    },
    {
      src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700&q=80',
      alt: 'Pizza calabresa',
      cls: 'col-span-2',
    },
    {
      src: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500&q=80',
      alt: 'Quatro queijos',
      cls: '',
    },
  ]
  
  export default function Galeria() {
    return (
      <section id="galeria" className="py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16 reveal">
            <span className="font-heading text-brand-red text-sm uppercase tracking-[0.3em] font-semibold">
              Veja de perto
            </span>
            <h2 className="section-title text-brand-dark mt-2">Galeria</h2>
            <div className="mt-4 mx-auto w-16 h-1 bg-brand-yellow" />
          </div>
  
          {/* Mosaic grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] gap-4 reveal">
            {images.map((img) => (
              <div
                key={img.src}
                className={`overflow-hidden group cursor-pointer ${img.cls}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          <p className="text-center mt-8 reveal">
            <a
              href="https://instagram.com/paralelapizzaria"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-brand-red hover:text-brand-red-dark uppercase tracking-widest text-sm inline-flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Ver mais no Instagram @paralelapizzaria
            </a>
          </p>
        </div>
      </section>
    )
  }