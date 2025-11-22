using UnityEngine;

/// <summary>
/// Base class for all View MonoBehaviours in Clean Architecture.
/// Views handle display and user input, delegating logic to Presenters.
/// </summary>
public abstract class BaseView<TPresenter> : MonoBehaviour where TPresenter : IPresenter
{
    protected TPresenter Presenter { get; private set; }
    protected bool IsInitialized { get; private set; }

    /// <summary>
    /// Initialize the view with its presenter.
    /// Call this from your installer/bootstrap code.
    /// </summary>
    public virtual void Initialize(TPresenter presenter)
    {
        if (IsInitialized)
        {
            Debug.LogWarning($"{GetType().Name} is already initialized.");
            return;
        }

        Presenter = presenter;
        IsInitialized = true;

        OnInitialized();
    }

    /// <summary>
    /// Override this to setup UI elements and subscribe to presenter events.
    /// </summary>
    protected virtual void OnInitialized() { }

    /// <summary>
    /// Override this to cleanup subscriptions.
    /// </summary>
    protected virtual void OnCleanup() { }

    protected virtual void OnDestroy()
    {
        if (IsInitialized)
        {
            OnCleanup();
            Presenter?.Cleanup();
        }
    }
}
