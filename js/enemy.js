//var ENEMIES = new Array();
//var ENEMIES =						new List();
//var NUM_ENEMIES =					0;

var ENEMY_SPEED =					1.0;
var ENEMY_RADIUS =					10;
var ENEMY_BULLET_SPEED =			BULLET_SPEED;

var MIN_ENEMY_BULLET_FREQUENCY =	100;
var MAX_ENEMY_BULLET_FREQUENCY =	500;

var DEFAULT_ENEMY_COLOR =			"#00FF00";

function Enemy(x, y, speed) {
	this.radius =			ENEMY_RADIUS;
	this.xpos =				x;
	this.ypos =				y;
	this.speed =			speed;
	this.color =			DEFAULT_ENEMY_COLOR;

	this.getX =				function() { return this.xpos; }
	this.getY =				function() { return this.ypos; }
	this.getRadius =		function() { return this.radius; }
	this.getSpeed =			function() { return this.speed; }
	this.getColor =			function() { return this.color; }
		
	this.update = function(sx, sy) {
		this.updatePosition(sx, sy);
		
		this.shoot(sx, sy);
	}
	
	this.updatePosition = function(sx, sy) {		
		var tx = sx - this.getX();
		var ty = sy - this.getY();
		var length = Math.abs(Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2)));
		
		this.dx = (tx / length) * speed;
		this.dy = (ty / length) * speed;
		
		this.xpos += this.dx;
		this.ypos += this.dy;
	}
	
	var bulletCounter = 0;
	var bulletFrequency = Math.floor(Math.random() * MAX_ENEMY_BULLET_FREQUENCY + 1) + MIN_ENEMY_BULLET_FREQUENCY;
	
	this.shoot = function(sx, sy) {		
		//var bid = setInterval();
		if (bulletCounter == bulletFrequency) {	
			var b = new Bullet(this.getX(), this.getY(), sx, sy, ENEMY_BULLET_SPEED, ENEMY_BULLET);
			//BULLETS.push(b);
			//BULLETS.add(b);
			BULLETS.push(b);
			NUM_BULLETS++;
			bulletCounter = 0;
		}
		
		bulletCounter++;
	}
	
	this.redraw = function(sx, sy) {
		this.update(sx, sy);
		
		ctx.fillStyle = this.getColor();
		ctx.beginPath();
			
		ctx.moveTo(this.getX(), this.getY());
		ctx.arc(this.getX(), this.getY(), this.getRadius(), 0, Math.PI * 2, true);
		
		ctx.closePath();
		ctx.fill();
	}
}

function createEnemy(x, y) {		
	var e = new Enemy(x, y, ENEMY_SPEED);
	//ENEMIES.add(e);
	ENEMIES.push(e);
	NUM_ENEMIES++;
}
	
function generateRandomEnemies() {
	var maxNumEnemies = 100;
	var minNumEnemies = 20;
	var x = 0, y = 0;
	
	var n = 100;
	for (i=0; i<n; i++) {
		x = Math.floor(Math.random() * RIGHT + 1) + LEFT;
		y = Math.floor(Math.random() * TOP + 1) + BOTTOM;
		
		createEnemy(x, y);
	}
}