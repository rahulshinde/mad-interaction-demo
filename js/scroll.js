document.addEventListener('DOMContentLoaded', init)

var window_width,
		window_height,
		document_height,
		font_size,
		logo_max_offset;

// offsets in rems for each line
// [starting x (top), starting y (left), width]
var starting_offsets = {
	'm-1': [0, 0, 10],
	'm-2': [4.9, 0, 10],
	'm-3': [0, 4.47, 10],
	'i-1': [2.04, 5.24, 9.75],
	'i-2': [2.04, 9.73, 8.48],
	'i-3': [2.93, 9.73, 11.45],
	't-1': [0.7, 10.5, 10.05],
	't-2': [4.2, 10.5, 8],
	't-3': [2.93, 14.97, 7.85]
};


function init(){
	setVars();

	window.addEventListener('scroll', scrollHandler);
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

	logo_max_offset = window_height/2 - logo_height/2 - 40;
}

function scrollHandler(e){
	var scroll = window.scrollY;
	var percentage = window.scrollY / document_height;
	var offset = logo_max_offset * percentage;
	var rem_offset = offset * 2 / font_size;

	for (const key in starting_offsets){
		calcRotation(key, starting_offsets[key], rem_offset);
	}

	document.querySelector('#mit .inner_wrapper').style.transform = 'translateX(-5rem) translateY(-' + offset + 'px)';
	document.querySelector('#mad .inner_wrapper').style.transform = 'translateX(5rem) translateY(' + offset + 'px)';
} 

function calcRotation(id, array, rem_offset){
	start_x = -5 + array[0]
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