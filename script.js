// Funkcja zacznie się wykonywać gdy dokument się załaduje
window.onload = () => {
	for (let i = 0; i < 200; i++) {
		//gameArea = document.querySelector;
		const block = document.createElement("div"); // block będzie tworzyła elementy typu div
		block.setAttribute("class", "block"); // Dodanie atrybutu class (poprzednie klasy zostaną nadpisane) który przyjmie wartość block
		document.querySelector(".game-area").appendChild(block); // Document - plik HTML, querySelector - zwraca pierwszy element w doukmencie pasujący do selektora (klasa gameArea), appendChild - Dodaje element (block) w wcześniej wybranym miejscu (gameArea)
	}
	// Stworznie GRANICY MAPY nowego rzędu na dole o szerokości = szerokość mapy = 10 bloków
	for (let i = 0; i < 10; i++) {
		const block = document.createElement("div");
		block.classList.add("taken"); // Dodanie nowej klasy taken - zajęty (nie nadpisuje starej)
		document.querySelector(".game-area").appendChild(block);
	}

	const blockWidth = 30;
	const blockHeight = 30;
	const gridWidthBlocks = 10;
	const blocks = [...document.querySelectorAll(".game-area div")];

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
			blocks[currentPosition + el].classList.add("tetrominos"); // Dla każdego elementu tablicy currentBlock dodaj currentPosition i nową klasę (nie nadpisuje starej klasy) tetrominos która zmieni styl elementów w CSS
		});
	};

	const removeBlock = () => {
		currentBlock.forEach(el => {
			blocks[currentPosition + el].classList.remove("tetrominos");
		});
	};

	// Funkcja zatrzymuje bloki gdy dotkną najniższej krawędzi mapy
	const freeze = () => {
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
			currentPosition = 4; // Wybór aktualnej pozycji spawnowania bloków
			randomTetromino = Math.floor(Math.random() * tetrominos.length); // Losowanie liczb od 0 do tetrominos.length - 1
			randomRotation = Math.floor(Math.random() * 4); // Losowanie liczb od 0 do 3
			currentBlock = tetrominos[randomTetromino][randomRotation]; // Zmienna przechowująca aktualnie wylosowany wzór bloków
			drawBlocks();
		}
	};
	const moveDown = () => {
		removeBlock();
		currentPosition += gridWidthBlocks; // Do aktualnej jpozycji dodać szerokość planszy co przemieści klocek o 1 kratkę w dół
		drawBlocks();
		freeze();
	};

	const moveLeft = () => {
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
	const moveRight = () => {
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

	const rotate = () => {
		removeBlock();
		randomRotation += 1;
		if (randomRotation >= currentBlock.length) randomRotation = 0;
		currentBlock = tetrominos[randomTetromino][randomRotation];
		drawBlocks();
	};

	const controle = event => {
		if (event.keyCode === 37) moveLeft();
		if (event.keyCode === 38) rotate();
		if (event.keyCode === 39) moveRight();
		if (event.keyCode === 40) moveDown();
	};

	// GAME LOGIC
	document.addEventListener("keyup", controle); // Funkcja nasłuchująca momentu puszczenia przycisku i gdy to się stanie uruchamia funkcję "controle" z argumentem równym kod przycisku
	drawBlocks();
	setInterval(moveDown, 1000);
};
