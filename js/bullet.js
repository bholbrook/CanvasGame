
var DEFAULT_BULLET_SPEED =	2.0;
var DEFAULT_BULLET_RADIUS =	5;
var DEFAULT_BULLET_COLOR = "#FF00FF";
var DEFAULT_BULLET_GRADIENT = null;

var PLAYER_BULLET_ID =	0;
var ENEMY_BULLET_ID =	1;

function Bullet(x1, y1, x2, y2, speed, owner) {
	this.color = 	DEFAULT_BULLET_COLOR;
	this.radius =	DEFAULT_BULLET_RADIUS;
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
	this.isPlayerBullet =	function() { return this.owner == PLAYER_BULLET_ID; }
	this.isEnemyBullet =	function() { return this.owner == ENEMY_BULLET_ID; }
	
	this.updatePosition = function() {
		this.xpos += this.dx;
		this.ypos += this.dy;
	}
	
	this.redraw = function(i) {
		this.updatePosition();
		
		ctx.fillStyle = this.getColor();
		ctx.beginPath();
		
		if (this.outOfBounds()) {
			this.remove(i);
			
		} else {
			var gradient = ctx.createRadialGradient(this.getX(), this.getY(), this.getRadius()/3, this.getX(), this.getY(), this.getRadius());
			gradient.addColorStop(0, '#A7D30C');
			gradient.addColorStop(0.9, '#019F62');
			gradient.addColorStop(1, 'rgba(1,159,98,0)');
			ctx.fillStyle = gradient;
			
			ctx.shadowOffsetX = 5;
			ctx.shadowOffsetY = 5;
			ctx.shadowBlur = 2;
			ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
			
			
			ctx.moveTo(this.getX(), this.getY());
			ctx.arc(this.getX(), this.getY(), this.getRadius(), 0, Math.PI * 2, true);
		}
		
		ctx.closePath();
		ctx.fill();
	}
	
	this.remove = function(i) {
		BULLETS.splice(i, 1);
		NUM_BULLETS--;
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
	var b = new Bullet(sx, sy, cx, cy, DEFAULT_BULLET_SPEED, PLAYER_BULLET_ID);
	BULLETS.push(b);
	NUM_BULLETS++;
}

function createEnemyBullet(sx, sy, cx, cy) {
	var b = new Bullet(sx, sy, cx, cy, DEFAULT_BULLET_SPEED, ENEMY_BULLET_ID);
	BULLETS.push(b);
	NUM_BULLETS++;
}

function redrawBullets() {
	for (i=0; i<NUM_BULLETS; i++) {
		var bullet = BULLETS[i];
		bullet.redraw(i);
	}
}

function setBlueBullets() {
	DEFAULT_BULLET_GRADIENT = ctx.createRadialGradient(60,60,20,60,60,70);
	DEFAULT_BULLET_GRADIENT.addColorStop(0, 'white');
	DEFAULT_BULLET_GRADIENT.addColorStop(1, 'black');
}