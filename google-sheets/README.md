# Recevoir les inscriptions dans Google Sheets

Chaque inscription du formulaire « Réservez votre séance gratuite » ajoute une ligne
dans votre tableur : **Date · Nom · E-mail · Entraînement**.

Comptez environ 10 minutes. Vous n'avez besoin que d'un compte Google.

## 1. Créer le tableur

1. Allez sur https://sheets.google.com et créez une **feuille vierge**.
2. Nommez-la, par exemple `WILD GYM – Inscriptions`.

## 2. Ajouter le script

1. Dans le tableur, menu **Extensions → Apps Script**.
2. Supprimez tout le code présent dans `Code.gs`.
3. Collez à la place **tout** le contenu du fichier [`Code.gs`](Code.gs) de ce dossier.
4. Cliquez sur l'icône **Enregistrer** (la disquette).

## 3. Mettre le script en ligne

1. En haut à droite : **Déployer → Nouveau déploiement**.
2. Cliquez sur la roue dentée ⚙️ à côté de « Sélectionner le type », puis choisissez **Application Web**.
3. Réglez :
   - **Exécuter en tant que** : *Moi*
   - **Qui a accès** : *Tout le monde*
4. Cliquez sur **Déployer**.
5. Google demande une autorisation : **Autoriser l'accès** → choisissez votre compte.
   Si un écran « Google n'a pas validé cette application » apparaît, cliquez sur
   **Paramètres avancés**, puis **Accéder à … (non sécurisé)**, puis **Autoriser**.
   C'est normal : c'est votre propre script.
6. **Copiez l'URL de l'application Web**. Elle ressemble à
   `https://script.google.com/macros/s/AKfy.../exec`.

Pour vérifier : collez cette URL dans votre navigateur. Vous devez voir
`{"ok":true,"message":"WILD GYM : le script est en ligne."}`.

## 4. Brancher le site

Dans `main.js`, remplacez :

```js
var SHEET_URL = "";
```

par votre URL :

```js
var SHEET_URL = "https://script.google.com/macros/s/AKfy.../exec";
```

Enregistrez et poussez sur GitHub. Le site se met à jour en 1 à 2 minutes.
Vous pouvez aussi simplement m'envoyer l'URL, et je fais la modification.

## 5. Tester

Remplissez le formulaire sur votre site. Une nouvelle ligne doit apparaître dans
l'onglet **Inscriptions** du tableur. L'onglet et ses en-têtes sont créés
automatiquement à la première inscription.

## Bon à savoir

- **Si vous modifiez `Code.gs` plus tard** : faites **Déployer → Gérer les déploiements →
  ✏️ Modifier → Version : Nouvelle version → Déployer**. Sinon, l'ancienne version
  reste active. L'URL ne change pas.
- **Être prévenu à chaque inscription** : dans le tableur, menu **Outils →
  Règles de notification** → « Des modifications sont apportées » → « Par e-mail, immédiatement ».
- **Protection** : un champ invisible bloque les robots les plus simples, et les saisies
  commençant par `=`, `+`, `-` ou `@` sont neutralisées pour ne pas s'exécuter comme des formules.
