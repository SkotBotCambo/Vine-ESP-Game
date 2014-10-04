var vine_url = "https://api.vineapp.com/timelines/popular";
var video_num = 0; // current index of vine records
var vine_json; // all data for pulling vine video urls;
$( document ).ready(function() {
    console.log("page loaded");
    $.ajax({
        url: vine_url,
        type: 'GET',
        headers:
            
        success:function( result ){
            
            if(result['success']){
                vine_json = result;
                $("iframe.vine-embed").attr("src", vine_json['data']['records'][0]['videoLowURL']);
            }
        }
    });
});
