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

function error(message) {
	document.getElementById("errors").innerHTML = "Error: " + message;
	//alert("Error: " + message);
}