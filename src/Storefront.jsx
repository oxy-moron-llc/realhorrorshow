import React, { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, Menu, Minus, Plus, ShoppingBag, X } from 'lucide-react'

const products = [
  { id: 'bigfoot-night-tee', name: 'Bigfoot Night Walk', type: 'T-shirt', price: 32, art: 'bigfoot', badge: 'Best seller', tone: '#d9c8aa', hidden: true },
  { id: 'sasquatch-club-tee', name: 'Sasquatch Social Club', type: 'T-shirt', price: 34, art: 'sasquatch', badge: 'New', tone: '#d86a47', hidden: true },
  { id: 'moth-plaque', name: 'Cabinet Moth', type: 'Plaque', price: 46, art: 'moth', badge: 'Coming soon', tone: '#e6dfcf', comingSoon: true },
  { id: 'lunar-coasters', name: 'Lunar Anatomy', type: 'Coaster set', price: 28, art: 'lunar', badge: 'Coming soon', tone: '#82958b', comingSoon: true },
  { id: 'visitor-tote', name: 'Visitor Portrait', type: 'Tote bag', price: 27, art: 'visitor', badge: 'Coming soon', tone: '#dfba54', comingSoon: true },
  { id: 'moth-study-print', name: 'Moth Study No. 01', type: 'Art print', price: 24, art: 'study', badge: 'Coming soon', tone: '#d8d0bf', comingSoon: true },
]

const visibleProducts = products.filter((product) => !product.hidden)
const showBigfoot = false

const artLabels = {
  bigfoot: ['NORTHWEST NIGHT WALK', 'BIGFOOT', 'STAY OUT LATE'],
  sasquatch: ['MEMBERS AFTER DARK', 'SASQUATCH', 'SOCIAL CLUB'],
  moth: ['CABINET SPECIMEN', 'NIGHT MOTH', 'DRAWN BY HAND'],
  lunar: ['CELESTIAL ANATOMY', 'MOON EYE', 'PHASE IV'],
  visitor: ['PORTRAIT SERIES', 'VISITOR', 'EARTH LOCAL'],
  study: ['SKETCHBOOK NO. 01', 'MOTH STUDY', 'GRAPHITE SERIES'],
}

function Artwork({ art, customText, tone, compact = false }) {
  const labels = artLabels[art]
  return (
    <div className={`artwork artwork--${art} ${compact ? 'artwork--compact' : ''}`} style={{ '--tone': tone }}>
      <span className="artwork__eyebrow">{labels[0]}</span>
      <span className="artwork__glyph" aria-hidden="true"><i /><i /></span>
      <strong>{customText || labels[1]}</strong>
      <span className="artwork__footer">{labels[2]}</span>
    </div>
  )
}

function Storefront() {
  const [selected, setSelected] = useState(visibleProducts[0])
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

  function chooseProduct(product) {
    setSelected(product)
    setCustomText('')
    document.querySelector('#customizer').scrollIntoView({ behavior: 'smooth' })
  }

  function addToCart() {
    if (selected.comingSoon) return
    const key = `${selected.id}-${customText || 'standard'}-${size}`
    setCart((items) => {
      const existing = items.find((item) => item.key === key)
      if (existing) return items.map((item) => item.key === key ? { ...item, quantity: item.quantity + 1 } : item)
      return [...items, { ...selected, key, customText, size, quantity: 1 }]
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
      <header className="header">
        <a className="brand" href="#top" aria-label="realhorror.show home"><span className="brand__sigil">RH</span><span>realhorror.show</span></a>
        <nav className={menuOpen ? 'nav nav--open' : 'nav'} aria-label="Main navigation">
          <a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a>
          {showBigfoot && <a href="#bigfoot" onClick={() => setMenuOpen(false)}>Bigfoot</a>}
          <a href="#customizer" onClick={() => setMenuOpen(false)}>Customize</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>
        <div className="header__actions">
          <button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Menu /></button>
          <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Open bag with ${itemCount} items`}><ShoppingBag /><span>Bag</span><b>{itemCount}</b></button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <img src="/moth-study.png" alt="Original graphite moth study" />
          <div className="hero__shade" />
          <div className="hero__content">
            <p className="eyebrow">Original oddities for uncommon people</p>
            <h1>Keep<br />things<br /><em>strange.</em></h1>
            <p>Hand-drawn creatures, cryptids, and curiosities made wearable, useful, and yours.</p>
            <a className="button button--paper" href="#shop">Shop the collection <ArrowDown /></a>
          </div>
          <span className="hero__stamp">Graphite series<br />No. 01 / 2026</span>
        </section>

        <div className="ticker" aria-label="Store features"><span>Artist drawn</span><i>✦</i><span>Made to order</span><i>✦</i><span>Custom wording</span><i>✦</i><span>Small batch always</span><i>✦</i><span>Artist drawn</span></div>

        <section className="collection" id="shop">
          <div className="section-heading"><span>01 / Shop</span><div><p>Wear it. Hang it. Put a drink on it.</p><h2>Strange goods</h2></div></div>
          <div className="product-grid">
            {visibleProducts.map((product, index) => (
              <article className={`product-card product-card--${index + 1}`} key={product.id}>
                <button className="product-card__visual" onClick={() => chooseProduct(product)} aria-label={`${product.name}, coming soon`}>
                  <span className="product-card__index">0{index + 1}</span>
                  <span className={`merch-shape merch-shape--${product.type.toLowerCase().replaceAll(' ', '-')}`}><Artwork art={product.art} tone={product.tone} compact /></span>
                  <span className="product-card__badge">{product.badge}</span>
                </button>
                <div className="product-card__details"><div><p>{product.type}</p><h3>{product.name}</h3></div><strong>${product.price}</strong></div>
              </article>
            ))}
          </div>
        </section>

        {showBigfoot && <section className="bigfoot-feature" id="bigfoot">
          <div className="bigfoot-feature__figure" aria-hidden="true"><span>BIG<br />FOOT</span></div>
          <div className="bigfoot-feature__copy">
            <p className="eyebrow">The local legend department</p>
            <h2>Big footprints.<br />Better shirts.</h2>
            <p>Two original Sasquatch designs, printed only when ordered. Heavyweight cotton, relaxed fit, no blurry tourist-shop clip art.</p>
            <button className="button button--dark" onClick={() => chooseProduct(products[0])}>Customize yours <ArrowRight /></button>
          </div>
        </section>}

        <section className="customizer" id="customizer">
          <div className="customizer__intro"><span>02 / Make it yours</span><h2>A little stranger,<br /><em>just for you.</em></h2><p>Add a name, town, date, or suspiciously specific phrase. We compose it into the artwork before it is made.</p></div>
          <div className="customizer__workbench">
            <div className="customizer__preview"><span className="preview-note">Live preview</span><div className={`merch-preview merch-preview--${selected.type.toLowerCase().replaceAll(' ', '-')}`}><Artwork art={selected.art} customText={customText} tone={selected.tone} /></div></div>
            <div className="customizer__panel">
              <p className="product-type">{selected.type}</p>
              <div className="price-line"><h3>{selected.name}</h3><strong>${selected.price}</strong></div>
              <fieldset><legend>Choose a piece</legend><div className="artifact-options">{visibleProducts.map((product) => <button className={selected.id === product.id ? 'artifact-option artifact-option--active' : 'artifact-option'} key={product.id} onClick={() => { setSelected(product); setCustomText('') }} aria-label={product.name}><span>{product.art.slice(0, 2)}</span></button>)}</div></fieldset>
              <label className="field-label" htmlFor="custom-text">Custom wording <span>{customText.length}/18</span></label>
              <input id="custom-text" value={customText} maxLength="18" placeholder={artLabels[selected.art][1]} onChange={(event) => setCustomText(event.target.value.toUpperCase())} />
              {selected.type === 'T-shirt' && <fieldset className="sizes"><legend>Size</legend>{['S', 'M', 'L', 'XL', '2XL'].map((option) => <button className={size === option ? 'size size--active' : 'size'} onClick={() => setSize(option)} key={option}>{option}</button>)}</fieldset>}
              <button className="button button--dark button--wide" onClick={addToCart} disabled={selected.comingSoon}><ShoppingBag /> {selected.comingSoon ? 'Coming soon' : `Add to bag · $${selected.price}`}</button>
              <p className="made-note">Artwork previews only · Join the list for launch news</p>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="about__image"><img src="/moth-study.png" alt="Upright detail from an original moth drawing" /></div>
          <div className="about__copy"><span>03 / About the work</span><p className="about__quote">“The line between beautiful and unsettling is usually the interesting part.”</p><p>realhorror.show is a small studio for folklore, natural strangeness, and things glimpsed at the edge of the woods. Every design begins by hand, then becomes an object worth keeping.</p></div>
        </section>
      </main>

      <footer><a className="brand brand--footer" href="#top"><span className="brand__sigil">RH</span><span>realhorror.show</span></a><p>Original oddities · Made to order</p><p>© 2026</p></footer>

      {cartOpen && <div className="drawer-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false) }}>
        <aside className="cart" aria-label="Shopping bag">
          <div className="cart__header"><div><p>Your collection</p><h2>Shopping bag</h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close bag"><X /></button></div>
          <div className="cart__items">{cart.length === 0 ? <div className="empty-cart"><ShoppingBag /><h3>Nothing strange yet</h3><p>Your bag is waiting for an odd little something.</p><button className="button button--dark" onClick={() => setCartOpen(false)}>Keep looking</button></div> : cart.map((item) => <div className="cart-item" key={item.key}><Artwork art={item.art} customText={item.customText} tone={item.tone} compact /><div className="cart-item__copy"><h3>{item.name}</h3><p>{item.customText || 'Original artwork'}{item.type === 'T-shirt' ? ` · ${item.size}` : ''}</p><div className="quantity"><button onClick={() => changeQuantity(item.key, -1)} aria-label="Remove one"><Minus /></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.key, 1)} aria-label="Add one"><Plus /></button></div></div><strong>${(item.price * item.quantity).toFixed(2)}</strong></div>)}</div>
          {cart.length > 0 && <div className="cart__footer"><div className="cart__total"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><p>Taxes and shipping calculated at checkout.</p><button className="button button--dark button--wide" onClick={checkout}>Secure checkout <ArrowRight /></button>{checkoutNote && <p className="checkout-note">Connect Stripe or Shopify with <code>VITE_CHECKOUT_URL</code> to accept live payments.</p>}</div>}
        </aside>
      </div>}
    </div>
  )
}

export default Storefront