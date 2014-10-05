var video_num = 0; // keeps track of number of attempts

function get_vine(i){
    $.get('/get_vine/' + i, function( data ){
        console.log("url recieved"); 
        $("video#vine_vid").attr("src", data);
      });
}


$( document ).ready(function() {
    console.log("page loaded");
    get_vine(video_num);

    $( "button#timer" ).click(function () {
        console.log("player ready");
        var t = document.getElementById('timer');
        var now = new Date();
        deadline = new Date(now.getTime() + 3*1000);
        t.innerHTML = countdown(deadline).toString();
        setInterval(function(){
            t.innerHTML = countdown(deadline).toString();
        }, 1000);
    });
 
});

