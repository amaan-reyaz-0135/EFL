//-------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------//
//----------------------- JS For Preloaders On Every Page -----------------------//
//-------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------//

const minDisplayTime = 4000;   //-- Minimum Time For Preloader (4s) --//
const startTime = Date.now();
    
function hidePreloader() {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minDisplayTime - elapsed);
      
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        
        //-- Calculated Duration For a Dynamic Fade-Out Based On Load Time --//
        //-- If The Page Took More Than 4s, Longer Fade-Out Set Upto 2s --//
        let fadeDuration = 0.5;   //-- Default Fade Duration --> 0.5s --//
        if (elapsed > minDisplayTime) {

            //-- For Every Extra 1s (1000ms) Above The Minimum, Add 0.3s (Upto 2s Max) --//
            fadeDuration = Math.min(0.5 + ((elapsed - minDisplayTime) / 1000) * 0.3, 2);
        }

        preloader.style.transition = `opacity ${fadeDuration}s ease-out`;
        preloader.offsetWidth;   //-- Force Reflow --//
        preloader.style.opacity = "0";
        
        setTimeout(() => {
            preloader.style.display = "none";
            document.getElementById('content').style.opacity = "1";
        }, fadeDuration * 1000);
    }, remaining);
}
    
window.addEventListener('load', hidePreloader);

//-- Fallback --> Hide Preloader After 10 Secs (max) --//
setTimeout(hidePreloader, 10000);



//-------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------//
//-------------------- JS For Burger Menu For Small Devices ---------------------//
//-------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------//

const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');

    //-- Animate Nav Links With a Stagger Effect --//
    navLinks.querySelectorAll('li').forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    //-- Toggle Burger Animation --//
    burger.classList.toggle('toggle');
});
    
//-- Append Dynamic Keyframes For Nav Links Fade-In Effect  --//
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    .burger.toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    .burger.toggle .line2 {
        opacity: 0;
    }
    .burger.toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(styleSheet);



//-------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------//
//---------------- JS For Automated Images Slider For Home Page -----------------//
//-------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------//

let images;
if(window.innerWidth < 768) {

    //-- Images For Slider For Small Devices --//
    images = [
        'static/images/ph-slider-1.png',
        'static/images/ph-slider-2.png',
        'static/images/ph-slider-3.png',
        'static/images/ph-slider-4.png',
        'static/images/ph-slider-5.png'
    ];
} else {

    //-- Images For Desktop For Large Devices --//
    images = [
        'static/images/pc-slider-1.png',
        'static/images/pc-slider-2.png',
        'static/images/pc-slider-3.png',
        'static/images/pc-slider-4.png',
        'static/images/pc-slider-5.png'
    ];
}
    
let current = 0;
const bg1 = document.getElementById('bg1');
const bg2 = document.getElementById('bg2');
    
//-- Initialize: Show The First Image On bg1 --//
bg1.style.backgroundImage = `url(${images[current]})`;
bg1.style.opacity = 1;
bg2.style.opacity = 0;
    
setInterval(() => {

    //-- Calculated Next Image Index --//
    current = (current + 1) % images.length;

    //-- Set bg2's Background To The Next Image --//
    bg2.style.backgroundImage = `url(${images[current]})`;

    //-- Fade In bg2 --//
    bg2.style.opacity = 1;
      
    //-- After The Transition Duration --> Swap Roles --//
    setTimeout(() => {

        //-- Copy bg2 Image To bg1, Then Hide bg2 --//
        bg1.style.backgroundImage = bg2.style.backgroundImage;
        bg2.style.opacity = 0;
    }, 1000);   //-- Matching Duration Of This With The CSS Transition Duration (1s) --//
}, 2500); //-- Change Image Every 2.5s --//



//-------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------//
//------------------ JS For Scroll-To-Top Button On Every Page ------------------//
//-------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------//

//-- Get The Scroll-To-Top Button Element --//
const scrollToTopBtn = document.getElementById('scrollToTop');
    
//-- Function To Show/Hide The Button Based On Scroll Position --//
function toggleScrollButton() {

    //-- Show The Button If Scrolled More Than 100px, Hide Otherwise --//
    if (window.pageYOffset > 100) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
}
    
//-- Listen For Scroll Events --//
window.addEventListener('scroll', toggleScrollButton);
    
//-- Call The Function Once On Page Load In Case The Page Is Not At The Top --//
toggleScrollButton();
    
//-- Add Click Event To Smoothly Scroll To The Top When The Button Is Clicked --//
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});



//-------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------//
//---------- JS For Pagination Of Feature Updates Section On Index Page ---------//
//-------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------//

let currentPage = 1;
let cardsPerPage = window.innerWidth <= 768 ? 3 : 4; // Adjust based on screen size
let paginationDiv = document.querySelector(".pagination");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let allCards = document.querySelectorAll(".card");   //-- All Feature Cards --//
let filteredCards = Array.from(allCards);   //-- This Will Hold The Filtered Results --//

function displayPlayers() {
    let start = (currentPage - 1) * cardsPerPage;
    let end = start + cardsPerPage;

    //-- Hide All Cards --//
    allCards.forEach(card => card.style.display = "none");

    //-- Show Only Cards For The Current Page --//
    filteredCards.forEach((card, index) => {
        if (index >= start && index < end) {
            card.style.display = "flex";
        }
    });
    
    updatePagination();
}

function updatePagination() {
    let totalPages = Math.ceil(filteredCards.length / cardsPerPage);

    document.getElementById("pageIndicator").innerText = `${currentPage} of ${totalPages}`;

    //-- Show/Hide Pagination Based On The Number Of Results --//
    paginationDiv.style.display = (filteredCards.length > cardsPerPage) ? "flex" : "none";

    //-- Fade Buttons Instead Of Hiding Them --//
    prevBtn.style.opacity = (currentPage === 1) ? "0.5" : "1";
    prevBtn.style.pointerEvents = (currentPage === 1) ? "none" : "auto";

    nextBtn.style.opacity = (currentPage === totalPages || totalPages === 0) ? "0.5" : "1";
    nextBtn.style.pointerEvents = (currentPage === totalPages || totalPages === 0) ? "none" : "auto";
}

function nextPage() {
    let totalPages = Math.ceil(filteredCards.length / cardsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayPlayers();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayPlayers();
    }
}

displayPlayers();



//-------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------//
//-------------------- JS For Events Calender On Index Page ---------------------//
//-------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------//

let currentFilter = "all";
let visibleCount = 4;

document.addEventListener("DOMContentLoaded", function () {
    resetEvents();
});

function filterEvents(type) {
    currentFilter = type;
    visibleCount = 4;
    updateEventDisplay();
}

function resetEvents() {
    currentFilter = "all";
    visibleCount = 4;
    updateEventDisplay();
}

function showMoreEvents() {
    visibleCount += 2;
    updateEventDisplay();
}

function showLessEvents() {
    visibleCount = 4;
    updateEventDisplay();
}

function updateEventDisplay() {
    const events = document.querySelectorAll('.event');
    let filteredEvents = [];

    events.forEach(event => {
        if (currentFilter === "all" || event.classList.contains(currentFilter)) {
            filteredEvents.push(event);
        }
        event.style.display = "none";
    });

    filteredEvents.slice(0, visibleCount).forEach(event => {
        event.style.display = "flex";
    });

    document.getElementById("viewMoreBtn").style.display = filteredEvents.length > visibleCount ? "block" : "none";
    document.getElementById("showLessBtn").style.display = visibleCount >= filteredEvents.length && filteredEvents.length > 4 ? "block" : "none";
}