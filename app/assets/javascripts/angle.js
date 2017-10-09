class Angle {
	constructor(angle){
		this.angle = angle;
	}

	setAngle(angle){
		this.angle = angle;
	}

	getAngle(){
		return this.angle;
	}

	value(){
		return this.angle;
	}

	toRad(){
		return this.angle*Math.PI/180;
	}
}