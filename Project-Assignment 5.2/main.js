"use strict"

$(document).ready(function() {
    $("#button").click(function () {
        let RGBvalues = randomRGBcolor();

        let rgbcolor = "rgb(" + RGBvalues[0] + ", " + RGBvalues[1] + ", " + RGBvalues[2] + ")";

        $("body").css("background-color", rgbcolor);

        $("#color").text(rgbcolor);
    });
});

function randomNumber() {
    return Math.floor(Math.random() * 256);
};

function randomRGBcolor() {
    let red = randomNumber();
    let green = randomNumber();
    let blue = randomNumber();

    return [red, green, blue];
};