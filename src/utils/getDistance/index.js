export const getDistance = (a, b) => {
  var radlat1 = (Math.PI * a.lat) / 180;
  var radlat2 = (Math.PI * b.lat) / 180;
  var theta = a.lng - b.lng;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;
  return Math.ceil(dist);
};
