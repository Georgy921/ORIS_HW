using ToursAPI.Model;


namespace Data;

public static class DataSeed
{
    /// <summary>
    /// Фильтры, соответствующие вашему filterConfig JS объекту
    /// </summary>
    public static List<FilterSection> Filters = new List<FilterSection>
    {
        // 1. Popular (Популярные) - соответствует id: 'popular'
        new FilterSection
        {
            Key = "popular",
            Title = "Популярные",

            Type = "checkbox",
            Items = new List<FilterItem>
            {
                new FilterItem { Key = "all-inclusive", Label = "Все включено" },
                new FilterItem { Key = "wi-fi", Label = "Бесплатный Wi-Fi" },
                new FilterItem { Key = "first-line", Label = "1-я линия" },
                new FilterItem { Key = "beach_holidays", Label = "Пляжный отдых"},
                new FilterItem { Key = "regular-flight", Label = "Регулярный перелет" }
            }
        },

        // 2. Price (Цена) - соответствует id: 'price'
        // Примечание: Для типа 'range' обычно используется отдельный UI компонент, 
        // но здесь мы можем оставить секцию для совместимости или скрыть её, если фронтенд обрабатывает range отдельно.
        // Если нужно отображать как чекбоксы диапазонов:
        new FilterSection
        {
            Key = "price",
            Title = "Стоимость",
            Type = "range", // Или checkbox, если вы хотите разбить на категории
            Items = new List<FilterItem>() // Range обычно не имеет items в таком виде, но структура сохранена
        },

        new FilterSection
        {
            Key = "search_bar",
            Title = "Поиск отеля",
            Type = "search",
            Items= new List<FilterItem>()

        },

        // 3. Region (Регионы и курорты) - соответствует id: 'region'
        new FilterSection
        {
            Key = "region",
            Title = "Регионы и курорты",
            Type = "checkbox",
            Items = new List<FilterItem>
            {
                new FilterItem { Key = "antalya", Label = "Анталья" },
                new FilterItem { Key = "alanya", Label = "Аланья" },
                new FilterItem { Key = "kemer", Label = "Кемер" },
                new FilterItem { Key = "belek", Label = "Белек" },
                new FilterItem { Key = "bodrum", Label = "Бодрум" },
                new FilterItem { Key = "dalaman", Label = "Даламан" }, // Исправлено дублирование Кемера в вашем JS на Даламан/Мармарис по смыслу, но оставил ключ dalaman
                new FilterItem { Key = "stambul", Label = "Стамбул" },
                new FilterItem { Key = "fethie", Label = "Фетхие" },
                new FilterItem { Key = "erzurum", Label = "Эрзурум" },
                new FilterItem { Key = "side", Label = "Сиде" }
            }
        },

        // 4. Category Hotel (Категория отеля) - соответствует id: 'category_hotel'
        new FilterSection
        {
            Key = "category_hotel",
            Title = "Категория отеля",
            Type = "checkbox",
            Items = new List<FilterItem>
            {
                new FilterItem { Key = "stars:5", Label = "5★" },
                new FilterItem { Key = "stars:4", Label = "4★" },
                new FilterItem { Key = "stars:3", Label = "3★" },
                new FilterItem { Key = "stars:2", Label = "2★" },
                new FilterItem { Key = "stars:1", Label = "1★" }
            }
        },

        // 5. Nutrition (Питание) - соответствует id: 'nutrition'
        new FilterSection
        {
            Key = "nutrition",
            Title = "Питание",
            Type = "checkbox",
            Items = new List<FilterItem>
            {
                new FilterItem { Key = "meal:ultra_all", Label = "Ультра все включено" },
                new FilterItem { Key = "meal:all", Label = "Все включено" },
                new FilterItem { Key = "meal:breakfest", Label = "Завтрак" },
                new FilterItem { Key = "meal:without_food", Label = "Без питания" },
                new FilterItem { Key = "meal:pansion", Label = "Полупансион" },
                new FilterItem { Key = "meal:full_pansion", Label = "Полный пансион" }
            }
        }
    };

    /// <summary>
    /// Список туров, преобразованный из вашего JSON массива.
    /// Поля сопоставлены так, чтобы работать с фильтрами выше.
    /// </summary>
    public static List<Tour> Tours = new()
    {
        new Tour
        {
            Id = 1,
            Name = "TUI MAGIC LIFE Jacaranda",
            ArrivalCity = "Аланья",
            DepartureCity = "Казань",
            DepartureDate = "5 мар.",
            NightsCount = 7,
            AdultsCount = 5,
            TourPrice = 124320,
            ImageUrl = "https://apigate-tui.fstravel.com/api/geocontent/static/Hotel/00210000-ac11-0242-bd2c-08d982ab9707/MainPhoto-Source-okd3c5uc.jpg",
            Bonus = 2486,
            Wifi = "Wi-Fi в общественных местах (бесплатно)",
            DistanceToAirport = 50,
            GeneralDescription = "Курортный отель через дорогу от пляжа. Отлично подходит для семейного отдыха. Предлагает своим гостям разнообразное питание и большой выбор развлечений. На территории есть несколько бассейнов, водные горки, работают детский клуб и SPA-салон.",
            HasKidsClub = true,
            HotelName = "TUI MAgis",
            HasAquapark = true,
            HasSpa = true,
            RoomType = "Апартаменты",
            PopularFilters = "all-inclusive",
            Region = "Турция",
            Rating = 5,
            MealPlan = "ultra-all"
        },
        new Tour
        {
            Id = 2,
            Name = "Corendon Playa Kemer",
            ArrivalCity = "Кемер",
            DepartureCity = "Москва",
            DepartureDate = "5 мар.",
            NightsCount = 7,
            AdultsCount = 4,
            TourPrice = 147168,
            ImageUrl = "https://apigate-tui.fstravel.com/api/geocontent/static/Hotel/00210000-ac11-0242-8973-08d982ca6c7d/MainPhoto-Source-tl23t02b.jpg",
            Bonus = 2943,
            Wifi = "Wi-Fi в номерах",
            DistanceToAirport = 50,
            GeneralDescription = "Курортный отель в живописном уединенном месте на берегу моря. Отлично подойдет для отдыха вдвоем или семьей. На территории есть бассейны с водными горками, детский клуб, SPA-центр. К услугам гостей несколько ресторанов и баров.\n\nОбщая площадь территории: 20 000 кв. м.\n\nПоследняя реновация: 2021 г.",
            HasKidsClub = true,
            HotelName = "Corendor",
            HasAquapark = false,
            HasSpa = true,
            RoomType = "3-x комнатные",
            PopularFilters = "first-line",
            Region = "Турция",
            Rating = 5,
            MealPlan = "ultra"
        },
        new Tour
        {
            Id = 3,
            Name = "EFdmii hotrer",
            ArrivalCity = "Кемер",
            DepartureCity = "Казань",
            DepartureDate = "12 мар.",
            NightsCount = 7,
            AdultsCount = 3,
            TourPrice = 86496m,
            ImageUrl = "https://apigate-tui.fstravel.com/api/geocontent/static/Hotel/00180000-ac11-0242-c6c2-08d993975bea/MainPhoto-Source-iw2vom4j.jpg",
            Bonus = 1729,
            Wifi = "Wi-Fi в общественных местах и в номерах (бесплатно)",
            DistanceToAirport = 500,
            GeneralDescription = "Небольшой уютный отель в Кемере. Месторасположение отеля позволяет насладиться не только морем и солнцем, а еще и прогулками в прибрежном национальном парке Бейдаглары. К услугам гостей компактные номера, ресторан, бар у бассейна, открытый бассейн и бесплатный Wi-Fi на всей территории отеля. Рекомендуется для бюджетного отдыха.",
            HasKidsClub = false,
            HotelName = "ajajra cuju",
            HasAquapark = true,
            HasSpa = true,
            RoomType = "2-у местная палатка",
            PopularFilters = "wi-fi",
            Region = "Турция",
            Rating = 3,
            MealPlan = "ultra-all"
        },
        new Tour
        {
            Id = 4,
            Name = "Lika Hotel",
            ArrivalCity = "Стамбул",
            DepartureCity = "Новосибирск",
            DepartureDate = "31 мая.",
            NightsCount = 14,
            AdultsCount = 2,
            TourPrice = 55008,
            ImageUrl = "https://apigate-tui.fstravel.com/api/geocontent/static/Hotel/00210000-ac11-0242-e95d-08d982eaed3a/MainPhoto-Source-njc0m4qt.jpg",
            Bonus = 1100,
            Wifi = "Wi-Fi на всей територии",
            DistanceToAirport = 50,
            GeneralDescription = "Отель Lika находится в стамбульском районе Фатих и располагает номерами с кондиционером, телевизором с плоским экраном и спутниковыми каналами.В распоряжении гостей круглосуточная стойка регистрации, общий лаундж и пункт обмена валюты. Гости отеля могут исследовать древние памятники и достопримечательности и ощутить настоящее турецкое гостеприимство. Для незабываемого отдыха в Стамбуле отель Lika - идеальный выбор. Отель построен в 2005 г. Последняя реновация прошла в 2019 году.",
            HasKidsClub = true,
            HotelName = "LIkaLiaks",
            HasAquapark = true,
            HasSpa = false,
            RoomType = "сухой подвал",
            PopularFilters = "wi-fi",
            Region = "Турция",
            Rating = 2,
            MealPlan = "pansion"
        },
        new Tour
        {
            Id = 5,
            Name = "Sunis Family Resort & Spa",
            ArrivalCity = "Анталья",
            DepartureCity = "Москва",
            DepartureDate = "12 апр.",
            NightsCount = 10,
            AdultsCount = 2,
            TourPrice = 98450,
            ImageUrl = "https://apigate-tui.fstravel.com/api/geocontent/static/s600/Hotel/00180000-ac11-0242-72d5-08d9939aa6ac/MainPhoto-Source-dburpvdd.webp",
            Bonus = 1969,
            Wifi = "Бесплатный Wi-Fi на всей территории",
            DistanceToAirport = 45,
            GeneralDescription = "Современный семейный отель в сосновом бору, в 300 метрах от песчаного пляжа. Идеален для отдыха с детьми: собственный аквапарк, мини-зоопарк, анимация на русском языке. 5 ресторанов с международной и турецкой кухней, крытый подогреваемый бассейн, фитнес-центр.\n\nПлощадь территории: 35 000 кв. м.\n\nПоследняя реновация: 2023 г.",
            HasKidsClub = true,
            HotelName = "Sunis Family Resort",
            HasAquapark = true,
            HasSpa = true,
            RoomType = "Стандартный номер с видом на сад",
            PopularFilters = "family-friendly,all-inclusive",
            Region = "Турция",
            Rating = 5,
            MealPlan = "all-inclusive"
        },
        new Tour
        {
            Id = 6,
            Name = "Gorky Gorod Mountain Lodge",
            ArrivalCity = "Сочи",
            DepartureCity = "Санкт-Петербург",
            DepartureDate = "15 янв.",
            NightsCount = 5,
            AdultsCount = 2,
            TourPrice = 67890,
            ImageUrl = "https://apigate-tui.fstravel.com/api/geocontent/static/s600/Hotel/00170000-ac11-0242-b416-08d99455e70c/MainPhoto-Source-ffac0rwg.jpg",
            Bonus = 1358,
            Wifi = "Wi-Fi в лобби и номерах",
            DistanceToAirport = 2,
            GeneralDescription = "Уютный апарт-отель у подножия горнолыжного курорта «Горки Город». Прямой доступ к трассам, прокат снаряжения на территории, баня с панорамными окнами. Вечером — каминный зал, ресторан кавказской кухни и живая музыка.\n\nПлощадь территории: 8 500 кв. м.\n\nПоследняя реновация: 2022 г.",
            HasKidsClub = false,
            HotelName = "Gorky Gorod Lodge",
            HasAquapark = false,
            HasSpa = true,
            RoomType = "Студия с кухней и балконом",
            PopularFilters = "ski-in/ski-out,mountain-view",
            Region = "Россия",
            Rating = 5,
            MealPlan = "ultra"
        },
        new Tour
        {
            Id = 7,
            Name = "Prague Heritage Boutique",
            ArrivalCity = "Прага",
            DepartureCity = "Москва",
            DepartureDate = "3 мая",
            NightsCount = 4,
            AdultsCount = 2,
            TourPrice = 54320,
            ImageUrl = "https://apigate-tui.fstravel.com/api/geocontent/static/s600/Hotel/00180000-ac11-0242-de3e-08d9938a7c4c/MainPhoto-Source-lg0gepge.jpg",
            Bonus = 1086,
            Wifi = "Бесплатный высокоскоростной Wi-Fi",
            DistanceToAirport = 15,
            GeneralDescription = "Бутик-отель в историческом здании XVIII века в самом центре Праги, в 5 минутах ходьбы от Карлова моста. Номера оформлены в классическом стиле с современными удобствами. На крыше — терраса с видом на Пражский Град. Завтраки подаются в старинном погребе с каменными сводами.\n\nПлощадь территории: 1 200 кв. м.\n\nПоследняя реновация: 2024 г.",
            HasKidsClub = false,
            HotelName = "Heritage Boutique Prague",
            HasAquapark = false,
            HasSpa = true,
            RoomType = "Делюкс с видом на улицу",
            PopularFilters = "city-center,historic-building",
            Region = "Чехия",
            Rating = 5,
            MealPlan = "ultra-all"
        },
        new Tour
        {
            Id = 8,
            Name = "Andaman Breeze Resort",
            ArrivalCity = "Пхукет",
            DepartureCity = "Москва",
            DepartureDate = "20 ноя.",
            NightsCount = 12,
            AdultsCount = 3,
            TourPrice = 189750,
            ImageUrl = "https://apigate-tui.fstravel.com/api/geocontent/static/s600/Hotel/00210000-ac11-0242-2267-08d982ecd7cb/MainPhoto-Source-1bbfo5hk.jpg",
            Bonus = 3795,
            Wifi = "Wi-Fi в общественных зонах",
            DistanceToAirport = 25,
            GeneralDescription = "Тропический курорт на берегу Андаманского моря с собственным пляжем из белого песка. Виллы с частными бассейнами, спа-салон в тайском стиле, школа дайвинга. 3 ресторана: тайская, европейская и морская кухня. Ежедневные шоу и мастер-классы по тайской кухне.\n\nПлощадь территории: 45 000 кв. м.\n\nПоследняя реновация: 2023 г.",
            HasKidsClub = true,
            HotelName = "Andaman Breeze",
            HasAquapark = false,
            HasSpa = true,
            RoomType = "Вилла с приватным бассейном",
            PopularFilters = "beachfront,romantic",
            Region = "Таиланд",
            Rating = 5,
            MealPlan = "all-inclusive"
        },
        new Tour
        {
            Id = 9,
            Name = "Red Sea Coral Paradise",
            ArrivalCity = "Шарм-эль-Шейх",
            DepartureCity = "Екатеринбург",
            DepartureDate = "8 фев.",
            NightsCount = 8,
            AdultsCount = 2,
            TourPrice = 76200,
            ImageUrl = "https://apigate-tui.fstravel.com/api/geocontent/static/s600/Hotel/00170000-ac11-0242-24fa-08d9944b1b59/MainPhoto-Source-q12a1kyp.jpg",
            Bonus = 1524,
            Wifi = "Wi-Fi в номерах (бесплатно)",
            DistanceToAirport = 10,
            GeneralDescription = "Отель на первой береговой линии с выходом к коралловому рифу — идеальное место для сноркелинга и дайвинга. Собственный дайв-центр с инструкторами PADI, подогреваемый бассейн с морской водой, восточный хаммам. 4 бара, включая пляжный и у бассейна.\n\nПлощадь территории: 28 000 кв. м.\n\nПоследняя реновация: 2022 г.",
            HasKidsClub = false,
            HotelName = "Coral Paradise Resort",
            HasAquapark = true,
            HasSpa = true,
            RoomType = "Стандарт с видом на море",
            PopularFilters = "first-line,diving",
            Region = "Египет",
            Rating = 5,
            MealPlan = "ultra-all-inclusive"
        }
    };

    // Rooms list removed as it was not provided in the new JSON structure and might not be relevant for this specific Tour-based seed.
    // If you need rooms, they should be linked to these Tour IDs or separate Hotel IDs if you refactor the architecture.
}