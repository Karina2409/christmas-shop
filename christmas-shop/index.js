let gifts = [];
let randomGifts = [];

const modal = document.querySelector('.modal');

document.querySelectorAll('.header__list__item').forEach(item => {
    item.addEventListener('click', function () {
        const link = this.querySelector('a');
        if (link) {
            window.location.href = link.href;
        }
    });
});

const menu = document.getElementById('menu');

document.addEventListener('DOMContentLoaded', () => {

    const burgerItem = document.getElementById('burgerMenu');
    const menuItems = document.querySelectorAll('.header__list__item');

    let menuOpen = 0;

    for (let menuItem of menuItems) {
        menuItem.addEventListener('click', () => {
            if(window.innerWidth <= 768){
                menu.classList.remove('show');
                document.body.style.overflow = 'visible';
                menu.classList.add('closing');
                burgerItem.classList.remove('open');
                setTimeout(() => {
                    menu.classList.remove('closing');
                    menu.style.visibility = 'hidden';
                }, 500);
                menuOpen = 0;
            }

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

window.addEventListener('resize', () => {
    if(window.innerWidth > 768) {
        menu.style.visibility = 'visible';
    }
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
            randomGifts = generateRandomGifts(gifts);
            if(giftsListHome){
                updateBestGifts();
            }
            if(giftsListGifts){
                updateGiftsList(randomGifts);
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

const tabs = document.querySelectorAll('.main__tabs__tab');

function updateGiftsList(randomGifts){
    giftsListGifts.innerHTML = '';
    randomGifts.forEach((gift) => {
        const card = createCard(gift);
        giftsListGifts.append(card);
    })
}

function generateRandomGifts(giftsCollection){
    const randomGifts = [];
    while (randomGifts.length < giftsCollection.length) {
        const randomIndex = Math.floor(Math.random() * giftsCollection.length);
        const gift = giftsCollection[randomIndex];

        if (!randomGifts.includes(gift)) {
            randomGifts.push(gift);
        }
    }
    return randomGifts;
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(el => el.classList.remove('active'));
        tab.classList.add('active');
        const category = startWithBigLetter(tab.innerText);
        let giftsByCategory = []
        if(category !== 'All'){
            giftsByCategory = getGiftsByCategory(category);
        }
        else{
            giftsByCategory = randomGifts;
        }
        updateGiftsList(giftsByCategory);
    });
});

function getGiftsByCategory(category){
    const giftsOfCategory = [];
    randomGifts.forEach(gift => {
        if(gift.category === category){
            giftsOfCategory.push(gift);
        }
    })
    return giftsOfCategory;
}

function startWithBigLetter(str){
    if(!str) return str;
    return str
        .split(' ')
        .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}


//MODAL

function openPopup(gift){
    let div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    let clientWidthBefore = document.body.clientWidth;

    document.body.style.overflow = 'hidden';

    modal.classList.add('visible');
    modal.classList.remove('invisible');
    backToTopButton.classList.remove('visible');
    backToTopButton.classList.add('invisible');

    modal.innerHTML = ``

    let modalGift = document.createElement('div');

    modalGift.classList.add('modal__gift');
    modalGift.classList.add('gift-card');

    modalGift.innerHTML = createModalCard(gift);


    const closeModal = document.createElement('div');
    closeModal.classList.add('modal__close-button');
    closeModal.innerHTML = `
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 10L10 30" stroke="#181C29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M10 10L30 30" stroke="#181C29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `;

    closeModal.addEventListener('click', () => {
        closeModalWindow()
    });

    modalGift.appendChild(closeModal);

    modal.append(modalGift);

    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            closeModalWindow()
        }

    })

    if (document.body.clientWidth > clientWidthBefore) {
        document.body.style.paddingRight = `${scrollWidth}px`;
    }

    function closeModalWindow() {
        backToTopButton.classList.add('visible');
        backToTopButton.classList.remove('invisible');
        document.body.style.overflow = '';
        document.body.style.paddingRight = `0px`;
        modal.classList.remove('visible');
        modal.classList.add('invisible');
    }
}


function createModalCard(gift){

    const giftCategory = gift.category;
    let giftDushCategory = '';
    if(giftCategory === 'For Harmony') {
        giftDushCategory = 'gift-for-harmony';
    } else if(giftCategory === 'For Work') {
        giftDushCategory = 'gift-for-work';
    } else if(giftCategory === 'For Health') {
        giftDushCategory = 'gift-for-health';
    }

    const superpowers = Object.values(gift.superpowers);

    for (let superpower of superpowers) {
        generateSnowCount(superpower);
    }

    const modalCardHTML = `
        <div class="modal-card__image">
            <img alt="${giftCategory}" src="./assets/${giftDushCategory}.png">
        </div>
        <div class="modal-gift__text__container">
            <div class="modal-gift__heading__container">
                <h4 class="heading4 ${giftDushCategory}">${giftCategory}</h4>
                <h3 class="heading3 color-black">${gift.name}</h3>
                <p class="paragraph color-black">${gift.description}</p>
            </div>
            <div class="superpowers">
                <h4 class="heading4 color-black">Adds superpowers to:</h4>
                <div class="superpowers__items">
                    <div class="superpowers__item">
                        <p class="paragraph name color-black">Live</p>
                        <p class="paragraph power color-black">${gift.superpowers.live}</p>
                        <div class="power-images__container">
                            ${generateSnowCount(gift.superpowers.live)}
                        </div>
                    </div>
                    <div class="superpowers__item">
                        <p class="paragraph name color-black">Create</p>
                        <p class="paragraph power color-black">${gift.superpowers.create}</p>
                        <div class="power-images__container">
                            ${generateSnowCount(gift.superpowers.create)}
                        </div>
                    </div>
                    <div class="superpowers__item">
                        <p class="paragraph name color-black">Create</p>
                        <p class="paragraph power color-black">${gift.superpowers.love}</p>
                        <div class="power-images__container">
                            ${generateSnowCount(gift.superpowers.love)}
                        </div>
                    </div>
                    <div class="superpowers__item">
                        <p class="paragraph name color-black">Create</p>
                        <p class="paragraph power color-black">${gift.superpowers.dream}</p>
                        <div class="power-images__container">
                            ${generateSnowCount(gift.superpowers.dream)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `

    return (modalCardHTML);
}

function generateSnowCount(superpower){
    let snows = document.createElement('div');
    snows.classList.add('power-images');
    let snowCount = superpower.slice(1)/100;
    const snowRedElement = document.createElement('div');
    snowRedElement.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_35071_40)">
                <path d="M12.1959 9.88162L11.6482 9.56542L13.1158 9.17219L12.8732 8.26704L10.5005 8.90278L9.38146 8.25667C9.39689 8.17336 9.40538 8.08765 9.40538 7.99997C9.40538 7.91229 9.39692 7.82655 9.38146 7.74327L10.5005 7.09716L12.8732 7.7329L13.1158 6.82775L11.6482 6.43452L12.1959 6.11831L14.546 5.97725L14.8921 4.02063L13.0246 3.34203L11.7274 5.30677L11.1797 5.62297L11.5729 4.15545L10.6678 3.91293L10.032 6.28561L8.91226 6.93211C8.78247 6.82103 8.63242 6.73313 8.4683 6.67494V5.3828L10.2052 3.64586L9.5426 2.98325L8.46827 4.05755V3.42515L9.51792 1.32584L7.99976 0L6.48157 1.3259L7.53122 3.42521V4.05761L6.45689 2.98332L5.79429 3.64592L7.53119 5.38286V6.675C7.36708 6.73319 7.21702 6.82109 7.08724 6.93217L5.96746 6.28568L5.33171 3.91299L4.42656 4.15551L4.81979 5.62304L4.27213 5.30684L2.9749 3.34209L1.10742 4.02069L1.45349 5.97731L3.80362 6.11838L4.35128 6.43458L2.88375 6.82781L3.1263 7.73296L5.49898 7.09722L6.61807 7.74333C6.60264 7.82664 6.59414 7.91235 6.59414 8.00003C6.59414 8.08771 6.60261 8.17345 6.61807 8.25673L5.49898 8.90285L3.1263 8.2671L2.88375 9.17226L4.35128 9.56548L3.80362 9.88169L1.45349 10.0227L1.10742 11.9793L2.97493 12.6579L4.27216 10.6932L4.81985 10.377L4.42662 11.8445L5.33177 12.087L5.96752 9.71435L7.0873 9.06786C7.21708 9.17894 7.36714 9.26684 7.53125 9.32503V10.6172L5.79435 12.3541L6.45696 13.0167L7.53129 11.9424V12.5748L6.48163 14.6741L7.99983 16L9.51802 14.6741L8.46837 12.5748V11.9424L9.5427 13.0167L10.2053 12.3541L8.4684 10.6172V9.32503C8.63251 9.26684 8.78257 9.17894 8.91235 9.06786L10.0321 9.71435L10.6679 12.087L11.573 11.8445L11.1798 10.377L11.7275 10.6932L13.0247 12.6579L14.8922 11.9793L14.5462 10.0227L12.1959 9.88162Z"
                      fill="#FF4646"/>
            </g>
            <defs>
                <clipPath id="clip0_35071_40">
                    <rect width="16" height="16" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    `
    const snowGrayElement = document.createElement("div");
    snowGrayElement.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_35071_58)">
            <path d="M12.1959 9.88162L11.6482 9.56542L13.1158 9.17219L12.8732 8.26704L10.5005 8.90278L9.38146 8.25667C9.39689 8.17336 9.40538 8.08765 9.40538 7.99997C9.40538 7.91229 9.39692 7.82655 9.38146 7.74327L10.5005 7.09716L12.8732 7.7329L13.1158 6.82775L11.6482 6.43452L12.1959 6.11831L14.546 5.97725L14.8921 4.02063L13.0246 3.34203L11.7274 5.30677L11.1797 5.62297L11.5729 4.15545L10.6678 3.91293L10.032 6.28561L8.91226 6.93211C8.78247 6.82103 8.63242 6.73313 8.4683 6.67494V5.3828L10.2052 3.64586L9.5426 2.98325L8.46827 4.05755V3.42515L9.51792 1.32584L7.99976 0L6.48157 1.3259L7.53122 3.42521V4.05761L6.45689 2.98332L5.79429 3.64592L7.53119 5.38286V6.675C7.36708 6.73319 7.21702 6.82109 7.08724 6.93217L5.96746 6.28568L5.33171 3.91299L4.42656 4.15551L4.81979 5.62304L4.27213 5.30684L2.9749 3.34209L1.10742 4.02069L1.45349 5.97731L3.80362 6.11838L4.35128 6.43458L2.88375 6.82781L3.1263 7.73296L5.49898 7.09722L6.61807 7.74333C6.60264 7.82664 6.59414 7.91235 6.59414 8.00003C6.59414 8.08771 6.60261 8.17345 6.61807 8.25673L5.49898 8.90285L3.1263 8.2671L2.88375 9.17226L4.35128 9.56548L3.80362 9.88169L1.45349 10.0227L1.10742 11.9793L2.97493 12.6579L4.27216 10.6932L4.81985 10.377L4.42662 11.8445L5.33177 12.087L5.96752 9.71435L7.0873 9.06786C7.21708 9.17894 7.36714 9.26684 7.53125 9.32503V10.6172L5.79435 12.3541L6.45696 13.0167L7.53129 11.9424V12.5748L6.48163 14.6741L7.99983 16L9.51802 14.6741L8.46837 12.5748V11.9424L9.5427 13.0167L10.2053 12.3541L8.4684 10.6172V9.32503C8.63251 9.26684 8.78257 9.17894 8.91235 9.06786L10.0321 9.71435L10.6679 12.087L11.573 11.8445L11.1798 10.377L11.7275 10.6932L13.0247 12.6579L14.8922 11.9793L14.5462 10.0227L12.1959 9.88162Z" fill="#FF4646" fill-opacity="0.1" />
          </g>
          <defs>
            <clipPath id="clip0_35071_58">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
    `;

    for (let i = 0; i < snowCount; i++) {
        snows.appendChild(snowRedElement.cloneNode(true));
    }

    // Добавляем серые снежинки для оставшегося количества
    const remaining = Math.max(0, 5 - snowCount);
    for (let i = 0; i < remaining; i++) {
        snows.appendChild(snowGrayElement.cloneNode(true));
    }

    return snows.outerHTML;
}