function distanceBetweenLocAndStation(loc, station) {
  return getDistanceFromLatLonInMetres(
    loc.coords.latitude,
    loc.coords.longitude,
    station.geometry.coordinates[1],
    station.geometry.coordinates[0]);
}

function ShowClosest(loc) {

  // Load stations from JSON
  $.getJSON(geoJson, function(data) {

    stations = data.features;

    // Find distance from here to each station
    $.each(data.features, function(key, val) {
      val.distance = Math.round(distanceBetweenLocAndStation(loc, val));
    });

    // Sort by closest to here
    data.features.sort(compareDistances);

    // Reset list
    $("#live-geolocation").html('Closest:');
    $("ul").empty();

    // Update list
    $.each(data.features, function(key, val) {
      $('#metro-list').append(
        $('<li class="station">').append(val.properties.name + ' <span class="dist">' + numberWithSpaces(val.distance) + '&nbsp;m</span>'));
    });

  });

}

function ShowClosestError() {
  $("#live-geolocation").html('Dunno closest.');
}

$(document).ready(function() {

  // Load stations from JSON
  $.getJSON(geoJson, function(data) {

    // Show in list
    $.each(data.features, function(key, val) {
      $('#metro-list').append(
        $('<li class="station">').append(val.properties.name));
    });

  });

  // Boot up the satellites
  if (geoPosition.init()) {
    $("#live-geolocation").html('Checking...');
    lookupLocation();
  } else {
    $("#live-geolocation").html('Dunno.');
  }
});
