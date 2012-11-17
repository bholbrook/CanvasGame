
var DEFAULT_ENEMY_SPEED =			1.0;
var DEFAULT_ENEMY_RADIUS =			10;
var DEFAULT_ENEMY_BULLET_SPEED =	DEFAULT_BULLET_SPEED;

var MIN_ENEMY_BULLET_FREQUENCY =	100;
var MAX_ENEMY_BULLET_FREQUENCY =	500;

var DEFAULT_ENEMY_COLOR =			"#00FF00";

function Enemy(x, y, speed, zone) {
	this.radius =			DEFAULT_ENEMY_RADIUS;
	this.xpos =				x;
	this.ypos =				y;
	this.speed =			speed;
	this.color =			DEFAULT_ENEMY_COLOR;
	this.zone =				zone;

	this.getX =				function() { return this.xpos; }
	this.getY =				function() { return this.ypos; }
	this.getRadius =		function() { return this.radius; }
	this.getSpeed =			function() { return this.speed; }
	this.getColor =			function() { return this.color; }
	
	this.updatePosition = function(sx, sy) {		
		var tx = sx - this.getX();
		var ty = sy - this.getY();
		var length = Math.abs(Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2)));
		
		this.dx = (tx / length) * speed;
		this.dy = (ty / length) * speed;
		
		var newX = this.xpos + this.dx;
		var newY = this.ypos + this.dy;
		if (newX >= this.zone.getLeftBoundary() && newX <= this.zone.getRightBoundary())
			this.xpos = newX;
		if (newY >= this.zone.getTopBoundary() && newY <= this.zone.getBottomBoundary()) 
			this.ypos = newY;
	}
	
	var bulletCounter = 0;
	var bulletFrequency = Math.floor(Math.random() * MAX_ENEMY_BULLET_FREQUENCY + 1) + MIN_ENEMY_BULLET_FREQUENCY;
	
	this.shoot = function(sx, sy) {
		if (bulletCounter == bulletFrequency) {	
			var b = new Bullet(this.getX(), this.getY(), sx, sy, DEFAULT_ENEMY_BULLET_SPEED, ENEMY_BULLET_ID);
			BULLETS.push(b);
			NUM_BULLETS++;
			bulletCounter = 0;
		}
		
		bulletCounter++;
	}
	
	this.redraw = function(sx, sy) {
		this.updatePosition(sx, sy);		
		this.shoot(sx, sy);
		
		ctx.fillStyle = this.getColor();
		ctx.beginPath();
			
		ctx.moveTo(this.getX(), this.getY());
		ctx.arc(this.getX(), this.getY(), this.getRadius(), 0, Math.PI * 2, true);
		
		ctx.closePath();
		ctx.fill();
	}
	
	this.remove = function(i) {
		ENEMIES.splice(i, 1);
		NUM_ENEMIES--;
	}
}

function redrawEnemies() {
	for (i=0; i<NUM_ENEMIES; i++) {
		var enemy = ENEMIES[i];
		var shipX = PLAYER.getX();
		var shipY = PLAYER.getY();
		enemy.redraw(shipX, shipY);
	}
}

function createEnemy(x, y, zone) {
	var e = new Enemy(x, y, DEFAULT_ENEMY_SPEED, zone);
	ENEMIES.push(e);
	NUM_ENEMIES++;
}
	
function generateRandomEnemies() {
	var maxNumEnemies = 100;
	var minNumEnemies = 20;
	
	var n = 100;
	for (i=0; i<n; i++) {
		var zone = getRandomEnemyZone();
		var x = Math.floor(Math.random() * zone.getRightBoundary()) + zone.getLeftBoundary();
		var y = Math.floor(Math.random() * zone.getBottomBoundary()) + zone.getTopBoundary();
		
		createEnemy(x, y, zone);
	}
}