# 📚 REAL LIFE+ - Documentation Technique

## 🏗️ Architecture

### Vue d'ensemble

REAL LIFE+ utilise une architecture modulaire en monorepo pour séparer clairement les responsabilités :

```
realif/
├── apps/
│   ├── mobile/          # Application React Native (Expo)
│   └── backend/         # API Backend (NestJS) [À implémenter]
├── packages/
│   ├── shared/          # Types & utils partagés [À implémenter]
│   ├── ui/              # Bibliothèque de composants UI [À implémenter]
│   └── game-engine/     # Logique de jeu core [À implémenter]
```

### Stack Technique Mobile

#### Core
- **React Native 0.76.5** - Framework principal
- **Expo SDK 52** - Tooling et services
- **TypeScript 5.3** - Type safety strict
- **Expo Router** - Navigation file-based

#### State Management
- **Zustand** - State management global léger
- **TanStack Query** - Cache & sync des données API
- **AsyncStorage** - Persistance locale

#### UI & Animations
- **React Native Reanimated 3** - Animations 60fps natives
- **React Native Skia** - Rendu graphique haute performance
- **Expo Linear Gradient** - Gradients pour le design
- **Expo Icons** - Iconographie

#### Services Externes
- **React Native Health** (iOS) - HealthKit integration
- **Google Fit** (Android) - Activity tracking
- **Expo Location** - Geolocalisation
- **Expo Camera** - Capture photo/vidéo

### Architecture des Données

#### Stores Zustand

**1. authStore** - Gestion de l'authentification
```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login(email, password): Promise<void>;
  logout(): void;
  register(email, username, password): Promise<void>;
}
```

**2. gameStore** - État du jeu principal
```typescript
interface GameState {
  avatar: Avatar | null;
  stats: Stats;              // energy, money, popularity, style, happiness
  progress: GameProgress;    // level, xp, daysPlayed
  stepsToday: number;
  distanceToday: number;

  // Actions
  initialize(): Promise<void>;
  updateStats(stats): void;
  addEnergy(amount): void;
  spendEnergy(amount): boolean;
  addMoney(amount): void;
  spendMoney(amount): boolean;
  updateSteps(steps): void;
  addXP(amount): void;
}
```

**3. inventoryStore** - Gestion de l'inventaire
```typescript
interface InventoryState {
  items: InventoryItem[];
  equippedItems: Record<string, string>;

  addItem(item): void;
  removeItem(itemId): void;
  equipItem(itemId): void;
  unequipItem(itemId): void;
  getItemsByCategory(category): InventoryItem[];
  getTotalStyleBonus(): number;
}
```

### Navigation

L'app utilise Expo Router avec une structure file-based :

```
app/
├── _layout.tsx           # Root layout
├── index.tsx             # Splash screen
├── (auth)/
│   ├── _layout.tsx
│   ├── welcome.tsx       # Écran d'accueil
│   ├── login.tsx         # Connexion
│   └── register.tsx      # Inscription
└── (game)/
    ├── _layout.tsx       # Tabs navigation
    ├── home.tsx          # Hub principal
    ├── style.tsx         # Gacha & fashion
    ├── social.tsx        # Relations sociales
    ├── career.tsx        # Jobs & business
    └── profile.tsx       # Profil utilisateur
```

### Services

#### 1. healthKitService

Gère l'intégration avec Apple HealthKit et Google Fit :

```typescript
class HealthKitService {
  initialize(): Promise<boolean>;
  getTodaySteps(): Promise<number>;
  getHealthData(startDate, endDate): Promise<HealthData>;
}
```

**Récompenses IRL :**
- 1 step = 0.8m de distance
- 100 steps = +1 energy
- 100 steps = +1 XP

#### 2. gachaService

Système de gacha pour les vêtements :

```typescript
class GachaService {
  pullSingle(): ClothingItem;
  pullMultiple(count: number): ClothingItem[];
  getPrices(): { single: number; multi: number };
  setRates(rates: Partial<GachaRates>): void;
}
```

**Taux de drop :**
- Common: 60%
- Rare: 30%
- Epic: 9%
- Legendary: 1%

**Garanties :**
- Pull x10 : Au moins 1 Rare+ garanti

**Prix :**
- Single pull: $100
- Multi pull (x10): $900

### Système de Progression

#### Levels & XP

```typescript
// XP pour level up
nextLevelXp = currentLevelXp * 1.5

// Récompenses level up
- +10 max energy
- Full energy refill
```

#### Stats

| Stat | Min | Max | Description |
|------|-----|-----|-------------|
| Energy | 0 | maxEnergy | Requis pour actions |
| Money | 0 | ∞ | Monnaie du jeu |
| Popularity | 0 | 100 | Influence sociale |
| Style | 0 | 100 | Points de mode |
| Happiness | 0 | 100 | Moral du perso |

#### Items & Rareté

Les items ont des bonus de stats basés sur leur rareté :

| Rareté | Style Bonus | Popularité | Couleur |
|--------|-------------|------------|---------|
| Common | +5 | 0 | #B0B0C0 |
| Rare | +15 | +5 | #00D9FF |
| Epic | +40 | +20 | #9D4EDD |
| Legendary | +100 | +50 | #FFD700 |

### Design System

#### Palette de couleurs

```typescript
// Primary
primary: '#FF1493'       // Hot pink
primaryDark: '#C71585'
primaryLight: '#FF69B4'

// Secondary
secondary: '#9D4EDD'     // Purple
accent: '#00D9FF'        // Cyan

// Backgrounds
background: '#0A0A0F'    // Deep black
surface: '#1A1A24'       // Dark grey
surfaceLight: '#2A2A38'

// Text
text: '#FFFFFF'
textSecondary: '#B0B0C0'
textTertiary: '#707080'

// Game specific
energy: '#FFD700'        // Gold
money: '#00FF87'         // Green
popularity: '#FF1493'    // Pink
```

#### Spacing

```typescript
xs: 4,    sm: 8,    md: 16,
lg: 24,   xl: 32,   xxl: 48,   xxxl: 64
```

#### Border Radius

```typescript
sm: 8,    md: 12,   lg: 16,
xl: 24,   full: 9999
```

### Composants UI

#### Button

```tsx
<Button
  title="Action"
  onPress={() => {}}
  variant="primary" | "secondary" | "outline" | "ghost"
  size="small" | "medium" | "large"
  loading={false}
  disabled={false}
  fullWidth={false}
  icon={<Icon />}
/>
```

#### Card

```tsx
<Card
  variant="default" | "glass" | "gradient"
  padding="sm" | "md" | "lg"
>
  {children}
</Card>
```

#### StatBar

```tsx
<StatBar
  label="Energy"
  value={80}
  maxValue={100}
  color="energy"
  showNumbers={true}
  icon={<Icon />}
/>
```

## 🚀 Installation & Développement

### Prérequis

- Node.js 18+
- npm ou yarn
- Expo CLI
- iOS Simulator (Mac) ou Android Studio

### Installation

```bash
# Clone le repo
git clone <repo-url>
cd realif

# Install root dependencies
npm install

# Install mobile dependencies
cd apps/mobile
npm install
```

### Développement

```bash
# Start Expo dev server
npm run mobile

# iOS
npm run mobile:ios

# Android
npm run mobile:android

# Lint
npm run lint

# Format
npm run format

# Type check
npm run type-check
```

### Build Production

```bash
# iOS
npm run mobile:build:ios

# Android
npm run mobile:build:android
```

## 🔐 Permissions requises

### iOS (Info.plist)

```xml
<key>NSHealthShareUsageDescription</key>
<string>REAL LIFE+ needs access to your activity data to reward you in-game.</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>REAL LIFE+ uses your location to unlock real-world venues.</string>

<key>NSCameraUsageDescription</key>
<string>REAL LIFE+ needs camera access to create your avatar.</string>
```

### Android (AndroidManifest.xml)

```xml
<uses-permission android:name="android.permission.ACTIVITY_RECOGNITION"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.CAMERA"/>
```

## 📦 Backend (À implémenter)

### Stack recommandée

- **NestJS** - Framework backend TypeScript
- **PostgreSQL** - Base de données relationnelle
- **Prisma ORM** - Type-safe database access
- **Redis** - Cache & sessions
- **Socket.io** - WebSocket temps réel
- **Supabase Auth** - Authentification

### Endpoints API à créer

```
POST   /auth/register
POST   /auth/login
POST   /auth/logout
GET    /auth/me

GET    /avatar
POST   /avatar
PUT    /avatar/:id

GET    /inventory
POST   /inventory/items
DELETE /inventory/items/:id

POST   /gacha/pull
POST   /gacha/pull-multi

GET    /stats
PUT    /stats

GET    /leaderboard
GET    /social/friends
GET    /social/events

POST   /tracking/steps
POST   /tracking/location
```

### Base de données PostgreSQL

#### Tables principales

**users**
- id, email, username, password_hash
- avatar_id, created_at, updated_at

**avatars**
- id, user_id, name, gender, customization_json
- created_at, updated_at

**stats**
- id, user_id, energy, max_energy, money
- popularity, style, happiness, level, xp
- steps_today, distance_today, last_login

**inventory_items**
- id, user_id, item_id, is_equipped
- acquired_at

**items**
- id, name, category, rarity, slot
- image_url, description, stats_json

**transactions**
- id, user_id, type, amount, description
- created_at

## 🎯 Roadmap

### Phase 1 - MVP (Complété ✅)
- [x] Architecture projet
- [x] Auth screens
- [x] Game screens (Home, Style, Social, Career, Profile)
- [x] Gacha system
- [x] Inventory system
- [x] Stats & progression
- [x] HealthKit integration (mock)

### Phase 2 - Core Features
- [ ] Avatar customization UI
- [ ] Backend API
- [ ] Real HealthKit/Google Fit integration
- [ ] Système de jobs & salaire
- [ ] Events sociaux
- [ ] Leaderboards

### Phase 3 - Polish
- [ ] Animations Reanimated
- [ ] TikTok video export
- [ ] Push notifications
- [ ] Daily missions
- [ ] Achievement system

### Phase 4 - Monetization
- [ ] RevenueCat integration
- [ ] IAP (In-App Purchases)
- [ ] VIP Pass
- [ ] Limited events
- [ ] Branded collaborations

## 🐛 Debugging

### Logs utiles

```typescript
// Store state
console.log(useGameStore.getState());
console.log(useInventoryStore.getState());

// Reset stores (dev only)
useGameStore.persist.clearStorage();
useInventoryStore.persist.clearStorage();
```

### Expo DevTools

```bash
# Open DevTools
press 'm' in terminal

# Reload
press 'r'

# Toggle performance monitor
press 'p'
```

## 📝 Conventions de Code

### Naming

- Components: PascalCase (`Button.tsx`)
- Hooks: camelCase with 'use' prefix (`useGameStore.ts`)
- Utils: camelCase (`formatMoney.ts`)
- Constants: UPPER_SNAKE_CASE (`MAX_ENERGY`)

### File Structure

```
ComponentName/
├── index.tsx           # Export
├── ComponentName.tsx   # Component
├── styles.ts           # Styles
└── types.ts            # Types
```

### Imports Order

1. React / React Native
2. Third-party libs
3. @/ aliases (local)
4. Relative imports
5. Types

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '@/store/gameStore';
import { Button } from './Button';
import type { GameState } from './types';
```

## 🤝 Contribution

1. Créer une branche feature
2. Commit avec messages clairs
3. Tester localement
4. Push et créer PR
5. Review par l'équipe

---

**Dernière mise à jour:** 2025-11-22
**Version:** 1.0.0-alpha
