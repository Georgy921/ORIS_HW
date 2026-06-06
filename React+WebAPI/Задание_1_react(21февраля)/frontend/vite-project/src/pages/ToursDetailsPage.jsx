import { useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/tourDetail.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import FilterSearch from '../components/Filters/FiltersSearch';
import TourCardDetail from '../components/TourCard/TourCardDeatail';
import AuthModal from '../components/AuthModal/AuthModal';

function ToursDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTour() {
      try {
        const res = await fetch('/data/tours.json');
        const tours = await res.json();
        const found = tours.find(t => t.id == id);
        setTour(found || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadTour();
  }, [id]);

 /*  // Загрузка Яндекс.Карт
  useEffect(() => {
    if (typeof ymaps === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=c48cab0f-e2c1-4576-8617-bfb16f70401d';
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      // Очистка карты при размонтировании
      const mapContainer = document.getElementById('yandex-map');
      if (mapContainer) mapContainer.innerHTML = '';
    };
  }, [tour]);  */

  /* function initMap() {
    if (!tour?.arrival_city) return;
    
    ymaps.ready(function () {
      // Координаты можно брать из API или использовать геокодер
      const coords = [26.8, 30.8]; // Заглушка — заменить на реальные координаты
      const map = new ymaps.Map('yandex-map', {
        center: coords,
        zoom: 6,
        controls: ['zoomControl', 'fullscreenControl']
      });

      const placemark = new ymaps.Placemark(coords, {
        hintContent: tour?.arrival_city,
        balloonContent: tour?.hotel_name
      }, {
        preset: 'islands#blueDotIcon'
      });

      map.geoObjects.add(placemark);
    });
  }  */

  function handleRedirectHome() {
    navigate('/');
  }

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!tour) return <div className="error-message">Тур не найден</div>;

  return (
    <div className="main-wrapper">
      <Header/>

      <div className="container">
        <TourCardDetail tour={tour}/>
        <FilterSearch/>
      </div>
      <Footer/>
      <AuthModal />
    </div>
  );
}



export default ToursDetailsPage;