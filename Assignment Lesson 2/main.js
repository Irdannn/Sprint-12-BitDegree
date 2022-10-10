"use strict";

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const drawCar = () => {
  ctx.save();
  ctx.translate(35, 260);


  ctx.fillRect(0, 30, 15, 15);
  ctx.fillRect(15, 20, 25, 25);
  ctx.fillStyle = 'white';
  ctx.fillRect(28, 23, 7, 7);
  ctx.fillStyle = 'black';
  ctx.fillRect(40, 30, 15, 15);
  ctx.fillRect(7, 43, 10, 10);
  ctx.fillRect(37, 43, 10, 10);
  ctx.restore();
};

drawCar();