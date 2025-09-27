import { openingHours, socials } from '../../constants/index.js'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Contact = () => {
  useGSAP(() => {
    gsap.from('#contact header', {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%'
      }
    })

    gsap.from('#contact article', {
      y: 20,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 75%'
      }
    })
  }, [])

  return (
    <footer id="contact" className="section-spacing">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,rgba(139,92,246,0.18),transparent_65%)]" />
        <div className="section-shell gap-12">
          <header className="text-center md:text-left">
            <span className="section-heading">Stay connected</span>
            <h2 className="section-title">Bring collective intelligence into your next initiative</h2>
            <p className="section-subtitle">
              We partner with universities, public institutions, and product teams to translate critical insights into
              thoughtful AI experiences. Reach out to collaborate.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h3 className="text-sm uppercase tracking-[0.3em] text-slate-400">Visit</h3>
              <p className="mt-3 text-lg font-semibold text-white">CMLAI Studio</p>
              <p className="mt-1 text-sm text-slate-300">456 RaQ Blvd #404<br />Los Angeles, CA 90210</p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h3 className="text-sm uppercase tracking-[0.3em] text-slate-400">Connect</h3>
              <p className="mt-3 text-lg font-semibold text-white">hello@jsmcocktail.com</p>
              <p className="text-sm text-slate-300">+1 (555) 987-6543</p>
              <div className="mt-5 flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-transform duration-200 hover:-translate-y-1"
                    aria-label={social.name}
                  >
                    <img src={social.icon} alt={social.name} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h3 className="text-sm uppercase tracking-[0.3em] text-slate-400">Programming</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {openingHours.map((time) => (
                  <li key={time.day} className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/20 px-4 py-2">
                    <span>{time.day}</span>
                    <span className="text-slate-200">{time.time}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 p-6 backdrop-blur-2xl md:flex-row">
            <div>
              <h3 className="text-xl font-semibold text-white">Join the discourse</h3>
              <p className="mt-2 text-sm text-slate-200">Subscribe for research notes, event invites, and community prompts.</p>
            </div>
            <form
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter"
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-full border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-white/30 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:opacity-95"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Contact
