var curYear = parseDate("2017");


BarChart = function(_parentElement, _data, _config){
    this.parentElement = _parentElement;
    this.data = _data;
    this.config = _config;
    this.displayData = _data;
    this.lions_data = [];
    this.pats_data = [];
    this.browns_data = [];

    this.loadData();
}


BarChart.prototype.loadData = function() {
    // console.log(csv)
    var vis = this;
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
        return (d.Team ==="NE")
    });
    vis.lions_data = vis.data.filter(function(d){
        return (d.Team ==="DET")
    });
    vis.browns_data = vis.data.filter(function(d){
        return (d.Team ==="CLE")
    });
    // console.log(data)

    // Draw the visualization for the first time
    vis.initVis();
};

BarChart.prototype.initVis = function() {
    var vis = this
    vis.margin = {top: 30, right: 30, bottom: 30, left: 30};
    vis.width = 300 - vis.margin.left - vis.margin.right;
    vis.height = 150 - vis.margin.top - vis.margin.bottom;

    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    vis.y = d3.scaleBand()
        .range([vis.height, 0])
        .paddingInner(.1);

    vis.yAxis = d3.axisLeft()
        .scale(vis.y);


    vis.x = d3.scaleLinear()
        .range([0, vis.width - vis.margin.right/2]);

    vis.svg.append("text")
        .attr("x", 0)
        .attr("y", -10)
        .attr("class", "labels")
        .text(vis.config.title);
    vis.svg.append("g")
        .attr("class","y-axis axis")
        .attr("transform","translate(20,0)")

    vis.wrangleData();
};

BarChart.prototype.wrangleData = function() {
    var vis = this;

    // parse for config
    // parse for year
    vis.displayData = vis.data.filter(function(d){
        return formatDate(d.Year) === formatDate(curYear);
    })
    vis.updateVis()


}

BarChart.prototype.updateVis = function(){
    var vis = this;

    // (1) Update domains
    // (2) Draw rectangles
    // (3) Draw labels

    // sort the data based on value

// console.log(vis.data.title);
    // * TO-DO *
    vis.y.domain(vis.displayData.map(function(d){return d.Team}));
    vis.x.domain([
        0,
        d3.max(vis.displayData, function(d){ return d[vis.config.key]})
        // vis.width
    ]);
    vis.yAxis = d3.axisLeft()
        .scale(vis.y)
    // .ticks(4);


    // console.log(vis.y)
    //draw rectangles
    var rect = vis.svg.selectAll("rect")
        .data(vis.displayData);
    rect.enter().append("rect")
        .attr("class", "bars")
        .merge(rect)
        .transition()
        .duration(300)
        .attr("x", 20)
        .attr("y", function(d) {
            return (vis.y(d.Team));
        })
        // .attr("height", function(d,i){ return 10})
        .attr("height", function(d,i){
            return vis.y.bandwidth()
        })
        // .attr("width", 30)
        // fix width
        .attr("width", function(d){
            return vis.x(d[vis.config.key])
        })
        .attr("fill", "steelblue");


    rect.exit().remove();
    //
    var text = vis.svg.selectAll("._text")
        .data(vis.displayData);

    text.enter().append("text")
        .attr("class", "_text")
        .merge(text)
        .transition()
        .duration(800)
        .attr("x", function(d){
            return vis.x(d[vis.config.key]) - 20;
            // return vis.width;
        })
        .attr("y", function(d){
            return (vis.y(d.Team) + vis.y.bandwidth()/2 + 5)
        })
        .text(function(d){
            return d[vis.config.key];
        })
        .attr("fill", "white");


    text.exit().remove();



    // Update the y-axis
    vis.svg.select(".y-axis").call(vis.yAxis)
        .transition()
        .duration(300);
};