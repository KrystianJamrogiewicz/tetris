import { gridWidthBlocks } from "./globals";
import { currentPosition } from "./globals";
import { scoreDisplay } from "./globals";
import { blocks } from "./globals";
import { startStopBtn } from "./globals";
import { timer1 } from "./globals";
import { currentBlock } from "./tetrominos";

export let score = 0;

export const addScore = () => {
	// Podział mapy na rzędy poziome
	for (let i = 0; i < 199; i += gridWidthBlocks) {
		const row = [
			i,
			i + 1,
			i + 2,
			i + 3,
			i + 4,
			i + 5,
			i + 6,
			i + 7,
			i + 8,
			i + 9,
		];
		// Sprawdza, czy każdy element tablicy row spełnia warunek i wtedy wykonuje polecenie dla całej tablicy
		if (row.every(el => blocks[el].classList.contains("taken"))) {
			score += 10;
			scoreDisplay.textContent = score;

			row.forEach(el => {
				blocks[el].classList.remove("taken");
				blocks[el].classList.remove("tetrominos");
				blocks[el].style.backgroundColor = "";
			});
			// splice usówa elementy z tablicy: (od i do gridWidthBlocks) i zwraca usunięte elementy
			const blocksRemoved = blocks.splice(i, gridWidthBlocks);
			// concat łączy tablicę blocksRemoved z tablicą blocks i zwraca połączoną tablice
			blocks = blocksRemoved.concat(blocks);
			blocks.forEach(block => {
				document.querySelector(".game-area").appendChild(block);
			});
		}
	}
};

export const gameOver = () => {
	if (
		currentBlock.some(el =>
			blocks[currentPosition + el].classList.contains("taken")
		)
	) {
		clearInterval(timer1);
		document.removeEventListener("keyup", controle);
		timer1 = null;
		document
			.querySelector("#game-over-text")
			.setAttribute("style", "visibility: visible");
		startStopBtn.style.backgroundColor = "green";
		startStopBtn.textContent = "START";
		score = 0;
		blocks.forEach((el, i) => {
			if (i < 200) {
				el.classList.remove("taken");
				el.classList.remove("tetrominos");
				el.style.backgroundColor = "";
			}
		});
	}
};
