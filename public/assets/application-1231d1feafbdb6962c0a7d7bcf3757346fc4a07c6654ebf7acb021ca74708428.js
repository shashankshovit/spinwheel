function startApp(){
	var sides = document.getElementById('sides').value;
	var width = document.getElementById('width').value;
	// createSpinner(width, sides);
	window.spinner = new Spinner(width, sides);
	window.spinner.createSpinner();
}

function toggleRotation(){
	if (window.spinner.interval) {
		window.spinner.stopRotating();
	} else {
		window.spinner.startRotating();
	}
}
;
