function create_traces() {

    // ############################################
    // circle's traces enter......
    trace_dataset = dataset.filter(function(d) {
        if (checked_country.length > 0) {
            return checked_country.includes(d.Country) && display_year >= +d.Year;
        }
        return false;
    })

    var traces = d3.select(".bubbles")

    path_dict = {}
    for (var i = checked_country.length - 1; i >= 0; i--) {
        path_dict[checked_country[i]] = ""
    }

    for (var i = 0; i < trace_dataset.length - 1; i++) {
        var circle_data = trace_dataset[i]

        if (document.getElementById("trace_checkBox").checked) {

            traces.append("circle")
                .attr("id", "traces")
                .attr("cx", xScale(+trace_dataset[i].Offensive_Yards_Allowed))
                .attr("cy", yScale(+trace_dataset[i].Total_Wins))
                .attr("r", rScale(+trace_dataset[i].Total_Wins))
                .style("fill", function(d){
                    if(trace_dataset[i].Playoff_Made == "TRUE")
                        return "LightGreen";
                    else
                        return "LightPink";
                })
                //.style("fill", colors_areas[trace_dataset[i].Region])
                .style("pointer-events", "all")
                .style("stroke", "black")
                .style("stroke-width", 0.1)
                .style("opacity", initial_circle_opacity)
        }

        if (document.getElementById("line_checkBox").checked) {
            if (path_dict[trace_dataset[i].Team1] == "") {
                path_dict[trace_dataset[i].Team1] += "M " + xScale(+trace_dataset[i].Offensive_Yards_Allowed) + " " + yScale(+trace_dataset[i].Total_Wins)
            } else {
                path_dict[trace_dataset[i].Team1] += " L " + xScale(+trace_dataset[i].Offensive_Yards_Allowed) + " " + yScale(+trace_dataset[i].Total_Wins)
            }
        }
    }

    if (document.getElementById("line_checkBox").checked) {
        for (var i = checked_country.length - 1; i >= 0; i--) {
            traces.append("path")
                .attr("d", path_dict[checked_country[i]])
                .attr("id", "traces")
                .attr("stroke", colors_areas[country_region_dict[checked_country[i]]])
                .attr("stroke-width", "2")
                .attr("fill", "none")
        }
    }

}
