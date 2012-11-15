//var BULLETS = new Array();
//var BULLETS = 		new List();
//var NUM_BULLETS =	0;

var DEFAULT_BULLET_COLOR = "#FF00FF";

var BULLET_SPEED =	4.0;
var BULLET_RADIUS =	5;

var PLAYER_BULLET =	0;
var ENEMY_BULLET =	1;

function Bullet(x1, y1, x2, y2, speed, owner) {
	this.color = 	DEFAULT_BULLET_COLOR;
	this.radius =	BULLET_RADIUS;
	this.owner =	owner;
	
	this.xpos =		x1;
	this.ypos =		y1;
	
	var tx = x2 - x1;
	var ty = y2 - y1;
	var length = Math.abs(Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2)));
	
	this.dx = (tx / length) * speed;
	this.dy = (ty / length) * speed;
	
	this.getX = 			function() { return this.xpos; }
	this.getY = 			function() { return this.ypos; }
	this.getRadius = 		function() { return this.radius; }
	this.getColor =			function() { return this.color; }
	
	// Returns 0 if player bullet, 1 otherwise
	this.getOwner =			function() { return this.owner; }
	this.isPlayerBullet =	function() { return this.owner == PLAYER_BULLET; }
	this.isEnemyBullet =	function() { return this.owner == ENEMY_BULLET; }
	
	this.update = function() {
		this.updatePosition();
	}
	
	this.updatePosition = function() {
		this.xpos += this.dx;
		this.ypos += this.dy;
	}
	
	this.redraw = function() {
		this.update();
		
		ctx.fillStyle = this.getColor();
		ctx.beginPath();
			
		if (this.outOfBounds()) {
			//BULLETS.remove(i);
		} else {
			ctx.moveTo(this.getX(), this.getY());
			ctx.arc(this.getX(), this.getY(), this.getRadius(), 0, Math.PI * 2, true);
		}
		
		ctx.closePath();
		ctx.fill();
	}
	
	// Performs boundary checking
	this.outOfBounds = function() {
		if (this.getX() < LEFT || this.getX() > RIGHT || this.getY() > TOP || this.getY() < BOTTOM)
			return true;
		else
			return false;
	}
}

function createPlayerBullet(sx, sy, cx, cy) {
	var b = new Bullet(sx, sy, cx, cy, BULLET_SPEED, PLAYER_BULLET);
	//BULLETS[NUM_BULLETS] = b;
	//BULLETS.add(b);	
	BULLETS.push(b);
	NUM_BULLETS++;
}

function createEnemyBullet(sx, sy, cx, cy) {
	var b = new Bullet(sx, sy, cx, cy, BULLET_SPEED, ENEMY_BULLET);
	//BULLETS[NUM_BULLETS] = b;	
	BULLETS.push(b);
	NUM_BULLETS++;
}




/*
function redrawBulletsCallback(b, i, array) {
	BULLETS.get(i).update();
	var bshipX = BULLETS.get(i).getX();
	var bshipY = BULLETS.get(i).getY();
		
	ctx.moveTo(bshipX, bshipY);
	ctx.arc(bshipX, bshipY, BULLET_RADIUS, 0, Math.PI*2, true);
}
*/