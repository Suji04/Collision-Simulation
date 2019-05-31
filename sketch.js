var a;
var b;
var dt=1;
var sim=false;
var simulate;
var reset;
var a_angle, b_angle, a_speed, b_speed, a_pos, b_pos;

function setup(){
	var c = createCanvas(600,600);
	c.addClass("c");
	a = new ball(30,300,10,50);
	a.col = "#ff5566";
	b = new ball(300,30,10,50);
	b.col = "#5566ff";
	a.v.x=-1;
	a.v.y=-5;
	b.v.y=5;
	b.v.x=-4;

	simulate = createButton(" RUN / STOP ");
	simulate.mousePressed(run);
	simulate.position(800,400);

	reset= createButton(" RESET ");
	reset.mousePressed(initial);
	reset.position(1000,400);

	a_speed = createSlider(0,10,5,0);
	b_speed = createSlider(0,10,5,0);
	a_speed.position(700,100);
	b_speed.position(1000,100);
	a_speed.addClass("slide");
	b_speed.addClass("slide");

	a_angle = createSlider(0,PI,PI/2,0);
	b_angle = createSlider(0,PI,PI/2,0);
	a_angle.position(700,200);
	b_angle.position(1000,200);
	a_angle.addClass("slide");
	b_angle.addClass("slide");

	a_pos = createSlider(30, 570, 300, 0);
	b_pos = createSlider(30, 570, 300, 0);
	a_pos.position(700,300);
	b_pos.position(1000,300);
	a_pos.addClass("slide");
	b_pos.addClass("slide");
}

function run(){
	sim=!sim;
}

function initial(){
	sim=false;
	a.p.x=30;
	a.p.y=300;
	b.p.x=300;
	b.p.y=30;
	a.v.x=-1;
	a.v.y=-5;
	b.v.y=5;
	b.v.x=-4;
	
}


function draw() {
	background(0);
	if(sim==false){
		a.p.y=a_pos.value();
		b.p.x=b_pos.value();

		a.v.x=a_speed.value()*sin(a_angle.value());
		b.v.y=b_speed.value()*sin(b_angle.value());

		a.v.y=a_speed.value()*cos(a_angle.value());
		b.v.x=b_speed.value()*cos(b_angle.value());

	}
	a.display();
	b.display();
	a.arrow();
	b.arrow();
	if(a.iscollision(b)){
		a.aftercollision(b);
	}
	if(sim==true){
		a.update();
		b.update();
	}
}