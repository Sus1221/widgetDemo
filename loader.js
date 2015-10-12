//Insert code on row below in bookmark url-field in browser to run this script on current url
//javascript:(function(){var%20script=document.createElement('script');script.type='text/javascript';script.src='https://rawgit.com/Sus1221/widgetDemo/master/loader.js';document.getElementsByTagName('head')[0].appendChild(script);})();

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

//Stores measurements from selectable.stop function for widget-div
var startX = 0;
var endX = 0;
var startY = 0;
var endY = 0;
var clickedElement;

//Callback after jqueryUI load
var callbackForLoadjQueryUI = function() {
	//Add controlBox for sortable()
	$("body").prepend("<div style='min-width:200px;min-height:100px;background-color:white;border:1px solid black;padding:5px;z-index: 200000;position:fixed;top:0' id='choiceBox'>" +
												"<h4>Check if you want to drag'n'drop your div</h4>" +
												"<input type='checkbox' name='drag-n-drop-cb' id='drag-n-drop-cb'><br>" +
											"</div>");
};

//onmousedown for body
function whichElementClicked(event){
	//clickedElement = clicked html element
	clickedElement = event.target;
	console.log("clickedElement", clickedElement);
	//If X (remove) on widget is clicked
	if(clickedElement.className.indexOf("XtoRemoveStrossleWidgetDiv") > -1){
		console.log("It's the right class name, it is X");
		//remove widget div
		$(clickedElement).parent().remove();
		console.log("Element removed");
	}
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
		var divToAdd = "<div style='position:relative; border:1px solid black; outline:1px solid darkgray; background:white; width:" + divWidth + "px;height:"+ divHeight + "px;margin:5px;z-index:200000000'><h3 class='XtoRemoveStrossleWidgetDiv' style='position:absolute;top:5px;right:5px;cursor:pointer;font-size:30px;color:black;'>&#10006;</h3></div>";
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

//Makes <body> and some of its descendants sortable
function makeBodyContentSortable() {
	$("body").sortable({
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

function makeBodyContentUnsortable(){
	//make everything made sortable in makeBodyContentSortable UNsortable
	$("body").sortable("disable");
	$("body > *").sortable("disable");
	$("body > * > *").sortable("disable");
}

/*console.log("clicked element value", clickedElement.value);
console.log("$('#drag-n-drop-cb').val() ", $("#drag-n-drop-cb").val());
console.log("is checked?!", $("#drag-n-drop-cb").is(':checked'));*/
//If checkbox is clicked
$('#drag-n-drop-cb').bind('change', function(){
	if($("#drag-n-drop-cb").is(':checked')){
		console.log("cb is checked!");
			//makeBodyContentSortable();		
	}else{
		console.log("cb is not checked");
		//makeBodyContentUnsortable();
	}
});

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