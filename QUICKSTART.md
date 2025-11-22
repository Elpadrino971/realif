# 🚀 REAL LIFE+ - Quick Start Guide

## 🎯 Pour démarrer en 5 minutes

### 1. Installation

```bash
cd realif

# Install root dependencies
npm install

# Install mobile app dependencies
cd apps/mobile
npm install
```

### 2. Lancer l'app

```bash
# Dans le dossier apps/mobile
npm start

# Ou depuis la racine
npm run mobile
```

Cela va ouvrir Expo DevTools. Tu peux ensuite :
- Presser `i` pour iOS Simulator
- Presser `a` pour Android Emulator
- Scanner le QR code avec Expo Go sur ton téléphone

### 3. Tester l'app

L'app démarre sur l'écran de bienvenue. Tu peux :

1. **Créer un compte** (pas besoin de vrai email)
2. **Explorer le jeu** :
   - Home : Hub principal avec stats
   - Style : Tire des items gacha
   - Social, Career : À venir
   - Profile : Voir tes stats

### 4. Features fonctionnelles

✅ **Authentification** - Login/Register (mock)
✅ **Gacha System** - Tire des vêtements avec différentes raretés
✅ **Inventory** - Collectionne et équipe des items
✅ **Stats & Progression** - Level up, gagne de l'XP et de l'argent
✅ **IRL Tracking** - Simulation du tracking de pas (mock)

## 🛠️ Développement

### Structure des fichiers

```
apps/mobile/
├── app/                    # Screens (Expo Router)
│   ├── (auth)/            # Auth screens
│   ├── (game)/            # Game screens
│   └── index.tsx          # Splash
├── src/
│   ├── components/        # UI components
│   ├── store/             # Zustand stores
│   ├── services/          # Business logic
│   ├── theme/             # Colors, spacing
│   └── types/             # TypeScript types
└── assets/                # Images, fonts
```

### Commandes utiles

```bash
# Linter
npm run lint

# Format code
npm run format

# Type check
npm run type-check

# Build iOS
npm run mobile:ios

# Build Android
npm run mobile:android
```

### Hot Reload

L'app se recharge automatiquement quand tu sauvegardes un fichier.

**Shortcuts Expo :**
- `r` - Reload
- `m` - Menu
- `j` - Open debugger
- `i` - iOS simulator
- `a` - Android emulator

## 🎨 Modifier le design

### Couleurs

Edit `apps/mobile/src/theme/colors.ts` :

```typescript
export const colors = {
  primary: '#FF1493',  // Change this!
  // ...
};
```

### Composants

Les composants réutilisables sont dans `apps/mobile/src/components/` :
- `Button.tsx` - Boutons avec variants
- `Card.tsx` - Cartes avec glass effect
- `StatBar.tsx` - Barres de progression

## 🎮 Tester le Gacha

1. Va sur l'écran "Style"
2. Tu commences avec $1000
3. Tire des items :
   - Single Pull : $100
   - x10 Pull : $900 (1 Rare+ garanti)

**Taux de drop :**
- Common (60%) : +5 Style
- Rare (30%) : +15 Style
- Epic (9%) : +40 Style
- Legendary (1%) : +100 Style

## 📊 Système de Stats

### Energy
- Se recharge chaque jour à minuit
- Requis pour actions (jobs, events)
- Gagne +1 energy tous les 100 pas IRL

### Money
- Gagne de l'argent via jobs
- Dépense dans le gacha
- Achète maisons, véhicules

### XP & Level
- Gagne de l'XP en jouant
- Level up = +10 max energy
- Formule : nextLevelXp = currentXp * 1.5

## 🐛 Debug

### Reset les données

```typescript
// Dans la console Expo
import { useGameStore, useInventoryStore, useAuthStore } from '@/store';

// Reset tout
useGameStore.persist.clearStorage();
useInventoryStore.persist.clearStorage();
useAuthStore.persist.clearStorage();

// Reload l'app (r)
```

### Voir l'état

```typescript
// Dans n'importe quel component
console.log(useGameStore.getState());
console.log(useInventoryStore.getState());
```

## 🚧 Prochaines étapes

### Features à implémenter

1. **Avatar Customization**
   - UI de création d'avatar
   - Choix genre, skin tone, hair, etc.

2. **Backend API**
   - NestJS + PostgreSQL
   - Auth réelle
   - Sync cloud

3. **Real IRL Tracking**
   - Apple HealthKit (iOS)
   - Google Fit (Android)

4. **Social Features**
   - Events en temps réel
   - Système d'amis
   - Leaderboards

5. **Monetization**
   - RevenueCat integration
   - IAP (In-App Purchases)
   - VIP Pass

### Fichiers à modifier

**Pour ajouter un nouvel écran :**
1. Crée `apps/mobile/app/(game)/nouveau-screen.tsx`
2. Ajoute la route dans `_layout.tsx`

**Pour ajouter un nouveau store :**
1. Crée `apps/mobile/src/store/nouveauStore.ts`
2. Utilise le pattern Zustand + persist

**Pour ajouter un service :**
1. Crée `apps/mobile/src/services/nouveauService.ts`
2. Exporte une instance singleton

## 💡 Tips

- **Utilise les aliases** : `@/` au lieu de `../../`
- **TypeScript strict** : Active les warnings
- **Components réutilisables** : DRY principle
- **Zustand** : Simple et performant
- **Expo** : Facilite le déploiement

## 📚 Ressources

- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Native](https://reactnative.dev/)

## 🆘 Problèmes courants

### Port déjà utilisé
```bash
# Kill le process
npx kill-port 8081
```

### Cache problèmes
```bash
# Clear Expo cache
npx expo start -c
```

### Dependencies issues
```bash
# Reinstall
rm -rf node_modules
npm install
```

---

**Besoin d'aide ?** Lis la doc complète dans `DOCS.md`
