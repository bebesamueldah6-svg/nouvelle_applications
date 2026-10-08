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
- `main.js` — navigation, menu mobile, animations au défilement, visionneuse de la galerie, envoi du formulaire
- `google-sheets/Code.gs` — script Google Apps Script qui enregistre les inscriptions dans le tableur

Les images sont des photos Unsplash provisoires : remplacez les URL `src` par vos vraies photos.
Le formulaire d'inscription envoie chaque inscription dans un tableur Google Sheets : suivez le guide [`google-sheets/README.md`](google-sheets/README.md), puis collez l'URL du script dans `SHEET_URL` en haut de la section formulaire de `main.js`.
