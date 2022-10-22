"use strict"

console.log("hello");

const canvas1 = document.getElementById("canvas1");
const ctx = canvas1.getContext("2d");
let canvasH;
let canvasW;
let bgColor = "#C4AEAD";
let animations = [];
let circles = [];

const pickColor = (function() {
    const colors = [
        "#E2A76F",
        "#228B22",
        "#F62817",
        "#8C001A",
        "#98FB98",
    ];
    let index = 0;
    function next(){
       index = index++ < colors.length-1 ? index : 0;
    };
    function current(){
        return colors[index]
    }
    return {
        next: next,
        current: current,
    }
})();

function removeAnimation(animation) {
    let index = animations.indexOf(animation);
    if (index > -1) animations.splice(index, 1);
  }
  
function calcPageFillRadius(x, y) {
    let l = Math.max(x - 0, canvasW - x);
    let h = Math.max(y - 0, canvasH - y);
    return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
  }

function addClickListeners() {
    document.addEventListener("click", handleEvent);
    document.addEventListener("mousedown", handleEvent);
  };

function handleEvent(e) {
    let currentColor = pickColor.current();
    let nextColor = pickColor.next();
    let targetR = calcPageFillRadius(e.pageX, e.pageY);
    let rippleSize = Math.min(200, (canvasW * .4));
    let minCoverDuration = 750;
      
    const pageFill = new Circle({
      x: e.pageX,
      y: e.pageY,
      r: 0,
      fill: nextColor
    });
  
    const fillAnimation = anime({
      targets: pageFill,
      r: targetR,
      duration:  Math.max(targetR / 2 , minCoverDuration ),
      easing: "easeOutQuart",
      complete: function(){
        bgColor = pageFill.fill;
        removeAnimation(fillAnimation);
      }
    });
  
  function extend(a, b){
    for(let key in b) {
      if(b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }
  
  const resizeCanvas = function() {
    canvasW = window.innerWidth;
    canvasH = window.innerHeight;
    canvas1.width = canvasW * devicePixelRatio;
    canvas1.height = canvasH * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
  };
  
  (function init() {
    resizeCanvas();
    if (window.CP) {
      window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000; 
    }
  
    window.addEventListener("resize", resizeCanvas);
    addClickListeners();
    if (!!window.location.pathname.match(/fullcpgrid/)) {
      startFauxClicking();
    }
    handleInactiveUser();
  })();
  
  function handleInactiveUser() {
    let inactive = setTimeout(function(){
      NoClick(canvasW/2, canvasH/2);
  }, 2000);
  
  function clearInactiveTimeout() {
    clearTimeout(inactive);
    document.removeEventListener("mousedown", clearInactiveTimeout);
    document.removeEventListener("touchstart", clearInactiveTimeout);
  }
  document.addEventListener("mousedown", clearInactiveTimeout);
  document.addEventListener("touchstart", clearInactiveTimeout);
  }
  
  function startFauxClicking() {
    setTimeout(function(){
      NoClick(anime.random( canvasW * .2, canvasW * .8), anime.random(canvasH * .2, canvasH * .8));
      startFauxClicking();
    }, anime.random(200, 900));
  }
  
  function NoClick(x, y) {
    let NoClick = new Event("mousedown");
    NoClick.pageX = x;
    NoClick.pageY = y;
    document.dispatchEvent(NoClick);
  };
};