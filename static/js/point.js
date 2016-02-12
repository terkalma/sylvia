function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function() {
  return `X: ${this.x}; Y: ${this.y}`;
}