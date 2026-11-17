// Les Lodges de la Baie : calendrier, demande de séjour, lodges, piscine, visionneuse.
// Maquette de démonstration : les disponibilités sont fictives tant que CONFIG.source est vide.
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var CONFIG = {
    // Plus tard : "/api/disponibilites", une fonction serveur qui lit le vrai calendrier
    // et renvoie le même format que la Fun House : { aujourdhui, ouvertJusquau, jours: [{ d, l, p, m, x, a, s }] }
    source: null,
    tel: "+33640571882",
    telAffiche: "06 40 57 18 82",
    mail: "conciergerieclesdesmerveilles@gmail.com",
    nom: "Les Lodges de la Baie",
    maxVoyageurs: 14,
    voyageursDepart: 8
  };

  var $ = function (id) { return document.getElementById(id); };
  var calme = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  // ---------- Défilement adouci (Lenis), coupé si l'utilisateur préfère moins de mouvement ----------
  var lenis = null;
  if (!calme && window.Lenis) {
    var hauteurEntete = function () { return parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--entete-h")) || 84; };
    lenis = new window.Lenis({ lerp: 0.085, wheelMultiplier: 0.95, anchors: { offset: -(hauteurEntete() + 12) } });
    (function boucle(t) { lenis.raf(t); requestAnimationFrame(boucle); })(performance.now());
  }

  // ---------- Dates (en UTC pour éviter les décalages d'heure d'été) ----------
  function versDate(iso) { var p = iso.split("-"); return new Date(Date.UTC(+p[0], +p[1] - 1, +p[2])); }
  function versIso(d) { return d.toISOString().slice(0, 10); }
  function plusJours(iso, n) { var d = versDate(iso); d.setUTCDate(d.getUTCDate() + n); return versIso(d); }
  function ecart(a, b) { return Math.round((versDate(b) - versDate(a)) / 86400000); }
  function aujourdhuiLocal() { var d = new Date(); return versIso(new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))); }
  var fmtLong = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  var fmtCourt = new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
  var fmtMois = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" });
  var fmtJour = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  function pluriel(n, mot) { return n + " " + mot + (n > 1 ? "s" : ""); }

  // ---------- Calendrier de démonstration (fictif, toujours le même pour une date donnée) ----------
  function calendrierDemo() {
    var graine = 8021325;
    function hasard() { graine |= 0; graine = graine + 0x6D2B79F5 | 0; var t = Math.imul(graine ^ graine >>> 15, 1 | graine); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
    var auj = aujourdhuiLocal(), fin = plusJours(auj, 364), pris = {}, c = "2026-01-01";
    while (c <= fin) {
      var d = versDate(c), mois = d.getUTCMonth(), jour = d.getUTCDay();
      var chance = (mois >= 5 && mois <= 8) ? 0.34 : (mois === 3 || mois === 4 || mois === 9) ? 0.17 : 0.09;
      if (jour === 5) chance *= 1.7;
      if (hasard() < chance) {
        var duree = (mois >= 6 && mois <= 7) ? 4 + Math.floor(hasard() * 4) : 2 + Math.floor(hasard() * 3);
        for (var i = 0; i < duree; i++) pris[plusJours(c, i)] = 1;
        c = plusJours(c, duree + Math.floor(hasard() * 3));
      } else c = plusJours(c, 1);
    }
    var jours = [];
    for (var k = 0; k < 365; k++) { var iso = plusJours(auj, k); jours.push({ d: iso, l: pris[iso] ? 0 : 1, m: 2, x: 28, a: 0, s: 0 }); }
    return { aujourdhui: auj, ouvertJusquau: fin, jours: jours };
  }
  function lireCalendrier() {
    if (!CONFIG.source) return Promise.resolve(calendrierDemo());
    return fetch(CONFIG.source, { headers: { Accept: "application/json" } })
      .then(function (r) { if (!r.ok) throw new Error("statut " + r.status); return r.json(); });
  }

  // ---------- État et règles de réservation ----------
  var grille = $("grille"), aide = $("aide"), moisNom = $("mois-nom");
  var btnPrec = $("mois-prec"), btnSuiv = $("mois-suiv"), btnDemander = $("demander");
  var total = $("total"), barre = $("barre"), barreTexte = $("barre-texte"), barreBouton = $("barre-bouton");
  var etat = { jours: {}, liste: [], aujourdhui: null, ouvertJusquau: null, mois: null, arrivee: null, depart: null, survol: null, voyageurs: CONFIG.voyageursDepart, charge: false };

  function nuitLibre(iso) { var j = etat.jours[iso]; return !!(j && j.l === 1); }
  function arriveePossible(iso) { var j = etat.jours[iso]; return nuitLibre(iso) && !j.a && iso >= etat.aujourdhui; }
  function departMax(arr) {
    var j = etat.jours[arr], max = (j && j.x) || 30, n = 0, cur = arr;
    while (nuitLibre(cur) && n < max) { cur = plusJours(cur, 1); n++; }
    return cur;
  }
  function departPossible(arr, dep) {
    if (!arr || dep <= arr) return false;
    var j = etat.jours[arr], min = (j && j.m) || 1;
    if (ecart(arr, dep) < min) return false;
    if (dep > departMax(arr)) return false;
    var jd = etat.jours[dep];
    return !(jd && jd.s);
  }
  function premierDuMois(iso) { var d = versDate(iso); d.setUTCDate(1); return d; }
  function memeMois(a, b) { return a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth(); }
  function moisAvecLibre(debut, fin) {
    for (var i = 0; i < etat.liste.length; i++) { var iso = etat.liste[i]; if (iso >= debut && iso <= fin && arriveePossible(iso)) return true; }
    return false;
  }

  function dessiner() {
    if (!etat.charge) return;
    var m = etat.mois, an = m.getUTCFullYear(), mo = m.getUTCMonth();
    moisNom.textContent = fmtMois.format(m);
    var premier = premierDuMois(etat.aujourdhui), dernier = premierDuMois(etat.liste[etat.liste.length - 1]);
    btnPrec.disabled = memeMois(m, premier);
    btnSuiv.disabled = memeMois(m, dernier);
    var decalage = (m.getUTCDay() + 6) % 7, nbJours = new Date(Date.UTC(an, mo + 1, 0)).getUTCDate();
    var html = "", premierJour = 1;
    if (memeMois(m, premier)) { // dans le mois en cours, on saute les semaines passées
      var auj = versDate(etat.aujourdhui), lundi = auj.getUTCDate() - ((auj.getUTCDay() + 6) % 7);
      if (lundi > 1) { premierJour = lundi; decalage = 0; }
    }
    for (var v = 0; v < decalage; v++) html += '<span class="jour jour--vide"></span>';
    var finApercu = (!etat.depart && etat.arrivee && etat.survol && departPossible(etat.arrivee, etat.survol)) ? etat.survol : etat.depart;

    for (var n = premierJour; n <= nbJours; n++) {
      var iso = versIso(new Date(Date.UTC(an, mo, n))), j = etat.jours[iso];
      var passe = iso < etat.aujourdhui || !j, libre = !passe && nuitLibre(iso), enChoixDepart = etat.arrivee && !etat.depart;
      var cliquable, classes = ["jour"], etiquette = fmtLong.format(versDate(iso));
      if (enChoixDepart) {
        cliquable = departPossible(etat.arrivee, iso) || (iso !== etat.arrivee && arriveePossible(iso)) || iso === etat.arrivee;
        if (!libre && departPossible(etat.arrivee, iso)) { classes.push("jour--depart-possible"); etiquette += ", départ possible"; }
      } else cliquable = !passe && arriveePossible(iso);
      if (!libre) { classes.push("jour--pris"); if (!passe) etiquette += ", nuit indisponible"; } else etiquette += ", nuit libre";
      if (iso === etat.aujourdhui) classes.push("jour--aujourdhui");
      if (iso === etat.arrivee) { classes.push("jour--bout", "jour--arrivee"); if (finApercu) classes.push("jour--relie"); etiquette += ", arrivée choisie"; }
      else if (iso === finApercu) { classes.push("jour--bout", "jour--depart", "jour--relie"); if (etat.depart) etiquette += ", départ choisi"; }
      else if (etat.arrivee && finApercu && iso > etat.arrivee && iso < finApercu) classes.push("jour--dans");
      html += '<button type="button" class="' + classes.join(" ") + '" data-jour="' + iso + '"' + (cliquable ? "" : " disabled") +
        ' aria-label="' + etiquette + '"' + ((iso === etat.arrivee || iso === etat.depart) ? ' aria-pressed="true"' : "") +
        '><span class="jour__num">' + n + "</span></button>";
    }
    grille.innerHTML = html;
    majTexte();
  }

  function majTexte() {
    var a = etat.arrivee, d = etat.depart;
    $("val-arrivee").textContent = a ? fmtCourt.format(versDate(a)) : "Choisir";
    $("val-depart").textContent = d ? fmtCourt.format(versDate(d)) : "Choisir";
    $("case-arrivee").classList.toggle("actif", !a);
    $("case-depart").classList.toggle("actif", !!a && !d);
    var message = "";
    if (!a) {
      var debutMois = versIso(etat.mois), finMois = versIso(new Date(Date.UTC(etat.mois.getUTCFullYear(), etat.mois.getUTCMonth() + 1, 0)));
      if (etat.ouvertJusquau && debutMois > etat.ouvertJusquau) message = "Les réservations sont ouvertes jusqu'au " + fmtJour.format(versDate(etat.ouvertJusquau)) + ".";
      else if (!moisAvecLibre(debutMois, finMois)) message = "Plus de date libre ce mois-ci. Regardez le mois suivant.";
      else message = "Choisissez votre jour d'arrivée.";
    } else if (!d) {
      var min = (etat.jours[a] && etat.jours[a].m) || 1;
      message = min > 1 ? "Choisissez votre jour de départ. " + min + " nuits minimum." : "Choisissez votre jour de départ.";
    }
    aide.textContent = message;
    var pret = !!(a && d);
    btnDemander.disabled = !pret;
    total.hidden = !pret;
    if (pret) {
      var nuits = ecart(a, d);
      $("total-nuits").textContent = pluriel(nuits, "nuit") + ", " + pluriel(etat.voyageurs, "voyageur");
      barreTexte.innerHTML = "<strong>" + pluriel(nuits, "nuit") + "</strong><br>" + fmtCourt.format(versDate(a)) + " au " + fmtCourt.format(versDate(d));
      barreBouton.textContent = "Demander";
    } else {
      barreTexte.textContent = "Jusqu'à 14 voyageurs";
      barreBouton.textContent = "Vos dates";
    }
  }

  grille.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-jour]");
    if (!b || b.disabled) return;
    var iso = b.getAttribute("data-jour");
    if (etat.arrivee && !etat.depart) {
      if (iso === etat.arrivee) etat.arrivee = null;
      else if (departPossible(etat.arrivee, iso)) etat.depart = iso;
      else if (arriveePossible(iso)) etat.arrivee = iso;
    } else { etat.arrivee = arriveePossible(iso) ? iso : null; etat.depart = null; }
    etat.survol = null;
    dessiner();
    var cible = grille.querySelector('[data-jour="' + iso + '"]');
    if (cible) { cible.classList.add("jour--pose"); if (!cible.disabled) cible.focus({ preventScroll: true }); }
    if (etat.arrivee && etat.depart && !calme) { btnDemander.classList.remove("pret"); void btnDemander.offsetWidth; btnDemander.classList.add("pret"); }
  });
  grille.addEventListener("mouseover", function (e) {
    if (!etat.arrivee || etat.depart) return;
    var b = e.target.closest("button[data-jour]"), iso = b ? b.getAttribute("data-jour") : null;
    if (iso !== etat.survol) { etat.survol = iso; dessiner(); }
  });
  grille.addEventListener("mouseleave", function () { if (etat.survol) { etat.survol = null; dessiner(); } });
  function changerMois(pas) {
    etat.mois = new Date(Date.UTC(etat.mois.getUTCFullYear(), etat.mois.getUTCMonth() + pas, 1));
    dessiner();
    grille.style.setProperty("--sens", (pas > 0 ? 16 : -16) + "px");
    grille.classList.remove("glisse"); void grille.offsetWidth; grille.classList.add("glisse");
  }
  btnPrec.addEventListener("click", function () { changerMois(-1); });
  btnSuiv.addEventListener("click", function () { changerMois(1); });

  function majVoyageurs() {
    $("voy-val").textContent = etat.voyageurs;
    $("voy-moins").disabled = etat.voyageurs <= 1;
    $("voy-plus").disabled = etat.voyageurs >= CONFIG.maxVoyageurs;
    if (etat.charge) majTexte();
  }
  $("voy-moins").addEventListener("click", function () { if (etat.voyageurs > 1) { etat.voyageurs--; majVoyageurs(); } });
  $("voy-plus").addEventListener("click", function () { if (etat.voyageurs < CONFIG.maxVoyageurs) { etat.voyageurs++; majVoyageurs(); } });
  majVoyageurs();

  function charger(silencieux) {
    return lireCalendrier().then(function (d) {
      if (!d || !d.jours || !d.jours.length) throw new Error("calendrier vide");
      etat.jours = {}; etat.liste = [];
      d.jours.forEach(function (j) { etat.jours[j.d] = j; etat.liste.push(j.d); });
      etat.aujourdhui = d.aujourdhui || etat.liste[0];
      etat.ouvertJusquau = d.ouvertJusquau;
      if (etat.arrivee && (!nuitLibre(etat.arrivee) || (etat.depart && !departPossible(etat.arrivee, etat.depart)))) {
        etat.arrivee = null; etat.depart = null;
      }
      if (!etat.mois) {
        var premiere = null;
        for (var i = 0; i < etat.liste.length; i++) { if (arriveePossible(etat.liste[i])) { premiere = etat.liste[i]; break; } }
        etat.mois = premierDuMois(premiere || etat.aujourdhui);
      }
      etat.charge = true;
      dessiner();
      return true;
    }).catch(function () {
      if (!silencieux) grille.innerHTML = '<p class="cal-attente">Le calendrier ne répond pas pour le moment. Appelez Alicia au <a href="tel:' + CONFIG.tel + '">' + CONFIG.telAffiche + "</a>.</p>";
      return false;
    });
  }
  charger(false);
  document.addEventListener("visibilitychange", function () { if (!document.hidden && etat.charge && CONFIG.source) charger(true); });

  // ---------- Demande de séjour (e-mail prérempli) ----------
  var fenetre = $("fenetre-demande"), formulaire = $("demande-form");
  // Sur téléphone, le SMS passe en premier.
  var tactile = !!(window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
  var principal = $("envoi-principal"), second = $("envoi-second");
  if (tactile) {
    principal.innerHTML = 'Envoyer par SMS <span class="fleche" aria-hidden="true">→</span>'; principal.setAttribute("data-canal", "sms");
    second.textContent = "Envoyer par e-mail"; second.setAttribute("data-canal", "email");
  }
  function ouvrir(d) {
    if (lenis) lenis.stop();
    if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
  }
  function ouvrirDemande() {
    if (!etat.arrivee || !etat.depart) return;
    var nuits = ecart(etat.arrivee, etat.depart);
    $("demande-recap").textContent = "Du " + fmtLong.format(versDate(etat.arrivee)) + " au " + fmtLong.format(versDate(etat.depart)) + ", " + pluriel(nuits, "nuit") + ", " + pluriel(etat.voyageurs, "voyageur") + ".";
    $("demande-erreur").hidden = true;
    ouvrir(fenetre);
  }
  btnDemander.addEventListener("click", ouvrirDemande);
  barreBouton.addEventListener("click", function (e) { if (etat.arrivee && etat.depart) { e.preventDefault(); ouvrirDemande(); } });

  function texteDemande() {
    var f = formulaire.elements, nuits = ecart(etat.arrivee, etat.depart);
    var l = ["Bonjour Alicia, je souhaite réserver " + CONFIG.nom + ".", "",
      "Arrivée : " + fmtLong.format(versDate(etat.arrivee)),
      "Départ : " + fmtLong.format(versDate(etat.depart)),
      "Nuits : " + nuits, "Voyageurs : " + etat.voyageurs, "",
      "Nom : " + f.nom.value.trim(), "Téléphone : " + f.tel.value.trim()];
    if (f.email.value.trim()) l.push("E-mail : " + f.email.value.trim());
    if (f.mot.value.trim()) l.push("", f.mot.value.trim());
    return l.join("\n");
  }
  function valide() {
    var f = formulaire.elements, ok = f.nom.value.trim().length > 1 && f.tel.value.replace(/\D/g, "").length >= 9;
    $("demande-erreur").hidden = ok;
    if (!ok) (f.nom.value.trim().length > 1 ? f.tel : f.nom).focus();
    return ok;
  }
  formulaire.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!valide()) return;
    var canal = (e.submitter && e.submitter.getAttribute("data-canal")) || principal.getAttribute("data-canal");
    if (canal === "sms") {
      window.location.href = "sms:" + CONFIG.tel + "?&body=" + encodeURIComponent(texteDemande());
    } else {
      var sujet = "Demande de séjour " + CONFIG.nom + ", du " + fmtCourt.format(versDate(etat.arrivee)) + " au " + fmtCourt.format(versDate(etat.depart));
      window.location.href = "mailto:" + CONFIG.mail + "?subject=" + encodeURIComponent(sujet) + "&body=" + encodeURIComponent(texteDemande());
    }
  });
  $("copier").addEventListener("click", function () {
    if (!valide()) return;
    var bouton = this;
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(texteDemande()).then(function () {
      bouton.textContent = "Demande copiée"; setTimeout(function () { bouton.textContent = "Copier la demande"; }, 2500);
    }, function () {});
  });

  // ---------- Les lodges : onglets ----------
  var onglets = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function choisir(o, focus) {
    onglets.forEach(function (x) {
      var actif = x === o, p = $(x.getAttribute("aria-controls"));
      x.setAttribute("aria-selected", actif ? "true" : "false");
      x.tabIndex = actif ? 0 : -1;
      p.hidden = !actif;
      p.classList.toggle("entre", actif && !calme);
    });
    if (focus) o.focus();
    o.scrollIntoView({ block: "nearest", inline: "nearest", behavior: calme ? "auto" : "smooth" });
  }
  onglets.forEach(function (o, i) {
    o.addEventListener("click", function () { choisir(o); });
    o.addEventListener("keydown", function (e) {
      var k = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (e.key === "Home") { e.preventDefault(); choisir(onglets[0], true); }
      else if (e.key === "End") { e.preventDefault(); choisir(onglets[onglets.length - 1], true); }
      else if (k) { e.preventDefault(); choisir(onglets[(i + k + onglets.length) % onglets.length], true); }
    });
  });

  // ---------- La piscine : la fenêtre s'ouvre au défilement ----------
  var piste = $("bassin-piste"), fenetreBassin = $("bassin-fenetre"), legende = $("bassin-legende");
  function borne(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function douce(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  var demande = false;
  function bassin() {
    demande = false;
    if (!piste.offsetParent) return; // masquée sur téléphone
    var r = piste.getBoundingClientRect(), course = r.height - window.innerHeight;
    var t = course > 0 ? borne(-r.top / course) : 1;
    var p = douce(borne((t + 0.08) / 0.62));
    fenetreBassin.style.setProperty("--p", p.toFixed(4));
    fenetreBassin.style.setProperty("--voile", borne((t - 0.35) / 0.3).toFixed(3));
    legende.style.setProperty("--l", douce(borne((t - 0.45) / 0.3)).toFixed(3));
  }
  if (!calme) {
    bassin();
    window.addEventListener("scroll", function () { if (!demande) { demande = true; requestAnimationFrame(bassin); } }, { passive: true });
    window.addEventListener("resize", bassin);
  }

  // ---------- Entête, navigation, filets ----------
  var entete = $("entete");
  window.addEventListener("scroll", function () { entete.classList.toggle("defile", window.scrollY > 8); }, { passive: true });
  if ("IntersectionObserver" in window) {
    var traces = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("vu"); traces.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -12% 0px" });
    document.querySelectorAll("[data-trace]").forEach(function (el) { traces.observe(el); });

    var liens = {};
    document.querySelectorAll(".nav a").forEach(function (a) { liens[a.getAttribute("href").slice(1)] = a; });
    var vues = new IntersectionObserver(function (es) {
      es.forEach(function (e) { var a = liens[e.target.id]; if (a) a.classList.toggle("ici", e.isIntersecting); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(liens).forEach(function (id) { var s = $(id); if (s) vues.observe(s); });

    // Barre mobile : visible dès que la carte de réservation sort de l'écran
    var carte = $("reserver");
    new IntersectionObserver(function (es) {
      var e = es[0], dessous = e.boundingClientRect.top < 0;
      var visible = !e.isIntersecting && dessous;
      barre.classList.toggle("visible", visible);
      barre.setAttribute("aria-hidden", visible ? "false" : "true");
    }).observe(carte);
  } else document.querySelectorAll("[data-trace]").forEach(function (el) { el.classList.add("vu"); });

  // ---------- Visionneuse ----------
  var visionneuse = $("visionneuse"), photos = Array.prototype.slice.call(document.querySelectorAll("[data-vue]")), rang = 0;
  function montrer(i) {
    rang = (i + photos.length) % photos.length;
    var img = photos[rang].querySelector("img");
    $("vision-img").src = img.currentSrc || img.src;
    $("vision-img").alt = img.alt;
    $("vision-legende").innerHTML = img.alt + "<small>" + (rang + 1) + " / " + photos.length + "</small>";
  }
  photos.forEach(function (b, i) { b.setAttribute("aria-label", "Agrandir : " + b.querySelector("img").alt); b.addEventListener("click", function () { montrer(i); ouvrir(visionneuse); }); });
  $("toutes-photos").addEventListener("click", function () { montrer(0); ouvrir(visionneuse); });
  $("photo-prec").addEventListener("click", function () { montrer(rang - 1); });
  $("photo-suiv").addEventListener("click", function () { montrer(rang + 1); });
  visionneuse.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") montrer(rang - 1);
    if (e.key === "ArrowRight") montrer(rang + 1);
  });
  var depart = null;
  visionneuse.addEventListener("touchstart", function (e) { depart = e.touches[0].clientX; }, { passive: true });
  visionneuse.addEventListener("touchend", function (e) {
    if (depart === null) return;
    var dx = e.changedTouches[0].clientX - depart; depart = null;
    if (Math.abs(dx) > 50) montrer(rang + (dx < 0 ? 1 : -1));
  });
  [visionneuse, fenetre].forEach(function (d) {
    d.addEventListener("click", function (e) { if (e.target === d || e.target.closest("[data-fermer]")) d.close(); });
    d.addEventListener("close", function () { if (lenis) lenis.start(); });
  });

  // ---------- Rideaux : titres ligne à ligne, photos qui se dévoilent ----------
  if (!calme && "IntersectionObserver" in window) {
    document.querySelectorAll("main h2").forEach(function (h) {
      if (h.closest(".resa") || h.closest(".bassin-legende")) return;
      h.innerHTML = h.innerHTML.split(/<br\s*\/?>/i).map(function (l) { return '<span class="ligne"><span>' + l.trim() + "</span></span>"; }).join("");
      h.classList.add("titre-anime");
    });
    var groupes = {};
    document.querySelectorAll(".vue").forEach(function (v) {
      if (v.closest("[hidden]")) return;
      v.classList.add("a-voir");
      var g = v.parentNode; groupes[g.className] = (groupes[g.className] || 0);
      v.style.transitionDelay = (Array.prototype.indexOf.call(g.children, v) * 0.12) + "s";
    });
    var rideaux = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("vu");
        rideaux.unobserve(e.target);
        if (e.target.classList.contains("vue")) setTimeout(function () { e.target.style.transitionDelay = ""; }, 2000);
      });
    }, { rootMargin: window.matchMedia("(max-width: 900px)").matches ? "0px 0px 12% 0px" : "0px 0px -10% 0px" });
    document.querySelectorAll(".titre-anime, .vue.a-voir").forEach(function (el) { rideaux.observe(el); });
  }

  // ---------- Profondeur : la photo d'ouverture et celle du rappel glissent plus lentement ----------
  var film = $("ouverture-film"), rappel = $("rappel-photo");
  if (!calme) {
    var demandeP = false;
    var parallaxe = function () {
      demandeP = false;
      var y = window.scrollY, h = window.innerHeight;
      if (y < h * 1.2) film.style.translate = "0 " + (y * 0.28).toFixed(1) + "px";
      if (rappel) {
        var r = rappel.parentNode.parentNode.getBoundingClientRect();
        if (r.bottom > 0 && r.top < h) {
          var k = (r.top + r.height / 2 - h / 2) / (h / 2 + r.height / 2);
          rappel.style.translate = "0 " + (k * r.height * 0.1).toFixed(1) + "px";
        }
      }
    };
    window.addEventListener("scroll", function () { if (!demandeP) { demandeP = true; requestAnimationFrame(parallaxe); } }, { passive: true });
    parallaxe();
  }

  // ---------- L'eau vivante : la piscine ondule doucement (WebGL), le reste de la photo reste immobile ----------
  (function eauVivante() {
    var toile = $("eau"), photo = $("eau-img");
    if (calme || !toile || !photo) return;
    var gl = toile.getContext("webgl", { alpha: false, antialias: false, depth: false, stencil: false, premultipliedAlpha: false });
    if (!gl) return;
    // Contour de l'eau sur la photo (coordonnées 0 à 1), sens horaire
    var BASSIN = [[0.381, 0.418], [0.553, 0.408], [0.772, 0.592], [0.712, 0.838], [0.152, 0.944]];
    var vs = "attribute vec2 a;varying vec2 v;void main(){v=vec2(a.x*.5+.5,.5-a.y*.5);gl_Position=vec4(a,0.,1.);}";
    var fs = [
      "#ifdef GL_FRAGMENT_PRECISION_HIGH", "precision highp float;", "#else", "precision mediump float;", "#endif",
      "uniform sampler2D uImg;uniform vec2 uRes;uniform vec2 uTaille;uniform vec2 uFocus;uniform float uT;uniform float uZoom;uniform vec2 uP[5];uniform vec2 uN[5];",
      "varying vec2 v;",
      "void main(){",
      "  float rc=uRes.x/uRes.y, ri=uTaille.x/uTaille.y;",
      "  vec2 s=rc>ri?vec2(1.,ri/rc):vec2(rc/ri,1.);",
      "  vec2 uv=((v-.5)/uZoom)*s+.5+(uFocus-.5)*(1.-s);",
      "  vec2 q=vec2(uv.x*ri,uv.y);",
      "  float d=1.;",
      "  for(int i=0;i<5;i++){ d=min(d,dot(q-uP[i],uN[i])); }",
      "  float m=smoothstep(0.,.045,d);",
      "  float pr=clamp((uv.y-.40)/.55,0.,1.);",
      "  vec2 p=vec2(q.x*mix(15.,8.,pr), uv.y*mix(70.,22.,pr));",
      "  float t=uT;",
      "  float w1=sin(p.x*1.00+t*.80+sin(p.y*.55+t*.45)*1.7);",
      "  float w2=sin(p.y*1.10-t*.95+sin(p.x*.70-t*.35)*1.5);",
      "  float w3=sin((p.x+p.y)*.62+t*.55);",
      "  vec2 dep=vec2(w1+.5*w3,w2+.4*w3)*vec2(.0013,.0019)*mix(.55,1.,pr)*m;",
      "  vec3 c=texture2D(uImg,uv+dep).rgb;",
      "  float k=sin(p.x*1.9+t*1.15+w2*2.1)*sin(p.y*1.6-t*.9+w1*2.3);",
      "  k=pow(max(k,0.),7.);",
      "  c+=k*.075*m*mix(.5,1.,pr)*vec3(.82,1.,.96);",
      "  gl_FragColor=vec4(c,1.);",
      "}"
    ].join("\n");
    function shader(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; }
    var sv = shader(gl.VERTEX_SHADER, vs), sf = shader(gl.FRAGMENT_SHADER, fs);
    if (!sv || !sf) return;
    var prog = gl.createProgram(); gl.attachShader(prog, sv); gl.attachShader(prog, sf); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var la = gl.getAttribLocation(prog, "a"); gl.enableVertexAttribArray(la); gl.vertexAttribPointer(la, 2, gl.FLOAT, false, 0, 0);
    var U = {}; ["uImg", "uRes", "uTaille", "uFocus", "uT", "uZoom", "uP", "uN"].forEach(function (n) { U[n] = gl.getUniformLocation(prog, n); });

    function preparer() {
      var w = photo.naturalWidth, h = photo.naturalHeight;
      if (!w || Math.max(w, h) > gl.getParameter(gl.MAX_TEXTURE_SIZE)) return;
      var tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, photo); } catch (e) { return; }
      gl.uniform1i(U.uImg, 0);
      gl.uniform2f(U.uTaille, w, h);
      // Bords du bassin, avec leurs normales tournées vers l'intérieur (espace corrigé du rapport largeur/hauteur)
      var r = w / h, P = BASSIN.map(function (p) { return [p[0] * r, p[1]]; }), pts = [], nor = [];
      var cx = 0, cy = 0; P.forEach(function (p) { cx += p[0] / P.length; cy += p[1] / P.length; });
      for (var i = 0; i < P.length; i++) {
        var A = P[i], B = P[(i + 1) % P.length], ex = B[0] - A[0], ey = B[1] - A[1], l = Math.hypot(ex, ey), nx = -ey / l, ny = ex / l;
        if ((cx - A[0]) * nx + (cy - A[1]) * ny < 0) { nx = -nx; ny = -ny; }
        pts.push(A[0], A[1]); nor.push(nx, ny);
      }
      gl.uniform2fv(U.uP, new Float32Array(pts)); gl.uniform2fv(U.uN, new Float32Array(nor));
      var pos = getComputedStyle(photo).objectPosition.split(" ").map(function (x) { return parseFloat(x) / 100; });
      gl.uniform2f(U.uFocus, isNaN(pos[0]) ? 0.5 : pos[0], isNaN(pos[1]) ? 0.5 : pos[1]);
      taille(); demarrer();
    }
    function taille() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2), w = Math.round(toile.clientWidth * dpr), h = Math.round(toile.clientHeight * dpr);
      if (toile.width !== w || toile.height !== h) { toile.width = w; toile.height = h; gl.viewport(0, 0, w, h); }
      gl.uniform2f(U.uRes, w, h);
      var pos = getComputedStyle(photo).objectPosition.split(" ").map(function (x) { return parseFloat(x) / 100; });
      if (!isNaN(pos[0])) gl.uniform2f(U.uFocus, pos[0], pos[1]);
    }
    var visible = true, enCours = false, t0 = performance.now(), premiere = true;
    function image(now) {
      if (!visible || document.hidden) { enCours = false; return; }
      var t = ((now - t0) / 1000) % 3600;
      gl.uniform1f(U.uT, t);
      gl.uniform1f(U.uZoom, 1 + 0.03 * (0.5 - 0.5 * Math.cos(t * Math.PI * 2 / 48)));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (premiere) { premiere = false; toile.classList.add("pret"); }
      requestAnimationFrame(image);
    }
    function demarrer() { if (!enCours) { enCours = true; requestAnimationFrame(image); } }
    window.addEventListener("resize", taille);
    document.addEventListener("visibilitychange", function () { if (!document.hidden) demarrer(); });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) demarrer(); }).observe(toile);
    toile.addEventListener("webglcontextlost", function (e) { e.preventDefault(); toile.classList.remove("pret"); visible = false; });
    if (photo.complete && photo.naturalWidth) preparer(); else photo.addEventListener("load", preparer);
  })();
})();
