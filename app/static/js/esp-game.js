

function get_vine(i){
    $.get('/get_vine/' + i, function( data ){ 
        $("iframe.vine-embed").attr("src", data);
        });
    /*
    $.ajax({
        url: '/get_vine/' + video_num,
        type: 'GET',
        success:function( result ){
            
            if(result['success']){
                vine_json = result;
                $("iframe.vine-embed")
                    .attr("src", vine_json['data']['records'][0]['videoLowURL']);
            }
        }
    });
    */
}


$( document ).ready(function() {
    console.log("page loaded");
    get_vine(0);
});
