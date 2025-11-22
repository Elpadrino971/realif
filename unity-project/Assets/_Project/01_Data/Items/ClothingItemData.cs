using UnityEngine;

/// <summary>
/// ScriptableObject data for clothing items.
/// Create instances via Create > RealLife > Items > Clothing.
/// </summary>
[CreateAssetMenu(fileName = "ClothingItem", menuName = "RealLife/Items/Clothing")]
public class ClothingItemData : ScriptableObject
{
    [Header("Identification")]
    public string id;
    public string itemName;
    public ItemRarity rarity;

    [Header("Visuals")]
    public Sprite icon;
    public GameObject modelPrefab;
    [TextArea(2, 4)]
    public string description;

    [Header("Stats")]
    public int styleBonus;
    public int popularityBonus;
    public int energyBonus;

    [Header("Slot")]
    public ClothingSlot slot;
    public ClothingStyle style;
}

/// <summary>
/// Where this clothing item is equipped.
/// </summary>
public enum ClothingSlot
{
    Top,
    Bottom,
    Shoes,
    Outfit,      // Full body outfit (replaces top + bottom)
    Outerwear,   // Jacket, coat
    Accessory    // Hat, glasses, jewelry
}

/// <summary>
/// Style category for matching bonuses.
/// </summary>
public enum ClothingStyle
{
    Casual,
    Formal,
    Streetwear,
    Luxury,
    Sporty,
    Alternative
}
