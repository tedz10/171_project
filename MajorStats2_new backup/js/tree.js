// to do

// add tool tip
// fix text layout

var treeData =
    {"name": "Points Per Game: ≤ 23.85", "gini":0.46, "samples":256, "value":[164,92], "color":"LightPink",

        "children":
            [{"name": "Turnover Differential ≤ 3.5", "gini":0.444, "samples":93, "value":[31,62], "color":"LightPink",
                "children":[{"name": "Rushing Yards ≤1400.5", "gini":0.262, "samples":58, "value":[9,49], "color":"LightPink",

                    "children":[{"name": "Opp. Off. Yards ≤ 6112.0", "gini":0.219, "samples":56, "value":[7,49], "color":"LightPink",

                        "children":[{"name":"Off. Yards per Play≤ 6.15","gini":0.49, "samples":7, "value":[4,3], "color":"LightPink",

                            "children":[{"gini":0.0, "samples":3, "value":[0,3],"color":"LightPink"},
                                {"gini":0.0, "samples":4, "value":[4,0],"color":"LightGreen"}]
                        },

                            {"name":"Off. Yards per Play≤ 4.8", "gini":0.115, "samples":49, "value":[3,46], "color":"LightGreen",

                                "children":[{"name":"Opp. Red Zone Perc. ≤ 35.55", "gini":0.08, "samples":48, "value":[2,46],"color":"LightPink",

                                    "children":[{
                                        // "name":"Passing Yards_x ≤ 3136.0",
                                        "gini":0.042, "samples":47, "value":[1,46],"color":"LightPink",

                                        // "children":[{"gini":0.0, "samples":44, "values":[0,44], "color":"LightPink"},
                                        //     {"name":"Passing Yards_x ≤ 3033.5", "gini":0.444, "samples":3, "value":[1,2], "color":"LightGreen",
                                        //
                                        //         "children":[{"gini":0.0, "samples":1, "value":[1,0],"color":"LightPink"},
                                        //             {"gini":0.0, "samples":2, "value":[0,2], "color":"LightGreen"}]
                                        //
                                        //     }]

                                    },

                                        {"gini":0.0, "samples":1, "value":[1,0],"color":"LightGreen"}]
                                },

                                    {"gini":0.0, "samples":1, "value":[1,0],"color":"LightGreen"}]
                            }]

                    },
                        {"gini":0.0, "samples":2, "value":[2,0], "color":"LightGreen"}]
                },

                    {"name": "Opp. Off. Yards ≤ 5981.0", "gini":0.467, "samples":35, "color":"LightGreen",
                        "children":[{"gini":0.0, "samples":11, "value":[11,0], "color":"LightPink"},

                            {"name": "Opp. Off. Yards ≤ 5641.0", "gini":0.497, "samples":24, "value":[11,13], "color":"LightGreen",

                                "children":[{"gini":0.0, "samples":6, "value":[0,6],"color":"LightPink"},
                                    {"name":"Times Sacked_x ≤ 30.0", "gini":0.475, "sample":18, "value":[11,7], "color":"LightGreen",

                                        "children":[{"name":"Passing Yards_x ≤ 4718.5", "gini":0.198, "samples":9, "value":[8,1], "color":"LightPink",

                                            "children":[{"gini":0.0, "samples":1, "value":[0,1],"color":"LightPink"},

                                                {"gini":0.0, "samples":8,"value":[8,0],"color":"LightGreen"}]
                                        },



                                            {"name":"Penalty Yards ≤ 791.0", "gini":0.444, "samples":9, "value":[3,6], "color":"LightGreen",

                                                "children":[{"name":"Turnover Differential ≤ -9.0", "gini":0.245, "samples":7, "value":[1,6], "color":"LightPink",


                                                    "children":[{"gini":0.0, "samples":6, "value":[0,6], "color":"LightPink"},

                                                        {"gini":0.0, "samples":1, "value":[1,0],"color":"LightGreen"}]

                                                },


                                                    {"gini":0.0, "samples":2, "value":[2,0],"color":"LightGreen"}]


                                            }]


                                    }]

                            }

                        ]

                    }

                ]

            },

                {"name": "Opp. Off. Yards ≤ 4696", "gini":0.3, "samples":163, "value":[133, 30], "color":"LightGreen",

                    "children":[{"name": "Rushing Yards ≤2529.5", "gini":0.223, "samples":149, "value":[130, 19],"color":"LightPink",

                        "children":[{"gini":0.0, "samples":3, "value":[0,3], "color":"LightPink"},

                            {"name": "Turnover Differential ≤ -2.5","gini":0.195, "samples":146, "value":[130,16], "color":"LightGreen",

                                "children":[{"name":"Rushing Yards_x ≤ 1425.0", "gini":0.32, "samples":65, "value":[52,13], "color":"LightPink",

                                    "children":[{
                                        // "name":"Opp. Times Sacked_x ≤ 20.5",
                                        "gini":0.278, "samples":60, "value":[50,10], "color":"LightPink",

                                        // "children":[{
                                        // "name":"Opp. Red Zone Perc. ≤ 56.15",
                                        //     "gini":0.259, "samples":59, "value":[50,9], "color":"LightPink",


                                        // "children":[{"name":"Opp. Times Sacked_x ≤ 39.0", "gini":0.444, "samples":15, "value":[10,5], "color":"LightPink",
                                        //
                                        //     "children":[{"name":"Penalty Yards ≤ 994.0", "gini":0.32, "samples":5, "value":[1,4], "color":"LightPink",
                                        //
                                        //         "children":[{"gini":0.0, "samples":1, "value":[1,0], "color":"LightPink"},
                                        //             {"gini":0.0, "samples":4, "value":[0,4], "color":"LightGreen"}]
                                        //
                                        //     },
                                        //
                                        //
                                        //         {"name":"" +
                                        //                 "er Play ≤ 5.75", "gini":0.18, "samples":10, "value":[9,1], "color":"LightGreen",
                                        //
                                        //             "children":[{"name":"Penalty Yards ≤ 990.5", "gini":0.5, "samples":2, "value":[1,1], "color":"LightPink",
                                        //
                                        //                 "children":[{"gini":0.0, "samples":1, "value":[0,1], "color":"LightPink"},
                                        //                     {"gini":0.0, "samples":1, "value":[1,0], "color":"LightGreen"}]
                                        //
                                        //
                                        //             },
                                        //
                                        //                 {"gini":"0.0", "samples":8, "value":[8,0], "color":"LightGreen"}]
                                        //
                                        //
                                        //         }]
                                        //
                                        //
                                        // },
                                        //
                                        //
                                        //     {"name": "Passing Yards_x ≤ 3046.0","gini":"0.165", "samples":44, "value":[40,4], "color":"LightGreen",
                                        //
                                        //
                                        //         "children":[{"name":"Thrid Down Perc. ≤ 44.05","gini":"0.059", "samples":33, "value":[32,1], "color":"LightPink",
                                        //
                                        //
                                        //             "children":[{"name":"Turnover Differential ≤ -1.0","gini":"0.5", "samples":2, "value":[1,1], "color":"LightPink",
                                        //
                                        //                 "children":[{"gini":0.0, "samples":1, "value":[1,0],"color":"LightPink"},
                                        //                     {"gini":0.0, "samples":1, "value":[0,1],"color":"LightGreen"}]
                                        //             },
                                        //
                                        //
                                        //
                                        //                 {"gini":0.0, "samples":31, "value":[31,0],"color":"LightGreen"}]
                                        //
                                        //
                                        //
                                        //         },
                                        //
                                        //
                                        //             {"name":"Rushing Yards_x ≤ 2016.5","gini":"0.397", "samples":11, "value":[8,3], "color":"LightGreen",
                                        //
                                        //                 "children":[{"gini":0.0, "samples":2, "value":[0,2],"color":"LightPink"},
                                        //
                                        //
                                        //                     {"name":"Passing Yards_x ≤ 3013.0", "gini":0.198, "samples":9, "value":[8,1], "color":"LightGreen",
                                        //
                                        //                         // "children":[{"gini":0.0, "samples":1, "value":[0,1],"color":"LightPink"},
                                        //
                                        //                             // {"gini":0.0, "samples":8, "value":[8,0],"color":"LightGreen"}]
                                        //
                                        //
                                        //                     }]
                                        //
                                        //
                                        //             }]
                                        //
                                        //
                                        //     }]


                                        // },
                                        //
                                        //     {"gini":0.0, "samples":1, "value":[0,1], "color":"LightGreen"}]


                                    },

                                        {"name":"Off. Yards Per Play ≤ 5.1","gini":"0.48", "samples":5, "value":[2,3], "color":"LightGreen",
                                            "children":[{"gini":0.0, "samples":3, "value":[0,3],"color":"LightPink"},
                                                {"gini":0.0, "samples":2, "value":[2,0],"color":"LightGreen"}]

                                        }]


                                },

                                    {"name":"Opp. Red Zone Perc. ≤ 50.95", "gini":0.071, "samples":81, "value":[78,3],"color":"LightGreen",



                                        "children":[{"gini":0.0, "samples":60, "value":[60,0],"color":"LightPink"},


                                            {"name":"Opp. Off. Yards ≤ 5268.0", "gini":0.245, "samples":21, "value":[18,3],"color":"LightGreen",

                                                "children":[{"name":"Third Down Perc. ≤ 42.4", "gini":0.18, "samples":20, "value":[18,2],"color":"LightPink",


                                                    "children":[{"gini":0.0, "samples":1, "value":[0,1],"color":"LightPink"},


                                                        {
                                                            // "name":"Times Sacked_x ≤ 36.0",
                                                            "gini":0.1, "samples":19, "value":[18,1],"color":"LightGreen",


                                                            // "children":[{"gini":0.0, "samples":15, "value":[15,0],"color":"LightPink"},
                                                            //
                                                            //     {"name":"Time Sacked_x ≤ 31.5", "gini":0.375, "samples":4, "value":[3,1],"color":"LightGreen",
                                                            //
                                                            //
                                                            //         "children":[{"gini":0.0, "samples":1, "value":[0,1],"color":"LightPink"},
                                                            //
                                                            //             {"gini":0.0, "samples":3, "value":[3,0],"color":"LightGreen"}]
                                                            //
                                                            //     }]


                                                        }]

                                                },
                                                    {"gini":0.0, "samples":1, "value":[0,1],"color":"LightGreen"}]

                                            }]

                                    }]

                            }

                        ]
                    },

                        {"name": "Turnover Differential ≤ -8.5", "gini":0.337, "samples":14, "value":[3,11],"color":"LightGreen",

                            "children":[{"gini":0.0, "samples":10, "value":[0,10],"color":"LightPink"},

                                {"name":"Opp. Off. Yards ≤ 4380.5", "gini":0.375, "samples":4, "value":[3,1],"color":"LightGreen",

                                    "children":[{"gini":0.0, "samples":3, "value":[3,0],"color":"LightPink"},

                                        {"gini":0.0, "samples":1, "value":[0,1],"color":"LightGreen"}]

                                }]

                        }

                    ]

                }

            ]

    };









// Set the dimensions and margins of the diagram
var margin = {top: 0, right: 90, bottom: 0, left: 160},
    width = 1000 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#tree").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate("
        + margin.left + "," + margin.top + ")");

// create legend
var svgTree = d3.select("#treeLegend").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", 150)
    .append("g")
    .attr("transform", "translate("
        + margin.left + "," + margin.top + ")");
var TreeLegendSmudge = 20;
svgTree
    .append("text")
    // .attr("class", "treeLegend")
    .attr("x", 0)
    .attr("y", 10 + TreeLegendSmudge)
    .attr("class", "treeLegendLabel")
    .text("Legend")
    .style("font-weight", "bold")
    .style("font-size", "16px")
svgTree
    .append("rect")
    // .attr("class", "treeLegend")
    .attr("x", 0)
    .attr("y", 20+ TreeLegendSmudge)
    .attr("fill", "LightPink")
    .attr("width", 20)
    .attr("height", 20);

svgTree
    .append("text")
    // .attr("class", "treeLegend")
    .attr("x", 30)
    .attr("y", 35+ TreeLegendSmudge)
    .text("Majority of teams in node missed playoffs")



svgTree
    .append("rect")
    // .attr("class", "treeLegend")
    .attr("x", 0)
    .attr("y", 50+ TreeLegendSmudge)
    .attr("fill", "LightGreen")
    .attr("width", 20)
    .attr("height", 20);

svgTree
    .append("text")
    // .attr("class", "treeLegend")
    .attr("x", 30)
    .attr("y", 65+ TreeLegendSmudge)
    .text("Majority of teams in node made playoffs")

svgTree
    .append("text")
    // .attr("class", "treeLegend")
    .attr("x", 0)
    .attr("y", 100+ TreeLegendSmudge)
    .text("[x, y]: x teams in node did not make playoffs, y teams made playoffs")
    // .attr("fill", "LightGreen")
    // .attr("width", 20)
    // .attr("height", 20);


// create arrows and lines
var smudge = 55
svg.append("line")
    .attr("class", "line1")
    .attr("x1", -150)
    .attr("y1", height/2 - 80 - smudge)
    .attr("x2", -75)
    .attr("y2", height/2 - 120 - smudge)
    .attr("stroke-width", 1)
    .attr("stroke", "black")
    .attr("marker-end", "url(#triangle)");

svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle")
    .attr("refX", 6)
    .attr("refY", 6)
    .attr("markerWidth", 30)
    .attr("markerHeight", 30)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 12 6 0 12 3 6")
    .style("fill", "black");

svg
    .append("text")
    .attr("class", "treeFalse")
    .attr("x", -150)
    .attr("y", height/2 - 170)
    .text("False");

svg.append("line")
    .attr("class", "line2")
    .attr("x1", -150)
    .attr("y1", height/2 + 80 + smudge)
    .attr("x2", -100)
    .attr("y2", height/2 + 120 + smudge)
    .attr("stroke-width", 1)
    .attr("stroke", "black")
    .attr("marker-end", "url(#triangle)");

svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle")
    .attr("refX", 6)
    .attr("refY", 6)
    .attr("markerWidth", 30)
    .attr("markerHeight", 30)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 12 6 0 12 3 6")
    .style("fill", "black");
svg
    .append("text")
    .attr("class", "treeTrue")
    .attr("x", -150)
    .attr("y", height/2 + 170)
    .text("True");


var i = 0,
    duration = 750,
    root;

// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);

// Assigns parent, children, height, depth
root = d3.hierarchy(treeData, function(d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

// Collapse after the second level
root.children.forEach(collapse);

update(root);

// Collapse the node and all it's children
function collapse(d) {
    if(d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
    }
}

function update(source) {

    // Assigns the x and y position for the nodes
    var treeData = treemap(root);

    // Compute the new tree layout.
    var nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(function(d){ d.y = d.depth * 110});

    // ****************** Nodes section ***************************

    // Update the nodes...
    var node = svg.selectAll('g.node')
        .data(nodes, function(d) {return d.id || (d.id = ++i); });

    // Enter any new modes at the parent's previous position.
    var nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", function(d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on('click', click);

    // Add Circle for the nodes
    nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style("fill", function(d) {
            // return d._children ? "lightsteelblue" : "#fff";
            return d.data.color;
        });

    // Add labels for the nodes
    nodeEnter.append('text')
        .attr("dy", ".1em")
        // .attr("dy", function(d){
            // return "12px";}
        //     console.log(d)
        //     if (d.height%2 ===0){
        //         console.log("top")
        //         return "-1em"
        //     }
        //     else{
        //         console.log("bottom")
        //         return "1em"
        //     }
        // })
        .attr("x", function(d) {
            return d.children || d._children ? -20 : 13;
        })
        .attr("text-anchor", function(d) {
            return d.children || d._children ? "end" : "start";
        })
        .text(function(d) {
            if (d.data.name){
                // console.log("What")
                return d.data.name;
            }
            else{
                // console.log("yeah")
                return fixStr(d.data.value);
            }

        })
        .attr("border", "3px")
        // .style("fill-opacity", 1e-6);

    // UPDATE
    var nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate.transition()
        .duration(duration)
        .attr("transform", function(d) {
            return "translate(" + d.y + "," + d.x + ")";
        });

    // Update the node attributes and style
    nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style("fill", function(d) {
            // return d._children ? "lightsteelblue" : "#fff";
            return d.data.color;
        })
        .attr('cursor', 'pointer');
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // create mouse controls
    nodeEnter.on("mouseover", function(d){
        console.log(d)
        div.transition()
            .duration(200)
            .style("opacity", 1);
        div	.html("Samples in Node: " + d.data.samples + "</br>" + "Playoff split: " + "[" +d.data.value + "] </br>" +  "Gini: " + d.data.gini)
            .style("left", (d3.event.pageX - 69 ) + "px")
            .style("top", (d3.event.pageY - 69 - 10) + "px");
    })
        .on("mouseout", function(d) {
            div.transition()
                .duration(100)
                .style("opacity", 0);
        });

    // Remove any exiting nodes
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) {
            return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
        .attr('r', 1e-6);

    // On exit reduce the opacity of text labels
    nodeExit.select('text')
        .style('fill-opacity', 1e-6);

    // ****************** links section ***************************

    // Update the links...
    var link = svg.selectAll('path.link')
        .data(links, function(d) { return d.id; });

    // Enter any new links at the parent's previous position.
    var linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', function(d){
            var o = {x: source.x0, y: source.y0}
            return diagonal(o, o)
        });

    // UPDATE
    var linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate.transition()
        .duration(duration)
        .attr('d', function(d){ return diagonal(d, d.parent) });

    // Remove any exiting links
    var linkExit = link.exit().transition()
        .duration(duration)
        .attr('d', function(d) {
            var o = {x: source.x, y: source.y}
            return diagonal(o, o)
        })
        .remove();

    // Store the old positions for transition.
    nodes.forEach(function(d){
        d.x0 = d.x;
        d.y0 = d.y;
    });

    // console.log(nodes[0])

    var moveLine = 50;

    var line1 = svg.selectAll(".line1")

    line1.enter().append()
        .attr("class", "line1")
        .merge(line1)
        .transition()
        .duration(duration)
        .attr("y1", nodes[0].x - 25)
        .attr("y2", nodes[0].x - 100)
        .attr("x1", -125)
        .attr("x2", -50);

    line1.exit().remove()

    var text1 = svg.selectAll(".treeFalse")

    text1.enter().append()
        .attr("class", "textFalse")
        .merge(text1)
        .transition()
        .duration(duration)
        .attr("y", nodes[0].x - 100)
        .attr("x", -120);

    text1.exit().remove()


    var line2 = svg.selectAll(".line2")

    line2.enter().append()
        .attr("class", "line12")
        .merge(line2)
        .transition()
        .duration(duration)
        .attr("y1", nodes[0].x + 25)
        .attr("y2", nodes[0].x + 100)
        .attr("x1", -125)
        .attr("x2", -50);

    line2.exit().remove()

    var text2 = svg.selectAll(".treeTrue")

    text2.enter().append()
        .attr("class", "textTrue")
        .merge(text2)
        .transition()
        .duration(duration)
        .attr("y", nodes[0].x + 100)
        .attr("x", -120);

    text2.exit().remove()

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {

        path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

        return path
    }

    // Toggle children on click.
    function click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }

    function fixStr(s){


        var x = s[0];
        var y = s[1];

        var out = "[" + x + "," + " " + y + "]";
        // console.log(out)
        return out;
    }
}