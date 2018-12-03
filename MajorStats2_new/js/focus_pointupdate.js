function initialize_focus_point() {
    // append the focus lines
    focus_line = d3.select("#bubble_div").append("g")
        .attr("class", "focus_line")
        .style("display", "none")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //
    // vertical_line = focus_line.append("line")
    //     .attr("class", "hover-line")
    // horizontal_line = focus_line.append("line")
    //     .attr("class", "hover-line")

    // append focus tip text
    focus_tip = d3.select('#bubble_div')
        .append("div")
        .attr("class", "tip")
        .style("opacity", 0.0)

    focus_title = focus_tip.append("div")
        .attr("class", "tip_title")

    focus_text = focus_tip.append("div").append("div")
        .attr("class", "tip_detail")
}

function draw_focus_line(circle_data) {

    var cx = xScale(+circle_data.Offensive_Yards_Allowed);
    var cy = yScale(+circle_data.Total_Wins);
    var r = rScale(+circle_data.Total_Wins);

    // set the start point and end point of vertical line 
    // vertical_line.attr("x1", cx)
    //     .attr("y1", cy)
    //     .attr("x2", cx)
    //     .attr("y2", svg_height)
    //
    // //set the start point and end point of horizontal line
    // horizontal_line.attr("x1", 0)
    //     .attr("y1", cy)
    //     .attr("x2", cx)
    //     .attr("y2", cy)


    focus_tip.style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + 20 + "px")
        .style("opacity", 1.0)

    focus_title.html(circle_data.Team1 + " " + circle_data.Year)

    focus_text.html(
        "Offensive Yards Allowed: " + circle_data.Offensive_Yards_Allowed + "<br>" +
        "Total Wins: " + circle_data.Total_Wins + "<br>" //+
        //"Population: " + circle_data.Population + "<br>"
    )
}