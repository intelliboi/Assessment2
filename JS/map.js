function myMap() {
    var mapOptions = {
        center: new google.maps.LatLng(51.5, -0.12),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }

    if(document.getElementById("map") != null){
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    }else{

        var map = new google.maps.Map(document.getElementById("map2"), mapOptions);
    }

}
