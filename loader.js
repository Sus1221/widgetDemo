//Insert code on row below in bookmark url-field in browser to run this script on current url
//javascript:(function(){var%20script=document.createElement('script');script.type='text/javascript';script.src='https://rawgit.com/Sus1221/widgetDemo/master/loader.js';document.getElementsByTagName('head')[0].appendChild(script);})();

console.log("Loader.js working!");

//Load files to current page
function loadFile(type, url, callback) {
	//"grab" the <head> in index.html
	var head = document.getElementsByTagName('head')[0];
	if(type == "js"){
		//Create a new <script>
		var script = document.createElement('script');
		//Assign values to script
		script.type = 'text/javascript';
		script.src = url;
		//Bind ev. callback function to events
		if(callback){
			script.onreadystatechange = callback;
			script.onload = callback;
		}
		//Add <script> to <head>
		head.appendChild(script);
	}else if(type == "css"){
		//Create a new <link>
		var link = document.createElement('link');
		//Assign values to link
		link.rel = 'stylesheet';
		link.href = url;
		//Bind callback function to events
		link.onreadystatechange = callback;
		link.onload = callback;
		//Add <link> to <head>
		head.appendChild(link);
	}
}

//Stores measurements from selecable.stop function for widget-div
var startX = 0;
var endX = 0;
var startY = 0;
var endY = 0;
var clickedElement;

//Callback after jqueryUI load
var callbackForLoadjQueryUI = function() {
	console.log("jQueryUI loaded");
	//Add controlBox for widgets
	$("body").prepend("<div style='min-width:200px;min-height:100px;background-color:white;border:1px solid black;padding:5px;z-index: 200000;position:fixed;top:0' id='choiceBox'>" +
												"<h4>Choose widget</h4>" +
												"<label for='largeWidget-Show'>Add large Widget</label>" +
												"<input type='checkbox' name='largeWidget-Show' id='largeWidget-Show'><br>" +
												"<label for='smallWidget-show'>Add small widget</label>" +
												"<input type='checkbox' name='smallWidget-show' id='smallWidget-Show'>" +
											"</div>");
										//Add two widget elements
										$("body").append(
											"<div style='height:100px;background-color:red;border:1px solid black' id='largeWidget'>" +
											"</div>" +
											"<div style='height:100px;background-color:blue;border:1px solid black' id='smallWidget'>" +
											"</div>"
										);
	$("body").selectable({
		start: function(event, ui){
			console.log("event clientX: ", event.clientX, "event client Y", event.clientY);
			startX = event.clientX;
			startY = event.clientY;
		},
		stop: function(event, ui){
			console.log("event clientX: ", event.clientX, "event clientY: ", event.clientY);
			endX = event.clientX;
			endY = event.clientY;
			calcDivMeasurements();
		}
	});
};

//onmousedown for body
function whichElementClicked(event){
	//tag = clicked html element
	clickedElement = event.srcElement;
	console.log("Tag clicked: ", tag);
	//If checkbox is clicked
	if(tag.type == "checkbox"){
		var checkBoxID = tag.id;
		//remove characters after hyphen
		var widgetID = checkBoxID.substr(0,checkBoxID.indexOf("-"));
		//Toggle visibility of widget
		$("#" + widgetID).toggle();
	}
}

//Calculate users desired measurements for widget-<div>
function calcDivMeasurements() {
	console.log("numbers sX, eX, sY, eY", startX, endX, startY, endY);
	console.log("clickedElement: ", clickedElement);
	//makeBodyContentSortable();
}

//Makes <body> and some of its descendants sortable
function makeBodyContentSortable() {
	$("body").sortable({
		//axis: "y",
		//revert: true,
		//scroll: false,
		placeholder: "placeholder",
		forcePlaceholderSize: true,
		start: function(event, ui){
         ui.placeholder.css('background-color', 'green');
      }
	});
	$("body > *").sortable({
		placeholder: "placeholder",
		forcePlaceholderSize: true,
		start: function(event, ui){
			ui.placeholder.css('background-color', 'green');
		}
	});
	$("body > * > *").sortable({
		placeholder: "placeholder",
		forcePlaceholderSize: true,
		start: function(event, ui) {
			ui.placeholder.css('background-color', 'green');
		}
	});
}




//EXECUTION 
/*****************************************************************/
//load jQuery to site
loadFile("js", "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js");
//If needed - load jQueryUI script to site
if (typeof jQuery.ui == 'undefined') {
	loadFile("js", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js", callbackForLoadjQueryUI);
}
//Load jquery ui's css to site
loadFile("css", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css");

//add clickevent to <body>
document.getElementsByTagName("body")[0].setAttribute("onmousedown", "whichElementClicked(event)");