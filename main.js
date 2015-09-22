$(function() {
  $("#demoBox").hide();


  $("#enterUrlForm").submit(function(event){
    event.preventDefault();
    $("#demoBox").show();
    var url = $("#url").val();
    url = url.replace("watch?v=", "v/");
    console.log("form input:", url);
    /*$.ajax({
        url: "main.php",
        type: "post",
        data: {
          urlToGrab: url
        },
        success: function(result){
          //console.log("success result: ", result);
          $('#demoIframe').prop('srcdoc', result);
          $('#demoIframe').ready(function(){
            console.log("iframe ready!");
            $('#demoIframe').contents().find('body').prepend('<p>Hello!</p>');
          });
        },
        error: function(err){
          console.log("error", err);
        }
    });*/
    //http://www.whateverorigin.org/
    $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent(url) + '&callback=?', function(data){
      console.log("data recieved from whateverorigin");
      $('#demoIframe').prop('srcdoc', data.contents);
      $('#demoIframe').contents().find('body').prepend('<p>Hello!</p>');
    });
  });

  

});



