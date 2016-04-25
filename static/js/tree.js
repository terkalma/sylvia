function Tree(base, angle, options) {
  var trunkLength, tipX, tipY, tip;

  this.setOptions(options || {});

  trunkLength = this.lengthDistribution.next();
  tipX = base.x + trunkLength * Math.cos(angle);
  tipY = base.y - trunkLength * Math.sin(angle);
  tip = new Point(tipX, tipY);

  this.trunk = new Branch(base, tip);
  this.branches = [];
  this.generateSubtrees();

  // console.log(this.toString());
}

Tree.prototype.setOptions = function(options) {
  this.options = _.defaults(options, this.defaultOptions());

  for (option in options) {
    if (options.hasOwnProperty(option)) {
      eval(`this.${option} = options[option]`);
    }
  }
}

Tree.prototype.defaultOptions = function() {
  return {
    generateSubtrees: function() {
      // binary tree with depth 10
      if (this.level < 8) {
        this.addBranch();
        this.addBranch();
      }
    },
    lengthDistribution: new Lognormal(3, 1),
    angleDistribution: new Uniform(0, Math.PI),
    level: 0,
    parent: null
  }
}

Tree.prototype.toString = function() {
  return `Tree(Level: ${this.level}; Trunk: ${this.trunk.toString()})`;
}

Tree.prototype.addBranch = function() {
  var angle = this.angleDistribution.next(),
      options = _.defaults({
        level: this.level + 1,
        parent: this
      }, this.options);

  this.branches.push(new Tree(this.trunk.tip, angle, options));
}

Tree.prototype.draw = function(svgContainer) {
  var lineFunction = d3.svg.line()
                           .x(function(d) { return d.x; })
                           .y(function(d) { return d.y; })
                           .interpolate("basis");

  var noise = new Normal(0, 10);

  var point1 = new Point((this.trunk.base.x * 2 + this.trunk.tip.x) / 3 + noise.next(), (this.trunk.base.y * 2 + this.trunk.tip.y) / 3 + noise.next());
  var point2 = new Point((this.trunk.base.x + this.trunk.tip.x * 2) / 3 + noise.next(), (this.trunk.base.y + this.trunk.tip.y * 2) / 3 + noise.next());

  svgContainer.append("path")
              .attr("d", lineFunction([this.trunk.base, point1, point2, this.trunk.tip]))
              .attr("stroke-width", 10 - this.level)
              .attr("stroke", "#DDD")
              .attr("fill", "none");

  _.each(this.branches, function(subTree) { subTree.draw(svgContainer); })
}