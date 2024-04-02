import { currentBlock } from "./tetrominos.js";
import { currentPosition } from "./globals.js";
import { blocks } from "./globals.js";
import { colors } from "./globals.js";

export const drawBlocks = () => {
	// forEach - Wykona się dla każdego elementu tablicy currentBlock
	currentBlock.forEach(el => {
		blocks[currentPosition + el].classList.add("tetrominos"); // Dla każdego elementu tablicy currentBlock dodaj currentPosition i nową klasę (nie nadpisuje starej klasy) tetrominos która zmieni styl elementów w CSS
		blocks[currentPosition + el].style.backgroundColor =
			colors[randomTetromino];
	});
};

export const removeBlock = () => {
	currentBlock.forEach(el => {
		blocks[currentPosition + el].classList.remove("tetrominos");
		blocks[currentPosition + el].style.backgroundColor = ""; // Usunięcie koloru
	});
};
