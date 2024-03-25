// Funkcja zacznie się wykonywać gdy dokument się załaduje
window.onload = () => {
	for (let i = 0; i < 200; i++) {
		gameArea = document.querySelector;
		const block = document.createElement("div"); // block będzie tworzyła elementy typu div
		block.setAttribute("class", "block"); // Dodanie atrybutu class który przyjmie wartość block
		document.querySelector(".game-area").appendChild(block); // Document - plik HTML, querySelector - zwraca pierwszy element w doukmencie pasujący do selektora (klasa gameArea), appendChild - Dodaje element (block) w wcześniej wybranym miejscu (gameArea)
	}
	const blocks = [...document.querySelectorAll(".block")];
	console.log(blocks);
	const scoreDisplay = document.querySelector("#score-display");
	const startStopBtn = document.querySelector("#btn-start-stop");
};
