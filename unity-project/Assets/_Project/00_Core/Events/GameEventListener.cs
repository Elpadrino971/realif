using UnityEngine;
using UnityEngine.Events;

/// <summary>
/// MonoBehaviour component that listens to a GameEvent and invokes a UnityEvent response.
/// Attach this to any GameObject and wire up responses in the Inspector.
/// </summary>
public class GameEventListener : MonoBehaviour, IGameEventListener
{
    [SerializeField] private GameEvent _event;
    [SerializeField] private UnityEvent _response;

    private void OnEnable()
    {
        if (_event != null)
        {
            _event.RegisterListener(this);
        }
    }

    private void OnDisable()
    {
        if (_event != null)
        {
            _event.UnregisterListener(this);
        }
    }

    public void OnEventRaised()
    {
        _response?.Invoke();
    }
}
