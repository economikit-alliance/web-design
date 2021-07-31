import './main'

// init
function initEKLogo() { randomizeEKLogo(18000, 3, 2000); }
initEKLogo();

// reload logo and colours when scrolling to new sections
const targets = document.querySelectorAll('h1');
const options = {
  root: null,
  threshold: 0.25, // 0 - 1 this work as a trigger.
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(initEKLogo);
}, options);
targets.forEach(target => {
  observer.observe(target);
});
