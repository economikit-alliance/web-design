import { select } from 'd3-selection'

// configuration vars
const colors = ['#47ebbf','#506ced','#eb4778','#ebcd47'];
const pV =[50, 90, 140];

// helpers
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {

  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
  } return array;
}

// find DOM attachment points
const r = document.querySelector(':root');
const logoHTML = document.getElementById('logoHTML');

// init elements
let logo = document.createElementNS("http://www.w3.org/2000/svg", "svg");
let logoG = document.createElementNS("http://www.w3.org/2000/svg", "g");
  logo.setAttribute('id', 'logo-graphic');
  logo.setAttribute('width', '250');
  logo.setAttribute('height', '200');
  logo.setAttribute('viewBox', '0 0 250 200');

let gradient1Defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
let gradient1 = `
<radialGradient id="radialGradient1"
    cx="0" cy="0" r="1" fx="0.1" fy="0.1">
  <stop class="stopG1_1" offset="0%"/>
  <stop class="stopG1_2" offset="100%"/>
  </radialGradient>`;

logo.appendChild(gradient1Defs);
gradient1Defs.innerHTML = gradient1;

let e = document.createElementNS("http://www.w3.org/2000/svg", "circle");
let i1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
e.id = 'e';
i1.id = 'i1';

e.setAttribute('cx', `0`);
e.setAttribute('cy', `0`);
e.setAttribute('r', '12.7');
e.setAttribute('fill', 'var(--c2)');

i1.setAttribute('x', `-4.4`);
i1.setAttribute('y', `-4.4`);
i1.setAttribute('width', '8.8');
i1.setAttribute('height', '8.8');
i1.setAttribute('fill', 'var(--c1)');

let path1ID3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
let path2ID3 = document.createElementNS("http://www.w3.org/2000/svg", "path");

function initPath(el) {
  el.style = 'stroke-width:3px';
  el.setAttribute('stroke-linecap', 'round');
  el.classList.add(`ek-path`);
}
initPath(path1ID3);
initPath(path2ID3);
path1ID3.id = 'path1ID3';
path2ID3.id = 'path2ID3';
path2ID3.setAttribute('stroke-dasharray', '8,8');

let ani1 = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
let ani2 = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");

function initMotion(el) {
  el.setAttribute('repeatCount', 'indefinite');
  el.setAttribute('keyPoints', '0;1;0');
  el.setAttribute('keyTimes', '0;0.5;1');
}
initMotion(ani1);
initMotion(ani2);
ani1.id = 'EKani1';
ani2.id = 'EKani2';

e.appendChild(ani1);
i1.appendChild(ani2);
logo.appendChild(path1ID3);
logo.appendChild(path2ID3);
logo.appendChild(e);
logo.appendChild(i1);

logoHTML.appendChild(logo);

// grab D3 refs to generated DOM elements
const path1 = select('#path1ID3'),
      path2 = select('#path2ID3'),
      anim1 = select('#EKani1'),
      anim2 = select('#EKani2');

// setup internal state
let rPoints = [];
let rPointsArray =[];
let rNextPoints = [];
let cT = 1;
let x1 = 55;
let y1 = 92;
let x2 = 168;
let y2 = 75;

//create Array of Arrays with random points
for(let rA = 0; rA < 30; rA++){
  rPointsArray[rA] = new Array();
  for(let r = 0; r < 12; r++){
    rPoints[r] = pV[pV.length * Math.random() | 0];
    rPointsArray[rA].push(rPoints[r]);
  }
}

// define callback for randomising graphic
window.randomizeEKLogo = function(
  cycleDuration = 18000,
  subCycleRepeats = 3,
  transitionDuration = 2000
) {
  shuffle(colors);
  r.style.setProperty('--c1', colors[0]);
  r.style.setProperty('--c2', colors[1]);
  r.style.setProperty('--c3', colors[2]);
  r.style.setProperty('--c4', colors[3]);

  let path1Instructions =
    `M ${x1},${y1}
    C 0,0
    ${rPointsArray[cT][0]},${rPointsArray[cT][1]}
    ${rPointsArray[cT][2]},${rPointsArray[cT][3]}
    S ${rPointsArray[cT][4]},${rPointsArray[cT][5]}
    ${x2},${y2}`;

  let path1InstructionsNext =
    `M ${x1},${y1}
    C 0,0
    ${rPointsArray[cT + 1][0]},${rPointsArray[cT + 1][1]}
    ${rPointsArray[cT + 1][2]},${rPointsArray[cT + 1][3]}
    S ${rPointsArray[cT + 1][4]},${rPointsArray[cT + 1][5]}
    ${x2},${y2}`;

  path1
  .attr('d', path1Instructions)
  .transition()
  .duration(transitionDuration)
  .attr('d', path1InstructionsNext);

  let path2Instructions =
    `M ${x2},${y2}
    C 0,0
    ${rPointsArray[cT][6]},${rPointsArray[cT][7]}
    ${rPointsArray[cT][8]},${rPointsArray[cT][9]}
    S ${rPointsArray[cT][10]},${rPointsArray[cT][11]}
    ${x1},${y1}`;

  let path2InstructionsNext =
    `M ${x2},${y2}
    C 0,0
    ${rPointsArray[cT + 1][6]},${rPointsArray[cT + 1][7]}
    ${rPointsArray[cT + 1][8]},${rPointsArray[cT + 1][9]}
    S ${rPointsArray[cT + 1][10]},${rPointsArray[cT + 1][11]}
    ${x1},${y1}`;

  path2
  .attr('d', path2Instructions)
  .transition()
  .duration(transitionDuration)
  .attr('d', path2InstructionsNext);

  cT = cT + 1;
  if (cT == 29){cT = 1};

  ani1.setAttribute('dur', cycleDuration + 'ms');
  anim1
  .attr('path', path1Instructions)
  .transition()
  .duration(transitionDuration)
  .attr('path', path1InstructionsNext);

  ani2.setAttribute('dur', Math.floor(cycleDuration / subCycleRepeats) + 'ms');
  anim2
  .attr('path', path2Instructions)
  .transition()
  .duration(transitionDuration)
  .attr('path', path2InstructionsNext);
};
