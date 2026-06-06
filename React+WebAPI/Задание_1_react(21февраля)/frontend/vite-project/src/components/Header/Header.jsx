import {useAuth} from '../../contexts/AuthContext';

function Header(){
  const {user, openModal, logout} = useAuth();
  return (
        <header className="header">
        <div className="header-container">
          <div className="header-top">
            <a href="#" className="logo">
              <img src="/src/logo.png" alt="Logo" />
            </a>
            
            <nav className="header-nav" style={{ marginRight: '20px' }}>
              <ul className="header-links" id="eproblema">
                <li style={{ marginRight: '20px' }}><a href="#">Подобрать тур</a></li>
                <li>
                  <a href="#">
                    <span>
                      <img src="/src/expertOnlineIcon.svg" className="header--nav--icon" alt="" />
                      Эксперты online
                    </span>
                  </a>
                </li>
                <li><a href="#">Офисы продаж</a></li>
                <li><a href="#">О компании</a></li>
                <li><a href="#">Вход для агенств</a></li>
              </ul>
            </nav>
            
            <nav className="header-nav" style={{ paddingLeft: '2px' }}>
              <ul className="header-links">
                <li style={{ marginRight: '0px' }}>
                  <a href="#">
                    <img 
                      src="/src/HeaderLocation.png" 
                      style={{ width: '15px', left: '-19px', height: '22px' }} 
                      className="header--nav--icon" 
                      alt=""
                    />
                    Москва
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/src/phone.png" className="header--nav--icon" alt="" />
                    8 800 775 775 8
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => {e.preventDefault(); e.stopPropagation(); openModal();console.log('🖱️ Клик по иконке входа');
      console.log('🔓 openModal тип:', typeof openModal);}} title={user ? `Профиль: ${user.name}` : ''}>
                    <img 
                      id="auth-icon" 
                      src={user ? "/src/AfterAuthUser.png" : "/src/BeforeAuthUser.png"}
                      style={{ transform: 'scale(0.75)' }} 
                      className="header--nav--icon" 
                      alt="Auth"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/src/heart.png" style={{ transform: 'scale(0.75)' }} className="header--nav--icon" alt="Favorites" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/src/scales.png" style={{ transform: 'scale(0.75)' }} className="header--nav--icon" alt="Compare" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/src/Basket.png" style={{ transform: 'scale(0.75)' }} className="header--nav--icon" alt="Cart" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <nav className="main-menu">
            <ul>
              <li><a href="#">Туры</a></li>
              <li><a href="#">Отели</a></li>
              <li><a href="#">Авиабилеты</a></li>
              <li><a href="#">Экскурсионные туры</a></li>
              <li><a href="#">Круизы</a></li>
              <li><a href="#">Поиск по странам</a></li>
              <li style={{ marginRight: '0px' }}>
                <a href="#" id="hot-links">
                  <span className="fire-icon">🔥</span> Горящие туры
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
}
export default Header