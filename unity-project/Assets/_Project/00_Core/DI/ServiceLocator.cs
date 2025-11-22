using System;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// Simple Service Locator for dependency injection.
/// Register services in GameInstaller, retrieve them in Views/Presenters.
/// </summary>
public static class ServiceLocator
{
    private static readonly Dictionary<Type, object> _services = new Dictionary<Type, object>();

    /// <summary>
    /// Register a service instance.
    /// </summary>
    public static void Register<T>(T service) where T : class
    {
        var type = typeof(T);

        if (_services.ContainsKey(type))
        {
            Debug.LogWarning($"Service of type {type.Name} is already registered. Overwriting.");
        }

        _services[type] = service;
        Debug.Log($"Registered service: {type.Name}");
    }

    /// <summary>
    /// Resolve a service by type.
    /// </summary>
    public static T Resolve<T>() where T : class
    {
        var type = typeof(T);

        if (_services.TryGetValue(type, out var service))
        {
            return service as T;
        }

        Debug.LogError($"Service of type {type.Name} not found. Did you register it?");
        return null;
    }

    /// <summary>
    /// Check if a service is registered.
    /// </summary>
    public static bool IsRegistered<T>() where T : class
    {
        return _services.ContainsKey(typeof(T));
    }

    /// <summary>
    /// Clear all services. Call this when changing scenes/restarting.
    /// </summary>
    public static void Clear()
    {
        Debug.Log("Clearing ServiceLocator...");
        _services.Clear();
    }

    /// <summary>
    /// Unregister a specific service.
    /// </summary>
    public static void Unregister<T>() where T : class
    {
        var type = typeof(T);

        if (_services.Remove(type))
        {
            Debug.Log($"Unregistered service: {type.Name}");
        }
        else
        {
            Debug.LogWarning($"Tried to unregister service {type.Name}, but it wasn't registered.");
        }
    }
}
