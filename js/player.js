function Player(world, x, y) {
	this.world = world;
	this.x = x;
	this.y = y;
}

Player.prototype.tick = function() {

}

Player.prototype.render = function(canvas) {
	canvas.fillStyle = "#FFF";
	canvas.fillRect(this.x, this.y, 32, 32);
}