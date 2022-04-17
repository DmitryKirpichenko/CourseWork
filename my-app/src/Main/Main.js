import Header from '../Header/Header.js';
import Tagline from '../../Tagline/Tagline';
import About from '../../components/About/About';
import Comment from '../../containers/Comment/Comment'
import Footer from '../../components/Footer/Footer';
import './Main.css'

function Main() {
    return (
        <div className='main-app'>
            <Header />
            <div className='pusto'></div>
            <Tagline />
            <About />
            <Comment />
            <Footer />
        </div>
    )
}
export default Main;