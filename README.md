# Gig‑Grid

> **Cross‑platform merch marketplace for bands and fans**
> Front‑end: React Native + Expo (this repo) • Back‑end: ⚙️ _to be implemented by the backend team_

---

## ✨ Project vision

Gig‑Grid makes it effortless for independent musicians to list and sell their merchandise worldwide. Fans discover bands, browse product lines, place orders, and pay securely—everything from a single mobile app (and later a web PWA).

- **Target users**: Indie/unsigned bands, small record labels, and their fan communities.
- **Phase 1**: Catalogue → Cart → Checkout with Stripe.
  Admin features (inventory, analytics) will ship in Phase 2.

---

## 🗂️ Repo structure (front‑end)

```
.
├── App.js                # Root component / navigation entry
├── app.json              # Expo app metadata (name, slug, icons)
├── assets/               # Images, fonts, icons
├── src/
│   ├── components/       # Reusable UI widgets
│   ├── screens/          # Home, Band, Cart, Checkout, etc.
│   ├── store/            # Zustand or Context state (cart)
│   └── lib/              # API clients, helpers
└── package.json          # Dependencies & scripts
```

---

## 🚀 Getting started (front‑end)

```bash
# Prereqs: Node >= 18, npm >= 9
npm install          # 1️⃣ Install JS deps
npx expo start       # 2️⃣ Run Metro bundler, then press 'a' or 'i' to open the app
```

Environment variables are read from **.env** (managed by `expo-constants` or `react-native-dotenv`).
Create `.env.local` for local overrides.

```
API_BASE_URL=https://api.dev.gig-grid.com/v1
STRIPE_PUBLISHABLE_KEY=pk_test_···
```

---

## 🔌 API contract (DRAFT)

| Method | Endpoint                   | Purpose                                        |
| ------ | -------------------------- | ---------------------------------------------- |
| `GET`  | `/bands`                   | List all bands with basic profile & hero image |
| `GET`  | `/bands/{bandId}/products` | All merch for a band                           |
| `POST` | `/cart`                    | Create / update a user’s cart                  |
| `POST` | `/checkout`                | Return Stripe payment‑intent client secret     |
| `GET`  | `/orders`                  | Auth required – order history                  |

_Auth_: Bearer JWT (issued by `/auth/login` or social OAuth). &#x20;
_Pagination_: `?limit=20&cursor=…` cursor‑based.

_Back‑end developer owns final schema; keep this table updated as routes solidify._

---

## 🤝 Working in parallel

**Frontend** (Rahul) and **Backend** (Jason) share only the HTTP contract & env vars.

1. **Define** endpoint signatures in `/docs/api.md` or an OpenAPI spec draft.
2. Front‑end hits **mock servers** (e.g. [mockoon.com](https://mockoon.com)) until real endpoints are ready.
3. Once backend pushes to `dev` URL, update `API_BASE_URL` and point the mobile app there.

---

## 📚 Scripts & tooling

| Script                    | Description                                |
| ------------------------- | ------------------------------------------ |
| `npm start`               | Alias for `expo start`                     |
| `npm run ios` / `android` | Shortcut: build & open respective platform |
| `npm run lint`            | ESLint + Prettier check                    |
| `npm run test`            | Jest (unit tests)                          |
| `eas build`               | Cloud build via Expo Application Services  |

---

## 🗒️ Branching & PR workflow

- **main** – production‑ready mobile code. \\
- **dev** – integration branch (optional). \\
- `feat/*`, `fix/*`, `chore/*` – short‑lived topic branches.

```bash
# Example front‑end iteration
git checkout -b feat/cart-checkout
# code → commit → push
# then create PR → review → squash‑merge into main
```

Back‑end team mirrors the same naming pattern in their repo.

---

## 🛂 Coding conventions

- **TypeScript** strongly recommended once complexity grows (>3 screens). &#x20;
  Migrate file‑by‑file (`.js` → `.tsx`).
- **nativewind** for utility‑class styling (Tailwind). &#x20;
  Design tokens live in `tailwind.config.js`.
- **Zustand** for global state (cart, auth). &#x20;
  Avoid Redux unless scale demands.

---

## 📌 Roadmap (Q3 2025)

- \[x] Milestone 0 – Expo blank template
- \[x] Milestone 1 – Static list & UI
- \[x] Milestone 2 – Navigation
- \[ ] Milestone 3 – Firestore/Supabase integration
- \[ ] Milestone 4 – Cart & Checkout
- \[ ] Milestone 5 – CI/CD via EAS & TestFlight

---

## 📝 License

> Gig‑Grid brand and logo © 2025 Rahul Mishra.
