function streamGeoDataOnPort(port) {
  var colors = d3.scale.category20();
  var map = worldMap('#map', colors);
  var barChart = countryCountBarChart('#bar-chart', colors);

  startListeningForGeoData(port);

  function startListeningForGeoData(port) {
    var webSocket = new WebSocket(hostURL(port));
    webSocket.onmessage = function(event) {
      var geoData = JSON.parse(event.data);
      addGeoData(geoData);
    };
  }

  function hostURL(port) {
    return 'ws://' + location.hostname + ':' + port;
  }

  function addGeoData(geoData) {
    map.addGeoData(geoData);
    barChart.addGeoData(geoData);
  }
}
