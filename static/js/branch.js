function Branch(base, tip) {
  this.base = base;
  this.tip = tip;
  this.branchLength = Math.sqrt(
    Math.pow(this.base.x - this.tip.x, 2) +
    Math.pow(this.tip.x - this.tip.y, 2));
}

Branch.prototype.toString = function() {
  return `Branch(Length: ${this.branchLength}; Base: ${this.base.toString()}; Tip: ${this.tip.toString()}`;
}