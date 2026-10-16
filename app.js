/* ============================================================
   FUN HOUSE · LIVRET D'ACCUEIL · APPLICATION
   Vanilla JS, sans dépendance. Le contenu vient de content.js.
   ============================================================ */
(function () {
  'use strict';
  const CFG = window.FH_CONFIG, ALL = window.FH_CONTENT;
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const enc = encodeURIComponent;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
  };

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
  const ico = (n, cls) => `<svg class="${cls || 'ico'}" viewBox="0 0 24 24" aria-hidden="true">${I[n] || I.point}</svg>`;

  /* ---------- Liens ---------- */
  const tel = (n) => `tel:${n}`;
  const sms = (n, body) => `sms:${n}${body ? '?&body=' + enc(body) : ''}`;
  const gmaps = (q) => `https://www.google.com/maps/dir/?api=1&destination=${enc(q)}&travelmode=driving`;
  const amaps = (q) => `https://maps.apple.com/?daddr=${enc(q)}`;
  const hh = (t) => { const [h, m] = t.split(':'); return lang === 'fr' ? `${+h} h${m !== '00' ? ' ' + m : ''}` : (() => { const n = +h; return `${n % 12 || 12}${m !== '00' ? ':' + m : ''} ${n < 12 ? 'am' : 'pm'}`; })(); };

  /* ---------- Toast, copie, vibration ---------- */
  let toastT;
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('visible'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('visible'), 2200); }
  const vibre = () => { try { navigator.vibrate && navigator.vibrate(12); } catch (e) { } };
  function copier(txt, msg) {
    const ok = () => { toast(msg || T().commun.copie); vibre(); };
    const fallback = () => { try { const ta = document.createElement('textarea'); ta.value = txt; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); ok(); } catch (e) { toast(txt); } };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, fallback); else fallback();
  }

  /* ---------- Rendu : accueil ---------- */
  function rendreAccueil() {
    const t = T(), a = t.accueil, c = CFG.contact;
    $('#hero-texte').innerHTML = `
      <p class="main">${esc(a.bienvenue)}</p>
      <h1>Fun <em>House</em></h1>
      <p class="hero-lieu">${esc(CFG.lieu)}</p>`;
    const itin = CFG.adresse
      ? `<a class="rapide" href="${gmaps(CFG.adresse)}" target="_blank" rel="noopener"><span class="cercle">${ico('car')}</span>${esc(a.rapides.itineraire)}</a>`
      : `<button type="button" class="rapide" data-action="partager"><span class="cercle">${ico('share')}</span>${esc(a.rapides.partager)}</button>`;
    const tuiles = a.sections.map((s, i) => `
      <button type="button" class="tuile reveal${s.id === 'avis' ? ' large' : ''}" data-page="${s.id}" style="transition-delay:${i * 40}ms">
        <span class="cercle">${ico({ maison: 'house', regles: 'music', autour: 'pin', conciergerie: 'bell', bruno: 'pen', urgences: 'alert', avis: 'star' }[s.id])}</span>
        <span class="texte"><b>${esc(s.titre)}</b><small>${esc(s.sous)}</small></span>
        ${s.id === 'avis' ? ico('chevR', 'ico chev') : ''}
      </button>`).join('');
    $('#accueil').innerHTML = `
      <p class="intro-accueil reveal">${esc(a.intro)}</p>
      <div class="rapides reveal">
        <button type="button" class="rapide" data-page="wifi"><span class="cercle">${ico('wifi')}</span>${esc(a.rapides.wifi)}</button>
        <a class="rapide" href="${tel(c.telIntl)}"><span class="cercle">${ico('phone')}</span>${esc(a.rapides.appeler)}</a>
        ${itin}
      </div>
      <a class="horaires-carte reveal" href="#/arrivee">
        <div class="horaire"><span>${esc(a.horaires.arrivee)}</span><b>${hh(CFG.arrivee)}</b><small>${esc(a.horaires.aPartir)} ${hh(CFG.arrivee)}</small></div>
        <div class="sep"></div>
        <div class="horaire"><span>${esc(a.horaires.depart)}</span><b>${hh(CFG.depart)}</b><small>${esc(a.horaires.avant)} ${hh(CFG.depart)}</small></div>
        <div class="horaires-lien"><span>${esc(a.horaires.lien)}</span>${ico('chevR')}</div>
      </a>
      <div class="grille">${tuiles}</div>
      <footer class="pied reveal">
        <div class="marque-pied"><img src="img/logo-cdm.png" alt="CDM Conciergerie, Clés des Merveilles"></div>
        <p class="signature">CDM Conciergerie · Pontorson · Normandie</p>
        <p class="reservation">${esc(a.pied.reservation)}</p>
        <a class="site" href="${c.siteLogements}" target="_blank" rel="noopener">${esc(a.pied.autres)}</a>
        ${standalone ? '' : `<div class="installer">${ico('install')}<div><b>${esc(a.pied.installer)}</b>${esc(isIOS ? a.pied.installerAide : a.pied.installerAideAndroid)}</div></div>`}
      </footer>`;
    $('#btn-partager').innerHTML = ico('share');
    $('#btn-partager').setAttribute('aria-label', a.rapides.partager);
    document.querySelectorAll('.langue button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  }

  /* ---------- Rendu : pages ---------- */
  function page(id, fil, corps) {
    return `<section class="page" id="page-${id}" aria-hidden="true" data-id="${id}">
      <header class="page-tete"><button type="button" class="retour" aria-label="${esc(T().commun.retour)}">${ico('chevL')}</button><div class="fil">Fun House · ${esc(fil)}</div></header>
      <div class="page-corps">${corps}</div></section>`;
  }
  const titre = (eb, t1, t2) => `<p class="eyebrow">${esc(eb)}</p><h1 class="titre">${esc(t1)} <em>${esc(t2)}</em></h1>`;
  const boutonsLieu = (q) => `<div class="liens"><a class="btn or" href="${gmaps(q)}" target="_blank" rel="noopener">${ico('car')}${esc(T().commun.itineraire)}</a>${isIOS ? `<a class="btn or" href="${amaps(q)}" target="_blank" rel="noopener">${ico('pin')}${esc(T().commun.plans)}</a>` : ''}</div>`;

  function wifiQR() {
    try {
      if (typeof qrcode !== 'function') return '';
      const w = CFG.wifi, e = (s) => s.replace(/([\\;,:"])/g, '\\$1');
      const q = qrcode(0, 'M'); q.addData(`WIFI:T:${w.securite || 'WPA'};S:${e(w.reseau)};P:${e(w.motDePasse)};;`); q.make();
      return q.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
    } catch (err) { return ''; }
  }

  function rendrePages() {
    const t = T(), c = CFG.contact, k = t.commun;
    const pages = [];

    /* Wifi */
    { const w = t.wifi;
      pages.push(page('wifi', w.titre + ' ' + w.titreIt, `
        ${titre(w.eyebrow, w.titre, w.titreIt)}
        <div class="carte bloc reveal">
          <div class="wifi-champ"><div><div class="lab">${esc(w.reseau)}</div><div class="val">${esc(CFG.wifi.reseau)}</div></div><button type="button" class="btn-ico" data-copier="${esc(CFG.wifi.reseau)}" aria-label="${esc(k.copier)}">${ico('copy')}</button></div>
          <div class="wifi-champ"><div><div class="lab">${esc(w.motDePasse)}</div><div class="val mdp">${esc(CFG.wifi.motDePasse)}</div></div><button type="button" class="btn-ico" data-copier="${esc(CFG.wifi.motDePasse)}" aria-label="${esc(k.copier)}">${ico('copy')}</button></div>
          <button type="button" class="btn plein" data-copier="${esc(CFG.wifi.motDePasse)}">${ico('copy')}${esc(k.copier)} · ${esc(w.motDePasse)}</button>
        </div>
        <div class="bloc reveal"><h2 class="titre">${esc(w.qrTitre)}</h2><p class="petit doux" style="margin-bottom:14px">${esc(w.qrTexte)}</p><div class="qr-boite">${wifiQR()}</div></div>
        <div class="note reveal" style="margin-bottom:10px">${ico('info')}<span>${esc(w.box)}</span></div>
        <div class="note reveal">${ico('music')}<span>${esc(w.enceinte)}</span></div>`));
    }

    /* Arrivée et départ */
    { const a = t.arrivee, ck = a.checklist;
      pages.push(page('arrivee', a.titre + ' ' + a.titreIt, `
        ${titre(a.eyebrow, a.titre, a.titreIt)}
        <div class="tuiles-heures reveal">
          <div class="tuile-heure"><span>${esc(a.arrivee)}</span><b>${hh(CFG.arrivee)}</b><small>${esc(a.aPartir)} ${hh(CFG.arrivee)}</small></div>
          <div class="tuile-heure"><span>${esc(a.depart)}</span><b>${hh(CFG.depart)}</b><small>${esc(a.avant)} ${hh(CFG.depart)}</small></div>
        </div>
        <div class="carte reveal"><div class="ligne-ico"><span class="cercle">${ico('key')}</span><div><h3 class="titre">${esc(a.cles.titre)}</h3><p>${esc(a.cles.texte)}</p></div></div></div>
        <div class="carte reveal"><div class="ligne-ico"><span class="cercle">${ico('bed')}</span><div><h3 class="titre">${esc(a.linge.titre)}</h3><p>${esc(a.linge.texte)}</p></div></div></div>
        <div class="carte reveal"><div class="ligne-ico"><span class="cercle">${ico('clock')}</span><div><h3 class="titre">${esc(a.temps.titre)}</h3><p>${esc(a.temps.texte)}</p><a class="btn or compact" href="${sms(c.telIntl, CFG.smsTemps[lang])}">${ico('sms')}${esc(a.temps.bouton)}</a></div></div></div>
        <div class="photo-arrondie reveal" style="margin-top:22px"><img src="img/maison.webp" alt="" loading="lazy" width="1200" height="900"></div>
        <div class="carte reveal" id="checklist">
          <h2 class="titre">${esc(ck.titre)}</h2><p class="petit doux">${esc(ck.texte)}</p>
          <div class="progression"><i></i></div>
          <ul class="liste-check">${ck.items.map((it, i) => `<li><button type="button" class="check" role="checkbox" aria-checked="false" data-i="${i}"><span class="case">${ico('check')}</span><span class="lib">${esc(it)}</span></button></li>`).join('')}</ul>
          <div class="fini"><p class="main">${esc(ck.fini)}</p></div>
          <div class="actions">
            <a class="btn" href="${sms(c.telIntl, CFG.smsDepart[lang])}">${ico('sms')}${esc(ck.prevenir)}</a>
            <button type="button" class="btn lien" data-action="reinit">${esc(ck.reinit)}</button>
          </div>
        </div>`));
    }

    /* La maison */
    { const m = t.maison;
      pages.push(page('maison', m.titre + ' ' + m.titreIt, `
        ${titre(m.eyebrow, m.titre, m.titreIt)}
        <p class="intro">${esc(m.intro)}</p>
        <div class="chiffres reveal">${m.chiffres.map((x) => `<div class="chiffre"><b>${esc(x.n)}</b><span>${esc(x.l)}</span></div>`).join('')}</div>
        <h2 class="titre reveal">${esc(m.galerieTitre)}</h2>
        <div class="galerie reveal">${m.photos.map((p, i) => `<figure><button type="button" data-photo="${i}" aria-label="${esc(p.l)}"><img src="img/${p.f}-s.webp" alt="${esc(p.l)}" loading="${i < 2 ? 'eager' : 'lazy'}" width="640" height="800"></button><figcaption>${esc(p.l)}</figcaption></figure>`).join('')}</div>
        <div class="bloc reveal" style="margin-top:14px"><h2 class="titre">${esc(m.equipementsTitre)}</h2><div class="equipements">${m.equipements.map((e) => `<div class="equip"><span class="cercle">${ico(e.i)}</span>${esc(e.l)}</div>`).join('')}</div></div>
        <div class="bloc reveal"><h2 class="titre">${esc(m.chambresTitre)}</h2><div class="chambres">${m.chambres.map((ch) => `<div class="chambre"><b>${esc(ch.t)}</b><span>${esc(ch.d)}</span></div>`).join('')}</div></div>
        <div class="carte reveal bloc"><div class="ligne-ico"><span class="cercle">${ico('guitare')}</span><div><h3 class="titre">${esc(m.instruments.titre)}</h3><p>${esc(m.instruments.texte)}</p></div></div></div>
        ${m.modeEmploi && m.modeEmploi.length ? `<div class="bloc reveal"><h2 class="titre">${esc(m.modeEmploiTitre)}</h2><div class="accordeon">${m.modeEmploi.map((x) => `<details><summary>${esc(x.t)}${ico('plus')}</summary><p>${esc(x.d)}</p></details>`).join('')}</div></div>` : ''}`));
    }

    /* Règles et commandements */
    { const r = t.regles;
      pages.push(page('regles', r.titre + ' ' + r.titreIt, `
        ${titre(r.eyebrow, r.titre, r.titreIt)}
        <p class="intro">${esc(r.intro)}</p>
        <ul class="regles reveal">${r.liste.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        <section class="cmd">
          <p class="eyebrow">${esc(r.cmdEyebrow)}</p>
          <h2 class="titre" style="font-size:30px">${esc(r.cmdTitre)} <em>${esc(r.cmdTitreIt)}</em></h2>
          <ol>${r.commandements.map((cm, i) => `<li class="reveal" style="transition-delay:${Math.min(i, 6) * 50}ms"><span class="n">${i + 1}</span><div><b>${esc(cm[0])}</b>${cm[1] ? `<small>${esc(cm[1])}</small>` : ''}</div></li>`).join('')}</ol>
          <p class="sign">${esc(r.signature)}</p>
        </section>`));
    }

    /* Bruno */
    { const b = t.bruno;
      pages.push(page('bruno', b.titre + ' ' + b.titreIt, `
        ${titre(b.eyebrow, b.titre, b.titreIt)}
        <div class="photo-arrondie reveal"><img src="img/gunners.webp" alt="" loading="lazy" width="1200" height="900" style="object-position:50% 12%"></div>
        <article class="lettre reveal">
          <p class="salut">${esc(b.salut)}</p>
          ${b.paragraphes.map((p) => `<p>${esc(p)}</p>`).join('')}
          <div class="reperes">${b.reperes.map((x) => `<span>${esc(x)}</span>`).join('')}</div>
          <p class="sign-main">${esc(b.signature)}</p>
        </article>`));
    }

    /* Conciergerie */
    { const s = t.conciergerie;
      pages.push(page('conciergerie', s.titre + ' ' + s.titreIt, `
        ${titre(s.eyebrow, s.titre, s.titreIt)}
        <p class="intro">${esc(s.intro)}</p>
        <div class="carte reveal bloc"><div class="contact-carte"><div><div class="nom">${esc(c.prenom)}</div><div class="petit doux">${esc(c.structure)}</div><div class="tel">${esc(c.telAffiche)}</div></div><span class="cercle" style="width:52px;height:52px">${ico('bell')}</span></div>
          <p class="petit doux" style="margin:10px 0 0">${esc(s.dispo)}</p>
          <div class="contact-boutons"><a class="btn" href="${tel(c.telIntl)}">${ico('phone')}${esc(k.appeler)}</a><a class="btn or" href="${sms(c.telIntl, CFG.smsDemande[lang])}">${ico('sms')}${esc(k.sms)}</a><a class="btn or" href="mailto:${c.email}">${ico('mail')}${esc(k.email)}</a></div></div>
        <div class="services">${s.services.map((sv, i) => `<div class="service reveal" style="transition-delay:${Math.min(i, 5) * 40}ms"><span class="cercle">${ico(sv.i)}</span><div><b>${esc(sv.t)}</b><p>${esc(sv.d)}</p><a class="btn or compact" href="${sms(c.telIntl, CFG.smsDemande[lang] + sv.t)}">${ico('sms')}${esc(sv.cta)}</a></div></div>`).join('')}</div>`));
    }

    /* Autour */
    { const au = t.autour;
      pages.push(page('autour', au.titre + ' ' + au.titreIt, `
        ${titre(au.eyebrow, au.titre, au.titreIt)}
        <p class="intro">${esc(au.intro)}</p>
        <div class="onglets" role="tablist">${au.onglets.map((o, i) => `<button type="button" class="onglet" role="tab" aria-selected="${i === 0}" data-onglet="${o.id}">${esc(o.l)}</button>`).join('')}</div>
        ${au.onglets.map((o, i) => `<ul class="lieux" role="tabpanel" data-panneau="${o.id}" ${i ? 'hidden' : ''}>${o.items.map((it) => `<li class="lieu"><div><b>${esc(it.t)}</b><div class="s">${esc(it.s)}</div></div><div class="dist"><b>${esc(it.km)}</b><small>${esc(it.min)} ${esc(k.min)}</small></div>${boutonsLieu(it.q)}</li>`).join('')}</ul>`).join('')}
        <p class="petit doux" style="margin-top:16px">${esc(au.note)}</p>`));
    }

    /* Urgences */
    { const u = t.urgences;
      pages.push(page('urgences', u.titre + ' ' + u.titreIt, `
        ${titre(u.eyebrow, u.titre, u.titreIt)}
        <p class="intro">${esc(u.intro)}</p>
        <div class="urgences">${u.liste.map((x, i) => `<a class="urgence reveal${x.prio ? ' prio' : ''}" style="transition-delay:${i * 40}ms" href="${x.sms ? 'sms:' + x.n : 'tel:' + x.n}"><b>${esc(x.n)}</b><div class="t"><span>${esc(x.t)}</span>${x.s ? `<small>${esc(x.s)}</small>` : ''}</div>${ico(x.sms ? 'sms' : 'phone')}</a>`).join('')}
          <a class="urgence reveal" href="${tel(c.telIntl)}"><b style="font-size:22px">${esc(c.prenom)}</b><div class="t"><span>${esc(c.telAffiche)}</span><small>${esc(u.alicia)}</small></div>${ico('phone')}</a></div>`));
    }

    /* Avis */
    { const v = t.avis;
      pages.push(page('avis', v.titre + ' ' + v.titreIt, `
        <div class="avis-centre">
          ${titre(v.eyebrow, v.titre, v.titreIt)}
          <div class="etoiles">${ico('star')}${ico('star')}${ico('star')}${ico('star')}${ico('star')}</div>
          <p class="intro" style="margin-left:auto;margin-right:auto">${esc(v.texte)}</p>
          <a class="btn plein" href="${c.avisGoogle}" target="_blank" rel="noopener">${ico('star')}${esc(v.google)}</a>
          <p class="petit doux" style="margin-top:12px">${esc(v.plateforme)}</p>
          <p class="bientot">${esc(v.bientot)}</p>
          <div class="marque-pied" style="display:inline-block;background:var(--nacre);border-radius:14px;padding:10px 16px"><img src="img/logo-cdm.png" alt="CDM Conciergerie, Clés des Merveilles" style="height:48px;width:auto"></div>
          <p class="petit" style="margin-top:16px"><a href="${c.siteLogements}" target="_blank" rel="noopener" style="color:var(--or)">${esc(v.autres)}</a></p>
          <p class="petit doux">${esc(v.reservation)}</p>
          <p class="petit doux">${esc(c.instagramHandle)}</p>
        </div>`));
    }

    $('#pages').innerHTML = pages.join('');
    restaurerChecklist();
  }

  /* ---------- Navigation ---------- */
  let courante = null;
  function route() {
    const m = location.hash.match(/^#\/([a-z]+)/);
    const id = m ? m[1] : null;
    const cible = id ? $(`#page-${id}`) : null;
    if (courante && courante !== cible) { courante.classList.remove('ouverte'); courante.setAttribute('aria-hidden', 'true'); courante = null; }
    if (cible) {
      cible.classList.add('ouverte'); cible.setAttribute('aria-hidden', 'false'); courante = cible;
      document.body.classList.add('page-ouverte');
      $('.page-corps', cible).scrollTop = $('.page-corps', cible).scrollTop; /* garde la position */
      if (id === 'wifi') { const b = $('.qr-boite', cible); if (b && !b.firstChild) b.innerHTML = wifiQR(); }
    } else { document.body.classList.remove('page-ouverte'); }
    if (lightbox.classList.contains('ouverte')) fermerLightbox();
  }
  const ouvrir = (id) => { location.hash = '#/' + id; };
  const fermer = () => { if (location.hash) history.back(); else route(); };

  /* ---------- Checklist ---------- */
  function restaurerChecklist() {
    const etat = store.get('fh-check', []);
    document.querySelectorAll('#checklist .check').forEach((b) => b.setAttribute('aria-checked', String(!!etat[+b.dataset.i])));
    majChecklist(false);
  }
  function majChecklist(feter) {
    const boutons = [...document.querySelectorAll('#checklist .check')]; if (!boutons.length) return;
    const faits = boutons.filter((b) => b.getAttribute('aria-checked') === 'true').length;
    $('#checklist .progression i').style.width = (faits / boutons.length * 100) + '%';
    const tout = faits === boutons.length;
    $('#checklist .fini').classList.toggle('visible', tout);
    if (tout && feter) confettis();
  }
  function confettis() {
    if (reduce) return;
    const c = document.createElement('div'); c.className = 'confettis';
    const couleurs = ['#AF8450', '#D9BE93', '#152A35', '#FBF9F4', '#EFE3CF'];
    for (let i = 0; i < 70; i++) { const s = document.createElement('i'); s.style.cssText = `left:${Math.random() * 100}%;background:${couleurs[i % 5]};animation-duration:${1.6 + Math.random() * 1.4}s;animation-delay:${Math.random() * .6}s;transform:rotate(${Math.random() * 360}deg)`; c.appendChild(s); }
    document.body.appendChild(c); setTimeout(() => c.remove(), 3600); vibre();
  }

  /* ---------- Lightbox ---------- */
  const lightbox = $('#lightbox');
  function ouvrirLightbox(i) {
    const photos = T().maison.photos;
    lightbox.innerHTML = `<button type="button" class="btn-ico fermer" aria-label="${esc(T().commun.fermer)}">${ico('close')}</button><div class="piste">${photos.map((p) => `<figure><img src="img/${p.f}.webp" alt="${esc(p.l)}" loading="lazy"><figcaption>${esc(p.l)}</figcaption></figure>`).join('')}</div>`;
    lightbox.classList.add('ouverte');
    const piste = $('.piste', lightbox); piste.scrollLeft = piste.clientWidth * i;
    $('.fermer', lightbox).addEventListener('click', fermerLightbox);
  }
  function fermerLightbox() { lightbox.classList.remove('ouverte'); lightbox.innerHTML = ''; }

  /* ---------- Partage ---------- */
  function partager() {
    const d = { title: T().meta.titre, text: T().commun.partagerTexte, url: CFG.url };
    if (navigator.share) navigator.share(d).catch(() => { }); else copier(CFG.url, T().commun.lienCopie);
  }

  /* ---------- Révélation ---------- */
  let io;
  function observer() {
    if (io) io.disconnect();
    if (!('IntersectionObserver' in window) || reduce) { document.querySelectorAll('.reveal').forEach((e) => e.classList.add('vu')); return; }
    io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('vu'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: .05 });
    document.querySelectorAll('.reveal').forEach((e) => io.observe(e));
    setTimeout(() => document.querySelectorAll('.reveal:not(.vu)').forEach((e) => { const r = e.getBoundingClientRect(); if (r.top < innerHeight * 1.2) e.classList.add('vu'); }), 1800);
  }

  /* ---------- Rendu complet ---------- */
  function rendre() {
    document.documentElement.lang = lang;
    document.title = T().meta.titre;
    const md = $('meta[name="description"]'); if (md) md.content = T().meta.description;
    rendreAccueil(); rendrePages(); observer(); route();
  }

  /* ---------- Événements (délégation) ---------- */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-page],[data-action],[data-copier],[data-photo],[data-onglet],[data-lang],.retour,.check');
    if (!a) return;
    if (a.dataset.page) { e.preventDefault(); ouvrir(a.dataset.page); return; }
    if (a.dataset.lang) { lang = a.dataset.lang; store.set('fh-lang', lang); rendre(); return; }
    if (a.classList.contains('retour')) { fermer(); return; }
    if (a.dataset.copier != null) { copier(a.dataset.copier); return; }
    if (a.dataset.photo != null) { ouvrirLightbox(+a.dataset.photo); return; }
    if (a.dataset.onglet) {
      const p = a.closest('.page-corps');
      p.querySelectorAll('.onglet').forEach((o) => o.setAttribute('aria-selected', String(o === a)));
      p.querySelectorAll('[data-panneau]').forEach((pn) => { pn.hidden = pn.dataset.panneau !== a.dataset.onglet; });
      p.querySelectorAll('[data-panneau]:not([hidden]) .reveal').forEach((el) => el.classList.add('vu'));
      return;
    }
    if (a.classList.contains('check')) {
      const v = a.getAttribute('aria-checked') !== 'true'; a.setAttribute('aria-checked', String(v)); vibre();
      const etat = [...document.querySelectorAll('#checklist .check')].map((b) => b.getAttribute('aria-checked') === 'true'); store.set('fh-check', etat); majChecklist(v); return;
    }
    if (a.dataset.action === 'partager') { partager(); return; }
    if (a.dataset.action === 'reinit') { store.set('fh-check', []); restaurerChecklist(); return; }
  });
  $('#btn-partager').addEventListener('click', partager);
  window.addEventListener('hashchange', route);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { if (lightbox.classList.contains('ouverte')) fermerLightbox(); else if (courante) fermer(); } });

  /* ---------- Ouverture et vidéo ---------- */
  const hero = $('#hero'), video = $('#hero-video'), ouv = $('#ouverture');
  function lancerVideo() {
    if (!video || reduce) return;
    const con = navigator.connection || {};
    if (con.saveData || /2g/.test(con.effectiveType || '')) return;
    video.preload = 'auto';
    const p = video.play();
    if (p && p.then) p.then(() => hero.classList.add('video-prete')).catch(() => { });
    video.addEventListener('playing', () => hero.classList.add('video-prete'), { once: true });
  }
  let ouvFinie = false;
  function finirOuverture() {
    if (ouvFinie) return; ouvFinie = true;
    ouv.classList.add('fin'); try { sessionStorage.setItem('fh-ouv', '1'); } catch (e) { }
    setTimeout(() => ouv.remove(), 700);
    lancerVideo();
  }
  function ouverture() {
    let vu = false; try { vu = sessionStorage.getItem('fh-ouv') === '1'; } catch (e) { }
    if (vu || reduce || location.hash || !window.FH_CLE) { ouv.remove(); ouvFinie = true; lancerVideo(); return; }
    $('#ouv-cle-path').setAttribute('d', window.FH_CLE);
    requestAnimationFrame(() => ouv.classList.add('trace'));
    setTimeout(() => { ouv.classList.add('logo'); $('#ouv-logo').classList.add('visible'); }, 1750);
    setTimeout(finirOuverture, 3000);
    ouv.addEventListener('click', finirOuverture);
    setTimeout(() => { if (!ouvFinie) finirOuverture(); }, 5000);
  }

  /* ---------- Démarrage ---------- */
  rendre();
  ouverture();
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => { }); });
  }
})();
