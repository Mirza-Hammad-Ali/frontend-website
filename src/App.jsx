import { useState } from 'react'
import './App.css'

const products = [
  {
    name: 'The Sunday Chair',
    category: 'Seating',
    price: '$1,280',
    image:
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=85',
    color: 'Warm oak · bouclé',
    tag: 'BESTSELLER',
  },
  {
    name: 'Stillwater Table',
    category: 'Tables',
    price: '$2,450',
    image:
      'https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=900&q=85',
    color: 'Solid ash · natural',
    tag: '',
  },
  {
    name: 'Forma Lounge',
    category: 'Seating',
    price: '$1,890',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85',
    color: 'Natural linen · sand',
    tag: 'NEW ARRIVAL',
  },
  {
    name: 'Soft Light No. 2',
    category: 'Lighting',
    price: '$540',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85',
    color: 'Hand-cast glass · cream',
    tag: '',
  },
]

const categories = ['All pieces', 'Seating', 'Tables', 'Lighting']

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? 'arrow-icon arrow-icon--diagonal' : 'arrow-icon'}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All pieces')
  const [bagCount, setBagCount] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const visibleProducts =
    activeCategory === 'All pieces'
      ? products
      : products.filter((product) => product.category === activeCategory)

  function handleSubscribe(event) {
    event.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <div className="announcement">
        Considered design, delivered with care. Complimentary shipping over $250.
        <a href="#collection">Explore the collection <ArrowIcon /></a>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Forma home">forma<span>.</span></a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? 'main-nav main-nav--open' : 'main-nav'} aria-label="Main navigation">
          <a href="#collection" onClick={closeMenu}>Shop all</a>
          <a href="#collection" onClick={closeMenu}>Seating</a>
          <a href="#story" onClick={closeMenu}>Our approach</a>
          <a href="#journal" onClick={closeMenu}>Journal</a>
        </nav>
        <div className="header-actions">
          <a className="header-link" href="#newsletter">Search</a>
          <a className="header-link account-link" href="#story">Account</a>
          <button className="bag-button" type="button" aria-label={`Shopping bag, ${bagCount} items`}>
            Bag <span className="bag-count">{bagCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=90"
            alt="Sunlit living room with thoughtfully arranged natural wood furniture"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <span className="eyebrow hero-eyebrow">A quieter kind of home</span>
            <h1>Room to<br />feel <em>at home.</em></h1>
            <p>Furniture for the slow mornings, long conversations, and all the in-between.</p>
            <a className="button button--light" href="#collection">Discover the collection <ArrowIcon /></a>
          </div>
          <div className="hero-caption"><span>01 / 03</span> The Sunday collection · Copenhagen, DK</div>
          <div className="hero-side-note">MADE FOR LIVING, NOT JUST LOOKING</div>
        </section>

        <section className="intro section-wrap" id="story">
          <p className="eyebrow">Fewer, better things</p>
          <div className="intro-content">
            <h2>Good design doesn’t<br />need to <em>shout.</em></h2>
            <div className="intro-copy">
              <p>We make enduring pieces for the spaces we share and the lives we live in them. Thoughtful by nature, made to stay.</p>
              <a className="text-link" href="#journal">A little about us <ArrowIcon diagonal /></a>
            </div>
          </div>
          <div className="intro-details">
            <span>01 — Thoughtful materials</span>
            <span>02 — Made to last</span>
            <span>03 — A lighter footprint</span>
          </div>
        </section>

        <section className="collection section-wrap" id="collection">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The good things</p>
              <h2>Made for <em>everyday.</em></h2>
            </div>
            <a className="text-link collection-all" href="#collection">View all pieces <ArrowIcon /></a>
          </div>
          <div className="filter-row" role="group" aria-label="Filter products by category">
            {categories.map((category) => (
              <button
                className={activeCategory === category ? 'filter-button filter-button--active' : 'filter-button'}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
            <span className="product-count">{String(visibleProducts.length).padStart(2, '0')} pieces</span>
          </div>
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.name}>
                <div className="product-image-wrap">
                  <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
                  {product.tag && <span className="product-tag">{product.tag}</span>}
                  <button
                    className="quick-add"
                    type="button"
                    aria-label={`Add ${product.name} to bag`}
                    onClick={() => setBagCount((count) => count + 1)}
                  >
                    <span>Add to bag</span><span className="quick-add-plus">+</span>
                  </button>
                </div>
                <div className="product-info">
                  <div><h3>{product.name}</h3><span className="product-color">{product.color}</span></div>
                  <span className="product-price">{product.price}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="manifesto">
          <div className="manifesto-image">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=85"
              alt="Warm, minimal home interior with natural textures"
              loading="lazy"
            />
          </div>
          <div className="manifesto-content">
            <p className="eyebrow">The Forma point of view</p>
            <h2>A home should<br />feel like <em>you.</em></h2>
            <p className="manifesto-copy">Not a showroom. Not a checklist. Just a little more room for the things that make a life yours.</p>
            <a className="text-link" href="#journal">Read our journal <ArrowIcon /></a>
            <span className="manifesto-mark">F.</span>
          </div>
        </section>

        <section className="quote-section" id="journal">
          <p className="eyebrow">Kind words, lived in</p>
          <blockquote>“It feels like the room finally caught up with the way we wanted to live.”</blockquote>
          <span className="quote-credit">ELLA M. — FORMA HOMEOWNER, PORTLAND</span>
          <div className="quote-progress"><span /></div>
        </section>

        <section className="newsletter" id="newsletter">
          <div>
            <p className="eyebrow">A note from us</p>
            <h2>Good things,<br /><em>occasionally.</em></h2>
          </div>
          <div className="newsletter-signup">
            <p>New pieces, thoughtful spaces, and little things worth sharing. Never noise.</p>
            {subscribed ? (
              <p className="success-message" role="status">You’re on the list. Talk soon.</p>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <label className="visually-hidden" htmlFor="newsletter-email">Your email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <button type="submit" aria-label="Subscribe to our newsletter"><ArrowIcon /></button>
              </form>
            )}
            <span className="privacy-note">By subscribing, you agree to our very occasional emails.</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark footer-wordmark" href="#home">forma<span>.</span></a>
        <span className="footer-note">Made with care. Meant to be lived in.</span>
        <div className="footer-links"><a href="#story">Instagram</a><a href="#story">Shipping & returns</a><a href="#story">Contact</a></div>
        <span className="copyright">© 2025 FORMA STUDIO</span>
      </footer>
    </>
  )
}

export default App
