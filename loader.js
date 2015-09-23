//Code for inserting this script in bookmarklet url
//javascript:(function(){var%20script=document.createElement('script');script.type='text/javascript';script.src='https://rawgit.com/Sus1221/widgetDemo/master/loader.js';document.getElementsByTagName('head')[0].appendChild(script);})();

console.log("Loader.js working!");

//Load javascript to the page
function loadScript(url, callback) {
	//"grab" the <head> in index.html
	var head = document.getElementsByTagName('head')[0];
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
}

//Callback after jquery load
var callbackForLoadjQuery = function() {
  console.log("callback for loading jquery!");
  $("body").prepend("<h1>Hellloo</h1>");
};
//Run to load jquery script to page
loadScript("https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js", callbackForLoadjQuery);


