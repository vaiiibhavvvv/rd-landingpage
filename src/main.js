import './styles.css';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryItems, services } from './site-data.js';

gsap.registerPlugin(ScrollTrigger);

const page = document.body.dataset.page || 'home';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const icon = (name) => {
  const icons = {
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.7 3.9.7.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.8 21 3 13.2 3 3.6c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.4.2 2.7.7 3.9.1.4 0 .8-.2 1.1l-2.3 2.2Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3zM3 6l9 7 9-7"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19"/></svg>',
  };
  return icons[name] || '';
};

function headerTemplate() {
  const nav = [
    ['home', '/', 'Home'],
    ['about', '/about.html', 'About'],
    ['services', '/services.html', 'Services'],
    ['gallery', '/gallery.html', 'Gallery'],
    ['contact', '/contact.html', 'Contact'],
  ];
  return `
    <a class="skip-link" href="#main-content">Skip to content</a>
    <div class="utility-bar">
      <div class="shell utility-inner">
        <span>Established 2018</span>
        <div class="utility-links">
          <a href="mailto:rdenterprises747@gmail.com">${icon('mail')}<span>rdenterprises747@gmail.com</span></a>
          <a href="tel:+919458067642">${icon('phone')}<span>+91 94580 67642</span></a>
        </div>
      </div>
    </div>
    <header class="site-header" data-header>
      <div class="shell header-inner">
        <a class="brand" href="/" aria-label="RD Enterprises home">
          <span class="brand-mark">RD</span>
          <span class="brand-copy"><strong>RD Enterprises</strong><small>Civil Contractor & Supplier</small></span>
        </a>
        <nav class="desktop-nav" aria-label="Primary navigation">
          ${nav.map(([key, href, label]) => `<a class="${page === key ? 'active' : ''}" href="${href}">${label}</a>`).join('')}
        </nav>
        <a class="button button-small header-cta" href="/contact.html">Start a project ${icon('arrow')}</a>
        <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-menu-toggle>
          <span></span><span></span>
        </button>
      </div>
    </header>
    <div class="mobile-menu" data-mobile-menu aria-hidden="true">
      <div class="mobile-menu-grid"></div>
      <nav aria-label="Mobile navigation">
        ${nav.map(([key, href, label], index) => `<a class="${page === key ? 'active' : ''}" href="${href}"><small>0${index + 1}</small>${label}${icon('arrow')}</a>`).join('')}
      </nav>
      <div class="mobile-menu-contact">
        <a href="tel:+919458067642">+91 94580 67642</a>
        <a href="mailto:rdenterprises747@gmail.com">rdenterprises747@gmail.com</a>
      </div>
    </div>
  `;
}

function footerTemplate() {
  return `
    <footer class="site-footer">
      <div class="footer-orbit" aria-hidden="true"></div>
      <div class="shell footer-grid">
        <div class="footer-lead">
          <span class="eyebrow light">Build with clarity</span>
          <h2>Have a site in mind?</h2>
          <a class="text-link light" href="/contact.html">Let’s discuss the requirement ${icon('arrow')}</a>
        </div>
        <div class="footer-column">
          <span class="footer-label">Navigate</span>
          <a href="/about.html">About</a>
          <a href="/services.html">Services</a>
          <a href="/gallery.html">Gallery</a>
          <a href="/contact.html">Contact</a>
        </div>
        <div class="footer-column">
          <span class="footer-label">Connect</span>
          <a href="tel:+919458067642">+91 94580 67642</a>
          <a href="tel:+919013049136">+91 90130 49136</a>
          <a href="mailto:rdenterprises747@gmail.com">rdenterprises747@gmail.com</a>
        </div>
        <div class="footer-column footer-address">
          <span class="footer-label">Corporate office</span>
          <p>Shop No. 34, Mahalaxmi Plaza, G.F., Sector 5, Sahibabad, Ghaziabad, U.P. 201005</p>
        </div>
      </div>
      <div class="shell footer-bottom">
        <div class="footer-brand"><span>RD</span> Enterprises</div>
        <p>Civil Contractor & Supplier · Registered with MSME and on GeM</p>
        <p>GSTIN 07ABFFR5791P1ZB</p>
        <p>© ${new Date().getFullYear()} RD Enterprises</p>
      </div>
    </footer>
    <a class="floating-call" href="tel:+919458067642" aria-label="Call RD Enterprises">${icon('phone')}</a>
    <a class="floating-whatsapp" href="https://wa.me/919458067642?text=Hello%20RD%20Enterprises%2C%20I%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer" aria-label="Chat with RD Enterprises on WhatsApp"><span>WA</span></a>
    <div class="page-transition" aria-hidden="true"><span>RD</span></div>
    <div class="cursor-lens" aria-hidden="true"></div>
  `;
}

document.querySelector('[data-site-header]')?.insertAdjacentHTML('afterbegin', headerTemplate());
document.querySelector('[data-site-footer]')?.insertAdjacentHTML('afterbegin', footerTemplate());

const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileMenu?.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('menu-open', open);
});

let lenis;
if (!reducedMotion) {
  lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.85 });
  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  lenis.on('scroll', ScrollTrigger.update);
}

const header = document.querySelector('[data-header]');
const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

if (!reducedMotion) {
  gsap.utils.toArray('[data-reveal]').forEach((element) => {
    gsap.fromTo(element, { y: 44, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.95,
      ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 88%', once: true },
    });
  });

  gsap.utils.toArray('[data-parallax]').forEach((element) => {
    gsap.to(element, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
    });
  });
}

document.querySelectorAll('.liquid-card, .project-card, .service-card').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--my', `${event.clientY - rect.top}px`);
  });
});

const cursor = document.querySelector('.cursor-lens');
if (cursor && window.matchMedia('(pointer:fine)').matches && !reducedMotion) {
  window.addEventListener('pointermove', (event) => {
    gsap.to(cursor, { x: event.clientX, y: event.clientY, duration: 0.18, ease: 'power2.out' });
  });
  document.querySelectorAll('a, button, .liquid-card').forEach((target) => {
    target.addEventListener('pointerenter', () => cursor.classList.add('active'));
    target.addEventListener('pointerleave', () => cursor.classList.remove('active'));
  });
}

document.querySelectorAll('[data-magnetic]').forEach((element) => {
  if (reducedMotion) return;
  element.addEventListener('pointermove', (event) => {
    const rect = element.getBoundingClientRect();
    gsap.to(element, { x: (event.clientX - rect.left - rect.width / 2) * 0.12, y: (event.clientY - rect.top - rect.height / 2) * 0.12, duration: 0.25 });
  });
  element.addEventListener('pointerleave', () => gsap.to(element, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, .35)' }));
});

const serviceGrid = document.querySelector('[data-service-grid]');
if (serviceGrid) {
  serviceGrid.innerHTML = services.map((service) => `
    <article class="service-card liquid-card" id="${service.id}" data-category="${service.id}">
      <div class="service-card-image"><img src="${service.image}" alt="${service.title} project by RD Enterprises" loading="lazy"><span></span></div>
      <div class="service-card-copy">
        <div class="service-card-top"><span>${service.number}</span><span>RD / NCR</span></div>
        <h3>${service.title}</h3>
        <p>${service.short}</p>
        <ul>${service.scope.map((item) => `<li>${item}</li>`).join('')}</ul>
        <a class="text-link" href="/contact.html?service=${encodeURIComponent(service.title)}">Enquire about this service ${icon('arrow')}</a>
      </div>
    </article>
  `).join('');
}

const galleryGrid = document.querySelector('[data-gallery-grid]');
if (galleryGrid) {
  const renderGallery = (filter = 'All') => {
    const filtered = filter === 'All' ? galleryItems : galleryItems.filter((item) => item.category === filter);
    galleryGrid.innerHTML = filtered.map((item, index) => `
      <button class="gallery-item ${index % 5 === 0 ? 'gallery-item-wide' : ''}" type="button" data-gallery-id="${item.id}" aria-label="Open ${item.title}">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <span class="gallery-sheen"></span>
        <span class="gallery-caption"><small>${item.category}</small><strong>${item.title}</strong><i>↗</i></span>
      </button>
    `).join('');
    bindGalleryItems();
  };

  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImage = lightbox?.querySelector('img');
  const lightboxCategory = lightbox?.querySelector('[data-lightbox-category]');
  const lightboxTitle = lightbox?.querySelector('[data-lightbox-title]');
  let currentId = 1;

  const openItem = (id) => {
    const item = galleryItems.find((entry) => entry.id === Number(id));
    if (!item || !lightbox) return;
    currentId = item.id;
    lightboxImage.src = item.image;
    lightboxImage.alt = item.title;
    lightboxCategory.textContent = item.category;
    lightboxTitle.textContent = item.title;
    lightbox.showModal();
    document.body.classList.add('lightbox-open');
  };
  const closeLightbox = () => {
    lightbox?.close();
    document.body.classList.remove('lightbox-open');
  };
  const stepItem = (direction) => {
    const next = ((currentId - 1 + direction + galleryItems.length) % galleryItems.length) + 1;
    openItem(next);
  };
  const bindGalleryItems = () => document.querySelectorAll('[data-gallery-id]').forEach((item) => item.addEventListener('click', () => openItem(item.dataset.galleryId)));

  document.querySelector('[data-lightbox-close]')?.addEventListener('click', closeLightbox);
  document.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => stepItem(-1));
  document.querySelector('[data-lightbox-next]')?.addEventListener('click', () => stepItem(1));
  lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
  lightbox?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') stepItem(-1);
    if (event.key === 'ArrowRight') stepItem(1);
  });

  document.querySelectorAll('[data-gallery-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-gallery-filter]').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      renderGallery(button.dataset.galleryFilter);
    });
  });
  renderGallery();
}

const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  const serviceParam = new URLSearchParams(window.location.search).get('service');
  if (serviceParam) contactForm.elements.service.value = serviceParam;

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get('name')?.trim();
    const phone = data.get('phone')?.trim();
    const service = data.get('service')?.trim();
    const location = data.get('location')?.trim();
    const message = data.get('message')?.trim();
    const status = contactForm.querySelector('[data-form-status]');
    if (!name || !phone || !service) {
      status.textContent = 'Please add your name, phone number and required service.';
      status.className = 'form-status error';
      return;
    }
    const text = `Hello RD Enterprises,\n\nMy name is ${name}.\nPhone: ${phone}\nService: ${service}\nLocation: ${location || 'Not specified'}\n\nRequirement: ${message || 'I would like to discuss the project.'}`;
    status.textContent = 'Opening WhatsApp with your project details…';
    status.className = 'form-status success';
    window.open(`https://wa.me/919458067642?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  });
}

document.querySelectorAll('a[href]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http') || event.metaKey || event.ctrlKey || reducedMotion) return;
    event.preventDefault();
    document.body.classList.add('is-leaving');
    window.setTimeout(() => { window.location.href = href; }, 420);
  });
});

if (document.querySelector('[data-three-canvas]') && !reducedMotion) {
  import('./three-scene.js').then(({ initThreeBackground }) => initThreeBackground());
}

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  ScrollTrigger.refresh();
});
