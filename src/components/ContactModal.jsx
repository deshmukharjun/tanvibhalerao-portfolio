import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

export default function ContactModal({ open, onClose }) {
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const data = new FormData(formRef.current)

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name:  data.get('from_name'),
          from_email: data.get('from_email'),
          message:    data.get('message'),
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      )
      setStatus('sent')
      setTimeout(() => {
        onClose()
        setStatus('idle')
        formRef.current?.reset()
      }, 1800)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
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

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* name maps to {{from_name}} in EmailJS template */}
              <Field type="text"  name="from_name"    placeholder="name_"    required />
              {/* email maps to {{from_email}} */}
              <Field type="email" name="from_email"   placeholder="email_"   required />
              {/* message maps to {{message}} */}
              <TextareaField      name="message"       placeholder="message_" required />

              <div className="flex items-center justify-end gap-4 mt-2">
                {status === 'error' && (
                  <span className="font-mono text-[0.65rem] tracking-[0.1em] text-red-400/80">
                    failed — try again
                  </span>
                )}
                <motion.button
                  type="submit"
                  disabled={status === 'sending' || status === 'sent'}
                  whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                  whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
                  className={`font-mono text-[0.75rem] tracking-[0.18em] uppercase px-8 py-3 border transition-all duration-300 cursor-pointer disabled:cursor-default ${
                    status === 'sent'
                      ? 'bg-transparent text-white border-white/30'
                      : status === 'sending'
                      ? 'bg-transparent text-white/40 border-white/20'
                      : 'bg-white text-black border-white hover:bg-transparent hover:text-white'
                  }`}
                >
                  {status === 'sending' ? 'sending…' : status === 'sent' ? 'sent ✓' : 'send →'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Field({ type, name, placeholder, required }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className="w-full bg-transparent border-0 border-b border-white/20 focus:border-white text-white font-mono text-[0.82rem] tracking-[0.06em] py-[10px] outline-none transition-colors duration-300 placeholder:text-white/22 placeholder:tracking-[0.1em] placeholder:font-mono placeholder:text-[0.78rem]"
    />
  )
}

function TextareaField({ name, placeholder, required }) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      required={required}
      rows={4}
      className="w-full bg-transparent border border-white/20 focus:border-white text-white font-mono text-[0.82rem] tracking-[0.06em] px-3 py-[10px] outline-none resize-none transition-colors duration-300 placeholder:text-white/22 placeholder:tracking-[0.1em] placeholder:font-mono placeholder:text-[0.78rem]"
    />
  )
}
