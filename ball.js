function ball(x,y,m,d) {
	this.m=m;
	this.d=d;
	this.col="";
	this.p = createVector(x,y);
	this.v = createVector(0,0);

	this.display = function(){
		fill(this.col);
		ellipse(this.p.x,this.p.y,this.d);
	};

	this.update = function(){
		this.p.add(p5.Vector.mult(this.v,dt));
	};

	this.iscollision = function(other){
		d = this.p.dist(other.p);
		r_sum = (this.d + other.d)/2;
		if(d<=r_sum) return true;
		return false;
	};

	this.aftercollision = function(other){
		// ball a
		var acoeff = (-2*other.m)/(this.m+other.m);
		var ade = p5.Vector.sub(this.p,other.p).magSq();
		var anu = p5.Vector.dot(p5.Vector.sub(this.v,other.v),p5.Vector.sub(this.p,other.p));
		var adir = p5.Vector.sub(this.p,other.p);
		

		// ball b
		var bcoeff = (-2*this.m)/(this.m+other.m);
		var bde = p5.Vector.sub(other.p,this.p).magSq();
		var bnu = p5.Vector.dot(p5.Vector.sub(other.v,this.v),p5.Vector.sub(other.p,this.p));
		var bdir = p5.Vector.sub(other.p,this.p);

		// simultaneous update
		this.v.add(p5.Vector.mult(adir,(acoeff*anu)/ade));
		other.v.add(p5.Vector.mult(bdir,(bcoeff*bnu)/bde));		
	};

	this.arrow = function(){
		push();
		stroke(255,255,255,150);
		strokeWeight(3);
		line(this.p.x,this.p.y,this.p.x+20*this.v.x,this.p.y+20*this.v.y);
		pop();
	}

}