var video_num = 0; // keeps track of number of attempts
window.streak = 0;
window.game_on = false;
window.streak_min = 2;
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
        if (!window.game_on){
            $( "#you_choice" ).html("");
            $( "#other_choice" ).html("");
        }
        console.log("player ready");
        var t = document.getElementById('timer');
        var counter = 0;
        var r = ['Ready','Set','Go'];
        var timer = setInterval(function(){ startTime(); }, 1000);
        var game_length = 30; // in seconds
                
        function startTime(){
            if (counter == 0){
                window.game_on = true;
            }
            
            if (!window.game_on){
                clearInterval(timer);
                counter = 0;
                $( "#vine_vid" )[0].pause();
            } else if (counter < r.length){
                t.innerHTML = r[counter];
                counter++;
            } else if (counter == r.length){
                $( "#vine_vid" )[0].play();
                counter++;
            } else if (counter < game_length + r.length){
                t.innerHTML = (game_length + r.length) - counter;
                counter++;
            } else {
                $( "#vine_vid" )[0].pause();
                t.innerHTML = "Time Out!";
                $( "#win_lose" ).html("You Ran Out Of Time!");
                counter = 0;
                clearInterval(timer);
            }
        }
    });

    $( "button.response" ).click(function() {
        if (window.game_on){
            console.log("responded : " + this.value);
            window.game_on = false;
           if (streak < window.streak_min-1){
                $( "#win_lose" ).html( "You win!" );
                $( "#you_choice" ).html( this.value );
                $( "#other_choice" ).html( this.value );
                video_num++;
                get_vine(video_num);
                $( "button#timer" ).html("Click When Ready");
                window.streak++;
                $( "#streak" ).html("Current Streak: " + window.streak);
           } else {
               $( "#win_lose" ).html( "You Lost!" );
               
               $( "you_choice" ).html( this.value );
               $( "other_choice" ).html( ("Funny" == this.value) ? "Not Funny" : "Funny");
               $( "#summary" ).html( "You can now redeem yourself by entering some words that defend your decision." +
                                     " This data will be used to help classify a vine as funny or not funny based " +
                                     "on words used in the comments or description." );

               var you = document.getElementsByClassName("left")[0];
               var form = document.getElementById("defense");
               
               var title = document.createElement("p");
               title.innerHTML = "Type some words below to defend your choice";
               form.appendChild(title);
               
               for (var i = 0; i < 5; i++){
                    var word_box = document.createElement("input");
                    word_box.setAttribute("type","text");
                    form.appendChild(word_box);
               }

               var done = document.createElement("button");
               done.setAttribute("id","done");
               form.appendChild(done);
               you.appendChild(form);

               $( "#done" ).html("Done")
                           .click(function() {
                    
                    $( "#defense" ).empty();

                    $( "#summary" ).html("If your partner agrees that these are legit, " +
                                         "then you can continue the streak!");
                    
                    $( "#other_choice" ).html("Legit!");
                    window.streak++;
                    $( "#streak" ).html("Current Streak: " + window.streak);
               
               });
           }
           if (streak == 1){
                $( "#summary" ).html("Awesome! Try for a 5 streak!");
           }
        }
    });
 
});


