import { openingHours, socials } from '../../constants/index.js'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'

const Contact = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create('#contact h2', { type: 'words' })

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#contact',
        start: 'top center',
      },
      ease: 'power1.inOut',
    })

    timeline
      .from(titleSplit.words, {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
      })
      .from('#contact h3, #contact p', {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
      })
      .to('#f-right-leaf', {
        y: '-50',
        duration: 1,
        ease: 'power1.inOut',
      })
      .to(
        '#f-left-leaf',
        {
          y: '-50',
          duration: 1,
          ease: 'power1.inOut',
        },
        '<'
      )
  })

  return (
    <footer id="contact" className="relative bg-black text-white">
      {/* Decorative placeholders */}
      <img
        src="/images/footer-right-leaf.png"
        alt="leaf-right"
        id="f-right-leaf"
        className="absolute right-0 bottom-0 w-32 opacity-80"
      />
      <img
        src="/images/footer-left-leaf.png"
        alt="leaf-left"
        id="f-left-leaf"
        className="absolute left-0 bottom-0 w-32 opacity-80"
      />

      <div className="content grid md:grid-cols-4 gap-10 relative z-10 text-center md:text-left">
        {/* Section: Location */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Where to Find Us</h2>
          <h3 className="text-lg font-semibold">Visit Us</h3>
          {/* TODO: đổi địa chỉ thật */}
          <p>456, Raq Blvd. #404, Los Angeles, CA 90210</p>
        </div>

        {/* Section: Contact */}
        <div>
          <h3 className="text-lg font-semibold">Contact Us</h3>
          {/* TODO: đổi số điện thoại + email */}
          <p>(555) 987-6543</p>
          <p>hello@jsmcocktail.com</p>
        </div>

        {/* Section: Opening hours */}
        <div>
          <h3 className="text-lg font-semibold">Open Every Day</h3>
          {openingHours.map((time) => (
            <p key={time.day}>
              {time.day}: {time.time}
            </p>
          ))}
        </div>

        {/* Section: Socials */}
        <div>
          <h3 className="text-lg font-semibold">Socials</h3>
          <div className="flex justify-center md:justify-start gap-5 mt-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                {/* TODO: thay icon cho đẹp hơn, hiện tại lấy từ /images/... */}
                <img
                  src={social.icon}
                  alt={`${social.name} icon`}
                  className="w-6 h-6 hover:scale-110 transition-transform"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Contact
