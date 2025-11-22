# 🏗️ REAL LIFE+ - Unity Architecture Professionnelle

## ⚠️ RÈGLES FONDAMENTALES (ANTI-MIGRATION PROBLÈMES)

### 🚫 CE QU'ON NE FAIT PAS
- ❌ Singleton partout
- ❌ GameObject.Find() dans le code
- ❌ Code dans MonoBehaviour
- ❌ Dépendances directes entre scripts
- ❌ Données hardcodées dans le code
- ❌ Static classes avec état

### ✅ CE QU'ON FAIT
- ✅ **ScriptableObjects** pour toutes les données
- ✅ **Dependency Injection** pour les références
- ✅ **Clean Architecture** (Model-View-Presenter)
- ✅ **Event System** pour la communication
- ✅ **Interfaces** pour le découplage
- ✅ **Patterns éprouvés** (Observer, Command, State)

## 📁 STRUCTURE DU PROJET UNITY

```
RealLifePlus/
├── Assets/
│   ├── _Project/                    # Notre code (toujours préfixé _)
│   │   ├── 00_Core/                 # Systèmes core réutilisables
│   │   │   ├── Architecture/        # Base classes, interfaces
│   │   │   ├── Events/             # Event system
│   │   │   ├── DI/                 # Dependency Injection
│   │   │   └── Utils/              # Helpers, extensions
│   │   │
│   │   ├── 01_Data/                # ScriptableObjects (données)
│   │   │   ├── Characters/         # Stats, customization data
│   │   │   ├── Items/              # Clothes, accessories
│   │   │   ├── Locations/          # Places, buildings
│   │   │   ├── Jobs/               # Career data
│   │   │   └── Config/             # Game config
│   │   │
│   │   ├── 02_Scripts/             # Logique métier
│   │   │   ├── Player/
│   │   │   │   ├── Model/          # Data + logic
│   │   │   │   ├── View/           # MonoBehaviour display
│   │   │   │   └── Presenter/      # Coordination
│   │   │   ├── Inventory/
│   │   │   ├── Gacha/
│   │   │   ├── Social/
│   │   │   ├── Career/
│   │   │   └── City/
│   │   │
│   │   ├── 03_Scenes/              # Scènes Unity
│   │   │   ├── Boot.unity          # Scene de démarrage
│   │   │   ├── City.unity          # Ville principale
│   │   │   ├── Apartment.unity     # Intérieur
│   │   │   └── UI.unity            # UI overlay (additive)
│   │   │
│   │   ├── 04_Prefabs/             # Prefabs organisés
│   │   │   ├── Characters/
│   │   │   ├── Buildings/
│   │   │   ├── Vehicles/
│   │   │   ├── UI/
│   │   │   └── Props/
│   │   │
│   │   ├── 05_Art/                 # Assets visuels
│   │   │   ├── Models/
│   │   │   ├── Textures/
│   │   │   ├── Materials/
│   │   │   └── Animations/
│   │   │
│   │   └── 06_UI/                  # Interface utilisateur
│   │       ├── Fonts/
│   │       ├── Icons/
│   │       └── Sprites/
│   │
│   ├── Plugins/                    # Third-party assets
│   │   ├── CharacterController/
│   │   ├── CityGen/
│   │   └── UMA/
│   │
│   └── StreamingAssets/            # Assets chargés runtime
│
├── Packages/                       # Unity packages
└── ProjectSettings/                # Unity settings
```

## 🎯 ARCHITECTURE CLEAN (SCA - Simplified Clean Architecture)

### Principes de base

```
┌─────────────────────────────────────────────┐
│           VIEW (MonoBehaviour)              │  ← Ce que le joueur voit
│  PlayerView, InventoryView, GachaView      │
└─────────────────┬───────────────────────────┘
                  │ Events/Commands
┌─────────────────▼───────────────────────────┐
│         PRESENTER (Pure C#)                 │  ← Logique de présentation
│  PlayerPresenter, InventoryPresenter        │
└─────────────────┬───────────────────────────┘
                  │ Use Cases
┌─────────────────▼───────────────────────────┐
│         MODEL (Pure C# + SO)                │  ← Logique métier
│  PlayerModel, InventoryModel, GachaModel    │
└─────────────────┬───────────────────────────┘
                  │ Data
┌─────────────────▼───────────────────────────┐
│    DATA (ScriptableObjects)                 │  ← Données configuration
│  CharacterData, ItemData, LocationData      │
└─────────────────────────────────────────────┘
```

### Exemple concret : Système Gacha

#### 1. DATA (ScriptableObject)

```csharp
// Assets/_Project/01_Data/Items/ClothingItemData.cs
[CreateAssetMenu(fileName = "ClothingItem", menuName = "RealLife/Items/Clothing")]
public class ClothingItemData : ScriptableObject
{
    public string id;
    public string itemName;
    public ItemRarity rarity;
    public Sprite icon;
    public GameObject modelPrefab;
    public int styleBonus;
    public int popularityBonus;
}

public enum ItemRarity { Common, Rare, Epic, Legendary }
```

#### 2. MODEL (Pure C#)

```csharp
// Assets/_Project/02_Scripts/Gacha/Model/GachaModel.cs
public class GachaModel
{
    private readonly GachaConfigData _config;
    private readonly System.Random _random;

    public GachaModel(GachaConfigData config)
    {
        _config = config;
        _random = new System.Random();
    }

    public ClothingItemData PullSingle()
    {
        ItemRarity rarity = RollRarity();
        return GetRandomItemOfRarity(rarity);
    }

    public List<ClothingItemData> PullMultiple(int count)
    {
        var items = new List<ClothingItemData>();
        for (int i = 0; i < count; i++)
        {
            items.Add(PullSingle());
        }

        // Guarantee logic
        if (count == 10 && !HasRareOrBetter(items))
        {
            items[items.Count - 1] = GetRandomItemOfRarity(ItemRarity.Rare);
        }

        return items;
    }

    private ItemRarity RollRarity()
    {
        float roll = (float)_random.NextDouble();
        // Logic using _config.dropRates
    }
}
```

#### 3. PRESENTER (Pure C#)

```csharp
// Assets/_Project/02_Scripts/Gacha/Presenter/GachaPresenter.cs
public class GachaPresenter
{
    private readonly GachaModel _model;
    private readonly InventoryModel _inventory;
    private readonly PlayerModel _player;

    // Events for View
    public event Action<ClothingItemData> OnItemPulled;
    public event Action<List<ClothingItemData>> OnMultiPull;
    public event Action<string> OnError;

    public GachaPresenter(GachaModel model, InventoryModel inventory, PlayerModel player)
    {
        _model = model;
        _inventory = inventory;
        _player = player;
    }

    public void RequestSinglePull(int cost)
    {
        if (!_player.CanAfford(cost))
        {
            OnError?.Invoke("Not enough money");
            return;
        }

        _player.SpendMoney(cost);
        var item = _model.PullSingle();
        _inventory.AddItem(item);

        OnItemPulled?.Invoke(item);
    }

    public void RequestMultiPull(int cost)
    {
        if (!_player.CanAfford(cost))
        {
            OnError?.Invoke("Not enough money");
            return;
        }

        _player.SpendMoney(cost);
        var items = _model.PullMultiple(10);

        foreach (var item in items)
        {
            _inventory.AddItem(item);
        }

        OnMultiPull?.Invoke(items);
    }
}
```

#### 4. VIEW (MonoBehaviour)

```csharp
// Assets/_Project/02_Scripts/Gacha/View/GachaView.cs
public class GachaView : MonoBehaviour
{
    [SerializeField] private Button _singlePullButton;
    [SerializeField] private Button _multiPullButton;
    [SerializeField] private GachaResultPanel _resultPanel;

    private GachaPresenter _presenter;

    public void Initialize(GachaPresenter presenter)
    {
        _presenter = presenter;

        // Subscribe to presenter events
        _presenter.OnItemPulled += ShowSingleResult;
        _presenter.OnMultiPull += ShowMultiResult;
        _presenter.OnError += ShowError;

        // Wire up buttons
        _singlePullButton.onClick.AddListener(() => _presenter.RequestSinglePull(100));
        _multiPullButton.onClick.AddListener(() => _presenter.RequestMultiPull(900));
    }

    private void ShowSingleResult(ClothingItemData item)
    {
        _resultPanel.Display(item);
    }

    private void ShowMultiResult(List<ClothingItemData> items)
    {
        _resultPanel.DisplayMultiple(items);
    }

    private void OnDestroy()
    {
        // Unsubscribe
        _presenter.OnItemPulled -= ShowSingleResult;
        _presenter.OnMultiPull -= ShowMultiResult;
        _presenter.OnError -= ShowError;
    }
}
```

## 🔧 SYSTÈME D'INJECTION DE DÉPENDANCES

### GameInstaller (Bootstrap)

```csharp
// Assets/_Project/00_Core/DI/GameInstaller.cs
public class GameInstaller : MonoBehaviour
{
    [Header("Configuration")]
    [SerializeField] private GachaConfigData _gachaConfig;
    [SerializeField] private PlayerConfigData _playerConfig;

    private void Awake()
    {
        // Create Models
        var playerModel = new PlayerModel(_playerConfig);
        var inventoryModel = new InventoryModel();
        var gachaModel = new GachaModel(_gachaConfig);

        // Create Presenters
        var gachaPresenter = new GachaPresenter(gachaModel, inventoryModel, playerModel);
        var inventoryPresenter = new InventoryPresenter(inventoryModel);

        // Register in ServiceLocator
        ServiceLocator.Register(playerModel);
        ServiceLocator.Register(inventoryModel);
        ServiceLocator.Register(gachaPresenter);
        ServiceLocator.Register(inventoryPresenter);

        // Initialize Views
        FindObjectOfType<GachaView>().Initialize(gachaPresenter);
        FindObjectOfType<InventoryView>().Initialize(inventoryPresenter);
    }
}
```

## 📡 EVENT SYSTEM (Découplage)

```csharp
// Assets/_Project/00_Core/Events/GameEvent.cs
[CreateAssetMenu(menuName = "RealLife/Events/GameEvent")]
public class GameEvent : ScriptableObject
{
    private readonly List<GameEventListener> _listeners = new List<GameEventListener>();

    public void Raise()
    {
        for (int i = _listeners.Count - 1; i >= 0; i--)
        {
            _listeners[i].OnEventRaised();
        }
    }

    public void RegisterListener(GameEventListener listener)
    {
        if (!_listeners.Contains(listener))
            _listeners.Add(listener);
    }

    public void UnregisterListener(GameEventListener listener)
    {
        if (_listeners.Contains(listener))
            _listeners.Remove(listener);
    }
}

// Usage: Créer un SO "OnPlayerLevelUp" event
// N'importe quel script peut écouter sans référence directe
```

## 🎮 SYSTÈME DE CHARACTER CONTROLLER

### Recommandation : Ultimate Character Controller

**Pourquoi ?**
- ✅ Kinematic (pas de physique bugs)
- ✅ Mobile ready (touch controls)
- ✅ Bien maintenu
- ✅ Architecture propre
- ✅ Extensible

### Intégration propre

```csharp
// Assets/_Project/02_Scripts/Player/PlayerController.cs
// Wrapper autour du character controller pour découplage
public interface ICharacterController
{
    void Move(Vector3 direction);
    void Jump();
    bool IsGrounded { get; }
}

public class UltimateCharacterControllerAdapter : ICharacterController
{
    private readonly UltimateCharacterLocomotion _controller;

    // Implémentation qui wrappe UCC
    // Si on change de controller, on change juste ici
}
```

## 🏙️ SYSTÈME DE VILLE

### Option 1 : CityGen3D (Procédural)
- Génère ville depuis OpenStreetMap
- Bon pour grande échelle
- Optimisé pour mobile

### Option 2 : Manual avec Modular Assets
- Plus de contrôle artistique
- Utiliser assets type "Low Poly City"
- Optimisation manuelle

### Architecture

```csharp
// Assets/_Project/02_Scripts/City/CityManager.cs
public class CityManager : MonoBehaviour
{
    [SerializeField] private CityConfigData _config;

    private readonly Dictionary<string, LocationData> _locations = new();

    public void RegisterLocation(string id, LocationData data)
    {
        _locations[id] = data;
    }

    public void OnPlayerEnterLocation(string locationId)
    {
        if (_locations.TryGetValue(locationId, out var location))
        {
            // Raise event via ScriptableObject event
            location.onEnterEvent.Raise();
        }
    }
}
```

## 👤 SYSTÈME D'AVATAR

### Recommandation : UMA (Unity Multipurpose Avatar)

**Pourquoi ?**
- ✅ Gratuit
- ✅ Très flexible
- ✅ Mobile optimized
- ✅ Runtime customization
- ✅ Grande communauté

### Architecture

```csharp
// Assets/_Project/01_Data/Characters/AvatarPresetData.cs
[CreateAssetMenu(menuName = "RealLife/Avatar/Preset")]
public class AvatarPresetData : ScriptableObject
{
    public Gender gender;
    public float skinTone;
    public string hairStyle;
    public Color hairColor;
    public string faceShape;
    // etc.
}

// Assets/_Project/02_Scripts/Player/Model/AvatarModel.cs
public class AvatarModel
{
    private AvatarPresetData _currentPreset;

    public void ApplyCustomization(AvatarPresetData preset)
    {
        _currentPreset = preset;
        // Update UMA character
    }
}
```

## 💾 SAVE SYSTEM

```csharp
// Assets/_Project/00_Core/SaveSystem/SaveManager.cs
public class SaveManager
{
    private const string SAVE_KEY = "reallife_save";

    public void Save(GameSaveData data)
    {
        string json = JsonUtility.ToJson(data);
        PlayerPrefs.SetString(SAVE_KEY, json);
        PlayerPrefs.Save();
    }

    public GameSaveData Load()
    {
        if (PlayerPrefs.HasKey(SAVE_KEY))
        {
            string json = PlayerPrefs.GetString(SAVE_KEY);
            return JsonUtility.FromJson<GameSaveData>(json);
        }
        return new GameSaveData();
    }
}

[System.Serializable]
public class GameSaveData
{
    public PlayerSaveData player;
    public InventorySaveData inventory;
    public ProgressSaveData progress;
}
```

## 📱 OPTIMISATION MOBILE

### Règles strictes

1. **Draw Calls** : < 100
2. **Tris** : < 50k par frame
3. **Materials** : Atlased autant que possible
4. **LOD** : Obligatoire sur tous les meshes
5. **Occlusion Culling** : Activé
6. **Baking** : Lightmaps + Nav Mesh

### Performance Checklist

```csharp
// Assets/_Project/00_Core/Utils/PerformanceMonitor.cs
public class PerformanceMonitor : MonoBehaviour
{
    private void Update()
    {
        #if DEVELOPMENT_BUILD
        float fps = 1f / Time.deltaTime;
        if (fps < 30f)
        {
            Debug.LogWarning($"Low FPS: {fps}");
        }
        #endif
    }
}
```

## 🧪 TESTING STRATEGY

```csharp
// Assets/_Project/Tests/GachaModelTests.cs
[Test]
public void PullMultiple_WithCount10_GuaranteesRareOrBetter()
{
    // Arrange
    var config = ScriptableObject.CreateInstance<GachaConfigData>();
    var model = new GachaModel(config);

    // Act
    var items = model.PullMultiple(10);

    // Assert
    Assert.IsTrue(items.Any(i => i.rarity >= ItemRarity.Rare));
}
```

## 📚 ASSETS RECOMMANDÉS

### Must-Have
1. **[Ultimate Character Controller](https://assetstore.unity.com/packages/tools/game-toolkits/ultimate-character-controller-233710)** - Character movement ($100)
2. **[UMA](https://assetstore.unity.com/packages/3d/characters/uma-2-unity-multipurpose-avatar-35611)** - Avatar customization (FREE)
3. **[Low Poly City](https://assetstore.unity.com/packages/3d/environments/)** - City assets (~$30-50)

### Nice-to-Have
4. **[CityGen3D](https://www.citygen3d.com/)** - Procedural city (FREE)
5. **[Mobile Optimized UI](https://assetstore.unity.com/)** - UI kit
6. **[TextMeshPro](https://docs.unity3d.com/Manual/com.unity.textmeshpro.html)** - Text rendering (FREE)

## 🚀 ROADMAP D'IMPLÉMENTATION

### Phase 1 : Core (Semaine 1-2)
- [ ] Setup project structure
- [ ] Implement Clean Architecture base
- [ ] Character controller integration
- [ ] Basic city scene
- [ ] Save system

### Phase 2 : Avatar (Semaine 3)
- [ ] UMA integration
- [ ] Customization UI
- [ ] Avatar presets
- [ ] Equipment system visual

### Phase 3 : Gameplay (Semaine 4-5)
- [ ] Gacha system
- [ ] Inventory
- [ ] Stats & progression
- [ ] IRL tracking

### Phase 4 : World (Semaine 6-7)
- [ ] City locations
- [ ] Interior scenes
- [ ] NPCs basic
- [ ] Job locations

### Phase 5 : Polish (Semaine 8)
- [ ] Optimization
- [ ] UI/UX improvements
- [ ] Tutorial
- [ ] Testing

## 📖 CONVENTIONS DE CODE

```csharp
// Naming
public class PlayerModel { }           // PascalCase for classes
private float _moveSpeed;              // _camelCase for private fields
public int MaxHealth { get; }          // PascalCase for properties
public void MovePlayer() { }           // PascalCase for methods
private const string SAVE_KEY = "";    // UPPER_CASE for constants

// Organization
#region Public Methods
#endregion

#region Private Methods
#endregion

// Comments
/// <summary>
/// Pulls a single gacha item based on drop rates.
/// </summary>
/// <returns>Random clothing item</returns>
public ClothingItemData PullSingle() { }
```

## 🔒 ANTI-PATTERNS À ÉVITER

```csharp
// ❌ BAD
public class PlayerController : MonoBehaviour
{
    public static PlayerController Instance; // Singleton hell

    void Update()
    {
        GameObject.Find("Enemy").GetComponent<Enemy>().TakeDamage(10); // String reference

        if (Input.GetKey(KeyCode.Space)) // Hardcoded input
        {
            health -= 10; // Direct manipulation
        }
    }
}

// ✅ GOOD
public class PlayerView : MonoBehaviour
{
    private ICharacterController _controller;
    private PlayerPresenter _presenter;

    public void Initialize(ICharacterController controller, PlayerPresenter presenter)
    {
        _controller = controller;
        _presenter = presenter;
        _presenter.OnHealthChanged += UpdateHealthUI;
    }

    private void Update()
    {
        var input = _inputService.GetMovementInput();
        _controller.Move(input);
    }
}
```

## 📞 SOURCES & RÉFÉRENCES

- [Clean Architecture Unity](https://genki-sano.medium.com/simplified-clean-architecture-design-pattern-for-unity-967931583c47)
- [Ultimate Character Controller](https://assetstore.unity.com/packages/tools/game-toolkits/ultimate-character-controller-233710)
- [UMA Documentation](https://umadocs.com/)
- [Unity Design Patterns](https://unity.com/blog/games/level-up-your-code-with-game-programming-patterns)
- [Mobile Optimization](https://docs.unity3d.com/Manual/MobileOptimization.html)

---

**Cette architecture garantit** :
- ✅ Code maintenable
- ✅ Tests faciles
- ✅ Migration sans problèmes
- ✅ Scalabilité
- ✅ Performance mobile
