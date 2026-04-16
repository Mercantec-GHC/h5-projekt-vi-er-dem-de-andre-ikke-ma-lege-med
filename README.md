---

##  Rapport

  [Projekt rapport (PDF)](rapport.pdf)

---

##  Repository

APP repo: [https://github.com/Mercantec-GHC/h5-projekt-vi-er-dem-de-andre-ikke-ma-lege-med](https://github.com/Mercantec-GHC/h5-projekt-vi-er-dem-de-andre-ikke-ma-lege-med/)
Accounts repo: [https://github.com/Mercantec-GHC/h5-projekt-vi-er-dem-de-andre-ikke-ma-lege-med](https://github.com/Mercantec-GHC/h5-projekt-vi-er-dem-de-andre-ikke-ma-lege-med-account-service)
API repo: [https://github.com/Mercantec-GHC/h5-projekt-vi-er-dem-de-andre-ikke-ma-lege-med](https://github.com/Mercantec-GHC/H5-Projekt-dem-vi-andre-ikke-m--lege-med-Backend)
IoT repo: [https://github.com/Mercantec-GHC/h5-projekt-vi-er-dem-de-andre-ikke-ma-lege-med](https://github.com/Mercantec-GHC/H5_Http_requester_pi)

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
