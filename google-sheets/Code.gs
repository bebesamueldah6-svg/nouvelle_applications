/**
 * WILD GYM — réception des inscriptions dans Google Sheets.
 *
 * À coller dans : Google Sheets > Extensions > Apps Script.
 * Puis : Déployer > Nouveau déploiement > Application Web
 *        (Exécuter en tant que : Moi / Accès : Tout le monde).
 * Voir google-sheets/README.md pour le guide complet.
 */

var SHEET_NAME = "Inscriptions";
var HEADERS = ["Date", "Nom", "E-mail", "Entraînement"];

function doPost(e) {
  var p = (e && e.parameter) || {};

  // Champ piège invisible : rempli uniquement par les robots.
  if (p.website) return json({ ok: true });

  var name = clean(p.name, 100);
  var email = clean(p.email, 200);
  var training = clean(p.training, 100);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "invalid" });
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    getSheet().appendRow([new Date(), name, email, training]);
  } finally {
    lock.releaseLock();
  }
  return json({ ok: true });
}

// Permet de vérifier dans le navigateur que le déploiement fonctionne.
function doGet() {
  return json({ ok: true, message: "WILD GYM : le script est en ligne." });
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Coupe les textes trop longs et neutralise les formules (=, +, -, @)
// pour qu'une saisie ne puisse pas s'exécuter dans le tableur.
function clean(value, max) {
  var s = String(value || "").trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
