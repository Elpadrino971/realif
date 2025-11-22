# 🎮 REAL LIFE+ Unity Project

## 📁 Structure

```
_Project/
├── 00_Core/          # Core systems (architecture, DI, events, utils)
├── 01_Data/          # ScriptableObjects (items, config, locations)
├── 02_Scripts/       # Game logic (player, gacha, inventory, etc.)
├── 03_Scenes/        # Unity scenes
├── 04_Prefabs/       # Prefabs organized by type
├── 05_Art/           # Visual assets (models, textures, materials)
└── 06_UI/            # UI assets (fonts, icons, sprites)
```

## 🏗️ Architecture

Ce projet utilise **Clean Architecture (SCA)** pour garantir :
- ✅ Code maintenable
- ✅ Testabilité
- ✅ Découplage
- ✅ Migration facile

### Pattern : Model-View-Presenter (MVP)

```
View (MonoBehaviour) ←→ Presenter (Pure C#) ←→ Model (Pure C#) ←→ Data (ScriptableObject)
```

**View** : Affichage et input (MonoBehaviour)
**Presenter** : Logique de présentation (Pure C#)
**Model** : Logique métier (Pure C#)
**Data** : Configuration (ScriptableObject)

## 🚀 Getting Started

### 1. Installation

1. Open Unity Hub
2. Add project from disk (select `unity-project/` folder)
3. Open with Unity 2022.3 LTS or newer
4. Wait for packages to import

### 2. Premier lancement

1. Open scene `Assets/_Project/03_Scenes/Boot.unity`
2. Press Play
3. L'architecture se met en place automatiquement

### 3. Créer un nouveau système

Exemple : Système de Jobs

```
1. DATA : Create > RealLife > Jobs > JobData (ScriptableObject)
2. MODEL : Assets/_Project/02_Scripts/Career/Model/JobModel.cs
3. PRESENTER : Assets/_Project/02_Scripts/Career/Presenter/JobPresenter.cs
4. VIEW : Assets/_Project/02_Scripts/Career/View/JobView.cs
5. INSTALLER : Register dans GameInstaller.cs
```

## 📦 Dependencies

### Core Packages
- TextMeshPro (FREE)
- Input System (NEW) (FREE)
- Cinemachine (FREE)

### Recommended Assets
- **Ultimate Character Controller** ($100) - [Asset Store](https://assetstore.unity.com/packages/tools/game-toolkits/ultimate-character-controller-233710)
- **UMA** (FREE) - [Asset Store](https://assetstore.unity.com/packages/3d/characters/uma-2-unity-multipurpose-avatar-35611)
- **Low Poly City** (~$30-50) - Search Asset Store

## 📖 Documentation

- **UNITY_ARCHITECTURE.md** - Architecture complète détaillée
- **00_Core/README.md** - Core systems explanation
- **02_Scripts/README.md** - Game systems overview

## 🎯 Conventions

### Naming
- Classes : `PascalCase`
- Private fields : `_camelCase`
- Properties : `PascalCase`
- Methods : `PascalCase`
- Constants : `UPPER_CASE`

### Folders
- Préfixer vos dossiers custom avec `_` pour les garder en haut
- Organiser par feature, pas par type
- Un dossier = une feature complète (Model + View + Presenter + Data)

### Scripts
- 1 classe publique = 1 fichier
- Nom du fichier = nom de la classe
- Utiliser des namespaces pour éviter les conflits

## 🐛 Debug

### Service Locator
```csharp
// Check what's registered
Debug.Log(ServiceLocator.IsRegistered<PlayerModel>());

// Get service manually
var player = ServiceLocator.Resolve<PlayerModel>();
```

### Events
```csharp
// Check listeners count
Debug.Log($"Listeners: {myGameEvent.GetListenerCount()}");
```

## 🚧 Roadmap

- [x] Core architecture
- [x] Service Locator
- [x] Event System
- [x] Gacha Model
- [ ] Player Controller
- [ ] Avatar Customization
- [ ] City Environment
- [ ] Save System
- [ ] Mobile Controls

## ⚠️ Important

- **NE JAMAIS** utiliser `GameObject.Find()` dans le code
- **NE JAMAIS** hardcoder des valeurs dans les scripts
- **TOUJOURS** utiliser ScriptableObjects pour les données
- **TOUJOURS** passer par le Presenter pour la logique
- **PRÉFÉRER** Events au lieu de références directes

---

**Pour plus de détails, voir UNITY_ARCHITECTURE.md**
