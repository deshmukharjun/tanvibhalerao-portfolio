import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      id="home"
      className="scanlines relative w-screen h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Video */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover z-[1] opacity-90"
        onCanPlay={(e) => {
          // hide gradient once video is playing
          const grad = document.getElementById('hero-grad')
          if (grad) grad.style.opacity = '0'
        }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient fallback */}
      <div
        id="hero-grad"
        className="grad-hero absolute inset-0 z-[1] transition-opacity duration-700"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45 z-[2]" />

      {/* Content */}
      <div className="relative z-[4] flex flex-col items-center gap-5 text-center">
        <motion.h4
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="font-terminal font-normal leading-none tracking-[-0.03em] text-white select-none"
          style={{ fontSize: 'clamp(1rem, 16vw, 6rem)' }}
        >
          nzriyaa
        </motion.h4>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex gap-2 text-[1.8rem]"
        >
          <BouncingArrow delay={0} />
          <BouncingArrow delay={0.35} />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-[4] font-mono text-[0.57rem] tracking-[0.28em] uppercase text-white/25"
      >
        scroll to explore
      </motion.p>
    </section>
  )
}

function BouncingArrow({ delay }) {
  return (
    <motion.span
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay }}
      className="inline-block"
    >
      ↓
    </motion.span>
  )
}
