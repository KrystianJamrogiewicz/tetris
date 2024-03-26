// Funkcja zacznie się wykonywać gdy dokument się załaduje
window.onload = () => {
	for (let i = 0; i < 200; i++) {
		gameArea = document.querySelector;
		const block = document.createElement("div"); // block będzie tworzyła elementy typu div
		block.setAttribute("class", "block"); // Dodanie atrybutu class który przyjmie wartość block
		document.querySelector(".game-area").appendChild(block); // Document - plik HTML, querySelector - zwraca pierwszy element w doukmencie pasujący do selektora (klasa gameArea), appendChild - Dodaje element (block) w wcześniej wybranym miejscu (gameArea)
	}

	const blockWidth = 30;
	const blockHeight = 30;
	const gridWidthBlocks = 10;
	const blocks = [...document.querySelectorAll(".block")];
	const scoreDisplay = document.querySelector("#score-display");
	const startStopBtn = document.querySelector("#btn-start-stop");

	const lTetromino = [
		[1, gridWidthBlocks + 1, gridWidthBlocks * 2 + 1, 2],
		[
			gridWidthBlocks,
			gridWidthBlocks + 1,
			gridWidthBlocks + 2,
			gridWidthBlocks * 2 + 2,
		],
		[gridWidthBlocks * 2, 1, gridWidthBlocks + 1, gridWidthBlocks * 2 + 1],
		[
			gridWidthBlocks,
			gridWidthBlocks * 2,
			gridWidthBlocks * 2 + 1,
			gridWidthBlocks * 2 + 2,
		],
	];

	const sTetromino = [
		[
			gridWidthBlocks * 2,
			gridWidthBlocks + 1,
			gridWidthBlocks * 2 + 1,
			gridWidthBlocks + 2,
		],
		[0, gridWidthBlocks, gridWidthBlocks + 1, gridWidthBlocks * 2 + 1],
		[
			gridWidthBlocks,
			gridWidthBlocks + 1,
			gridWidthBlocks * 2 + 1,
			gridWidthBlocks * 2 + 2,
		],
		[1, gridWidthBlocks, gridWidthBlocks + 1, gridWidthBlocks * 2],
	];
	const tTetromino = [
		[1, gridWidthBlocks, gridWidthBlocks + 1, gridWidthBlocks + 2],
		[1, gridWidthBlocks + 1, gridWidthBlocks * 2 + 1, gridWidthBlocks + 2],
		[
			gridWidthBlocks,
			gridWidthBlocks + 1,
			gridWidthBlocks + 2,
			gridWidthBlocks * 2 + 1,
		],
		[gridWidthBlocks, 1, gridWidthBlocks + 1, gridWidthBlocks * 2 + 1],
	];
	const oTetromino = [
		[0, 1, gridWidthBlocks, gridWidthBlocks + 1],
		[0, 1, gridWidthBlocks, gridWidthBlocks + 1],
		[0, 1, gridWidthBlocks, gridWidthBlocks + 1],
		[0, 1, gridWidthBlocks, gridWidthBlocks + 1],
	];
	const iTetromino = [
		[1, gridWidthBlocks + 1, gridWidthBlocks * 2 + 1, gridWidthBlocks * 3 + 1],
		[
			gridWidthBlocks,
			gridWidthBlocks + 1,
			gridWidthBlocks + 2,
			gridWidthBlocks + 3,
		],
		[1, gridWidthBlocks + 1, gridWidthBlocks * 2 + 1, gridWidthBlocks * 3 + 1],
		[
			gridWidthBlocks,
			gridWidthBlocks + 1,
			gridWidthBlocks + 2,
			gridWidthBlocks + 3,
		],
	];
	// Tablica przechowująca warianty klocków (tetrominos)
	const tetrominos = [
		lTetromino,
		sTetromino,
		tTetromino,
		oTetromino,
		iTetromino,
	];
	let currentPosition = 4;
	let currentBlock = tetrominos[1][3];

	const drawBlocks = () => {
		currentBlock.forEach(el => {
			blocks[currentPosition + el].classList.add("tetrominos");
		});
	};
	drawBlocks();
};
