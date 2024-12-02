let gifts = [];

document.querySelectorAll('.header__list__item').forEach(item => {
    item.addEventListener('click', function () {
        const link = this.querySelector('a');
        if (link) {
            window.location.href = link.href;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {

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
        if (menuOpen === 1) {
            document.body.style.overflow = 'visible';
            menu.classList.add('closing');
            menu.classList.remove('open');

            setTimeout(() => {
                menu.classList.remove('closing');
                menu.style.visibility = 'hidden';
            }, 500);
            menuOpen = 0;
        } else {
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

    if (daysCount) {
        daysCount.innerText = days;
        hoursCount.innerText = hours;
        minutesCount.innerText = minutes;
        secondsCount.innerText = seconds;
    }

}

setInterval(Timer, 1000);

//slider

const sliderContainer = document.getElementById('slider-container');
let sliderContainerWidth = 0;
const arrowLeft = document.querySelector('.slider__arrow-left');
const arrowRight = document.querySelector('.slider__arrow-right');

let clickCount = 3;
let sliderStep = 0;
let marginLeft = 0;
let sliderPosition = 0;

function updateSliderStep() {
    if(sliderContainer){
        const pageWidth = document.documentElement.scrollWidth;
        if (pageWidth >= 769) {
            clickCount = 3;
        } else {
            clickCount = 6;
        }

        if (pageWidth >= 1190) {
            marginLeft = 82;
        } else {
            marginLeft = 8;
        }

        sliderContainerWidth = sliderContainer.offsetWidth;
        sliderPosition = 0;

        let visibleArea = document.querySelector('.slider__container__img-slider-row').offsetWidth;
        sliderStep = (sliderContainerWidth - visibleArea) / clickCount;

        sliderContainer.style.left = -sliderPosition + 'px';

        updateButtons();
    }

}

function initSlider() {
    updateSliderStep();
    window.addEventListener('resize', updateSliderStep);
}

function nextSliderStep() {

    if (sliderPosition >= (sliderStep * clickCount)) return;

    sliderPosition += sliderStep;
    sliderContainer.style.left = -sliderPosition + 'px';
    updateButtons();
}

function prevSliderStep() {

    if (sliderPosition <= 1) return;
    sliderPosition -= sliderStep;
    sliderContainer.style.left = -sliderPosition + 'px';
    updateButtons();
}

function updateButtons() {
    if (sliderPosition <= 1) {
        arrowLeft.classList.remove('active');
    } else {
        arrowLeft.classList.add('active');
    }

    if (sliderPosition >= (sliderStep * clickCount)) {
        arrowRight.classList.remove('active');
    } else {
        arrowRight.classList.add('active');
    }
}

initSlider();

if(arrowRight){
    arrowRight.addEventListener('click', nextSliderStep);
    arrowLeft.addEventListener('click', prevSliderStep);
}


//BEST GIFTS

const giftsListHome = document.querySelector('.home__gifts-list');
const giftsListGifts = document.querySelector('.gifts__gifts-list');

document.addEventListener("DOMContentLoaded", function () {
    fetch('./gifts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            gifts = data;
            if(giftsListHome){
                updateBestGifts();
            }
            if(giftsListGifts){
                renderGiftsList();
            }

        })
        .catch(error => {
            console.error('Ошибка загрузки файла:', error);
        });
});

function generateRandomFourCards() {
    let randomCards = [];
    while (randomCards.length < 4) {
        const randomIndex = Math.floor(Math.random() * gifts.length);
        const gift = gifts[randomIndex];

        if (!randomCards.includes(gift)) {
            randomCards.push(gift);
        }
    }

    return randomCards;
}

function updateBestGifts() {
    const cards = generateRandomFourCards();
    giftsListHome.innerHTML = '';

    cards.forEach(gift => {
        const card = createCard(gift);
        giftsListHome.append(card);
    })
}

function createCard(gift) {
    const card = document.createElement('div');
    card.classList.add('gift-card');
    const giftCategory = gift.category;
    let giftDushCategory = '';
    if(giftCategory === 'For Harmony') {
        giftDushCategory = 'gift-for-harmony';
    } else if(giftCategory === 'For Work') {
        giftDushCategory = 'gift-for-work';
    } else if(giftCategory === 'For Health') {
        giftDushCategory = 'gift-for-health';
    }

    card.innerHTML = `
        <img src="./assets/${giftDushCategory}.png" alt='Gift ${giftCategory}' class="gift-card__image">
        <div class="gift-card__heading__container">
            <h4 class="heading4 ${giftDushCategory}">${giftCategory}</h4>
            <h3 class="heading3 color-black">${gift.name}</h3>
        </div>
    `

    card.addEventListener('click', () => {
        openPopup(gift);
    });

    return card;
}


//BACK TO TOP BUTTON

const backToTopButton = document.querySelector('.back-to-top-button');
backToTopButton.addEventListener('click', () => {
    window.scrollTo(0, 0);
});

window.addEventListener('resize', updateButtonToTopVisible);
window.addEventListener('scroll', updateButtonToTopVisible);

function updateButtonToTopVisible(){
    const pageWidth = document.documentElement.scrollWidth;

    if(pageWidth <= 768 && window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
        backToTopButton.classList.remove('invisible');
    } else {
        backToTopButton.classList.remove('visible');
        backToTopButton.classList.add('invisible');
    }
}


//GIFT CARDS ON THE GIFT PAGE

function renderGiftsList(){
    const randomGifts = [];
    while (randomGifts.length < gifts.length) {
        const randomIndex = Math.floor(Math.random() * gifts.length);
        const gift = gifts[randomIndex];

        if (!randomGifts.includes(gift)) {
            randomGifts.push(gift);
        }
    }
    giftsListGifts.innerHTML = '';
    randomGifts.forEach((gift) => {
        const card = createCard(gift);
        giftsListGifts.append(card);
    })
}