//Insert code on row below in bookmark url-field in browser to run this script on current url
//javascript:(function(){var%20script=document.createElement('script');script.type='text/javascript';script.src='https://rawgit.com/Sus1221/widgetDemo/master/loader.js';document.getElementsByTagName('head')[0].appendChild(script);})();

//Load files to current page
function loadFile(type, url, callback, async) {
	//"grab" the <head> in index.html
	var head = document.getElementsByTagName('head')[0];
	if(type == "js"){
		//Create a new <script>
		var script = document.createElement('script');
		//Assign values to script
		script.type = 'text/javascript';
		script.src = url;
		if(async){
			console.log("async added!");
			script.async = true;
		}
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

//Stores measurements from selectable.stop function for widget-div
var startX = 0;
var endX = 0;
var startY = 0;
var endY = 0;
var clickedElement;

//Callback after jqueryUI load
function callbackForLoadjQueryUI() {
	//Add controlBox for sortable()/selectable()
	$("body").prepend("<div style='min-width:200px;min-height:100px;background-color:white;border:1px solid black;padding:5px;z-index: 200000001;position:fixed;top:0' id='choiceBox'>" +
												"<form>" +
														"<label for='createElements'> Create Elements</label>" +
														"<input type='radio' name='chooseFunction' id='createElements' checked><br>" +
														"<label for='sortElements'> Drag n drop</label>" +
														"<input type='radio' name='chooseFunction' id='sortElements'><br>" +
												"</form>" +
											"</div>");
	//Make body selectable so user is able to create a widget div
	makeBodySelectable();
}

function callbackForLoadSprinkle(){
	console.log("callbackForLoadSprinkle console.log");
	//Line under this made real widget content show at end of body!
	//$("body").append("<div data-spklw-widget='widget-5591293a1ed53'></div>");
}

//Calculate users desired measurements for widget-<div>
function calcDivMeasurements() {
	//console.log("numbers sX, eX, sY, eY", startX, endX, startY, endY);
	//Width: x
	//Height: y
	var divWidth = 0;
	var divHeight = 0;
	//Calculate divWidth
	if(endX > startX){
		divWidth = endX - startX;
	}else {
		divWidth = startX - endX;
	}
	//Calculate divHeight
	if(endY > startY){
		divHeight = endY - startY;
	}else {
		divHeight = startY - endY;
	}
	if(divHeight > 50 && divWidth > 50) {
		//As code is written 151012, the X sign must be a direct child of .XtoRemoveStrossleWidgetDiv
		var divToAdd = "<div style='position:relative; border:1px solid black; outline:1px solid darkgray; background:white; width:" + divWidth + "px;height:"+ divHeight + "px;margin:5px;z-index:200000000' class='widgetDiv'><h3 class='XtoRemoveStrossleWidgetDiv' style='position:absolute;top:5px;right:5px;cursor:pointer;font-size:30px;color:black;'>&#10006;</h3><div data-spklw-widget='widget-5591293a1ed53'></div></div>";
		if(clickedElement.tagName.toUpperCase() == "BODY"){
			//prepend div to body
			$("body").prepend(divToAdd);
			console.log("clickedElement is body, div prepended to body");
		}else{
			//insert div before the clickedElement
			$(divToAdd).insertBefore(clickedElement);
			console.log("clickedElement is NOT body, div inserted before clickedElement");
		}
	}else{
		console.log("Div measurements too small!");
	}
}

//onmousedown for body
function whichElementClicked(event){
	//clickedElement = clicked html element
	clickedElement = event.target;
	//console.log("clickedElement", clickedElement);
	//console.log("clickedElement.type", clickedElement.type);
	if(clickedElement.type == "radio"){
		console.log("it is a radiobutton");
		setTimeout(function() { manageUserFunctions(event); }, 1000);
	}

	//If X (remove) on widget is clicked
	if(clickedElement.className.indexOf("XtoRemoveStrossleWidgetDiv") > -1){
		console.log("It's the right class name, it is X");
		//remove widget div
		$(clickedElement).parent().remove();
		console.log("Element removed");
	}
}

function manageUserFunctions(event){
	console.log("start of manageUserFunctions function");
	console.log("manageUserFunctions-function Event-inparameter: ", event);
	//Make body selectable/unselectable/sortable/unsortable 
	//according to users choice in radiobuttons
	if($("#createElements").is(':checked')){
		console.log("createElements is checked");
		//disable sortable
		makeBodyContentUnsortable();
		//make elements selectable
		makeBodySelectable();
	}else if($("#sortElements").is(":checked")){
		console.log("sortElements is checked");
		//disable selectable
		makeBodyUnselectable();
		//make elements sortable
		makeBodyContentSortable();
	}
}

//Makes <body> "selectable" - makes it possible for  user to create custom <div>
function makeBodySelectable() {
	console.log("body now selectable");
	$("html").selectable({
		start: function(event, ui){
			startX = event.clientX;
			startY = event.clientY;
		},
		stop: function(event, ui){
			endX = event.clientX;
			endY = event.clientY;
			calcDivMeasurements();
		}
	});
}

function makeBodyUnselectable() {
	console.log("body now NOT selectable");
	//$( "body" ).selectable( "option", "disabled", true);
	$("hmtl").selectable("destroy");
}

//Makes <body> and some of its descendants sortable
function makeBodyContentSortable() {
	console.log("body now sortable");
	
	$("html *").sortable({
		placeholder: "placeholder",
		forcePlaceholderSize: true,
		start: function(event, ui) {
			ui.placeholder.css('background-color', 'blue');
		}
	});
}

//Makes <body> and some of its descendants NOT sortable
function makeBodyContentUnsortable(){
	console.log("body now NOT sortable");
	//make everything made sortable in makeBodyContentSortable UNsortable
	$("html *").sortable("destroy");
}

//EXECUTION 
/*****************************************************************/
//load jQuery to site
loadFile("js", "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js");
//load jQueryUI script to site
loadFile("js", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js", callbackForLoadjQueryUI);
//Load jquery ui's css to site
loadFile("css", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css");
loadFile("js", "http://widgets.sprinklecontent.com/v2/sprinkle.js", callbackForLoadSprinkle, true);

//add clickevent to <body>
document.getElementsByTagName("body")[0].setAttribute("onmousedown", "whichElementClicked(event)");





