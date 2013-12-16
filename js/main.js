(function() {
	var canvasElement, canvasWidth, canvasHeight, canvas, loadedItems, keysPressed, world, player, players;

	window.onload = function() {
	     init();
	}

	window.onkeydown = function(event) {
		keysPressed[event.keyCode] = true;
	}

	window.onkeyup = function(event) {
		keysPressed[event.keyCode] = false;
	}

	function init() {
		canvasElement = document.getElementById("game");
		canvasWidth = canvasElement.offsetWidth;
		canvasHeight = canvasElement.offsetHeight;
		canvas = canvasElement.getContext("2d");
		loadedItems = 0;
		keysPressed = [];

		world = new World(10, 10);
		player = new Player("main", 32, 32);
		players = [];

		if (loadedItems == 0) {
			setInterval(function() {
				tick();
			}, 500 / 60);

			setInterval(function() {
				render();
			}, 1000 / 60);
		}
	}

	function tick() {
		world.tick();

		if(typeof keysPressed[87] !== "undefined" && keysPressed[87] != false){
			player.y -= 1;
		}else if(typeof keysPressed[83] !== "undefined" && keysPressed[83] != false){
			player.y += 1;
		}else if(typeof keysPressed[65] !== "undefined" && keysPressed[65] != false){
			player.x -= 1;
		}else if(typeof keysPressed[68] !== "undefined" && keysPressed[68] != false){
			player.x += 1;
		}

		for (var i in players) {
			players[i].tick();
		}

		player.tick();
	}

	function render() {
		canvas.clearRect(0, 0, canvasWidth, canvasHeight);

		world.render(canvas);

		for (var i in players) {
			players[i].render(canvas);
		}

		player.render(canvas);
	}
})();