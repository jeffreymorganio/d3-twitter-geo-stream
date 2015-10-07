function countryCountBarChart(barChartSelector, colors) {
  var countryCount = {};
  var width = 1150;
  var height = 250;
  var transitionDuration = 500;
  var exitTransitionDuration = 500;
  var xScale, yScale;
  var svg;

  createBarChart(barChartSelector);

  function createBarChart(barChartSelector) {
    createChart(barChartSelector);
    createScale();
    startBarChartUpdateTimer();
  }

  function createChart() {
    svg = d3.select(barChartSelector)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
  }

  function createScale() {
    xScale = d3.scale.ordinal()
      .rangeRoundBands([0, width], 0.05);
    yScale = d3.scale.linear()
      .range([0, height]);
  }

  function startBarChartUpdateTimer() {
    setInterval(updateBarChart, 1000);
  }

  function updateBarChart() {
    var dataSet = createBarChartDataSet();
    dataSet = pickTop20(dataSet);
    updateScales(dataSet);
    updateBars(dataSet);
    updateBarLabels(dataSet);
  }

  function pickTop20(dataSet) {
    dataSet.sort(sortDataSet);
    return dataSet.slice(0, 20);
  }

  function sortDataSet(a, b) {
    if (a.count < b.count) {
      return 1;
    }
    if (a.count > b.count) {
      return -1;
    }
    return 0;
  }

  function createBarChartDataSet() {
    var dataSet = [];
    Object.keys(countryCount).forEach(function(countryCode) {
      dataSet.push({
        countryCode: countryCode,
        count: countryCount[countryCode]
      });
    });
    return dataSet;
  }

  function updateScales(dataSet) {
    xScale.domain(d3.range(dataSet.length));
    yScale.domain([0, d3.max(dataSet, function(d) { return d.count; })]);
  }

  function updateBars(dataSet) {
    // select
    var bars = svg.selectAll('rect')
      .data(dataSet, key);

    // enter
    bars.enter()
      .append('rect')
      // .classed('bar', true)
      .attr('x', width) // enter stage right
      .attr('y', height) // rise from zero height
      .attr('width', xScale.rangeBand())
      .attr('height', barHeight)
      .attr('fill', function(d) {
        var c = colors(d.countryCode);
        return d3.rgb(c).brighter(0.1);
      })
      .attr('stroke', function(d) {
        var c = colors(d.countryCode);
        return d3.rgb(c).darker(0.5);
      });

    // update
    bars.transition()
      .duration(transitionDuration)
      .attr('x', function(d, i) {
        return xScale(i);
      })
      .attr('y', function(d) {
        return height - barHeight(d);
      })
      .attr('width', xScale.rangeBand())
      .attr('height', barHeight);

    // exit
    bars.exit()
      .transition()
      .duration(exitTransitionDuration)
      .attr('opacity', 0)
      .remove();
  }

  function barHeight(d) {
    return Math.max(minimumBarHeight(), yScale(d.count));
  }

  function minimumBarHeight() {
    return 20;
  }

  function updateBarLabels(dataSet) {
    // select
    var labels = svg.selectAll('text')
      .data(dataSet, key);

    // enter
    labels.enter()
      .append('text')
      .text(function(d) {
        return d.countryCode;
      })
      .attr('x', function(d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
      })
      .attr('y', function(d) {
        return height - barHeight(d) + 14;
      })
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('fill', 'white');

    // update
    labels.transition()
      .duration(transitionDuration)
      .attr('x', function(d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
      })
      .attr('y', function(d) {
        return height - barHeight(d) + 14;
      });

    // exit
    labels.exit()
      .transition()
      .duration(exitTransitionDuration)
      .attr('opacity', 0)
      .remove();
  }

  var key = function(d) {
    return d.countryCode;
  };

  function addGeoData(data) {
    updateCountryCount(data.countryCode);
  }

  function updateCountryCount(countryCode) {
    var count = 0;
    if (countryCount[countryCode]) {
      count = countryCount[countryCode];
    }
    count += 1;
    countryCount[countryCode] = count;
  }

  return {
    addGeoData: addGeoData
  };
}
