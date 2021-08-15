import { randomizeEKLogo } from './main'

// init
function initEKLogo() { randomizeEKLogo(18000, 3, 2000); }
initEKLogo();

// reload logo and colours when scrolling to new sections
const targets = document.querySelectorAll('h1,h2');
const options = {
  root: null,
  threshold: 0.25, // 0 - 1 this work as a trigger.
};

const observer = new IntersectionObserver(entries => {
  initEKLogo();
}, options);
targets.forEach(target => {
  observer.observe(target);
});

// trigger logo downscaling as soon as we start scrolling
const textLogo = document.getElementById('text1451');
const logo = document.getElementById('ek-header');

let fullscreenRedrawTimer;

const oldScroll = window.onscroll || function () {};
function checkScroll (e) {
  // large hero mode (at top)
  if (window.scrollY < window.innerHeight * 0.3) {
    // regenerate frequently
    if (!fullscreenRedrawTimer) {
      fullscreenRedrawTimer = setInterval(() => {initEKLogo(); }, 8000);
    }

    textLogo.classList.remove('invisible');
    textLogo.classList.add('visible');
    logo.classList.remove('mini');
    logo.classList.remove('maxi');
    logo.classList.add('mega');
  } else {
    // only regenerate when scrolling past headers
    if (fullscreenRedrawTimer) {
      clearInterval(fullscreenRedrawTimer);
      fullscreenRedrawTimer = null;
    }

    if(window.scrollY < window.innerHeight) {
      textLogo.classList.remove('invisible');
      textLogo.classList.add('visible');
      logo.classList.remove('mini');
      logo.classList.add('maxi');
      logo.classList.remove('mega');
    } else {
      textLogo.classList.add('invisible');
      textLogo.classList.remove('visible');
      logo.classList.add('mini');
      logo.classList.remove('maxi');
      logo.classList.remove('mega');
    }
  }

  oldScroll(e);
}
checkScroll();
setTimeout(() => logo.classList.add('inited'), 500);  // enables CSS transitions after setting initial state
window.onscroll = checkScroll;
