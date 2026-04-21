import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
}

export default function Films({ onOpen }) {
  return (
    <section
      id="films"
      className="scanlines relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Video */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover z-[1] opacity-40"
        onCanPlay={(e) => {
          const grad = document.getElementById('films-grad')
          if (grad) grad.style.opacity = '0'
        }}
      >
        <source src="/videos/films.mp4" type="video/mp4" />
      </video>

      {/* Gradient fallback */}
      <div
        id="films-grad"
        className="grad-films absolute inset-0 z-[1] transition-opacity duration-700"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/72 z-[2]" />

      {/* Content */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="relative z-[4] flex flex-col items-center gap-7 text-center px-8 pb-20"
      >

        <h2
          className="font-terminal font-normal leading-[0.95] tracking-[-0.03em] text-white"
          style={{ fontSize: 'clamp(5rem, 16vw, 6rem)' }}
        >
          films
        </h2>

        <button
          onClick={onOpen}
          className="group flex items-center gap-4 bg-transparent border-none text-white cursor-pointer p-0 hover:opacity-60 transition-opacity duration-300"
        >
          <DiagArrow delay={0} />
          <DiagArrow delay={0.18} />
          <DiagArrow delay={0.36} />
          <span className="font-mono text-[0.8rem] tracking-[0.2em] uppercase ml-2">
            view all films
          </span>
        </button>
      </motion.div>
    </section>
  )
}

function DiagArrow({ delay }) {
  return (
    <motion.span
      animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay }}
      className="inline-block text-[1.7rem]"
    >
      ↗
    </motion.span>
  )
}
