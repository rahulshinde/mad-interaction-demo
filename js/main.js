document.addEventListener('DOMContentLoaded', init)

var window_width,
		window_height,
		fifth_width,
		fifth_height,
		coord_x,
		coord_y,
		current_coord;

function init(){
	setVars();
	window.addEventListener('mousemove', trackQuadrant);
	window.addEventListener('resize', setVars)

	document.querySelectorAll('.pet').forEach((e)=>{
		e.addEventListener('mouseenter', cyclePet);
	});

	videoInteraction()

}

function setVars(){
	window_width = window.innerWidth;
	window_height = window.innerHeight;

	fifth_width = window_width/5;
	fifth_height = window_height/5;
}

function cyclePet(e){
	var target_list = e.target.classList;
	if (target_list.contains('rec')){
		target_list.remove('rec');
		target_list.add('ital');
	} else if(target_list.contains('ital')){
		target_list.remove('ital');
	} else{
		target_list.add('rec');
	}
}

function trackQuadrant(e){
	var x = e.clientX;
	var y = e.clientY;

	setQuadrant(x, y);

}

function setQuadrant(x, y){
	var coord_x = Math.floor(x/fifth_width);
	var coord_y = Math.floor(y/fifth_height);

	if (coord_x < 0){
		coord_x = 0
	}
	if (coord_x > 4){
		coord_x = 4
	}
	if (coord_y < 0){
		coord_y = 0
	}
	if (coord_y > 4){
		coord_y = 4
	}

	console.log(coord_x, coord_y)

	if (current_coord && (coord_x != current_coord[0] || coord_y != current_coord[1])){
		document.body.removeAttribute('class');
		document.body.classList.add('x-' + coord_x);
		document.body.classList.add('y-' + coord_y);
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

function videoInteraction(){
	var vid = document.querySelector(".video")
	var cornered = false

	vid.addEventListener('click', function(){
		if(!cornered){
			vid.classList.add('cornered')
			cornered = true
		}else{
			vid.classList.remove('cornered')
			cornered = false
		}
		
	})
}