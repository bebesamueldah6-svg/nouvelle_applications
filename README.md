# WILD GYM — Page d'accueil

Page d'accueil statique de WILD GYM, salle de sport premium en plein air dans la jungle de Bali.

## Tester en local (localhost)

Aucune installation n'est nécessaire. Dans le dossier du projet :

```bash
python3 -m http.server 8000
```

Puis ouvrez **http://localhost:8000** dans votre navigateur.

Alternative avec Node.js : `npx serve .` (puis ouvrez l'adresse affichée).

## Fichiers

- `index.html` — structure (hero, présentation, 3 entraînements, citation, galerie, inscription, pied de page)
- `styles.css` — palette jungle, texture bois générée, mise en page responsive
- `main.js` — navigation, menu mobile, animations au défilement, visionneuse de la galerie, validation du formulaire

Les images sont des photos Unsplash provisoires : remplacez les URL `src` par vos vraies photos.
Le formulaire d'inscription fonctionne uniquement côté navigateur : il faut le connecter à votre service de réservation ou d'e-mail.
