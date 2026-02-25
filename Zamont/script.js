/* ═══════════════════════════════════════════════════
   ZAMONT – script.js
   
   ┌─ NASTAVENÍ ──────────────────────────────────────
   │  Všechny PLACEHOLDER hodnoty označeny komentářem
   │  PLACEHOLDER – sem doplňte své údaje
   └──────────────────────────────────────────────────
═══════════════════════════════════════════════════ */

/* ── PLACEHOLDER: Vložte URL z Google Sheets (File → Share → Publish to Web → CSV) ── */
const SHEETS_CSV_URL = '';
/* Formát URL: https://docs.google.com/spreadsheets/d/e/XXXX/pub?gid=0&single=true&output=csv */

/* ── PLACEHOLDER: Vaše firemní kontaktní údaje ── */
const CONTACT_INFO = {
  name:    'Zamont s.r.o.',
  phone:   '+420777123456',        // bez mezer
  phoneDisplay: '+420 777 123 456',
  email:   'info@zamont.cz',
  address: 'Vaše ulice 123, Praha 5',
  web:     'https://www.zamont.cz',
  ico:     '12345678'
};

/* ═══════════════════════════════════════════════════
   START
═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initCookieBanner();
  initContactForm();
  initQRCode();
  loadRealizations();
});

/* ─────────────────────────────────────────
   NAVIGACE – scroll efekt + aktivní odkaz + mobile menu
───────────────────────────────────────── */
function initNav() {
  const nav      = document.getElementById('nav');
  const toggle   = document.getElementById('navToggle');
  const menu     = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll – stín navigace
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Mobile menu toggle
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');
  });

  // Zavřít menu po kliku na odkaz
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
    });
  });

  // Aktivní odkaz při scrollu
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.3, rootMargin: '-68px 0px -40% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ─────────────────────────────────────────
   SCROLL REVEAL – plynulé zobrazení prvků
───────────────────────────────────────── */
function initScrollReveal() {
  const elements = document.querySelectorAll('.scroll-reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────
   COOKIE BANNER
───────────────────────────────────────── */
function initCookieBanner() {
  if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
      document.getElementById('cookieBanner').classList.add('visible');
    }, 1500);
  }
}

function acceptCookies() {
  localStorage.setItem('cookieConsent', 'accepted');
  hideCookieBanner();
}

function rejectCookies() {
  localStorage.setItem('cookieConsent', 'rejected');
  hideCookieBanner();
}

function hideCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  banner.style.opacity = '0';
  banner.style.transform = 'translateX(-50%) translateY(20px)';
  banner.style.transition = 'all 0.3s ease';
  setTimeout(() => banner.remove(), 300);
}

/* ─────────────────────────────────────────
   KONTAKTNÍ FORMULÁŘ – odeslání přes mailto
───────────────────────────────────────── */
function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('fname').value.trim();
    const email   = document.getElementById('femail').value.trim();
    const phone   = document.getElementById('fphone').value.trim();
    const subject = document.getElementById('fsubject').value;
    const message = document.getElementById('fmessage').value.trim();

    if (!name || !email) return;

    const body = [
      `Jméno: ${name}`,
      `E-mail: ${email}`,
      phone ? `Telefon: ${phone}` : '',
      subject ? `Typ služby: ${subject}` : '',
      '',
      message
    ].filter(Boolean).join('\n');

    /* PLACEHOLDER: nahradte info@zamont.cz svým e-mailem */
    const mailto = `mailto:${CONTACT_INFO.email}?subject=Poptávka – ${encodeURIComponent(subject || 'Obecná')}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    success.classList.add('visible');
    form.reset();
    setTimeout(() => success.classList.remove('visible'), 6000);
  });
}

/* ─────────────────────────────────────────
   QR KÓD – kontakt
───────────────────────────────────────── */
function initQRCode() {
  const container = document.getElementById('qrcode');
  if (!container || typeof QRCode === 'undefined') return;

  new QRCode(container, {
    text: `tel:${CONTACT_INFO.phone}`,
    width: 140,
    height: 140,
    colorDark: '#1a2e40',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.M
  });
}

/* ─────────────────────────────────────────
   VCARD – uložení kontaktu do mobilu
───────────────────────────────────────── */
function downloadVCard() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${CONTACT_INFO.name}`,
    `ORG:${CONTACT_INFO.name}`,
    `TEL;TYPE=WORK,VOICE:${CONTACT_INFO.phone}`,
    `EMAIL:${CONTACT_INFO.email}`,
    `ADR;TYPE=WORK:;;${CONTACT_INFO.address};;;;CZ`,
    `URL:${CONTACT_INFO.web}`,
    `NOTE:IČO: ${CONTACT_INFO.ico}`,
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'zamont-kontakt.vcf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ─────────────────────────────────────────
   REALIZACE – načtení z Google Sheets CSV
   nebo zobrazení demo dat
───────────────────────────────────────── */
async function loadRealizations() {
  const grid = document.getElementById('projectsGrid');

  let projects = [];

  if (SHEETS_CSV_URL) {
    try {
      const res  = await fetch(SHEETS_CSV_URL);
      const text = await res.text();
      projects   = parseCSV(text);
    } catch (err) {
      console.warn('Nepodařilo se načíst Google Sheets:', err);
      projects = getDemoProjects();
    }
  } else {
    // Žádné URL → ukažeme demo data
    projects = getDemoProjects();
  }

  renderProjects(grid, projects);
}

function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  if (lines.length < 2) return [];

  // Přeskočíme první řádek (záhlaví): nazev, popis, foto1, foto2, foto3, foto4, foto5, foto6
  return lines.slice(1).map(line => {
    const cols = parseCSVLine(line);
    return {
      nazev: cols[0]  || '',
      popis: cols[1]  || '',
      fotos: [cols[2], cols[3], cols[4], cols[5], cols[6], cols[7]].filter(Boolean)
    };
  }).filter(p => p.nazev);
}

function parseCSVLine(line) {
  const result = [];
  let cur = '', inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i+1] === '"') { cur += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

function getDemoProjects() {
  return [
    {
      nazev: 'Rekonstrukce koupelny – Praha 6',
      popis: 'Kompletní rekonstrukce koupelny v bytě 3+kk. Nová vana, sprchový kout, WC, obklady a veškeré rozvody. Realizováno za 14 dní.',
      fotos: [
        'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=75',
        'https://images.unsplash.com/photo-1620626011761-996317702b46?w=600&q=75',
        'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=600&q=75',
        'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=75',
        'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=600&q=75',
      ]
    },
    {
      nazev: 'Instalace tepelného čerpadla – Středočeský kraj',
      popis: 'Montáž tepelného čerpadla vzduch-voda o výkonu 12 kW pro rodinný dům 180 m². Úspora energií oproti plynovému kotli přes 60 %.',
      fotos: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75',
        'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=75',
        'https://images.unsplash.com/photo-1581094488379-6a7e4e4f6b07?w=600&q=75',
        'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=75',
        'https://images.unsplash.com/photo-1581094488379-6a7e4e4f6b07?w=600&q=75',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75',
      ]
    },
    {
      nazev: 'Rozvody vody – bytový dům Praha 4',
      popis: 'Kompletní výměna starých ocelových rozvodů za plastové v bytovém domě s 12 bytovými jednotkami. Práce probíhaly za provozu.',
      fotos: [
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=75',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75',
        'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=75',
        'https://images.unsplash.com/photo-1581094488379-6a7e4e4f6b07?w=600&q=75',
      ]
    }
  ];
}

function renderProjects(grid, projects) {
  grid.innerHTML = '';

  if (projects.length === 0) {
    grid.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:60px 0;grid-column:1/-1">Zatím žádné realizace k zobrazení.</p>';
    return;
  }

  projects.forEach((project, pIdx) => {
    const card = document.createElement('div');
    card.className = 'project-card scroll-reveal';

    const photos = project.fotos.slice(0, 6);
    const extraCount = photos.length > 5 ? photos.length - 4 : 0;

    // Galerie grid
    const galleryPhotos = photos.slice(0, 5);
    let galleryHtml = '<div class="project-gallery">';
    galleryPhotos.forEach((url, i) => {
      const isLast = i === 4 && extraCount > 0;
      galleryHtml += `
        <div class="project-photo" onclick="openLightbox(${pIdx}, ${i})">
          <img src="${url}" alt="${project.nazev} – foto ${i+1}" loading="lazy">
          ${isLast ? `<div class="project-photo-more">+${extraCount}</div>` : `<div class="project-photo-overlay"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" stroke="white" stroke-width="2" stroke-linecap="round"/></svg></div>`}
        </div>
      `;
    });
    galleryHtml += '</div>';

    card.innerHTML = `
      ${galleryHtml}
      <div class="project-info">
        <h3 class="project-title">${project.nazev}</h3>
        <p class="project-desc">${project.popis}</p>
        <button class="project-btn" onclick="openLightbox(${pIdx}, 0)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          Zobrazit všechny fotky (${photos.length})
        </button>
      </div>
    `;
    grid.appendChild(card);
  });

  // Spustit scroll reveal pro nové karty
  requestAnimationFrame(() => initScrollReveal());

  // Uložíme projekty globálně pro lightbox
  window._zamontProjects = projects;
}

/* ─────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────── */
let _lbProject = null;
let _lbIndex   = 0;

function openLightbox(projectIdx, photoIdx) {
  const projects = window._zamontProjects;
  if (!projects) return;

  _lbProject = projects[projectIdx];
  _lbIndex   = photoIdx;

  const lb = document.getElementById('lightbox');
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';

  updateLightbox();
  buildLightboxThumbs();
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxPrev() {
  const photos = _lbProject.fotos;
  _lbIndex = (_lbIndex - 1 + photos.length) % photos.length;
  updateLightbox();
}

function lightboxNext() {
  const photos = _lbProject.fotos;
  _lbIndex = (_lbIndex + 1) % photos.length;
  updateLightbox();
}

function updateLightbox() {
  const photos = _lbProject.fotos;
  const img    = document.getElementById('lightboxImg');
  const cap    = document.getElementById('lightboxCaption');
  const cnt    = document.getElementById('lightboxCounter');
  const thumbs = document.querySelectorAll('.lightbox-thumb');

  img.src   = photos[_lbIndex];
  img.alt   = `${_lbProject.nazev} – foto ${_lbIndex + 1}`;
  cap.textContent = _lbProject.nazev;
  cnt.textContent = `${_lbIndex + 1} / ${photos.length}`;

  thumbs.forEach((t, i) => t.classList.toggle('active', i === _lbIndex));

  // Prev/next viditelnost
  document.querySelector('.lightbox-prev').style.display = photos.length > 1 ? '' : 'none';
  document.querySelector('.lightbox-next').style.display = photos.length > 1 ? '' : 'none';
}

function buildLightboxThumbs() {
  const thumbs = document.getElementById('lightboxThumbs');
  thumbs.innerHTML = '';
  _lbProject.fotos.forEach((url, i) => {
    const div = document.createElement('div');
    div.className = 'lightbox-thumb' + (i === _lbIndex ? ' active' : '');
    div.innerHTML = `<img src="${url}" alt="">`;
    div.addEventListener('click', () => {
      _lbIndex = i;
      updateLightbox();
    });
    thumbs.appendChild(div);
  });
}

// Klávesová navigace v lightboxu
document.addEventListener('keydown', (e) => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   lightboxPrev();
  if (e.key === 'ArrowRight')  lightboxNext();
});

/* ─────────────────────────────────────────
   TOUCH SWIPE v lightboxu
───────────────────────────────────────── */
let _touchStartX = 0;
document.getElementById('lightbox')?.addEventListener('touchstart', e => {
  _touchStartX = e.touches[0].clientX;
}, { passive: true });

document.getElementById('lightbox')?.addEventListener('touchend', e => {
  const diff = _touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    diff > 0 ? lightboxNext() : lightboxPrev();
  }
}, { passive: true });
