import './main'

// init, then reload logo and colors periodically (synced with animation)
function initEKLogo() { randomizeEKLogo(18000, 3, 2000); }
initEKLogo();
setInterval(() => {initEKLogo(); }, 18000);

// minimise logo on scroll
const textLogo = document.getElementById('text1451');
const logo = document.getElementById('logo-graphic');
const header = document.getElementById('ek-header');

const oldScroll = window.onscroll || function () {};
window.onscroll = function (e) {
  if(window.scrollY < 30){
    textLogo.classList.remove('invisible');
    logo.classList.remove('mini');
    logo.classList.add('maxi');
    textLogo.classList.add('visible');
  }else if(window.scrollY > 30){
    textLogo.classList.remove('visible');
    logo.classList.add('mini');
    logo.classList.remove('maxi');
    textLogo.classList.add('invisible');
  }

  oldScroll(e);
}
