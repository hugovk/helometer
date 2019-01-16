async function ShowClosest(loc) {

  const URL = 'https://api.kirjastot.fi/v4/library?status=open&geo.pos=' + loc.coords.latitude + ',' + loc.coords.longitude;
  console.log(URL)

  const response = await fetch(URL);
  const json = await response.json();

  libraries = json.items;

  // Reset list
  $("#live-geolocation").html('Closest open:');
  $("ul").empty();

  // Update list
  $.each(libraries, function (key, val) {
    console.log(val)
    $('#metro-list').append(
      $('<li class="station">').append('<a href="https://www.google.fi/search?q=' + val.name + '">' + val.name + '</a> <span class="dist">' + numberWithSpaces(val.distance * 1000) + '&nbsp;m</span>'));
  });

}

function ShowClosestError() {
  $("#live-geolocation").html('Dunno closest.');
}

$(document).ready(function () {

  // Boot up the satellites
  if (geoPosition.init()) {
    $("#live-geolocation").html('Checking...');
    lookupLocation();
  } else {
    $("#live-geolocation").html('Dunno.');
  }
});
