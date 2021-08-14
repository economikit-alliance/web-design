import { select } from 'd3-selection'

// configuration vars
const colors = ['#47ebbf','#506ced','#eb4778','#ebcd47'];
const bboxWidth = 255,  // :IMPORTANT: must match `svg.ek-text` attributes in HTML
      bboxHeight = 180;
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
const logoHTML = document.getElementById('logo-graphic');

// setup internal state
let rPoints = [];
let rPointsArray =[];
let rNextPoints = [];
let cT = 1;
let x1 = 55;
let y1 = 92;
let x2 = 168;
let y2 = 75;

// init elements
let logo = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  logo.id = 'graphic-ek';
  logo.setAttribute('viewBox', '-20 0 ' + bboxWidth + ' ' + bboxHeight);

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
let i1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
let ir = document.createElementNS("http://www.w3.org/2000/svg", "rect");
e.id = 'e';
i1.id = 'i1';

e.setAttribute('cx', x1);
e.setAttribute('cy', y1);
e.setAttribute('r', '12.7');
e.setAttribute('fill', 'var(--c2)');

ir.setAttribute('x', '-4');
ir.setAttribute('y', '-4');
ir.setAttribute('width', '8.8');
ir.setAttribute('height', '8.8');
ir.setAttribute('fill', 'var(--c1)');
i1.setAttribute('transform', `translate(${x2},${y2})`);

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
i1.appendChild(ir);
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

//create Array of Arrays with random points
for(let rA = 0; rA < 30; rA++){
  rPointsArray[rA] = new Array();
  for(let r = 0; r < 12; r++){
    rPoints[r] = pV[pV.length * Math.random() | 0];
    rPointsArray[rA].push(rPoints[r]);
  }
}

// helpers for animation internals
function getPathInstructions(xO = 0, yO = 0, xS, yS, xE, yE, setIdx, pointsIdx) {
  return `M ${xS - xO},${yS - yO}
    C ${-xO},${-yO}
    ${rPointsArray[setIdx][pointsIdx] - xO},${rPointsArray[setIdx][pointsIdx + 1] - yO}
    ${rPointsArray[setIdx][pointsIdx + 2] - xO},${rPointsArray[setIdx][pointsIdx + 3] - yO}
    S ${rPointsArray[setIdx][pointsIdx + 4] - xO},${rPointsArray[setIdx][pointsIdx + 5] - yO}
    ${xE - xO},${yE - yO}`
}

function applyPathAnim(cycleDuration, transitionDuration, path, ani, anim, xS, yS, xE, yE, setIdx, pointsIdx) {
  path
    .attr('d', getPathInstructions(0, 0, xS, yS, xE, yE, setIdx, pointsIdx))
    .transition()
    .duration(transitionDuration)
    .attr('d', getPathInstructions(0, 0, xS, yS, xE, yE, setIdx + 1, pointsIdx));

  const animStartPath = getPathInstructions(xS, yS, xS, yS, xE, yE, setIdx, pointsIdx);
  ani.setAttribute('dur', cycleDuration + 'ms');
  ani.setAttribute('path', animStartPath);
  anim
  .attr('path', animStartPath)
  .transition()
  .duration(transitionDuration)
  .attr('path', getPathInstructions(xS, yS, xS, yS, xE, yE, setIdx + 1, pointsIdx));
}

// define callback for randomising graphic
export function randomizeEKLogo(
  cycleDuration = 18000,
  subCycleRepeats = 3,
  transitionDuration = 2000
) {
  shuffle(colors);
  r.style.setProperty('--c1', colors[0]);
  r.style.setProperty('--c2', colors[1]);
  r.style.setProperty('--c3', colors[2]);
  r.style.setProperty('--c4', colors[3]);

  applyPathAnim(
    cycleDuration, transitionDuration,
    path1, ani1, anim1,
    x1, y1, x2, y2, cT, 0
  );
  applyPathAnim(
    Math.floor(cycleDuration / subCycleRepeats), transitionDuration,
    path2, ani2, anim2,
    x2, y2, x1, y1, cT, 6
  );

  cT = cT + 1;
  if (cT == 29){cT = 1};
}
