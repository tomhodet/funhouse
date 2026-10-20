/* ============================================================
   FUN HOUSE · LIVRET D'ACCUEIL · APPLICATION v2
   Vanilla JS, sans dépendance. Le contenu vient de content.js.
   ============================================================ */
(function () {
  'use strict';
  const CFG = window.FH_CONFIG, ALL = window.FH_CONTENT;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const enc = encodeURIComponent;
  const NB = ' ', FINE = ' ';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
  };
  const PAGE_URL = (location.protocol.startsWith('http') ? location.origin + location.pathname : CFG.url);

  /* ---------- Langue ---------- */
  let lang = store.get('fh-lang', null);
  if (!lang) lang = (navigator.language || 'fr').toLowerCase().startsWith('fr') ? 'fr' : 'en';
  const T = () => ALL[lang];

  /* ---------- Icônes (trait fin, charte) ---------- */
  const I = {
    wifi: '<path d="M2.5 9a15 15 0 0 1 19 0"/><path d="M5.5 12.5a10.5 10.5 0 0 1 13 0"/><path d="M8.7 16a5.5 5.5 0 0 1 6.6 0"/><circle cx="12" cy="19.3" r=".9" fill="currentColor"/>',
    phone: '<path d="M5 3h3.5l1.8 4.6-2.3 1.6a12 12 0 0 0 6.8 6.8l1.6-2.3L21 15.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
    sms: '<path d="M4 5.5h16v10H9l-5 4z"/><path d="M8 10.5h8"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="M10.7 12.3 21 2M17 6l3 3M14.5 8.5l2 2"/>',
    house: '<path d="M3 11 12 3l9 8"/><path d="M5.5 9.5V21h13V9.5"/><path d="M10 21v-6h4v6"/>',
    bed: '<path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7"/><path d="M3 15h18"/><path d="M6 9V6h12v3"/><path d="M3 18v2M21 18v2"/>',
    check: '<path d="M5 12.5l4 4L19 7"/>',
    music: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
    bell: '<path d="M4 17h16"/><path d="M5 17a7 7 0 0 1 14 0"/><path d="M12 10V8"/><path d="M10 8h4"/><path d="M3 20h18"/>',
    pin: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    alert: '<path d="M12 3 2.5 20h19z"/><path d="M12 9v5"/><circle cx="12" cy="17" r=".8" fill="currentColor"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 17l-5.4 2.8 1.1-6.1L3.2 9.4l6.1-.8z"/>',
    share: '<path d="M12 3v12"/><path d="m8 7 4-4 4 4"/><path d="M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8"/>',
    chevR: '<path d="m9 5 7 7-7 7"/>', chevL: '<path d="m15 5-7 7 7 7"/>', plus: '<path d="M12 5v14M5 12h14"/>', close: '<path d="M6 6l12 12M18 6 6 18"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    car: '<path d="M4 15.5 5.5 9h13l1.5 6.5"/><path d="M3 15.5h18v3.5H3z"/><circle cx="7" cy="19" r="1.3"/><circle cx="17" cy="19" r="1.3"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5"/><circle cx="12" cy="8" r=".8" fill="currentColor"/>',
    ext: '<path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c3 3 3 14 0 17M12 3.5c-3 3-3 14 0 17"/>',
    install: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M12 8v6m-3-3 3 3 3-3"/>',
    pen: '<path d="M4 20h4l10-10-4-4L4 16z"/><path d="m12.5 7.5 4 4"/>',
    /* équipements */
    billard: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3"/><path d="M12 3.5v5M12 15.5v5"/>',
    arcade: '<rect x="6" y="3" width="12" height="18" rx="2"/><rect x="8.5" y="6" width="7" height="5" rx="1"/><circle cx="10" cy="15.5" r="1.1"/><circle cx="14" cy="15.5" r="1.1"/>',
    babyfoot: '<rect x="3" y="7" width="18" height="10" rx="2"/><path d="M3 10.5h18M3 13.5h18"/><path d="M8 7v10M16 7v10"/>',
    flechettes: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/><path d="M12 12 19 5"/>',
    bar: '<path d="M6 4h12l-6 7z"/><path d="M12 11v8M8.5 19h7"/>',
    guitare: '<path d="M14 10 20 4"/><path d="M9 11.5a3.5 3.5 0 1 0 1.5 1.5"/><path d="M12.5 13.5a4 4 0 1 1-4-4"/><circle cx="10" cy="15" r="1"/>',
    vinyle: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.5"/><path d="M12 6.5a5.5 5.5 0 0 1 5.5 5.5"/>',
    enceinte: '<rect x="6" y="3" width="12" height="18" rx="2"/><circle cx="12" cy="14.5" r="3"/><circle cx="12" cy="7.5" r="1.2"/>',
    cuisine: '<path d="M4 10h12a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M16 11h4"/><path d="M7 7V5M10 7V4M13 7V5"/>',
    'lave-vaisselle': '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 8h16"/><circle cx="7.5" cy="5.5" r=".7" fill="currentColor"/><path d="M8 12h8M8 15.5h8"/>',
    'lave-linge': '<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="13" r="4.5"/><path d="M4 7.5h16"/><circle cx="7.5" cy="5.3" r=".7" fill="currentColor"/>',
    poele: '<path d="M12 3c1 3 4 4.5 4 8.5a4 4 0 0 1-8 0c0-2 1-3 1.5-4 .5 1.5 1.5 2 2.5 2 0-2-1-4 0-6.5z"/><path d="M6 21h12"/>',
    barbecue: '<path d="M4 9h16a8 8 0 0 1-16 0z"/><path d="M8 16l-2 5M16 16l2 5M12 17v4"/><path d="M9 5.5c.8-1 .8-2 0-3M12 5.5c.8-1 .8-2 0-3M15 5.5c.8-1 .8-2 0-3"/>',
    jardin: '<path d="M12 21V11"/><path d="M12 11c-5 0-7-3-7-7 4 0 7 2 7 7z"/><path d="M12 14c5 0 7-3 7-7-4 0-7 2-7 7z"/>',
    parking: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9.5 16.5v-9h3.5a2.5 2.5 0 0 1 0 5H9.5"/>',
    bebe: '<path d="M4 9h16v8H4z"/><path d="M7 9v8M10.5 9v8M14 9v8M17 9v8"/><path d="M4 17v3M20 17v3"/><path d="M12 9V6"/>',
    fer: '<path d="M4 15h16v3H4z"/><path d="M6 15c0-4 3-7 7-7h7v7"/><path d="M13 8V6h4"/>',
    animaux: '<circle cx="8" cy="8" r="1.8"/><circle cx="16" cy="8" r="1.8"/><circle cx="5" cy="12.5" r="1.6"/><circle cx="19" cy="12.5" r="1.6"/><path d="M12 12c3 0 5 2.5 5 5a2 2 0 0 1-2 2c-1 0-2-1-3-1s-2 1-3 1a2 2 0 0 1-2-2c0-2.5 2-5 5-5z"/>',
    /* conciergerie */
    ulm: '<path d="M3 14 21 9"/><path d="M8 12.5 12 5l6 3"/><path d="M12 5l8 4"/><circle cx="12" cy="16" r="1.8"/><path d="M12 14v-2"/>',
    velo: '<circle cx="6" cy="16" r="3.5"/><circle cx="18" cy="16" r="3.5"/><path d="M6 16l4-7h5l3 7M10 9h-2M11.5 9 15 16"/>',
    bus: '<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16"/><circle cx="8" cy="19" r="1.3"/><circle cx="16" cy="19" r="1.3"/><path d="M8 4v7M12 4v7M16 4v7"/>',
    repas: '<path d="M7 3v8M5 3v4a2 2 0 0 0 4 0V3M7 11v10"/><path d="M16 3c-2 0-3 3-3 6 0 2 1 3 2 3v9M16 3v18"/>',
    table: '<path d="M3 8h18"/><path d="M6 8v12M18 8v12"/><path d="M6 13h12"/>',
    fete: '<path d="M12 3v3"/><path d="M6 10h12v9H6z"/><path d="M6 13c1 1 2 1 3 0s2-1 3 0 2 1 3 0 2-1 3 0"/><path d="M12 6c-.8 0-1.3-.8-.8-1.5"/>',
    point: '<circle cx="12" cy="12" r="3"/>'
  };
  I.soleil = '<circle cx="12" cy="14" r="4"/><path d="M3 18h18"/><path d="M12 6V4M5.6 8.6 4.2 7.2M18.4 8.6l1.4-1.4M3.5 14H2M22 14h-1.5"/><path d="M7 21h10"/>';
  I.couleur = '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17" fill="currentColor" stroke="none" opacity=".35"/>';
  const ico = (n, cls) => `<svg class="${cls || 'ico'}" viewBox="0 0 24 24" aria-hidden="true">${I[n] || I.point}</svg>`;

  /* ---------- Liens ---------- */
  const tel = (n) => `tel:${n}`;
  const sms = (n, body) => `sms:${n}${body ? (isIOS ? '&' : '?') + 'body=' + enc(body) : ''}`;
  const gmaps = (q) => `https://www.google.com/maps/dir/?api=1&destination=${enc(q)}&travelmode=driving`;
  const amaps = (q) => `https://maps.apple.com/?daddr=${enc(q)}`;
  const heure = (d) => {
    const s = new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'Europe/Paris' }).format(d);
    return lang === 'fr' ? s.replace(':', `${NB}h${NB}`).replace(/^0/, '') : s.toLowerCase().replace(/\s?([ap])\.?m\.?/, `${NB}$1m`);
  };
  const hh = (t) => { const [h, m] = t.split(':'); if (lang === 'fr') return `${+h}${NB}h${m !== '00' ? NB + m : ''}`; const n = +h; return `${n % 12 || 12}${m !== '00' ? ':' + m : ''}${NB}${n < 12 ? 'am' : 'pm'}`; };
  const deux = (n) => String(n).padStart(2, '0');

  /* ---------- Typographie : espaces insécables (heures, distances, téléphones, ponctuation française) ---------- */
  function affiner(racine) {
    if (!racine) return;
    const fr = lang === 'fr';
    const w = document.createTreeWalker(racine, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.parentElement && n.parentElement.closest('script,style,.champ,.qr,[data-brut]')) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    let n;
    while ((n = w.nextNode())) {
      const o = n.nodeValue;
      let s = o
        .replace(/(\d) (?=\d)/g, `$1${NB}`)
        .replace(/(\d) (?=(?:h|km|min|minutes?|heures?|m|j\/7|jours?|nuits?|ans|€|%|°)(?![\p{L}\d]))/gu, `$1${NB}`)
        .replace(/(\d h) (?=\d)/g, `$1${NB}`);
      if (fr) s = s.replace(/ ([?!:;»])/g, `${FINE}$1`).replace(/« /g, `«${FINE}`);
      if (s !== o) n.nodeValue = s;
    }
  }

  /* ---------- Lever et coucher du soleil sur la baie ---------- */
  /* Lever et coucher du soleil (algorithme de position solaire publié par la NOAA, forme simplifiée). */
  function soleil(date, lat, lon) {
    const rad = Math.PI / 180, jour = 86400000, J1970 = 2440588, J2000 = 2451545, e = rad * 23.4397;
    const jul = (d) => d.valueOf() / jour - 0.5 + J1970;
    const deJul = (j) => new Date((j + 0.5 - J1970) * jour);
    const d = jul(date) - J2000, lw = rad * -lon, phi = rad * lat;
    const n = Math.round(d - 0.0009 - lw / (2 * Math.PI));
    const ds = 0.0009 + lw / (2 * Math.PI) + n;
    const M = rad * (357.5291 + 0.98560028 * ds);
    const C = rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
    const L = M + C + rad * 102.9372 + Math.PI;
    const dec = Math.asin(Math.sin(0) * Math.cos(e) + Math.cos(0) * Math.sin(e) * Math.sin(L));
    const Jnoon = J2000 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L);
    const w = Math.acos((Math.sin(rad * -0.833) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec)));
    const a = 0.0009 + (w + lw) / (2 * Math.PI) + n;
    const Jset = J2000 + a + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L);
    return { lever: deJul(Jnoon - (Jset - Jnoon)), coucher: deJul(Jset) };
  }
  if (typeof module !== 'undefined') module.exports = soleil;
  function ligneSoleil() {
    const a = T().accueil, now = new Date(), { lat, lon } = CFG.coordonnees;
    const h = +new Intl.DateTimeFormat('fr-FR', { hour: 'numeric', hour12: false, timeZone: 'Europe/Paris' }).format(now);
    const salut = h < 12 && h >= 5 ? a.salut.matin : (h < 18 && h >= 12 ? a.salut.apresMidi : a.salut.soir);
    const auj = soleil(now, lat, lon);
    let txt;
    if (now < auj.lever) txt = a.soleil.leverMatin.replace('{h}', `<b>${heure(auj.lever)}</b>`);
    else if (now < auj.coucher) txt = a.soleil.coucher.replace('{h}', `<b>${heure(auj.coucher)}</b>`);
    else txt = a.soleil.lever.replace('{h}', `<b>${heure(soleil(new Date(now.getTime() + 864e5), lat, lon).lever)}</b>`);
    return `${ico('soleil')}<span>${esc(salut)}. ${txt}</span>`;
  }

  /* ---------- Toast, copie, vibration ---------- */
  let toastT;
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('visible'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('visible'), 2200); }
  const vibre = () => { try { navigator.vibrate && navigator.vibrate(10); } catch (e) { } };
  function copier(txt, msg) {
    const ok = () => { toast(msg || T().commun.copie); vibre(); };
    const secours = () => { try { const ta = document.createElement('textarea'); ta.value = txt; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); ok(); } catch (e) { toast(txt); } };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, secours); else secours();
  }

  /* ---------- Images des chapitres ---------- */
  const PHOTO = { arrivee: 'h-arrivee', wifi: 'h-wifi', maison: 'h-maison', regles: 'h-regles', autour: 'h-autour', conciergerie: 'h-conciergerie', bruno: 'h-bruno', avis: 'h-avis' };
  const HERO = ['hero-billard', 'hero-bougies', 'hero-guitares'];

  /* ---------- Accueil ---------- */
  function rendreAccueil() {
    const t = T(), a = t.accueil, c = CFG.contact;
    const lettres = 'FUN HOUSE'.split('').map((ch, i) => ch === ' ' ? '<span class="esp"></span>' : `<span class="l" style="transition-delay:${(0.35 + i * 0.06).toFixed(2)}s">${ch}</span>`).join('');
    const itin = CFG.adresse
      ? `<a class="action" href="${gmaps(CFG.adresse)}" target="_blank" rel="noopener"><span class="rond">${ico('car')}</span>${esc(a.rapides.itineraire)}</a>`
      : `<button type="button" class="action" data-action="partager"><span class="rond">${ico('share')}</span>${esc(a.rapides.partager)}</button>`;
    const chapitres = a.sections.map((s, i) => `
      <li class="r" style="transition-delay:${Math.min(i, 5) * 60}ms"><button type="button" class="chapitre" data-page="${s.id}">
        <span class="vignette">${PHOTO[s.id] ? `<img src="img/${PHOTO[s.id]}-t.webp" alt="" loading="lazy" width="240" height="240">` : ico('alert')}</span>
        <span><span class="num">${deux(i + 1)}</span><b>${esc(s.titre)}</b><small>${esc(s.sous)}</small></span>
        ${ico('chevR', 'ico chev')}
      </button></li>`).join('');
    $('#accueil').innerHTML = `
      <section class="vitrine">
        <div class="arche" id="arche">
          ${HERO.map((h, i) => `<div class="arche-img${i === 0 ? ' actif' : ''}"><img src="img/${h}.webp" alt="" width="1080" height="1350" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}></div>`).join('')}
        </div>
        <div class="arche-index" aria-hidden="true">${HERO.map((h, i) => `<i${i === 0 ? ' class="actif"' : ''}></i>`).join('')}</div>
        <p class="sur">${esc(a.sur)}</p>
        <h1 class="mot" aria-label="Fun House">${lettres}</h1>
        <p class="sous">${esc(a.sousTitre)}</p>
        <p class="lieu-mini">${esc(a.lieu)}</p>
        <p class="soleil" id="soleil">${ligneSoleil()}</p>
      </section>

      <a class="sejour r" href="#/arrivee">
        <div><span class="lab">${esc(a.sejour.arrivee)}</span><b>${hh(CFG.arrivee)}</b><small>${esc(a.sejour.aPartir)} ${hh(CFG.arrivee)}</small></div>
        <div class="sep"></div>
        <div><span class="lab">${esc(a.sejour.depart)}</span><b>${hh(CFG.depart)}</b><small>${esc(a.sejour.avant)} ${hh(CFG.depart)}</small></div>
        <div class="suite"><span>${esc(a.sejour.lien)}</span>${ico('chevR')}</div>
      </a>

      <nav class="actions r" aria-label="${esc(a.sejour.titre)}">
        <button type="button" class="action" data-page="wifi"><span class="rond">${ico('wifi')}</span>${esc(a.rapides.wifi)}</button>
        <a class="action" href="${tel(c.telIntl)}"><span class="rond">${ico('phone')}</span>${esc(a.rapides.appeler)}</a>
        <a class="action" href="${sms(c.telIntl, CFG.smsDemande[lang])}"><span class="rond">${ico('sms')}</span>${esc(a.rapides.message)}</a>
        ${itin}
      </nav>

      <section class="sommaire">
        <div class="sommaire-tete r"><span class="eyebrow">${esc(a.sommaire.eyebrow)}</span><h2 class="titre">${esc(a.sommaire.titre)} <em>${esc(a.sommaire.titreIt)}</em></h2></div>
        <ul class="chapitres">${chapitres}</ul>
      </section>

      <footer class="pied r">
        <img class="logo-pied" src="img/logo-cdm.png" alt="CDM Conciergerie, Clés des Merveilles" width="790" height="316" loading="lazy">
        <p class="signature">Pontorson · Normandie</p>
        <p class="reservation">${esc(a.pied.reservation)}</p>
        <div class="liens">
          <a class="lien-or" href="${c.siteLogements}" target="_blank" rel="noopener">${esc(a.pied.autres)}${ico('ext')}</a>
          <button type="button" class="lien-or" data-action="partager">${esc(a.rapides.partager)}${ico('share')}</button>
        </div>
        ${standalone ? '' : `<div class="installer">${ico('install')}<div><b>${esc(a.pied.installer)}</b>${esc(isIOS ? a.pied.installerAide : a.pied.installerAideAndroid)}</div></div>`}
      </footer>`;
    $$('.langues button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    demarrerArche();
  }

  /* ---------- Diaporama de l'arche ---------- */
  let archeT = null, archeI = 0;
  const DUREE = 6500;
  function demarrerArche() {
    clearInterval(archeT); archeI = 0;
    const imgs = $$('#arche .arche-img'), bars = $$('.arche-index i');
    if (!imgs.length) return;
    const zoom = (el) => { el.classList.remove('zoom'); void el.offsetWidth; el.classList.add('zoom'); };
    zoom(imgs[0]);
    if (reduce) return;
    archeT = setInterval(() => {
      if (document.hidden) return;
      const prev = archeI; archeI = (archeI + 1) % imgs.length;
      imgs[prev].classList.remove('actif'); imgs[archeI].classList.add('actif'); zoom(imgs[archeI]);
      bars.forEach((b, i) => { b.classList.remove('actif'); void b.offsetWidth; if (i === archeI) b.classList.add('actif'); });
    }, DUREE);
  }

  /* ---------- Pages ---------- */
  function page(id, titreCourt, corps, photo) {
    return `<section class="page" id="page-${id}" aria-hidden="true" data-id="${id}">
      <header class="page-tete"><button type="button" class="retour" aria-label="${esc(T().commun.retour)}">${ico('chevL')}</button><div class="fil">${esc(titreCourt)}</div></header>
      <div class="page-corps">
        ${photo ? `<figure class="page-photo" style="margin:0"><img src="img/${photo}.webp" alt="" width="1080" height="1320" loading="lazy"></figure>` : ''}
        ${corps(photo)}
      </div></section>`;
  }
  const numero = (id) => { const i = T().accueil.sections.findIndex((s) => s.id === id); return i < 0 ? '' : deux(i + 1); };
  const entete = (id, eb, t1, t2, photo) => `<div class="page-titre${photo ? '' : ' sans-photo'}">
      <p class="num"><span class="n"><span class="vh">${esc(T().commun.chapitre)} </span>${esc(numero(id))}</span><span class="trait" aria-hidden="true"></span><span class="eb">${esc(eb)}</span></p>
      <h1 class="titre">${esc(t1)} <em>${esc(t2)}</em></h1></div>`;
  const liensLieu = (q) => `<div class="liens"><a class="lien-or" href="${gmaps(q)}" target="_blank" rel="noopener">${ico('car')}${esc(T().commun.itineraire)}</a>${isIOS ? `<a class="lien-or" href="${amaps(q)}" target="_blank" rel="noopener">${ico('pin')}${esc(T().commun.plans)}</a>` : ''}</div>`;

  function wifiQR() {
    try {
      if (typeof qrcode !== 'function') return '';
      const w = CFG.wifi, e = (s) => s.replace(/([\\;,:"])/g, '\\$1');
      const q = qrcode(0, 'M'); q.addData(`WIFI:T:${w.securite || 'WPA'};S:${e(w.reseau)};P:${e(w.motDePasse)};;`); q.make();
      return q.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
    } catch (err) { return ''; }
  }

  function rendrePages() {
    const t = T(), c = CFG.contact, k = t.commun, pages = [];

    { const a = t.arrivee, ck = a.checklist;
      pages.push(page('arrivee', `${a.titre} ${a.titreIt}`, (ph) => `${entete('arrivee', a.eyebrow, a.titre, a.titreIt, ph)}
        <div class="page-contenu">
          <div class="heures r">
            <div><span>${esc(a.arrivee)}</span><b>${hh(CFG.arrivee)}</b><small>${esc(a.aPartir)} ${hh(CFG.arrivee)}</small></div>
            <div class="sep"></div>
            <div><span>${esc(a.depart)}</span><b>${hh(CFG.depart)}</b><small>${esc(a.avant)} ${hh(CFG.depart)}</small></div>
          </div>
          <div class="lignes bloc">
            <div class="ligne r"><span class="pastille">${ico('key')}</span><div><h3>${esc(a.cles.titre)}</h3><p>${esc(a.cles.texte)}</p></div></div>
            <div class="ligne r"><span class="pastille">${ico('bed')}</span><div><h3>${esc(a.linge.titre)}</h3><p>${esc(a.linge.texte)}</p></div></div>
            <div class="ligne r"><span class="pastille">${ico('clock')}</span><div><h3>${esc(a.temps.titre)}</h3><p>${esc(a.temps.texte)}</p><a class="lien-or" href="${sms(c.telIntl, CFG.smsTemps[lang])}">${ico('sms')}${esc(a.temps.bouton)}</a></div></div>
          </div>
          <div class="carte r" id="checklist">
            <h2 class="titre">${esc(ck.titre)}</h2><p class="petit doux">${esc(ck.texte)}</p>
            <div class="progression"><i></i></div>
            <ul class="checks">${ck.items.map((it, i) => `<li><button type="button" class="check" role="checkbox" aria-checked="false" data-i="${i}"><span class="case">${ico('check')}</span><span class="lib">${esc(it)}</span></button></li>`).join('')}</ul>
            <div class="fini"><p>${esc(ck.fini)}</p></div>
            <div class="actions-col">
              <a class="btn plein" href="${sms(c.telIntl, CFG.smsDepart[lang])}">${ico('sms')}${esc(ck.prevenir)}</a>
              <button type="button" class="lien-or" style="justify-self:center" data-action="reinit">${esc(ck.reinit)}</button>
            </div>
          </div>
        </div>`, PHOTO.arrivee));
    }

    { const w = t.wifi;
      pages.push(page('wifi', `${w.titre} ${w.titreIt}`, (ph) => `${entete('wifi', w.eyebrow, w.titre, w.titreIt, ph)}
        <div class="page-contenu">
          <div class="carte bloc r">
            <div class="champ"><div><span class="lab">${esc(w.reseau)}</span><div class="val">${esc(CFG.wifi.reseau)}</div></div><button type="button" class="copier" data-copier="${esc(CFG.wifi.reseau)}" aria-label="${esc(k.copier)}">${ico('copy')}</button></div>
            <div class="champ"><div><span class="lab">${esc(w.motDePasse)}</span><div class="val">${esc(CFG.wifi.motDePasse)}</div></div><button type="button" class="copier" data-copier="${esc(CFG.wifi.motDePasse)}" aria-label="${esc(k.copier)}">${ico('copy')}</button></div>
            <button type="button" class="btn plein" style="margin-top:18px" data-copier="${esc(CFG.wifi.motDePasse)}">${ico('copy')}${esc(k.copier)} · ${esc(w.motDePasse)}</button>
          </div>
          <div class="bloc r" style="text-align:center"><span class="eyebrow">${esc(w.qrTitre)}</span><div class="qr" id="qr-wifi"></div><p class="qr-legende petit doux">${esc(w.qrTexte)}</p></div>
          <div class="r"><div class="note">${ico('info')}<span>${esc(w.box)}</span></div><div class="note">${ico('music')}<span>${esc(w.enceinte)}</span></div></div>
        </div>`, PHOTO.wifi));
    }

    { const m = t.maison;
      pages.push(page('maison', `${m.titre} ${m.titreIt}`, (ph) => `${entete('maison', m.eyebrow, m.titre, m.titreIt, ph)}
        <div class="page-contenu">
          <p class="intro r">${esc(m.intro)}</p>
          <div class="chiffres r">${m.chiffres.map((x) => `<div class="chiffre"><b>${esc(x.n)}</b><span>${esc(x.l)}</span></div>`).join('')}</div>
          <div class="bloc">
            <h2 class="titre r">${esc(m.galerieTitre)}</h2>
            <div class="galerie r">${m.photos.map((p, i) => `<figure><button type="button" data-photo="${i}" aria-label="${esc(p.l)}"><img src="img/${p.f}-t.webp" alt="${esc(p.l)}" loading="lazy" width="640" height="800"></button><figcaption><span>${deux(i + 1)}</span>${esc(p.l)}</figcaption></figure>`).join('')}</div>
            <p class="aide">${ico('couleur')}${esc(m.galerieAide)}</p>
          </div>
          <div class="bloc r"><h2 class="titre">${esc(m.equipementsTitre)}</h2><div class="equipements">${m.equipements.map((e) => `<div class="equip">${ico(e.i)}${esc(e.l)}</div>`).join('')}</div></div>
          <div class="bloc r"><h2 class="titre">${esc(m.chambresTitre)}</h2><div class="chambres">${m.chambres.map((ch) => `<div class="chambre"><b>${esc(ch.t)}</b><span>${esc(ch.d)}</span></div>`).join('')}</div></div>
          <div class="lignes bloc r"><div class="ligne"><span class="pastille">${ico('guitare')}</span><div><h3>${esc(m.instruments.titre)}</h3><p>${esc(m.instruments.texte)}</p></div></div></div>
          ${m.modeEmploi && m.modeEmploi.length ? `<div class="bloc r"><h2 class="titre">${esc(m.modeEmploiTitre)}</h2><div class="accordeon">${m.modeEmploi.map((x) => `<details><summary>${esc(x.t)}${ico('plus')}</summary><p>${esc(x.d)}</p></details>`).join('')}</div></div>` : ''}
        </div>`, PHOTO.maison));
    }

    { const r = t.regles;
      pages.push(page('regles', `${r.titre} ${r.titreIt}`, (ph) => `${entete('regles', r.eyebrow, r.titre, r.titreIt, ph)}
        <div class="page-contenu">
          <p class="intro r">${esc(r.intro)}</p>
          <ul class="regles r">${r.liste.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
          <section class="menu r">
            <span class="eyebrow">${esc(r.cmdEyebrow)}</span>
            <h2 class="titre">${esc(r.cmdTitre)} <em>${esc(r.cmdTitreIt)}</em></h2>
            <p class="menu-intro">${esc(r.cmdIntro)}</p>
            <ol>${r.commandements.map((cm, i) => `<li class="r"><span class="n">${i + 1}</span><b>${esc(cm[0])}</b>${cm[1] ? `<small>${esc(cm[1])}</small>` : ''}</li>`).join('')}</ol>
            <p class="sign">${esc(r.signature)}</p>
          </section>
        </div>`, PHOTO.regles));
    }

    { const au = t.autour;
      pages.push(page('autour', `${au.titre} ${au.titreIt}`, (ph) => `${entete('autour', au.eyebrow, au.titre, au.titreIt, ph)}
        <div class="page-contenu">
          <p class="intro r">${esc(au.intro)}</p>
          <div class="onglets" role="tablist">${au.onglets.map((o, i) => `<button type="button" class="onglet" role="tab" aria-selected="${i === 0}" data-onglet="${o.id}">${esc(o.l)}</button>`).join('')}</div>
          ${au.onglets.map((o, i) => `<ul class="lieux" role="tabpanel" data-panneau="${o.id}" ${i ? 'hidden' : ''}>${o.items.map((it) => `<li class="lieu"><div><b>${esc(it.t)}</b><div class="s">${esc(it.s)}</div></div><div class="dist"><b>${esc(it.km)}</b><small>${esc(it.min)} ${esc(k.min)}</small></div>${liensLieu(it.q)}</li>`).join('')}</ul>`).join('')}
          <p class="petit doux" style="margin-top:18px">${esc(au.note)}</p>
        </div>`, PHOTO.autour));
    }

    { const s = t.conciergerie;
      pages.push(page('conciergerie', `${s.titre} ${s.titreIt}`, (ph) => `${entete('conciergerie', s.eyebrow, s.titre, s.titreIt, ph)}
        <div class="page-contenu">
          <p class="intro r">${esc(s.intro)}</p>
          <div class="carte contact bloc r">
            <span class="eyebrow">${esc(s.contactTitre)}</span>
            <div class="nom">${esc(c.prenom)}</div><p class="struct">${esc(c.structure)}</p><p class="tel">${esc(c.telAffiche)}</p>
            <p class="dispo">${esc(s.dispo)}</p>
            <div class="boutons"><a class="btn" href="${tel(c.telIntl)}">${ico('phone')}${esc(k.appeler)}</a><a class="btn fin" href="${sms(c.telIntl, CFG.smsDemande[lang])}">${ico('sms')}${esc(k.sms)}</a></div>
          </div>
          <div class="bloc">${s.services.map((sv) => `<div class="service r"><span class="pastille">${ico(sv.i)}</span><div><b>${esc(sv.t)}</b><p>${esc(sv.d)}</p><a class="lien-or" href="${sms(c.telIntl, CFG.smsDemande[lang] + sv.t)}">${esc(sv.cta)}${ico('chevR')}</a></div></div>`).join('')}</div>
        </div>`, PHOTO.conciergerie));
    }

    { const b = t.bruno;
      pages.push(page('bruno', `${b.titre} ${b.titreIt}`, (ph) => `${entete('bruno', b.eyebrow, b.titre, b.titreIt, ph)}
        <div class="page-contenu">
          <article class="lettre r">
            <p class="salut">${esc(b.salut)}</p>
            ${b.paragraphes.map((p) => `<p>${esc(p)}</p>`).join('')}
          </article>
          <div class="reperes r">${b.reperes.map((x) => `<span>${esc(x)}</span>`).join('')}</div>
          <p class="sign-main r">${esc(b.signature)}</p>
        </div>`, PHOTO.bruno));
    }

    { const u = t.urgences;
      pages.push(page('urgences', `${u.titre} ${u.titreIt}`, (ph) => `${entete('urgences', u.eyebrow, u.titre, u.titreIt, ph)}
        <div class="page-contenu">
          <p class="intro">${esc(u.intro)}</p>
          <div>${u.liste.map((x) => `<a class="urgence${x.prio ? ' prio' : ''}" href="${x.sms ? 'sms:' + x.n : 'tel:' + x.n}"><b>${esc(x.n)}</b><div><span>${esc(x.t)}</span>${x.s ? `<small>${esc(x.s)}</small>` : ''}</div>${ico(x.sms ? 'sms' : 'phone')}</a>`).join('')}
            <a class="urgence" href="${tel(c.telIntl)}"><b style="font-size:24px">${esc(c.prenom)}</b><div><span>${esc(c.telAffiche)}</span><small>${esc(u.alicia)}</small></div>${ico('phone')}</a>
          </div>
        </div>`, null));
    }

    { const v = t.avis;
      pages.push(page('avis', `${v.titre} ${v.titreIt}`, (ph) => `${entete('avis', v.eyebrow, v.titre, v.titreIt, ph)}
        <div class="page-contenu avis">
          <div class="etoiles r">${ico('star')}${ico('star')}${ico('star')}${ico('star')}${ico('star')}</div>
          <p class="intro r">${esc(v.texte)}</p>
          <a class="btn plein r" href="${c.avisGoogle}" target="_blank" rel="noopener">${ico('star')}${esc(v.google)}</a>
          <p class="petit doux" style="margin-top:14px">${esc(v.plateforme)}</p>
          <p class="bientot r">${esc(v.bientot)}</p>
          <img src="img/logo-cdm.png" alt="CDM Conciergerie, Clés des Merveilles" width="790" height="316" loading="lazy" style="width:150px;height:auto;margin:6px auto 10px">
          <p class="petit"><a class="lien-or" href="${c.siteLogements}" target="_blank" rel="noopener">${esc(v.autres)}${ico('ext')}</a></p>
          <p class="petit doux">${esc(v.reservation)}<br>${esc(c.instagramHandle)}</p>
        </div>`, PHOTO.avis));
    }

    $('#pages').innerHTML = pages.join('');
    restaurerChecklist();
    $$('.page-corps').forEach((pc) => pc.addEventListener('scroll', surDefilement, { passive: true }));
  }

  /* ---------- Défilement des pages : parallaxe de la photo, barre compacte ---------- */
  let tic = false;
  function surDefilement(e) {
    const pc = e.currentTarget;
    if (tic) return; tic = true;
    requestAnimationFrame(() => {
      tic = false;
      const y = pc.scrollTop, pg = pc.closest('.page'), img = $('.page-photo img', pc), tete = $('.page-tete', pg);
      if (img && !reduce) img.style.transform = `translate3d(0, ${Math.min(y, 600) * 0.32}px, 0)`;
      const seuil = img ? $('.page-photo', pc).offsetHeight - 90 : 30;
      tete.classList.toggle('compact', y > seuil);
    });
  }

  /* ---------- Navigation ---------- */
  let courante = null;
  function route() {
    const m = location.hash.match(/^#\/([a-z]+)/);
    const id = m ? m[1] : null, cible = id ? $(`#page-${id}`) : null;
    if (courante && courante !== cible) { courante.classList.remove('ouverte'); courante.setAttribute('aria-hidden', 'true'); courante = null; }
    if (cible) {
      cible.classList.add('ouverte'); cible.setAttribute('aria-hidden', 'false'); courante = cible;
      document.body.classList.add('page-ouverte');
      $$('.r', cible).forEach((el) => io ? io.observe(el) : el.classList.add('vu'));
      if (id === 'wifi') { const q = $('#qr-wifi'); if (q && !q.firstChild) q.innerHTML = wifiQR(); }
    } else document.body.classList.remove('page-ouverte');
    if (lightbox.classList.contains('ouverte')) fermerLightbox();
  }
  const ouvrir = (id) => { location.hash = '#/' + id; };
  const fermer = () => { if (history.length > 1 && location.hash) history.back(); else { location.hash = ''; route(); } };

  /* ---------- Checklist ---------- */
  function restaurerChecklist() {
    const etat = store.get('fh-check', []);
    $$('#checklist .check').forEach((b) => b.setAttribute('aria-checked', String(!!etat[+b.dataset.i])));
    majChecklist(false);
  }
  function majChecklist(feter) {
    const bs = $$('#checklist .check'); if (!bs.length) return;
    const faits = bs.filter((b) => b.getAttribute('aria-checked') === 'true').length;
    $('#checklist .progression i').style.width = (faits / bs.length * 100) + '%';
    const tout = faits === bs.length;
    $('#checklist .fini').classList.toggle('visible', tout);
    if (tout && feter) paillettes();
  }
  function paillettes() {
    if (reduce) return;
    const c = document.createElement('div'); c.className = 'paillettes';
    const teintes = ['#AF8450', '#D9BE93', '#E9DCC4', '#C9A36F'];
    for (let i = 0; i < 64; i++) { const s = document.createElement('i'); s.style.cssText = `left:${Math.random() * 100}%;background:${teintes[i % 4]};animation-duration:${1.8 + Math.random() * 1.6}s;animation-delay:${Math.random() * .5}s;transform:rotate(${Math.random() * 360}deg)`; c.appendChild(s); }
    document.body.appendChild(c); setTimeout(() => c.remove(), 4000); vibre();
  }

  /* ---------- Lightbox : la couleur revient ---------- */
  const lightbox = $('#lightbox');
  function ouvrirLightbox(i) {
    const photos = T().maison.photos;
    lightbox.innerHTML = `<button type="button" class="fermer" aria-label="${esc(T().commun.fermer)}">${ico('close')}</button>
      <div class="piste">${photos.map((p, k) => `<figure data-k="${k}"><div class="cadre"><img src="img/${p.f}-n.webp" alt="${esc(p.l)}" loading="${Math.abs(k - i) < 2 ? 'eager' : 'lazy'}"><img class="c" src="img/${p.f}-c.webp" alt="" loading="${Math.abs(k - i) < 2 ? 'eager' : 'lazy'}"></div><figcaption><span>${deux(k + 1)} / ${deux(photos.length)}</span>${esc(p.l)}</figcaption></figure>`).join('')}</div>`;
    lightbox.classList.add('ouverte'); document.body.classList.add('lb-ouverte');
    const piste = $('.piste', lightbox);
    requestAnimationFrame(() => { piste.scrollLeft = piste.clientWidth * i; colorer(); });
    piste.addEventListener('scroll', () => { clearTimeout(piste._t); piste._t = setTimeout(colorer, 120); }, { passive: true });
    $('.fermer', lightbox).addEventListener('click', fermerLightbox);
    function colorer() {
      const k = Math.round(piste.scrollLeft / piste.clientWidth), fig = $(`figure[data-k="${k}"] .cadre`, lightbox);
      if (!fig || fig.classList.contains('couleur')) return;
      const c = $('.c', fig), go = () => setTimeout(() => fig.classList.add('couleur'), 350);
      if (c.complete) go(); else c.addEventListener('load', go, { once: true });
    }
  }
  function fermerLightbox() { lightbox.classList.remove('ouverte'); lightbox.innerHTML = ''; document.body.classList.remove('lb-ouverte'); }

  /* ---------- Partage ---------- */
  function partager() {
    const d = { title: T().meta.titre, text: T().commun.partagerTexte, url: PAGE_URL };
    if (navigator.share) navigator.share(d).catch(() => { }); else copier(PAGE_URL, T().commun.lienCopie);
  }

  /* ---------- Révélation au défilement ---------- */
  let io = null;
  function observer() {
    if (io) io.disconnect();
    if (!('IntersectionObserver' in window) || reduce) { $$('.r').forEach((e) => e.classList.add('vu')); io = null; return; }
    io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('vu'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -6% 0px', threshold: .04 });
    $$('#accueil .r').forEach((e) => io.observe(e));
    setTimeout(() => $$('#accueil .r:not(.vu)').forEach((e) => { if (e.getBoundingClientRect().top < innerHeight) e.classList.add('vu'); }), 2600);
  }

  /* ---------- Rendu complet ---------- */
  function rendre() {
    document.documentElement.lang = lang;
    document.title = T().meta.titre;
    const md = $('meta[name="description"]'); if (md) md.content = T().meta.description;
    rendreAccueil(); rendrePages();
    affiner($('#accueil')); affiner($('#pages'));
    observer(); route();
  }

  /* ---------- Événements ---------- */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-page],[data-action],[data-copier],[data-photo],[data-onglet],[data-lang],.retour,.check');
    if (!a) return;
    if (a.dataset.page) { e.preventDefault(); ouvrir(a.dataset.page); return; }
    if (a.dataset.lang) { if (a.dataset.lang !== lang) { lang = a.dataset.lang; store.set('fh-lang', lang); rendre(); document.body.classList.add('revele'); } return; }
    if (a.classList.contains('retour')) { fermer(); return; }
    if (a.dataset.copier != null) { copier(a.dataset.copier); return; }
    if (a.dataset.photo != null) { ouvrirLightbox(+a.dataset.photo); return; }
    if (a.dataset.onglet) {
      const p = a.closest('.page-contenu');
      $$('.onglet', p).forEach((o) => o.setAttribute('aria-selected', String(o === a)));
      $$('[data-panneau]', p).forEach((pn) => { pn.hidden = pn.dataset.panneau !== a.dataset.onglet; });
      return;
    }
    if (a.classList.contains('check')) {
      const v = a.getAttribute('aria-checked') !== 'true'; a.setAttribute('aria-checked', String(v)); vibre();
      store.set('fh-check', $$('#checklist .check').map((b) => b.getAttribute('aria-checked') === 'true')); majChecklist(v); return;
    }
    if (a.dataset.action === 'partager') { partager(); return; }
    if (a.dataset.action === 'reinit') { store.set('fh-check', []); restaurerChecklist(); return; }
  });
  window.addEventListener('hashchange', route);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { if (lightbox.classList.contains('ouverte')) fermerLightbox(); else if (courante) fermer(); } });
  setInterval(() => { const s = $('#soleil'); if (s) s.innerHTML = ligneSoleil(); }, 60000);

  /* ---------- Ouverture : la clé trace, tourne, les portes s'ouvrent ---------- */
  const ouv = $('#ouverture');
  let fini = false;
  function reveler() { document.body.classList.add('revele'); }
  function finirOuverture() {
    if (fini) return; fini = true;
    try { sessionStorage.setItem('fh-ouv2', '1'); } catch (e) { }
    ouv.classList.add('ouvre'); reveler();
    setTimeout(() => ouv.remove(), 1200);
  }
  function ouverture() {
    let vu = false; try { vu = sessionStorage.getItem('fh-ouv2') === '1'; } catch (e) { }
    if (vu || reduce || location.hash || !window.FH_CLE) { ouv.remove(); fini = true; requestAnimationFrame(reveler); return; }
    $('#ouv-cle-path').setAttribute('d', window.FH_CLE);
    requestAnimationFrame(() => ouv.classList.add('trace'));
    setTimeout(() => ouv.classList.add('tourne'), 1500);
    setTimeout(finirOuverture, 2350);
    ouv.addEventListener('click', finirOuverture);
    setTimeout(() => { if (!fini) finirOuverture(); }, 5000);
  }

  /* ---------- Démarrage ---------- */
  rendre();
  ouverture();
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => { }); });
  }
})();
