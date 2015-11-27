//Insert code on row below in bookmark url-field in browser to run this script on your current url.
//javascript:(function(){var script=document.createElement('script');script.type='text/javascript';script.src='https://rawgit.com/Sus1221/widgetDemo/master/loader.js';document.getElementsByTagName('head')[0].appendChild(script);})();

//Load files to page
function loadFile(type, url, callback, async) {
	//put the <head> in index.html of page in variable
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
			//put value to true
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
		//Add created <script> to <head>
		head.appendChild(script);
	//If function call sends in type "css"
	}else if(type == "css"){
		//Create a new <link>
		var link = document.createElement('link');
		//Assign attributes to the <link>
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
//Width: x
var startX = 0;
var endX = 0;
var divWidth = 0;
//Height: y
var startY = 0;
var endY = 0;
var divHeight = 0;
var clickedElement;
//The default/start div, a standard widget
var strossleWidgetToBeCreated = "<div data-spklw-widget='widget-5591293a1ed53'></div>";
//The default/start borderStyle of widget -<div>
var borderStyle = "1px solid black";

var widgetSources = {
	widgetToChangeTo1 : "<div data-spklw-widget='widget-5591293a1ed53'></div>",
	widgetToChangeTo2 : "<div data-spklw-widget='widget-5591293a1ed53'></div>",
	widgetToChangeTo3 : "<div data-spklw-widget='widget-5591293a1ed53'></div>",
	widgetToChangeTo4 : "<div data-spklw-widget='widget-5524d25c249ad'></div>",
	widgetToChangeTo5 : "<div data-spklw-widget='widget-5524d25c249ad'></div>",
	widgetToChangeTo6 : "<div data-spklw-widget='widget-5524d25c249ad'></div>",
	widgetToChangeTo7 : "<div data-spklw-widget='widget-5565c515580c0'></div>",
	widgetToChangeTo8 : "<div data-spklw-widget='widget-5565c515580c0'></div>",
	widgetToChangeTo9 : "<div data-spklw-widget='widget-5565c515580c0'></div>"
};

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
	$("body").prepend("<div id ='controlBox' style='text-align:left;min-width:30px;min-height:30px;background-color:white;border:1px solid black;padding:5px;z-index: 200000001;position:fixed;top:0;right:0'>" +
										"<img src='https://pbs.twimg.com/profile_images/641610044036018176/OQzkinPw.png' style='height:40px;width:auto;margin:2px;display:inline-block;'>" +
										"<span id='cancelWidget' style='float:right;cursor:pointer;font-size:60%'>X</span><br>" +
										"<div id='controlBoxContent' style='display:none;'>" +
											"<input type='checkbox' id='border' name='border' checked>" +
											"<label for='border' class='strossleLabel'>Border</label><br>" +
											"<h3>Category 1</h3>" +
											"<input type='radio' class='widgetType, standardWidget, rb1' name='widgetType'checked>" +
											"<label for='rb1' class='strossleLabel'>1a</label><br>" +
											"<input type='radio' class='widgetType,standardWidget, rb2' name='widgetType'>" +
											"<label for='rb2' class='strossleLabel'>1b</label><br>" +
											"<input type='radio' class='widgetType, standardWidget, rb3' name='widgetType'>" +
											"<label for='rb3' class='strossleLabel'>1c</label><br>" +
											"<h3>Category 2</h3>" +
											"<input type='radio' class='widgetType, standardWidget, rb4' name='widgetType'>" +
											"<label for='rb4' class='strossleLabel'>1d</label><br>" +
											"<input type='radio' class='widgetType, sidebarWidget, rb5' name='widgetType'>" +
											"<label for='rb5' class='strossleLabel'>2a</label><br>" +
											"<input type='radio' class='widgetType, sidebarWidget, rb6' name='widgetType'>" +
											"<label for='rb6' class='strossleLabel'>2b</label><br>" +
											"<h3>Category 3</h3>" +
											"<input type='radio' class='widgetType, sidebarWidget, rb7' name='widgetType'>" +
											"<label for='rb7' class='strossleLabel'>2c</label><br>" +
											"<input type='radio' class='widgetType, sidebarWidget, rb8' name='widgetType'>" +
											"<label for='rb8' class='strossleLabel'>2d</label><br>" +
											"<input type='radio' class='widgetType, blackWhiteWidget, rb9' name='widgetType'>" +
											"<label for='rb9' class='strossleLabel'>3a</label><br>" +
										"</div>" +
							"</div>");
	$(".strossleLabel").css("display","inline");
	$("<div id='lengthErrorMessage' style='background:white;display:inline;'></div>").appendTo("#controlBox");
	$("#controlBox").mouseenter(function(){
		$("#controlBoxContent").fadeIn();
	});
	$("#controlBox").mouseleave(function(){
		$("#controlBoxContent").hide();
	});
	//Make body selectable so user is able to create a widget -<div>
	makeBodySelectable();
}

//onmousedown click for <body>
function whichElementClicked(event){
	//clickedElement = the clicked html element
	clickedElement = event.target;
	//If "cancel"-<span> in #controlBox is clicked
	if(clickedElement.id == "cancelWidget"){
		//reload page - whole bookmarklet cancelled
		location.reload();
	}
	//If checkbox for border is clicked
	if(clickedElement.id == "border"){
		//Run function to manage borderstyling of divs
		setTimeout(function(){manageDivBorder();}, 200);
	}
	//if radio buttons for widgetTypes are clicked
	if(clickedElement.className.indexOf("widgetType") > -1){
		//Run function to manage widget type
		setTimeout(function(){manageWidgetType();}, 200);
	}
	if(clickedElement.className.indexOf("XtoRemovestrossleWidgetToBeCreated") > -1 ){
		console.log("you clicked XtoRemovestrossleWidgetToBeCreated");
		//remove that whole widget-<div>
		$(clickedElement).parent().remove();
	}
	//if a widget style is chosen inside of the widget box
	if(clickedElement.className.indexOf("wTypeChange") > -1){
		console.log("wTypeChange clicked");
		changeWidgetType(clickedElement);
	}
}

function changeWidgetType(clickedElement) {
	console.log("changeWidgetType function");
	//remove current sprinkle-widget-<div>
	$(clickedElement).parent().siblings("div").remove();
	//Grab third class of clicked element
	var clickedElSecondClass = clickedElement.classList[1];
	console.log("clickedElSecondClass", clickedElSecondClass);
	//Extract numbers from classname - tex 8
	var noInClassName = parseInt(clickedElSecondClass.match(/\d+/g), 10);
	console.log("noInClassName", noInClassName);
	//Grab right widgetvariable to change to
	var keyNameInWidgetSourcesObj = "widgetToChangeTo" + noInClassName;
	var newWidgetSource = widgetSources[keyNameInWidgetSourcesObj];
	console.log("newOne", newWidgetSource);
	//append new strossle-widget-<div> as last sibling to clickedElement
	$(clickedElement).parent().parent().prepend(newWidgetSource);
	//styling of numbers in widget
	$(clickedElement).css("font-weight", "bold");
	$(clickedElement).siblings().css("font-weight", "normal");
	//Need to destroy resizable functionality and then...
	$(".outerWidgetDiv").resizable("destroy");
	//make it resizable again to get resizability to work after widget exchange just done
	makeWidgetResizable();
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
	if($(".rb1").is(":checked")){
		//Number 1
		strossleWidgetToBeCreated = "<div data-spklw-widget='widget-5591293a1ed53'></div>";
	}
	if($(".rb2").is(":checked")){
		//Number 2
		strossleWidgetToBeCreated = "<div data-spklw-widget='widget-5591293a1ed53'></div>";
	}
	if($(".rb3").is(":checked")){
		//Number 3
		strossleWidgetToBeCreated = "<div data-spklw-widget='widget-5591293a1ed53'></div>";
	}
	if($(".rb4").is(":checked")){
		//Number 4
		strossleWidgetToBeCreated = "<div data-spklw-widget='widget-5524d25c249ad'></div>";
	}
	if($(".rb5").is(":checked")){
		//Number 5
		strossleWidgetToBeCreated = "<div data-spklw-widget='widget-5524d25c249ad'></div>";
	}
	if($(".rb6").is(":checked")){
		//Number 6
		strossleWidgetToBeCreated = "<div data-spklw-widget='widget-5524d25c249ad'></div>";
	}
	if($(".rb7").is(":checked")){
		//Number 7
		strossleWidgetToBeCreated = "<div data-spklw-widget='widget-5565c515580c0'></div>";
	}
	if($(".rb8").is(":checked")){
		//Number 8
		strossleWidgetToBeCreated = "<div data-spklw-widget='widget-5565c515580c0'></div>";
	}
	if($(".rb9").is(":checked")){
		//Number 9
		strossleWidgetToBeCreated = "<div data-spklw-widget='widget-5565c515580c0'></div>";
	}
}


//Makes <body> "selectable" - makes it possible for user to create/draw custom <div>
function makeBodySelectable() {
	$("html").selectable({
		start: function(event, ui){
			startX = event.pageX;
			startY = event.pageY;
		},
		stop: function(event, ui){
			endX = event.pageX;
			endY = event.pageY;
			//At the end of every drawn box - run function
			calcDivMeasurements();
		}
	});
}

//Calculate users desired measurements for widget-<div>, and add it to page
function calcDivMeasurements() {
	//boolean that tells if user drew box from left to right or not
	var leftToRight;
	//boolean that tells if user drew box from top to bottom or not
	var topToBottom;
	//Stores css rules for the widget div
	var positionRules = "";
	//If horizontal value is higher than on start
	if(endX > startX){
			leftToRight = true;
			//Calc. width of div
			divWidth = endX - startX;
	//If horizontal value is lower than on start
	}else {
		leftToRight = false;
		//Calc. width of div
		divWidth = startX - endX;
	}
	//If vertical value is higher than on start
	if(endY > startY){
		topToBottom = true;
		//Calc. height of div
		divHeight = endY - startY;
	//If vertical value is lower than on start
	}else{
		topToBottom = false;
		//Calc. height of div
		divHeight = startY - endY;
	}
	//if user "draws" widgetbox from left to right
	if(leftToRight){
		//add start X-value to "left:"
		positionRules += "left:" + startX + "px;";
	//if user "draws" widgetBox from right to left
	}else{
		//add end X-value to "left:"
		positionRules += "left:" + endX + "px;";
	}
	//if user "draws" widgetbox from top to bottom
	if(topToBottom){
		//add start Y-value to "top:"
		positionRules += "top:" + startY + "px;";
	//if user "draws" widgetbox from bottom to top
	}else{
		//add end Y-value to "top:"
		positionRules += "top:" + endY + "px;";
	}
	//div with widget to add to page
	var divToAdd = "<div style='position:absolute;"+ positionRules + "z-index:200000000;background:white;overflow:hidden;display:inline-block;" +
					"border:" + borderStyle + ";width:" + divWidth + "px;height:" + divHeight + "px;' class='outerWidgetDiv'>" +
						"<div style='display:inline-block; position:relative;width:100%;background:white;' class='widgetDiv'>" +
							strossleWidgetToBeCreated +
						"</div>" +
						//Classes rbX must be #2 in order for var clickedElSecondClass to get the right value
						"<div style='position:absolute;bottom:0;left:0;z-index:2000000000;background:white;'>" +
							"<h5 class='wTypeChange, rb1' style='cursor:pointer;display:inline;margin:7px;font-weight:normal;line-height:normal;'>1a</h5>" +
							"<h5 class='wTypeChange, rb2' style='cursor:pointer;display:inline;margin:7px;font-weight:normal;line-height:normal;'>1b</h5>" +
							"<h5 class='wTypeChange, rb3' style='cursor:pointer;display:inline;margin:7px;font-weight:normal;line-height:normal;'>1c</h5>" +
							"<h5 class='wTypeChange, rb4' style='cursor:pointer;display:inline;margin:7px;font-weight:normal;line-height:normal;'>2a</h5>" +
							"<h5 class='wTypeChange, rb5' style='cursor:pointer;display:inline;margin:7px;font-weight:normal;line-height:normal;'>2b</h5>" +
							"<h5 class='wTypeChange, rb6' style='cursor:pointer;display:inline;margin:7px;font-weight:normal;line-height:normal;'>2c</h5>" +
							"<h5 class='wTypeChange, rb7' style='cursor:pointer;display:inline;margin:7px;font-weight:normal;line-height:normal;'>3a</h5>" +
							"<h5 class='wTypeChange, rb8' style='cursor:pointer;display:inline;margin:7px;font-weight:normal;line-height:normal;'>3b</h5>" +
							"<h5 class='wTypeChange, rb9' style='cursor:pointer;display:inline;margin:7px;font-weight:normal;line-height:normal;'>3c</h5>" +
						"</div>" +
						"<h4 class='XtoRemovestrossleWidgetToBeCreated' style='position:absolute;bottom:0;right:0;cursor:pointer;font-size:15px;color:black;background:white;margin:0;z-index:2000000000'>X</h4>" +
					"</div>";
	//append created div to <body>
	$("body").append(divToAdd);
	//Make the right <h5> bold
	//1.Grab the checked radiobutton
	var radiobuttonChecked = $('#controlBoxContent input[type=radio]:checked');
	console.log("radiobuttonChecked", radiobuttonChecked);
	//2.grab radiobutton's third class
	var rbClass = radiobuttonChecked[0].classList[2];
	console.log("rbClass", rbClass);
	//grab <h5> with that class
	//OLD VERSION 
	//var elementToBoldify = $("divToAdd").children().eq(1).children().filter("." + rbClass);
	//NEW VERSION
	var elementToBoldify = $("body div:last-child > div:last-child > h5").hasClass(rbClass);
	console.log("elementToBoldify", elementToBoldify);
	//make that element bold
	$(elementToBoldify).css("font-weight", "bold");
	makeWidgetResizable();
	makeWidgetDraggable();
}

//makes widget-div resizable for user
function makeWidgetResizable() {
   console.log("widget now resizable");
   $(".outerWidgetDiv").resizable({
      handles: ' n, e, s, w, ne, se, sw, nw'
   });
   //Widen handle space for resizing   
	$(".ui-resizable-s").css("height", "15px");
	$(".ui-resizable-n").css("height", "15px");
	$(".ui-resizable-w").css("width", "15px");
	$(".ui-resizable-e").css("width", "15px");
	//remove jQuery UI's default resizable icon in the down-right corner
	$(".ui-icon").css("background-image", "url('')");
}

//makes widget div drag'n'droppable for user
function makeWidgetDraggable() {
	console.log("make widget draggable function");
	$(".outerWidgetDiv").draggable();
}

//load jQuery to site
loadFile("js", "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js", callbackForLoadjQuery);
//load Strossle's script to site
loadFile("js", "http://widgets.sprinklecontent.com/v2/sprinkle.js", false, true);

//add click event to <body>
document.getElementsByTagName("body")[0].setAttribute("onmousedown", "whichElementClicked(event)");