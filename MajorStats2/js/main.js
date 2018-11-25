var barcharts1 = [];
var barcharts2 = [];
var barcharts3 = [];
var barcharts4 = [];
var linechart;
var bar;

var formatDate = d3.timeFormat("%Y");
var parseDate = d3.timeParse("%Y");

var curYear = parseDate("2017");

var configs1 = [{key: "OffensivePassingYards", title: "Offensive Passing Yards"},
    {key: "DefensivePassingYards", title: "Passing Yards Let Up"}];
var configs2 = [{key: "OffensiveRushingYards", title: "Offensive Rushing Yards"},
    {key: "DefensiveRushingYards", title: "Rushing Yards Let Up"}];
var configs3 = [{key: "OffensiveTouchdowns", title: "Touchdowns Scored"},
    {key: "TouchdownsScoredAgainst", title: "Touchdowns Let Up"}];
// var configs3 = ["OffensiveTouchdowns","TouchdownsScoredAgainst"];
var configs4 = [{key: "Interceptions", title: "Interceptions Thrown"},
    {key: "Picks", title: "Interceptions"}];
// var configs4 = ["Interceptions","Picks"];

var colorScale = d3.scaleOrdinal(d3.schemeCategory20);



d3.queue()
    .defer(d3.csv, "data/MajorStats1.csv")
    .defer(d3.csv, "data/rushing.csv")
    .defer(d3.csv, "data/strongandpoorlyperformingteams.csv")
    .defer(d3.json, "data/pats.json")
    .defer(d3.json,"data/nfl_ppg.json")
    .await(loadData);

loadData();

function loadData(error, data, rushingData, turnOverData, data1, data2, treeData) {


// 	    // console.log(csv)


    data.forEach(function(d){
        // Convert string to 'date object'
        d.DefensivePassingYards = +d.DefensivePassingYards;
        d.DefensiveRushingYards = +d.DefensiveRushingYards;
        d.OffensivePassingYards = +d.OffensivePassingYards;
        d.OffensiveRushingYards = +d.OffensiveRushingYards;
        d.Interceptions = +d.Interceptions;
        d.Picks = +d.Picks;
        d.Year = parseDate(d.Year);
        d.OffensiveTouchdowns = +d.OffensiveTouchdowns;
        d.TouchdownsScoredAgainst = +d.TouchdownsScoredAgainst;
        d.wins = +d.wins;

        // Convert numeric values to 'numbers'
    });

    //**********STACKED AREA CHART ********//

    pats_allData = data1;
    console.log(pats_allData)


    pats_allData.forEach(function(d){
        // d.Expenditures = parseFloat(d.Expenditures) * 1.481105 / 100;
        d.year = parseDate(d.year.toString());
    });
    console.log(pats_allData);
    // Update color scale (all column headers except "Year")
    // We will use the color scale later for the stacked area chart
    colorScale.domain(d3.keys(pats_allData[0]).filter(function(d){ return (d !== "year"); }))
    // console.log(colorScale.domain(d3.keys(allData[0]).filter(function(d){ return d != "year" && d != "team"; })))

    nfl_allData = data2;


    nfl_allData.forEach(function(d){
        // d.Expenditures = parseFloat(d.Expenditures) * 1.481105 / 100;
        d.year = parseDate(d.year.toString());
    });

    createVis();



    //******RUSHING BAR CHART******//

    //Create rushing bar chart
    rushingBar = new Rushing("info4", rushingData);


    //******Turnover  CHART******//

    //Create rushing bar chart
    turnoverBar = new Turnover("info6", turnOverData);
    console.log("turnoverbar end");



}

// this is for the stacked area chart
function createVis() {

    // TO-DO: Instantiate visualization objects here
    areachart = new StackedAreaChart("stacked-area-chart", pats_allData, "Patriots: Points per Season");
    console.log(pats_allData);
    areachart2 = new StackedAreaChart("stacked-area-chart2", nfl_allData, "Entire NFL: Average Points per Season");
    // timeline = new Timeline("timeline", allData.years);

}





// this is for opponent yards

// Load CSV file
d3.csv("data/OpponentOffensiveYards.csv", function(data){

    // Convert numeric values to numbers
    data.forEach(function(d) {
        d.Total_Wins = +d.Total_Wins;
        d.Offensive_Yards_Allowed = +d.Offensive_Yards_Allowed;
        d.Year = +d.Year;
    });

    // Sort countries descending by population
    data.sort(function(a, b) {
        return b.Total_Wins - a.Total_Wins;
    });

    // Append a new SVG area
    var svg = d3.select("#chart-area-yards").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // X scale
    var incomeScale = d3.scaleLog()
        .domain([d3.min(data, function(d){ return d.Offensive_Yards_Allowed }) - 100, d3.max(data, function(d){ return d.Offensive_Yards_Allowed })])
        .range([0, width]);

    // Y scale
    var lifeExpectancyScale = d3.scaleLinear()
        .domain([d3.min(data, function(d){ return d.Total_Wins }) - 5, d3.max(data, function(d){ return d.Total_Wins }) + 5])
        .range([height, 0]);

    // Radius Scale
    var populationScale = d3.scaleLinear()
        .domain(d3.extent(data, function(d){ return d.Total_Wins }))
        .range([4, 30]);

    // Region Scale (ordinal)
    var regionScale = d3.scaleOrdinal(d3.schemeCategory10);


    // define the line
    var valueline = d3.line()
        .x(function(d) { return x(d.Offensive_Yards_Allowed); })
        .y(function(d) { return y(d.Total_Wins); });

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);





    // Map data to visual elements (SVG circles)
    var circles = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "country-circle")
        .attr("cx", function(d){ return incomeScale(d.Offensive_Yards_Allowed); })
        .attr("cy", function(d){ return lifeExpectancyScale(d.Total_Wins); })
        .attr("r", function(d){ return populationScale(d.Total_Wins); })

        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html("Team: " + d.Team1 + "<br/>" + "Yards allowed: " + d.Offensive_Yards_Allowed + "<br/>" + "Wins: " + d.Total_Wins)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .attr("stroke", "#333")
        .attr("opacity", 0.7)
        .attr("fill", function(d){
            if(d.Playoff_Made === "TRUE")
                return "LightGreen";
            else
                return "LightPink";
        });

    //.attr("fill", function(d){ return regionScale(d.Team1); });


    // //  APPEND TEXT LABELS
    // var labels = svg.selectAll("text")
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .attr("class", "city-label")
    // 	.text(function(d){ return d.Team1; })
    //     .attr("x", function(d){ return d.Offensive_Yards_Allowed; })
    //     .attr("y", function(d){ return d.Total_Wins; });



    // Add Text Labels
    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function(d) {
            // console.log("hi");
            // console.log(d);
            // return d[0] + "," + d[1];
            return d.Team1
        })
        .attr("x", function(d){ return d.Offensive_Yards_Allowed; })
        .attr("y", function(d){ return d.Total_Wins; })
        // .attr("x", function(d) {
        //     return incomeScale(d[0]);  // Returns scaled location of x
        // })
        // .attr("y", function(d) {
        //     return lifeExpectancyScale(d[1]);  // Returns scaled circle y
        // })
        .attr("font_family", "sans-serif")  // Font type
        .attr("font-size", "11px")  // Font size
        .attr("fill", "darkgreen");   // Font color








    // Create axes functions

    var xAxis = d3.axisBottom()
        .scale(incomeScale)
        .tickFormat(d3.format(",d"))
        .tickValues([900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 90000, 100000]);

    var yAxis = d3.axisLeft()
        .scale(lifeExpectancyScale)
        .ticks(10);


    // Append axes to the SVG drawing area

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "axis-label")
        .attr("y", -15)
        .attr("x", width)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("offensive yards allowed");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("total wins from 2015");



});
