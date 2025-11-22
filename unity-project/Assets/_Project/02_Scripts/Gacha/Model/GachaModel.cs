using System.Collections.Generic;
using System.Linq;
using UnityEngine;

/// <summary>
/// Model for gacha system business logic.
/// Pure C# class with no Unity dependencies except data classes.
/// </summary>
public class GachaModel : IModel
{
    private readonly GachaConfigData _config;
    private readonly System.Random _random;
    private int _pullsSinceLastLegendary;

    public GachaModel(GachaConfigData config)
    {
        _config = config;
        _random = new System.Random();
        _pullsSinceLastLegendary = 0;
    }

    public void Initialize()
    {
        // Load pity counter from save
        // _pullsSinceLastLegendary = SaveManager.Load().gachaPityCounter;
    }

    public void Cleanup()
    {
        // Save pity counter
        // SaveManager.Save(new GachaSaveData { pityCounter = _pullsSinceLastLegendary });
    }

    /// <summary>
    /// Perform a single gacha pull.
    /// </summary>
    public ClothingItemData PullSingle()
    {
        _pullsSinceLastLegendary++;

        // Check pity system
        if (_pullsSinceLastLegendary >= _config.pitySystemThreshold)
        {
            _pullsSinceLastLegendary = 0;
            return GetRandomItemOfRarity(ItemRarity.Legendary);
        }

        ItemRarity rarity = RollRarity();

        if (rarity == ItemRarity.Legendary)
        {
            _pullsSinceLastLegendary = 0;
        }

        return GetRandomItemOfRarity(rarity);
    }

    /// <summary>
    /// Perform multiple gacha pulls.
    /// </summary>
    public List<ClothingItemData> PullMultiple(int count)
    {
        var items = new List<ClothingItemData>();

        for (int i = 0; i < count; i++)
        {
            items.Add(PullSingle());
        }

        // x10 pull guarantee
        if (count == 10 && _config.multiPullGuaranteeRare)
        {
            if (!HasRareOrBetter(items))
            {
                // Replace last item with guaranteed rare+
                ItemRarity guaranteedRarity = _random.NextDouble() < 0.9 ? ItemRarity.Rare : ItemRarity.Epic;
                items[items.Count - 1] = GetRandomItemOfRarity(guaranteedRarity);
            }
        }

        return items;
    }

    /// <summary>
    /// Roll for item rarity based on drop rates.
    /// </summary>
    private ItemRarity RollRarity()
    {
        float roll = (float)_random.NextDouble();
        float cumulative = 0f;

        cumulative += _config.legendaryRate;
        if (roll <= cumulative) return ItemRarity.Legendary;

        cumulative += _config.epicRate;
        if (roll <= cumulative) return ItemRarity.Epic;

        cumulative += _config.rareRate;
        if (roll <= cumulative) return ItemRarity.Rare;

        return ItemRarity.Common;
    }

    /// <summary>
    /// Get a random item of specific rarity from config.
    /// </summary>
    private ClothingItemData GetRandomItemOfRarity(ItemRarity rarity)
    {
        ClothingItemData[] pool = rarity switch
        {
            ItemRarity.Common => _config.commonItems,
            ItemRarity.Rare => _config.rareItems,
            ItemRarity.Epic => _config.epicItems,
            ItemRarity.Legendary => _config.legendaryItems,
            _ => _config.commonItems
        };

        if (pool == null || pool.Length == 0)
        {
            Debug.LogError($"No items found for rarity {rarity}. Check GachaConfig.");
            return null;
        }

        int index = _random.Next(pool.Length);
        return pool[index];
    }

    /// <summary>
    /// Check if item list contains at least one rare or better.
    /// </summary>
    private bool HasRareOrBetter(List<ClothingItemData> items)
    {
        return items.Any(item => item.rarity >= ItemRarity.Rare);
    }

    public int GetPullsSinceLastLegendary() => _pullsSinceLastLegendary;
}
