// components/TourCard/TourCard.jsx
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const TourCard = memo(function TourCard({ tour }) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/tours/${tour.id}`);
  }, [navigate, tour.id]);

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
} = tour;

  const services = [
    wifi && { icon: 'wifi.png', label: wifi },
    distanceToAirport && { icon: 'plane_depart.png', label: `Не далее ${distanceToAirport} км от аэропорта` },
    hasKidsClub && { icon: 'kids_club.png', label: 'Детский клуб' },
    hasAquapark && { icon: 'aquapark.png', label: 'Аквапарк' },
    hasSpa && { icon: 'Spa.png', label: 'SPA-центр' },
    roomType && { icon: 'bedroom.png', label: roomType },
  ].filter(Boolean);

  return (
    <article 
      className="tour-card"
      onClick={handleClick}
      style={{
        display: 'flex',
        background: 'white',
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid #ddd',
        marginBottom: '16px',
        width: '900px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        cursor: 'pointer',
      }}
    >
      <div className="card-image" style={{ position: 'relative', overflow: 'hidden', width: '230px', height: '312px', flexShrink: 0 }}>
        <img 
          src={imageUrl} 
          alt={hotelName}
        />
        <button 
          className="favorite-btn"
          onClick={(e) => { e.stopPropagation(); }}
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            background: 'white',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
        {bonus > 0 && (
          <div className="bonus-badge" style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: '#ECECFD',
            color: '#FF5722',
            padding: '3px 4px',
            borderRadius: '14px',
            fontSize: '12px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <img src="src/bonus.png" alt="" style={{maxWidth: '16px', maxHeight: '16px'}} />
            <span>от {bonus}</span>
          </div>
        )}
      </div>
      <div className="card-info" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#333' }}>
            {hotelName}
          </h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
            {arrivalCity}{arrivalCity && tourName ? ', ' : ''}{tourName}
          </p>
        </div>
        {services.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '12px', fontSize: '13px', color: '#555' }}>
            {services.map((service, idx) => (
              <div key={idx} className="services-icon" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <img src={`src/${service.icon}`} alt="" width="16" height="16" />
                <span>{service.label}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#555', marginBottom: '8px' }}>
          <img src="src/plane_depart.png" alt="" width="16" height="16" />
          <span>{departureDate}</span>
          <span aria-hidden="true">•</span>
          <span>{adultsCount} взрослых</span>
          <span aria-hidden="true">•</span>
          <span>{nightsCount} ночей</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '14px', color: '#333', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14l-4-4h2v-4h4v4h2l-4 4z" />
            </svg>
            <span>Частями от {tourPrice/6} ₽/мес.</span>
          </div>
          <button 
            className="price-btn"
            style={{
              background: '#ffe135',
              color: '#333',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
              minWidth: '140px',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#ffd700'}
            onMouseOut={(e) => e.currentTarget.style.background = '#ffe135'}
          >
            от {tourPrice.toLocaleString('ru-RU')} ₽
          </button>
        </div>
      </div>
    </article>
  );
});

export default TourCard;