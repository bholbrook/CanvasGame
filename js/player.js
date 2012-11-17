
var DEFAULT_SHIP_OUTER_COLOR =		"#00FFFF";
var DEFAULT_SHIP_COLOR =			"#000000";
var DEFAULT_SHIP_OUTER_RADIUS = 	10;
var DEFAULT_SHIP_RADIUS =			2;

var PLAYER_DEATHS = 0;

function Player() {
	this.xpos =				250;
	this.ypos = 			450;
	this.radius = 			DEFAULT_SHIP_RADIUS;
	this.outerRadius =		DEFAULT_SHIP_OUTER_RADIUS;
	this.color = 			DEFAULT_SHIP_COLOR;
	this.outerColor = 		DEFAULT_SHIP_OUTER_COLOR;
	
	this.getX = 			function() { return this.xpos; }
	this.getY = 			function() { return this.ypos; }
	this.getRadius = 		function() { return this.radius; }
	this.getOuterRadius = 	function() { return this.outerRadius; }
	this.getColor = 		function() { return this.color; }
	this.getOuterColor = 	function() { return this.outerColor; }
	
	this.update = function(x, y) {
		this.updatePosition(x, y);
	}
	
	this.updatePosition = function(x, y) {
		this.xpos = x;
		this.ypos = y;
	}
	
	this.redraw = function(x, y) {
		ctx.fillStyle = this.getOuterColor();
		ctx.beginPath();
		ctx.arc(this.getX(), this.getY(), this.getOuterRadius(), 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
		
		// Draw inner, smaller circle
		ctx.fillStyle = this.getColor();
		ctx.beginPath();
		ctx.arc(this.getX(), this.getY(), this.getRadius(), 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	}
}

function redrawPlayer() {
	PLAYER.redraw();
}

function playerDeath() {
	//alert("You have been killed.");
	deathsOut(++PLAYER_DEATHS);
}