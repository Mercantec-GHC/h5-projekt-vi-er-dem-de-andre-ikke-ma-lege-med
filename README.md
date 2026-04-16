---

##  Rapport

-  [Projekt rapport (PDF)](rapport.pdf)

---

##  Repository

-  GitHub repo: https://github.com/Mercantec-GHC/h5-projekt-vi-er-dem-de-andre-ikke-ma-lege-med

---

##  Opstarts guide

Projektet kan startes på to måder:

---

### Kør med Docker

Sørg for at du har Docker installeret.

```bash
docker build -t h5-projekt .
docker run -p 5173:5173 h5-projekt
```
Alternativt 
```bash
npm i
npm run dev
```
