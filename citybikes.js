function getDistanceFromLatLonInMetres(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d * 1000; // Distance in metres
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

function distanceBetweenLocAndStation(loc, station) {
  return getDistanceFromLatLonInMetres(
    loc.coords.latitude,
    loc.coords.longitude,
    station.y,
    station.x);
}

function compareDistances(a, b) {
  if (a.distance < b.distance) {
    return -1;
  }
  else if (a.distance > b.distance) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

function lookupLocation() {
  geoPosition.getCurrentPosition(ShowClosest, ShowClosestError);
}

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&nbsp;");
}

function ShowClosest(loc) {

  // Load stations from API
  $.ajax({
    url: "https://dev.hsl.fi/matka.hsl.fi/otp/routers/hsl/bike_rental",
    headers: {
      Accept : "application/json; charset=utf-8",
      "Content-Type": "application/json; charset=utf-8"
    },
    success : function(data) {

      // Find distance from here to each station
      $.each(data.stations, function(key, val) {
        val.distance = Math.round(distanceBetweenLocAndStation(loc, val));
      });

      // Sort by closest to here
      data.stations.sort(compareDistances);

      // Reset list
      $("#live-geolocation").html('Closest:');
      $("ul").empty();

      // Update list
      $.each(data.stations, function(key, val) {
        $('#metro-list').append(
          $('<li class="station">').append(
            // '<span class="dist">' + val.id + '</span>' +
            '&nbsp;' + val.name +
            ' <span class="dist">' +
            numberWithSpaces(val.distance) + '&nbsp;m' +
            '<br>bikes:&nbsp' + val.bikesAvailable +
            ' spaces:&nbsp' + val.spacesAvailable +
            '</span>'));
      });

    }});

}

function ShowClosestError() {
  $("#live-geolocation").html('Dunno closest.');
}

$(document).ready(function() {

  // Load stations from API
  $.ajax({
    url: "https://dev.hsl.fi/matka.hsl.fi/otp/routers/hsl/bike_rental",
    headers: {
      Accept : "application/json; charset=utf-8",
      "Content-Type": "application/json; charset=utf-8"
    },
    success : function(data) {

      // Show in list
      $.each(data.stations, function(key, val) {
        $('#metro-list').append(
          $('<li class="station">').append(val.name));
      });

      // Boot up the satellites
      if (geoPosition.init()) {
        $("#live-geolocation").html('Checking...');
        lookupLocation();
      } else {
        $("#live-geolocation").html('Dunno.');
      }

    } });

});
