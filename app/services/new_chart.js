const D3Node = require('d3-node');
const styleString = require('./css/style');

function line({
    data,
    selector: _selector = '#chart',
    container: _container = `
  <div id="container">
    <h2>Line Chart</h2>
    <div id="chart"></div>
  </div>
`,
} = {}){
    var colors = [
        'steelblue',
        'green',
        'red',
        'purple'
    ];
    console.log(styleString);
    const d3n = new D3Node({
        selector: _selector,
        styles: styleString,
        container: _container,
    });
     
    const d3 = d3n.d3;
    //************************************************************
    // Create Margins and Axis and hook our zoom function
    //************************************************************
    var margin = {top: 20, right: 30, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    var x = d3.scaleLinear()
        .domain([0, 12])
        .range([0, width]);
   
    var y = d3.scaleLinear()
        .domain([-1, 16])
        .range([height, 0]);
    
    var xAxis = d3.axisBottom(x)
        .tickSize(-height)
        .tickPadding(10)
        .tickFormat(d3.timeFormat("%H:%M %p"));	
    
    var yAxis = d3.axisLeft(y)
        .tickPadding(10)
        .tickSize(-width);
    
    // var zoom = d3.behavior.zoom()
    //     .x(x)
    //     .y(y)
    //     .scaleExtent([1, 10])
    //     .on("zoom", zoomed);	
      
    //************************************************************
    // Generate our SVG object
    //************************************************************	
    // var svg = d3.select("body").append("svg")
    // // .call(zoom)
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom)
    //     .append("g")
    //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   
    const svg = d3n.createSVG( width + margin.left + margin.right, height + margin.top + margin.bottom)        
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    const g = svg.append('g');

    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
   
    g.append("g")
        .attr("class", "y axis")
        .call(yAxis);
   
    g.append("g")
        .attr("class", "y axis")
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", (-margin.left) + 10)
        .attr("x", -height/2)
        .text('Axis Label');	
   
    g.append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);
    
    
    
    
    
    //************************************************************
    // Create D3 line object and draw data on our SVG object
    //************************************************************
    var line = d3.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });		
    
    line.curve(d3.curveCardinal);
  
    g.selectAll('.line')
        .data(data)
        .enter()
        .append("path")
        .attr("class", "line")
        .attr("clip-path", "url(#clip)")
        .attr('stroke', function(d,i){ 			
            return colors[i%colors.length];
        })
        .attr("d", line);		
    
    
    
    
    //************************************************************
    // Draw points on SVG object based on the data given
    //************************************************************
    var points = g.selectAll('.dots')
        .data(data)
        .enter()
        .append("g")
        .attr("class", "dots")
        .attr("clip-path", "url(#clip)");	
   
    points.selectAll('.dot')
        .data(function(d, index){ 		
            var a = [];
            d.forEach(function(point,i){
                a.push({'index': index, 'point': point});
            });		
            return a;
        })
        .enter()
        .append('circle')
        .attr('class','dot')
        .attr("r", 2.5)
        .attr('fill', function(d,i){ 	
            return colors[d.index%colors.length];
        })	
        .attr("transform", function(d) { 
            return "translate(" + x(d.point.x) + "," + y(d.point.y) + ")"; }
        );
    
    return d3n;
    
}

module.exports = line;