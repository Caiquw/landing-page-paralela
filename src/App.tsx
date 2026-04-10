import { useEffect } from 'react'
import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import Sobre       from './components/Sobre'
import Cardapio    from './components/Cardapio'
import Promocoes   from './components/Promocoes'
import Galeria     from './components/Galeria'
import Contato     from './components/Contato'
import Footer      from './components/Footer'
import WhatsAppFab from './components/Whatsappfab'

export default function App() {
  // Scroll-reveal observer
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <Sobre />
      <Cardapio />
      <Promocoes />
      <Galeria />
      <Contato />
      <Footer />
      <WhatsAppFab />
    </>
  )
}