"use strict"

let count = 0;
const clickBtn = document.getElementById("clickBtn")
const totalClicks = document.getElementById("totalClicks")

clickBtn.onclick = function(){
    count++
    totalClicks.innerHTML = count
};
resetBtn.onclick = function () {
    count = 0;
    totalClicks.innerHTML = count
  };