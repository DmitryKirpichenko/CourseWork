import './Footer.css'

function Footer() {
    return (
        <div className='main-footer'>
            <div>
                <ul className="social-icons">
                    <li><a href="http://www.instagram.com"><img src={require('../../icon/Instagram_black.png')} /></a></li>
                    <li><a href="http://www.twitter.com"><img src={require('../../icon/Telegram_black.png')} /></a></li>
                    <li><a href="http://www.youtube.com"><img src={require('../../icon/VK_black.png')} /></a></li>
                </ul>
            </div>
            <div className='text-footer'>
            ©2022 FTaxi. Сайт создан Кирпиченко Дмитрием
            </div>
        </div>
    );
}

export default Footer;