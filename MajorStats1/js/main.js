
// SVG drawing area


var margin = {top: 40, right: 40, bottom: 60, left: 60};

var width = 450 - margin.left - margin.right,
		height = 350 - margin.top - margin.bottom;

var svg = d3.select("#chart-area").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// initialize Scales and axes
var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var xAxis = d3.axisBottom()
    .scale(x)
    .ticks(10)
    .tickFormat(d3.timeFormat("%Y"));


var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(10);

svg.append("g")
    .attr("class","x axis")
    .attr("transform","translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class","y axis")
    // .attr("transform","translate(0,0)")
    .call(yAxis);
// Date parser

var formatDate = d3.timeFormat("%Y");
var parseDate = d3.timeParse("%Y");


// initialize graph path
var yType = "GOALS";
var lineGraph = d3.line()
    .x(function(d){ return x(d.YEAR)})
    .y(function(d){return y(d[yType])});

var lines=svg.append("path");
    // .data(data);

// Initialize data
loadData();

// FIFA world cup
var data;

//



// Load CSV file
function loadData() {
	d3.csv("data/MajorStats1", function(error, csv) {
	    console.log(csv)

		// csv.forEach(function(d){
		// 	// Convert string to 'date object'
		// 	d.YEAR = parseDate(d.YEAR);
		//
		// 	// Convert numeric values to 'numbers'
		// 	d.TEAMS = +d.TEAMS;
		// 	d.MATCHES = +d.MATCHES;
		// 	d.GOALS = +d.GOALS;
		// 	d.AVERAGE_GOALS = +d.AVERAGE_GOALS;
		// 	d.AVERAGE_ATTENDANCE = +d.AVERAGE_ATTENDANCE;
		// });

		// Store csv data in global variable
		data = csv;

		// Draw the visualization for the first time
		updateVisualization();
        updateVisualization();
	});
}


// Render visualization
function updateVisualization() {
    // console.log(data[0].YEAR);
    // get the year
    // var selectBox = document.getElementById("ranking-type");
    // yType = selectBox.options[selectBox.selectedIndex].value;

    // filter data for dates
    // var startYear = parseDate(document.getElementById("start").value);
    // var endYear = parseDate(document.getElementById("end").value);
    // console.log(startYear);
    // console.log(endYear);
    // data = data.filter(function(d){
    //     return (d.YEAR >= startYear && d.YEAR <=endYear);
    // });
    // console.log(data);


    // update both domains
    x.domain([
    	d3.min(data, function(d){return d.Year;}),
        d3.max(data, function(d){return d.Year;})
    ]);
    y.domain([
        0,
        d3.max(data, function(d) { return d.wins;  })
    ]);
    // xAxis = d3.axisBottom()
    //     .scale(x)
    //     .ticks(10);
    //
    // yAxis = d3.axisLeft()
    //     .scale(y)
    //     .ticks(10);
    //
    // // ;
    //
    //
    // // draw line
    // // var lineGraph = d3.line()
    // //     .x(function(d){ return x(d.YEAR)})
    // //     .y(function(d){return y(d[yType])});
    // //
    // // var lines=svg.selectAll("path")
    // //     .data(data);
    //
    // // update the line
    // lines
    //     .attr("class", "pathline")
    //     // .merge(lines)
    //     .attr("d", lineGraph(data));
    //
    // // lines.exit().remove();
    // // update the axes
    //  svg.selectAll(".y")
    //     .transition()
    //     .duration(800)
    //     .call(yAxis);
    // //
    // svg.selectAll(".x")
    //     .transition()
    //     .duration(800)
    //     .call(xAxis);
    //
    //
    // // create the circles to emphasize
    // var circle = svg.selectAll("circle")
    //     .data(data);
    //
    // circle.enter().append("circle")
    //     .attr("class", "circEmphasis").merge(circle)
    //     .transition()
    //     .attr("cx", function(d) { return x(d.YEAR); })
    //     .attr("cy", function(d) { return y(d[yType]); })
    //     .attr("r", "5")
    //     .duration(800)
    //     .attr("fill", "black");
    //
    // // create divs for the tooltip
    // var div = d3.select("body").append("div")
    //     .attr("class", "tooltip")
    //     .style("opacity", 0);
    //
    // // create mouse controls
    // circle.on("mouseover", function(d){
    //         div.transition()
    //             .duration(200)
    //             .style("opacity", 1);
    //         div	.html("Year: " + formatDate(d.YEAR) + "<br/>" + tooltipText(yType) + ": "  + d[yType])
    //             .style("left", (d3.event.pageX) + "px")
    //             .style("top", (d3.event.pageY -30) + "px");
    //     })
    //     .on("mouseout", function(d) {
    //     div.transition()
    //         .duration(100)
    //         .style("opacity", 0);
    //     });
    // circle.on("click", function(d){
    //     showEdition(d);
    // });
    // circle.exit().remove();

}

// Show details for a specific FIFA World Cup
function showEdition(d){
    document.getElementById("specific_name").innerHTML = d.EDITION;
    var winner = d.WINNER;
    var goals = d.GOALS;
    var avg_goals = d.AVERAGE_GOALS;
    var matches = d.MATCHES;
    var teams = d.TEAMS;
    var avg_atten = d.AVERAGE_ATTENDANCE;
    var stats = [winner, goals, avg_goals, matches, teams, avg_atten];
    for (var i = 0; i < stats.length; i++) {
        mytable.rows[i + 1].cells[1].innerHTML = stats[i];
    }
    console.log(d);
	
}


// create a function that makes the tooltip output visually appealing
function tooltipText(str){
    var caseFixed = str.substr(0,1) + str.substr(1).toLowerCase();
    var parts = caseFixed.split("_");
    console.log(parts);
    if (parts.length > 1){
        var results = "";
        for (var i = 0; i < parts.length; i++){
            results = results + " " + parts[i];
        }
        return results;
    }
    return parts;
}
