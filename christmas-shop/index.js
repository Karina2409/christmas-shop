document.querySelectorAll('.header__list__item').forEach(item => {
    item.addEventListener('click', function () {
        const link = this.querySelector('a');
        if (link) {
            window.location.href = link.href;
        }
    });
});

// document.addEventListener('DOMContentLoaded', event => {
//     let div = document.createElement('div');
//     div.style.overflowY = 'scroll';
//     div.style.width = '50px';
//     div.style.height = '50px';
//     document.body.append(div);
//     let scrollWidth = div.offsetWidth - div.clientWidth;
//     div.remove();
//
//     const burgerItem = document.getElementById('burgerMenu');
//     const menu = document.getElementById('menu');
//
//     let menuOpen = 0;
//
//     burgerItem.addEventListener('click', () => {
//         burgerItem.classList.toggle('open');
//         menu.classList.toggle('show');
//         document.body.style.overflow = 'hidden';
//         menuOpen = 1;
//     });
//
// })

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