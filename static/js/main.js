var height = 2048,
    width = 2048,
    trunkX = width / 2.0,
    trumkY0 = height,
    svgContainer = d3.select("body").append("svg")
                                    .attr("width", width)
                                    .attr("height", height),
    tree;


tree = new Tree(new Point(trunkX, trumkY0), Math.PI / 2);
tree.draw(svgContainer);





