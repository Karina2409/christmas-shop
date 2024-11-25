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
    console.log("\nDone: \n\n" +
        "1. Checking validation of pages: +18\n" +
        "- The layout for both pages is validated and error-free according to the W3C Validator (https://validator.w3.org/): +12 (6 points per page)\n" +
        "- Valid markup of checked page corresponds to the message \"Document checking completed. No errors or warnings to show.\" In this case, we assign the full points for the checked page (+6).\n" +
        "- If there are warnings but no errors, we assign half of the points (+3) for the checked page\n" +
        "- Favicon is added to each page: +2\n" +
        "- Only one <h1> per each page: +2\n" +
        "- The URL of the Gifts page differs from the URL of the Home page (e.g. your-site.com for the Home page and your-site.com/gifts for the Gifts page): +2\n" +
        "2. The layout matches the design: +46\n" +
        "- <header> on each page: +4\n" +
        "- Hero section on Home page: +6\n" +
        "- About section on Home page: +6\n" +
        "- Slider section on Home page: +6\n" +
        "- Best Gifts section on Home page: +6\n" +
        "- CTA section on Home page: +6\n" +
        "- Gifts section on Gifts page: +6\n" +
        "- <footer> on each page: +6\n" +
        "3. CSS Requirements: +10\n" +
        "- For positioning gifts in Best Gifts section on Home page and gifts in Gifts section on Gifts page used Flexbox or Grid Layout: +4\n" +
        "- When scaling the browser page (<100%) or increasing the page width (>1440px), the layout of both pages is centered rather than shifted to the side and not stretched across the entire width: +4\n" +
        "- The empty spaces around the layout are filled with white color: +2\n" +
        "4. Interactivity: +36\n" +
        "- Navigation elements (except CONTACTS) lead to corresponding sections on Home page: +4\n" +
        "- CONTACTS in navigation panel links to the <footer> on its own page: +2\n" +
        "- Smooth scrolling with anchor links: +2\n" +
        "- When clicking on the GIFTS link in <header> and Explore Magical Gifts button in Hero and CTA sections on Home page, it navigates to the Gifts page: +2\n" +
        "- The GIFTS link in <header> on Gifts page is non-interactive and don't have a hover effects: +2\n" +
        "- When clicking on the Logo in <header>, it navigates to the Home page: +2\n" +
        "- The active ALL tab in Gifts section of Gifts page is non-interactive and don't have a hover effects: +2\n" +
        "- Each Gift-card in the Gifts section of the Gifts page, Best Gifts section on Home page and cards in <footer> is interactive when hovering over any area of the card: +6\n" +
        "- In the <footer>, clicking on the card CALL US should initiate a phone call: +2\n" +
        "- In the <footer>, clicking on the card WRITE US should open the mail client: +2\n" +
        "- In the <footer>, clicking on the card MAGIC FOREST should open a new browser tab with Google Maps displaying any location of your choice: +2\n" +
        "- In the <footer>, clicking on the link Made in Rolling Scopes School should open the school's website in a new tab: +2\n" +
        "- Interactivity of the links and buttons is implemented according to the Figma layout. Interactivity includes not only changing cursor's appearance, for example, using the cursor: pointer property, but also the use of other visual effects, such as changing the background color or font color, following the Styleguide in the Figma layout. If the interactivity is not specified in the Styleguide, cursor: pointer property is enough: +4\n" +
        "- Mandatory requirement for interactivity: smooth change in the appearance of an element on hover, without affecting adjacent elements: +2")
})