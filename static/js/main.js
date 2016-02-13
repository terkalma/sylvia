var forrest = function () {
    var height = $(document).height() * 0.9,
    width = $(document).width() * 0.9,
    trunkX = width / 2.0,
    trumkY0 = height,
    svgContainer,
    tree;

    d3.select("svg").remove();
    svgContainer = d3.select("body").append("svg")
                                    .attr("width", width)
                                    .attr("height", height);
    tree = new Tree(new Point(trunkX, trumkY0), Math.PI / 2);
    tree.draw(svgContainer);
};

$(function ()  { forrest(); setInterval(forrest, 1000); });