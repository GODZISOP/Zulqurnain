import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Search, ArrowRight, CheckCircle2, 
  Send, ExternalLink, ShieldCheck, Truck, Award,
  X, MessageSquare, Layers, Building2, ShoppingCart, Menu as MenuIcon,
  Plus, Minus, Trash2, ShoppingBag, Eye, ArrowLeft, Check, Star, Heart
} from 'lucide-react';
import { categories, products } from './data/products';
import logoImg from './images/image.png';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [modalType, setModalType] = useState(null); // 'partner', 'quote', 'contact', 'checkout', null
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Cart & Product Detail state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('zv_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [activeDetailTab, setActiveDetailTab] = useState('description');
  const [toastMessage, setToastMessage] = useState(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('zv_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  // Filter & sort products
  const filteredProducts = products.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'popularity') return (b.popularity || 0) - (a.popularity || 0);
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'latest') return b.id - a.id;
    if (sortBy === 'price-low') return a.priceNumeric - b.priceNumeric;
    if (sortBy === 'price-high') return b.priceNumeric - a.priceNumeric;
    return 0;
  });

  const bestSellers = products.slice(0, 4);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product, qty = 1, openDrawer = true) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    showToast(`Added ${qty}x ${product.name} to cart!`);
    if (openDrawer) {
      setCartOpen(true);
    }
  };

  const updateCartQuantity = (productId, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.priceNumeric * item.quantity), 0);

  const viewProductDetail = (product) => {
    setActiveProduct(product);
    setDetailQuantity(1);
    setActiveDetailTab('description');
    setActiveTab('product-detail');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (product) => {
    setSelectedProduct(product);
    setModalType('quote');
    setFormSubmitted(false);
  };

  const handleOpenPartner = (type = 'partner') => {
    setModalType(type);
    setFormSubmitted(false);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedProduct(null);
    setFormSubmitted(false);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => setNewsletterSuccess(false), 4000);
      setNewsletterEmail('');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const navigateTo = (tabName, categoryId = null) => {
    setActiveTab(tabName);
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuCategories = [
    { id: 'all', name: 'Shop' },
    { id: 'home-and-kitchen', name: 'Home And Kitchen' },
    { id: 'office-products', name: 'Office Products' },
    { id: 'pet-supplies', name: 'Pet Supplies' },
    { id: 'sports-and-outdoors', name: 'Sports And Outdoors' },
    { id: 'tools-and-home-improvement', name: 'Tools And Home Improvement' },
    { id: 'automotive', name: 'Automotive' },
    { id: 'baby-products', name: 'Baby Products' }
  ];

  return (
    <div className="min-h-screen bg-[#f5f7f9] text-[#1e293b]">
      {/* Skip to content link */}
      <a 
        href="#main-content" 
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          zIndex: 9999
        }}
        onFocus={(e) => {
          e.currentTarget.style.position = 'static';
          e.currentTarget.style.width = 'auto';
          e.currentTarget.style.height = 'auto';
        }}
        onBlur={(e) => {
          e.currentTarget.style.position = 'absolute';
          e.currentTarget.style.left = '-9999px';
          e.currentTarget.style.width = '1px';
          e.currentTarget.style.height = '1px';
        }}
      >
        Skip to content
      </a>

      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="top-bar">
        <div className="top-bar-item">
          <span>Official Store: <strong>ZULQARNAIN VENTURES LLC</strong></span>
          <span style={{ opacity: 0.5, margin: '0 6px' }}>•</span>
          <span>Reliable Products, Competitive Prices & Fast Shipping</span>
        </div>
        <div className="top-bar-contact">
          <div className="top-bar-item">
            <Phone size={14} color="#93c5fd" />
            <a href="tel:+966537842419">(+966) 537842419</a>
          </div>
          <div className="top-bar-item">
            <Mail size={14} color="#93c5fd" />
            <a href="mailto:ZULQARNAINY462@GMAIL.COM">ZULQARNAINY462@GMAIL.COM</a>
          </div>
          <div className="top-bar-item">
            <a 
              href="https://wa.me/+966537842419" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: '#4ade80', fontWeight: '600' }}
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVIGATION WITH OFFICIAL LOGO */}
      <header className="main-nav">
        <div className="nav-brand" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
          <img src={logoImg} alt="Zulqarnain Ventures LLC Logo" className="brand-logo-img" />
          <div>
            <div className="brand-title">Zulqarnain Ventures LLC</div>
            <div className="brand-subtitle">Modern Everyday E-Commerce Store</div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <button 
                className={`nav-link ${activeTab === 'home' && selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory('all');
                  navigateTo('home');
                }}
                style={{ background: 'none', border: 'none', font: 'inherit' }}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeTab === 'shop' || (activeTab === 'home' && selectedCategory !== 'all') ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory('all');
                  navigateTo('home');
                  setTimeout(() => {
                    const el = document.getElementById('featured-products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }}
                style={{ background: 'none', border: 'none', font: 'inherit' }}
              >
                Shop Catalog
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => navigateTo('contact')}
                style={{ background: 'none', border: 'none', font: 'inherit' }}
              >
                Contact Us
              </button>
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          <button 
            className="btn-nav-cart"
            onClick={() => setCartOpen(true)}
            aria-label="Open Shopping Cart"
          >
            <ShoppingCart size={18} />
            <span className="nav-cart-text">Cart</span>
            {totalCartItems > 0 && (
              <span className="nav-cart-badge">{totalCartItems}</span>
            )}
          </button>

          <a 
            className="btn-nav-partner"
            href="https://wa.me/+966537842419"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <span>WhatsApp Support</span>
            <ArrowRight size={16} />
          </a>
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </header>

      {/* DEPARTMENT CATEGORIES STRIP */}
      <div className="dept-strip-bar">
        <div className="dept-strip-container">
          <button 
            className={`dept-strip-item ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory('all');
              navigateTo('home');
              setTimeout(() => {
                const el = document.getElementById('featured-products-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
          >
            All Products
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`dept-strip-item ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                navigateTo('home', cat.id);
                setTimeout(() => {
                  const el = document.getElementById('featured-products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* MOBILE MENU DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="mobile-drawer-title">Navigation Menu</div>
              <button 
                className="mobile-drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Navigation Menu"
              >
                <X size={20} />
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCartOpen(true);
              }}
              className="mobile-cart-btn"
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingCart size={18} />
                <span>Shopping Cart</span>
              </span>
              <span className="nav-cart-badge">{totalCartItems}</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('all');
                navigateTo('home');
                setMobileMenuOpen(false);
              }}
              className={`mobile-nav-link ${activeTab === 'home' && selectedCategory === 'all' ? 'active' : ''}`}
            >
              <span>Home</span>
            </button>

            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', padding: '6px 4px 2px' }}>
              Categories
            </div>

            {menuCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  navigateTo('home', cat.id);
                  setMobileMenuOpen(false);
                  setTimeout(() => {
                    const el = document.getElementById('featured-products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }}
                className={`mobile-nav-link ${selectedCategory === cat.id ? 'active' : ''}`}
              >
                <span>{cat.name}</span>
              </button>
            ))}

            <button
              onClick={() => {
                navigateTo('contact');
                setMobileMenuOpen(false);
              }}
              className={`mobile-nav-link ${activeTab === 'contact' ? 'active' : ''}`}
            >
              <span>Contacts & Support</span>
            </button>

            <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
              <a
                href="https://wa.me/+966537842419"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#25D366',
                  color: '#ffffff',
                  padding: '12px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.92rem'
                }}
              >
                <span>WhatsApp Support</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: HOME PAGE */}
      {activeTab === 'home' && (
        <main id="main-content">
          {/* HERO SECTION AS REQUESTED */}
          <section className="hero-section">
            <div className="hero-overlay"></div>
            <div className="hero-container">
              <div className="hero-content">
                <div className="hero-pretitle">THE ONLY ONE</div>
                <h1 className="hero-title">zulqarnain ventures LLC</h1>
                <p className="hero-description">
                  Zulqarnain Ventures LLC is a modern e-commerce store offering a wide range of quality products for everyday needs. We focus on providing reliable products, competitive prices, and a convenient online shopping experience for our customers.
                </p>
                <div className="hero-actions">
                  <button 
                    className="btn-hero-primary"
                    onClick={() => {
                      const el = document.getElementById('featured-products-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Shop Now
                  </button>
                  <button 
                    className="btn-hero-outline"
                    onClick={() => {
                      const el = document.getElementById('featured-products-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Browse Deals
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* TWO HIGHLIGHT CATEGORY PROMO CARDS AS REQUESTED */}
          <section className="section-wrapper" style={{ paddingBottom: '10px' }}>
            <div className="categories-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              <div 
                className="category-card"
                onClick={() => {
                  setSelectedCategory('health-and-household');
                  const el = document.getElementById('featured-products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1200&q=80" 
                  alt="Health & Household" 
                  className="category-card-img" 
                  loading="lazy"
                />
                <div className="category-card-overlay">
                  <span style={{ fontSize: '0.85rem', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
                    Health & Household
                  </span>
                  <h3 className="category-title" style={{ fontSize: '1.4rem', marginTop: '4px' }}>
                    Everyday essentials for a healthier, happier home.
                  </h3>
                  <button 
                    className="btn-category-pill"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory('health-and-household');
                      const el = document.getElementById('featured-products-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Shop
                  </button>
                </div>
              </div>

              <div 
                className="category-card"
                onClick={() => {
                  setSelectedCategory('home-and-kitchen');
                  const el = document.getElementById('featured-products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80" 
                  alt="Home & Kitchen" 
                  className="category-card-img" 
                  loading="lazy"
                />
                <div className="category-card-overlay">
                  <span style={{ fontSize: '0.85rem', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
                    Home & Kitchen
                  </span>
                  <h3 className="category-title" style={{ fontSize: '1.4rem', marginTop: '4px' }}>
                    Smart finds for cooking, organizing, and comfortable living.
                  </h3>
                  <button 
                    className="btn-category-pill"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory('home-and-kitchen');
                      const el = document.getElementById('featured-products-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Shop
                  </button>
                </div>
              </div>
            </div>
          </section>


          {/* SHOP ALL PRODUCTS CATALOG SECTION */}
          <section id="featured-products-section" className="section-wrapper" style={{ paddingTop: '20px' }}>
            <div className="section-header-center">
              <span className="section-tag">ONLINE CATALOG</span>
              <h2 className="section-title">All Products</h2>
              <p className="section-subtitle">Explore our full inventory across all everyday departments</p>
            </div>

            {/* Category Filter Tabs */}
            <div className="filter-tabs">
              <button 
                className={`filter-tab ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All Products ({products.length})
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`filter-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Controls Bar: Search + Sorting */}
            <div className="catalog-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
              <div style={{ color: '#64748b', fontSize: '0.95rem', fontWeight: '500' }}>
                Showing all {filteredProducts.length} results
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div className="search-container" style={{ margin: 0, minWidth: '260px' }}>
                  <Search className="search-icon" size={16} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    style={{ padding: '10px 16px 10px 42px', fontSize: '0.9rem' }}
                  />
                </div>

                <div className="sort-selector-wrapper">
                  <select 
                    id="sort-select" 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-dropdown"
                    style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.9rem', color: '#1e293b', cursor: 'pointer' }}
                  >
                    <option value="default">Default sorting</option>
                    <option value="popularity">Sort by popularity</option>
                    <option value="rating">Sort by average rating</option>
                    <option value="latest">Sort by latest</option>
                    <option value="price-low">Sort by price: low to high</option>
                    <option value="price-high">Sort by price: high to low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {filteredProducts.map((prod) => (
                <div 
                  key={prod.id} 
                  className="product-card"
                  onClick={() => viewProductDetail(prod)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="product-img-wrap">
                    <span className="product-badge">{prod.categoryName}</span>
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="product-img" 
                      loading="lazy"
                    />
                  </div>

                  <div className="product-body">
                    <div>
                      <span className="product-sku">SKU: {prod.sku}</span>
                      <h3 className="product-title">{prod.name}</h3>
                    </div>
                    
                    <div>
                      <div className="product-price-box">
                        <div className="product-price-val">{prod.price}</div>
                        <span className="product-price-sub">{prod.priceNote}</span>
                      </div>

                      <div className="product-actions-row">
                        <button 
                          className="btn-add-cart"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(prod, 1, true);
                          }}
                        >
                          <ShoppingCart size={15} />
                          <span>Add to cart</span>
                        </button>
                        <button 
                          className="btn-view-details"
                          onClick={(e) => {
                            e.stopPropagation();
                            viewProductDetail(prod);
                          }}
                          title="View Full Specifications & Details"
                        >
                          <Eye size={15} />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '16px' }}>
                <p style={{ fontSize: '1.1rem', color: '#64748b' }}>No products match your search or filter.</p>
                <button 
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  style={{ marginTop: '12px', background: '#1e7087', color: '#fff', padding: '8px 20px', borderRadius: '20px', border: 'none', cursor: 'pointer' }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>

          {/* CUSTOMER REVIEWS SECTION AS REQUESTED */}
          <section className="section-wrapper" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
            <div className="section-header-center">
              <span className="section-tag">TESTIMONIALS</span>
              <h2 className="section-title">Customer Reviews</h2>
              <p className="section-subtitle">Real experiences from shoppers who trust Zulqarnain Ventures LLC</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              maxWidth: '1100px',
              margin: '0 auto'
            }}>
              <div style={{
                background: '#ffffff',
                padding: '30px',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', gap: '4px', color: '#f59e0b', marginBottom: '14px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="#f59e0b" />
                    ))}
                  </div>
                  <p style={{ fontSize: '1.05rem', color: '#1e293b', fontStyle: 'italic', lineHeight: 1.6 }}>
                    “Fast shipping, excellent quality, and prices that make stocking up wonderfully simple.”
                  </p>
                </div>
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#e0f2fe',
                    color: '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700'
                  }}>
                    A
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#0f172a' }}>Verified Customer</div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Repeat Online Shopper</div>
                  </div>
                </div>
              </div>

              <div style={{
                background: '#ffffff',
                padding: '30px',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', gap: '4px', color: '#f59e0b', marginBottom: '14px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="#f59e0b" />
                    ))}
                  </div>
                  <p style={{ fontSize: '1.05rem', color: '#1e293b', fontStyle: 'italic', lineHeight: 1.6 }}>
                    “Everything arrived safely and matched the descriptions perfectly. I’ll definitely shop here again.”
                  </p>
                </div>
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#fef3c7',
                    color: '#d97706',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700'
                  }}>
                    R
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#0f172a' }}>Verified Customer</div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Home & Kitchen Buyer</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CORPORATE PROFILE & DIRECT DESK FOR ZULQARNAIN VENTURES LLC */}
          <section className="corporate-profile-section">
            <div className="corporate-profile-container">
              
              {/* Left Column: Corporate Entity Info */}
              <div className="corporate-credentials-col">
                <div className="corp-section-eyebrow">
                  <span className="corp-dot"></span>
                  COMMITTED TO EXCELLENCE & CONVENIENT SHOPPING
                </div>
                
                <h2 className="corp-headline">
                  Zulqarnain Ventures LLC
                </h2>
                
                <p className="corp-lead-text">
                  Zulqarnain Ventures LLC is a modern e-commerce store offering a wide range of quality products for everyday needs. We focus on providing reliable products, competitive prices, and a convenient online shopping experience for our customers.
                </p>


                <div className="corp-actions-row">
                  <button 
                    className="btn-corp-primary"
                    onClick={() => {
                      const el = document.getElementById('featured-products-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span>Browse All Products</span>
                    <ArrowRight size={16} />
                  </button>
                  <a 
                    className="btn-corp-outline"
                    href="https://wa.me/+966537842419"
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Direct Help & Orders Desk */}
              <div className="corporate-trade-desk">
                <div className="trade-desk-badge-strip">
                  <span className="trade-desk-status">
                    <span className="pulse-indicator"></span> Support & Orders Active
                  </span>
                  <span className="trade-desk-id">24/7 Response</span>
                </div>

                <h3 className="trade-desk-title">Order Inquiries & Support</h3>
                
                <p className="trade-desk-desc">
                  Have questions about our products, need assistance with your order, or want to discuss multi-item orders? Contact our team anytime.
                </p>

                <div className="trade-desk-contacts">
                  <a href="tel:+966537842419" className="trade-contact-item">
                    <div className="contact-icon-box">
                      <Phone size={18} />
                    </div>
                    <div className="contact-details">
                      <span className="contact-role">Direct Phone & Support</span>
                      <strong className="contact-val">(+966) 537842419</strong>
                    </div>
                  </a>

                  <a href="mailto:ZULQARNAINY462@GMAIL.COM" className="trade-contact-item">
                    <div className="contact-icon-box">
                      <Mail size={18} />
                    </div>
                    <div className="contact-details">
                      <span className="contact-role">Direct Email Address</span>
                      <strong className="contact-val">ZULQARNAINY462@GMAIL.COM</strong>
                    </div>
                  </a>

                  <a 
                    href="https://wa.me/+966537842419" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="trade-contact-item"
                  >
                    <div className="contact-icon-box" style={{ background: '#dcfce7', color: '#16a34a' }}>
                      <MessageSquare size={18} />
                    </div>
                    <div className="contact-details">
                      <span className="contact-role">Instant WhatsApp Support</span>
                      <strong className="contact-val">(+966) 537842419</strong>
                      <span className="contact-note">Fastest reply for tracking & orders</span>
                    </div>
                  </a>
                </div>

                <div className="trade-desk-cta-group">
                  <a 
                    href="https://wa.me/+966537842419" 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-trade-whatsapp"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12.031 2C6.494 2 2 6.494 2 12.031c0 1.95.558 3.771 1.523 5.319L2.094 22l4.802-1.408a10.02 10.02 0 0 0 5.135 1.44c5.537 0 10.031-4.494 10.031-10.031S17.568 2 12.031 2zm5.727 14.152c-.24.673-1.393 1.282-1.922 1.346-.51.063-1.168.089-3.743-.977-3.136-1.298-5.14-4.524-5.297-4.733-.153-.209-1.264-1.684-1.264-3.213s.801-2.28 1.086-2.585c.285-.306.621-.382.828-.382.207 0 .414.002.595.011.192.01.448-.073.701.536.262.632.894 2.181.972 2.34.078.158.13.344.026.552-.104.209-.156.338-.311.52-.156.182-.328.406-.468.545-.156.155-.319.324-.137.636.182.312.81 1.336 1.737 2.161 1.192 1.062 2.196 1.391 2.508 1.547.312.156.494.13.676-.078.182-.208.78-.909.988-1.221.208-.312.416-.26.697-.156.281.104 1.79.845 2.099 1 .309.155.515.234.59.364.075.13.075.754-.165 1.427z"/>
                    </svg>
                    <span>Chat on WhatsApp (+966)</span>
                  </a>
                  <button 
                    onClick={() => handleOpenPartner('contact')}
                    className="btn-trade-rfq"
                  >
                    <span>Send Message</span>
                  </button>
                </div>
              </div>

            </div>
          </section>
        </main>
      )}

      {/* VIEW: PRODUCT DETAIL PAGE */}
      {activeTab === 'product-detail' && activeProduct && (
        <main className="product-detail-page">
          <div className="detail-container">
            <div className="detail-top-nav">
              <button 
                className="btn-back-catalog"
                onClick={() => navigateTo('home')}
              >
                <ArrowLeft size={16} />
                <span>Back to Catalog</span>
              </button>
              <div className="detail-breadcrumbs">
                <span className="crumb-link" onClick={() => navigateTo('home')}>Home</span>
                <span className="crumb-sep">/</span>
                <span className="crumb-link" onClick={() => { setActiveCategory(activeProduct.categoryId); navigateTo('home'); }}>{activeProduct.categoryName}</span>
                <span className="crumb-sep">/</span>
                <span className="crumb-current">{activeProduct.name}</span>
              </div>
            </div>

            {/* 2-Column Showcase */}
            <div className="detail-showcase-grid">
              {/* Product Gallery (Left) */}
              <div className="detail-gallery-col">
                <div className="detail-img-card">
                  <span className="detail-badge-float">{activeProduct.categoryName}</span>
                  <img 
                    src={activeProduct.image} 
                    alt={activeProduct.name} 
                    className="detail-hero-img" 
                  />
                  <div className="detail-verified-badge">
                    <CheckCircle2 size={14} color="#059669" />
                    <span>Verified Authentic</span>
                  </div>
                </div>

                <div className="detail-assurance-strip">
                  <div className="assurance-item">
                    <ShieldCheck size={20} className="assurance-icon" />
                    <div>
                      <strong>100% Quality Inspected</strong>
                      <span>Inspected before shipment</span>
                    </div>
                  </div>
                  <div className="assurance-item">
                    <Truck size={20} className="assurance-icon" />
                    <div>
                      <strong>Fast Reliable Delivery</strong>
                      <span>Direct order handling</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info (Right) */}
              <div className="detail-info-col">
                <div className="detail-meta-row">
                  <span className="detail-sku-badge">SKU: {activeProduct.sku}</span>
                  <span className="detail-stock-badge">
                    <span className="stock-pulsing-dot"></span>
                    <span>{activeProduct.availability} ({activeProduct.stockUnits} units ready)</span>
                  </span>
                </div>

                <h1 className="detail-product-title">{activeProduct.name}</h1>

                <div className="detail-reviews-row">
                  <div className="star-rating">★★★★★</div>
                  <span className="rating-score">{activeProduct.rating.toFixed(1)}</span>
                  <span className="review-count">({activeProduct.reviewCount} customer reviews)</span>
                </div>

                <div className="detail-price-panel">
                  <div className="detail-price-row">
                    <div className="detail-unit-price">
                      <span className="price-currency">{activeProduct.price}</span>
                      <span className="price-per">/ unit</span>
                    </div>
                    <span className="tax-tag">In Stock Ready to Ship</span>
                  </div>
                </div>

                <p className="detail-lead-summary">{activeProduct.description}</p>

                {/* Purchase Controls */}
                <div className="detail-purchase-panel">
                  <div className="qty-row">
                    <span className="qty-label">Quantity:</span>
                    <div className="qty-stepper">
                      <button 
                        className="stepper-btn"
                        onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))}
                        disabled={detailQuantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <input 
                        type="text" 
                        readOnly 
                        value={detailQuantity} 
                        className="stepper-input" 
                      />
                      <button 
                        className="stepper-btn"
                        onClick={() => setDetailQuantity(detailQuantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="subtotal-preview">
                      Subtotal: <strong>${(activeProduct.priceNumeric * detailQuantity).toLocaleString()}</strong>
                    </div>
                  </div>

                  <div className="detail-actions-grid">
                    <button 
                      className="btn-detail-add-cart"
                      onClick={() => addToCart(activeProduct, detailQuantity, true)}
                    >
                      <ShoppingCart size={18} />
                      <span>Add to Cart ({detailQuantity})</span>
                    </button>

                    <a 
                      className="btn-detail-whatsapp"
                      href={`https://wa.me/+966537842419?text=${encodeURIComponent(`Hello Zulqarnain Ventures LLC, I want to order ${detailQuantity}x ${activeProduct.name} (SKU: ${activeProduct.sku}, Total: $${(activeProduct.priceNumeric * detailQuantity).toLocaleString()}).`)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageSquare size={18} />
                      <span>Order via WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="detail-help-strip">
                  <span>Need assistance or bulk quote?</span>
                  <a href="https://wa.me/+966537842419" target="_blank" rel="noreferrer" className="help-link">
                    Chat with Support (+966)
                  </a>
                </div>
              </div>
            </div>

            {/* Specifications & Overview Tabs Section below showcase */}
            <div className="detail-tabs-section">
              <div className="detail-tabs-header">
                <button 
                  className={`detail-tab-btn ${activeDetailTab === 'description' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('description')}
                >
                  Product Overview
                </button>
                <button 
                  className={`detail-tab-btn ${activeDetailTab === 'features' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('features')}
                >
                  Key Features
                </button>
                <button 
                  className={`detail-tab-btn ${activeDetailTab === 'specs' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('specs')}
                >
                  Technical Specifications
                </button>
              </div>

              <div className="detail-tab-content">
                {activeDetailTab === 'description' && (
                  <div className="tab-pane">
                    <h3 className="tab-title">Product Details</h3>
                    <p className="tab-lead-text">{activeProduct.description}</p>
                    <p className="tab-lead-text">{activeProduct.longDescription}</p>
                  </div>
                )}

                {activeDetailTab === 'features' && (
                  <div className="tab-pane">
                    <h3 className="tab-title">Key Features & Benefits</h3>
                    <div className="tab-features-grid">
                      {activeProduct.features.map((feat, idx) => (
                        <div key={idx} className="tab-feature-card">
                          <Check size={18} color="#1e7087" style={{ marginBottom: '8px' }} />
                          <p>{feat}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeDetailTab === 'specs' && (
                  <div className="tab-pane">
                    <h3 className="tab-title">Technical Specifications</h3>
                    <table className="specs-table">
                      <tbody>
                        {activeProduct.specs.map((item, idx) => (
                          <tr key={idx}>
                            <td className="spec-label">{item.label}</td>
                            <td className="spec-value">{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Related Products */}
            <div className="related-products-section" style={{ marginTop: '60px' }}>
              <div className="section-header-left">
                <span className="section-tag">MORE TO DISCOVER</span>
                <h2 className="related-title">Recommended Everyday Essentials</h2>
              </div>

              <div className="products-grid">
                {products.filter(p => p.id !== activeProduct.id).slice(0, 4).map((prod) => (
                  <div 
                    key={prod.id} 
                    className="product-card"
                    onClick={() => viewProductDetail(prod)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="product-img-wrap">
                      <span className="product-badge">{prod.categoryName}</span>
                      <img src={prod.image} alt={prod.name} className="product-img" loading="lazy" />
                    </div>
                    <div className="product-body">
                      <div>
                        <span className="product-sku">{prod.sku}</span>
                        <h3 className="product-title">{prod.name}</h3>
                      </div>
                      <div>
                        <div className="product-price-box">
                          <div className="product-price-val">{prod.price}</div>
                        </div>
                        <div className="product-actions-row">
                          <button 
                            className="btn-add-cart"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(prod, 1, true);
                            }}
                          >
                            <ShoppingCart size={15} />
                            <span>Add to cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      )}

      {/* VIEW: CONTACT PAGE */}
      {activeTab === 'contact' && (
        <main className="section-wrapper" style={{ padding: '60px 24px', maxWidth: '1000px', margin: '0 auto' }}>
          <div className="section-header-center">
            <span className="section-tag">GET IN TOUCH</span>
            <h1 className="section-title">Contact Zulqarnain Ventures LLC</h1>
            <p className="section-subtitle">We are here to assist with any questions about our products, deliveries, or custom requests.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
            <div style={{ background: '#fff', padding: '35px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', color: '#0f172a' }}>Direct Contacts</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <a href="tel:+966537842419" style={{ display: 'flex', gap: '15px', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Phone Call / Direct</div>
                    <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>(+966) 537842419</strong>
                  </div>
                </a>

                <a href="mailto:ZULQARNAINY462@GMAIL.COM" style={{ display: 'flex', gap: '15px', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Email Us</div>
                    <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>ZULQARNAINY462@GMAIL.COM</strong>
                  </div>
                </a>

                <a href="https://wa.me/+966537842419" target="_blank" rel="noreferrer" style={{ display: 'flex', gap: '15px', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>WhatsApp Direct</div>
                    <strong style={{ fontSize: '1.05rem', color: '#16a34a' }}>(+966) 537842419</strong>
                  </div>
                </a>
              </div>

              <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', color: '#0f172a' }}>Connect on Socials</h4>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a href="https://facebook.com/" target="_blank" rel="noreferrer" style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: '20px', textDecoration: 'none', color: '#334155', fontSize: '0.88rem', fontWeight: '500' }}>Facebook</a>
                  <a href="https://instagram.com/" target="_blank" rel="noreferrer" style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: '20px', textDecoration: 'none', color: '#334155', fontSize: '0.88rem', fontWeight: '500' }}>Instagram</a>
                  <a href="https://tiktok.com/" target="_blank" rel="noreferrer" style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: '20px', textDecoration: 'none', color: '#334155', fontSize: '0.88rem', fontWeight: '500' }}>TikTok</a>
                </div>
              </div>
            </div>

            <div style={{ background: '#fff', padding: '35px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#0f172a' }}>Send Us a Message</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input type="text" required placeholder="Enter your full name" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input type="email" required placeholder="name@domain.com" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp</label>
                  <input type="text" placeholder="(+966) 537842419" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea rows={4} required placeholder="How can we help you?" className="form-textarea"></textarea>
                </div>
                <button type="submit" className="btn-submit-modal" style={{ width: '100%', marginTop: '10px' }}>
                  Send Message
                </button>
              </form>
              {formSubmitted && (
                <div style={{ marginTop: '16px', padding: '12px', background: '#ecfdf5', color: '#065f46', borderRadius: '8px', fontSize: '0.9rem', textAlign: 'center' }}>
                  ✓ Thank you! Your message has been sent to Zulqarnain Ventures LLC. We will reply promptly.
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {/* 3. FOOTER AS EXACTLY SPECIFIED BY USER */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <img src={logoImg} alt="Zulqarnain Ventures LLC Logo" className="footer-logo-img" />
            <h3>Zulqarnain Ventures LLC</h3>
            <p>
              Zulqarnain Ventures LLC is a modern e-commerce store offering a wide range of quality products for everyday needs. We focus on providing reliable products, competitive prices, and a convenient online shopping experience for our customers.
            </p>
            <div style={{ marginTop: '16px', fontSize: '0.85rem', color: '#cbd5e1' }}>
              <div><strong>Direct Contacts:</strong> ZULQARNAINY462@GMAIL.COM</div>
              <div><strong>Phone Hotline:</strong> (+966) 537842419</div>
              <div><strong>WhatsApp Support:</strong> (+966) 537842419</div>
            </div>
          </div>

          <div className="footer-col">
            <h4>Menu</h4>
            <ul>
              <li><a href="#main-content" onClick={(e) => { e.preventDefault(); setSelectedCategory('all'); navigateTo('home'); }}>Home</a></li>
              <li><a href="#main-content" onClick={(e) => { e.preventDefault(); setSelectedCategory('all'); navigateTo('home'); }}>Shop</a></li>
              <li><a href="#main-content" onClick={(e) => { e.preventDefault(); navigateTo('home', 'home-and-kitchen'); }}>Home And Kitchen</a></li>
              <li><a href="#main-content" onClick={(e) => { e.preventDefault(); navigateTo('home', 'office-products'); }}>Office Products</a></li>
              <li><a href="#main-content" onClick={(e) => { e.preventDefault(); navigateTo('home', 'pet-supplies'); }}>Pet Supplies</a></li>
              <li><a href="#main-content" onClick={(e) => { e.preventDefault(); navigateTo('home', 'sports-and-outdoors'); }}>Sports And Outdoors</a></li>
              <li><a href="#main-content" onClick={(e) => { e.preventDefault(); navigateTo('home', 'tools-and-home-improvement'); }}>Tools And Home Improvement</a></li>
              <li><a href="#main-content" onClick={(e) => { e.preventDefault(); navigateTo('home', 'automotive'); }}>Automotive</a></li>
              <li><a href="#main-content" onClick={(e) => { e.preventDefault(); navigateTo('home', 'baby-products'); }}>Baby Products</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contacts</h4>
            <ul style={{ marginBottom: '20px' }}>
              <li>
                <a href="mailto:ZULQARNAINY462@GMAIL.COM">
                  ZULQARNAINY462@GMAIL.COM
                </a>
              </li>
              <li>
                <a href="tel:+966537842419">
                  (+966) 537842419
                </a>
              </li>
            </ul>

            <h4 style={{ marginTop: '16px' }}>Socials</h4>
            <ul>
              <li><a href="https://facebook.com/" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://tiktok.com/" target="_blank" rel="noreferrer">TikTok</a></li>
              <li><a href="https://wa.me/+966537842419" target="_blank" rel="noreferrer" style={{ color: '#4ade80' }}>WhatsApp</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Subscribe to our newsletter</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '14px', color: '#cbd5e1' }}>
              Stay updated with our latest arrivals, exclusive seasonal promotions, and everyday savings.
            </p>
            <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Email *</label>
              <input 
                type="email" 
                required 
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  background: '#0f2432',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <button 
                type="submit" 
                style={{
                  background: '#1e7087',
                  color: '#ffffff',
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '4px'
                }}
              >
                Subscribe
              </button>
            </form>

            {newsletterSuccess && (
              <div style={{ marginTop: '10px', color: '#4ade80', fontSize: '0.82rem' }}>
                ✓ Thank you for subscribing to our newsletter!
              </div>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 <strong>Zulqarnain ventures llc</strong>. All rights reserved.
          </div>
          <div style={{ color: '#94a3b8' }}>
            Zulqarnain Ventures LLC • Modern E-Commerce Store
          </div>
        </div>
      </footer>

      {/* CART DRAWER SLIDE-OVER */}
      {cartOpen && (
        <div className="cart-backdrop" onClick={() => setCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-drawer-header">
              <div className="cart-header-title">
                <ShoppingBag size={20} color="#1e7087" />
                <h3>Your Shopping Cart</h3>
                <span className="cart-count-pill">{totalCartItems} items</span>
              </div>
              <button className="cart-close-btn" onClick={() => setCartOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="cart-drawer-body">
              {cart.length === 0 ? (
                <div className="cart-empty-state">
                  <div className="empty-cart-icon">
                    <ShoppingCart size={48} strokeWidth={1.5} color="#94a3b8" />
                  </div>
                  <h4>Your shopping cart is empty</h4>
                  <p>Explore our wide collection of everyday essentials and discover high quality items at great prices.</p>
                  <button 
                    className="btn-hero-primary" 
                    style={{ marginTop: '16px' }}
                    onClick={() => {
                      setCartOpen(false);
                      setSelectedCategory('all');
                      navigateTo('home');
                      setTimeout(() => {
                        const el = document.getElementById('featured-products-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 50);
                    }}
                  >
                    Return to shop
                  </button>
                </div>
              ) : (
                <div className="cart-items-list">
                  {cart.map((item) => (
                    <div key={item.product.id} className="cart-item-card">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="cart-item-thumb"
                        onClick={() => {
                          viewProductDetail(item.product);
                          setCartOpen(false);
                        }}
                      />
                      <div className="cart-item-details">
                        <div className="cart-item-meta">
                          <span className="cart-item-sku">SKU: {item.product.sku}</span>
                          <button 
                            className="btn-remove-item"
                            onClick={() => removeFromCart(item.product.id)}
                            title="Remove item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <h4 
                          className="cart-item-title"
                          onClick={() => {
                            viewProductDetail(item.product);
                            setCartOpen(false);
                          }}
                        >
                          {item.product.name}
                        </h4>
                        <div className="cart-item-bottom">
                          <div className="cart-qty-controls">
                            <button 
                              className="qty-btn"
                              onClick={() => updateCartQuantity(item.product.id, -1)}
                            >
                              <Minus size={12} />
                            </button>
                            <span className="cart-qty-val">{item.quantity}</span>
                            <button 
                              className="qty-btn"
                              onClick={() => updateCartQuantity(item.product.id, 1)}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <div className="cart-item-price">
                            ${(item.product.priceNumeric * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-drawer-footer">
                <div className="cart-summary-box">
                  <div className="cart-summary-line">
                    <span>Items Count</span>
                    <span>{totalCartItems} units</span>
                  </div>
                  <div className="cart-summary-line cart-summary-total">
                    <span>Subtotal</span>
                    <span>${cartSubtotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="cart-checkout-actions">
                  <a 
                    className="btn-checkout-wa"
                    href={`https://wa.me/+966537842419?text=${encodeURIComponent(
                      `Hello Zulqarnain Ventures LLC, I want to place an order:\n\n` +
                      cart.map(i => `• ${i.quantity}x ${i.product.name} (SKU: ${i.product.sku}) - $${(i.product.priceNumeric * i.quantity).toLocaleString()}`).join('\n') +
                      `\n\nTotal Order Value: $${cartSubtotal.toLocaleString()}\n\nPlease confirm availability and payment details.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <MessageSquare size={18} />
                    <span>Order via WhatsApp (+966)</span>
                  </a>

                  <button 
                    className="btn-clear-cart"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#0f172a',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.9rem',
          fontWeight: '500'
        }}>
          <CheckCircle2 size={18} color="#4ade80" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MODAL WINDOW */}
      {modalType && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Contact Zulqarnain Ventures LLC</h3>
              <button className="modal-close-btn" onClick={closeModal}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: '18px', color: '#475569', fontSize: '0.9rem' }}>
                Reach out to our team directly. You can also contact us via phone/WhatsApp at (+966) 537842419 or email ZULQARNAINY462@GMAIL.COM.
              </p>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input type="text" required placeholder="Your Name" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input type="email" required placeholder="you@domain.com" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp</label>
                  <input type="text" placeholder="(+966) 537842419" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea rows={3} required placeholder="How can we assist you today?" className="form-textarea"></textarea>
                </div>
                <button type="submit" className="btn-submit-modal" style={{ width: '100%' }}>
                  Submit Inquiry
                </button>
              </form>
              {formSubmitted && (
                <div style={{ marginTop: '14px', padding: '10px', background: '#ecfdf5', color: '#065f46', borderRadius: '8px', fontSize: '0.88rem', textAlign: 'center' }}>
                  ✓ Message received! We will get in touch shortly.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
