document.addEventListener('DOMContentLoaded', init)

var window_width,
		window_height,
		fifth_width,
		third_height,
		coord_x,
		coord_y,
		current_coord;

function init(){
	setVars();
	window.addEventListener('mousemove', trackQuadrant)
	window.addEventListener('resize', setVars)
}

function setVars(){
	window_width = window.innerWidth;
	window_height = window.innerHeight;

	fifth_width = window_width/5;
	third_height = window_height/3;
}

function trackQuadrant(e){
	var x = e.clientX;
	var y = e.clientY;

	var coord_x = Math.floor(x/fifth_width);
	var coord_y = Math.floor(y/third_height);

	if (current_coord && coord_x != current_coord[0]){
		document.body.removeAttribute('class');
		document.body.classList.add('x-' + coord_x);
	}

	if ([coord_x, coord_y] == current_coord){
		return;		
	} else {
		current_coord = [coord_x, coord_y];
		if (document.querySelector('.logo_image.visible')){
			document.querySelector('.logo_image.visible').classList.remove('visible');
		}
		document.getElementById('logo-' + coord_x + '-' + coord_y).classList.add('visible');
	}
}