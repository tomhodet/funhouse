/* ============================================================
   LES LODGES DE LA BAIE · LIVRET D'ACCUEIL · CONCIERGERIE CLÉS DES MERVEILLES
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
  let lang = store.get('lb-lang', null);
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

  I.cafe = '<path d="M5 9h11v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5z"/><path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M8 3.5c0 1.2 1 1.6 1 2.8M11.5 3.5c0 1.2 1 1.6 1 2.8"/>';
  I.frigo = '<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M6 10h12M9 6v2M9 13v3"/>';
  I.clim = '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/><path d="M10 4.5 12 6l2-1.5M10 19.5 12 18l2 1.5"/>';
  I.bureau = '<rect x="3" y="5" width="18" height="11" rx="1.5"/><path d="M8 20h8M12 16v4"/>';
  I.tv = '<rect x="3" y="6" width="18" height="12" rx="1.5"/><path d="m9 2.5 3 3.5 3-3.5M8 21h8"/>';
  I.pingpong = '<circle cx="9.5" cy="9.5" r="5.5"/><path d="m13.5 13.5 5.5 5.5"/><circle cx="18" cy="6" r="1.8"/>';
  I.transat = '<path d="M5 18 15 7l3 1-6 10"/><path d="M4 18h16M8 18l-1 3M17 18l1 3"/>';
  I.jeux = '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="15" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/><circle cx="9" cy="15" r="1" fill="currentColor"/>';
  I.borne = '<rect x="5" y="3" width="9" height="18" rx="1.5"/><path d="M5 9h9M14 8h2a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0v-7l-2-2"/><path d="m10 11-2 3h3l-2 3"/>';
  I.menage = '<path d="M14 3 9.5 11"/><path d="M6 11h7.5l1.5 10H4.5z"/><path d="M8.5 15v3M11.5 15v3"/><path d="M17.5 5.5l1 1M19.5 3.5v1.5M20.5 7.5H19"/>';
  I.volet = '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 9h18M3 13h18M3 17h18"/>';
  I.thermo = '<path d="M14 14.5V5a2 2 0 0 0-4 0v9.5a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>';
  I.enfant = '<circle cx="12" cy="5" r="2.2"/><path d="M12 8v7M8 10.5l4-1 4 1M9.5 21l2.5-6 2.5 6"/>';
  I.piscine = '<path d="M8 15V6a2.5 2.5 0 0 1 5 0M15 15V6a2.5 2.5 0 0 1 5 0M8 9h7M8 12.5h7"/><path d="M2 18.5c1.7-1.3 3.3-1.3 5 0s3.3 1.3 5 0 3.3-1.3 5 0 3.3 1.3 5 0"/>';
  I.agrandir = '<path d="M14 4h6v6"/><path d="M20 4l-6.5 6.5"/><path d="M10 20H4v-6"/><path d="M4 20l6.5-6.5"/>';
  I.couleur = '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17" fill="currentColor" stroke="none" opacity=".35"/>';
  /* Ciel */
  I.cielSoleil = '<circle cx="12" cy="12" r="4.2"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>';
  I.cielLune = '<path d="M19.5 14.2A7.5 7.5 0 0 1 9.8 4.5a7.5 7.5 0 1 0 9.7 9.7z"/>';
  I.cielVoile = '<path d="M7 10.5a4 4 0 1 1 7.6-1.7A3.3 3.3 0 0 1 16.5 15H7.5a2.3 2.3 0 0 1-.5-4.5z"/><path d="M4 19h12M8 22h6" opacity=".6"/>';
  I.cielNuage = '<path d="M7 18a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17 9.5a3.8 3.8 0 0 1 .5 7.5H7z"/>';
  I.cielNuageSoleil = '<path d="M9 17a3.5 3.5 0 0 1-.4-7A4.6 4.6 0 0 1 17.5 10a3.2 3.2 0 0 1 .3 6.4L9 17z"/><path d="M6.5 8.5A3.5 3.5 0 0 1 12.8 6M5 3v1.5M2 6.5h1.5M3.4 3.4l1 1"/>';
  I.cielBrume = '<path d="M4 9h16M3 13h18M5 17h14M8 21h8" opacity=".9"/>';
  I.cielPluie = '<path d="M7 15a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17 6.5a3.8 3.8 0 0 1 .5 7.5H7z"/><path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3"/>';
  I.cielNeige = '<path d="M7 15a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17 6.5a3.8 3.8 0 0 1 .5 7.5H7z"/><path d="M8 19h.01M12 21h.01M16 19h.01M10 22h.01M14 23h.01" stroke-width="2.2"/>';
  I.cielOrage = '<path d="M7 15a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17 6.5a3.8 3.8 0 0 1 .5 7.5H7z"/><path d="M13 15l-2.5 4h3L11 23"/>';
  I.vent = '<path d="M3 8h10a2.5 2.5 0 1 0-2.5-2.5M3 12h14a3 3 0 1 1-3 3M3 16h8a2 2 0 1 1-2 2"/>';
  I.maree = '<path d="M2 16c2.5-2.4 5-2.4 7.5 0s5 2.4 7.5 0 3.3-2 5 0"/><path d="M2 20.5c2.5-2.4 5-2.4 7.5 0s5 2.4 7.5 0 3.3-2 5 0" opacity=".55"/><path d="M14.6 3.6a4.6 4.6 0 1 0 4.6 6.7 3.7 3.7 0 0 1-4.6-6.7z"/>';
  I.coucher = '<path d="M17 16a5 5 0 0 0-10 0"/><path d="M3 16h18M12 7V4M5.6 9.6 4.2 8.2M18.4 9.6l1.4-1.4"/><path d="M8 20h8"/>';
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

  /* ---------- L'étang et la baie : illustration vivante de l'arche (soleil réel, lune réelle) ---------- */
  const MONT = 'M96 500L96 452L104 446L112 446L118 440L132 440L136 446L156 444L164 426L196 418L214 412L226 396L238 372L252 344L262 312L272 286L290 272L320 262L338 250L382 244L384 214L398 206L444 200L452 186L460 172L470 128L475 84L478 36L481 84L486 128L494 168L500 176L522 178L542 190L556 202L560 214L604 220L640 224L652 234L656 296L680 314L716 334L752 356L786 372L802 392L832 404L852 426L884 440L904 466L904 500Z';
  const FENETRES = [[420, 226], [452, 222], [512, 214], [596, 238], [612, 262], [350, 272], [300, 304], [560, 300], [700, 350], [250, 362], [760, 384], [404, 330], [480, 298], [640, 332], [206, 424], [818, 418], [520, 382], [330, 404], [604, 412], [452, 432]];
  function posSoleil(date, lat, lon) {
    const rad = Math.PI / 180, d = date.valueOf() / 864e5 - 0.5 + 2440588 - 2451545;
    const M = rad * (357.5291 + 0.98560028 * d);
    const L = M + rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M)) + rad * 102.9372 + Math.PI;
    const e = rad * 23.4397, dec = Math.asin(Math.sin(e) * Math.sin(L)), ra = Math.atan2(Math.sin(L) * Math.cos(e), Math.cos(L));
    const H = rad * (280.16 + 360.9856235 * d) - rad * -lon - ra, phi = rad * lat;
    return Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H)) / rad;
  }
  /* Hauteur et angle horaire de la lune (formules simplifiées de SunCalc, précision de l'ordre du degré) */
  function posLune(date, lat, lon) {
    const rad = Math.PI / 180, d = date.valueOf() / 864e5 - 0.5 + 2440588 - 2451545;
    const L = rad * (218.316 + 13.176396 * d), M = rad * (134.963 + 13.064993 * d), F = rad * (93.272 + 13.229350 * d);
    const l = L + rad * 6.289 * Math.sin(M), b = rad * 5.128 * Math.sin(F), e = rad * 23.4397;
    const ra = Math.atan2(Math.sin(l) * Math.cos(e) - Math.tan(b) * Math.sin(e), Math.cos(l));
    const dec = Math.asin(Math.sin(b) * Math.cos(e) + Math.cos(b) * Math.sin(e) * Math.sin(l));
    let H = rad * (280.16 + 360.9856235 * d) - rad * -lon - ra; H = Math.atan2(Math.sin(H), Math.cos(H));
    const phi = rad * lat;
    return { alt: Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H)) / rad, H };
  }
  /* 0 = nouvelle lune, 0,5 = pleine lune (référence : nouvelle lune du 6 janvier 2000, 18 h 14 UTC) */
  function phaseLune(date) { const p = ((date.valueOf() / 864e5 - 10962.7597) / 29.530588853) % 1; return p < 0 ? p + 1 : p; }
  function lune(cx, cy, r, p) {
    const croissant = p < 0.5, k = Math.cos(2 * Math.PI * p), rx = Math.abs(k) * r;
    const s1 = croissant ? 1 : 0, s2 = croissant ? (k > 0 ? 0 : 1) : (k > 0 ? 1 : 0);
    return `M${cx} ${cy - r}A${r} ${r} 0 0 ${s1} ${cx} ${cy + r}A${rx.toFixed(2)} ${r} 0 0 ${s2} ${cx} ${cy - r}Z`;
  }
  function etatCiel(now, meteo) {
    const { lat, lon } = CFG.coordonnees, s = soleil(now, lat, lon), alt = posSoleil(now, lat, lon);
    const jour = now >= s.lever && now <= s.coucher;
    const t = jour ? (now - s.lever) / (s.coucher - s.lever) : 0;
    const code = meteo && typeof meteo.code === 'number' ? meteo.code : null;
    const ml = posLune(now, lat, lon);
    return { jour, t, alt, dore: jour && alt < 9, crepuscule: !jour && alt > -9, soir: now > s.coucher, code, phase: phaseLune(now), lune: ml };
  }
  let sceneN = 0;
  /* Les Lodges de la Baie : l'étang au premier plan, le domaine à gauche, le Mont sur l'horizon.
     Soleil à sa vraie hauteur (lever à droite, à l'est ; coucher à gauche, à l'ouest), lune à sa vraie phase. */
  const HZ = 262;
  const astre = (e) => ({ x: 348 - e.t * 296, y: HZ - Math.max(e.alt, -4) / 62 * 210 });
  const ala = (s) => { let x = Math.sin(s) * 10000; return x - Math.floor(x); };
  function roseaux(x0, x1, n, graine) {
    let tiges = '', massettes = '';
    for (let i = 0; i < n; i++) {
      const x = x0 + (x1 - x0) * (i + ala(graine + i) * 0.8) / n, h = 70 + ala(graine * 3 + i) * 70, dx = (ala(graine * 7 + i) - 0.5) * 18;
      const top = 500 - h, w = (1 + ala(graine * 5 + i) * 0.7).toFixed(2);
      tiges += `<path d="M${x.toFixed(1)} 502Q${(x + dx * 0.3).toFixed(1)} ${(500 - h * 0.5).toFixed(1)} ${(x + dx).toFixed(1)} ${top.toFixed(1)}" stroke-width="${w}"/>`;
      if (i % 3 === 0) massettes += `<rect x="${(x + dx - 1.6).toFixed(1)}" y="${(top - 2).toFixed(1)}" width="3.2" height="11" rx="1.6"/>`;
    }
    return `<g class="roseaux">${tiges}<g class="massettes">${massettes}</g></g>`;
  }
  function bocage(x0, x1, graine, hmin, hmax, base) {
    let d = `M${x0} ${base + 6}L${x0} ${base}`, x = x0, i = 0;
    while (x < x1) {
      const w = 11 + ala(graine + i) * 15, h = hmin + ala(graine * 2 + i) * (hmax - hmin), k = 0.55 + ala(graine * 3 + i) * 0.5;
      d += `C${x.toFixed(1)} ${(base - h * 1.25).toFixed(1)} ${(x + w).toFixed(1)} ${(base - h * 1.25 * k).toFixed(1)} ${(x + w).toFixed(1)} ${base}`;
      x += w * 0.72; i++;
    }
    return `${d}L${x1 + 12} ${base}L${x1 + 12} ${base + 6}Z`;
  }
  const arbre = (x, y, r) => `<path d="M${x - 0.9} ${y}h1.8v${r * 1.5}h-1.8z"/><circle cx="${x - r * 0.45}" cy="${y - r * 0.1}" r="${r * 0.72}"/><circle cx="${x + r * 0.5}" cy="${y}" r="${r * 0.68}"/><circle cx="${x}" cy="${y - r * 0.6}" r="${r * 0.8}"/>`;
  function scene(e) {
    const W = 400, c = e.code, u = 'b' + (++sceneN);
    const pluie = c != null && ((c >= 51 && c <= 67) || (c >= 80 && c <= 82) || c >= 95);
    const neige = c != null && ((c >= 71 && c <= 77) || c === 85 || c === 86);
    const brume = c === 45 || c === 48, couvert = c === 3 || pluie || neige, nuages = c === 2 || couvert;
    const nuit = !e.jour, dusk = nuit && e.crepuscule && !couvert && !brume, dore = e.dore && !couvert && !brume;
    const ciel = dusk ? ['#DDD6CC', '#E6D7C2', '#E9C79B'] : nuit ? ['#D3CEC5', '#DDD7CC', '#E8E1D4'] : dore ? ['#FAF3E6', '#F4DFBC', '#EBC48C'] : couvert ? ['#F0EDE6', '#ECE8E0', '#E7E1D5'] : ['#FBF9F4', '#F6F0E4', '#EFE4D0'];
    const pre = nuit ? ['#CFC8BA', '#C5BDAE'] : dore ? ['#EAD8B6', '#DCC9A6'] : ['#E6E0CF', '#DAD3BF'];
    const eau = nuit ? ['#D3CBBD', '#DAD3C6', '#CEC6B7'] : dore ? ['#EBCF9F', '#EEDDBE', '#E5D2B0'] : ['#E4DCCB', '#EDE7DA', '#E1D9C8'];
    const pierre = nuit ? ['#2F4350', '#22343F'] : dore ? ['#928B82', '#5C5F66'] : ['#8F9192', '#56616B'];
    const haie = nuit ? '#3B4A50' : dore ? '#9C987F' : '#A2A897';
    const { x: sx, y: sy } = astre(e), sr = dore ? 21 : 17;
    const soleilVisible = e.jour && !couvert && !brume;
    const mx = 300, place = `translate(${mx} ${HZ + 2}) scale(0.118) translate(-500 -500)`;
    const mod = `${nuit ? ' nuit' : ''}${dore ? ' dore' : ''}`;
    const svg = (cls, inner) => `<svg class="baie ${cls}${mod}" viewBox="0 0 ${W} 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${inner}</svg>`;
    const luneVisible = nuit && !couvert && !brume && e.lune && e.lune.alt > 0 && e.phase > 0.04 && e.phase < 0.96;
    const lx = luneVisible ? Math.round(Math.min(360, Math.max(40, 250 - e.lune.H / Math.PI * 300))) : 0;
    const ly = luneVisible ? Math.round(Math.max(52, HZ - 30 - e.lune.alt / 60 * 200)) : 0;
    const etoiles = nuit ? [[52, 60], [96, 112], [138, 44], [214, 78], [262, 40], [318, 140], [352, 84], [70, 160], [236, 150], [182, 114], [120, 190], [292, 196], [158, 84], [372, 168]]
      .slice(0, dusk ? 6 : 14).map(([x, y], i) => `<circle class="etoile" cx="${x}" cy="${y}" r="${i % 3 ? 0.9 : 1.4}" style="animation-delay:${((i * 0.37) % 3).toFixed(2)}s"/>`).join('') : '';
    const NUEES = [[34, 86, 96, 138], [232, 126, 70, 104], [96, 170, 60, 92], [262, 58, 84, 120], [20, 206, 56, 84]];
    const lesNuages = nuages ? NUEES.slice(0, couvert ? 5 : 2).map(([x, y, a, b], i) =>
      `<g class="nuage n${i % 3}"><line x1="${x}" x2="${x + a}" y1="${y}" y2="${y}"/><line x1="${x + 22}" x2="${x + b}" y1="${y + 8}" y2="${y + 8}"/></g>`).join('') : '';
    const vol = [[0, 0, 1], [14, -6, .85], [27, 3, 1.1], [41, -9, .8], [53, -1, .95], [67, -7, .75], [80, 2, .9]]
      .map(([x, y, s]) => `<path d="M${x - 4 * s} ${y}q${2 * s} ${-2.6 * s} ${4 * s} 0q${2 * s} ${-2.6 * s} ${4 * s} 0"/>`).join('');
    const oiseaux = (dore || dusk) && !pluie && !neige ? `<g class="vol">${vol}</g>` : (e.jour && !pluie && !neige && !brume ? `<g class="mouettes"><path d="M0 0q4.5-4.5 9 0q4.5-4.5 9 0"/><path d="M26 10q3.5-3.5 7 0q3.5-3.5 7 0"/></g>` : '');
    const SHORE = 'M-4 378C70 366 150 374 214 369S344 360 404 373';
    const eclats = (soleilVisible && e.alt < 24) ? Array.from({ length: 9 }, (_, i) => {
      const y = 384 + i * i * 1.3 + i * 4, w = 24 - i * 1.6 + (i % 2) * 6;
      return `<line class="eclat" x1="${(sx - w / 2).toFixed(1)}" x2="${(sx + w / 2).toFixed(1)}" y1="${y.toFixed(1)}" y2="${y.toFixed(1)}" style="animation-delay:${(i * 0.23).toFixed(2)}s"/>`;
    }).join('') : '';
    const fenetres = (fill) => [[29, 312], [41, 312], [62, 312], [73, 312], [29, 325], [73, 325], [92, 324], [116, 324], [140, 324], [164, 324]]
      .map(([x, y]) => `<rect x="${x}" y="${y}" width="5" height="7" fill="${fill}"/>`).join('');

    const l1 = svg('l-ciel', `<defs>
        <linearGradient id="${u}Ciel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${ciel[0]}"/><stop offset=".6" stop-color="${ciel[1]}"/><stop offset="1" stop-color="${ciel[2]}"/></linearGradient>
        <radialGradient id="${u}Couchant" cx=".5" cy="1" r=".9"><stop offset="0" stop-color="#E9B877" stop-opacity=".55"/><stop offset="1" stop-color="#E9B877" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="${W}" height="${HZ + 8}" fill="url(#${u}Ciel)"/>
      ${dore ? `<ellipse cx="${sx.toFixed(1)}" cy="${HZ}" rx="260" ry="110" fill="url(#${u}Couchant)"/>` : ''}
      ${dusk ? `<ellipse cx="${e.soir ? 70 : 330}" cy="${HZ}" rx="240" ry="84" fill="url(#${u}Couchant)" opacity=".8"/>` : ''}`);

    const l2 = svg('l-astres', `<defs>
        <radialGradient id="${u}Halo"><stop offset="0" stop-color="#E9C98F" stop-opacity=".75"/><stop offset=".45" stop-color="#E9C98F" stop-opacity=".22"/><stop offset="1" stop-color="#E9C98F" stop-opacity="0"/></radialGradient>
        <radialGradient id="${u}Disque" cx=".38" cy=".35"><stop offset="0" stop-color="#F3DDAE"/><stop offset="1" stop-color="${dore ? '#C08A47' : '#CFA468'}"/></radialGradient>
        <radialGradient id="${u}LueurA"><stop offset="0" stop-color="#E7C487" stop-opacity=".75"/><stop offset="1" stop-color="#E7C487" stop-opacity="0"/></radialGradient>
        <clipPath id="${u}AuDessus"><rect x="0" y="0" width="${W}" height="${HZ}"/></clipPath>
      </defs>
      ${etoiles}
      ${luneVisible ? `<g class="lune-g"><circle cx="${lx}" cy="${ly}" r="36" fill="url(#${u}LueurA)" opacity=".5"/><circle cx="${lx}" cy="${ly}" r="12" fill="#D9BE93" opacity=".18"/><path class="lune" d="${lune(lx, ly, 12, e.phase)}"/></g>` : ''}
      ${soleilVisible ? `<g class="astre" clip-path="url(#${u}AuDessus)"><circle class="halo" cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${(sr * 3.6).toFixed(1)}" fill="url(#${u}Halo)"/><circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${sr}" fill="url(#${u}Disque)"/></g>` : ''}
      ${(e.jour && couvert && !brume) ? `<g class="astre" clip-path="url(#${u}AuDessus)"><circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${(sr * 2.6).toFixed(1)}" fill="url(#${u}Halo)" opacity=".4"/></g>` : ''}
      <g class="nuages">${lesNuages}</g>
      ${oiseaux}`);

    const l3 = svg('l-terre', `<defs>
        <linearGradient id="${u}Pre" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${pre[0]}"/><stop offset="1" stop-color="${pre[1]}"/></linearGradient>
        <linearGradient id="${u}Eau" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${eau[0]}"/><stop offset=".45" stop-color="${eau[1]}"/><stop offset="1" stop-color="${eau[2]}"/></linearGradient>
        <linearGradient id="${u}Mont" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${nuit ? '#2C4150' : '#7D8D98'}"/><stop offset="1" stop-color="${nuit ? '#364B59' : '#9AA7AE'}"/></linearGradient>
        <radialGradient id="${u}LueurB"><stop offset="0" stop-color="#E7C487" stop-opacity=".75"/><stop offset="1" stop-color="#E7C487" stop-opacity="0"/></radialGradient>
        <linearGradient id="${u}Bande" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FBF9F4" stop-opacity="0"/><stop offset=".5" stop-color="#FBF9F4" stop-opacity=".7"/><stop offset="1" stop-color="#FBF9F4" stop-opacity="0"/></linearGradient>
      </defs>
      <rect x="0" y="${HZ - 3}" width="${W}" height="10" fill="${nuit ? '#D9D2C5' : dore ? '#EFD9B5' : '#EEE8DC'}"/>
      ${nuit ? `<circle cx="${mx}" cy="${HZ - 16}" r="54" fill="url(#${u}LueurB)" opacity=".6"/>` : ''}
      <g class="mont-g"><g style="opacity:${brume ? 0.5 : 1}">
        <path d="${MONT}" fill="url(#${u}Mont)" transform="${place}"/>
        ${nuit ? `<path d="${MONT}" fill="none" stroke="#E2C48F" stroke-width="5" stroke-opacity=".7" stroke-linejoin="round" transform="${place}"/>` : ''}
      </g></g>
      <rect x="0" y="${HZ - 12}" width="${W}" height="18" fill="url(#${u}Bande)" opacity="${nuit ? 0.3 : 0.75}"/>
      <path d="${bocage(-6, 240, 11, 6, 11, HZ + 2)}" fill="${haie}" opacity=".45"/>
      <path d="${bocage(-6, 228, 3, 8, 16, HZ + 5)}" fill="${haie}" opacity=".9"/>
      <path d="${bocage(354, 400, 9, 7, 14, HZ + 5)}" fill="${haie}" opacity=".9"/>
      <path d="M0 ${HZ + 5}H${W}V380H0Z" fill="url(#${u}Pre)"/>
      <path class="sillon" d="M190 ${HZ + 20}C250 ${HZ + 26} 320 ${HZ + 24} 404 ${HZ + 30}"/>
      <path class="sillon" d="M200 ${HZ + 44}C270 ${HZ + 52} 330 ${HZ + 48} 404 ${HZ + 58}"/>
      <g class="cloture"><path d="M192 ${HZ + 66}L404 ${HZ + 58}M192 ${HZ + 74}L404 ${HZ + 67}"/>${[192, 222, 252, 282, 312, 342, 372, 402].map((x, i) => `<path d="M${x} ${HZ + 62 - i * 0.6}v${17 - i * 0.4}"/>`).join('')}</g>
      <g class="mont-g">
        <path d="M10 338.6H232" stroke="${haie}" stroke-width="1.4" opacity=".55"/>
        <g fill="${haie}">${arbre(8, 300, 13)}${arbre(200, 310, 11)}${arbre(214, 314, 8)}</g>
        <rect x="27" y="270" width="6" height="16" fill="${pierre[1]}"/><rect x="71" y="270" width="6" height="16" fill="${pierre[1]}"/>
        <path d="M19 305H85L75 281H29Z" fill="${pierre[1]}"/>
        <path d="M78 319H187L178 300H86Z" fill="${pierre[1]}"/>
        <rect x="23" y="305" width="58" height="33" fill="${pierre[0]}"/>
        <rect x="81" y="319" width="102" height="19" fill="${pierre[0]}"/>
        <g fill="${pierre[0]}"><path d="M39 293h9v6h-9zM38.5 293l5-5 5 5z"/><path d="M57 293h9v6h-9zM56.5 293l5-5 5 5z"/><path d="M104 309h7v5h-7zM103.5 309l4-4 4 4z"/><path d="M130 309h7v5h-7zM129.5 309l4-4 4 4z"/><path d="M156 309h7v5h-7zM155.5 309l4-4 4 4z"/></g>
        <path d="M19 305H85M78 319H187" stroke="${nuit ? '#4A5C67' : '#F3EEE4'}" stroke-width=".8" opacity=".6"/>
        <path d="M48 338v-8a4 4 0 0 1 8 0v8z" fill="${nuit ? '#E7C487' : pierre[1]}" opacity="${nuit ? 0.8 : 1}"/>
        ${nuit ? fenetres('#F0D59F') : fenetres(dore ? '#6D6A66' : '#5E6973')}
        ${nuit ? `<rect x="23" y="336" width="160" height="3" fill="#E7C487" opacity=".35"/>` : ''}
      </g>
      <path d="${SHORE}V500H-4Z" fill="url(#${u}Eau)"/>
      <path class="rive" d="${SHORE}"/>
      ${roseaux(-4, 66, 14, 2)}${roseaux(334, 404, 12, 5)}
      <line class="horizon" x1="0" x2="${W}" y1="${HZ}" y2="${HZ}"/>`);

    const l4 = svg('l-surface', `<defs>
        <radialGradient id="${u}Nappe"><stop offset="0" stop-color="#FBF9F4" stop-opacity=".92"/><stop offset=".55" stop-color="#FBF9F4" stop-opacity=".6"/><stop offset="1" stop-color="#FBF9F4" stop-opacity="0"/></radialGradient>
        <pattern id="${u}Pluie" width="11" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(14)"><line x1="5" y1="0" x2="5" y2="7" stroke="#6F7F88" stroke-width=".8" stroke-linecap="round"/><animateTransform attributeName="patternTransform" type="translate" from="0 0" to="0 16" dur=".55s" repeatCount="indefinite" additive="sum"/></pattern>
        <pattern id="${u}Neige" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="5" cy="6" r="1.1" fill="#FBF9F4"/><circle cx="16" cy="15" r=".8" fill="#FBF9F4"/><animateTransform attributeName="patternTransform" type="translate" from="0 0" to="4 22" dur="3.2s" repeatCount="indefinite"/></pattern>
      </defs>
      <g class="eclats">${eclats}</g>
      <g class="chenaux">
        <g class="ronds" transform="translate(236 424)"><ellipse class="ride" rx="34" ry="7"/><ellipse class="ride r2" rx="34" ry="7"/><ellipse class="ride r3" rx="34" ry="7"/></g>
        <g class="ronds" transform="translate(148 458)"><ellipse class="ride r4" rx="28" ry="6"/><ellipse class="ride r5" rx="28" ry="6"/></g>
        <path class="reflet-rive" d="M70 392C120 388 170 394 214 390S300 384 330 388"/>
      </g>
      ${brume ? `<g class="brume"><ellipse cx="120" cy="${HZ - 20}" rx="230" ry="30" fill="url(#${u}Nappe)"/><ellipse cx="300" cy="${HZ + 14}" rx="250" ry="26" fill="url(#${u}Nappe)"/><ellipse cx="200" cy="384" rx="270" ry="30" fill="url(#${u}Nappe)"/></g>` : ''}
      ${pluie ? `<rect class="pluie" width="${W}" height="500" fill="url(#${u}Pluie)"/>` : ''}
      ${neige ? `<rect class="neige" width="${W}" height="500" fill="url(#${u}Neige)"/>` : ''}`);
    return l1 + l2 + l3 + l4;
  }

  /* ---------- Heure et météo (Open-Meteo, sans clé, mis en cache 30 min) ---------- */
  const demo = (() => { try { if (!/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return {}; const q = new URLSearchParams(location.search); return { h: q.get('h'), m: q.get('m') }; } catch (e) { return {}; } })();
  const maintenant = () => demo.h ? new Date(demo.h) : new Date();
  const ICONE_CIEL = (code, nuit) => {
    if (code <= 1) return nuit ? 'cielLune' : 'cielSoleil';
    if (code === 2) return nuit ? 'cielVoile' : 'cielNuageSoleil';
    if (code === 3) return 'cielNuage';
    if (code === 45 || code === 48) return 'cielBrume';
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'cielNeige';
    if (code >= 95) return 'cielOrage';
    return 'cielPluie';
  };
  let cielData = null;
  function chargerCiel() {
    if (demo.m != null && demo.m !== '') { cielData = { t: 12, code: +demo.m }; majCiel(); return; }
    if (!CFG.meteo) { cielData = null; majCiel(); return; }
    const cache = store.get('lb-ciel', null);
    if (cache && Date.now() - cache.t < 30 * 60000) { cielData = cache.d; majCiel(); return; }
    majCiel();
    const { lat, lon } = CFG.coordonnees;
    const u = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&timezone=Europe%2FParis`;
    const ctl = ('AbortController' in window) ? new AbortController() : null;
    if (ctl) setTimeout(() => ctl.abort(), 6000);
    fetch(u, ctl ? { signal: ctl.signal } : {}).then((r) => r.ok ? r.json() : null).then((j) => {
      if (!j || !j.current) return;
      cielData = { t: j.current.temperature_2m, code: j.current.weather_code, vent: j.current.wind_speed_10m };
      store.set('lb-ciel', { t: Date.now(), d: cielData }); majCiel();
    }).catch(() => { });
  }
  function majCiel() { majBaie(); majDirect(); }
  let baieCle = '';
  function majBaie() {
    const el = $('#baie'); if (!el) return;
    const e = etatCiel(maintenant(), cielData), cle = [e.jour, e.dore, e.code].join('|');
    if (cle !== baieCle || !el.firstElementChild) { el.innerHTML = scene(e); baieCle = cle; return; }
    const p = astre(e);
    $$('.astre circle', el).forEach((ci) => { ci.setAttribute('cx', p.x.toFixed(1)); ci.setAttribute('cy', p.y.toFixed(1)); });
  }
  function majDirect() {
    const el = $('#direct'); if (!el) return;
    const c = T().accueil.ciel, now = maintenant(), { lat, lon } = CFG.coordonnees, s = soleil(now, lat, lon);
    const nuit = now < s.lever || now > s.coucher;
    const [modele, h] = now < s.lever ? [c.leverA, s.lever] : now < s.coucher ? [c.coucherA, s.coucher] : [c.leverA, soleil(new Date(now.getTime() + 864e5), lat, lon).lever];
    const morceaux = [];
    let icone = nuit ? 'cielLune' : 'cielSoleil';
    if (cielData && typeof cielData.t === 'number') {
      icone = ICONE_CIEL(cielData.code, nuit);
      morceaux.push(`${Math.round(cielData.t)}°`, esc((cielData.code <= 1 && nuit) ? c.nuit : (c.codes[cielData.code] || c.codes[3])));
    }
    morceaux.push(esc(modele).replace('{h}', heure(h)));
    el.innerHTML = `${ico(icone)}<span>${morceaux.join(' · ')}</span>`;
    affiner(el);
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

  /* ---------- Images des chapitres (dans les pages seulement) ---------- */
  const PHOTO = { arrivee: 'h-arrivee', wifi: 'h-wifi', domaine: 'h-domaine', piscine: 'h-piscine', regles: 'h-regles', autour: 'h-autour', conciergerie: 'h-conciergerie', avis: 'h-avis' };

  /* ---------- Emblèmes du sommaire ---------- */
  const G_GOOGLE = '<svg viewBox="0 0 256 262" aria-hidden="true"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"/><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"/><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"/><path fill="#EA4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"/></svg>';
  const EMB = {
    arrivee: () => `<span class="emb emb-cle">${window.FH_CLE ? `<svg viewBox="0 0 843 210" aria-hidden="true"><path d="${window.FH_CLE}"/></svg>` : ico('key')}</span>`,
    wifi: () => '<span class="emb emb-wifi"><svg viewBox="0 0 48 48" aria-hidden="true"><path class="a3" d="M6 19.5a26 26 0 0 1 36 0"/><path class="a2" d="M12 26a17.5 17.5 0 0 1 24 0"/><path class="a1" d="M18 32.4a9 9 0 0 1 12 0"/><circle class="pt" cx="24" cy="38.5" r="2.3"/></svg></span>',
    domaine: () => `<span class="emb emb-sceau"><svg viewBox="0 0 48 48" aria-hidden="true"><circle class="c1" cx="24" cy="24" r="21"/><circle class="c2" cx="24" cy="24" r="17.2"/><text x="24.4" y="29.2" text-anchor="middle">${esc(CFG.monogramme)}</text></svg></span>`,
    piscine: () => '<span class="emb emb-trait"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M16 31V11.5a4.5 4.5 0 0 1 9 0"/><path d="M28 31V11.5a4.5 4.5 0 0 1 9 0"/><path class="l" d="M16 17.5h12M16 24h12"/><path d="M4 36c3.3-2.6 6.7-2.6 10 0s6.7 2.6 10 0 6.7-2.6 10 0 6.7 2.6 10 0"/><path class="l" d="M8 41.5c2.7-2 5.3-2 8 0s5.3 2 8 0 5.3-2 8 0 5.3 2 8 0"/></svg></span>',
    regles: () => '<span class="emb emb-trait"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 5.5h17l8 8v29H12z"/><path d="M29 5.5v8h8"/><path class="l" d="M17 20h15M17 25.5h15M17 31h9"/><circle cx="31.5" cy="35.5" r="3.4"/></svg></span>',
    autour: () => `<span class="emb emb-mont"><svg viewBox="0 0 48 48" aria-hidden="true"><g transform="translate(24 33) scale(.044) translate(-500 -500)"><path class="m" d="${MONT}"/></g><path class="h" d="M4 33h40"/><path class="o" d="M9 38.5c3-1.6 5-1.6 8 0s5 1.6 8 0 5-1.6 8 0 4-1.4 6-.4"/></svg></span>`,
    conciergerie: () => '<span class="emb emb-trait"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="15.6" r="1.9"/><path d="M24 17.5v3.2"/><path d="M10.5 33.5a13.5 13.5 0 0 1 27 0"/><path d="M7 33.5h34"/><path d="M9.5 38h29"/><path class="l" d="M15.5 29a9 9 0 0 1 5-5.6"/></svg></span>',
    urgences: () => '<span class="emb emb-num">112</span>',
    avis: () => `<span class="emb emb-google">${G_GOOGLE}</span>`
  };

  /* ---------- Accueil ---------- */
  function rendreAccueil() {
    const t = T(), a = t.accueil, c = CFG.contact;
    const lettres = (CFG.motMarque || CFG.nomMaison).toUpperCase().split('').map((ch, i) => ch === ' ' ? '<span class="esp"></span>' : `<span class="l" style="transition-delay:${(0.35 + i * 0.06).toFixed(2)}s">${ch}</span>`).join('');
    const tuiles = a.sections.map((s, i) => `<li class="tuile r${s.id === 'urgences' ? ' sombre' : ''}" style="--i:${i}"><button type="button" class="tuile-b" data-page="${s.id}" aria-label="${esc(s.titre)}">${(EMB[s.id] || (() => ''))()}<span class="tuile-l">${esc(s.court || s.titre)}</span></button></li>`).join('');
    $('#accueil').innerHTML = `
      <section class="vitrine">
        <div class="arche-bloc">
          <div class="arche" id="arche">${CFG.archePhoto ? `<div class="baie-cadre baie-photo"><img src="${esc(CFG.archePhoto)}" alt="${esc(a.archeAlt || '')}" width="1000" height="1250" decoding="async" fetchpriority="high"></div>` : '<div class="baie-cadre" id="baie"></div>'}</div>
          <svg class="arche-trait" viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden="true"><path d="M10 478q0 12 12 12h356q12 0 12-12V200A190 190 0 0 0 10 200Z" vector-effect="non-scaling-stroke"/></svg>
          <span class="sceau" aria-hidden="true"><i></i><b>${esc(CFG.monogramme)}</b></span>
        </div>
        <p class="sur">${esc(a.sur)}</p>
        <h1 class="mot" aria-label="${esc(CFG.nomMaison)}">${lettres}</h1>
        <p class="sous">${esc(a.sousTitre)}</p>
        <p class="lieu-mini">${esc(a.lieu)}</p>
        <p class="direct" id="direct" aria-live="polite"></p>
      </section>

      <section class="sejour r">
        <a class="sejour-h" href="#/arrivee" aria-label="${esc(a.sejour.lien)}">
          <div><span class="lab">${esc(a.sejour.arrivee)}</span><b>${hh(CFG.arrivee)}</b><small>${esc(a.sejour.aPartir)} ${hh(CFG.arrivee)}</small></div>
          <div class="sep"></div>
          <div><span class="lab">${esc(a.sejour.depart)}</span><b>${hh(CFG.depart)}</b><small>${esc(a.sejour.avant)} ${hh(CFG.depart)}</small></div>
        </a>
        <div class="sejour-b">
          <a class="btn" href="${tel(c.telIntl)}">${ico('phone')}${esc(a.sejour.appeler)}</a>
          <a class="btn fin" href="${sms(c.telIntl, CFG.smsDemande[lang])}">${ico('sms')}${esc(a.sejour.message)}</a>
        </div>
      </section>

      <section class="sommaire">
        <div class="sommaire-tete r"><span class="eyebrow">${esc(a.sommaire.eyebrow)}</span><h2 class="titre">${esc(a.sommaire.titre)} <em>${esc(a.sommaire.titreIt)}</em></h2></div>
        <ul class="grille">${tuiles}</ul>
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
    baieCle = '';
    const ph = $('.baie-photo img');
    if (ph) { const ok = () => ph.classList.add('pret'); if (ph.complete && ph.naturalWidth) ok(); else ph.addEventListener('load', ok, { once: true }); }
    chargerCiel();
  }

  /* ---------- Pages ---------- */
  function page(id, titreCourt, corps, photo) {
    return `<section class="page" id="page-${id}" aria-hidden="true" data-id="${id}">
      <header class="page-tete"><button type="button" class="retour" aria-label="${esc(T().commun.retour)}">${ico('chevL')}</button><div class="fil">${esc(titreCourt)}</div></header>
      <div class="page-corps">
        ${photo ? `<figure class="page-photo" style="margin:0"><img src="img/${photo}.webp" alt="" width="1080" height="1320" loading="lazy"><span class="page-voile"></span></figure>` : ''}
        ${corps(photo)}
      </div></section>`;
  }
  const numero = (id) => { const i = T().accueil.sections.findIndex((s) => s.id === id); return i < 0 ? '' : deux(i + 1); };
  const entete = (id, eb, t1, t2, photo) => `<div class="page-titre${photo ? '' : ' sans-photo'}">
      <span class="filigrane" aria-hidden="true">${esc(numero(id))}</span>
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
          ${CFG.adresse ? `<div class="adresse carte r"><span class="pastille">${ico('pin')}</span><div><b>${esc(CFG.nomMaison)}</b><p>${esc(CFG.adresse.replace(CFG.nomMaison + ', ', ''))}</p>${liensLieu(CFG.adresse)}</div></div>` : ''}
          <div class="lignes bloc">
            ${a.blocs.map(([i, ti, tx, act]) => `<div class="ligne r"><span class="pastille">${ico(i)}</span><div><h3>${esc(ti)}</h3><p>${esc(tx)}</p>${act === 'menage' ? `<a class="lien-or" href="${sms(c.telIntl, CFG.smsMenage[lang])}">${ico('sms')}${esc(a.menageBouton)}</a>` : ''}</div></div>`).join('')}
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

    { const w = t.wifi, ok = CFG.wifi.reseau && CFG.wifi.motDePasse;
      pages.push(page('wifi', `${w.titre} ${w.titreIt}`, (ph) => `${entete('wifi', w.eyebrow, w.titre, w.titreIt, ph)}
        <div class="page-contenu">
          ${ok ? `<div class="carte bloc r">
            <div class="champ"><div><span class="lab">${esc(w.reseau)}</span><div class="val">${esc(CFG.wifi.reseau)}</div></div><button type="button" class="copier" data-copier="${esc(CFG.wifi.reseau)}" aria-label="${esc(k.copier)}">${ico('copy')}</button></div>
            <div class="champ"><div><span class="lab">${esc(w.motDePasse)}</span><div class="val">${esc(CFG.wifi.motDePasse)}</div></div><button type="button" class="copier" data-copier="${esc(CFG.wifi.motDePasse)}" aria-label="${esc(k.copier)}">${ico('copy')}</button></div>
            <button type="button" class="btn plein" style="margin-top:18px" data-copier="${esc(CFG.wifi.motDePasse)}">${ico('copy')}${esc(k.copier)} · ${esc(w.motDePasse)}</button>
          </div>
          <div class="bloc r" style="text-align:center"><span class="eyebrow">${esc(w.qrTitre)}</span><div class="qr" id="qr-wifi"></div><p class="qr-legende petit doux">${esc(w.qrTexte)}</p></div>`
          : `<div class="carte bloc r wifi-attente"><span class="pastille">${ico('wifi')}</span><p>${esc(w.absent)}</p><a class="btn plein" href="${sms(c.telIntl, CFG.smsWifi[lang])}">${ico('sms')}${esc(w.demander)}</a></div>`}
          <div class="r">${w.notes.map(([i, tx]) => `<div class="note">${ico(i)}<span>${esc(tx)}</span></div>`).join('')}</div>
        </div>`, PHOTO.wifi));
    }

    { const m = t.domaine;
      pages.push(page('domaine', `${m.titre} ${m.titreIt}`, (ph) => `${entete('domaine', m.eyebrow, m.titre, m.titreIt, ph)}
        <div class="page-contenu">
          <p class="intro r">${esc(m.intro)}</p>
          <div class="chiffres r">${m.chiffres.map((x) => `<div class="chiffre"><b>${esc(x.n)}</b><span>${esc(x.l)}</span></div>`).join('')}</div>
          <div class="bloc">
            <h2 class="titre r">${esc(m.lodgesTitre)}</h2>
            <div class="lodges r">${m.lodges.map((l, i) => `<article class="lodge">
              <button type="button" class="lodge-photo" data-photo="${i}" data-galerie="lodges" aria-label="${esc(l.t)}"><img src="img/${l.f}-t.webp" alt="${esc(l.t)}, ${esc(l.s)}" loading="lazy" width="640" height="800"><span class="lodge-n">${i + 1}</span></button>
              <div class="lodge-txt"><span class="eyebrow">${esc(l.t)}</span><h3>${esc(l.s)}</h3><p>${esc(l.d)}</p><div class="tags">${l.tags.map((g) => `<span>${esc(g)}</span>`).join('')}</div></div>
            </article>`).join('')}</div>
            <p class="aide">${ico('chevR')}${esc(m.lodgesAide)}</p>
          </div>
          <div class="lignes bloc r"><div class="ligne"><span class="pastille">${ico('house')}</span><div><h3>${esc(m.vivreTitre)}</h3><p>${esc(m.vivre)}</p></div></div></div>
          <div class="bloc r"><h2 class="titre">${esc(m.equipementsTitre)}</h2><div class="equipements">${m.equipements.map((e) => `<div class="equip">${ico(e.i)}${esc(e.l)}</div>`).join('')}</div></div>
          <div class="bloc">
            <h2 class="titre r">${esc(m.galerieTitre)}</h2>
            <div class="galerie r">${m.photos.map((p, i) => `<figure><button type="button" data-photo="${i}" data-galerie="domaine" aria-label="${esc(p.l)}"><img src="img/${p.f}-t.webp" alt="${esc(p.l)}" loading="lazy" width="640" height="800"></button><figcaption><span>${deux(i + 1)}</span>${esc(p.l)}</figcaption></figure>`).join('')}</div>
            <p class="aide">${ico('agrandir')}${esc(m.galerieAide)}</p>
          </div>
        </div>`, PHOTO.domaine));
    }

    { const p = t.piscine;
      pages.push(page('piscine', `${p.titre} ${p.titreIt}`, (ph) => `${entete('piscine', p.eyebrow, p.titre, p.titreIt, ph)}
        <div class="page-contenu">
          <p class="intro r">${esc(p.intro)}</p>
          <div class="chiffres trois r">${p.chiffres.map((x) => `<div class="chiffre"><b>${esc(x.n)}</b><span>${esc(x.l)}</span></div>`).join('')}</div>
          <div class="bloc"><h2 class="titre r">${esc(p.gestesTitre)}</h2>
            <div class="lignes">${p.gestes.map(([i, ti, tx]) => `<div class="ligne r"><span class="pastille">${ico(i)}</span><div><h3>${esc(ti)}</h3><p>${esc(tx)}</p></div></div>`).join('')}</div>
          </div>
          <div class="bloc">
            <div class="galerie r">${p.photos.map((x, i) => `<figure><button type="button" data-photo="${i}" data-galerie="piscine" aria-label="${esc(x.l)}"><img src="img/${x.f}-t.webp" alt="${esc(x.l)}" loading="lazy" width="640" height="800"></button><figcaption><span>${deux(i + 1)}</span>${esc(x.l)}</figcaption></figure>`).join('')}</div>
            <p class="aide">${ico('agrandir')}${esc(t.domaine.galerieAide)}</p>
          </div>
        </div>`, PHOTO.piscine));
    }

    { const r = t.regles;
      pages.push(page('regles', `${r.titre} ${r.titreIt}`, (ph) => `${entete('regles', r.eyebrow, r.titre, r.titreIt, ph)}
        <div class="page-contenu">
          <p class="intro r">${esc(r.intro)}</p>
          <ul class="regles r">${r.liste.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>`, PHOTO.regles));
    }

    { const au = t.autour;
      pages.push(page('autour', `${au.titre} ${au.titreIt}`, (ph) => `${entete('autour', au.eyebrow, au.titre, au.titreIt, ph)}
        <div class="page-contenu">
          <p class="intro r">${esc(au.intro)}</p>
          <a class="maree carte r" href="${esc(CFG.marees)}" target="_blank" rel="noopener"><span class="pastille">${ico('maree')}</span><span><b>${esc(au.maree.titre)}</b><small>${esc(au.maree.texte)}</small></span>${ico('ext', 'ico fleche')}</a>
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
          <a class="btn plein r" href="${c.avisGoogle}" target="_blank" rel="noopener"><span class="g-rond">${G_GOOGLE}</span>${esc(v.google)}</a>
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
      const img = $('.page-photo img', cible); if (img) img.style.transform = '';
      $$('.page-tete', cible).forEach((h) => h.classList.remove('compact'));
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
    const etat = store.get('lb-check', []);
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

  /* ---------- Visionneuse ---------- */
  const lightbox = $('#lightbox');
  function ouvrirLightbox(i, liste) {
    const t = T(), photos = liste === 'lodges' ? t.domaine.lodges.map((l) => ({ f: l.f, l: `${l.t} · ${l.s}` })) : ((t[liste || 'domaine'] || {}).photos || []);
    lightbox.innerHTML = `<button type="button" class="fermer" aria-label="${esc(T().commun.fermer)}">${ico('close')}</button>
      <div class="piste">${photos.map((p, k) => `<figure data-k="${k}"><div class="cadre"><img src="img/${p.f}-c.webp" alt="${esc(p.l)}" loading="${Math.abs(k - i) < 2 ? 'eager' : 'lazy'}"></div><figcaption><span>${deux(k + 1)} / ${deux(photos.length)}</span>${esc(p.l)}</figcaption></figure>`).join('')}</div>`;
    lightbox.classList.add('ouverte'); document.body.classList.add('lb-ouverte');
    const piste = $('.piste', lightbox);
    requestAnimationFrame(() => { piste.scrollLeft = piste.clientWidth * i; });
    $('.fermer', lightbox).addEventListener('click', fermerLightbox);
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
    if (a.dataset.page) { e.preventDefault(); vibre(); ouvrir(a.dataset.page); return; }
    if (a.dataset.lang) { if (a.dataset.lang !== lang) { lang = a.dataset.lang; store.set('lb-lang', lang); rendre(); document.body.classList.add('revele'); } return; }
    if (a.classList.contains('retour')) { fermer(); return; }
    if (a.dataset.copier != null) { copier(a.dataset.copier); return; }
    if (a.dataset.photo != null) { ouvrirLightbox(+a.dataset.photo, a.dataset.galerie); return; }
    if (a.dataset.onglet) {
      const p = a.closest('.page-contenu');
      $$('.onglet', p).forEach((o) => o.setAttribute('aria-selected', String(o === a)));
      $$('[data-panneau]', p).forEach((pn) => { pn.hidden = pn.dataset.panneau !== a.dataset.onglet; });
      return;
    }
    if (a.classList.contains('check')) {
      const v = a.getAttribute('aria-checked') !== 'true'; a.setAttribute('aria-checked', String(v)); vibre();
      store.set('lb-check', $$('#checklist .check').map((b) => b.getAttribute('aria-checked') === 'true')); majChecklist(v); return;
    }
    if (a.dataset.action === 'partager') { partager(); return; }
    if (a.dataset.action === 'reinit') { store.set('lb-check', []); restaurerChecklist(); return; }
  });
  window.addEventListener('hashchange', route);
  /* Parallaxe douce de l'arche quand on fait défiler l'accueil */
  let ticA = false;
  window.addEventListener('scroll', () => {
    if (ticA || reduce) return; ticA = true;
    requestAnimationFrame(() => { ticA = false; const y = Math.min(window.scrollY, 700); const a = $('#arche'); if (a) a.style.transform = `translate3d(0, ${(y * 0.18).toFixed(1)}px, 0)`; });
  }, { passive: true });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { if (lightbox.classList.contains('ouverte')) fermerLightbox(); else if (courante) fermer(); } });
  setInterval(() => { if (!document.hidden) majCiel(); }, 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && $('#baie')) chargerCiel(); });

  /* ---------- Ouverture : la clé trace, tourne, les portes s'ouvrent ---------- */
  const ouv = $('#ouverture');
  let fini = false;
  function reveler() { document.body.classList.add('revele'); }
  function finirOuverture() {
    if (fini) return; fini = true;
    try { sessionStorage.setItem('lb-ouv', '1'); } catch (e) { }
    ouv.classList.add('ouvre'); reveler();
    setTimeout(() => ouv.remove(), 1200);
  }
  function ouverture() {
    let vu = false; try { vu = sessionStorage.getItem('lb-ouv') === '1'; } catch (e) { }
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
