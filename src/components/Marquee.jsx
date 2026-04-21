import { motion } from 'framer-motion'

const TEXT = 'filmmaker \u00b7 photographer \u00b7 visual storyteller \u00b7 bangalore \u00b7 pune \u00b7 nzriyaa \u00b7 \u00a0\u00a0'

export default function Marquee() {
  return (
    <div className="overflow-hidden border-t border-white/[0.07] border-b border-white/[0.07] py-[10px] bg-black">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap will-change-transform"
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="font-mono text-[0.63rem] tracking-[0.28em] uppercase text-white/15 mr-14 shrink-0"
          >
            {TEXT}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
