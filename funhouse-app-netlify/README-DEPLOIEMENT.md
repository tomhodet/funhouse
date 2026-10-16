# Fun House · livret d'accueil (mini-app)

Site statique, sans construction, sans dépendance. Tout le dossier se dépose tel quel sur Netlify.

## Mettre en ligne (5 minutes)

1. Netlify (compte DelorIA) → **Add new site → Deploy manually** → glisser ce dossier entier.
2. Site settings → **Domain management → Add a domain** → `funhouse.conciergerie-cdm.fr`.
   Les DNS de conciergerie-cdm.fr sont déjà chez Netlify : l'enregistrement est créé automatiquement, le certificat HTTPS suit en quelques minutes.
3. Ouvrir `https://funhouse.conciergerie-cdm.fr` sur un iPhone et un Android : vidéo, boutons Appeler et SMS, QR wifi.
4. Le QR code imprimé (`qr/qr-app.svg`) pointe déjà vers cette adresse. Si l'adresse change, le QR doit être regénéré.

Pour tester avant le domaine : l'adresse `xxx.netlify.app` fonctionne aussi, mais ne l'imprimez pas et ne l'envoyez pas aux voyageurs (elle n'est pas dans le QR et ne fait pas premium dans un SMS).

## Mettre à jour le contenu

- **Textes, horaires, wifi, adresses, services** : un seul fichier, `content.js` (français puis anglais, même structure). Le bloc `FH_CONFIG` en haut contient wifi, horaires, téléphone, adresse de la maison, messages SMS pré-remplis.
- **Photos** : dossier `img/`, deux tailles par photo (`nom.webp` 1200 px et `nom-s.webp` 640 px). La liste des photos affichées est dans `content.js` (`maison.photos`).
- **Vidéo d'accueil** : `video/hero.mp4` (720 × 1280, muette, moins de 1,5 Mo) et son image fixe `video/hero-poster.webp`.
- Après chaque modification : changer `VERSION` dans `sw.js` (par ex. `funhouse-v2`) puis redéposer le dossier sur Netlify. Sans ce changement, les téléphones qui ont déjà ouvert le livret peuvent garder l'ancienne version hors ligne quelques jours.

Ce qui n'est **jamais** dans l'app : le code de la boîte à clés. Il se donne par message la veille, comme aujourd'hui.

## Envoyer le livret

SMS type, la veille de l'arrivée (à placer dans Solène ou dans le message automatique de la plateforme) :

> Bonjour, votre séjour à la Fun House commence demain. Tout est dans votre livret d'accueil : wifi, arrivée, règles de la maison, bonnes adresses et mon contact. https://funhouse.conciergerie-cdm.fr
> Le code de la boîte à clés : …
> À demain, Alicia

Les voyageurs peuvent le partager à tout le groupe depuis le bouton Partager, et l'ajouter à l'écran d'accueil de leur téléphone (il s'ouvre alors comme une app, même sans réseau).

## Ce que fait l'app

- Ouverture : la clé du logo CDM se dessine, puis le logo apparaît (une fois par session, jamais si le téléphone est réglé en mouvements réduits).
- Accueil en vidéo (clips filmés par Alicia), français ou anglais selon la langue du téléphone, bascule FR / EN.
- Wifi : copie en un geste, QR code de connexion à faire scanner par les autres téléphones du groupe.
- Arrivée et départ : horaires, clés, linge, demande de délai par SMS, liste « avant de partir » à cocher, bouton « prévenir Alicia » avec message pré-rempli.
- La maison : photos plein écran, équipements, chambres, instruments, mode d'emploi.
- Règles et les 11 commandements de Bruno.
- La conciergerie : services avec demande par SMS pré-rempli.
- Autour : courses, restaurants, visites, plages, villes, avec distances réelles depuis Moidrey et itinéraires Google Maps / Plans.
- Urgences : appel direct, 112, 15, 18, 17, 114 (SMS), 196, pharmacie de garde.
- Avis Google, partage, mode sombre automatique, consultation hors ligne après la première ouverture.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | page unique |
| `styles.css` | charte CDM (crème, nacre, encre, ardoise, or) |
| `app.js` | navigation, interactions, QR wifi, checklist |
| `content.js` | **tout le contenu, FR et EN** |
| `cle.js` | tracé vectoriel de la clé du logo, pour l'ouverture |
| `qrcode.min.js` | génération du QR wifi (bibliothèque MIT, Kazuhiko Arase) |
| `sw.js` | mise en cache hors ligne |
| `manifest.webmanifest`, `icons/` | ajout à l'écran d'accueil |
| `_headers`, `netlify.toml` | réglages Netlify |
| `preview.html` | version pour l'aperçu claude.ai, inutile sur Netlify |
