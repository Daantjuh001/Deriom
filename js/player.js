function Player(x, y) {
	this.x = x;
	this.y = y;
}

Player.prototype.tick = function() {

}

Player.prototype.render = function(pid, canvas) {
	canvas.fillStyle = "#FFF";
	canvas.fillText("ID: " + pid, this.x, this.y);
	canvas.fillRect(this.x, this.y, 32, 32);
}