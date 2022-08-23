document.addEventListener('DOMContentLoaded', init)

var window_width,
		window_height,
		fifth_width,
		fifth_height,
		coord_x,
		coord_y,
		current_coord,
		animation_interval,
		auto_playing_animation,
		animation_position;

var animation_sequence = [
	[2,2],
	[2,1],
	[2,0],
	[3,0],
	[4,0],
	[4,1],
	[4,2],
	[4,3],
	[4,4],
	[3,4],
	[2,4],
	[1,4],
	[0,4],
	[0,3],
	[0,2],
	[0,1],
	[0,0],
	[1,0],
	[2,0],
	[2,1]
]

function init(){
	animation_position = 0;
	setVars();
	pageLoad();
	window.addEventListener('mousemove', trackQuadrant);
	window.addEventListener('resize', setVars)

	document.querySelectorAll('.pet').forEach((e)=>{
		e.addEventListener('mouseenter', cyclePetHoverHandler);
	});

}

function pageLoad(){
	setTimeout(function(){
		document.querySelector('header').classList.add('visible');
		document.querySelector('#logos').classList.remove('b_w');
		document.querySelector('.button').classList.remove('b_w');
	}, 1000);
	setTimeout(function(){
		document.querySelector('footer').classList.add('visible');
		document.querySelector('#body_content').classList.add('visible');
	}, 1500);
	setTimeout(function(){
		document.querySelector('.video').classList.add('visible');
	}, 2000);
}

function setVars(){
	window_width = window.innerWidth;
	window_height = window.innerHeight;

	fifth_width = window_width/5;
	fifth_height = window_height/5;

	if(window_width <= 1100 && !auto_playing_animation){
		startAutoplay();
		auto_playing_animation = true;
	} else if (window_width > 1100 && auto_playing_animation){
		auto_playing_animation = false;
		clearInterval(animation_interval);
	}
}

function startAutoplay(){
	animation_interval = setInterval(function(){
		cycleAnimation();
		randomPet();
	}, 750);
}

function cycleAnimation(){
	setQuadrant(animation_sequence[animation_position][0], animation_sequence[animation_position][1]);

	animation_position = animation_position + 1;
	if (animation_position > animation_sequence.length - 1){
		animation_position = 0;
	}
}

function randomPet(){
	document.querySelectorAll('.pet').forEach((e)=>{
		if(Math.random() > 0.5){
			cyclePet(e.classList);
		}
	})
}

function cyclePetHoverHandler(e){
	if (window_width < 1100){
		return;
	}

	cyclePet(e.target.classList)
}

function cyclePet(target_list){
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
	if (window_width < 1100){
		return;
	}

	var x = e.clientX;
	var y = e.clientY;

	calcQuadrant(x, y);
}

function calcQuadrant(x, y){
	var coord_x = Math.floor(x/fifth_width);
	var coord_y = Math.floor(y/fifth_height);

	setQuadrant(coord_x, coord_y)
}

function setQuadrant(coord_x, coord_y){
	
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