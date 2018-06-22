const D3Node = require('d3-node');

function line({
    data,
    selector: _selector = '#chart',
    container: _container = `
    <div id="container">
      <h2>Line Chart</h2>
      <div id="chart"></div>
    </div>
  `,
    style: _style = '',
    width: _width = 960,
    height: _height = 500,
    margin: _margin = { top: 20, right: 20, bottom: 60, left: 30 },
    lineWidth: _lineWidth = 1.5,
    lineColor: _lineColor = 'steelblue',
    isCurve: _isCurve = true,
    tickSize: _tickSize = 5,
    tickPadding: _tickPadding = 5,
} = {}) {
    const d3n = new D3Node({
        selector: _selector,
        svgStyles: _style,
        container: _container,
    });

    // var data2 = [ { key: new Date('2018-06-21T20:48:48.000Z'), value: 34 },
    //     { key: new Date('2018-06-21T20:25:48.000Z'), value: 0 },
    //     { key: new Date('2018-06-22T07:20:06.000Z'), value: 5 },
    //     { key: new Date('2018-06-22T00:43:21.000Z'), value: 99 } ];

    const d3 = d3n.d3;

    const width = _width - _margin.left - _margin.right;
    const height = _height - _margin.top - _margin.bottom;

    const xScale = d3.scaleLinear()
        .rangeRound([0, width]);
    const yScale = d3.scaleLinear()
        .rangeRound([height, 0]);
    const xAxis = d3.axisBottom(xScale)
        .tickSize(_tickSize)
        .tickFormat(d3.timeFormat("%H:%M %p"));
    const yAxis = d3.axisLeft(yScale)
        .tickSize(_tickSize)
        .tickPadding(_tickPadding);

    const lineChart = d3.line()
        .x(d => xScale(d.key))
        .y(d => yScale(d.value));

    if (_isCurve) lineChart.curve(d3.curveBasis);

    xScale.domain(d3.extent(data, d => d.key));
    yScale.domain(d3.extent(data, d => d.value));


    const svg = d3n.createSVG(_width, _height)
        .append('g')
        .attr('transform', `translate(${_margin.left}, ${_margin.top})`);
        
    const g = svg.append('g');

    g.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

    g.append('g').call(yAxis);

    g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', _lineColor)
        .attr('stroke-width', _lineWidth)
        .attr('d', lineChart);
    
    // g.append('path')
    //     .datum(data2)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'green')
    //     .attr('stroke-width', _lineWidth)
    //     .attr('d', lineChart);

    return d3n;
}

module.exports = line;
