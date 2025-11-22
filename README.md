# 🎮 REAL LIFE+

**Le simulateur social où ta vraie vie alimente celle de ton avatar**

## 🌟 Concept

REAL LIFE+ est un jeu mobile qui fusionne réalité et virtuel. Tes actions dans la vraie vie (marche, visites de lieux, activités) boostent ton avatar dans le jeu.

### Features principales :

- **👤 Avatar Customisable** - Crée ton personnage unique avec des milliers de combinaisons
- **🎨 Système Style** - Gacha de vêtements, fashion battles, classements
- **👫 Relations Sociales** - Rencontres, amitiés, soirées VIP, crush
- **💼 Carrière & Argent** - Jobs évolutifs (serveur → influenceur → entrepreneur)
- **🏡 Maison & Déco** - Achète, rénove, décore ta maison
- **🏃 Tracking IRL** - Tes pas, tes visites de lieux réels = récompenses in-game
- **📹 TikTok Ready** - Créé des vidéos virales de ton avatar
- **💰 Économie Réaliste** - Crédit bancaire, investissements, business

## 🏗️ Architecture

```
realif/
├── apps/
│   ├── mobile/          # React Native + Expo app
│   └── backend/         # NestJS API
├── packages/
│   ├── shared/          # Types TypeScript partagés
│   ├── ui/              # Components UI réutilisables
│   └── game-engine/     # Logique de jeu core
```

## 🚀 Tech Stack

### Mobile
- **Framework**: React Native + Expo (SDK 52)
- **Language**: TypeScript (strict mode)
- **Animations**: React Native Reanimated 3 + Skia
- **Navigation**: Expo Router
- **State**: Zustand + TanStack Query
- **Storage**: AsyncStorage + MMKV

### Backend
- **Framework**: NestJS
- **Database**: PostgreSQL + Prisma ORM
- **Cache**: Redis
- **Real-time**: Socket.io
- **Auth**: Supabase Auth

### Services
- **Hosting**: Railway / Render
- **Storage**: Cloudflare R2
- **Monetization**: RevenueCat
- **Analytics**: PostHog
- **Crash Reports**: Sentry

## 🛠️ Getting Started

### Prérequis

- Node.js 18+
- npm ou yarn
- Expo CLI
- iOS Simulator (Mac) ou Android Studio

### Installation

```bash
# Clone le repo
git clone <your-repo-url>
cd realif

# Install dependencies
npm install

# Install mobile dependencies
cd apps/mobile && npm install

# Start mobile app
npm run mobile
```

### Développement

```bash
# Start mobile (choose iOS/Android/Web)
npm run mobile

# Start backend
npm run backend

# Run linter
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

## 📱 Build & Deploy

### iOS

```bash
# Development build
npm run mobile:ios

# Production build
npm run mobile:build:ios
```

### Android

```bash
# Development build
npm run mobile:android

# Production build
npm run mobile:build:android
```

## 🎯 Roadmap

### Phase 1 - MVP (Semaine 1-3)
- [x] Architecture projet
- [ ] Système avatar + customisation
- [ ] Gacha vêtements basique
- [ ] Tracking podomètre
- [ ] Export vidéo TikTok

### Phase 2 - Core Features (Semaine 4-6)
- [ ] Système relations sociales
- [ ] Jobs & économie
- [ ] Maison & déco
- [ ] Events en temps réel

### Phase 3 - Polish & Scale (Semaine 7-8)
- [ ] Optimisation performances
- [ ] Monétisation complète
- [ ] Analytics & metrics
- [ ] Tests utilisateurs

### Phase 4 - Launch (Semaine 9-10)
- [ ] Beta testing
- [ ] Marketing TikTok/Instagram
- [ ] Soft launch
- [ ] Global launch

## 💰 Modèle de Monétisation

1. **Gacha Mode** - Vêtements rares
2. **Pass VIP** - Accès premium hebdo/mensuel
3. **Boosts** - Énergie, popularité, argent
4. **Events Limités** - Fashion Week, soirées exclusives
5. **Jobs Premium** - Influenceur, mannequin
6. **Maison & Déco** - Meubles rares

## 📄 License

Proprietary - All rights reserved

## 👤 Author

Développé avec 🔥 pour créer le prochain jeu viral
