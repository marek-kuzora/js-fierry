YUI.add( 'fierry.pfc.test', function( Env ) {

var pkg = Env.namespace('performance');
pkg.registerGroup({
  name: 'array',
  args: [25000, 50000, 100000, 150000, 250000, 500000]
});

pkg.registerGroup({
  name: 'array.join',
});

pkg.registerGroup({
  name: 'array.join.str'
});

pkg.registerTest({
  name: 'array.join.str.small-default',
  
  before: function() {
    this.arr = ['a', 'b', 'c', 'd', 'e'];
  },
  run: function() {
    this.arr.join();
  }
});

pkg.registerTest({
  name: 'array.join.str.small-dot',
  
  before: function() {
    this.arr = ['a', 'b', 'c', 'd', 'e'];
  },
  run: function() {
    this.arr.join('.');
  }
});

pkg.registerTest({
  name: 'array.join.str.standard',
  
  before: function() {
    this.arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  },
  run: function() {
    this.arr.join();
  }
});

pkg.registerTest({
  name: 'array.join.str.complex',
  args: [10000, 15000, 25000],

  before: function() {
    this.arr = ["ania", ["ale", "nie", "ma", "mnie"], "ma", "kota", ["dada", "i", "ii", "iii", "costam"]];
  },
  run: function() {
    this.arr.join();
  }
});



}, '3.0' ,{requires:[]});

