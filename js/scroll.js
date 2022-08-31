document.addEventListener('DOMContentLoaded', init)

var window_width,
		window_height,
		document_height,
		font_size,
		logo_max_offset,
		auto_playing_animation;

// offsets in rems for each line
// [starting x (top), starting y (left), width]
var starting_offsets = {
	'm-1': [0, 0, 6],
	'm-2': [4.9, 0, 6],
	'm-3': [0, 4.47, 6],
	'i-1': [2.04, 5.24, 5.75],
	'i-2': [2.04, 9.73, 4.48],
	'i-3': [2.93, 9.73, 7.45],
	't-1': [0.7, 10.5, 6.05],
	't-2': [4.2, 10.5, 4],
	't-3': [2.93, 14.97, 3.85]
};


function init(){
	setVars();

	window.addEventListener('scroll', scrollHandler);
	window.addEventListener('resize', setVars);

	document.querySelectorAll('.pet').forEach((e)=>{
		e.addEventListener('mouseenter', cyclePetHoverHandler);
	});
}

function randomPet(){
	document.querySelectorAll('.pet').forEach((e)=>{
		if(Math.random() > 0.5){
			cyclePet(e.classList);
		}
	})
}

function startAutoplay(){
	animation_interval = setInterval(function(){
		randomPet();
	}, 1500);
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

function setVars(){
	window_width = window.innerWidth;
	window_height = window.innerHeight;

	var body = document.body,
			html = document.documentElement;

	font_size = parseInt(window.getComputedStyle(body, null).getPropertyValue('font-size'));

	document_height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight ) - window_height;

	logo_height = document.querySelector('.logo_container img').clientHeight;

	if (window_width <= 1100){
		logo_max_offset = 2 * font_size;
	} else{
		logo_max_offset = window_height/2 - logo_height/2 - 2 * font_size;
	}

	if(window_width <= 1100 && !auto_playing_animation){
		startAutoplay();
		auto_playing_animation = true;
	} else if (window_width > 1100 && auto_playing_animation){
		auto_playing_animation = false;
		clearInterval(animation_interval);
	}
}

function scrollHandler(e){
	var scroll = window.scrollY;
	var percentage = window.scrollY / document_height;
	var offset = logo_max_offset * percentage;
	var rem_offset = offset * 2 / font_size;

	for (const key in starting_offsets){
		calcRotation(key, starting_offsets[key], rem_offset);
	}

	document.querySelector('#mit .inner_wrapper').style.transform = 'translateX(-3rem) translateY(-' + offset + 'px)';
	document.querySelector('#mad .inner_wrapper').style.transform = 'translateX(3rem) translateY(' + offset + 'px)';
} 

function calcRotation(id, array, rem_offset){
	start_x = -3 + array[0]
	end_x = start_x + array[2]
	start_y = array[1]
	end_y = array[1] + rem_offset


	var distance = Math.sqrt((end_x - start_x) * (end_x - start_x) + (end_y - start_y) * (end_y - start_y));
	var slope = radians_to_degrees(Math.atan((end_y - start_y) / (end_x - start_x)));

	console.log(slope);

	document.getElementById(id).style.width = distance + 'rem';
	document.getElementById(id).style.transform = 'rotate(' + slope + 'deg)';
}

function radians_to_degrees(radians){
  var pi = Math.PI;
  return radians * (180/pi);
}