import { nextRandom } from "./globals";

const upNext = Array.from(document.querySelectorAll(".up-next div")); // Zapis jako tablica
const upNextWidthBlocks = 4;

// Warianty dla okna podglądu następnego tetromino
const upNextTetrominos = [
	[1, upNextWidthBlocks + 1, upNextWidthBlocks * 2 + 1, 2],
	[
		upNextWidthBlocks * 2,
		upNextWidthBlocks + 1,
		upNextWidthBlocks * 2 + 1,
		upNextWidthBlocks + 2,
	],
	[1, upNextWidthBlocks, upNextWidthBlocks + 1, upNextWidthBlocks + 2],
	[0, 1, upNextWidthBlocks, upNextWidthBlocks + 1],
	[
		1,
		upNextWidthBlocks + 1,
		upNextWidthBlocks * 2 + 1,
		upNextWidthBlocks * 3 + 1,
	],
];

export const upNextDisplay = () => {
	upNext.forEach(el => {
		el.classList.remove("tetrominos");
	});
	upNextTetrominos[nextRandom].forEach(el => {
		upNext[el].classList.add("tetrominos");
	});
};
