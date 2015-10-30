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

//Default value variables
//Width: x, height: y
var startX = 0;
var endX = 0;
var startY = 0;
var endY = 0;
var divWidth = 0;
var divHeight = 0;
var clickedElement;
var divToAdd = "";
//The default/start div is a standard widget
var strossleWidgetDiv = "<div data-spklw-widget='widget-5591293a1ed53'></div>";
var borderStyle = "1px solid black";

//Callback after jQuery load
function callbackForLoadjQuery() {
	console.log("jquery loaded");
	//load jQueryUI script to site
	loadFile("js", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js", callbackForLoadjQueryUI);
	//Load jquery ui's css to site
	loadFile("css", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css");
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
	//testToAddWidgetOnLoad();
}

function testToAddWidgetOnLoad(){
	//standard widget
	var standardWidgetDiv = "<div style='display: inline-block; position:relative; margin: 0 auto; border:"+ borderStyle +"; background:white;width:1076px;height:310px;margin:20px;z-index:200000000;overflow:hidden' class='widgetDiv'><h4 class='XtoRemoveStrossleWidgetDiv' style='position:absolute;top:1px;right:5px;cursor:pointer;font-size:15px;color:black;z-index:2000000000'>&#10006;</h4>" +
								strossleWidgetDiv + "</div>";
	var elementToAddStdWiOn = $("body > *:last-of-type:not(script):not(noscript)").last();
	$(standardWidgetDiv).insertAfter(elementToAddStdWiOn);
	//sidebar widget
	var sidebarWidgetDiv = "<div style='display:inline; position:relative; float:right; border:"+ borderStyle +"; background:white;width:100px;height:500px;margin:20px;z-index:200000000;overflow:hidden' class='widgetDiv'><h4 class='XtoRemoveStrossleWidgetDiv' style='position:absolute;top:1px;right:5px;cursor:pointer;font-size:15px;color:black;z-index:2000000000'>&#10006;</h4><div data-spklw-widget='widget-5524d25c249ad'></div></div>";
	var elementToAddSideWiOn = $("body > *").get(2);
	console.log("elementToAddSideWiOn", elementToAddSideWiOn);
	$(sidebarWidgetDiv).insertAfter(elementToAddSideWiOn);
	//####Experiment more with the row above - nu ser det knäppt ut!
	makeWidgetResizable();
	makeWidgetDraggable();
	//'tr:not(.table_vert_controls):last'
	//$("body > *:last-child");
	//$("body > *:last-of-type:not(script)");        -> returnerar den sista av varje typ av element utom :not
	//$("body > *:last-of-type:not(script):not(noscript)");        -> returnerar den sista av varje typ av element utom :nots
	//$("body > *:last-of-type:not(script):not(noscript)").last();    -> returnerar den sista av "sista-elementen"
}

function callbackForLoadSprinkle(){
	console.log("callbackForLoadSprinkle function console.log");
}

//onmousedown for body
function whichElementClicked(event){
	//clickedElement = clicked html element
	clickedElement = event.target;
	console.log("clickedElement", clickedElement);
	//If checkbox for border is clicked
	if(clickedElement.id == "border"){
		console.log("clicked element:", clickedElement);
		setTimeout(function(){manageDivBorder();}, 200);
	}
	//If checkbox for draggable is clicked
	if(clickedElement.id == "draggableCB"){
		console.log("clicked elementis draggable CB!");
		setTimeout(function(){manageDraggable();}, 200);
	}
	//if radio buttons for widgetType are clicked
	if(clickedElement.className.indexOf("widgetType") > -1){
		console.log("widgettype input class clicked");
		setTimeout(function(){manageWidgetType();}, 200);
	}
	//If X (remove) on widget is clicked
	if(clickedElement.className.indexOf("XtoRemoveStrossleWidgetDiv") > -1){
		console.log("you clicked X");
		//remove that widget div
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
		//use Strossle's standard widget
		strossleWidgetDiv = "<div data-spklw-widget='widget-5591293a1ed53'></div>";
	}
	if($("#sidebarWidget").is(":checked")){
		console.log("sidebar widget is checked");
		//use Strossle's sidebar widget
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
			console.log("event", event);
			startX = event.clientX;
			startY = event.clientY;
			console.log("x, y:", startX, startY);
		},
		stop: function(event, ui){
			console.log("event", event);
			endX = event.clientX;
			endY = event.clientY;
			console.log("x, y:", endX, endY);
			calcDivMeasurements();
		}
	});
}

//Calculate users desired measurements for widget-<div>
function calcDivMeasurements() {
	var leftToRight;
	var topToBottom;
	var positionRules = "";
	console.log("calcDivMeasurements start. startx, endx, starty, endy", startX, endX, startY, endY);
	//Calculate divWidth
	if(endX > startX){
		leftToRight = true;
		divWidth = endX - startX;
	}else {
		leftToRight = false;
		divWidth = startX - endX;
	}
	//Calculate divHeight
	if(endY > startY){
		topToBottom = true;
		divHeight = endY - startY;
	}else{
		topToBottom = false;
		divHeight = startY - endY;
	}
	//if user "draws" widgetbox from left to right
	if(leftToRight){
		console.log("left to right!");
		positionRules += "left:" + startX + "px;";
	//if user "draws" widgetBox from right to left
	}else{
		console.log("right to left!");
		positionRules += "left:" + endX + "px;";
	}
	//if user "draws" widgetbox from top to bottom
	if(topToBottom){
		console.log("top to bottom!");
		positionRules += "top:" + startY + "px;";
	//uf user "draws" widgetbox from bottom to top
	}else{
		console.log("bottom to top");
		positionRules += "top:" + endY + "px;";
	}

	if(divHeight > 200 && divWidth > 100) {
		console.log("positionRules", positionRules);
		//For remove functionality to work, the X sign (&#10006) must be a direct child of .XtoRemoveStrossleWidgetDiv
		divToAdd = "<div style='position:fixed;"+ positionRules +"'><div style='display: inline-block; position:relative; float:left; border:"+ borderStyle +"; background:white; width:" + divWidth +
					"px;height:" + divHeight + "px;z-index:200000000;overflow:hidden' class='widgetDiv'>" +
								"<h4 class='XtoRemoveStrossleWidgetDiv' style='position:absolute;top:1px;right:5px;cursor:pointer;font-size:15px;color:black;z-index:2000000000'>&#10006;</h4>" +
								strossleWidgetDiv +
							"</div></div>";
							console.log("divToAdd", divToAdd);
		if(clickedElement.tagName.toUpperCase() == "BODY"){
			//append div to body
			$("body").append(divToAdd);
			console.log("clickedElement is body, div prepended to body");
		}else{
			//insert div after the clickedElement
			$(divToAdd).insertAfter(clickedElement);
			console.log("clickedElement is NOT body, div inserted before clickedElement");
		}
		$(".widgetDiv").css("position", "static");
		makeWidgetResizable();
		makeWidgetDraggable();
		//remove jQuery UI's default resizable icon
		$(".ui-icon").css("background-image", "url('')");
	}else{
		console.log("Div measurements too small!");
	}
}


//makes widget-<div>s resizable
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