# EFTA Ambatobe — Site Web v2.0
## Architecture Multi-Pages

---

### Structure du projet

```
EFTA_v2/
├── index.html              ← Page d'accueil (allégée)
├── formations.html         ← Détail BTSA + AC/AE + Débouchés
├── admission.html          ← Processus + Dossier + FAQ + Calendrier
├── vie-campus.html         ← Vie scolaire + Équipe pédagogique
├── partenaires.html        ← Partenaires + Réseau EFTA national
├── actualites.html         ← Actualités avec filtres par catégorie
├── contact.html            ← Coordonnées + Carte + Formulaire
│
├── assets/
│   └── pictures/           ← Vos images (remplacer les placeholders)
│
└── src/
    ├── components/
    │   ├── navbar.html     ← Navbar partagée (injectée automatiquement)
    │   └── footer.html     ← Footer partagé (injecté automatiquement)
    ├── css/
    │   ├── global.css      ← Variables, navbar, footer, animations
    │   ├── home.css        ← Styles spécifiques à l'accueil
    │   ├── formations.css  ← Styles page formations
    │   ├── admission.css   ← Styles page admission (FAQ, calendrier)
    │   └── pages.css       ← Styles partagés (vie campus, actus, contact)
    └── js/
        ├── main.js         ← Script global (composants, reveal, FAQ...)
        └── chatbot.js      ← Chatbot assistant EFTA
```

---

### Avant la mise en ligne — À personnaliser

Recherchez et remplacez ces placeholders dans tous les fichiers HTML :

| Placeholder         | À remplacer par                          |
|---------------------|------------------------------------------|
| `[EMAIL_CONTACT]`   | Email officiel de l'EFTA                 |
| `[TELEPHONE]`       | Numéro de téléphone de l'école           |
| `[ANNEE_CONCOURS]`  | Année du prochain concours (ex: 2026)    |
| `[ANNEE_SCOLAIRE]`  | Ex: 2025-2026                            |
| `[DATE_OUVERTURE]`  | Date d'ouverture des candidatures        |
| `[DATE_CLOTURE]`    | Date de clôture des dossiers             |
| `[DATE_CONCOURS]`   | Date du concours national                |
| `[DATE_RESULTATS]`  | Date de publication des résultats        |
| `[DATE_RENTREE]`    | Date de rentrée scolaire                 |
| `[DATE_CEREMONIE]`  | Date de la cérémonie des diplômes        |
| `[DATE_PARTENARIAT]`| Date actualité GSDM                      |
| `[DATE_ACTU]`       | Dates des autres actualités              |
| `[ANNEE]`           | Année de promotion actuelle              |

### Images à remplacer

- `assets/pictures/hero.webp` → Grande photo du campus ou d'étudiants
- `assets/pictures/actu-img1.webp` → Photo cérémonie de diplômes
- Ajouter des photos pour chaque actualité

### Google Maps

Dans `contact.html`, remplacez l'iframe src par le lien embed Google Maps exact de l'EFTA Ambatobe.

### Équipe pédagogique

Dans `vie-campus.html`, remplacez les `[Nom du Directeur]`, `[Enseignant 1]`, etc. avec les vraies informations.

### Réseaux sociaux

Dans `src/components/footer.html`, mettez à jour les liens Facebook/YouTube/LinkedIn.

---

### Comment fonctionne le système de composants

La navbar et le footer sont dans `src/components/`. Ils sont chargés automatiquement par `main.js` via `fetch()` dans chaque page :

```html
<!-- Dans chaque page HTML -->
<div id="navbar-placeholder"></div>
...contenu...
<div id="footer-placeholder"></div>
<script src="./src/js/main.js" defer></script>
```

**Important** : Pour que le `fetch()` fonctionne, le site doit être servi via un serveur HTTP (pas en ouvrant les fichiers directement dans le navigateur). Options :
- En local : `npx serve .` ou l'extension Live Server de VS Code
- En production : n'importe quel hébergement web standard

---

### Nouvelles sections ajoutées (v2)

- ✅ **Témoignages** (index.html) — 3 cartes d'anciens étudiants
- ✅ **CTA Admission** (index.html) — Bloc d'appel à l'action clair
- ✅ **Débouchés professionnels** (formations.html) — 6 catégories de métiers
- ✅ **FAQ** (admission.html) — 7 questions/réponses accordéon
- ✅ **Calendrier des dates clés** (admission.html) — Timeline visuelle
- ✅ **Équipe pédagogique** (vie-campus.html) — Présentation de l'équipe
- ✅ **Filtres actualités** (actualites.html) — Par catégorie

---

*EFTA Ambatobe — École publique sous tutelle MINAE · Décret N°2017-765*
