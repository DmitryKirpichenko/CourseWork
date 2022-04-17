import './Comment.css'

function Comment() {
    return (
        <div className='mn'>
            <div className='main-comment'>
                <div className='img-com' >
                    <img src={require('./img/Pasha.jpeg')} className='img-g'></img>
                </div>
                <div className='com'>
                    Норм такси. Рекомендую всем.
                </div>
                <div className='FIO'>
                    Пархоменко Павел Леонидович
                </div>
            </div>

            <div className='main-comment'>
                <div className='img-com' >
                    <img src={require('./img/Oleg.jpeg')} className='img-g'></img>
                </div>
                <div className='com'>
                    Норм такси. Рекомендую всем.
                </div>
                <div className='FIO'>
                    Давыдчик Олег
                </div>
            </div>

            <div className='main-comment'>
                <div className='img-com' >
                    <img src={require('./img/Slava.jpeg')} className='img-g'></img>
                </div>
                <div className='com'>
                    Такси агонь.
                </div>
                <div className='FIO'>
                    Суглобов Вячеслав Сергеевич
                </div>
            </div>
        </div>




    );
}

export default Comment;