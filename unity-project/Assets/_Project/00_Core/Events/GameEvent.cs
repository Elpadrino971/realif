using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// ScriptableObject-based event system for decoupled communication.
/// Create instances via Create > RealLife > Events > GameEvent.
/// </summary>
[CreateAssetMenu(fileName = "GameEvent", menuName = "RealLife/Events/GameEvent")]
public class GameEvent : ScriptableObject
{
    private readonly List<IGameEventListener> _listeners = new List<IGameEventListener>();

    /// <summary>
    /// Raise the event, notifying all listeners.
    /// </summary>
    public void Raise()
    {
        // Iterate backwards to safely remove listeners during iteration
        for (int i = _listeners.Count - 1; i >= 0; i--)
        {
            _listeners[i].OnEventRaised();
        }
    }

    /// <summary>
    /// Register a listener to this event.
    /// </summary>
    public void RegisterListener(IGameEventListener listener)
    {
        if (!_listeners.Contains(listener))
        {
            _listeners.Add(listener);
        }
    }

    /// <summary>
    /// Unregister a listener from this event.
    /// </summary>
    public void UnregisterListener(IGameEventListener listener)
    {
        if (_listeners.Contains(listener))
        {
            _listeners.Remove(listener);
        }
    }
}

/// <summary>
/// Interface for objects that can listen to GameEvents.
/// </summary>
public interface IGameEventListener
{
    void OnEventRaised();
}
