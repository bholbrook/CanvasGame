function Zone(left, right, top, bottom) {
	this.leftBoundary =			left;
	this.rightBoundary =		right;
	this.topBoundary =			top;
	this.bottomBoundary =		bottom;
	
	this.getLeftBoundary =		function() { return this.leftBoundary; }
	this.getRightBoundary =		function() { return this.rightBoundary; }
	this.getTopBoundary =		function() { return this.topBoundary; }
	this.getBottomBoundary =	function() { return this.bottomBoundary; }
	
	this.setLeftBoundary =		function(left) { this.leftBoundary = left; }
	this.setRightBoundary =		function(right) { this.rightBoundary = right; }
	this.setTopBoundary =		function(top) { this.topBoundary = top; }
	this.setBottomBoundary =	function(bottom) { this.bottomBoundary = bottom; }
}

function getRandomEnemyZone() {
	var r = Math.floor(Math.random() * NUM_ENEMY_ZONES);
	return 	ENEMY_ZONES[r];
}

var ENEMY_ZONES = new Array();
var NUM_ENEMY_ZONES = 4;

// Left, Right, Top, Bottom
var zones = [
	[0, 250, 0, 200],
	[250, 500, 0, 200],
	[0, 500, 0, 400],
	[0, 500, 0, 300]
];

function generateEnemyZones() {	

	for (i=0; i<NUM_ENEMY_ZONES; i++) {
		var zone = new Zone(zones[i][0], zones[i][1], zones[i][2], zones[i][3]);
		ENEMY_ZONES.push(zone);
	}
}