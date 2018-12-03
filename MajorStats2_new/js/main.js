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

// loadData();

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





    //******RUSHING BAR CHART******//

    //Create rushing bar chart
    rushingBar = new Rushing("info4", rushingData);


    //******Turnover  CHART******//

    //Create rushing bar chart
    turnoverBar = new Turnover("turnoverChart", turnOverData);
    console.log("turnoverbar end");

    createVis();

}

// this is for the stacked area chart
function createVis() {

    // TO-DO: Instantiate visualization objects here
    areachart = new StackedAreaChart("stacked-area-chart", pats_allData, "Patriots: Points per Season");
    console.log(pats_allData);
    areachart2 = new StackedAreaChart("stacked-area-chart2", nfl_allData, "Entire NFL: Average Points per Season");
    // timeline = new Timeline("timeline", allData.years);

}

var margin2 = {top: 140, right: 160, bottom: 30, left: 60},
    width2 = 800 - margin2.left - margin2.right,
    height2 = 500 - margin2.top - margin2.bottom;
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
    var svg2 = d3.select("#chart-area-yards").append("svg")
        .attr("width", width2 + margin2.left + margin2.right)
        .attr("height", height2 + margin2.top + margin2.bottom)
        .append("g")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

    // X scale
    var incomeScale = d3.scaleLog()
        .domain([d3.min(data, function(d){ return d.Offensive_Yards_Allowed }) - 100, d3.max(data, function(d){ return d.Offensive_Yards_Allowed })])
        .range([0, width2]);

    // Y scale
    var lifeExpectancyScale = d3.scaleLinear()
        .domain([d3.min(data, function(d){ return d.Total_Wins }) - 5, d3.max(data, function(d){ return d.Total_Wins }) + 5])
        .range([height2, 0]);

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
    var circles = svg2.selectAll("circle")
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
    svg2.selectAll("text")
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



    // create legends
    svg2
        .append("text")
        // .attr("class", "treeLegend")
        .attr("x", 0)
        .attr("y", -100)
        // .attr("class", "treeLegendLabel")
        .text("Legend")
        .style("font-weight", "bold")
        .style("font-size", "16px")
    svg2
        .append("rect")
        // .attr("class", "treeLegend")
        .attr("x", 0)
        .attr("y", -80)
        .attr("fill", "LightPink")
        .attr("width", 20)
        .attr("height", 20);

    svg2
        .append("text")
        // .attr("class", "treeLegend")
        .attr("x", 30)
        .attr("y", -65)
        .text("Not a Playoff Team")

    svg2
        .append("rect")
        // .attr("class", "treeLegend")
        .attr("x", 0)
        .attr("y", -50)
        .attr("fill", "LightGreen")
        .attr("width", 20)
        .attr("height", 20);

    svg2
        .append("text")
        // .attr("class", "treeLegend")
        .attr("x", 30)
        .attr("y", -35)
        .text("Playoff Team")

    // label axes
    svg2
        .append("text")
        // .attr("class", "treeLegend")
        .attr("x", width2 + 20)
        .attr("y", height2 + 10)
        .text("Offensive Yards Let Up")
        .attr("font-weight", "bold");

    svg2
        .append("text")
        // .attr("class", "treeLegend")
        .attr("x", 10)
        .attr("y", 10)
        .text("Wins")
        .attr("font-weight", "bold");



    // Create axes functions

    var xAxis = d3.axisBottom()
        .scale(incomeScale)
        .tickFormat(d3.format(",d"))
        .tickValues([900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 90000, 100000]);

    var yAxis = d3.axisLeft()
        .scale(lifeExpectancyScale)
        .ticks(10);


    // Append axes to the SVG drawing area

    svg2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "axis-label")
        .attr("y", -15)
        .attr("x", width2)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("offensive yards allowed");

    svg2.append("g")
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




// var barcharts1 = [];
// var barcharts2 = [];
// var barcharts3 = [];
// var barcharts4 = [];
// var linechart;
// var bar;
//
// var formatDate = d3.timeFormat("%Y");
// var parseDate = d3.timeParse("%Y");
//
// var curYear = parseDate("2017");
//
// var configs1 = [{key: "OffensivePassingYards", title: "Offensive Passing Yards"},
//     {key: "DefensivePassingYards", title: "Passing Yards Let Up"}];
// var configs2 = [{key: "OffensiveRushingYards", title: "Offensive Rushing Yards"},
//     {key: "DefensiveRushingYards", title: "Rushing Yards Let Up"}];
// var configs3 = [{key: "OffensiveTouchdowns", title: "Touchdowns Scored"},
//     {key: "TouchdownsScoredAgainst", title: "Touchdowns Let Up"}];
// // var configs3 = ["OffensiveTouchdowns","TouchdownsScoredAgainst"];
// var configs4 = [{key: "Interceptions", title: "Interceptions Thrown"},
//     {key: "Picks", title: "Interceptions"}];
// // var configs4 = ["Interceptions","Picks"];
//
// var colorScale = d3.scaleOrdinal(d3.schemeCategory20);
//
//
//
// d3.queue()
//     .defer(d3.csv, "data/MajorStats1.csv")
//     .defer(d3.csv, "data/rushing.csv")
//     .defer(d3.csv, "data/strongandpoorlyperformingteams.csv")
//     .defer(d3.json, "data/pats.json")
//     .defer(d3.json,"data/nfl_ppg.json")
//     .await(loadData);
//
// // loadData();
//
// function loadData(error, data, rushingData, turnOverData, data1, data2, treeData) {
//
//
// // 	    // console.log(csv)
//
//
//     data.forEach(function(d){
//         // Convert string to 'date object'
//         d.DefensivePassingYards = +d.DefensivePassingYards;
//         d.DefensiveRushingYards = +d.DefensiveRushingYards;
//         d.OffensivePassingYards = +d.OffensivePassingYards;
//         d.OffensiveRushingYards = +d.OffensiveRushingYards;
//         d.Interceptions = +d.Interceptions;
//         d.Picks = +d.Picks;
//         d.Year = parseDate(d.Year);
//         d.OffensiveTouchdowns = +d.OffensiveTouchdowns;
//         d.TouchdownsScoredAgainst = +d.TouchdownsScoredAgainst;
//         d.wins = +d.wins;
//
//         // Convert numeric values to 'numbers'
//     });
//
//     //**********STACKED AREA CHART ********//
//
//     pats_allData = data1;
//     console.log(pats_allData);
//
//
//     pats_allData.forEach(function(d){
//         // d.Expenditures = parseFloat(d.Expenditures) * 1.481105 / 100;
//         d.year = parseDate(d.year.toString());
//     });
//     console.log(pats_allData);
//     // Update color scale (all column headers except "Year")
//     // We will use the color scale later for the stacked area chart
//     colorScale.domain(d3.keys(pats_allData[0]).filter(function(d){ return (d !== "year"); }))
//     // console.log(colorScale.domain(d3.keys(allData[0]).filter(function(d){ return d != "year" && d != "team"; })))
//
//     nfl_allData = data2;
//
//
//     nfl_allData.forEach(function(d){
//         // d.Expenditures = parseFloat(d.Expenditures) * 1.481105 / 100;
//         d.year = parseDate(d.year.toString());
//     });
//
//
//
//
//
//     //******RUSHING BAR CHART******//
//
//     //Create rushing bar chart
//     rushingBar = new Rushing("info4", rushingData);
//
//
//     //******Turnover  CHART******//
//
//     //Create rushing bar chart
//     turnoverBar = new Turnover("turnoverChart", turnOverData);
//     console.log("turnoverbar end");
//
//     createVis();
//
// }
//
//
//
//
// // this is for the stacked area chart
// function createVis() {
//
//     // TO-DO: Instantiate visualization objects here
//     areachart = new StackedAreaChart("stacked-area-chart", pats_allData, "Patriots: Points per Season");
//     console.log(pats_allData);
//     areachart2 = new StackedAreaChart("stacked-area-chart2", nfl_allData, "Entire NFL: Average Points per Season");
//     // timeline = new Timeline("timeline", allData.years);
//
// }
//
//
//
// var margin2 = {top: 140, right: 60, bottom: 30, left: 60},
//     width2 = 800 - margin2.left - margin2.right,
//     height2 = 500 - margin2.top - margin2.bottom;
//
// // Load CSV file
// d3.csv("data/OpponentOffensiveYards.csv", function(data){
//
//     // Convert numeric values to numbers
//     data.forEach(function(d) {
//         d.Total_Wins = +d.Total_Wins;
//         d.Offensive_Yards_Allowed = +d.Offensive_Yards_Allowed;
//         d.Year = +d.Year;
//     });
//
//     // var newTrueWidth = $("#chart-area-yards").width();
//     // console.log(newTrueWidth);
//
//     // Sort countries descending by population
//     data.sort(function(a, b) {
//         return b.Total_Wins - a.Total_Wins;
//     });
//
//     // Append a new SVG area
//     var svg2 = d3.select("#chart-area-yards").append("svg")
//         .attr("width", width2 + margin2.left + margin2.right)
//         .attr("height", height2 + margin2.top + margin2.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
//
//     // X scale
//     var incomeScale = d3.scaleLog()
//         .domain([d3.min(data, function(d){ return d.Offensive_Yards_Allowed }) - 100, d3.max(data, function(d){ return d.Offensive_Yards_Allowed })])
//         .range([0, width2]);
//
//     // Y scale
//     var lifeExpectancyScale = d3.scaleLinear()
//         .domain([d3.min(data, function(d){ return d.Total_Wins }) - 5, d3.max(data, function(d){ return d.Total_Wins }) + 5])
//         .range([height2, 0]);
//
//     // Radius Scale
//     var populationScale = d3.scaleLinear()
//         .domain(d3.extent(data, function(d){ return d.Total_Wins }))
//         .range([4, 30]);
//
//     // Region Scale (ordinal)
//     var regionScale = d3.scaleOrdinal(d3.schemeCategory10);
//
//
//     // define the line
//     var valueline = d3.line()
//         .x(function(d) { return x(d.Offensive_Yards_Allowed); })
//         .y(function(d) { return y(d.Total_Wins); });
//
//     var div = d3.select("body").append("div")
//         .attr("class", "tooltip")
//         .style("opacity", 0);
//
//
//
//
//
//     // Map data to visual elements (SVG circles)
//     var circles = svg2.selectAll("circle")
//         .data(data)
//         .enter()
//         .append("circle")
//         .attr("class", "country-circle")
//         .attr("cx", function(d){ return incomeScale(d.Offensive_Yards_Allowed); })
//         .attr("cy", function(d){ return lifeExpectancyScale(d.Total_Wins); })
//         .attr("r", function(d){ return populationScale(d.Total_Wins); })
//
//         .on("mouseover", function(d) {
//             div.transition()
//                 .duration(200)
//                 .style("opacity", .9);
//             div.html("Team: " + d.Team1 + "<br/>" + "Yards allowed: " + d.Offensive_Yards_Allowed + "<br/>" + "Wins: " + d.Total_Wins)
//                 .style("left", (d3.event.pageX) + "px")
//                 .style("top", (d3.event.pageY - 28) + "px");
//         })
//         .on("mouseout", function(d) {
//             div.transition()
//                 .duration(500)
//                 .style("opacity", 0);
//         })
//         .attr("stroke", "#333")
//         .attr("opacity", 0.7)
//         .attr("fill", function(d){
//             if(d.Playoff_Made === "TRUE")
//                 return "LightGreen";
//             else
//                 return "LightPink";
//         });
//
//     //.attr("fill", function(d){ return regionScale(d.Team1); });
//
//
//     // //  APPEND TEXT LABELS
//     // var labels = svg.selectAll("text")
//     //     .data(data)
//     //     .enter()
//     //     .append("text")
//     //     .attr("class", "city-label")
//     // 	.text(function(d){ return d.Team1; })
//     //     .attr("x", function(d){ return d.Offensive_Yards_Allowed; })
//     //     .attr("y", function(d){ return d.Total_Wins; });
//
//
//
//     // Add Text Labels
//     svg2.selectAll("text")
//         .data(data)
//         .enter()
//         .append("text")
//         .text(function(d) {
//             // console.log("hi");
//             // console.log(d);
//             // return d[0] + "," + d[1];
//             return d.Team1
//         })
//         .attr("x", function(d){ return d.Offensive_Yards_Allowed; })
//         .attr("y", function(d){ return d.Total_Wins; })
//         // .attr("x", function(d) {
//         //     return incomeScale(d[0]);  // Returns scaled location of x
//         // })
//         // .attr("y", function(d) {
//         //     return lifeExpectancyScale(d[1]);  // Returns scaled circle y
//         // })
//         .attr("font_family", "sans-serif")  // Font type
//         .attr("font-size", "11px")  // Font size
//         .attr("fill", "darkgreen");   // Font color
//
//
//
//     // create legends
//     svg2
//         .append("text")
//         // .attr("class", "treeLegend")
//         .attr("x", 0)
//         .attr("y", -100)
//         // .attr("class", "treeLegendLabel")
//         .text("Legend")
//         .style("font-weight", "bold")
//         .style("font-size", "16px")
//     svg2
//         .append("rect")
//         // .attr("class", "treeLegend")
//         .attr("x", 0)
//         .attr("y", -80)
//         .attr("fill", "LightPink")
//         .attr("width", 20)
//         .attr("height", 20);
//
//     svg2
//         .append("text")
//         // .attr("class", "treeLegend")
//         .attr("x", 30)
//         .attr("y", -65)
//         .text("Not a Playoff Team")
//
//     svg2
//         .append("rect")
//         // .attr("class", "treeLegend")
//         .attr("x", 0)
//         .attr("y", -50)
//         .attr("fill", "LightGreen")
//         .attr("width", 20)
//         .attr("height", 20);
//
//     svg2
//         .append("text")
//         // .attr("class", "treeLegend")
//         .attr("x", 30)
//         .attr("y", -35)
//         .text("Playoff Team")
//
//
//
//
//
//     // Create axes functions
//
//     var xAxis = d3.axisBottom()
//         .scale(incomeScale)
//         .tickFormat(d3.format(",d"))
//         .tickValues([900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 90000, 100000]);
//
//     var yAxis = d3.axisLeft()
//         .scale(lifeExpectancyScale)
//         .ticks(10);
//
//
//     // Append axes to the SVG drawing area
//
//     svg2.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + height2 + ")")
//         .call(xAxis)
//         .append("text")
//         .attr("class", "axis-label")
//         .attr("y", -15)
//         .attr("x", width2)
//         .attr("dy", ".71em")
//         .style("text-anchor", "end")
//         .text("offensive yards allowed");
//
//     svg2.append("g")
//         .attr("class", "y axis")
//         .call(yAxis)
//         .append("text")
//         .attr("class", "axis-label")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 6)
//         .attr("dy", ".71em")
//         .style("text-anchor", "end")
//         .text("total wins from 2015");
// });
//



//
//
// scatterplot
//
//



// Define margins
// var margin = { top: 10, right: 500, bottom: 60, left: 60 };
//
// var label_svg = { width: 130, height: 210, padding: 20, side: 20, margin_top: 30 };
//
// var geo_map = { width: 460, height: 240 };
//
// //Width and height
// var outer_width = 1400;
// var outer_height = 600;
// var svg_width = outer_width - margin.left - margin.right;
// var svg_height = outer_height - margin.top - margin.bottom;
//
// // The year to display
// min_year = null;
// max_year = null;
// display_year = null;
//
// // dataset
// dataset = null;
//
// // checked_country
// checked_country = [];
//
// // play status => true : play  /  false : pause
// play_status = false;
//
// // if the color label is choosen, filter out the circles with other color labels; if not, it is null
// // assigned with region name and used with country_region dict
// color_label = null;
//
// var initial_interval = 500;
// var interval = initial_interval;
//
// // set intial circle attribute
// initial_circle_opacity = 1;
// hidden_circle_opacity = .2;
// initial_text_opacity = 0;
//
// // assign colors to different areas
// colors_areas = {
//     "Made to Playoff": "LightGreen",
//     "Not Made to Playoff": "LightPink)"
// };
//
//
//
// //Create SVG element as a group with the margins transform applied to it
// var svg = d3.select("#bubble_chart_div")
//     .append("svg")
//     .attr("id", "bubble_chart")
//     // .attr("width", svg_width + margin.left*1.3)
//     // .attr("height", svg_height + margin.top + margin.bottom)
//     // .attr("transform", "scale(0.7)")
//     .attr("viewBox", "0 0 " + (svg_width + margin.left * 1.3) + " " + (svg_height + margin.top + margin.bottom))
//     .attr("preserveAspectRatio", "xMinYMin meet")
//     .append("g")
//     .attr("class", "chart")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// initialize_titles();
//
// // Gapminder_Small
// // ./data/Gapminder_All_Time.csv
// // Load the file data.csv and generate a visualisation based on it
// d3.csv("./data/opponoffyard.csv", function(error, data) {
//
//     // handle any data loading errors
//     if (error) {
//         console.log("Something went wrong");
//         console.log(error);
//     } else {
//         console.log("Data Loaded");
//
//         // Assign  the data object loaded to the global dataset variable
//         dataset = data;
//
//         year_list = d3.map(dataset, function(d) { return +d.Year; }).keys();
//         // sort year_list in ascending order
//         year_list = year_list.sort(function(x, y) {
//             return +d3.ascending(+x, +y);
//         })
//         min_year = d3.min(dataset.map(function(d) { return +d.Year; }));
//         max_year = d3.max(dataset.map(function(d) { return +d.Year; }));
//
//         initialize_slider();
//
//         display_year = min_year;
//
//         // radius scale
//         rScale = d3.scaleSqrt().domain([0, 5e8]).range([5, 40]);
//
//         initialize_axis();
//
//         d3.select(".chart").append("g").attr("class", "bubbles");
//
//         initialize_color_labels();
//
//         initialize_focus_point();
//
//         // Generate the visualisation
//         generateVis();
//
//         initialize_geo_map();
//
//         initialize_checkbox();
//
//         initialize_region_barchart();
//
//         initialize_govern_barchart();
//
//         draw_region_barchart();
//
//         draw_govern_barchart();
//     }
// });
//
// var filtered_dataset = null;
//
//


