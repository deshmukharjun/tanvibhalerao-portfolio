import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContactModal({ open, onClose }) {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      onClose()
      setSent(false)
      e.target.reset()
    }, 1800)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          className="fixed inset-0 z-[800] flex items-center justify-center p-4 md:p-6"
          style={{
            background: 'rgba(0,0,0,0.78)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
          }}
        >
          <motion.div
            key="modal-box"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[500px] bg-[#040404] border border-white/10 px-6 py-8 md:px-12 md:py-11"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-[18px] right-[18px] font-mono text-[0.66rem] tracking-[0.1em] text-white/35 hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer"
            >
              [ esc ] close
            </button>

            <p className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-white/30 mb-3">
              [ contact ]
            </p>
            <h3 className="font-terminal text-[1.55rem] leading-none tracking-[-0.01em] mb-8">
              get in touch.
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <Field type="text"  placeholder="name_"    required />
              <Field type="email" placeholder="email_"   required />
              <TextareaField      placeholder="message_" required />

              <div className="flex justify-end mt-2">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`font-mono text-[0.75rem] tracking-[0.18em] uppercase px-8 py-3 border transition-all duration-300 cursor-pointer ${
                    sent
                      ? 'bg-transparent text-white border-white/30'
                      : 'bg-white text-black border-white hover:bg-transparent hover:text-white'
                  }`}
                >
                  {sent ? 'sent ✓' : 'send →'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Field({ type, placeholder, required }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      className="w-full bg-transparent border-0 border-b border-white/20 focus:border-white text-white font-mono text-[0.82rem] tracking-[0.06em] py-[10px] outline-none transition-colors duration-300 placeholder:text-white/22 placeholder:tracking-[0.1em] placeholder:font-mono placeholder:text-[0.78rem]"
    />
  )
}

function TextareaField({ placeholder, required }) {
  return (
    <textarea
      placeholder={placeholder}
      required={required}
      rows={4}
      className="w-full bg-transparent border border-white/20 focus:border-white text-white font-mono text-[0.82rem] tracking-[0.06em] px-3 py-[10px] outline-none resize-none transition-colors duration-300 placeholder:text-white/22 placeholder:tracking-[0.1em] placeholder:font-mono placeholder:text-[0.78rem]"
    />
  )
}
