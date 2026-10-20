# Fun House · livret d'accueil

Livret d'accueil numérique de la Fun House (Moidrey, baie du Mont-Saint-Michel), Conciergerie Clés des Merveilles.

En ligne : https://tomhodet.github.io/funhouse/

## Modifier un texte, un horaire, le wifi

Tout le contenu, en français et en anglais, est dans `content.js`.

1. Ouvrir `content.js` sur GitHub, cliquer sur le crayon.
2. Modifier uniquement le texte entre guillemets. Ne pas toucher aux virgules, crochets ni accolades.
3. Cliquer sur « Commit changes ». Le livret se met à jour en une à deux minutes.

Le code de la boîte à clés ne doit jamais figurer dans ce dépôt : il est envoyé au voyageur la veille de son arrivée.

## Photos

Les photos sont dans `img/`, en noir et blanc chaud. Pour en changer une, remplacer le fichier en gardant exactement le même nom et le même format.

Après un changement de photos, ouvrir `sw.js` et augmenter la version (`funhouse-v2` devient `funhouse-v3`) pour que les téléphones rechargent les images.

## Ancienne adresse

Le dossier `funhouse-app-netlify/` renvoie automatiquement vers la nouvelle adresse. Le garder : d'anciens messages peuvent encore pointer dessus.
