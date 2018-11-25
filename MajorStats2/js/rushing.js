//Respond to user input within rushing barchart
$("#select-order-type").on("change", function(){
    rushingBar.reSort(this.value);
});

$("#select-conf-type").on("change", function(){
    rushingBar.filterVis(this.value);
});

var orderingType;

Rushing = function(_parentElement, _data){
    this.parentElement = _parentElement;
    this.dataOrig = _data;
    this.data = _data;

    this.loadData();
}

Rushing.prototype.loadData = function() {
    var vis = this;

    vis.dataOrig.forEach(function (d) {
        d.Rushing = + d.Rushing;
        d.Passing = + d.Passing;
    });

    vis.initVis();
};

Rushing.prototype.initVis = function() {
    var vis = this
    vis.margin = {top: 30, right: 150, bottom: 30, left: 30};
    vis.width = 960 - vis.margin.left - vis.margin.right;
    vis.height = 400 - vis.margin.top - vis.margin.bottom;

    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
    g = vis.svg.append("g").attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


    x0 = d3.scaleBand()
        .rangeRound([0, vis.width])
        .paddingInner(0.1);

    x1 = d3.scaleBand()
        .padding(0.05);

    y = d3.scaleLinear()
        .rangeRound([vis.height, 0]);

    z = d3.scaleOrdinal()
        .range(["#7b6888",  "#d0743c", ]);




    vis.wrangleData();
};

Rushing.prototype.wrangleData = function() {


    var vis = this;

    vis.data = vis.dataOrig.sort( function(a, b){
        return b["Rushing"] - a["Rushing"];
    })

    vis.updateVis()

}

Rushing.prototype.reSort = function(orderingType) {
    var vis = this;

    //Sort the data
    vis.data = vis.data.sort( function(a, b){
        return b[orderingType] - a[orderingType];
    })

    vis.svg.selectAll('.bar').remove();
    vis.svg.selectAll('.axis').remove();
    vis.svg.selectAll('.meanLine').remove();
    vis.svg.selectAll('.meanText').remove();

    vis.updateVis()

}



Rushing.prototype.filterVis = function(filteringType) {
    var vis = this;

    vis.data = vis.data.sort( function(a, b){
        return b[orderingType] - a[orderingType];
    })

    // Filter the data
    vis.data = vis.dataOrig.filter(function (d) {
        if(filteringType == "All"){
            return (d);
        }else{
            return (d.Conference == filteringType);
        }
    });


    vis.svg.selectAll('.bar').remove();
    vis.svg.selectAll('.axis').remove();
    vis.svg.selectAll('.meanLine').remove();
    vis.svg.selectAll('.meanText').remove();
    vis.svg.selectAll('.d3-tip').remove();

    vis.updateVis()

}


Rushing.prototype.updateVis = function(){
    var vis = this;



    var columns = ["Rushing", "Passing", "City", "Playoffs"]
    var keys = columns.slice(0);
    console.log(keys)

    x0.domain(vis.data.map(function(d) { return d.Team; }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(vis.data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();


    // Add tooltip
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-30, -50])
        .html(function(d, i) {
            return "<span id='tipText' style='color:red'></span>";
        })

    vis.svg.call(tip);


    vis.svg.append('pattern')
        .attr('id', 'diagonalHatch')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 4)
        .attr('height', 4)
        .append('path')
        .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
        .attr('stroke', '#000000')
        .attr('stroke-width', 1);


    group = g.append("g")
        .selectAll("g")
        .data(vis.data)
        .enter().append("g")
        .attr("transform", function(d) { return "translate(" + x0(d.Team) + ",0)"; })
        .selectAll("rect")
        .data(function(d) {
            return keys.map(
                function(key) {
                    console.log(d.City)
                    return {city: d.City, key: key, value: d[key], playoffs: d.Playoffs};
                });
        })
        .enter().append("rect")
        .attr("x", function(d) { return x1(d.key); })
        .attr("class", 'bar')
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x1.bandwidth())
        .attr("height", function(d) { return vis.height - y(d.value); })
        .attr('fill', function(d) {

            if(d.Playoffs == "TRUE"){
                return 'url(#diagonalHatch)';
            }
        })
        .style("opacity", function(d) {
            return 0.8
        })


    group = g.append("g")
        .selectAll("g")
        .data(vis.data)
        .enter().append("g")
        .attr("transform", function(d) { return "translate(" + x0(d.Team) + ",0)"; })
        .selectAll("rect")
        .data(function(d) {
            return keys.map(
                function(key) {
                    console.log(d.City)
                    return {city: d.City, key: key, value: d[key], playoffs: d.Playoffs};
                });
        })
        .enter().append("rect")
        .attr("x", function(d) { return x1(d.key); })
        .attr("class", 'bar')
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x1.bandwidth())
        .attr("height", function(d) { return vis.height - y(d.value); })
        .attr("fill", function(d) { return z(d.key); })
        .style("opacity", function(d) {
            return 0.8
        })
        .on("mouseover", function(d) {
            console.log(d.city)
            tip.show()
            $("#tipText").html(d.city + "<br/>" + d.key + ": " + d.value);
            d3.select(this)
                .style("opacity", 1)

        })
        .on("mouseout", function(d) {
            tip.hide()
            d3.select(this)
                .style("opacity", 0.8)

        })





    //Find the mean RUSHING yards
    var rushingSum = d3.sum(vis.data, function(d) {
        return d.Rushing;
    });
    var rushingAverage = rushingSum/vis.data.length;
    var rushingLine = d3.line()
        .x(function(d, i) {
            if(vis.data.length ==12) {
                return (i * (vis.width / vis.data.length + 5.5));
            }
            if(vis.data.length ==19) {
                return (i * (vis.width / vis.data.length + 2));
            }
            else{
                return (i * (vis.width / vis.data.length + 1));

            }
        })
        .y(function(d, i) { return y(rushingAverage); });

    //Append the mean RUSHING line
    var rLine = g.append("g")
        .attr("class", "meanLine")
        .append("path")
        .datum(vis.data)
        .attr("d", rushingLine);

    //Find the mean PASSING yards
    var passingSum = d3.sum(vis.data, function(d) { return d.Passing; });
    var passingAverage = passingSum/vis.data.length;
    var passingLine = d3.line()
        .x(function(d, i) {
            if(vis.data.length ==12) {
                return (i * (vis.width / vis.data.length + 5.5));
            }
            if(vis.data.length ==19) {
                return (i * (vis.width / vis.data.length + 2));
            }
            else{
                return (i * (vis.width / vis.data.length + 1));

            }
        })
        .y(function(d, i) { return y(passingAverage); });

    //Append the mean PASSING line
    var pLine = g.append("g")
        .attr("class", "meanLine")
        .append("path")
        .datum(vis.data)
        .attr("d", passingLine);


    // Add the text for the mean lines
    g.append("text")
        .attr("x", vis.width )
        .attr("y", y(rushingAverage))
        .attr("dy", "0.32em")
        .attr("class", "meanText")
        .text("Mean rushing yards");

    g.append("text")
        .attr("x", vis.width )
        .attr("y", y(passingAverage))
        .attr("dy", "0.32em")
        .attr("class", "meanText")
        .text("Mean passing yards");


    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + vis.height + ")")
        .call(d3.axisBottom(x0));

    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("Yards");

    // Append legend
    var legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice(0))
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", vis.width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend.append("text")
        .attr("x", vis.width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });

    legend.append("rect")
        .attr("x", vis.width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend.append("text")
        .attr("x", vis.width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });



}