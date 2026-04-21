import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-black flex items-center px-[8vw] py-24 pb-36 overflow-hidden"
    >
      {/* Ghost number */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute left-[-2vw] bottom-[-4vw] font-terminal font-bold text-white/[0.015] leading-none"
        style={{ fontSize: '28vw' }}
      >
        03
      </span>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="w-full"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[5vw] items-start">

          {/* Left: Bio */}
          <div>
            <h2
              className="font-terminal font-normal leading-[1.05] tracking-[-0.02em] text-white mb-7"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5rem)' }}
            >
              about<br />nzriyaa.
            </h2>

            <div className="w-9 h-px bg-white/40 mb-7" />

            <p className="font-monument text-[0.82rem] leading-[2.1] tracking-[0.03em] text-white/72 max-w-[500px] mb-5">
              I am a filmmaker and photographer based in Bangalore and Pune.
              My work explores the intersection of memory, light, and time —
              capturing the quiet moments between movement and stillness.
            </p>

            <p className="font-monument text-[0.82rem] leading-[2.1] tracking-[0.03em] text-white/44 max-w-[500px]">
              Through film and photography, I attempt to build visual languages
              that speak of the spaces we inhabit and the stories we leave behind.
              Every frame is an act of attention.
            </p>

            <div className="flex gap-9 flex-wrap mt-8">
              <MetaBlock label="based in" value="Bangalore · Pune" />
              <MetaBlock label="discipline" value="Film · Photography" />
            </div>
          </div>

          {/* Right: Portrait — fills column, image defines its own proportions */}
          <div className="w-full overflow-hidden border border-white/[0.08]">
            <img
              src="/about-me.jpeg"
              alt="nzriyaa"
              className="w-full h-auto block object-cover"
            />
          </div>

        </div>
      </motion.div>
    </section>
  )
}

function MetaBlock({ label, value }) {
  return (
    <div>
      <p className="font-mono text-[0.56rem] tracking-[0.22em] uppercase text-white/28 mb-1">{label}</p>
      <p className="font-mono text-[0.78rem] tracking-[0.06em]">{value}</p>
    </div>
  )
}
