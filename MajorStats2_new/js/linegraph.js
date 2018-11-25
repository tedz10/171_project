LineChart= function(_parentElement, _data){
    this.parentElement = _parentElement;
    this.data = _data;
    this.displayData = [];
    this.lions_data = [];
    this.pats_data = [];
    this.browns_data = [];


    this.loadData();
}

LineChart.prototype.loadData = function() {
        // console.log(csv)
    var vis = this
        // vis.data.forEach(function(d){
        //     // Convert string to 'date object'
        //     d.DefensivePassingYards = +d.DefensivePassingYards;
        //     d.DefensiveRushingYards = +d.DefensiveRushingYards;
        //     d.OffensivePassingYards = +d.OffensivePassingYards;
        //     d.OffensiveRushingYards = +d.OffensiveRushingYards;
        //     d.Interceptions = +d.Interceptions;
        //     d.Picks = +d.Picks;
        //     d.Year = parseDate(d.Year);
        //     d.OffensiveTouchdowns = +d.OffensiveTouchdowns;
        //     d.TouchdownsScoredAgainst = +d.TouchdownsScoredAgainst;
        //     d.wins = +d.wins;
        //
        //     // Convert numeric values to 'numbers'
        // });

        // Store csv data in global variable
        vis.pats_data = vis.data.filter(function(d){
            return (d.Team === "NE")
        })
        vis.lions_data = vis.data.filter(function(d){
            return (d.Team === "DET")
        })
        vis.browns_data = vis.data.filter(function(d){
            return (d.Team === "CLE")
        })
        // console.log(data)

        // Draw the visualization for the first time
    vis.initVis();
};


LineChart.prototype.initVis = function() {
    var vis = this;
    vis.margin = {top: 40, right: 40, bottom: 60, left: 60};

    vis.width = 450 - vis.margin.left - vis.margin.right;
    vis.height = 350 - vis.margin.top - vis.margin.bottom;
    // * TO-DO *
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    vis.x = d3.scaleTime()
        .range([0, vis.width]);


    vis.y = d3.scaleLinear()
        .range([vis.height, 0]);

    vis.xAxis = d3.axisBottom()
        .scale(vis.x)
        .ticks(10)
        .tickFormat(d3.timeFormat("%Y"));


    vis.yAxis = d3.axisLeft()
        .scale(vis.y)
        .ticks(10);

    vis.svg.append("g")
        .attr("class","x axis")
        .attr("transform","translate(0," + vis.height + ")")
        .call(vis.xAxis);

    vis.svg.append("g")
        .attr("class","y axis")
        // .attr("transform","translate(0,0)")
        .call(vis.yAxis);

    vis.yType = "wins";
    vis.lineGraph = d3.line()
        .x(function(d){ return vis.x(d.Year)})
        .y(function(d){return vis.y(d[vis.yType])});

    vis.lines_pats=vis.svg.append("path");
    vis.lines_lions=vis.svg.append("path");
    vis.lines_browns=vis.svg.append("path");


    vis.x.domain([
        d3.min(vis.data, function(d){return (d.Year);}),
        d3.max(vis.data, function(d){return (d.Year);})
    ]);
    vis.y.domain([
        0,
        16
    ]);

    vis.xAxis = d3.axisBottom()
        .scale(vis.x)
        .ticks(10);
    //
    vis.yAxis = d3.axisLeft()
        .scale(vis.y)
        .ticks(10);
    //
    //
    //
    // // draw line
    // var lineGraph = d3.line()
    //     .x(function(d){ return x(d.Year)})
    //     .y(function(d){return y(d[yType]);
    // //
    // var lines=svg.selectAll("path")
    //     .data(data);
    //
    // // update the line

    vis.lines_pats
        .attr("class", "pathline pats_line")
        // .merge(lines)
        .attr("d", vis.lineGraph(vis.pats_data))
        .attr("stroke", "red");

    vis.lines_lions
        .attr("class", "pathline lions_line")
        // .merge(lines)
        .attr("d", vis.lineGraph(vis.lions_data))
    // .attr("stroke", "red");

    vis.lines_browns
        .attr("class", "pathline browns_line")
        // .merge(lines)
        .attr("d", vis.lineGraph(vis.browns_data))
    // .attr("stroke", "red");

    // lines.exit().remove();
    // // update the axes
    vis.svg.selectAll(".y")
        .transition()
        .duration(800)
        .call(vis.yAxis);
    // //
    vis.svg.selectAll(".x")
        .transition()
        .duration(800)
        .call(vis.xAxis);
    //
    //
    // // create the circles to emphasize
    var circle = vis.svg.selectAll("circle")
        .data(vis.data);

    circle.enter().append("circle")
        .attr("class", "circEmphasis circPats")
        .merge(circle)
        .on("click", function(d){
            console.log("what");
            return (updateVis(d));
            // updateVis(d);

            // circle.exit().remove()
        })
        // .transition()
        .attr("cx", function(d) { return vis.x(d.Year); })
        .attr("cy", function(d) { return vis.y(d.wins); })
        .attr("r", "5")
        .style("pointer-events","visible")
        // .duration(800)
        .attr("fill", "black");

    circle.transition()
        .duration(800);

    console.log("pre-click");

    // circle.on("click", function(){
    //     console.log("what");
    //     // return (updateVis(d));
    //     // updateVis(d);
    //
    //     // circle.exit().remove()
    // });

    console.log("post-click");

}
// function updateVis(d){
//     console.log("what")
//     return console.log("What")
//     var curYear = d.Year;
//
// }