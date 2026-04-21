export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-[300] bg-transparent px-7 py-[10px] flex items-center justify-between">
      <a
        href="mailto:tanviibhalerao@gmail.com"
        className="font-mono text-[0.62rem] tracking-[0.1em] lowercase text-white/45 hover:text-white transition-colors duration-250 no-underline"
      >
      </a>

      <div className="flex items-center gap-[24px]">
        {/* Instagram */}
        <a
          href="https://instagram.com/nzriyaa"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-white/45 hover:text-white transition-colors duration-250 flex items-center"
        >
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
          </svg>
        </a>

        {/* Mail */}
        <a
          href="mailto:tanviibhalerao@gmail.com"
          aria-label="Email"
          className="text-white/45 hover:text-white transition-colors duration-250 flex items-center"
        >
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </a>
      </div>
    </footer>
  )
}
