using UnityEngine;

/// <summary>
/// Configuration for the gacha system.
/// Create instance via Create > RealLife > Config > GachaConfig.
/// </summary>
[CreateAssetMenu(fileName = "GachaConfig", menuName = "RealLife/Config/GachaConfig")]
public class GachaConfigData : ScriptableObject
{
    [Header("Prices")]
    public int singlePullCost = 100;
    public int multiPullCost = 900;  // 10 pulls for price of 9

    [Header("Drop Rates")]
    [Range(0f, 1f)]
    public float commonRate = 0.60f;   // 60%

    [Range(0f, 1f)]
    public float rareRate = 0.30f;     // 30%

    [Range(0f, 1f)]
    public float epicRate = 0.09f;     // 9%

    [Range(0f, 1f)]
    public float legendaryRate = 0.01f; // 1%

    [Header("Item Pool")]
    public ClothingItemData[] commonItems;
    public ClothingItemData[] rareItems;
    public ClothingItemData[] epicItems;
    public ClothingItemData[] legendaryItems;

    [Header("Guarantees")]
    public bool multiPullGuaranteeRare = true;  // x10 pull guarantees at least 1 rare+
    public int pitySystemThreshold = 90;        // Legendary guaranteed after 90 pulls without one

    private void OnValidate()
    {
        // Ensure rates sum to ~1.0
        float total = commonRate + rareRate + epicRate + legendaryRate;
        if (Mathf.Abs(total - 1f) > 0.01f)
        {
            Debug.LogWarning($"Gacha rates don't sum to 1.0 (current: {total}). Adjust rates.");
        }
    }
}
