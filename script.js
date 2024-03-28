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

	// Jak czytać numery pól:
	//     0   1   2   3 ... 9
	// 0 [00][01][02][03]
	// 1 [10][11][12][13]
	// 2 [20][21][22][23]
	// 3 [30][31][32][33]
	// ...			      ...
	// 20            ...[199]

	// Każda tablica przechowywująca nmuery pól dla wyświetlenia bloków w danym kształcie, tablic jest tyle ile możliwych bloków i ich rotacji (gridWidthBlocks domyślnie = 10)
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
	let currentPosition = 4; // Wybór aktualnej pozycji spawnowania bloków
	let randomTetromino = Math.floor(Math.random() * tetrominos.length); // Losowanie liczb od 0 do tetrominos.length - 1
	let randomRotation = Math.floor(Math.random() * 4); // Losowanie liczb od 0 do 3

	let currentBlock = tetrominos[randomTetromino][randomRotation]; // Zmienna przechowująca aktualnie wylosowany wzór bloków

	const drawBlocks = () => {
		// forEach - Wykona się dla każdego elementu tablicy currentBlock
		currentBlock.forEach(el => {
			blocks[currentPosition + el].classList.add("tetrominos"); // Dla każdego elementu tablicy currentBlock dodaj currentPosition i klasę tetrominos która zmieni styl elementów w CSS
		});
	};

	const removeBlock = () => {
		currentBlock.forEach(el => {
			blocks[currentPosition + el].classList.remove("tetrominos");
		});
	};
	drawBlocks();
	console.log(currentBlock);
	// removeBlock();
};
