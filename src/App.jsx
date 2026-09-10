import React, { useEffect, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronRight,
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react'

const products = [
  { id: 'bigfoot-night-tee', name: 'Bigfoot Night Walk Tee', type: 'T-shirt', price: 32, cost: 13.25, art: 'bigfoot', badge: 'Bestseller', tone: '#d8cdb5' },
  { id: 'sasquatch-club-tee', name: 'Sasquatch Social Club Tee', type: 'T-shirt', price: 34, cost: 13.25, art: 'sasquatch', badge: 'New', tone: '#d66b4b' },
  { id: 'moth-plaque', name: 'Cabinet Moth Custom Plaque', type: 'Plaque', price: 46, cost: 18.5, art: 'moth', badge: 'Personalize it', tone: '#25231f' },
  { id: 'lunar-coasters', name: 'Lunar Anatomy Coasters', type: 'Coaster set', price: 28, cost: 10.4, art: 'lunar', badge: 'Set of 4', tone: '#3e5148' },
  { id: 'visitor-tote', name: 'Visitor Portrait Tote', type: 'Tote bag', price: 27, cost: 11.2, art: 'visitor', badge: 'Cult favorite', tone: '#426a65' },
  { id: 'crooked-jaw-print', name: 'Crooked Jaw Study Print', type: 'Art print', price: 24, cost: 7.8, art: 'jaw', badge: 'Studio edition', tone: '#302d28' },
]

const artLabels = {
  bigfoot: ['NORTHWEST NIGHT WALK', 'BIGFOOT', 'STAY WILD'],
  sasquatch: ['MEMBERS AFTER DARK', 'SASQUATCH', 'SOCIAL CLUB'],
  moth: ['CABINET SPECIMEN', 'NIGHT MOTH', 'DRAWN BY HAND'],
  lunar: ['CELESTIAL ANATOMY', 'MOON EYE', 'PHASE IV'],
  visitor: ['PORTRAIT SERIES', 'VISITOR', 'EARTH LOCAL'],
  jaw: ['SKETCHBOOK NO. 7', 'ODD JAW', 'STUDIO EDITION'],
}

function Artwork({ art, customText, tone, compact = false }) {
  const labels = artLabels[art]
  return (
    <div className={`artwork artwork--${art} ${compact ? 'artwork--compact' : ''}`} style={{ '--tone': tone }}>
      <span className="artwork__eyebrow">{labels[0]}</span>
      <span className="artwork__symbol" aria-hidden="true">
        {art === 'bigfoot' && 'B'}
        {art === 'sasquatch' && 'S'}
        {art === 'moth' && 'M'}
        {art === 'lunar' && 'O'}
        {art === 'visitor' && 'V'}
        {art === 'jaw' && 'J'}
      </span>
      <strong>{customText || labels[1]}</strong>
      <span className="artwork__footer">{labels[2]}</span>
    </div>
  )
}

function App() {
  const [selected, setSelected] = useState(products[0])
  const [customText, setCustomText] = useState('')
  const [size, setSize] = useState('M')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [checkoutNote, setCheckoutNote] = useState(false)

  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [cartOpen])

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function addToCart(product = selected) {
    const key = `${product.id}-${customText || 'standard'}-${size}`
    setCart((items) => {
      const existing = items.find((item) => item.key === key)
      if (existing) return items.map((item) => item.key === key ? { ...item, quantity: item.quantity + 1 } : item)
      return [...items, { ...product, key, customText, size, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function changeQuantity(key, amount) {
    setCart((items) => items
      .map((item) => item.key === key ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0))
  }

  function checkout() {
    const checkoutUrl = import.meta.env.VITE_CHECKOUT_URL
    if (checkoutUrl) window.location.href = checkoutUrl
    else setCheckoutNote(true)
  }

  return (
    <div className="site-shell">
      <div className="announcement">Free domestic shipping over $65 <span>·</span> Made only when summoned</div>
      <header className="header">
        <a className="brand" href="#top" aria-label="realhorror.show home">
          <span className="brand__mark">R</span>
          <span>realhorror.show</span>
        </a>
        <nav className={menuOpen ? 'nav nav--open' : 'nav'} aria-label="Main navigation">
          <a href="#oddities" onClick={() => setMenuOpen(false)}>Oddities</a>
          <a href="#customizer" onClick={() => setMenuOpen(false)}>Personalize</a>
          <a href="#studio" onClick={() => setMenuOpen(false)}>The studio</a>
        </nav>
        <div className="header__actions">
          <button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Menu /></button>
          <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Open bag with ${itemCount} items`}>
            <ShoppingBag /> <span>Bag</span><b>{itemCount}</b>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero__noise" />
          <div className="hero__content">
            <p className="kicker">Artist-made objects for peculiar homes</p>
            <h1>realhorror.show</h1>
            <p className="hero__lede">Wearable folklore, strange specimens, and useful things with something slightly wrong about them.</p>
            <a className="button button--light" href="#oddities">Enter the cabinet <ArrowRight /></a>
          </div>
          <div className="hero__specimen" aria-label="Hand-drawn studies of moths">
            {[0, 1, 2, 3].map((row) => (
              <span className={`sketch-moth sketch-moth--${row + 1}`} key={row}>
                <i className="sketch-moth__wing sketch-moth__wing--left" />
                <i className="sketch-moth__body" />
                <i className="sketch-moth__wing sketch-moth__wing--right" />
                <i className="sketch-moth__mark" />
              </span>
            ))}
          </div>
          <p className="hero__edition">SKETCHBOOK SERIES 01<br />GRAPHITE &amp; INK</p>
        </section>

        <section className="proof-strip" aria-label="Store benefits">
          <span><Check /> Printed to order</span>
          <span><Check /> Artist-led originals</span>
          <span><Check /> Ships in 3–7 days</span>
          <span><Check /> Personalization included</span>
        </section>

        <section className="collection" id="oddities">
          <div className="section-heading">
            <div><p className="kicker kicker--dark">Fresh from the worktable</p><h2>The oddities cabinet</h2></div>
            <a href="#customizer">Make it yours <ChevronRight /></a>
          </div>
          <div className="product-grid">
            {products.map((product, index) => (
              <article className="product-card" key={product.id}>
                <button className="product-card__visual" onClick={() => { setSelected(product); document.querySelector('#customizer').scrollIntoView({ behavior: 'smooth' }) }} aria-label={`Customize ${product.name}`}>
                  <span className="product-card__number">0{index + 1}</span>
                  <span className={`merch-shape merch-shape--${product.type.toLowerCase().replaceAll(' ', '-')}`}>
                    <Artwork art={product.art} tone={product.tone} compact />
                  </span>
                  <span className="product-card__badge">{product.badge}</span>
                </button>
                <div className="product-card__details">
                  <div><p>{product.type}</p><h3>{product.name}</h3></div>
                  <strong>${product.price}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="customizer" id="customizer">
          <div className="customizer__preview">
            <p className="preview-note">Live artwork preview</p>
            <div className={`merch-preview merch-preview--${selected.type.toLowerCase().replaceAll(' ', '-')}`}>
              <Artwork art={selected.art} customText={customText} tone={selected.tone} />
            </div>
          </div>
          <div className="customizer__panel">
            <p className="kicker kicker--dark">Made-to-order studio</p>
            <h2>{selected.name}</h2>
            <div className="price-line"><strong>${selected.price}</strong><span>Made to order</span></div>

            <fieldset>
              <legend>Choose an object</legend>
              <div className="artifact-options">
                {products.map((product) => (
                  <button className={selected.id === product.id ? 'artifact-option artifact-option--active' : 'artifact-option'} key={product.id} onClick={() => { setSelected(product); setCustomText('') }}>
                    <Artwork art={product.art} tone={product.tone} compact />
                    <span>{product.type}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="field-label" htmlFor="custom-text">Your sighting, town, or name <span>{customText.length}/18</span></label>
            <input id="custom-text" value={customText} maxLength="18" placeholder={artLabels[selected.art][1]} onChange={(event) => setCustomText(event.target.value.toUpperCase())} />

            {selected.type === 'T-shirt' && <fieldset className="sizes"><legend>Size</legend>{['S', 'M', 'L', 'XL', '2XL'].map((option) => <button className={size === option ? 'size size--active' : 'size'} onClick={() => setSize(option)} key={option}>{option}</button>)}</fieldset>}

            <button className="button button--ink button--wide" onClick={() => addToCart()}><ShoppingBag /> Add to bag · ${selected.price}</button>
            <div className="margin-note"><Sparkles /><span><strong>${(selected.price - selected.cost).toFixed(2)} gross margin</strong> before payment fees and ads</span></div>
          </div>
        </section>

        <section className="field-notes" id="studio">
          <div className="field-notes__copy">
            <p className="kicker">From the sketchbook</p>
            <h2>Drawn strange. Made personal.</h2>
            <p>Loose graphite studies become small-run shirts, plaques, prints, and objects for your own cabinet of curiosities.</p>
            <button className="button button--signal" onClick={() => { setSelected(products[0]); document.querySelector('#customizer').scrollIntoView({ behavior: 'smooth' }) }}>Make a Bigfoot shirt <ArrowRight /></button>
          </div>
          <div className="field-notes__radar" aria-hidden="true"><span /><span /><span /><i /></div>
        </section>
      </main>

      <footer>
        <a className="brand brand--footer" href="#top"><span className="brand__mark">R</span><span>realhorror.show</span></a>
        <p>Strange goods. Responsibly manifested.</p>
        <p>© 2026 realhorror.show</p>
      </footer>

      {cartOpen && <div className="drawer-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false) }}>
        <aside className="cart" aria-label="Shopping bag">
          <div className="cart__header"><div><p className="kicker kicker--dark">Your collection</p><h2>Oddities bag</h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close bag"><X /></button></div>
          <div className="cart__items">
            {cart.length === 0 ? <div className="empty-cart"><ShoppingBag /><h3>Nothing strange yet</h3><p>Your bag is waiting for an odd little something.</p><button className="button button--ink" onClick={() => setCartOpen(false)}>Browse oddities</button></div> : cart.map((item) => (
              <div className="cart-item" key={item.key}>
                <Artwork art={item.art} customText={item.customText} tone={item.tone} compact />
                <div className="cart-item__copy"><h3>{item.name}</h3><p>{item.customText || 'Original artwork'}{item.type === 'T-shirt' ? ` · ${item.size}` : ''}</p><div className="quantity"><button onClick={() => changeQuantity(item.key, -1)} aria-label="Remove one"><Minus /></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.key, 1)} aria-label="Add one"><Plus /></button></div></div>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </div>
            ))}
          </div>
          {cart.length > 0 && <div className="cart__footer">
            <div className="cart__total"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
            <p>Taxes and shipping calculated at checkout.</p>
            <button className="button button--ink button--wide" onClick={checkout}>Secure checkout <ArrowRight /></button>
            {checkoutNote && <p className="checkout-note">Add your Stripe or Shopify checkout URL to <code>VITE_CHECKOUT_URL</code> to accept live payments.</p>}
          </div>}
        </aside>
      </div>}
    </div>
  )
}

export default App