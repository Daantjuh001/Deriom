function World(width, height) {
	this.width = width;
	this.height = height;
}

World.prototype.tick = function() {

}

World.prototype.render = function(canvas) {
	canvas.fillStyle = "#000";
	canvas.fillRect(0, 0, this.width * 32, this.height * 32);
}