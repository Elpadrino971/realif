/// <summary>
/// Base interface for all Model classes in Clean Architecture.
/// Models contain business logic and data, with no Unity dependencies.
/// </summary>
public interface IModel
{
    void Initialize();
    void Cleanup();
}
