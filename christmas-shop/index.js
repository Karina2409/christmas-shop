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
const sliderContainerWidth = sliderContainer.offsetWidth;
const arrowLeft = document.querySelector('.slider__arrow-left');
const arrowRight = document.querySelector('.slider__arrow-right');

let clickCount = 3;
let sliderStep = 0;
let marginLeft = 0;
let sliderPosition = 0;

function updateSliderStep(){
    const pageWidth = document.documentElement.scrollWidth;
    if(pageWidth >= 769){
        clickCount = 3;
    } else {
        clickCount = 6;
    }

    if(pageWidth >= 1190){
        marginLeft = 82;
    } else {
        marginLeft = 8;
    }

    sliderPosition = 0;
    let visibleArea = document.querySelector('.slider__container__img-slider-row').offsetWidth;
    sliderStep = (sliderContainerWidth - visibleArea) / clickCount;

    sliderContainer.style.left = -sliderPosition + 'px';
    updateButtons();
}

function initSlider(){
    updateSliderStep();
    window.addEventListener('resize', updateSliderStep);
}

function nextSliderStep(){

    if (sliderPosition >= (sliderStep * clickCount)) return;

    sliderPosition += sliderStep;
    sliderContainer.style.left = -sliderPosition + 'px';
    updateButtons();
}

function prevSliderStep(){

    if(sliderPosition <= 1) return;
    sliderPosition -= sliderStep;
    sliderContainer.style.left = -sliderPosition + 'px';
    updateButtons();
}

function updateButtons(){
    if(sliderPosition <= 1){
        arrowLeft.classList.remove('active');
    }
    else{
        arrowLeft.classList.add('active');
    }

    if(sliderPosition >= (sliderStep * clickCount)){
        arrowRight.classList.remove('active');
    }
    else {
        arrowRight.classList.add('active');
    }
}

initSlider();

arrowRight.addEventListener('click', nextSliderStep);
arrowLeft.addEventListener('click', prevSliderStep);
