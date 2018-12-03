// /* CS171 Final Project main JS file */
//
// d3.select("body.p")
//     .append("p")
//     .text("Click on a Team to read more")
//     .attr("id", "instructions");
//
// //initial data
//
// totalbuildings = [];
//
// Turnover = function(_parentElement, _data){
//     this.parentElement = _parentElement;
//     this.data = _data;
//
//     this.loadData();
// }
//
// Turnover.prototype.loadData = function() {
//     var vis = this;
//
//     // console.log(vis.data)
//
//
//     vis.initVis();
// };
//
// Turnover.prototype.initVis = function() {
//     var vis = this;
//
//     var trueWidth = $("#turnoverChart").width();
//     console.log(trueWidth);
//
//     vis.margin = {top: 30, right: 70, bottom: 30, left: 70};
//     // vis.margin = {top: 0, right: 0, bottom: 0, left: 0};
//     vis.width = trueWidth - vis.margin.left - vis.margin.right;
//     vis.height = 400 - vis.margin.top - vis.margin.bottom;
//
//     vis.svg = d3.select("#" + vis.parentElement).append("svg")
//         .attr("width", vis.width + vis.margin.left + vis.margin.right)
//         .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
//         .append("g")
//
//
//      vis.x = d3.scaleLinear()
//         .range([0, vis.width]);
//
//      vis.y = d3.scaleBand()
//         .rangeRound([vis.height, 0])
//         .padding(0.1);
//
//
//      vis.xAxis = d3.axisBottom(vis.x);
//
//      vis.yAxis = d3.axisLeft(vis.y);
//
//
//
//
//     vis.wrangleData();
// };
//
// Turnover.prototype.wrangleData = function() {
//
//
//     var vis = this;
//
//
//     vis.updateVis()
//
// }
//
// Turnover.prototype.updateVis = function() {
//     var vis = this;
//
//     vis.data.sort( function(a, b){
//         return (+b.Turnover_Differential) - (+a.Turnover_Differential);
//
//     });
//
//     // console.log(vis.data);
//
//     totalbuildings = vis.data;
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
//     vis.x.domain(d3.extent(vis.data, function (d) {
//         return d.Turnover_Differential;
//     }));
//     vis.y.domain(vis.data.map(function (d) {
//         return d.Teams;
//     }));
//
//
//
// // set up tooltip
//
//     var tooltip = d3.select("body").append("div").attr("class", "toolTip");
//
//
//     //add bar graph
//
//     vis.svg.selectAll(".bar")
//         .data(totalbuildings)
//         .enter()
//         .append("rect")
//         .attr("class", function (d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive");})
//
//         .attr("fill", function(d){
//             if(d.Playoff_Made === "TRUE")
//                 return "LightGreen";
//             else
//                 return "LightPink";
//         })
//
//         //.attr("fill", "Plum")
//         .attr("x", function(d) { return vis.x(Math.min(0, d.Turnover_Differential)); })
//
//         .attr("y", function(d) { return vis.y(d.Teams); })
//         .attr("width", function(d){return Math.abs(vis.x(d.Turnover_Differential) - vis.x(0));})
//
//         .attr("height", function(d,i){return vis.y.bandwidth();})
//         //.attr("class", "barGraph")
//
//         .on("mousemove", function(d){
//             tooltip
//                 .style("left", d3.event.pageX - 50 + "px")
//                 .style("top", d3.event.pageY - 70 + "px")
//                 .style("display", "inline-block")
//                 .html(("Team: " + d.Teams) + "<br>"  + "Turnover Diff.: " + (d.Turnover_Differential));
//         })
//         .on("mouseout", function(d){ tooltip.style("display", "none");})
//
//
//
//
//         .on("click", function(d){
//             // console.log(d);
//             var elt = document.getElementById("instructions");
//             console.log('elt:' + elt);
//             if (elt != null) {
//                 var parent = elt.parentElement;
//                 parent.removeChild(elt);
//
//                 // console.log('parent:' + parent);
//             }
//
//             $('#specific_name2').text(d.Teams + ": " + d.Year);
//             $('#height').text(d.Turnover_Differential);
//             // $('#season').text('Season: ' + d.Year);
//             $('#numberofinterceptions').text(d.number_of_interceptions);
//             $('#numberofinterceptionsthrown').text( d.number_of_interceptions_thrown);
//             $('#numberoffumbleslost').text(d.number_of_fumbles_lost);
//             $('#numberoffumblesrecovered').text( d.number_of_fumbles_recovered);
//             $('#playoffmade').text(d.Playoff_Made);
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
//                 .attr('src', "img/"+d.image);
//
//         });
//
//
//
//     // add the x Axis
//     vis.svg.append("g")
//         .attr("transform", "translate(0," + vis.height + ")")
//         .call(d3.axisBottom(vis.x));
//
// // add the y Axis
//     vis.svg.append("g")
//         .attr("class", "y axis")
//         .attr("transform", "translate(" + vis.x(0) + ",0)")
//         .call(d3.axisRight(vis.y));
//
//     //add pics and the click function
//
//     vis.svg.on("click", function(d) {
//         // Do something after click
//     });
//
//
//     var imgs = vis.svg.selectAll("image").data([0]);
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
//     vis.svg.selectAll('.Teams')
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
//
//
//     var legend = [];
//
//
//     vis.svg.selectAll(".Teams")
//         .data(totalbuildings)
//         .enter().append("g")
//         .attr("class", "legend")
//         .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
//
//
//
//
// }


/* CS171 Final Project main JS file */

d3.select("body.p")
    .append("p")
    .text("Click on a Team to read more")
    .attr("id", "instructions");

//initial data

totalbuildings = [];

Turnover = function(_parentElement, _data){
    this.parentElement = _parentElement;
    this.data = _data;

    this.loadData();
}

Turnover.prototype.loadData = function() {
    var vis = this;

    // console.log(vis.data)


    vis.initVis();
};

Turnover.prototype.initVis = function() {
    var vis = this
    vis.margin = {top: 150, right: 30, bottom: 30, left: 30};
    // vis.margin = {top: 0, right: 0, bottom: 0, left: 0};
    vis.width = 960 - vis.margin.left - vis.margin.right;
    vis.height =600 - vis.margin.top - vis.margin.bottom;

    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g");

    vis.svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "end")
        .attr("x", vis.width/2 - 15)
        .attr("y", vis.height + vis.margin.top+ 30)
        .text("Turnover Differential")
        .attr("font-weight", "bold");


    vis.x = d3.scaleLinear()
        .range([0, vis.width]);

    vis.y = d3.scaleBand()
        .rangeRound([vis.height + vis.margin.top , vis.margin.top])
        .padding(0.1);


    vis.xAxis = d3.axisBottom(vis.x);

    vis.yAxis = d3.axisLeft(vis.y);

    var shift=  vis.height + 20;
    vis.svg
        .append("text")
        // .attr("class", "treeLegend")
        .attr("x", 0)
        .attr("y",  shift)
        // .attr("class", "treeLegendLabel")
        .text("Legend")
        .style("font-weight", "bold")
        .style("font-size", "16px")

    vis.svg
        .append("text")
        // .attr("class", "treeLegend")
        .attr("x", vis.width/2 - 300)
        .attr("y",  100)
        // .attr("class", "treeLegendLabel")
        .text("Best and Worst Performing Teams in Turnover Differential in 2015")
        .style("font-weight", "bold")
        .style("font-size", "20px")

    vis.svg
        .append("rect")
        // .attr("class", "treeLegend")
        .attr("x", 0)
        .attr("y", 20+ shift)
        .attr("fill", "LightPink")
        .attr("width", 20)
        .attr("height", 20);

    vis.svg
        .append("text")
        // .attr("class", "treeLegend")
        .attr("x", 30)
        .attr("y", 35+ shift)
        .text("Not a Playoff Team")

    vis.svg
        .append("rect")
        // .attr("class", "treeLegend")
        .attr("x", 0)
        .attr("y", 50+ shift)
        .attr("fill", "LightGreen")
        .attr("width", 20)
        .attr("height", 20);

    vis.svg
        .append("text")
        // .attr("class", "treeLegend")
        .attr("x", 30)
        .attr("y", 65+ shift)
        .text("Playoff Team")


    vis.wrangleData();
};

Turnover.prototype.wrangleData = function() {


    var vis = this;


    vis.updateVis()

}

Turnover.prototype.updateVis = function() {
    var vis = this;

    vis.data.sort( function(a, b){
        return (+b.Turnover_Differential) - (+a.Turnover_Differential);

    });

    // console.log(vis.data);

    totalbuildings = vis.data;


    //converting strings to numbers

    for (var i = 0; i< totalbuildings.length; i++){
        totalbuildings[i].Turnover_Differential = +totalbuildings[i].Turnover_Differential;
        totalbuildings[i].Total_Wins = +totalbuildings[i].Total_Wins;
        totalbuildings[i].number_of_interceptions = +totalbuildings[i].number_of_interceptions;
        totalbuildings[i].number_of_interceptions_thrown = +totalbuildings[i].number_of_interceptions_thrown;
        totalbuildings[i].number_of_fumbles_lost = +totalbuildings[i].number_of_fumbles_lost;
        totalbuildings[i].number_of_fumbles_recovered = +totalbuildings[i].number_of_fumbles_recovered;
        totalbuildings[i].Year = +totalbuildings[i].Year;


    }


    // update our Scale the range of the data in the domains
    vis.x.domain(d3.extent(vis.data, function (d) {
        return d.Turnover_Differential;
    }));
    vis.y.domain(vis.data.map(function (d) {
        return d.Teams;
    }));



// set up tooltip

    var tooltip = d3.select("body").append("div").attr("class", "toolTip");


    //add bar graph

    vis.svg.selectAll(".bar")
        .data(totalbuildings)
        .enter()
        .append("rect")
        .attr("class", function (d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive");})

        .attr("fill", function(d){
            if(d.Playoff_Made === "TRUE")
                return "LightGreen";
            else
                return "LightPink";
        })

        //.attr("fill", "Plum")
        .attr("x", function(d) { return vis.x(Math.min(0, d.Turnover_Differential)); })

        .attr("y", function(d) { return vis.y(d.Teams); })
        .attr("width", function(d){return Math.abs(vis.x(d.Turnover_Differential) - vis.x(0));})

        .attr("height", function(d,i){return vis.y.bandwidth();})
        //.attr("class", "barGraph")

        .on("mousemove", function(d){
            tooltip
                .style("left", d3.event.pageX - 50 + "px")
                .style("top", d3.event.pageY - 70 + "px")
                .style("display", "inline-block")
                .html((d.Teams) + "<br>"  + (d.Turnover_Differential));
        })
        .on("mouseout", function(d){ tooltip.style("display", "none");})




        .on("click", function(d){
            // console.log(d);
            var elt = document.getElementById("instructions");
            console.log('elt:' + elt);
            if (elt != null) {
                var parent = elt.parentElement;
                parent.removeChild(elt);

                // console.log('parent:' + parent);
            }

            $('#specific_name2').text(d.Teams + ": " + d.Year);
            $('#height').text(d.Turnover_Differential);
            // $('#season').text('Season: ' + d.Year);
            $('#numberofinterceptions').text(d.number_of_interceptions);
            $('#numberofinterceptionsthrown').text( d.number_of_interceptions_thrown);
            $('#numberoffumbleslost').text(d.number_of_fumbles_lost);
            $('#numberoffumblesrecovered').text( d.number_of_fumbles_recovered);
            $('#playoffmade').text(d.Playoff_Made);


            d3.select("#image")
                .select('img').remove();


            d3.select("#image")
                .append('img')
                .attr("width", 250)
                .attr("height", 250)
                .attr('src', "img/"+d.image);

        });



    // add the x Axis
    vis.svg.append("g")
        .attr("transform", "translate(0," + (vis.height + vis.margin.top) + ")")
        .call(d3.axisBottom(vis.x));

// add the y Axis
    vis.svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + vis.x(0) + ",0)")
        .call(d3.axisRight(vis.y));

    //add pics and the click function

    vis.svg.on("click", function(d) {
        // Do something after click
    });


    var imgs = vis.svg.selectAll("image").data([0]);
    imgs.enter()
        .append("svg:image");



    function showImage() {
        var img = document.getElementById('myImageId');
        img.style.visibility = 'visible';
    }


    var images = [];

    vis.svg.selectAll('.Teams')
        .data(totalbuildings)
        .enter()
        .append('image')
        .on('click', function(d) {


            d3.select("#tool").style("opacity", 1.0);
            // d3.select("#tool").html(d.imgsrc);
            images.push(d.imgsrc);
            d3.select('#tool')
                .selectAll("img")
                .data(images)
                .enter()
                .append('img')
                .attr("width", 50)
                .attr("height", 50)
                .attr('src', function(d, i) {
                    return d
                });
        });




    var legend = [];


    vis.svg.selectAll(".Teams")
        .data(totalbuildings)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });




}