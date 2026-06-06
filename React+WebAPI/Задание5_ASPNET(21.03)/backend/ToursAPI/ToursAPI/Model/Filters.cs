namespace ToursAPI.Model
{
    public class FilterSection
    {
        public string Key { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;

        // ✅ Обязательно должно быть это свойство!
        public List<FilterItem> Items { get; set; } = new List<FilterItem>();
    }

    public class FilterItem
    {
        public string Key { get; set; } = string.Empty;
        public string Label { get; set; } = string.Empty;
        public string? Icon { get; set; }
    }
}