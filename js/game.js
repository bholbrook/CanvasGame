var HEIGHT = 500;
var WIDTH = 500;
var LEFT = 0;
var RIGHT = 500;
var TOP = 500;
var BOTTOM = 0;

var PLAYER = new Player();

//var ENEMIES = new List();
var ENEMIES = new Array();
var NUM_ENEMIES = 0;

//var BULLETS = new List();
var BULLETS = new Array();
var NUM_BULLETS = 0;

var CURSOR_RADIUS = 10;

var cursorX = 0;
var cursorY = 0;

var canvas;
var ctx;

document.onmousemove =	mouseMove;
document.onmousedown =	mouseDown;
document.onmouseup =	mouseUp;
document.onkeydown =	keyDown;
document.onkeyup =		keyUp;

var mouseDown = false;

function mouseMove(e) {
	cursorX = e.clientX - CURSOR_RADIUS;
	cursorY = e.clientY - CURSOR_RADIUS;
}

var tid = 0;
var tspeed = 75;

function toggleOn() {
	if (tid == 0) {
		var sx = PLAYER.getX();
		var sy = PLAYER.getY();
		//tid = setInterval("createPlayerBullet(sx, sy, cursorX, cursorY)", tspeed);
		//createPlayerBullet(sx, sy, cursorX, cursorY)
		tid = setInterval(function() { createPlayerBullet(PLAYER.getX(), PLAYER.getY(), cursorX, cursorY) }, tspeed);
	}
}

function toggleOff() {
	if (tid != 0) {
		clearInterval(tid);
		tid = 0;
	}
}

function mouseDown(e) {
	toggleOn();
}

function mouseUp(e) {
	toggleOff();
}

var fps = 0, now, lastUpdate = (new Date) * 1 - 1;
var fpsFilter = 50;

function draw() {
	// Update FPS counter
	var thisFrameFPS = 1000 / ((now = new Date) - lastUpdate);
	fps += (thisFrameFPS - fps) / fpsFilter;
	lastUpdate = now;
	
	fpsOut(fps);
	
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	// change position based on speed
	var shipX = Math.min(Math.max(PLAYER.getX() + xspeed, minx), maxx);
	var shipY = Math.min(Math.max(PLAYER.getY() + yspeed, miny), maxy);
	PLAYER.updatePosition(shipX, shipY);
	
	// change speed based on keyboard events
	if (upPressed == 1)
		yspeed = Math.max(yspeed - 1, -1 * maxSpeed);
	if (downPressed == 1)
		yspeed = Math.min(yspeed + 1, 1 * maxSpeed)
	if (rightPressed == 1)
		xspeed = Math.min(xspeed + 1, 1 * maxSpeed);
	if (leftPressed == 1)
		xspeed = Math.max(xspeed - 1, -1 * maxSpeed);
	
	// decelaration
	if (upPressed == 0 && downPressed == 0)
		slowDownY();
	if (leftPressed == 0 && rightPressed == 0)
		slowDownX();
	
	redrawCursor();
	redrawPlayer();
	redrawBullets();
	redrawEnemies(shipX, shipY);
	checkCollisions();
	
	bulletsOut(NUM_BULLETS);
	enemiesOut(NUM_ENEMIES);
}

function redrawCursor() {	
	ctx.fillStyle = "#FF0000";
	ctx.beginPath();
	ctx.arc(cursorX, cursorY, CURSOR_RADIUS, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
}

function redrawPlayer() {
	PLAYER.redraw();
}

function redrawBullets() {
	for (i=0; i<NUM_BULLETS; i++) {
		//var bullet = BULLETS.get(i);
		var bullet = BULLETS[i];
		bullet.redraw();
	}
}

function redrawEnemies() {
	for (i=0; i<NUM_ENEMIES; i++) {
		//var enemy = ENEMIES.get(i);
		var enemy = ENEMIES[i];
		var shipX = PLAYER.getX();
		var shipY = PLAYER.getY();
		enemy.redraw(shipX, shipY);
	}
}

var playerDeaths = 0;
function playerDeath() {
	//alert("You have been killed.");
	deathsOut(++playerDeaths);
}

function removeEnemy(i) {
	ENEMIES.splice(i, 1);
	//ENEMIES.remove(i);
	NUM_ENEMIES--;
}

function collision(c1, c2) {
	var dx = c1.getX() - c2.getX();
	var dy = c1.getY() - c2.getY();
	var dist = c1.getRadius() + c2.getRadius();
 
	return (dx * dx + dy * dy <= dist * dist)
}

function checkCollisions() {
	for (i=0; i<NUM_ENEMIES; i++) {
		for (j=0; j<NUM_BULLETS; j++) {
			//if (BULLETS.get(j).isPlayerBullet()) {
			if (BULLETS[j].isPlayerBullet()) {
				//if (collision(BULLETS.get(j), ENEMIES.get(i))) {
				if (collision(BULLETS[j], ENEMIES[i])) {			
					removeEnemy(i);
				}			
			} else {
				// Bullet is enemy's, check if collides with player
				if (collision(BULLETS[j], PLAYER)) {
					playerDeath();
				}
			}
		}
	}
}

function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	
	generateRandomEnemies();
	
	// Reduce to 1 for maximum fps
	return setInterval(draw, 10);
}

function clearOutput() {
	document.getElementById("output").innerHTML = "";
}

function output(out) {
	document.getElementById("output").innerHTML = "Output: " + out;
}

function fpsOut(out) {
	document.getElementById("fps").innerHTML = "FPS: " + out;
}

function bulletsOut(out) {
	document.getElementById("bullets").innerHTML = "Bullets: " + out;
}

function enemiesOut(out) {
	document.getElementById("enemies").innerHTML = "Enemies: " + out;	
}

function deathsOut(out) {
	document.getElementById("deaths").innerHTML = "Deaths: " + out;	
}

// Keyboard movement

// Source from: http://stackoverflow.com/questions/7212103/how-to-move-an-image-around-with-arrow-keys-javascript

// movement vars
var xspeed = 1;
var yspeed = 0;
var maxSpeed = 5;

// Boundaries
var minx = 0 + PLAYER.getRadius();
var miny = 0 + PLAYER.getRadius();
var maxx = WIDTH - PLAYER.getRadius();
var maxy = HEIGHT - PLAYER.getRadius();

// controller vars
var upPressed = 0;
var downPressed = 0;
var leftPressed = 0;
var rightPressed = 0;

function slowDownX()
{
  if (xspeed > 0)
    xspeed = xspeed - 1;
  if (xspeed < 0)
    xspeed = xspeed + 1;
}

function slowDownY()
{
  if (yspeed > 0)
    yspeed = yspeed - 1;
  if (yspeed < 0)
    yspeed = yspeed + 1;
}

function keyDown(e)
{
  var code = e.keyCode ? e.keyCode : e.which;
  if (code == 38)
    upPressed = 1;
  if (code == 40)
    downPressed = 1;
  if (code == 37)
    leftPressed = 1;
  if (code == 39)
    rightPressed = 1;
}

function keyUp(e)
{
  var code = e.keyCode ? e.keyCode : e.which;
  if (code == 38)
    upPressed = 0;
  if (code == 40)
    downPressed = 0;
  if (code == 37)
    leftPressed = 0;
  if (code == 39)
    rightPressed = 0;
}