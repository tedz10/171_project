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


// initialize graph path
// var yType = "wins";
// var lineGraph = d3.line()
//     .x(function(d){ return x(d.Year)})
//     .y(function(d){return y(d[yType])});
//
// var lines_pats=svg.append("path");
// var lines_lions=svg.append("path");
// var lines_browns=svg.append("path");
    // .data(data);

// Initialize data
// loadData();

// FIFA world cup
// var data;
// var pats_data;
// var lions_data;
// var browns_data;

//



// Load CSV file
// function loadData() {
	d3.csv("data/MajorStats1.csv", function(error, data) {
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
        linechart = new LineChart("chart-area", data);
        for (var i = 0; i <2; i++) {
            bar1 = new BarChart("chart1", data, configs1[i]);
            bar2 = new BarChart("chart2", data, configs2[i]);
            bar3 = new BarChart("chart3", data, configs3[i]);
            bar4 = new BarChart("chart4", data, configs4[i]);
            barcharts1.push(bar1)
            barcharts2.push(bar2)
            barcharts3.push(bar3)
            barcharts4.push(bar4)
        }

    }
);

// Show details for a specific FIFA World Cup


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


function updateVis(d){
    console.log(d.Year)
    curYear = d.Year;
    for (var i = 0; i <2; i++) {
        barcharts1[i].wrangleData()
        barcharts2[i].wrangleData()
        barcharts3[i].wrangleData()
        barcharts4[i].wrangleData()
    }
    document.getElementById("specific_name").innerHTML = "Major stats for " + formatDate(d.Year);
}