# Gig‑Grid

> **Cross‑platform merch marketplace for bands and fans**
> Front‑end: React Native + Expo • Back‑end: AWS Amplify (AppSync + DataStore)

---

## 📌 Project vision

Gig‑Grid empowers independent musicians to list and sell merch worldwide via a real‑time, offline‑ready mobile app. Fans can discover bands, browse product lines, add to cart, and complete checkout seamlessly.

---

## 🗂 Repo structure

```
.
├── App.js                    # Entry point: navigation setup
├── app.json                  # Expo configuration
├── assets/                   # Images, fonts
├── src/
│   ├── components/           # Reusable UI components (e.g., CartButton)
│   ├── screens/              # Screens: HomeScreen, BandScreen, CartScreen, Checkout…
│   ├── store/                # Global state with Zustand (cartStore.js)
│   ├── models/               # Amplify DataStore models (auto-generated)
│   └── aws-exports.js        # Amplify configuration (auto-generated)
├── amplify/                  # Amplify backend definitions
└── package.json              # Dependencies & scripts
```

---

## 🚀 Getting started

1. **Clone & install**

   ```bash
   git clone https://github.com/noisegatemusicstudio/gig-grid.git
   cd gig-grid
   npm install
   ```

2. **Configure Amplify**
   Ensure you have AWS credentials in `~/.aws/credentials` under profile `giggrid-main`.

   ```bash
   amplify pull --envName prod --profile giggrid-main
   ```

3. **Run the app**

   ```bash
   npx expo start -c
   ```

   - Press **a** (Android) or **i** (iOS), or scan the QR code.
   - Home screen loads live band data via DataStore.

---

## 🔄 Milestone summary

|  #  | Completed                            |
| :-: | ------------------------------------ |
|  0  | Expo blank template                  |
|  1  | Static list UI                       |
|  2  | Navigation (Home ↔ Detail)           |
|  3  | Real‑time data via Amplify DataStore |
|  4  | Cart flow (Zustand + Cart screen)    |

---

## 🛒 Cart & state management (Milestone 4)

- **Zustand** manages global cart (`src/store/cartStore.js`)
- **CartButton** in header with live badge (`src/components/CartButton.js`)
- **CartScreen** lists items, quantities, subtotal, and clear/remove actions
- **HomeScreen** and **BandScreen** import and use cart store

---

## 🛠 Scripts & tooling

| Command           | Description                 |
| ----------------- | --------------------------- |
| `npm start`       | `expo start`                |
| `npm run ios`     | iOS simulator               |
| `npm run android` | Android emulator            |
| `npm run lint`    | ESLint + Prettier           |
| `npm run test`    | Jest unit tests             |
| `amplify push`    | Deploy backend updates      |
| `amplify pull`    | Sync backend config locally |

---

## 🏷 Branching & PRs

- **main** – production
- **feat/**\* – feature branches
- **fix/**\* – bug fixes
- **chore/**\* – tooling/config

> Example:
>
> ```bash
> git checkout -b feat/checkout
> # code → git commit -m "feat: integrate Stripe checkout"
> git push -u origin feat/checkout
> ```

---

## 📅 Next steps (Milestone 5)

- **Integrate Stripe**: `@stripe/stripe-react-native` for payments
- **Persist orders**: Add `Order` model in GraphQL schema → DataStore
- **Order history**: Screen listing completed orders
- **CI/CD**: Set up EAS build and TestFlight/Play Store publishing

---

## 📖 Learning resources

- **React Native + Expo**: docs.expo.dev
- **AWS Amplify**: amplify.aws/docs
- **GraphQL + AppSync**: docs.aws.amazon.com/appsync
- **Zustand**: docs.pmnd.rs/zustand

---
