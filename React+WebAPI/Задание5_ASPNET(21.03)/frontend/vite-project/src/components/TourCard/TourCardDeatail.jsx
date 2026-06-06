import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const TourCardDetail = memo(function TourCardDetail({ tour }) {
  const navigate = useNavigate();

  function handleRedirectHome() {
    navigate('/');
  }

  // ✅ ИСПРАВЛЕНО: camelCase вместо snake_case
  const {
  image_url: imageUrl,
  hotel_name: hotelName = 'Отель без названия',
  arrival_city: arrivalCity = '',
  name: tourName = '',
  bonus = 0,
  tour_price: tourPrice = 0,
  departure_date: departureDate = '',
  adults_count: adultsCount = 0,
  nights_count: nightsCount = 0,
  wifi,
  distance_to_airport: distanceToAirport,
  has_kids_club: hasKidsClub,
  has_aquapark: hasAquapark,
  has_spa: hasSpa,
  room_type: roomType,
  monthly_payment: monthlyPayment,
  rating,
  general_description: generalDescription,
  stars_display: starsDisplay,
} = tour;

  return (
    <>
      {/* Хлебные крошки */}
      <div className="breadcrumbs">
        <a href="#" onClick={handleRedirectHome}>Главная</a>
        <span>/</span>
        <a href="#">{arrivalCity}</a>
        <span>/</span>
        <a href="#">{tourName}</a>
        <span>/</span>
        <span>{hotelName}</span>
      </div>

      {/* Заголовок отеля */}
      <div className="hotel-header">
        <div className="hotel-rating">{rating}★</div>
        <h1 className="hotel-title">{hotelName}</h1>
        <div className="hotel-location">
          {arrivalCity}, {tourName}, {hotelName}
        </div>
      </div>

      {/* Контент: галерея + описание */}
      <div className="hotel-content">
        {/* Галерея */}
        <div className="hotel-gallery">
          <div className="main-photo">
            <img src={imageUrl} alt={hotelName} />
            <div className="rating-badge">
              {rating}
              <br />
              <small>349 отзывов</small>
            </div>
            <div className="warning-badge">⚠️ Важно! Гости не могут пользоваться...</div>
          </div>
        </div>

        {/* Описание */}
        <div className="hotel-description">
          <h2>Описание отеля</h2>

          <div className="amenities">
            <div className="amenity">
              <span className="amenity-icon">📍</span>
              <span>Тихое расположение</span>
            </div>
            <div className="amenity">
              <span className="amenity-icon">🏖️</span>
              <span>1-я линия</span>
            </div>
            <div className="amenity">
              <span className="amenity-icon">📶</span>
              <span>{wifi || 'Wi-Fi на всей территории'}</span>
            </div>
            <div className="amenity">
              <span className="amenity-icon">👶</span>
              <span>{hasKidsClub ? 'Детский клуб' : 'Без детского клуба'}</span>
            </div>
            <div className="amenity">
              <span className="amenity-icon">🏊</span>
              <span>Открытый бассейн</span>
            </div>
            <div className="amenity">
              <span className="amenity-icon">❄️</span>
              <span>Кондиционер</span>
            </div>
          </div>

          <div className="description-text">
            {generalDescription}
          </div>

          <a href="#" className="read-more">Подробнее об отеле</a>

          <div className="price-block">
            <div className="price-title">Цена за тур с перелетом</div>
            <div className="price-dates">
              С {departureDate} · {nightsCount} ночей · {adultsCount} взр
            </div>
            <div className="price-amount">от {tourPrice?.toLocaleString('ru-RU')} ₽</div>
            <div className="price-info">
              <div>① Условия оплаты</div>
              <div>① {monthlyPayment?.toLocaleString('ru-RU')} ₽/мес.</div>
            </div>
            <button className="select-btn">Выбрать номер</button>
          </div>
        </div>
      </div>
    </>
  );
});

export default TourCardDetail;