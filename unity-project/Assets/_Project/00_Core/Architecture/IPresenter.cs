/// <summary>
/// Base interface for all Presenter classes in Clean Architecture.
/// Presenters coordinate between Models and Views, containing presentation logic.
/// </summary>
public interface IPresenter
{
    void Initialize();
    void Cleanup();
}
