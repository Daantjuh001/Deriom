(function() {
	var canvasElement, canvasWidth, canvasHeight, canvas, connected, players, socket;
	var keysPressed, world, pid;

	window.onload = function() {
		canvasElement = document.getElementById("game");
		canvasWidth = canvasElement.offsetWidth;
		canvasHeight = canvasElement.offsetHeight;
		canvas = canvasElement.getContext("2d");
		connected = false;
		players = [];

		setInterval(function() {
			tick();
		}, 500 / 60);

		setInterval(function() {
			render();
		}, 1000 / 60);

		connect();
	}

	function connect() {
		socket = io.connect("http://danielvandrunen.com:1337");
	
		socket.on("connect", function() {
			socket.emit("connect");
		});

		socket.on("connected", function(data) {
			init(data.pid, data.x, data.y);
		});

		socket.on("join", function(data) {
			players[data.pid] = new Player(data.x, data.y);
		});

		socket.on("move", function(data) {
			players[data.pid].x = data.x;
			players[data.pid].y = data.y;
		});

		socket.on("leave", function(data) {
			delete players[data.pid];
		});
	}

	function init(temppid, x, y) {
		keysPressed = [];
		world = new World(30, 17.5);
		pid = temppid;
		players[pid] = new Player(x, y);
		connected = true;
	}

	function tick() {
		if (connected) {
			world.tick();

			if (typeof keysPressed[87] !== "undefined" && keysPressed[87] != false) {
				players[pid].y -= 1;
				socket.emit("move", { pid: pid, x: players[pid].x, y: players[pid].y });
			} else if (typeof keysPressed[83] !== "undefined" && keysPressed[83] != false) {
				players[pid].y += 1;
				socket.emit("move", { pid: pid, x: players[pid].x, y: players[pid].y });
			} else if (typeof keysPressed[65] !== "undefined" && keysPressed[65] != false) {
				players[pid].x -= 1;
				socket.emit("move", { pid: pid, x: players[pid].x, y: players[pid].y });
			} else if (typeof keysPressed[68] !== "undefined" && keysPressed[68] != false) {
				players[pid].x += 1;
				socket.emit("move", { pid: pid, x: players[pid].x, y: players[pid].y });
			}

			for (var i in players) {
				players[i].tick();
			}
		}
	}

	function render() {
		canvas.clearRect(0, 0, canvasWidth, canvasHeight);

		if (connected) {
			world.render(canvas);

			for (var i in players) {
				players[i].render(i, canvas);
			}
		} else {
			canvas.fillText("Connecting...", 0, 0);
		}
	}

	window.onkeydown = function(event) {
		if (connected) {
			keysPressed[event.keyCode] = true;
		}
	}

	window.onkeyup = function(event) {
		if (connected) {
			keysPressed[event.keyCode] = false;
		}
	}	
})();