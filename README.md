# d3-twitter-geo-stream

The **D3 Twitter Geo Stream** is a real-time [D3](http://d3js.org "Visit the D3 website") visualization of geocoded data derived from tweets retrieved from the [Twitter streaming API](https://dev.twitter.com/streaming/overview "Learn more about the Streaming API at Twitter").

The number of geocoded tweets authored in each country is visualized as bar chart, which animates the country count data as it is updated and resorted.

Each geocoded tweet is visualized as a point of longitude and latitude on the map. As each new tweet is authored, it's location is visualized as set of animated concentric circles that increase in radius and decrease in opacity over time. When the concentric circles have disappeared, the location is marked with a color-coded dot that matches the color of the country in the bar chart.

Watch the [D3 Twitter Geo Stream](https://www.youtube.com/watch?v=WDuwB4dchN8) video on YouTube.

<img src="http://usabilityetc.github.io/d3-twitter-geo-stream/d3-twitter-geo-stream.png" alt="D3 Twitter Geo Stream" width="100%">

## Running

The D3 Twitter Geo Stream is an HTML page that should be served from an HTTP server. Two easy to use web servers are Python's built in HTTP server and the Node.js [http-server](https://www.npmjs.com/package/http-server "View the http-server page on NPM") module.

To run the Python web server, change to the directory containing the `d3-twitter-geo-stream` repository and issue the following command:

```
python -m SimpleHTTPServer
```

Or, to run `http-server`, change to the directory containing the `d3-twitter-geo-stream` repository and issue the following command:

```
http-server -p 8000
```

If you don't have the `http-server` module installed, install it with the following command:

```
npm install http-server -g
```

The `-g` command-line option installs the http-server globally to make it available from any directory.

After running the HTTP server, visit the following URL in your web browser:

```
http://localhost:8000/
```

To visualize real-time geocoded data, you must also be running an instance of the Twitter Geo Server, which is described in the next section.

## The Geocoded Data Source

The D3 Twitter Geo Stream visualization connects to an instance of the [Twitter Geo Server](https://github.com/UsabilityEtc/twitter-geo-server-js) over a web socket. The port on which the Twitter Geo Server runs is configurable with a command-line parameter. This port is set in the D3 Twitter Geo Stream by the call to the `streamGeoDataOnPort` function in `index.html`. Here the Twitter Geo Server is running on port 5025:

```javascript
<body onload="streamGeoDataOnPort(5025)">
```
