import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Photographs data ─── */
// All photos shown in the masonry gallery sub-page
const PHOTOS = [
  'DSC_0056.jpg.jpeg', 'DSC_0139.jpg', 'DSC_0190.jpg', 'DSC_0307-2.jpg',
  'DSC_0334.jpg.jpeg', 'DSC_0347.jpg', 'DSC_0450.jpg', 'DSC_0583.jpg',
  'DSC_0794-2.jpg', 'DSC_1265.jpg', 'DSC_1341-2.jpg', 'DSC_1349.jpg.jpeg',
  'Gp17.jpg', 'IMG_2831.jpg', 'IMG_2848.jpg', 'IMG_3020.jpg', 'IMG_7526.jpg.jpeg',
]

/* ─── Films data ─── */
// img paths: drop stills into /public/films/ when ready.
// Until then, each card shows its gradient + title.
const DIRECTED = [
  {
    title: 'Anokhi Olakh',
    type: 'Short Film',
    img: '/films/anokhi-olakh.png',
    grad: ['#110820', '#05040f'],
    url: 'https://youtu.be/_1ifFTJB9J8?si=v43XOqsfF91df5u5',
  },
  {
    title: 'Saaran',
    type: 'Short Film',
    img: '/films/saaran.png',
    grad: ['#071610', '#030c07'],
    url: 'https://www.youtube.com/watch?v=REPLACE_SAARAN',
  },
]

const CREW = [
  {
    title: 'Nived No Diwas',
    type: 'Short Film',
    img: '/films/nived-no-diwas.png',
    grad: ['#070e1a', '#030810'],
    url: 'https://youtu.be/mjacAWNe7DA?si=LdMDZEZyzJ_3K0tQ',
  },
  {
    title: 'A Tiny Cut',
    type: 'Short Film',
    img: '/films/a-tiny-cut.jpg',
    grad: ['#180808', '#0b0404'],
    url: 'https://www.youtube.com/watch?v=REPLACE_A_TINY_CUT',
  },
  {
    title: 'Pasoori',
    type: 'Music Video',
    img: '/films/pasoori.png',
    grad: ['#16100a', '#0d0805'],
    url: 'https://youtu.be/WrN0c4VHR0k?si=QzKymV9O-2C8Xe3z',
  },
]

/* ═══ Main component ═══ */
export default function SubPage({ page, onClose }) {
  const [lightbox, setLightbox] = useState(null) // numeric index or null

  return (
    <AnimatePresence>
      {page && (
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 bg-black z-[600] overflow-y-auto"
        >
          {/* Sticky top bar */}
          <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm flex items-center justify-between px-[8vw] py-5 border-b border-white/[0.07]">
            <button
              onClick={onClose}
              className="font-mono text-[0.72rem] tracking-[0.12em] text-white/45 hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer"
            >
              ← back
            </button>
            <span className="font-mono text-[0.6rem] tracking-[0.22em] text-white/20">nzriyaa</span>
          </div>

          {/* ── PHOTOGRAPHS ── */}
          {page === 'photographs' && (
            <div className="px-[8vw] pt-12 pb-24">
              <h1
                className="font-terminal font-normal leading-none tracking-[-0.02em] text-white mb-2"
                style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
              >
                Photographs
              </h1>
              <p className="font-mono text-[0.62rem] tracking-[0.2em] uppercase text-white/25 mb-12">
                {PHOTOS.length} frames
              </p>

              <div style={{ columns: 3, columnGap: '12px' }}>
                {PHOTOS.map((photo, i) => (
                  <motion.div
                    key={photo}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    style={{ breakInside: 'avoid', marginBottom: '12px' }}
                    className="overflow-hidden cursor-pointer"
                    onClick={() => setLightbox(i)}
                  >
                    <img
                      src={`/photographs/${photo}`}
                      alt=""
                      className="w-full block object-cover transition-transform duration-700 ease-out hover:scale-105"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ── FILMS ── */}
          {page === 'films' && (
            <div className="pb-24">
              {/* Page title */}
              <div className="px-[8vw] pt-12 pb-10 border-b border-white/[0.06]">
                <h1
                  className="font-terminal font-normal leading-none tracking-[-0.02em] text-white mb-2"
                  style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
                >
                  Films
                </h1>
              </div>

              {/* Section: Directed */}
              <FilmGroup label="Directed by Tanvi Bhalerao" films={DIRECTED} startIndex={0} />

              {/* Section: Crew */}
              <FilmGroup label="Worked as Crew" films={CREW} startIndex={DIRECTED.length} />
            </div>
          )}
          {/* Lightbox — rendered inside the sub-page layer */}
          <Lightbox
            photos={PHOTOS}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onChange={setLightbox}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ═══ Lightbox ═══ */
function Lightbox({ photos, index, onClose, onChange }) {
  const total = photos.length

  const prev = useCallback(() =>
    onChange(i => (i - 1 + total) % total), [total, onChange])

  const next = useCallback(() =>
    onChange(i => (i + 1) % total), [total, onChange])

  // Keyboard navigation
  useEffect(() => {
    if (index === null) return
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [index, prev, next, onClose])

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[900] bg-black flex items-center justify-center"
          onClick={onClose}
        >
          {/* Image — hard cut, no animation */}
          <img
            src={`/photographs/${photos[index]}`}
            alt=""
            className="max-w-full max-h-full object-contain select-none"
            style={{ maxHeight: '90vh', maxWidth: '90vw' }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Left arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/60 transition-all duration-200 bg-black/40 hover:bg-black/70 font-mono text-lg cursor-pointer"
          >
            ←
          </button>

          {/* Right arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/60 transition-all duration-200 bg-black/40 hover:bg-black/70 font-mono text-lg cursor-pointer"
          >
            →
          </button>

          {/* Counter + close */}
          <div className="absolute top-6 left-0 right-0 flex items-center justify-between px-6">
            <span className="font-mono text-[0.6rem] tracking-[0.2em] text-white/30 uppercase">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button
              onClick={onClose}
              className="font-mono text-[0.65rem] tracking-[0.12em] text-white/40 hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer"
            >
              [ esc ] close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ═══ Film group (section header + cards) ═══ */
function FilmGroup({ label, films, startIndex }) {
  return (
    <div>
      {/* Group header */}
      <div className="flex items-center gap-6 px-[8vw] py-6 border-b border-white/[0.06]">
        <span className="font-mono text-[0.58rem] tracking-[0.28em] uppercase text-white/30 shrink-0">
          {label}
        </span>
        <div className="flex-1 h-px bg-white/[0.06]" />
        <span className="font-mono text-[0.56rem] tracking-[0.2em] text-white/20 shrink-0">
          {films.length} {films.length === 1 ? 'film' : 'films'}
        </span>
      </div>

      {/* Cards */}
      {films.map((film, i) => (
        <FilmCard key={film.title} film={film} index={startIndex + i} />
      ))}
    </div>
  )
}

/* ═══ Individual film card ═══ */
function FilmCard({ film, index }) {
  const [hasImage, setHasImage] = useState(true)

  return (
    <motion.div
      className="relative w-full overflow-hidden border-b border-white/[0.06] cursor-pointer"
      style={{ minHeight: '42vh' }}
      initial="rest"
      whileHover="hover"
      animate="rest"
      onClick={() => film.url && window.open(film.url, '_blank', 'noopener,noreferrer')}
    >
      {/* ── Film still (visible by default, hides on hover) ── */}
      <motion.div
        variants={{
          rest: { opacity: hasImage ? 1 : 0 },
          hover: { opacity: 0 },
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <img
          src={film.img}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setHasImage(false)}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)' }}
        />
      </motion.div>

      {/* ── White fill sweep in on hover ── */}
      <motion.div
        variants={{
          rest: { scaleX: 0 },
          hover: { scaleX: 1 },
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 1 }}
        className="absolute inset-0 bg-white"
      />

      {/* ── Card content ── */}
      <div
        className="relative z-10 flex flex-col justify-between px-[8vw] py-8 text-right"
        style={{ minHeight: '42vh' }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between">
          <motion.span
            variants={{ rest: { color: 'rgba(255,255,255,0.35)' }, hover: { color: 'rgba(0,0,0,0.25)' } }}
            transition={{ duration: 0.3 }}
            className="font-mono text-[0.55rem] tracking-[0.28em] uppercase"
          >
            {String(index + 1).padStart(2, '0')}
          </motion.span>
          <motion.span
            variants={{ rest: { color: 'rgba(255,255,255,0.75)' }, hover: { color: 'rgba(0,0,0,0.5)' } }}
            transition={{ duration: 0.3 }}
            className="font-mono text-[0.58rem] tracking-[0.22em] uppercase"
          >
            {film.type}
          </motion.span>
        </div>

        {/* Title */}
        <motion.h2
          variants={{ rest: { color: '#ffffff' }, hover: { color: '#000000' } }}
          transition={{ duration: 0.3 }}
          className="font-terminal font-normal leading-none tracking-[-0.02em] uppercase self-end"
          style={{ fontSize: 'clamp(2rem, 5.5vw, 5rem)' }}
        >
          {film.title}
          <motion.span
            variants={{ rest: { opacity: 1, x: 0, color: 'rgba(255,255,255,0.6)' }, hover: { opacity: 1, x: 0, color: 'rgba(0,0,0,0.5)' } }}
            transition={{ duration: 0.3 }}
            className="ml-4 text-[0.4em] align-middle tracking-[0.1em]"
          >
            ↗
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  )
}
