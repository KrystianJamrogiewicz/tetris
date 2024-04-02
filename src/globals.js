export let blocks = [...document.querySelectorAll(".game-area div")]; // Zapis jako tablica
export const scoreDisplay = document.querySelector("#score-display");
export const startStopBtn = document.querySelector("#btn-start-stop");
export const colors = ["#02648a", "#210074", "#3e18b8", "#192196", "#1c408d"]; // Tablica kolorów kod hex
export const gridWidthBlocks = 10; // Szerokość mapy w blokach (kwadratach)
export let currentPosition = 4; // Wybór aktualnej pozycji spawnowania bloków (4 = mniej więcej na środku)
export let nextRandom = 0;
export let timer1;
