function distanceBetweenLocAndStation(loc, station) {
  return getDistanceFromLatLonInMetres(
    loc.coords.latitude,
    loc.coords.longitude,
    station.y,
    station.x);
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

        var totalSlots = val.bikesAvailable + val.spacesAvailable;
        var slotDivStart = '<div class="city-bike-column';
        var slotDivEnd = '"></div>';
        var slots = '';

        for (i = 0; i < val.bikesAvailable; i++) {
         slots += slotDivStart + ' available' + slotDivEnd;
        }
        for (i = 0; i < val.spacesAvailable; i++) {
         slots += slotDivStart + slotDivEnd;
        }

        $('#metro-list').append(
          $('<li class="station">').append(
            // '<span class="dist">' + val.id + '</span>' +
            '&nbsp;' + val.name +
            ' <span class="dist">' +
            numberWithSpaces(val.distance) + '&nbsp;m' +
            ' ' + val.bikesAvailable + '/' + totalSlots + '</span>' +
            '<div class="slots">' + slots + '</div>'
            ));
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
