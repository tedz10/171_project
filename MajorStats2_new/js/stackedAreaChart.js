

/*
 * StackedAreaChart - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the  
 */



StackedAreaChart = function(_parentElement, _data, _title){
	this.parentElement = _parentElement;
    this.data = _data;
    this.displayData = []; // see data wrangling
    this.title = _title;

    // DEBUG RAW DATA
    // console.log(this.data);

    this.initVis();
}



/*
 * Initialize visualization (static content, e.g. SVG area or axes)
 */

StackedAreaChart.prototype.initVis = function(){
	var vis = this;
	// console.log(vis);

    var trueWidth = $("#stacked-area-chart").width();
    console.log(trueWidth);

	vis.margin = { top: 40, right: 20, bottom: 60, left: 40 };

	vis.width = trueWidth - vis.margin.left - vis.margin.right;
    vis.height = 400 - vis.margin.top - vis.margin.bottom;


  // SVG drawing area
	vis.svg = d3.select("#" + vis.parentElement).append("svg")
	    .attr("width", vis.width + vis.margin.left + vis.margin.right)
	    .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
       .append("g")
	    .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

	// TO-DO: Overlay with path clipping

    vis.svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", vis.width)
        .attr("height", vis.height);

    // Scales and axes
    vis.x = d3.scaleTime()
        .range([0, vis.width])
        .domain(d3.extent(vis.data, function(d) { return d.year; }));

    vis.y = d3.scaleLinear()
        .range([vis.height, 0]);

    vis.xAxis = d3.axisBottom()
        .scale(vis.x);

    vis.yAxis = d3.axisLeft()
        .scale(vis.y);

    vis.svg.append("g")
        .attr("class", "x-axis axis")
        .attr("transform", "translate(0," + vis.height + ")");

    vis.svg.append("g")
        .attr("class", "y-axis axis");

    // console.log(colorScale.domain)
	// TO-DO: Initialize stack layout
    var dataCategories = colorScale.domain()
    // console.log(dataCategories)
    vis.stack = d3.stack()
        .keys(dataCategories);
    // console.log(vis.stack)

    // TO-DO: Rearrange data

    vis.stackedData = vis.stack(vis.data);
    // console.log(vis.stackedData);
    // TO-DO: Stacked area layout
    vis.area = d3.area()
        .curve(d3.curveCardinal)
        .x(function(d) { return vis.x(d.data.year); })
        .y0(function(d) { return vis.y(d[0]); })
        .y1(function(d) { return vis.y(d[1]); });


	// TO-DO: Tooltip placeholder

    vis.svg.append("text")
        .attr("x", 10)
        .attr("y", 20)
        .attr("class", "tip_id");

    // title
    vis.svg.append("text")
        .attr("x", vis.width/2)
        .attr("y", 0)
        .text(vis.title)
        .attr("class", "area-title")
        .attr("text-anchor", "middle");


	// TO-DO: (Filter, aggregate, modify data)
    vis.wrangleData();
}



/*
 * Data wrangling
 */

StackedAreaChart.prototype.wrangleData = function(){
	var vis = this;

    vis.displayData = vis.stackedData;

	// Update the visualization
    vis.updateVis();
};



/*
 * The drawing function - should use the D3 update sequence (enter, update, exit)
 * Function parameters only needed if different kinds of updates are needed
 */

StackedAreaChart.prototype.updateVis = function(){
	var vis = this;

	// Update domain
	// Get the maximum of the multi-dimensional array or in other words, get the highest peak of the uppermost layer
	vis.y.domain([0, d3.max(vis.displayData, function(d) {
			return d3.max(d, function(e) {
				// return e[1];
                return 600;
			});
		})
	]);

    var dataCategories = colorScale.domain();

// Draw the layers
    var categories = vis.svg.selectAll(".area")
        .data(vis.displayData)

    categories.enter().append("path")
        .attr("class", "area")
        .merge(categories)
        .style("fill", function(d,i) {
            return colorScale(dataCategories[i]);
        })
        .attr("d", function(d) {
            console.log(d)
            return vis.area(d);
        })
        .on("mouseover", function(d){
            // console.log(d)
            if (d.key === "xp") {
                vis.svg.selectAll(".tip_id")
                    .text("Extra points");
            } else if (d.key === "touchdowns") {
                vis.svg.selectAll(".tip_id")
                    .text("Touchdowns");
            }
            else if (d.key === "safety") {
                vis.svg.selectAll(".tip_id")
                    .text("Safety");
            } else if (d.key === "fieldgoals") {
                vis.svg.selectAll(".tip_id")
                    .text("Field Goals");
            }

            // vis.svg.selectAll(".tip_id")
            //     .text(d.key);
        });


    // TO-DO: Update tooltip text

	categories.exit().remove();


	// Call axis functions with the new domain 
	vis.svg.select(".x-axis").call(vis.xAxis);
    vis.svg.select(".y-axis").call(vis.yAxis);
}



