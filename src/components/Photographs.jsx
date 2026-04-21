import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Photos used for the home-page 50/50 slideshow
const PHOTOS = [
  'DSC_0009.jpg.jpeg', 'DSC_0139.jpg', 'DSC_0583.jpg', 'DSC_0852.jpg',
  'DSC_1265.jpg', 'DSC_1352.jpg.jpeg', 'Gp17.jpg', 'IMG_4011.jpg.jpeg',
  'IMG_5124.jpg.jpeg', 'IMG_7526.jpg.jpeg',
]

export default function Photographs({ onOpen }) {
  const [index, setIndex] = useState(0)

  // Auto-cycle every 3 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % PHOTOS.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="photographs"
      className="relative w-screen overflow-hidden bg-black min-h-screen"
    >
      <div className="flex flex-col md:flex-row min-h-screen">

        {/* ── RIGHT: cycling photo — appears first on mobile ── */}
        <div className="relative overflow-hidden order-1 md:order-2 md:flex-1 h-[55vh] md:h-auto">
          <AnimatePresence>
            <motion.img
              key={index}
              src={`/photos-section/${PHOTOS[index]}`}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* ── LEFT: text + arrow — appears second on mobile ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col justify-center px-[8vw] py-14 md:py-0 w-full md:w-1/2 md:shrink-0 bg-black order-2 md:order-1"
        >

          <h2
            className="font-terminal font-normal lowercase leading-[0.92] text-white mb-10"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 6rem)' }}
          >
            photographs
          </h2>

          <button
            onClick={onOpen}
            className="group flex items-center gap-3 bg-transparent border-none text-white cursor-pointer p-0 w-fit"
          >
            <motion.span
              whileHover={{ x: 10 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="text-[1.6rem] inline-block"
            >
              →
            </motion.span>
            <span className="font-mono text-[0.75rem] tracking-[0.16em] uppercase text-white/70 group-hover:text-white transition-colors duration-200">
              view all
            </span>
          </button>

          {/* Dot indicator */}
          <div className="flex gap-[6px] mt-12">
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-[5px] h-[5px] rounded-full border-none cursor-pointer transition-all duration-300 p-0 ${
                  i === index ? 'bg-white' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
