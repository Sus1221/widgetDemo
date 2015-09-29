//Insert code below in bookmark url-field in browser to run this script on current url
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
		//Bind callback function to events
		script.onreadystatechange = callback;
		script.onload = callback;
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

//Callback after jquery load
var callbackForLoadjQuery = function() {
  console.log("jQuery loaded");
};

//Callback after jqueryUI load
var callbackForLoadjQueryUI = function() {
	console.log("jQueryUI loaded");
	//Add controlBox for widgets
	$("body").prepend("<div style='min-width:200px;min-height:100px;background-color:white;border:1px solid black;padding:5px;z-index: 200000;position:fixed;top:0' id='choiceBox'>" +
												"<h4>Choose widget</h4>" +
												"<label for='largeWidgetCB'>Large Widget</label>" +
												"<input type='checkbox' name='largeWidgetCB' id='largeWidgetCB' checked><br>" +
												"<label for='smallWidgetCB'>Small widget</label>" +
												"<input type='checkbox' name='smallWidgetCB' id='smallWidgetCB' checked>" +
											"</div>");
	//Add two widget elements
	$("body").append(
										"<div style='height:100px;background-color:red;positon:relative;border:1px solid black' id='strossleWidgetLarge'>" +
										"</div>" +
										"<div style='height:100px;background-color:blue;position:relative;border:1px solid black' id='strossleWidgetSmall'>" +
										"</div>" +
										"<div style='height:100px;background-color:yellow;positon:relative;border:1px solid black' id='extraWidget'>" +
										"</div>"
	);
	//Make divs draggable with jQueryUI
	//$("#strossleWidgetLarge").draggable({scrollSpeed:500});
	//$("#strossleWidgetSmall").draggable({scrollSpeed:500});
	//$("#extraWidget").draggable({scrollSpeed:500});
	//$("#choiceBox").resizable();
	$("body").sortable({
		axis: "y",
		revert: true,
		scroll: false,
		cursor: "pointer",
		start: function(e,ui){
			ui.placeholder.height(ui.item.height());
		}
	});
	$(".ui-sortable-placeholder").css({
		"border":"1px dotted black",
		"visibility":"visible !important"});
};

var callbackForLoadCSS = function() {
	console.log("CSS is loaded!");
};

//Run to load jquery script to page
loadFile("js", "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js", callbackForLoadjQuery);
//Run to load jQueryUI script to page
loadFile("js", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js", callbackForLoadjQueryUI);
//Run to load jQueryUI css to page
loadFile("css", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css", callbackForLoadCSS);

window.setInterval(function(){
  checkCheckBoxes();
}, 10000);

function checkCheckBoxes() {
	console.log("checkCheckBoxes is run now!");
	//Whatch for checkbox for large widget to change
	$(document).on('change', "#largeWidgetCB", function(){
		if(this.checked) {
			console.log("Large one checked!");
			//Make large widget visible.
			$("#strossleWidgetLarge").show();
		}else {
			console.log("Large one unchecked");
			//Make large widget hidden.
			$("#strossleWidgetLarge").hide();
		}
	});
	//Watch for checkbox for small widget to change
	$(document).on('change', "#smallWidgetCB", function(){
		if(this.checked) {
			console.log("Small one checked!");
			//Make small widget visible.
			$("#strossleWidgetSmall").show();
		}else {
			console.log("Small one unchecked!");
			//Make small widget hidden.
			$("#strossleWidgetSmall").hide();
		}
	});
}


