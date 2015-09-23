(function() {
 console.log("ITs woorking");
});

//Att utgå ifrån -denna funkar bra som bookmarklet
javascript:(function(){document.getElementsByTagName('body')[0].style.setProperty('font-family', 'serif', 'important');})();


//Code for inserting in bookmarklet adress
//Denna gick in som adress - kolla bara sökvägen - kanske ändra till localhost medans jag utvecklar??
javascript:(function(){var%20script=document.createElement('script');script.type='text/javascript';script.src='http://www.github.com/Sus1221/bookmarklet/loader.js';document.getElementsByTagName('head')[0].appendChild(script);})();