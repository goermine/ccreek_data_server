const D3Node = require('d3-node');
var styles = require('./css/style_multy');

function Linear(
    {
        data,
        selector: _selector = '#chart',
        container: _container = `
    <div id="container">
      <h2>Line Chart</h2>
      <div id="chart"></div>
    </div>
  `,
    } = {}

){

    const d3n = new D3Node({
        selector: _selector,
        svgStyles: styles,
        container: _container,
    });
    
    const d3 = d3n.d3;

    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 70, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    // gridlines in x axis function
    function make_x_gridlines() {		
        return d3.axisBottom(x);
        // .ticks(5)
    }

    // gridlines in y axis function
    function make_y_gridlines() {		
        return d3.axisLeft(y);
        // .ticks(5)
    }
    // Parse the date / time
    var parseDate = d3.timeParse("%b %Y");

    // Set the ranges
    var x = d3.scaleTime().range([0, width]);  
    var y = d3.scaleLinear().range([height, 0]);

    // Define the line
    var priceline = d3.line()	
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.price); });

    // Adds the svg canvas
    const svg = d3n.createSVG(width + margin.left + margin.right, 
        width + margin.left + margin.right)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
 
    const g = svg.append('g');
    // Get the data
    // data.forEach(function(d) {
    //     d.date = parseDate(d.date);
    //     d.price = +d.price;
    // });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.price; })]);

    // Nest the entries by symbol
    var dataNest = d3.nest()
        .key(function(d) {return d.symbol;})
        .entries(data);

        // set the colour scale
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var legendSpace = width/dataNest.length; // spacing for the legend

    // Loop through each symbol / key
    dataNest.forEach(function(d,i) { 

        g.append("path")
            .attr("class", "line")
            .style("stroke", function() { // Add the colours dynamically
                return d.color = color(d.key); })
            .attr("id", 'tag'+d.key.replace(/\s+/g, '')) // assign an ID
            .attr("d", priceline(d.values));

        // Add the Legend
        g.append("text")
            .attr("x", (legendSpace/2)+i*legendSpace)  // space legend
            .attr("y", height + (margin.bottom/2)+ 30)
            .attr("class", "legend")    // style the legend
            .style("fill", function() { // Add the colours dynamically
                return d.color = color(d.key); })
            .on("click", function(){
                // Determine if current line is visible 
                var active   = d.active ? false : true,
                    newOpacity = active ? 0 : 1; 
                    // Hide or show the elements based on the ID
                d3.select("#tag"+d.key.replace(/\s+/g, ''))
                    .transition().duration(100) 
                    .style("opacity", newOpacity); 
                // Update whether or not the elements are active
                d.active = active;
            })  
            .text(d.key); 

    });
    
    // add the X gridlines
    svg.append("g")			
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_gridlines()
            .tickSize(-height)
            .tickFormat("")
        );

    // add the Y gridlines
    svg.append("g")			
        .attr("class", "grid")
        .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat("")
        );  


    // Add the X Axis
    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%H:%M %p")));

    // text label for the x axis
    g.append("text")             
        .attr("transform",
            "translate(" + (width/2) + " ," + 
                       (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Hours");



    // Add the Y Axis
    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y));

    // text label for the y axis
    g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("m3");  

    return d3n;      
}

module.exports = Linear;