import React, { useState } from 'react'
import { ArrowDown, ArrowRight, Menu, X } from 'lucide-react'

function ComingSoon() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  function joinList(event) {
    event.preventDefault()
    if (email.trim()) setJoined(true)
  }

  return (
    <div className="launch-site">
      <header className="launch-header">
        <a className="launch-brand" href="#top" aria-label="realhorror.show home"><span>RH</span> realhorror.show</a>
        <nav className={menuOpen ? 'launch-nav launch-nav--open' : 'launch-nav'} aria-label="Main navigation">
          <a href="#coming-soon" onClick={() => setMenuOpen(false)}>Coming soon</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>
        <button className="launch-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main id="top">
        <section className="launch-hero">
          <img src="/header-moth.png" alt="Close-up graphite moth study" />
          <div className="launch-hero__shade" />
          <div className="launch-hero__copy">
            <p className="launch-eyebrow">A small studio for strange things</p>
            <h1>Keep<br />things<br /><em>strange.</em></h1>
            <p>Original drawings, odd objects, and wearable curiosities are being gathered now.</p>
            <a className="launch-button launch-button--light" href="#coming-soon">See what is next <ArrowDown /></a>
          </div>
          <span className="launch-stamp">First collection<br />Coming soon</span>
        </section>

        <section className="coming-soon" id="coming-soon">
          <p className="launch-eyebrow">The first collection is taking shape</p>
          <div className="coming-soon__logo" aria-label="realhorror.show coming soon">
            <span>realhorror</span><strong>.show</strong>
            <small>COMING SOON</small>
          </div>
          <p className="coming-soon__lede">The artwork is still being drawn. The objects are still being chosen. Nothing here is pretending to be finished.</p>
          {joined ? <p className="joined-message">You are on the list. We will send the first strange sighting when it is ready.</p> : <form className="launch-form" onSubmit={joinList}><label htmlFor="launch-email">Get the first look</label><div><input id="launch-email" type="email" value={email} placeholder="your@email.com" onChange={(event) => setEmail(event.target.value)} required /><button className="launch-button launch-button--dark" type="submit">Join the list <ArrowRight /></button></div></form>}
        </section>

        <section className="about" id="about">
          <div className="about__image"><img src="/moth-study.png" alt="Detail from an original moth drawing" /></div>
          <div className="about__copy"><span>About the studio</span><p className="about__quote">The line between beautiful and unsettling is usually the interesting part.</p><p>realhorror.show is a small studio for folklore, natural strangeness, and things glimpsed at the edge of the woods. The first collection will arrive when it feels worth keeping.</p></div>
        </section>
      </main>

      <footer className="launch-footer"><div className="launch-footer__content"><a className="launch-brand" href="#top"><span>RH</span> realhorror.show</a><p>Original oddities · Coming soon</p><p>© 2026</p></div></footer>
    </div>
  )
}

export default ComingSoon
