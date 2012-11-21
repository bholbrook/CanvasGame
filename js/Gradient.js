function Gradient() {
	/*
	this.colorOne =		getRandomColor();
	this.colorTwo =		getRandomColor();
	this.colorThree =	getRandomColor();
	*/
	this.colorOne =		"white";
	this.colorTwo =		"white";
	this.colorThree =	"white";
	this.innerRadius = 3;
	
	this.getColorOne =		function() { return this.colorOne; }
	this.getColorTwo =		function() { return this.colorTwo; }
	this.getColorThree =	function() { return this.colorThree; }
	this.getInnerRadius =	function() { return this.innerRadius; }
}

function getRandomColor() {
	var r = Math.random()*255>>0;
	var g = Math.random()*255>>0;
	var b = Math.random()*255>>0;
	return "rgba("+r+", "+g+", "+b+", 1.0)";
}