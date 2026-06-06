import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TourCardDetail = memo(function TourCard({ tour }) {
  const navigate = useNavigate();

  function handleRedirectHome() {
    navigate('/');
  }
const {
    image_url,
    hotel_name = 'Отель без названия',
    arrival_city = '',
    name: tourName = '',
    bonus = 0,
    tour_price = 0,
    departure_date = '',
    adults_count = 0,
    nights_count = 0,
    wifi,
    distance_to_airport,
    has_kids_club,
    has_aquapark,
    has_spa,
    room_type,
    monthly_payment,
  } = tour;

  return (
    <>
        {/* Хлебные крошки */}
        <div className="breadcrumbs">
          <a href="#" onClick={handleRedirectHome}>Главная</a>
          <span>/</span>
          <a href="#">{tour.arrival_city}</a>
          <span>/</span>
          <a href="#">{tour.name}</a>
          <span>/</span>
          <span>{tour.hotel_name}</span>
        </div>

        {/* Заголовок отеля */}
        <div className="hotel-header">
          <div className="hotel-rating">{tour.rating}★</div>
          <h1 className="hotel-title">{tour.hotel_name}</h1>
          <div className="hotel-location">
            {tour.arrival_city}, {tour.name}, {tour.hotel_name}
          </div>
        </div>

        {/* Контент: галерея + описание */}
        <div className="hotel-content">
          {/* Галерея */}
          <div className="hotel-gallery">
            <div className="main-photo">
              <img src={tour.image_url} alt={tour.hotel_name} />
              <div className="rating-badge">
                {tour.rating}
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
                <span>Wi-Fi на всей территории</span>
              </div>
              <div className="amenity">
                <span className="amenity-icon">👶</span>
                <span>Детский клуб</span>
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
              {tour.general_description}
            </div>

            <a href="#" className="read-more">Подробнее об отеле</a>

            <div className="price-block">
              <div className="price-title">Цена за тур с перелетом</div>
              <div className="price-dates">
                С {tour.departure_date} · {tour.nights_count} ночей · {tour.adults_count} взр
              </div>
              <div className="price-amount">от {tour.tour_price?.toLocaleString('ru-RU')} ₽</div>
              <div className="price-info">
                <div>① Условия оплаты</div>
                <div>① {tour.monthly_payment?.toLocaleString('ru-RU')} ₽/мес.</div>
              </div>
              <button className="select-btn">Выбрать номер</button>
            </div>
          </div>
        </div>
    </>
        
  );

});
export default TourCardDetail;