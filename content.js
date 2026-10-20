/* ============================================================
   FUN HOUSE · LIVRET D'ACCUEIL · CONTENU
   ------------------------------------------------------------
   C'est le seul fichier à modifier pour mettre le livret à jour.
   Chaque texte existe en français (fr) et en anglais (en).
   Le code de la boîte à clés ne doit JAMAIS figurer ici :
   il est envoyé par message la veille de l'arrivée.
   ============================================================ */

window.FH_CONFIG = {
  "url": "https://tomhodet.github.io/funhouse/",
  "nomMaison": "Fun House",
  "lieu": "Moidrey · Pontorson · Normandie",
  "adresse": "",
  "capacite": {
    "voyageurs": 15,
    "chambres": 3,
    "couchages": 11,
    "sallesDeBain": 2
  },
  "wifi": {
    "reseau": "BBOX-E0B1A021",
    "motDePasse": "PnJfz9CNZT2bJd76LJ",
    "securite": "WPA"
  },
  "arrivee": "16:00",
  "depart": "11:00",
  "contact": {
    "prenom": "Alicia",
    "structure": "Conciergerie Clés des Merveilles",
    "telAffiche": "06 40 57 18 82",
    "telIntl": "+33640571882",
    "email": "conciergerieclesdesmerveilles@gmail.com",
    "site": "https://conciergerie-cdm.fr",
    "siteLogements": "https://conciergerie-cdm.fr/logements/",
    "instagram": "https://www.instagram.com/conciergerie_clesdesmerveilles/",
    "instagramHandle": "@conciergerie_clesdesmerveilles",
    "avisGoogle": "https://g.page/r/CY7K22PkeGIoEAE/review"
  },
  "smsDepart": {
    "fr": "Bonjour Alicia, nous venons de quitter la Fun House. Les clés sont dans la boîte. Merci pour tout !",
    "en": "Hello Alicia, we have just left the Fun House. The keys are in the lockbox. Thank you for everything!"
  },
  "smsDemande": {
    "fr": "Bonjour Alicia, nous sommes à la Fun House et nous aurions besoin de : ",
    "en": "Hello Alicia, we are staying at the Fun House and we would need: "
  },
  "smsTemps": {
    "fr": "Bonjour Alicia, serait-il possible d'avoir un peu plus de temps pour le départ de la Fun House ? Merci !",
    "en": "Hello Alicia, would it be possible to have a little more time before checking out of the Fun House? Thank you!"
  },
  "coordonnees": {
    "lat": 48.5786,
    "lon": -1.4898
  },
  "marees": "https://marine.meteoconsult.fr/meteo-marine/horaires-maree-mont-saint-michel-950-0.php"
};

window.FH_CONTENT = {
  "fr": {
    "langue": "Français",
    "meta": {
      "titre": "Fun House · Livret d'accueil",
      "description": "Tout pour votre séjour à la Fun House, à Moidrey : wifi, arrivée et départ, règles de la maison, bonnes adresses et contact de la conciergerie."
    },
    "accueil": {
      "sur": "Bienvenue",
      "sousTitre": "Une maison pour se retrouver",
      "lieu": "Moidrey · Pontorson · Normandie",
      "salut": {
        "matin": "Bonjour",
        "apresMidi": "Bonjour",
        "soir": "Bonsoir"
      },
      "soleil": {
        "coucher": "Ce soir, le soleil se couche sur la baie à {h}.",
        "lever": "Demain matin, le soleil se lève sur la baie à {h}.",
        "leverMatin": "Ce matin, le soleil se lève sur la baie à {h}."
      },
      "rapides": {
        "wifi": "Wifi",
        "appeler": "Appeler",
        "message": "Message",
        "partager": "Partager",
        "itineraire": "Itinéraire"
      },
      "sejour": {
        "titre": "Votre séjour",
        "arrivee": "Arrivée",
        "depart": "Départ",
        "aPartir": "à partir de",
        "avant": "avant",
        "lien": "Clés, linge et départ",
        "appeler": "Appeler Alicia",
        "message": "Message"
      },
      "sommaire": {
        "eyebrow": "Le livret",
        "titre": "Tout pour votre",
        "titreIt": "séjour"
      },
      "sections": [
        {
          "id": "arrivee",
          "titre": "Arrivée et départ",
          "sous": "Clés, linge, avant de partir",
          "court": "Arrivée et départ"
        },
        {
          "id": "wifi",
          "titre": "Le wifi",
          "sous": "Réseau, mot de passe, QR code",
          "court": "Wifi"
        },
        {
          "id": "maison",
          "titre": "La maison",
          "sous": "Photos, équipements, chambres",
          "court": "La maison"
        },
        {
          "id": "regles",
          "titre": "Règles et commandements",
          "sous": "Pour que la fête reste belle",
          "court": "Les règles"
        },
        {
          "id": "autour",
          "titre": "Autour de la Fun House",
          "sous": "Courses, tables, visites, plages",
          "court": "Alentours"
        },
        {
          "id": "conciergerie",
          "titre": "La conciergerie",
          "sous": "ULM, vélos, minibus, sur demande",
          "court": "Conciergerie"
        },
        {
          "id": "bruno",
          "titre": "Le mot de Bruno",
          "sous": "Pourquoi « Fun House »",
          "court": "Votre hôte"
        },
        {
          "id": "urgences",
          "titre": "Urgences",
          "sous": "Numéros utiles, appel direct",
          "court": "Urgences"
        },
        {
          "id": "avis",
          "titre": "Votre avis",
          "sous": "Merci pour votre visite",
          "court": "Votre avis"
        }
      ],
      "pied": {
        "reservation": "Réservation via Airbnb, Booking ou Abritel.",
        "autres": "Découvrir nos autres logements",
        "installer": "Garder le livret sur votre téléphone",
        "installerAide": "Dans Safari : bouton Partager, puis « Sur l'écran d'accueil ».",
        "installerAideAndroid": "Dans le menu du navigateur : « Ajouter à l'écran d'accueil »."
      },
      "ciel": {
        "eyebrow": "En ce moment sur la baie",
        "nuit": "Nuit claire",
        "vent": "Vent {v} km/h",
        "marees": "Horaires des marées",
        "coucher": "Coucher du soleil",
        "lever": "Lever du soleil",
        "codes": {
          "0": "Ciel dégagé",
          "1": "Plutôt dégagé",
          "2": "Quelques nuages",
          "3": "Ciel couvert",
          "45": "Brouillard",
          "48": "Brouillard givrant",
          "51": "Bruine légère",
          "53": "Bruine",
          "55": "Bruine dense",
          "56": "Bruine verglaçante",
          "57": "Bruine verglaçante",
          "61": "Pluie faible",
          "63": "Pluie",
          "65": "Pluie forte",
          "66": "Pluie verglaçante",
          "67": "Pluie verglaçante",
          "71": "Neige faible",
          "73": "Neige",
          "75": "Neige forte",
          "77": "Grésil",
          "80": "Averses",
          "81": "Averses",
          "82": "Fortes averses",
          "85": "Averses de neige",
          "86": "Averses de neige",
          "95": "Orage",
          "96": "Orage et grêle",
          "99": "Orage et grêle"
        },
        "coucherA": "Coucher du soleil à {h}",
        "leverA": "Lever du soleil à {h}"
      },
      "urgenceMini": "Appel direct",
      "flottant": {
        "wifi": "Wifi",
        "appeler": "Appeler",
        "message": "Message"
      }
    },
    "commun": {
      "retour": "Retour",
      "copier": "Copier",
      "copie": "Copié",
      "fermer": "Fermer",
      "itineraire": "Itinéraire",
      "plans": "Plans",
      "appeler": "Appeler",
      "sms": "SMS",
      "email": "E-mail",
      "voir": "Voir",
      "min": "min",
      "partagerTexte": "Le livret d'accueil de la Fun House",
      "lienCopie": "Lien copié",
      "ouvrir": "Ouvrir",
      "chapitre": "Chapitre"
    },
    "wifi": {
      "eyebrow": "Connexion",
      "titre": "Wifi",
      "titreIt": "de la maison",
      "reseau": "Réseau",
      "motDePasse": "Mot de passe",
      "qrTitre": "Pour le reste du groupe",
      "qrTexte": "Faites scanner ce code avec l'appareil photo d'un autre téléphone : il se connecte sans rien taper.",
      "box": "Un QR code de connexion est aussi collé sur la box internet.",
      "enceinte": "Une enceinte Bluetooth est à votre disposition dans la salle de jeux. À 23 h 30, la musique rentre à l'intérieur."
    },
    "arrivee": {
      "eyebrow": "Votre séjour",
      "titre": "Arrivée et",
      "titreIt": "départ",
      "arrivee": "Arrivée",
      "depart": "Départ",
      "aPartir": "à partir de",
      "avant": "avant",
      "cles": {
        "titre": "Les clés",
        "texte": "Le code de la boîte à clés vous est envoyé par message la veille de votre arrivée. Au départ, remettez les clés dans la boîte à code, à l'entrée de la maison."
      },
      "linge": {
        "titre": "Le linge",
        "texte": "Vos couchages ont été soigneusement préparés. Les serviettes de toilette sont posées sur les lits selon le nombre de couchages réservés. Vous en trouverez d'autres dans la salle de bain si besoin."
      },
      "temps": {
        "titre": "Besoin d'un peu plus de temps ?",
        "texte": "Pour arriver plus tôt ou partir plus tard, demandez à Alicia : elle fera au mieux selon le planning du ménage.",
        "bouton": "Demander à Alicia"
      },
      "checklist": {
        "titre": "Avant de partir",
        "texte": "Rien d'obligatoire, mais toujours apprécié : cela facilite le travail de la personne en charge du ménage, que nous remercions chaleureusement.",
        "items": [
          "La vaisselle est faite et rangée",
          "Le linge de lit et les serviettes utilisés sont rassemblés",
          "Les déchets sont triés et les poubelles vidées",
          "Fenêtres fermées, lumières et chauffage éteints",
          "Un dernier tour : chargeurs, frigo, salle de bain",
          "Les clés sont dans la boîte à code"
        ],
        "fini": "Tout est bon. Merci pour votre passage, et à très bientôt !",
        "prevenir": "Prévenir Alicia de notre départ",
        "reinit": "Réinitialiser la liste"
      }
    },
    "maison": {
      "eyebrow": "Faites comme chez vous",
      "titre": "La",
      "titreIt": "maison",
      "intro": "Une maison familiale et festive, pensée pour les séjours en groupe. L'espace jeux fait toute la différence, la cuisine donne sur le jardin clos, et le quartier reste calme : on en profite, on le respecte.",
      "chiffres": [
        {
          "n": "15",
          "l": "voyageurs"
        },
        {
          "n": "3",
          "l": "chambres"
        },
        {
          "n": "11",
          "l": "couchages"
        },
        {
          "n": "2",
          "l": "salles de bain"
        }
      ],
      "galerieTitre": "En images",
      "photos": [
        {
          "f": "g-salle",
          "l": "La salle de jeux"
        },
        {
          "f": "g-billard",
          "l": "Le billard et le bar"
        },
        {
          "f": "g-arcade",
          "l": "La borne d'arcade"
        },
        {
          "f": "g-flechettes",
          "l": "Fléchettes et baby-foot"
        },
        {
          "f": "g-guitares",
          "l": "Les guitares de Bruno"
        },
        {
          "f": "g-table",
          "l": "La grande table, le soir"
        },
        {
          "f": "g-cuisine",
          "l": "La cuisine, ouverte sur le jardin"
        },
        {
          "f": "g-poele",
          "l": "Le poêle à bois"
        },
        {
          "f": "g-chambre1",
          "l": "Chambre 1"
        },
        {
          "f": "g-chambre2",
          "l": "Chambre 2"
        },
        {
          "f": "g-chambre3",
          "l": "Chambre 3, les lits superposés"
        },
        {
          "f": "g-eau",
          "l": "Une des deux salles d'eau"
        },
        {
          "f": "g-buanderie",
          "l": "La buanderie"
        },
        {
          "f": "g-terrasse",
          "l": "La terrasse et le barbecue"
        },
        {
          "f": "g-jardin",
          "l": "Le jardin clos"
        },
        {
          "f": "g-animaux",
          "l": "Vos animaux sont les bienvenus"
        },
        {
          "f": "g-facade",
          "l": "La maison, côté rue"
        }
      ],
      "equipementsTitre": "Les équipements",
      "equipements": [
        {
          "i": "billard",
          "l": "Billard"
        },
        {
          "i": "arcade",
          "l": "Borne d'arcade"
        },
        {
          "i": "babyfoot",
          "l": "Baby-foot"
        },
        {
          "i": "flechettes",
          "l": "Fléchettes"
        },
        {
          "i": "bar",
          "l": "Mini-bar"
        },
        {
          "i": "guitare",
          "l": "Guitares et basses"
        },
        {
          "i": "vinyle",
          "l": "Platine vinyle"
        },
        {
          "i": "enceinte",
          "l": "Enceinte Bluetooth"
        },
        {
          "i": "cuisine",
          "l": "Cuisine équipée"
        },
        {
          "i": "lave-vaisselle",
          "l": "Lave-vaisselle"
        },
        {
          "i": "lave-linge",
          "l": "Lave-linge et sèche-linge"
        },
        {
          "i": "poele",
          "l": "Poêle à bois"
        },
        {
          "i": "barbecue",
          "l": "Barbecue"
        },
        {
          "i": "jardin",
          "l": "Jardin clos et terrasse"
        },
        {
          "i": "parking",
          "l": "Parking gratuit"
        },
        {
          "i": "bebe",
          "l": "Lit bébé et matelas à langer"
        },
        {
          "i": "fer",
          "l": "Fer et planche à repasser"
        },
        {
          "i": "animaux",
          "l": "Animaux bienvenus"
        }
      ],
      "chambresTitre": "Les chambres",
      "chambres": [
        {
          "t": "Chambre 1",
          "d": "Un lit double"
        },
        {
          "t": "Chambre 2",
          "d": "Un lit double, deux lits simples, un canapé-lit"
        },
        {
          "t": "Chambre 3",
          "d": "Un lit double, un canapé-lit, deux lits superposés, un lit bébé"
        }
      ],
      "instruments": {
        "titre": "Les instruments",
        "texte": "Les basses et guitares de Bruno sont à votre disposition. Rock star d'un soir autorisée, voisins toujours vivants, merci."
      },
      "modeEmploiTitre": "Comment ça marche",
      "modeEmploi": [
        {
          "t": "Le barbecue",
          "d": "Il s'utilise sur l'herbe."
        },
        {
          "t": "Les déchets",
          "d": "Merci de trier au mieux possible."
        },
        {
          "t": "La buanderie",
          "d": "Lave-linge et sèche-linge sont à votre disposition."
        },
        {
          "t": "La musique",
          "d": "Enceinte Bluetooth dans la salle de jeux. Dehors, elle se tait à 23 h 30."
        }
      ],
      "galerieAide": "Touchez une photo : la couleur revient."
    },
    "regles": {
      "eyebrow": "Pour que tout se passe bien",
      "titre": "Règles de la",
      "titreIt": "maison",
      "intro": "La Fun House est faite pour faire la fête tranquillement. Le voisinage, lui, n'est pas invité : on pense à lui.",
      "liste": [
        "Pas de voyageurs supplémentaires au-delà de la réservation",
        "Respecter les espaces communs",
        "Ne pas modifier l'agencement de la maison",
        "Interdiction de fumer à l'intérieur",
        "Le barbecue s'utilise sur l'herbe",
        "Musique extérieure interdite après 23 h 30",
        "Animaux bienvenus, merci de ramasser leurs déjections",
        "Merci de faire le tri au mieux possible",
        "Signaler tout problème rencontré à Alicia"
      ],
      "cmdEyebrow": "Règles de la fête",
      "cmdTitre": "Les 11",
      "cmdTitreIt": "commandements",
      "commandements": [
        [
          "La musique, tu kifferas... mais pas dehors après minuit.",
          "À partir de 23 h 30, on rentre les enceintes."
        ],
        [
          "La clope, tu fumeras, mais pas à l'intérieur du gîte.",
          ""
        ],
        [
          "Au-dessus du billard, tu ne picoleras point.",
          "Ta caution te remercie."
        ],
        [
          "Les guitares, tu gratouilleras.",
          "Rock star d'un soir autorisée (voisins toujours vivants, merci)."
        ],
        [
          "La vaisselle tu feras, avant de partir, propre elle sera.",
          ""
        ],
        [
          "La maison, comme la tienne tu traiteras.",
          "Les murs, tu préserveras."
        ],
        [
          "Le voisinage, tu ménageras.",
          "Ils ne sont pas invités, mais ils existent quand même."
        ],
        [
          "Les cadavres, tu ramasseras.",
          "Pas seulement tes copains..."
        ],
        [
          "Les idées débiles, tu éviteras.",
          "Non, un feu improvisé ou grimper sur le toit n'est jamais une bonne idée."
        ],
        [
          "La bonne ambiance, tu ramèneras.",
          "Le lieu, tu respecteras."
        ],
        [
          "On est des bonhommes, tout ce qu'on ingère, on le garde.",
          ""
        ]
      ],
      "signature": "Bruno, votre hôte",
      "cmdIntro": "Signé Bruno, votre hôte, et à appliquer avec le sourire."
    },
    "bruno": {
      "eyebrow": "Le mot de votre hôte",
      "titre": "Pourquoi",
      "titreIt": "Fun House ?",
      "salut": "Chers visiteurs, bonjour !",
      "paragraphes": [
        "Je suis votre hôte, Bruno, et vais me présenter un petit peu à vous si vous le permettez.",
        "J'ai fait l'acquisition de cette maison destinée à vous accueillir en mars 2026, et ai choisi de l'identifier en tant que « FUN HOUSE », référence pour moi à un album culte du groupe The Stooges (Iggy Pop) sorti en 1970.",
        "Je suis né en mai 1969 et ai été bercé très tôt, dès ma plus jeune adolescence, dans la musique rock'n'roll de tous styles (50's, 60's, 70's...), notamment et surtout avec le punk-rock de la fin des années 70 et du début des années 80.",
        "Je suis musicien, bassiste dès l'âge de 13 ans, et ai joué dans de nombreux groupes, dont le plus « important » a été les GUNNERS, avec 3 albums et plus de 500 concerts dans 8 pays d'Europe entre 1988 et 1998, puis une reformation en 2021, un nouvel album et une cinquantaine de dates supplémentaires, jusqu'en 2025. J'ai joué également dans d'autres groupes R'n'R ou punk-rock, dont TV MEN, TROTSKIDS...",
        "Je suis un passionné de musique et de live, à tel point que j'ai créé un club concert du nom de MONDO BIZARRO (référence à un album des Ramones de New York), que j'ai ouvert en 2002 à Rennes, pour y accueillir plus de 4000 shows de groupes et artistes du monde entier.",
        "J'ai malheureusement été contraint, par la crise Covid, de mettre un terme à cette belle aventure en 2021. J'ai ensuite repris un petit bar mythique du centre-ville de Rennes, La Trinquette, que j'ai revendu en mars 2026. Voilà un peu mon parcours.",
        "Si vous souhaitez utiliser les basses et guitares que vous trouverez ici, je les laisse bien volontiers à votre disposition. Vous souhaitant un agréable séjour, n'hésitez pas à laisser un petit mot dans notre livre d'or.",
        "Je tiens à remercier chaleureusement Alicia, de la conciergerie Clés des Merveilles, qui se tient à votre disposition pour toute demande supplémentaire.",
        "Enjoy your stay at Fun House !"
      ],
      "reperes": [
        "The Stooges, 1970",
        "Gunners",
        "Mondo Bizarro, Rennes",
        "La Trinquette"
      ],
      "signature": "Bruno"
    },
    "conciergerie": {
      "eyebrow": "Sur demande",
      "titre": "La",
      "titreIt": "conciergerie",
      "intro": "Alicia et la conciergerie Clés des Merveilles sont à votre disposition pendant tout le séjour. Un besoin, une envie : un message suffit.",
      "services": [
        {
          "i": "ulm",
          "t": "Survoler la baie en ULM",
          "d": "Avec notre partenaire ULM Experiences. Vols de 10 minutes à 1 heure, départ de Saint-Georges-de-Gréhaigne.",
          "cta": "Demander"
        },
        {
          "i": "velo",
          "t": "La baie à vélo",
          "d": "Vélos loués auprès de Bik'in Baie, parcours GPS inclus, pour découvrir Pontorson et le Mont en liberté.",
          "cta": "Demander"
        },
        {
          "i": "bus",
          "t": "Minibus 9 places",
          "d": "Pour les déplacements en groupe. Il peut vous attendre directement à la gare de Pontorson.",
          "cta": "Demander"
        },
        {
          "i": "repas",
          "t": "La Lunch Box du Mont",
          "d": "Un repas de produits locaux, prêt quand vous en avez besoin, pour visiter sans perdre de temps.",
          "cta": "Commander"
        },
        {
          "i": "table",
          "t": "Une table au Grillon",
          "d": "Grill, bar et crêperie à Pontorson : cuisine traditionnelle, crêpes, galettes et grillades. Nous réservons pour vous.",
          "cta": "Réserver"
        },
        {
          "i": "fete",
          "t": "Un anniversaire à fêter ?",
          "d": "Gâteau, bougies, ballons, cadeau : une attention simple qui fait toujours plaisir.",
          "cta": "Demander"
        },
        {
          "i": "plus",
          "t": "Et toutes vos envies",
          "d": "Adaptateur de prise, lit bébé, fruits de mer, bonne bouteille, bagagerie, petit-déjeuner, balade à cheval, hélicoptère, ménage supplémentaire.",
          "cta": "Demander"
        }
      ],
      "contactTitre": "Joindre Alicia",
      "dispo": "Joignable pour toute question ou tout problème pendant votre séjour."
    },
    "autour": {
      "eyebrow": "Sorties et bonnes adresses",
      "titre": "Autour de la",
      "titreIt": "Fun House",
      "intro": "Pontorson est la porte d'entrée de la baie. Les distances sont données depuis Moidrey, en voiture, à titre indicatif.",
      "onglets": [
        {
          "id": "courses",
          "l": "Courses",
          "items": [
            {
              "t": "Coccimarket",
              "s": "64 rue Couesnon, Pontorson · 8 h à 22 h, 7 j/7",
              "km": "4 km",
              "min": "6",
              "q": "Coccimarket, 64 Rue Couesnon, 50170 Pontorson"
            },
            {
              "t": "Carrefour Market",
              "s": "Pontorson",
              "km": "4 km",
              "min": "6",
              "q": "Carrefour Market Pontorson"
            },
            {
              "t": "Lidl",
              "s": "Pontorson",
              "km": "4 km",
              "min": "7",
              "q": "Lidl Pontorson"
            },
            {
              "t": "Intermarché",
              "s": "Pleine-Fougères",
              "km": "9 km",
              "min": "12",
              "q": "Intermarché Pleine-Fougères"
            },
            {
              "t": "Bazarland",
              "s": "Pontorson, bazar et équipement de la maison",
              "km": "4 km",
              "min": "7",
              "q": "Bazarland Pontorson"
            }
          ]
        },
        {
          "id": "restaurants",
          "l": "Restaurants",
          "items": [
            {
              "t": "Le Grillon",
              "s": "37 rue Couesnon, Pontorson · grill, bar, crêperie",
              "km": "4 km",
              "min": "6",
              "q": "Le Grillon, 37 Rue Couesnon, 50170 Pontorson"
            },
            {
              "t": "La Casa de Quentin",
              "s": "Pontorson · cuisine traditionnelle normande",
              "km": "4 km",
              "min": "6",
              "q": "La Casa de Quentin, Pontorson"
            },
            {
              "t": "Le Bistrot du Mont",
              "s": "Beauvoir, sur la route du Mont",
              "km": "5 km",
              "min": "7",
              "q": "Le Bistrot du Mont, Beauvoir"
            },
            {
              "t": "McDonald's",
              "s": "Pontorson",
              "km": "4 km",
              "min": "6",
              "q": "McDonald's Pontorson"
            }
          ]
        },
        {
          "id": "visites",
          "l": "Visites",
          "items": [
            {
              "t": "Le Mont-Saint-Michel",
              "s": "Parking de la Caserne, puis navette ou marche. Beau tôt le matin et au coucher du soleil.",
              "km": "7 km",
              "min": "10",
              "q": "Parking du Mont-Saint-Michel, La Caserne"
            },
            {
              "t": "Le moulin de Moidrey",
              "s": "Moulin à vent de 1806, restauré, vue sur la baie. À deux pas de la maison.",
              "km": "2 km",
              "min": "4",
              "q": "Moulin de Moidrey"
            },
            {
              "t": "Alligator Bay",
              "s": "Beauvoir · alligators, tortues et serpents, sur la route du Mont",
              "km": "5 km",
              "min": "6",
              "q": "Alligator Bay, Beauvoir"
            },
            {
              "t": "Accrobranche Récré Nature",
              "s": "Forêt de Trans-la-Forêt",
              "km": "17 km",
              "min": "22",
              "q": "Récré Nature, Trans-la-Forêt"
            },
            {
              "t": "Parc de l'Ange Michel",
              "s": "Saint-Martin-de-Landelles · parc d'attractions familial",
              "km": "30 km",
              "min": "36",
              "q": "Parc Ange Michel, Saint-Martin-de-Landelles"
            },
            {
              "t": "Hippodrome de Moidrey",
              "s": "Courses hippiques plusieurs fois par an, balades à poney pour les enfants",
              "km": "2 km",
              "min": "4",
              "q": "Hippodrome de Moidrey"
            }
          ]
        },
        {
          "id": "plages",
          "l": "Plages",
          "items": [
            {
              "t": "Plage de Cherrueix",
              "s": "Char à voile et grandes marées, côté Bretagne",
              "km": "22 km",
              "min": "24",
              "q": "Plage de Cherrueix"
            },
            {
              "t": "Plage de Jullouville",
              "s": "Sable fin, côté Normandie",
              "km": "43 km",
              "min": "44",
              "q": "Plage de Jullouville"
            },
            {
              "t": "Cancale",
              "s": "Les huîtres sur le port, le sentier des douaniers",
              "km": "44 km",
              "min": "43",
              "q": "Port de la Houle, Cancale"
            }
          ]
        },
        {
          "id": "villes",
          "l": "Villes",
          "items": [
            {
              "t": "Pontorson",
              "s": "Commerces, gare, départ de la voie verte vers le Mont",
              "km": "4 km",
              "min": "6",
              "q": "Pontorson"
            },
            {
              "t": "Avranches",
              "s": "Le Scriptorial, le jardin des Plantes et sa vue sur la baie",
              "km": "20 km",
              "min": "21",
              "q": "Avranches"
            },
            {
              "t": "Dol-de-Bretagne",
              "s": "La cathédrale, le menhir du Champ-Dolent",
              "km": "24 km",
              "min": "23",
              "q": "Dol-de-Bretagne"
            },
            {
              "t": "Saint-Malo",
              "s": "La ville close, les remparts, le Fort National à marée basse",
              "km": "51 km",
              "min": "46",
              "q": "Saint-Malo Intra-Muros"
            },
            {
              "t": "Granville",
              "s": "La Haute-Ville, le port, la maison Christian Dior",
              "km": "47 km",
              "min": "48",
              "q": "Granville"
            }
          ]
        }
      ],
      "note": "Temps de trajet en voiture depuis Moidrey, hors trafic. Les horaires d'ouverture sont à vérifier sur place ou sur la fiche du lieu.",
      "maree": {
        "titre": "Horaires des marées",
        "texte": "La mer monte vite dans la baie. Vérifiez l'heure de la marée avant toute balade sur la grève, et préférez une traversée guidée."
      }
    },
    "urgences": {
      "eyebrow": "En cas de besoin",
      "titre": "Numéros",
      "titreIt": "d'urgence",
      "intro": "Appel direct en touchant un numéro. Depuis un téléphone étranger, le 112 fonctionne partout en Europe.",
      "liste": [
        {
          "n": "112",
          "t": "Urgences, tous services",
          "s": "Numéro européen, depuis tout téléphone",
          "prio": true
        },
        {
          "n": "15",
          "t": "SAMU",
          "s": "Urgence médicale"
        },
        {
          "n": "18",
          "t": "Pompiers",
          "s": "Incendie, accident, secours"
        },
        {
          "n": "17",
          "t": "Police, gendarmerie",
          "s": ""
        },
        {
          "n": "114",
          "t": "Urgence par SMS",
          "s": "Personnes sourdes ou malentendantes",
          "sms": true
        },
        {
          "n": "196",
          "t": "Urgence en mer",
          "s": "Baie, plage et littoral"
        },
        {
          "n": "3237",
          "t": "Pharmacie de garde",
          "s": "Service audiotel, 0,35 €/min"
        }
      ],
      "alicia": "Pour tout le reste, Alicia est là."
    },
    "avis": {
      "eyebrow": "Votre avis",
      "titre": "Merci pour votre",
      "titreIt": "visite",
      "texte": "Ce fut un vrai plaisir de vous avoir parmi nous. Vous avez apprécié votre séjour ? Un avis sur la plateforme de réservation et sur Google nous donne de la force.",
      "google": "Laisser un avis Google",
      "plateforme": "Pensez aussi à l'avis sur votre plateforme de réservation.",
      "bientot": "À très bientôt",
      "autres": "Nos autres logements autour de la baie",
      "reservation": "Réservation via Airbnb, Booking ou Abritel."
    }
  },
  "en": {
    "langue": "English",
    "meta": {
      "titre": "Fun House · Welcome guide",
      "description": "Everything for your stay at the Fun House, Moidrey: wifi, check-in and check-out, house rules, good addresses and the concierge's contact."
    },
    "accueil": {
      "sur": "Welcome",
      "sousTitre": "A house to get together",
      "lieu": "Moidrey · Pontorson · Normandy",
      "salut": {
        "matin": "Good morning",
        "apresMidi": "Good afternoon",
        "soir": "Good evening"
      },
      "soleil": {
        "coucher": "Tonight, the sun sets over the bay at {h}.",
        "lever": "Tomorrow morning, the sun rises over the bay at {h}.",
        "leverMatin": "This morning, the sun rises over the bay at {h}."
      },
      "rapides": {
        "wifi": "Wifi",
        "appeler": "Call",
        "message": "Text",
        "partager": "Share",
        "itineraire": "Directions"
      },
      "sejour": {
        "titre": "Your stay",
        "arrivee": "Check-in",
        "depart": "Check-out",
        "aPartir": "from",
        "avant": "before",
        "lien": "Keys, linen and leaving",
        "appeler": "Call Alicia",
        "message": "Text"
      },
      "sommaire": {
        "eyebrow": "The guide",
        "titre": "Everything for your",
        "titreIt": "stay"
      },
      "sections": [
        {
          "id": "arrivee",
          "titre": "Check-in and check-out",
          "sous": "Keys, linen, before you leave",
          "court": "Check-in and out"
        },
        {
          "id": "wifi",
          "titre": "Wifi",
          "sous": "Network, password, QR code",
          "court": "Wifi"
        },
        {
          "id": "maison",
          "titre": "The house",
          "sous": "Photos, amenities, bedrooms",
          "court": "The house"
        },
        {
          "id": "regles",
          "titre": "Rules and commandments",
          "sous": "So the party stays a good one",
          "court": "House rules"
        },
        {
          "id": "autour",
          "titre": "Around the Fun House",
          "sous": "Shops, tables, sights, beaches",
          "court": "Around"
        },
        {
          "id": "conciergerie",
          "titre": "The concierge",
          "sous": "Microlight, bikes, minibus, on request",
          "court": "Concierge"
        },
        {
          "id": "bruno",
          "titre": "A word from Bruno",
          "sous": "Why “Fun House”",
          "court": "Your host"
        },
        {
          "id": "urgences",
          "titre": "Emergency",
          "sous": "Useful numbers, one-tap call",
          "court": "Emergency"
        },
        {
          "id": "avis",
          "titre": "Your review",
          "sous": "Thank you for staying",
          "court": "Your review"
        }
      ],
      "pied": {
        "reservation": "Bookings via Airbnb, Booking or Abritel.",
        "autres": "Discover our other homes",
        "installer": "Keep the guide on your phone",
        "installerAide": "In Safari: tap Share, then “Add to Home Screen”.",
        "installerAideAndroid": "In the browser menu: “Add to Home screen”."
      },
      "ciel": {
        "eyebrow": "Right now over the bay",
        "nuit": "Clear night",
        "vent": "Wind {v} km/h",
        "marees": "Tide times",
        "coucher": "Sunset",
        "lever": "Sunrise",
        "codes": {
          "0": "Clear sky",
          "1": "Mostly clear",
          "2": "Some clouds",
          "3": "Overcast",
          "45": "Fog",
          "48": "Freezing fog",
          "51": "Light drizzle",
          "53": "Drizzle",
          "55": "Heavy drizzle",
          "56": "Freezing drizzle",
          "57": "Freezing drizzle",
          "61": "Light rain",
          "63": "Rain",
          "65": "Heavy rain",
          "66": "Freezing rain",
          "67": "Freezing rain",
          "71": "Light snow",
          "73": "Snow",
          "75": "Heavy snow",
          "77": "Sleet",
          "80": "Showers",
          "81": "Showers",
          "82": "Heavy showers",
          "85": "Snow showers",
          "86": "Snow showers",
          "95": "Thunderstorm",
          "96": "Thunder and hail",
          "99": "Thunder and hail"
        },
        "coucherA": "Sunset at {h}",
        "leverA": "Sunrise at {h}"
      },
      "urgenceMini": "One-tap call",
      "flottant": {
        "wifi": "Wifi",
        "appeler": "Call",
        "message": "Text"
      }
    },
    "commun": {
      "retour": "Back",
      "copier": "Copy",
      "copie": "Copied",
      "fermer": "Close",
      "itineraire": "Directions",
      "plans": "Maps",
      "appeler": "Call",
      "sms": "Text",
      "email": "Email",
      "voir": "See",
      "min": "min",
      "partagerTexte": "The Fun House welcome guide",
      "lienCopie": "Link copied",
      "ouvrir": "Open",
      "chapitre": "Chapter"
    },
    "wifi": {
      "eyebrow": "Connection",
      "titre": "House",
      "titreIt": "wifi",
      "reseau": "Network",
      "motDePasse": "Password",
      "qrTitre": "For the rest of the group",
      "qrTexte": "Have the others scan this code with their phone camera: it connects without typing anything.",
      "box": "A connection QR code is also stuck on the internet box.",
      "enceinte": "A Bluetooth speaker is available in the games room. At 11:30 pm, the music moves indoors."
    },
    "arrivee": {
      "eyebrow": "Your stay",
      "titre": "Check-in and",
      "titreIt": "check-out",
      "arrivee": "Check-in",
      "depart": "Check-out",
      "aPartir": "from",
      "avant": "before",
      "cles": {
        "titre": "The keys",
        "texte": "The lockbox code is sent to you by message the day before your arrival. When you leave, please put the keys back in the lockbox at the entrance of the house."
      },
      "linge": {
        "titre": "Linen and towels",
        "texte": "Your beds have been carefully prepared. Towels are placed on the beds according to the number of beds booked. You will find more in the bathroom if needed."
      },
      "temps": {
        "titre": "Need a little more time?",
        "texte": "To arrive earlier or leave later, ask Alicia: she will do her best depending on the cleaning schedule.",
        "bouton": "Ask Alicia"
      },
      "checklist": {
        "titre": "Before you leave",
        "texte": "Nothing mandatory, but always appreciated: it makes the housekeeper's work easier, and we warmly thank her for it.",
        "items": [
          "The dishes are done and put away",
          "Used bed linen and towels are gathered",
          "Waste is sorted and bins emptied",
          "Windows closed, lights and heating off",
          "One last look: chargers, fridge, bathroom",
          "The keys are in the lockbox"
        ],
        "fini": "All done. Thank you for staying, and see you soon!",
        "prevenir": "Tell Alicia we have left",
        "reinit": "Reset the list"
      }
    },
    "maison": {
      "eyebrow": "Make yourself at home",
      "titre": "The",
      "titreIt": "house",
      "intro": "A family house made for groups and good times. The games room makes all the difference, the kitchen opens onto the enclosed garden, and the neighbourhood stays quiet: enjoy it, respect it.",
      "chiffres": [
        {
          "n": "15",
          "l": "guests"
        },
        {
          "n": "3",
          "l": "bedrooms"
        },
        {
          "n": "11",
          "l": "beds"
        },
        {
          "n": "2",
          "l": "bathrooms"
        }
      ],
      "galerieTitre": "In pictures",
      "photos": [
        {
          "f": "g-salle",
          "l": "The games room"
        },
        {
          "f": "g-billard",
          "l": "Pool table and bar"
        },
        {
          "f": "g-arcade",
          "l": "The arcade cabinet"
        },
        {
          "f": "g-flechettes",
          "l": "Darts and table football"
        },
        {
          "f": "g-guitares",
          "l": "Bruno's guitars"
        },
        {
          "f": "g-table",
          "l": "The big table, at night"
        },
        {
          "f": "g-cuisine",
          "l": "The kitchen, opening onto the garden"
        },
        {
          "f": "g-poele",
          "l": "The wood stove"
        },
        {
          "f": "g-chambre1",
          "l": "Bedroom 1"
        },
        {
          "f": "g-chambre2",
          "l": "Bedroom 2"
        },
        {
          "f": "g-chambre3",
          "l": "Bedroom 3, the bunk beds"
        },
        {
          "f": "g-eau",
          "l": "One of the two shower rooms"
        },
        {
          "f": "g-buanderie",
          "l": "The laundry"
        },
        {
          "f": "g-terrasse",
          "l": "The terrace and barbecue"
        },
        {
          "f": "g-jardin",
          "l": "The enclosed garden"
        },
        {
          "f": "g-animaux",
          "l": "Pets are welcome"
        },
        {
          "f": "g-facade",
          "l": "The house from the street"
        }
      ],
      "equipementsTitre": "Amenities",
      "equipements": [
        {
          "i": "billard",
          "l": "Pool table"
        },
        {
          "i": "arcade",
          "l": "Arcade cabinet"
        },
        {
          "i": "babyfoot",
          "l": "Table football"
        },
        {
          "i": "flechettes",
          "l": "Darts"
        },
        {
          "i": "bar",
          "l": "Mini bar"
        },
        {
          "i": "guitare",
          "l": "Guitars and basses"
        },
        {
          "i": "vinyle",
          "l": "Record player"
        },
        {
          "i": "enceinte",
          "l": "Bluetooth speaker"
        },
        {
          "i": "cuisine",
          "l": "Fitted kitchen"
        },
        {
          "i": "lave-vaisselle",
          "l": "Dishwasher"
        },
        {
          "i": "lave-linge",
          "l": "Washer and dryer"
        },
        {
          "i": "poele",
          "l": "Wood stove"
        },
        {
          "i": "barbecue",
          "l": "Barbecue"
        },
        {
          "i": "jardin",
          "l": "Enclosed garden and terrace"
        },
        {
          "i": "parking",
          "l": "Free parking"
        },
        {
          "i": "bebe",
          "l": "Travel cot and changing mat"
        },
        {
          "i": "fer",
          "l": "Iron and ironing board"
        },
        {
          "i": "animaux",
          "l": "Pets welcome"
        }
      ],
      "chambresTitre": "The bedrooms",
      "chambres": [
        {
          "t": "Bedroom 1",
          "d": "One double bed"
        },
        {
          "t": "Bedroom 2",
          "d": "One double bed, two single beds, one sofa bed"
        },
        {
          "t": "Bedroom 3",
          "d": "One double bed, one sofa bed, two bunk beds, one travel cot"
        }
      ],
      "instruments": {
        "titre": "The instruments",
        "texte": "Bruno's basses and guitars are at your disposal. Rock star for one night allowed, neighbours still alive, please."
      },
      "modeEmploiTitre": "How things work",
      "modeEmploi": [
        {
          "t": "The barbecue",
          "d": "Use it on the grass."
        },
        {
          "t": "Waste",
          "d": "Please sort your waste as best you can."
        },
        {
          "t": "The laundry",
          "d": "Washer and dryer are at your disposal."
        },
        {
          "t": "Music",
          "d": "Bluetooth speaker in the games room. Outside, it goes quiet at 11:30 pm."
        }
      ],
      "galerieAide": "Tap a photo to bring back the colour."
    },
    "regles": {
      "eyebrow": "So that everything goes well",
      "titre": "House",
      "titreIt": "rules",
      "intro": "The Fun House is made for partying peacefully. The neighbours are not invited: let's think of them.",
      "liste": [
        "No additional guests beyond the booking",
        "Respect the common areas",
        "Do not change the layout of the house",
        "No smoking indoors",
        "The barbecue is used on the grass",
        "No outdoor music after 11:30 pm",
        "Pets welcome, please pick up after them",
        "Please sort your waste as best you can",
        "Report any issue to Alicia"
      ],
      "cmdEyebrow": "Party rules",
      "cmdTitre": "The 11",
      "cmdTitreIt": "commandments",
      "commandements": [
        [
          "Thou shalt enjoy the music... but not outside after midnight.",
          "From 11:30 pm, the speakers come inside."
        ],
        [
          "Thou shalt smoke, but never inside the house.",
          ""
        ],
        [
          "Over the pool table, thou shalt not drink.",
          "Your deposit thanks you."
        ],
        [
          "Thou shalt strum the guitars.",
          "Rock star for one night allowed (neighbours still alive, please)."
        ],
        [
          "Thou shalt do the dishes, and before you leave, clean they shall be.",
          ""
        ],
        [
          "Thou shalt treat the house as thine own.",
          "Thou shalt spare the walls."
        ],
        [
          "Thou shalt spare the neighbours.",
          "They are not invited, but they exist all the same."
        ],
        [
          "Thou shalt pick up the dead soldiers.",
          "The empty bottles, not just your mates..."
        ],
        [
          "Thou shalt avoid stupid ideas.",
          "No, an improvised fire or climbing onto the roof is never a good idea."
        ],
        [
          "Thou shalt bring the good vibes.",
          "Thou shalt respect the place."
        ],
        [
          "We are tough guys: whatever goes in, stays in.",
          ""
        ]
      ],
      "signature": "Bruno, your host",
      "cmdIntro": "Signed by Bruno, your host, to be followed with a smile."
    },
    "bruno": {
      "eyebrow": "A word from your host",
      "titre": "Why",
      "titreIt": "Fun House?",
      "salut": "Dear visitors, hello!",
      "paragraphes": [
        "I am your host, Bruno, and I would like to introduce myself a little, if you allow me.",
        "I acquired this house, intended to welcome you, in March 2026, and I chose to name it “FUN HOUSE”, a reference to a cult album by The Stooges (Iggy Pop) released in 1970.",
        "I was born in May 1969 and was exposed very early, from my early teenage years, to rock'n'roll of all styles (50's, 60's, 70's...), and above all to the punk-rock of the late 70s and early 80s.",
        "I am a musician, a bassist since the age of 13, and have played in many bands. The most “important” was the GUNNERS, with 3 albums and over 500 concerts in 8 European countries between 1988 and 1998, then a reunion in 2021, a new album and about 50 more dates until 2025. I have also played in other R'n'R and punk-rock bands, including TV MEN, TROTSKIDS...",
        "I am so passionate about music and live shows that I created a concert club called MONDO BIZARRO (a reference to an album by the Ramones of New York), which I opened in 2002 in Rennes and which hosted over 4000 shows by bands and artists from all over the world.",
        "Unfortunately, the Covid crisis forced me to end this beautiful adventure in 2021. I then took over a small legendary bar in downtown Rennes, La Trinquette, which I sold in March 2026. That is a bit about my journey.",
        "If you wish to use the basses and guitars you will find here, they are gladly at your disposal. Wishing you a very pleasant stay, feel free to leave a little note in our guestbook.",
        "I would like to warmly thank Alicia, from the Clés des Merveilles concierge service, who is at your disposal for any additional request.",
        "Enjoy your stay at Fun House!"
      ],
      "reperes": [
        "The Stooges, 1970",
        "Gunners",
        "Mondo Bizarro, Rennes",
        "La Trinquette"
      ],
      "signature": "Bruno"
    },
    "conciergerie": {
      "eyebrow": "On request",
      "titre": "The",
      "titreIt": "concierge",
      "intro": "Alicia and the Clés des Merveilles concierge service are at your disposal throughout your stay. A need, a wish: one message is enough.",
      "services": [
        {
          "i": "ulm",
          "t": "Fly over the bay in a microlight",
          "d": "With our partner ULM Experiences. Flights from 10 minutes to 1 hour, departing from Saint-Georges-de-Gréhaigne.",
          "cta": "Ask"
        },
        {
          "i": "velo",
          "t": "The bay by bike",
          "d": "Bikes rented from Bik'in Baie, GPS routes included, to explore Pontorson and the Mont freely.",
          "cta": "Ask"
        },
        {
          "i": "bus",
          "t": "9-seat minibus",
          "d": "For group travel. It can wait for you directly at Pontorson station.",
          "cta": "Ask"
        },
        {
          "i": "repas",
          "t": "The Mont Lunch Box",
          "d": "A meal of local produce, ready when you need it, to visit without wasting time.",
          "cta": "Order"
        },
        {
          "i": "table",
          "t": "A table at Le Grillon",
          "d": "Grill, bar and crêperie in Pontorson: traditional cooking, crêpes, galettes and grilled meats. We book for you.",
          "cta": "Book"
        },
        {
          "i": "fete",
          "t": "A birthday to celebrate?",
          "d": "Cake, candles, balloons, a gift: a simple touch that always pleases.",
          "cta": "Ask"
        },
        {
          "i": "plus",
          "t": "And whatever you wish",
          "d": "Plug adapter, travel cot, seafood, a good bottle, luggage storage, breakfast, horse ride, helicopter, extra cleaning.",
          "cta": "Ask"
        }
      ],
      "contactTitre": "Reach Alicia",
      "dispo": "Available for any question or issue during your stay."
    },
    "autour": {
      "eyebrow": "Outings and good addresses",
      "titre": "Around the",
      "titreIt": "Fun House",
      "intro": "Pontorson is the gateway to the bay. Distances are from Moidrey, by car, as an indication.",
      "onglets": [
        {
          "id": "courses",
          "l": "Shops",
          "items": [
            {
              "t": "Coccimarket",
              "s": "64 rue Couesnon, Pontorson · 8 am to 10 pm, every day",
              "km": "4 km",
              "min": "6",
              "q": "Coccimarket, 64 Rue Couesnon, 50170 Pontorson"
            },
            {
              "t": "Carrefour Market",
              "s": "Pontorson",
              "km": "4 km",
              "min": "6",
              "q": "Carrefour Market Pontorson"
            },
            {
              "t": "Lidl",
              "s": "Pontorson",
              "km": "4 km",
              "min": "7",
              "q": "Lidl Pontorson"
            },
            {
              "t": "Intermarché",
              "s": "Pleine-Fougères",
              "km": "9 km",
              "min": "12",
              "q": "Intermarché Pleine-Fougères"
            },
            {
              "t": "Bazarland",
              "s": "Pontorson, household goods",
              "km": "4 km",
              "min": "7",
              "q": "Bazarland Pontorson"
            }
          ]
        },
        {
          "id": "restaurants",
          "l": "Restaurants",
          "items": [
            {
              "t": "Le Grillon",
              "s": "37 rue Couesnon, Pontorson · grill, bar, crêperie",
              "km": "4 km",
              "min": "6",
              "q": "Le Grillon, 37 Rue Couesnon, 50170 Pontorson"
            },
            {
              "t": "La Casa de Quentin",
              "s": "Pontorson · traditional Norman cooking",
              "km": "4 km",
              "min": "6",
              "q": "La Casa de Quentin, Pontorson"
            },
            {
              "t": "Le Bistrot du Mont",
              "s": "Beauvoir, on the road to the Mont",
              "km": "5 km",
              "min": "7",
              "q": "Le Bistrot du Mont, Beauvoir"
            },
            {
              "t": "McDonald's",
              "s": "Pontorson",
              "km": "4 km",
              "min": "6",
              "q": "McDonald's Pontorson"
            }
          ]
        },
        {
          "id": "visites",
          "l": "Sights",
          "items": [
            {
              "t": "Mont-Saint-Michel",
              "s": "La Caserne car park, then shuttle or walk. Beautiful early morning and at sunset.",
              "km": "7 km",
              "min": "10",
              "q": "Parking du Mont-Saint-Michel, La Caserne"
            },
            {
              "t": "Moidrey windmill",
              "s": "An 1806 windmill, restored, with a view over the bay. Right next to the house.",
              "km": "2 km",
              "min": "4",
              "q": "Moulin de Moidrey"
            },
            {
              "t": "Alligator Bay",
              "s": "Beauvoir · alligators, turtles and snakes, on the road to the Mont",
              "km": "5 km",
              "min": "6",
              "q": "Alligator Bay, Beauvoir"
            },
            {
              "t": "Récré Nature tree climbing",
              "s": "Forêt de Trans-la-Forêt",
              "km": "17 km",
              "min": "22",
              "q": "Récré Nature, Trans-la-Forêt"
            },
            {
              "t": "Ange Michel park",
              "s": "Saint-Martin-de-Landelles · family amusement park",
              "km": "30 km",
              "min": "36",
              "q": "Parc Ange Michel, Saint-Martin-de-Landelles"
            },
            {
              "t": "Moidrey racecourse",
              "s": "Horse races several times a year, pony rides for children",
              "km": "2 km",
              "min": "4",
              "q": "Hippodrome de Moidrey"
            }
          ]
        },
        {
          "id": "plages",
          "l": "Beaches",
          "items": [
            {
              "t": "Cherrueix beach",
              "s": "Sand yachting and big tides, on the Brittany side",
              "km": "22 km",
              "min": "24",
              "q": "Plage de Cherrueix"
            },
            {
              "t": "Jullouville beach",
              "s": "Fine sand, on the Normandy side",
              "km": "43 km",
              "min": "44",
              "q": "Plage de Jullouville"
            },
            {
              "t": "Cancale",
              "s": "Oysters on the harbour, the customs officers' path",
              "km": "44 km",
              "min": "43",
              "q": "Port de la Houle, Cancale"
            }
          ]
        },
        {
          "id": "villes",
          "l": "Towns",
          "items": [
            {
              "t": "Pontorson",
              "s": "Shops, train station, start of the greenway to the Mont",
              "km": "4 km",
              "min": "6",
              "q": "Pontorson"
            },
            {
              "t": "Avranches",
              "s": "The Scriptorial, the botanical garden and its view over the bay",
              "km": "20 km",
              "min": "21",
              "q": "Avranches"
            },
            {
              "t": "Dol-de-Bretagne",
              "s": "The cathedral, the Champ-Dolent menhir",
              "km": "24 km",
              "min": "23",
              "q": "Dol-de-Bretagne"
            },
            {
              "t": "Saint-Malo",
              "s": "The walled city, the ramparts, Fort National at low tide",
              "km": "51 km",
              "min": "46",
              "q": "Saint-Malo Intra-Muros"
            },
            {
              "t": "Granville",
              "s": "The Upper Town, the harbour, the Christian Dior house",
              "km": "47 km",
              "min": "48",
              "q": "Granville"
            }
          ]
        }
      ],
      "note": "Driving times from Moidrey, without traffic. Opening hours should be checked on site or on the place's listing.",
      "maree": {
        "titre": "Tide times",
        "texte": "The tide comes in fast in the bay. Check the tide times before walking out onto the sands, and prefer a guided crossing."
      }
    },
    "urgences": {
      "eyebrow": "If you need help",
      "titre": "Emergency",
      "titreIt": "numbers",
      "intro": "Tap a number to call. From a foreign phone, 112 works everywhere in Europe.",
      "liste": [
        {
          "n": "112",
          "t": "Emergency, all services",
          "s": "European number, from any phone",
          "prio": true
        },
        {
          "n": "15",
          "t": "SAMU",
          "s": "Medical emergency"
        },
        {
          "n": "18",
          "t": "Fire brigade",
          "s": "Fire, accident, rescue"
        },
        {
          "n": "17",
          "t": "Police",
          "s": ""
        },
        {
          "n": "114",
          "t": "Emergency by text",
          "s": "For deaf or hard of hearing people",
          "sms": true
        },
        {
          "n": "196",
          "t": "Sea rescue",
          "s": "Bay, beach and coast"
        },
        {
          "n": "3237",
          "t": "Duty pharmacy",
          "s": "Phone service, €0.35/min"
        }
      ],
      "alicia": "For everything else, Alicia is here."
    },
    "avis": {
      "eyebrow": "Your review",
      "titre": "Thank you for",
      "titreIt": "staying with us",
      "texte": "It was a real pleasure to have you with us. Did you enjoy your stay? A review on your booking platform and on Google means a lot to us.",
      "google": "Leave a Google review",
      "plateforme": "Please also leave a review on your booking platform.",
      "bientot": "See you soon",
      "autres": "Our other homes around the bay",
      "reservation": "Bookings via Airbnb, Booking or Abritel."
    }
  }
};
