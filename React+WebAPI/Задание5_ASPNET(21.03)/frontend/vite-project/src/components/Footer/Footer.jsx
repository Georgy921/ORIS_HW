function Footer() {
    return (
    <footer className="footer">
        <div className="container">
            <div className="footer-subscribe">
            <div className="subscribe-text">
                <h3>Будь в курсе</h3>
                <p>Подпишитесь и получайте выгодные туры на свою почту</p>
            </div>
            <div className="subscribe-form">
                <input type="email" placeholder="Email" className="subscribe-input" />
                <button className="subscribe-btn">Подписаться</button>
            </div>
            <p className="subscribe-note">
                Нажимая «Подписаться» вы даёте согласие на обработку{' '}
                <a href="#">персональных данных.</a>
            </p>
            </div>

            <div className="footer-divider" />

            {/* Основная часть footer */}
            <div className="footer-main">
            <div className="footer-left">
                <div className="footer-logo-section">
                <img src="src/logo1.png" alt="FUN&SUN" className="footer-logo" />
                <div className="contact-info">
                    <div className="footer-phone">8 800 775 775 8</div>
                    <div className="footer-socials">
                    <a href="#" className="social-icon"><img src="src/vk.png" alt="VK" /></a>
                    <a href="#" className="social-icon"><img src="src/tg.png" alt="Telegram" /></a>
                    <a href="#" className="social-icon"><img src="src/tiktok.png" alt="TikTok" /></a>
                    <a href="#" className="social-icon"><img src="src/youtube.png" alt="YouTube" /></a>
                    </div>
                </div>
                </div>

                <div className="footer-app">
                <div className="app-text">
                    <strong>Через приложение удобнее!</strong>
                    <p>Наведите камеру смартфона на QR-код и скачайте приложение FUN&SUN</p>
                </div>
                <img src="src/qr-code.png" alt="QR-код" className="app-qr" />
                </div>

                <div className="footer-currency">
                <div className="currency-item">
                    <img src="https://fstravel.com/storage/images/eur.png" alt="EUR" className="currency-flag" />
                    <span className="currency-code">EUR</span>
                    <span className="currency-value">96.8</span>
                </div>
                <div className="currency-item">
                    <img src="https://fstravel.com/storage/images/usd1.png" alt="USD" className="currency-flag" />
                    <span className="currency-code">USD</span>
                    <span className="currency-value">81.5</span>
                </div>
                </div>
                <a href="#" className="currency-history">История изменения курса</a>

                <p className="footer-disclaimer">
                Представленная на сайте информация носит справочный характер и не является публичной офертой.
                ©2026, FUN&SUN
                <br />
                <a href="#" className="legal-link">Правовая информация</a>
                </p>
            </div>
            <div className="footer-column">
                <h4>Отдых</h4>
                <ul>
                <li><a href="#">Туры</a></li>
                <li><a href="#">Отели</a></li>
                <li><a href="#">Экскурсионные туры</a></li>
                <li><a href="#">Авиабилеты</a></li>
                <li><a href="#">Горящие туры</a></li>
                <li><a href="#">Туры по России</a></li>
                <li><a href="#">Туры на регулярных рейсах</a></li>
                </ul>
            </div>
            <div className="footer-column">
                <h4>FUN&SUN</h4>
                <ul>
                <li><a href="#">Контакты</a></li>
                <li><a href="#">О нас</a></li>
                <li><a href="#">Новости</a></li>
                <li><a href="#">Офисы продаж</a></li>
                <li><a href="#">Программа лояльности</a></li>
                <li><a href="#">Реферальная программа</a></li>
                <li><a href="#">Акции</a></li>
                <li><a href="#">Условия оплаты</a></li>
                <li><a href="#">Партнерская программа</a></li>
                <li><a href="#">Деловые поездки и MICE</a></li>
                </ul>
            </div>
            <div className="footer-column">
                <h4>Помощь</h4>
                <ul>
                <li><a href="#">Проверить статус заказа</a></li>
                <li><a href="#">Равнозначный турпродукт</a></li>
                <li><a href="#">Обратиться в юридический отдел</a></li>
                <li><a href="#">Обратиться в службу безопасности</a></li>
                <li><a href="#">Правила въезда</a></li>
                <li><a href="#">Визы</a></li>
                <li><a href="#">Как забронировать тур онлайн?</a></li>
                <li><a href="#">Условия отмены тура</a></li>
                <li><a href="#">Правила покупки билетов на самолет, ж/д поезд и автобус без тура</a></li>
                <li><a href="#">Политика в области защиты и обработки персональных данных</a></li>
                </ul>
            </div>
            </div>
            <div className="footer-links-bottom">
            <a href="#">Круизы</a>
            <a href="#">Страны</a>
            <a href="#">Новости туризма</a>
            </div>

            <div className="footer-divider" />
            <div className="footer-cookie">
            <p>
                Для повышения удобства работы с сайтом, ООО ТТ-Трэвел{' '}
                <a href="#">использует файлы cookie</a>. Продолжая использовать наш сайт, вы принимаете условия
                Соглашения в отношении использования пользовательских данных.{' '}
                <a href="#">Если вы не хотите, чтобы пользовательские данные обрабатывались, отключите cookie в настройках браузера</a>
            </p>
            </div>
        </div>
        <button 
            className="scroll-to-top" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
            <img src="src/scroll_up.png" alt="Наверх" />
        </button>
    </footer>
    );
}
export default Footer
