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
// 	d3.csv("data/MajorStats1.csv", function(error, data) {
// // 	    // console.log(csv)
//
//
//         data.forEach(function(d){
//             // Convert string to 'date object'
//             d.DefensivePassingYards = +d.DefensivePassingYards;
//             d.DefensiveRushingYards = +d.DefensiveRushingYards;
//             d.OffensivePassingYards = +d.OffensivePassingYards;
//             d.OffensiveRushingYards = +d.OffensiveRushingYards;
//             d.Interceptions = +d.Interceptions;
//             d.Picks = +d.Picks;
//             d.Year = parseDate(d.Year);
//             d.OffensiveTouchdowns = +d.OffensiveTouchdowns;
//             d.TouchdownsScoredAgainst = +d.TouchdownsScoredAgainst;
//             d.wins = +d.wins;
//
//             // Convert numeric values to 'numbers'
//         });
//         linechart = new LineChart("chart-area", data);
//         for (var i = 0; i <2; i++) {
//             bar1 = new BarChart("chart1", data, configs1[i]);
//             bar2 = new BarChart("chart2", data, configs2[i]);
//             bar3 = new BarChart("chart3", data, configs3[i]);
//             bar4 = new BarChart("chart4", data, configs4[i]);
//             barcharts1.push(bar1)
//             barcharts2.push(bar2)
//             barcharts3.push(bar3)
//             barcharts4.push(bar4)
//         }
//
//     }
// );

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



d3.select("body.p")
    .append("p")
    .text("Click on a Team to read more")
    .attr("id", "instructions");

//initial data

totalbuildings = [];




// set up the margin, x, and y

var margin = {top: 20, right: 80, bottom: 40, left: -50},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .range([0, width]);

var y = d3.scaleBand()
    .rangeRound([height, 0])
    .padding(0.1);


var xAxis = d3.axisBottom(x);

var yAxis = d3.axisLeft(y);


//load csv and sort our data

// d3.csv("data/strongandpoorlyperformingteams.csv", function(data) {
//
//
//     data.sort( function(a, b){
//         return (+b.Turnover_Differential) - (+a.Turnover_Differential);
//
//     });
//
//     console.log(data);
//
//     totalbuildings = data;
//
//
//     //converting strings to numbers
//
//     for (var i = 0; i< totalbuildings.length; i++){
//         totalbuildings[i].Turnover_Differential = +totalbuildings[i].Turnover_Differential;
//         totalbuildings[i].Total_Wins = +totalbuildings[i].Total_Wins;
//         totalbuildings[i].number_of_interceptions = +totalbuildings[i].number_of_interceptions;
//         totalbuildings[i].number_of_interceptions_thrown = +totalbuildings[i].number_of_interceptions_thrown;
//         totalbuildings[i].number_of_fumbles_lost = +totalbuildings[i].number_of_fumbles_lost;
//         totalbuildings[i].number_of_fumbles_recovered = +totalbuildings[i].number_of_fumbles_recovered;
//         totalbuildings[i].Year = +totalbuildings[i].Year;
//
//
//     }
//
//
//     // update our Scale the range of the data in the domains
//     x.domain(d3.extent(data, function (d) {
//         return d.Turnover_Differential;
//     }));
//     y.domain(data.map(function (d) {
//         return d.Teams;
//     }));
//
//
//     svg = d3.select("#chart").append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// // set up tooltip
//
//     var tooltip = d3.select("body").append("div").attr("class", "toolTip");
//
//
//
//     //add bar graph
//
//     svg.selectAll(".bar")
//         .data(totalbuildings)
//         .enter()
//         .append("rect")
//         .attr("class", function (d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive");})
//
//         .attr("fill", function(d){
//             if(d.Playoff_Made == "TRUE")
//                 return "LightGreen";
//             else
//                 return "LightPink";
//         })
//
//
//
//
//
//
//
//
//         //.attr("fill", "Plum")
//         .attr("x", function(d) { return x(Math.min(0, d.Turnover_Differential)); })
//
//         .attr("y", function(d) { return y(d.Teams); })
//         .attr("width", function(d){return Math.abs(x(d.Turnover_Differential) - x(0));})
//
//         .attr("height", function(d,i){return y.bandwidth();})
//         //.attr("class", "barGraph")
//
//         .on("mousemove", function(d){
//             tooltip
//                 .style("left", d3.event.pageX - 50 + "px")
//                 .style("top", d3.event.pageY - 70 + "px")
//                 .style("display", "inline-block")
//                 .html((d.Teams) + "<br>"  + (d.Turnover_Differential));
//         })
//         .on("mouseout", function(d){ tooltip.style("display", "none");})
//
//
//
//
//         .on("click", function(d){
//             console.log(d);
//             var elt = document.getElementById("instructions");
//             console.log('elt:' + elt);
//             if (elt != null) {
//                 var parent = elt.parentElement;
//                 parent.removeChild(elt);
//
//                 console.log('parent:' + parent);
//
//             }
//
//             $('#buildingName').text('Team: ' + d.Teams);
//             $('#height').text('Turnover Differential: ' + d.Turnover_Differential);
//             $('#season').text('Season: ' + d.Year);
//             $('#numberofinterceptions').text('Number of Interceptions: ' + d.number_of_interceptions);
//             $('#numberofinterceptionsthrown').text('Number of Interceptions Thrown: ' + d.number_of_interceptions_thrown);
//             $('#numberoffumbleslost').text('Number of Fumbles Lost: ' + d.number_of_fumbles_lost);
//             $('#numberoffumblesrecovered').text('Number of Fumbles Recovered: ' + d.number_of_fumbles_recovered);
//             $('#playoffmade').text('Whether Madre to Playoff: ' + d.Playoff_Made);
//
//
//             d3.select("#image")
//                 .select('img').remove();
//
//
//             d3.select("#image")
//                 .append('img')
//                 .attr("width", 250)
//                 .attr("height", 250)
//                 .attr('src', "data/img/"+d.image);
//
//         });
//
//
//
//     // add the x Axis
//     svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x));
//
// // add the y Axis
//     svg.append("g")
//         .attr("class", "y axis")
//         .attr("transform", "translate(" + x(0) + ",0)")
//         .call(d3.axisRight(y));
//
//     //add pics and the click function
//
//     svg.on("click", function(d) {
//         // Do something after click
//     });
//
//
//     var imgs = svg.selectAll("image").data([0]);
//     imgs.enter()
//         .append("svg:image");
//
//
//
//     function showImage() {
//         var img = document.getElementById('myImageId');
//         img.style.visibility = 'visible';
//     }
//
//
//     var images = [];
//
//     svg.selectAll('.Teams')
//         .data(totalbuildings)
//         .enter()
//         .append('image')
//         .on('click', function(d) {
//
//
//             d3.select("#tool").style("opacity", 1.0);
//             // d3.select("#tool").html(d.imgsrc);
//             images.push(d.imgsrc);
//             d3.select('#tool')
//                 .selectAll("img")
//                 .data(images)
//                 .enter()
//                 .append('img')
//                 .attr("width", 50)
//                 .attr("height", 50)
//                 .attr('src', function(d, i) {
//                     return d
//                 });
//         });
//
//
// });
