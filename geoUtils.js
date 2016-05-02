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
