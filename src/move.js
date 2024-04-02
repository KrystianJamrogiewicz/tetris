import { blocks } from "./globals.js";
import { currentPosition } from "./globals.js";
import { gridWidthBlocks } from "./globals.js";
import { drawBlocks } from "./drawRemove";
import { removeBlock } from "./drawRemove";
import { currentBlock } from "./tetrominos";
import { randomRotation } from "./tetrominos";
import { randomTetromino } from "./tetrominos";
import { freeze } from "./freeze";

export const moveDown = () => {
	removeBlock();
	currentPosition += gridWidthBlocks; // Do aktualnej jpozycji dodać szerokość planszy co przemieści klocek o 1 kratkę w dół
	drawBlocks();
	freeze();
};

export const moveLeft = () => {
	removeBlock();
	const isAtLeftEdge = currentBlock.some(
		el => (currentPosition + el) % gridWidthBlocks === 0
	); // Stała zwróci true lub false, % - modulus zwraca resztę z dzielenia

	if (!isAtLeftEdge) {
		currentPosition -= 1;
	}

	// Sprawdza, czy poruszany klocek nie dotyka zamrożonych klocków
	if (
		currentBlock.some(el =>
			blocks[currentPosition + el].classList.contains("taken")
		)
	) {
		currentPosition += 1;
	}
	drawBlocks();
};
export const moveRight = () => {
	removeBlock();
	const isAtRightEdge = currentBlock.some(
		el => (currentPosition + el) % gridWidthBlocks === gridWidthBlocks - 1
	);

	if (!isAtRightEdge) {
		currentPosition += 1;
	}

	if (
		currentBlock.some(el =>
			blocks[currentPosition + el].classList.contains("taken")
		)
	) {
		currentPosition -= 1;
	}
	drawBlocks();
};

export const rotate = () => {
	removeBlock();
	randomRotation += 1;
	if (randomRotation >= currentBlock.length) randomRotation = 0;
	currentBlock = tetrominos[randomTetromino][randomRotation];
	drawBlocks();
};

export const controle = event => {
	if (event.keyCode === 37) moveLeft();
	if (event.keyCode === 38) rotate();
	if (event.keyCode === 39) moveRight();
	if (event.keyCode === 40) moveDown();
};
