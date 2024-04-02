import { gridWidthBlocks } from "./globals";
import { currentPosition } from "./globals";
import { blocks } from "./globals";
import { nextRandom } from "./globals";
import { tetrominos } from "./tetrominos";
import { randomRotation } from "./tetrominos";
import { currentBlock } from "./tetrominos";
import { randomTetromino } from "./tetrominos";
import { drawBlocks } from "./drawRemove";
import { upNextDisplay } from "./upNext";
import { gameOver } from "./score";
import { addScore } from "./score";

// Funkcja zatrzymuje bloki gdy dotkną najniższej krawędzi mapy
export const freeze = () => {
	// some sprawdza czy jakiś element z tablicy spełnia warunek jeśli tak to zawartość if wykona się dla całej tablicy
	if (
		currentBlock.some(el =>
			blocks[currentPosition + el + gridWidthBlocks].classList.contains(
				"taken" // sprawdza blok po niżej aktualnego zawiera (contains) klasę "taken"
			)
		)
	) {
		currentBlock.forEach(el => {
			blocks[currentPosition + el].classList.add("taken");
		});
		randomTetromino = nextRandom;
		currentPosition = 4; // Wybór aktualnej pozycji spawnowania bloków
		nextRandom = Math.floor(Math.random() * tetrominos.length); // Losowanie liczb od 0 do tetrominos.length - 1
		randomRotation = Math.floor(Math.random() * 4); // Losowanie liczb od 0 do 3
		currentBlock = tetrominos[randomTetromino][randomRotation]; // Zmienna przechowująca aktualnie wylosowany wzór bloków
		drawBlocks();
		upNextDisplay();
		gameOver();
		addScore();
	}
};
