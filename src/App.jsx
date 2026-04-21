import { useState, useEffect } from 'react'
import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import Photographs   from './components/Photographs'
import Films         from './components/Films'
import About         from './components/About'
import ContactModal  from './components/ContactModal'
import SubPage       from './components/SubPage'
import Footer        from './components/Footer'

export default function App() {
  const [modalOpen,    setModalOpen]    = useState(false)
  const [activePage,   setActivePage]   = useState(null) // 'photographs' | 'films' | null

  // Close sub-pages + modal on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        setModalOpen(false)
        setActivePage(null)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Lock body scroll when modal or sub-page is open
  useEffect(() => {
    document.body.style.overflow = (modalOpen || activePage) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modalOpen, activePage])

  return (
    <>
      <Navbar onContactClick={() => setModalOpen(true)} />

      <main>
        <Hero />
        <Photographs onOpen={() => setActivePage('photographs')} />
        <Films       onOpen={() => setActivePage('films')} />
        <About />
      </main>

      <Footer />

      <ContactModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <SubPage
        page={activePage}
        onClose={() => setActivePage(null)}
      />
    </>
  )
}
