public class User
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public Email Email { get; private set; }
    public string PasswordHash { get; private set; }
    public Role Role { get; private set; }
    public TaxGroup TaxGroup { get; private set; }

    private User() {} // Required by EF Core

    public User(Email email, string passwordHash, Role role, TaxGroup taxGroup)
    {
        Email = email ?? throw new ArgumentNullException(nameof(email));
        PasswordHash = passwordHash ?? throw new ArgumentNullException(nameof(passwordHash));
        Role = role;
        TaxGroup = taxGroup;
    }
}
