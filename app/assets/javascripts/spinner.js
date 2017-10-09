class Spinner {
	
	constructor(diameter /*in px*/, sides /*number (eg. 5)*/, maxSpeed = 20) {
		this.diameter = this._validateDiameter(diameter);
		this.sides = this._validateSides(sides);
		// this.createSpinner();
		this.interval = null;
		this.rotationAngle = 0;
		this.speed = 0;
		this.maxSpeed = maxSpeed;
		this.suspendedAngle = new Angle(360/this.sides);
		this.accelerate = true;
		this.winner = '';
	}

	setDiameter(diameter){
		this.diameter = this._validateDiameter(diameter);
	}

	setSides(sides){
		this.sides = this._validateSides(sides);
	}

	getDiameter(){
		return this.diameter;
	}

	getParts(){
		return this.sides;
	}

	resetWinner(){
		this.winner = '';
	}

	createSpinner(){
		console.log("Creating spinner with diameter " + this.diameter + " px and " + this.sides + " parts.");
		let spinnerContainer = document.getElementById('spinner');
		spinnerContainer.innerHTML = '';
		spinnerContainer.setAttribute("class", "spinner");
		spinnerContainer.style.width = this.diameter+'px';
		spinnerContainer.style.height = this.diameter+'px';
		//====================== creating marker for spinner ============================
		let marker = document.createElement("div");
		marker.setAttribute("class", "marker");
		spinnerContainer.append(marker);
		//======================== creating spinner circle ==============================
		let spinnerCircle = document.createElement('div');
		spinnerCircle.setAttribute("class", "circle");
		spinnerCircle.setAttribute("id", "disc");
		spinnerContainer.append(spinnerCircle);
		let cornerAngle = new Angle(90 - 180/this.sides);
		let sideBy2 = Math.cos(cornerAngle.toRad())*this.diameter/2;
		let height = Math.sin(cornerAngle.toRad())*this.diameter/2;
		let yAddOffset = this.diameter/2 - height;
		this.items = [];
		//================== creating triangles inside circle ============================
		for(let i = 0; i < this.sides; i++){
			let triangle = document.createElement("div");
			triangle.setAttribute("class", "triangle");
			let xOffset = Math.sin(i*this.suspendedAngle.toRad())*height/2;
			let yOffset = -1*(Math.cos(i*this.suspendedAngle.toRad())*height*0.5) + height/2 + yAddOffset;
			let angle = i*this.suspendedAngle.getAngle();
			this.items.push({item: i, tilt: angle});
			triangle.style.transform = "translate(" + xOffset + "px," + yOffset + "px) rotateZ(" + angle + "deg)";
			triangle.style.borderLeft = sideBy2 + "px solid transparent";
			triangle.style.borderRight = sideBy2 + "px solid transparent";
			if (this.sides % 2 == 0) {
				if (i % 2 == 0) {
					triangle.style.borderTop = height + "px solid rgba(89, 163, 42, 0.76)";
				} else {
					triangle.style.borderTop = height + "px solid rgba(255, 163, 42, 0.76)";
				}
			} else {
				triangle.style.borderTop = height + "px solid rgba(89, 163, 42, 0.76)";
			}
		//=================== text holder inside triangle ================================
			let textHolder = document.createElement("span");
			textHolder.style.top = -0.85*height+'px';
			textHolder.innerHTML = i;

			triangle.append(textHolder);
			spinnerCircle.append(triangle);
		}
	}

	startRotating(ms /* milliseconds */){
		this.accelerate = true;
		if(!ms) { ms = 100; }
		if(!this.interval) {
			this.disc = document.getElementById("disc");
			this.interval = setInterval(function(){ this._rotateDisc(ms);	}.bind(this), ms);
		}
	}

	stopRotating(){
		this.accelerate = false;
	}

	_findClosestItem(){
		// let differences = this.items.map(i=> Math.abs(Math.abs(360-this.rotationAngle) - i.tilt));
		let differences = this.items.map(item => Math.abs(Math.abs(this.rotationAngle) - item.tilt ));
		let index = this._minimumInArray(differences);
		return index;
	}

	_minimumInArray(arr){
		/* returns index of minimum number in provided array */
		let minIndex = 0
		for(let i=1; i<arr.length; i++){
			if(arr[minIndex] > arr[i]) {
				minIndex = i;
			}
		}
		return minIndex;
	}

	_rotateDisc(){
		if(this.accelerate){
			if(this.speed >= this.maxSpeed){
				this.rotationAngle = this.rotationAngle - this.maxSpeed;
			} else {
				this.speed += 0.2;
				this.rotationAngle = this.rotationAngle - this.speed;
			}
		} else {
			if(this.speed <= 0){
				this.speed = 0;
				clearInterval(this.interval);
				this.interval = null;
				this.winner += this._findClosestItem();
				document.getElementById('result').innerHTML = this.winner;
			} else {
				this.speed -= 0.2;
				this.rotationAngle = this.rotationAngle - this.speed;
			}
		}
		if(this.rotationAngle <= (-360 + this.suspendedAngle.value()/2)) {
			this.rotationAngle = this.suspendedAngle.value()/2;
		}
		this.disc.style.transform = "rotateZ(" + this.rotationAngle + "deg)";
	}

	_validateDiameter(value){
		if (!value) {
			console.warn("Initializing with diameter 300px.");
			return 300;
		} else if(!parseInt(value)){
			console.error("Diameter must be a number. Provided value = "+value);
			console.warn("Initializing with diameter 300px.");
			return 300;
		}
		return parseInt(value);
	}

	_validateSides(value){
		if(!value) {
			console.warn("Initializing with 10 parts.");
			return 10;
		} else if(value == 0 || value == 1 || value == 2){
			console.error("Spinner must have atleast 3 parts. Initializing with 10");
			alert("Spinner must have atleast 3 parts.");
			return 10;
		} else if(!parseInt(value)){
			console.error("Sides must be a number. Provided value = "+value);
			console.warn("Initializing with diameter 300px.");
			return 10;
		}
		return parseInt(value);
	}
}