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
	// Stworzenie okna podglądu dla następnego tetromino
	for (let i = 0; i < 16; i++) {
		const block = document.createElement("div");
		block.classList.add("nextTetromino");
		document.querySelector(".up-next").appendChild(block);
	}

	const blockWidth = 30;
	const blockHeight = 30;
	const gridWidthBlocks = 10;
	const upNextWidthBlocks = 4;
	let nextRandom = 0;
	let blocks = [...document.querySelectorAll(".game-area div")]; // Zapis jako tablica
	const upNext = Array.from(document.querySelectorAll(".up-next div")); // Zapis jako tablica
	const scoreDisplay = document.querySelector("#score-display");
	const startStopBtn = document.querySelector("#btn-start-stop");
	let timer1;
	let score = 0;

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

	const upNextDisplay = () => {
		upNext.forEach(el => {
			el.classList.remove("tetrominos");
		});
		upNextTetrominos[nextRandom].forEach(el => {
			upNext[el].classList.add("tetrominos");
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
			randomTetromino = nextRandom;
			currentPosition = 4; // Wybór aktualnej pozycji spawnowania bloków
			nextRandom = Math.floor(Math.random() * tetrominos.length); // Losowanie liczb od 0 do tetrominos.length - 1
			randomRotation = Math.floor(Math.random() * 4); // Losowanie liczb od 0 do 3
			currentBlock = tetrominos[randomTetromino][randomRotation]; // Zmienna przechowująca aktualnie wylosowany wzór bloków
			drawBlocks();
			upNextDisplay();
			addScore();
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

	const addScore = () => {
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

	// GAME LOGIC
	startStopBtn.addEventListener("click", e => {
		if (timer1) {
			startStopBtn.style.backgroundColor = "green";
			startStopBtn.textContent = "Play";
			clearInterval(timer1);
			document.removeEventListener("keyup", controle);
			timer1 = null;
		} else {
			startStopBtn.style.backgroundColor = "red";
			startStopBtn.textContent = "Pause";
			document.addEventListener("keyup", controle); // Funkcja nasłuchująca momentu puszczenia przycisku i gdy to się stanie uruchamia funkcję "controle" z argumentem równym kod przycisku
			drawBlocks();
			timer1 = setInterval(moveDown, 1000);
			upNextDisplay();
		}
	});
};
