namespace Backend.Models
{
    public enum PlayerPosition
    {
        Portero,
        Defensa,
        Centrocampista,
        Delantero
    }

    public class Player
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? ShirtName { get; set; }
        public PlayerPosition Position { get; set; }
        public string Team { get; set; } = string.Empty;
        public int Points { get; set; }
        public decimal? Price { get; set; }
        public string? Image { get; set; }
        public string? ImageDetail { get; set; }
    }
}