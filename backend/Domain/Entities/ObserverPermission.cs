namespace fopfin.Domain.Entities
{
    public class ObserverPermission
    {
        public int Id { get; set; }
        public int AdminId { get; set; }
        public User Admin { get; set; } = null!;
        public int ObserverId { get; set; }
        public User Observer { get; set; } = null!;
        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;
    }
}
