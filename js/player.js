function Player(x, y) {
	this.x = x;
	this.y = y;
}

Player.prototype.tick = function() {

}

Player.prototype.render = function(canvas) {
	canvas.fillStyle = "#FFF";
	canvas.fillRect(this.x, this.y, 32, 32);
}