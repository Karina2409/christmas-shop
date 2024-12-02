document.querySelectorAll('.header__list__item').forEach(item => {
    item.addEventListener('click', function () {
        const link = this.querySelector('a');
        if (link) {
            window.location.href = link.href;
        }
    });
});

document.addEventListener('DOMContentLoaded', event => {
    let div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    const burgerItem = document.getElementById('burgerMenu');
    const menu = document.getElementById('menu');
    const menuItems = document.querySelectorAll('.header__list__item.active');

    let menuOpen = 0;

    for (let menuItem of menuItems) {
        menuItem.addEventListener('click', () => {
            menu.classList.remove('show');
            document.body.style.overflow = 'visible';
            menu.classList.add('closing');
            burgerItem.classList.remove('open');
            setTimeout(() => {
                menu.classList.remove('closing');
                menu.style.visibility = 'hidden';
            }, 500);
            menuOpen = 0;
        });
    }


    burgerItem.addEventListener('click', () => {
        burgerItem.classList.toggle('open');
        menu.classList.toggle('show');
        if(menuOpen === 1) {
            document.body.style.overflow = 'visible';
            menu.classList.add('closing');
            menu.classList.remove('open');

            setTimeout(() => {
                menu.classList.remove('closing');
                menu.style.visibility = 'hidden';
            }, 500);
            menuOpen = 0;
        }
        else{
            document.body.style.overflow = 'hidden';
            menu.style.visibility = 'visible';
            menu.classList.remove('closing');
            menuOpen = 1;
        }
    });
})

//timer

const currentYear = new Date().getUTCFullYear();
const newYear = Date.UTC(currentYear + 1, 0, 1, 0, 0, 0);

const daysCount = document.getElementById('day-count');
const hoursCount = document.getElementById('hours-count');
const minutesCount = document.getElementById('minutes-count');
const secondsCount = document.getElementById('seconds-count');

function Timer() {
    const todayDate = Date.now();
    const gap = newYear - todayDate;
    const days = Math.floor(gap / 1000 / 60 / 60 / 24);
    const hours = Math.floor((gap / 1000 / 60 / 60) % 24);
    const minutes = Math.floor((gap / 1000 / 60) % 60);
    const seconds = Math.floor((gap / 1000) % 60);

    if(daysCount){
        daysCount.innerText = days;
        hoursCount.innerText = hours;
        minutesCount.innerText = minutes;
        secondsCount.innerText = seconds;
    }

} setInterval(Timer, 1000);

//slider

const sliderContainer = document.getElementById('slider-container');
const arrowLeft = document.querySelector('.slider__arrow-left');
const arrowRight = document.querySelector('.slider__arrow-right');

let clickCount = 3;
let sliderStep = 0;
let marginLeft = 0;

function refreshSliderStep(){
    const pageWidth = document.documentElement.scrollWidth;
    if(pageWidth >= 769){
        sliderStep = 3;
    } else if(pageWidth < 769){
        sliderStep = 6;
    }

    if(pageWidth >= 1440){}
}

arrowRight.addEventListener('click', () => {
   sliderContainer.style.transform = 'translateX(10px)';
});


document.addEventListener('DOMContentLoaded', () => {
    console.log(`Done (100/100):
1. Макет страниц выравнивает дизайн по ширине экрана 1440px: +16
- <header> на каждой странице: +2
- Hero раздел на Home странице: +2
- About раздел на Home странице: +2
- Slider раздел на Home странице: +2
- Best Gifts раздел на Home странице: +2
- CTA раздел на Home странице: +2
- Gifts раздел на Gifts странице: +2
- <footer> на каждой странице: +2
2. Макет страниц выравнивает дизайн по ширине экрана 768px: +16
- <header> на каждой странице: +2
- Hero раздел на Home странице: +2
- About раздел на Home странице: +2
- Slider раздел на Home странице: +2
- Best Gifts раздел на Home странице: +2
- CTA раздел на Home странице: +2
- Gifts раздел на Gifts странице: +2
- <footer>на каждой странице: +2
3. Макет страниц выравнивает дизайн по ширине экрана 380px: +16
- <header> на каждой странице: +2
- Hero раздел на Home странице: +2
- About раздел на Home странице: +2
- Slider раздел на Home странице: +2
- Best Gifts раздел на Home странице: +2
- CTA раздел на Home странице: +2
- Gifts раздел на Gifts странице: +2
- <footer> на каждой странице: +2
4. Горизонтальная полоса прокрутки отсутствует на всех экранах шириной до 380 пикселей включительно. Все содержимое страницы остается в соответствии с дизайном: не обрезается, не удаляется и не сдвигается в сторону: +24
- Home страница: нет горизонтальной полосы прокрутки между 1440 и 768 пикселями ширина: +6
- Home страница: нет горизонтальной полосы прокрутки между 768 и 380 пикселями ширина: +6
- Gifts страница: нет горизонтальной полосы прокрутки между 1440 и 768 пикселями ширина: +6
- Gifts страница: нет горизонтальной полосы прокрутки между 768 и 380 пикселями ширина: +6
5. При плавном изменении размера окна браузера с 1440 пикселей до 380 пикселей макет занимает всю ширину окна (включая указанные поля), элементы соответствующим образом изменяют свои размеры и положение без полного масштабирования, элементы не перекрываются, а изображения сохраняют правильные пропорции: +8
- На Home странице: +4
- На Gifts странице: +4
6. При ширине экрана 768 пикселей меню и навигационные ссылки <header> скрыты на обеих страницах, а значок меню «бургер» отображается: +4
(Примечание: активация значка меню «бургер» на данном этапе не оценивается.)
7. Эффекты наведения активны на настольных устройствах (в соответствии с Desktop типом устройства в DevTools) и отключены для мобильных устройств (в соответствии с Mobile типом устройства в DevTools) на обеих страницах: +4
Макет обеих страниц проверен и не содержит ошибок в соответствии с W3C Validator ( https://validator.w3.org/ ): +12`)
})