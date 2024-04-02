const startStopBtn = document.querySelector("#btn-start-stop");
import { timer1 } from "./globals";
import { drawBlocks } from "./drawRemove";
import { upNextDisplay } from "./upNext";
import { scoreDisplay } from "./globals";
import { score } from "./score";

// Funkcja zacznie się wykonywać gdy dokument się załaduje
window.onload = () => {
	// Stworzenie pustych bloków na mapie
	for (let i = 0; i < 200; i++) {
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

	// GAME LOGIC
	document
		.querySelector("#game-over-text")
		.setAttribute("style", "visibility: hidden");
	startStopBtn.addEventListener("click", e => {
		if (timer1) {
			startStopBtn.style.backgroundColor = "green";
			startStopBtn.textContent = "Play";
			clearInterval(timer1);
			document.removeEventListener("keyup", controle);
			timer1 = null;
		} else {
			scoreDisplay.textContent = score;
			document
				.querySelector("#game-over-text")
				.setAttribute("style", "visibility: hidden");
			startStopBtn.style.backgroundColor = "red";
			startStopBtn.textContent = "Pause";
			document.addEventListener("keyup", controle); // Funkcja nasłuchująca momentu puszczenia przycisku i gdy to się stanie uruchamia funkcję "controle" z argumentem równym kod przycisku
			drawBlocks();
			timer1 = setInterval(moveDown, 1000);
			upNextDisplay();
		}
	});
};
