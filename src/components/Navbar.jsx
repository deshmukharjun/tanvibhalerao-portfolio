import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar({ onContactClick }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-8 py-[18px] bg-transparent transition-all duration-500`}
    >
      <button
        onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-transparent border-none cursor-pointer p-0 flex items-center opacity-60 hover:opacity-100 transition-opacity duration-200"
        aria-label="Go to home"
      >
        <img src="/favicon.svg" alt="nzriyaa" className="w-12 h-12" />
      </button>

      <div className="flex items-center gap-8">
        {['photographs', 'films', 'about'].map((item) => (
          <NavLink key={item} onClick={() => scrollTo(item)}>
            {item}
          </NavLink>
        ))}
        <NavLink onClick={onContactClick}>contact us</NavLink>
      </div>
    </motion.nav>
  )
}

function NavLink({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative font-mono text-[0.72rem] tracking-[0.14em] lowercase text-white/70 hover:text-white transition-colors duration-200 group bg-transparent border-none cursor-pointer p-0"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
    </button>
  )
}
