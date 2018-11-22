
// Will be used to the save the loaded JSON data
var pats_allData = [];
var nfl_allData = [];

// Date parser to convert strings to date objects
var parseDate = d3.timeParse("%Y");

// Set ordinal color scale
var colorScale = d3.scaleOrdinal(d3.schemeCategory20);

// Variables for the visualization instances
var areachart, timeline, areachart2;

var selectionDomain = [1975, 2010];


// Start application by loading the data
d3.queue()
    .defer(d3.json, "data/pats.json")
    .defer(d3.json,"data/nfl_ppg.json")
    .await(loadData);
loadData();

function loadData(error, data1, data2){

    pats_allData = data1;
    console.log(pats_allData)

    // Convert Pence Sterling (GBX) to USD and years to date objects
    // allData.layers.forEach(function(d){
    //     for (var column in d) {
    //         if (d.hasOwnProperty(column) && column != "Year") {
    //             d[column] = parseFloat(d[column]) * 1.481105 / 100;
    //         } else if(d.hasOwnProperty(column) && column == "Year") {
    //             d[column] = parseDate(d[column].toString());
    //         }
    //     }
    // });

    pats_allData.forEach(function(d){
        // d.Expenditures = parseFloat(d.Expenditures) * 1.481105 / 100;
        d.year = parseDate(d.year.toString());
    });
    console.log(pats_allData);
    // Update color scale (all column headers except "Year")
    // We will use the color scale later for the stacked area chart
    colorScale.domain(d3.keys(pats_allData[0]).filter(function(d){ return (d !== "year"); }))
    // console.log(colorScale.domain(d3.keys(allData[0]).filter(function(d){ return d != "year" && d != "team"; })))

    nfl_allData =data2;


    nfl_allData.forEach(function(d){
        // d.Expenditures = parseFloat(d.Expenditures) * 1.481105 / 100;
        d.year = parseDate(d.year.toString());
    });

    createVis()
};


function createVis() {

	// TO-DO: Instantiate visualization objects here
    areachart = new StackedAreaChart("stacked-area-chart", pats_allData, "Patriots: Points per Season");
    console.log(pats_allData);
    areachart2 = new StackedAreaChart("stacked-area-chart2", nfl_allData, "Entire NFL: Average Points per Season");
    // timeline = new Timeline("timeline", allData.years);

}


function brushed() {
    // Get the extent of the current brush
    var selectionRange = d3.brushSelection(d3.select(".brush").node());

    // Convert the extent into the corresponding domain values
    selectionDomain = selectionRange.map(areachart.x.invert);
    // console.log(selectionDomain);

    // Update focus chart (detailed information)
    areachart.x.domain(selectionRange.map(timeline.x.invert));
    areachart.wrangleData();
// ...
}