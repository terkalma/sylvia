function Normal(mean, std) {
  this.EPS = 1.0 / Math.pow(2, 32);
  this.mean = mean;
  this.std = std;
}

Normal.prototype.next = function() {
  var u = Math.random(),
      v = Math.random(),
      s = u * u + v * v;

  if (s >= 1 || s <= this.EPS) {
    return this.next();
  }

  return this.mean + this.std * u * Math.sqrt(-2 * Math.log(s) / s);
}

Normal.prototype.collect = function(n) {
  var arr = [],
      i = n;

  for (;i--;) { arr.push(this.next()); }

  return arr;
}

Lognormal = function(mean, std) {
  this.normal = new Normal(mean, std);
}

Lognormal.prototype.next = function () {
  return Math.pow(Math.E, this.normal.next());
}

Uniform = function(a, b) {
  this.a = a;
  this.b = b;
}

Uniform.prototype.next = function() {
  return this.a + (this.b-this.a) * Math.random();
}