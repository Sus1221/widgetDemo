//Insert code on row below in bookmark url-field in browser to run this script on current url
//javascript:(function(){var%20script=document.createElement('script');script.type='text/javascript';script.src='https://rawgit.com/Sus1221/widgetDemo/master/loader.js';document.getElementsByTagName('head')[0].appendChild(script);})();

//Load files to page
function loadFile(type, url, callback, async) {
	//"grab" the <head> in index.html of page
	var head = document.getElementsByTagName('head')[0];
	//If function call sends in type "js"
	if(type == "js"){
		//Create a new <script>
		var script = document.createElement('script');
		//Assign attributes to <script>
		script.type = 'text/javascript';
		script.src = url;
		//If the script should load asynchronously
		if(async){
			script.async = true;
		}
		//If sprinkle content script is being loaded
		if (url.indexOf("sprinklecontent") >= 0){
			//add attribute needed
			var att = document.createAttribute("data-spklw-automatic-initialization");
			script.setAttributeNode(att);
		}
		//Bind eventual callback function to events
		if(callback){
			script.onreadystatechange = callback;
			script.onload = callback;
		}
		//Add <script> to <head>
		head.appendChild(script);
	//If function call sends in type "css"
	}else if(type == "css"){
		//Create a new <link>
		var link = document.createElement('link');
		//Assign attributes to link
		link.rel = 'stylesheet';
		link.href = url;
		//Bind eventual callback function to events
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
//The default/start div, a standard widget
var strossleWidgetDiv = "<div data-spklw-widget='widget-5591293a1ed53'></div>";
var strossleWidgetDivNo = 1;
var borderStyle = "1px solid black";
var minWidth = 300;
var minHeight = 200;

//Callback after jQuery load
function callbackForLoadjQuery() {
	//load jQueryUI script to site
	loadFile("js", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js", callbackForLoadjQueryUI);
	//Load jquery ui's css to site
	loadFile("css", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css");
}

//Callback after jqueryUI load
function callbackForLoadjQueryUI() {
	//Add a 'controlbox' to page to control widget-<div>'s
	$("body").prepend("<div id ='controlBox' style='text-align:left;min-width:30px;min-height:30px;background-color:white;border:1px solid black;padding:5px;z-index: 200000001;position:fixed;top:0;left:0'>" +
										"<img src='https://pbs.twimg.com/profile_images/641610044036018176/OQzkinPw.png' style='height:40px;width:auto;margin:2px;display:inline-block;'>" +
										"<span id='cancelWidget' style='float:right;cursor:pointer;font-size:60%'>Cancel</span><br>" +
										"<input type='checkbox' id='border' name='border' checked>" +
										"<label for='border' class='strossleLabel'>Border</label><br>" +
										"<input type='radio' id='standardWidget' class='widgetType' name='widgetType' checked>" +
										"<label for='standardWidget' class='strossleLabel'>1.Standard widget</label><br>" +
										"<input type='radio' id='sidebarWidget' class='widgetType' name='widgetType'>" +
										"<label for='sidebarWidget' class='strossleLabel'>2.Sidebar widget</label><br>" +
										"<input type='radio' id='blackWhiteWidget' class='widgetType' name='widgetType'>" +
										"<label for='blackWhiteWidget' class='strossleLabel'>3.Black & white widget</label><br>" +
							"</div>");
	$(".strossleLabel").css("display","inline");
	$("<div id='lengthErrorMessage' style='background:white;display:inline;'></div>").appendTo("#controlBox");
	//Make body selectable so user is able to create a widget div
	makeBodySelectable();
}

//onmousedown click for <body>
function whichElementClicked(event){
	//clickedElement = the clicked html element
	clickedElement = event.target;
	//If cancel text in #controlBox is clicked
	if(clickedElement.id == "cancelWidget"){
		location.reload();
	}
	//If checkbox for border is clicked
	if(clickedElement.id == "border"){
		setTimeout(function(){manageDivBorder();}, 200);
	}
	//if radio buttons for widgetType choice are clicked
	if(clickedElement.className.indexOf("widgetType") > -1){
		setTimeout(function(){manageWidgetType();}, 200);
	}
	//If X (remove) in a widget is clicked
	if(clickedElement.className.indexOf("XtoRemoveStrossleWidgetDiv") > -1 ){
		console.log("you clicked XtoRemoveStrossleWidgetDiv");
		//remove that widget-<div>
		$(clickedElement).parent().delay(2000).remove();
	}
	//if #1 is clicked on a widget
	if(clickedElement.className.indexOf("widget1") > -1){
		console.log("class widget1");
		//remove current inner widget div
		$(clickedElement).parent().siblings("div").remove();
		//append new inner widget div as last sibling to clickedElement
		$(clickedElement).parent().parent().prepend("<div data-spklw-widget='widget-5591293a1ed53'></div>");
		//styling of numbers
		$(clickedElement).css("font-weight", "bold");
		$(clickedElement).siblings().css("font-weight", "normal");
	}
	//if #2 is clicked on a widget
	if(clickedElement.className.indexOf("widget2") > -1){
		console.log("class widget2");
		//remove current inner widget div
		$(clickedElement).parent().siblings("div").remove();
		//append new inner widget div as last sibling to clickedElement
		$(clickedElement).parent().parent().prepend("<div data-spklw-widget='widget-5524d25c249ad'></div>");
		//styling of numbers
		$(clickedElement).css("font-weight", "bold");
		$(clickedElement).siblings().css("font-weight", "normal");
		
	}
	//if #3 is clicked on a widget
	if(clickedElement.className.indexOf("widget3") > -1){
		console.log("class widget3");
		//remove current inner widget div
		$(clickedElement).parent().siblings("div").remove();
		//append new inner widget div as last sibling to clickedElement
		$(clickedElement).parent().parent().prepend("<div data-spklw-widget='widget-5565c515580c0'></div>");
		//styling of numbers
		$(clickedElement).css("font-weight", "bold");
		$(clickedElement).siblings().css("font-weight", "normal");
	}
}

//manage borderstyle of .outerWidgetDiv
function manageDivBorder() {
	//if checkbox is checked
	if($("#border").is(":checked")){
			borderStyle = "1px solid black";
		}else{
			borderStyle = "0";
		}
	$(".outerWidgetDiv").css("border", borderStyle);
}

//switches widget content source
function manageWidgetType() {
	//If standard widget is chosen
	if($("#standardWidget").is(":checked")){
		//use Strossle's standard widget
		strossleWidgetDiv = "<div data-spklw-widget='widget-5591293a1ed53'></div>";
		strossleWidgetDivNo = 1;
		minHeight = 250;
		minWidth = 300;
	}
	//If sidebar widget is chosen
	if($("#sidebarWidget").is(":checked")){
		//use Strossle's sidebar widget
		strossleWidgetDiv = "<div data-spklw-widget='widget-5524d25c249ad'></div>";
		strossleWidgetDivNo = 2;
		minHeight = 300;
		minWidth = 100;
	}
	if($("#blackWhiteWidget").is(":checked")){
		//use Strossle's black & white widget
		strossleWidgetDiv = "<div data-spklw-widget='widget-5565c515580c0'></div>";
		strossleWidgetDivNo = 3;
		minHeight = 250;
		minWidth = 300;
	}
}

//Makes <body> "selectable" - makes it possible for user to create custom <div>
function makeBodySelectable() {
	$("html").selectable({
		start: function(event, ui){
			startX = event.pageX;
			startY = event.pageY;
		},
		stop: function(event, ui){
			endX = event.pageX;
			endY = event.pageY;
			calcDivMeasurements();
		}
	});
}


//Calculate users desired measurements for widget-<div>
function calcDivMeasurements() {
	var leftToRight;
	var topToBottom;
	var positionRules = "";
	//If horizontal number is higher than on start
	if(endX > startX){
			leftToRight = true;
			divWidth = endX - startX;
	//If horizontal number is lower than on start
	}else {
		leftToRight = false;
		divWidth = startX - endX;
	}
	//If vertical number is higher than on start
	if(endY > startY){
		topToBottom = true;
		divHeight = endY - startY;
	//If vertical number is lower than on start
	}else{
		topToBottom = false;
		divHeight = startY - endY;
	}
	console.log("divHeight:", divHeight, "minHeight", minHeight, "divWidth", divWidth, "minWidth", minWidth);
	//If userdrawn box have sufficient measurements
	if(divHeight > minHeight && divWidth > minWidth) {
		//if user "draws" widgetbox from left to right
		if(leftToRight){
			positionRules += "left:" + startX + "px;";
		//if user "draws" widgetBox from right to left
		}else{
			positionRules += "left:" + endX + "px;";
		}
		//if user "draws" widgetbox from top to bottom
		if(topToBottom){
			positionRules += "top:" + startY + "px;";
		//uf user "draws" widgetbox from bottom to top
		}else{
			positionRules += "top:" + endY + "px;";
		}
		var divToAdd = "<div style='position:absolute;"+ positionRules + "z-index:200000000;background:white;overflow:hidden;display:inline-block;" +
						"border:" + borderStyle + ";width:" + divWidth + "px;height:" + divHeight + "px;' class='outerWidgetDiv'>" +
							"<div style='display:inline-block; position:relative;width:100%;background:white;' class='widgetDiv'>" +
								strossleWidgetDiv +
							"</div>" +
							"<div style='position:absolute;bottom:0;left:0;z-index:2000000000;background:white;'>" +
								"<h5 class='widget1' style='cursor:pointer;display:inline;margin:7px;font-weight:bold;line-height:normal;'>1</h5>" +
								"<h5 class='widget2' style='cursor:pointer;display:inline;margin:7px;font-weight:normal;line-height:normal;'>2</h5>" +
								"<h5 class='widget3' style='cursor:pointer;display:inline;margin:7px;font-weight:normal;line-height:normal;'>3</h5>" +
							"</div>" +
							"<h4 class='XtoRemoveStrossleWidgetDiv' style='position:absolute;bottom:0;right:0;cursor:pointer;font-size:15px;color:black;background:white;margin:0;z-index:2000000000'>X</h4>" +
						"</div>";
		$("body").append(divToAdd);
		makeWidgetResizable();
		makeWidgetDraggable();
		if(strossleWidgetDivNo == 1){
			$(".widget1").css("font-weight", "bold");
			$(".widget2").css("font-weight", "normal");
			$(".widget3").css("font-weight", "normal");
		}else if(strossleWidgetDivNo == 2){
			$(".widget1").css("font-weight", "normal");
			$(".widget2").css("font-weight", "bold");
			$(".widget3").css("font-weight", "normal");
		}else if(strossleWidgetDivNo == 3){
			$(".widget1").css("font-weight", "normal");
			$(".widget2").css("font-weight", "normal");
			$(".widget3").css("font-weight", "bold");
		}
		//remove jQuery UI's default resizable icon in the down-right corner
		$(".ui-icon").css("background-image", "url('')");
	}else{
		console.log("Div measurements too small!");
		showTooShortMessage();
	}
}

//makes widget resizable for user
function makeWidgetResizable() {
   console.log("widget now resizable");
   $(".outerWidgetDiv").resizable({
      handles: ' n, e, s, w, ne, se, sw, nw'
   });
   $("#controlBox").resizable({
      handles: ' n, e, s, w, ne, se, sw, nw'
   });
   //Widen click space for resizing   
	$(".ui-resizable-s").css("height", "15px");
	$(".ui-resizable-n").css("height", "15px");
	$(".ui-resizable-w").css("width", "15px");
	$(".ui-resizable-e").css("width", "15px");
}

//makes widge drag'n'droppable for user
function makeWidgetDraggable() {
	console.log("make widget draggable function");
	$(".outerWidgetDiv").draggable();
	$("#controlBox").draggable();
}

//Show message when users 'drawn' box is to small compared to minimum measurements
function showTooShortMessage(){
	console.log("The minimum measurements for the box are: ",minHeight, "px high and ", minWidth, " px wide.");
	$("#lengthErrorMessage").html("<p>Minimum measurements <br>for chosen widget<br>type are: <br>height: " + minHeight + "px,<br>width: " + minWidth + " px.</p>").show();
	setTimeout(function(){$("#lengthErrorMessage").fadeOut(500);}, 7000);
}



//load jQuery to site
loadFile("js", "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js", callbackForLoadjQuery);
loadFile("js", "http://widgets.sprinklecontent.com/v2/sprinkle.js", false, true);

//add clickevent to <body>
document.getElementsByTagName("body")[0].setAttribute("onmousedown", "whichElementClicked(event)");