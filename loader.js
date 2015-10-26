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
			//console.log("async added!");
			script.async = true;
		}
		//if sprinkle content script is loaded
		if (url.indexOf("sprinklecontent") >= 0){
			//add attribute
			//console.log("special att added");
			var att = document.createAttribute("data-spklw-automatic-initialization");
			script.setAttributeNode(att);
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
//The default div is a standard widget
var strossleWidgetDiv = "<div data-spklw-widget='widget-5591293a1ed53'></div>";
var borderStyle = "1px solid black";

function callbackForLoadjQuery() {
	console.log("jquery loaded");
	//load jQueryUI script to site
	loadFile("js", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js", callbackForLoadjQueryUI);
	//Load jquery ui's css to site
	loadFile("css", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css", callbackForLoadjQueryCSS);
}

//Callback after jqueryUI load
function callbackForLoadjQueryUI() {
	console.log("callback for load jquery ui function");
	//Add controlBox for sortable()/selectable()
	$("body").prepend("<div style='min-width:30px;min-height:30px;background-color:white;border:1px solid black;padding:5px;z-index: 200000001;position:fixed;top:0'>" +
										"<img src='https://pbs.twimg.com/profile_images/641610044036018176/OQzkinPw.png' style='height:40px'><br>" +
										"<input type='checkbox' id='border' name='border' checked>" +
										"<label for='border'>Border</label><br>" +
										"<input type='radio' id='standardWidget' class='widgetType' name='widgetType' checked>" +
										"<label for='standardWidget'>Standard widget</label><br>" +
										"<input type='radio' id='sidebarWidget' class='widgetType' name='widgetType'>" +
										"<label for='sidebarWidget'>Sidebar widget</label><br>" +
										"<input type='checkbox' id='draggableCB' name='draggableCB'>" +
										"<label for='draggableCB'>Page draggable</label>" +
								"</div>");

	//Make body selectable so user is able to create a widget div
	makeBodySelectable();
}

function callbackForLoadjQueryCSS(){
	console.log("jquery css loaded");
}

function callbackForLoadSprinkle(){
	console.log("callbackForLoadSprinkle function console.log");
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
	if(divHeight > 200 && divWidth > 100) {
		//As code is written 151012, the X sign must be a direct child of .XtoRemoveStrossleWidgetDiv
		var divToAdd = "<div style='display: inline-block; position:relative; float:left; border:"+ borderStyle +"; background:white; width:" + divWidth + "px;height:" +
							divHeight + "px;margin:20px;z-index:200000000;overflow:hidden' class='widgetDiv'>" +
								"<h4 class='XtoRemoveStrossleWidgetDiv' style='position:absolute;top:1px;right:5px;cursor:pointer;font-size:15px;color:black;z-index:2000000000'>&#10006;</h4>" +
								strossleWidgetDiv +
							"</div>";
		if(clickedElement.tagName.toUpperCase() == "BODY"){
			//prepend div to body
			$("body").append(divToAdd);
			console.log("clickedElement is body, div prepended to body");
		}else{
			//insert div before the clickedElement
			$(divToAdd).insertAfter(clickedElement);
			console.log("clickedElement is NOT body, div inserted before clickedElement");
		}
		makeWidgetResizable();
		makeWidgetDraggable();
		$(".ui-icon").css("background-image", "url('')");
		//.ui-dialog .ui-resizable-se {background-image: url("");}
	}else{
		console.log("Div measurements too small!");
	}
}

//onmousedown for body
function whichElementClicked(event){
	//clickedElement = clicked html element
	clickedElement = event.target;
	console.log("clickedElement", clickedElement);
	//If X (remove) on widget is clicked
	if(clickedElement.id == "border"){
		console.log("clicked element:", clickedElement);
		setTimeout(function(){manageDivBorder();}, 200);
	}
	if(clickedElement.id == "draggableCB"){
		console.log("clicked elementis draggable CB!");
		setTimeout(function(){manageDraggable();}, 200);
	}
	if(clickedElement.className.indexOf("widgetType") > -1){
		console.log("widgettype input class clicked");
		setTimeout(function(){manageWidgetType();}, 200);
	}
	if(clickedElement.className.indexOf("XtoRemoveStrossleWidgetDiv") > -1){
		console.log("you clicked X");
		//remove widget div
		$(clickedElement).parent().remove();
		console.log("Element removed");
	}
}

function manageDivBorder() {
	console.log("manageDivBorder Function");
	if($("#border").is(":checked")){
			//console.log("is checked");
			borderStyle = "1px solid black";
		}else{
			//console.log("is not checked");
			borderStyle = "0";
		}
	$(".widgetDiv").css("border", borderStyle);
}

function manageWidgetType() {
	if($("#standardWidget").is(":checked")){
		console.log("standard widget is checked");
		strossleWidgetDiv = "<div data-spklw-widget='widget-5591293a1ed53'></div>";
	}
	if($("#sidebarWidget").is(":checked")){
		console.log("sidebar widget is checked");
		strossleWidgetDiv = "<div data-spklw-widget='widget-5524d25c249ad'></div>";
	}
}

function manageDraggable() {
	if($("#draggableCB").is(":checked")){
		console.log("draggable CB is checked");
		$("body > *").draggable();
		$("body > * > * ").draggable();
		$("body > * > * > *").draggable();
	}else{
		console.log("draggable CB is not checked");
		if($("body > *:first-child").hasClass("ui-draggable")){
			console.log("first child of body has that class - now destroy");
			$("body > *").draggable("destroy");
			$("body > * > *").draggable("destroy");
			$("body > * > * > *").draggable("destroy");
		}else{
			console.log("body first child class'ui-draggable not found'");
		}
	}
}

//Makes <body> "selectable" - makes it possible for user to create custom <div>
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

//makes widget-<div> resizable
function makeWidgetResizable() {
   console.log("widget now resizable");
   $(".widgetDiv").resizable({
      handles: ' n, e, s, w, ne, se, sw, nw'
   });
}

function makeWidgetDraggable() {
	console.log("make widget draggable function");
	$(".widgetDiv").draggable();
}

//EXECUTION 
/*****************************************************************/
//load jQuery to site
loadFile("js", "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js", callbackForLoadjQuery);
loadFile("js", "http://widgets.sprinklecontent.com/v2/sprinkle.js", callbackForLoadSprinkle, true);

//add clickevent to <body>
document.getElementsByTagName("body")[0].setAttribute("onmousedown", "whichElementClicked(event)");





