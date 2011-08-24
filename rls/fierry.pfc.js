YUI.add( 'fierry.pfc.dom', function( Env ) {

var dom = Env.namespace('dom');
var event = Env.namespace('Event');
var pkg = Env.namespace('performance.dom');
var test = Env.namespace('performance.register_test');
var group = Env.namespace('performance.register_group');
var repeat = Env.namespace('performance.register_tests_from');
(function() {
  group('/dom', {
    before: function() {
      return this.stub = dom.$('stub');
    },
    after: function() {
      return this.stub = dom.replace_html(this.stub);
    }
  });
}).call(this);

(function() {
  group('/dom.styles', {
    before: function() {
      this.flag = true;
      return this.div = document.createElement('div');
    }
  });
  test('background', {
    run: function() {
      this.flag = !this.flag;
      if (this.flag) {
        this.div.style.background = 'black';
      }
      if (!this.flag) {
        return this.div.style.background = 'white';
      }
    }
  });
  test('position', {
    run: function() {
      this.flag = !this.flag;
      if (this.flag) {
        this.div.style.position = 'absolute';
      }
      if (!this.flag) {
        return this.div.style.position = 'static';
      }
    }
  });
  test('opacity', {
    run: function() {
      this.flag = !this.flag;
      if (this.flag) {
        this.div.style.opacity = '0.5';
      }
      if (!this.flag) {
        return this.div.style.opacity = '1.0';
      }
    }
  });
}).call(this);

(function() {
  group('/dom.selectors');
  test('getElementById', {
    run: function() {
      return document.getElementById('stub');
    }
  });
  test('getElementsByTagName', {
    run: function() {
      return document.getElementsByTagName('div');
    }
  });
  test('querySelector', {
    run: function() {
      return document.querySelector('#stub');
    }
  });
  test('querySelectorAll', {
    run: function() {
      return document.querySelectorAll('#stub');
    }
  });
}).call(this);

(function() {
  group('/dom.replace');
  group('small', {
    before: function() {
      this.html = '<div></div><span>text node</span><a></a>';
      return this.arr = dom.create_html(this.html);
    }
  });
  test('naive', {
    run: function() {
      var e, _i, _len, _ref;
      this.arr = [];
      this.arr[0] = document.createElement('div');
      this.arr[1] = document.createElement('span');
      this.arr[2] = document.createElement('a');
      this.arr[1].appendChild(document.createTextNode('text node'));
      _ref = this.arr;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        this.stub.appendChild(e);
      }
      return this.stub = dom.replace_html(this.stub);
    }
  });
  test('naive -cached', {
    run: function() {
      var e, _i, _len, _ref;
      _ref = this.arr;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        this.stub.appendChild(e.cloneNode(true));
      }
      return this.stub = dom.replace_html(this.stub);
    }
  });
  test('fragment -cached', {
    run: function() {
      var e, frag, _i, _len, _ref;
      frag = document.createDocumentFragment();
      _ref = this.arr;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        frag.appendChild(e);
      }
      this.stub.appendChild(frag.cloneNode(true));
      return this.stub = dom.replace_html(this.stub);
    }
  });
  test('inner_html', {
    run: function() {
      this.stub.innerHTML = this.html;
      return this.stub.innerHTML = '';
    }
  });
  test('replace_html', {
    run: function() {
      return this.stub = dom.replace_html(this.stub, this.html);
    }
  });
  group('flat', {
    before: function() {
      this.html = '<a>A</a><a>B</a><a>C</a><a>D</a><a>E</a><a>F</a>\n<a>G</a><a>H</a><a>I</a><a>J</a><a>K</a><a>L</a>\n<a>M</a><a>N</a><a>O</a>';
      return this.arr = dom.create_html(this.html);
    }
  });
  test('naive', {
    run: function() {
      var a, _;
      for (_ = 1; _ <= 25; _++) {
        a = document.createElement('a');
        a.appendChild(document.createTextNode('A'));
        this.stub.appendChild(a);
      }
      return this.stub = dom.replace_html(this.stub);
    }
  });
  test('naive -bad', {
    run: function() {
      var a, _;
      for (_ = 1; _ <= 25; _++) {
        a = document.createElement('a');
        this.stub.appendChild(a);
        a.appendChild(document.createTextNode('A'));
      }
      return this.stub = dom.replace_html(this.stub);
    }
  });
  repeat('small');
  group('deep', {
    before: function() {
      this.html = '<div><div><div>\n  <p><a><span>text node</span></a></p>\n  <p><a><span>text node</span></a></p>\n  <p><a><span>text node</span></a></p>\n</div></div></div>\n<div><div><div>\n  <p><a><span>text node</span></a></p>\n  <p><a><span>text node</span></a></p>\n  <p><a><span>text node</span></a></p>\n</div></div></div>';
      return this.arr = dom.create_html(this.html);
    }
  });
  test('naive', {
    run: function() {
      var a, div_0, div_1, div_2, p, s, _i, _j;
      for (_i = 0; _i <= 1; _i++) {
        div_0 = document.createElement('div');
        div_1 = document.createElement('div');
        div_2 = document.createElement('div');
        for (_j = 0; _j <= 2; _j++) {
          p = document.createElement('p');
          a = document.createElement('a');
          s = document.createElement('span');
          dom.append_text(s, 'text node');
          a.appendChild(s);
          p.appendChild(a);
          div_2.appendChild(p);
        }
        div_1.appendChild(div_2);
        div_0.appendChild(div_1);
        this.stub.appendChild(div_0);
      }
      return this.stub = dom.replace_html(this.stub);
    }
  });
  test('naive -bad', {
    run: function() {
      var a, div_0, div_1, div_2, p, s, _i, _j;
      for (_i = 0; _i <= 1; _i++) {
        div_0 = document.createElement('div');
        div_1 = document.createElement('div');
        div_2 = document.createElement('div');
        this.stub.appendChild(div_0);
        div_0.appendChild(div_1);
        div_1.appendChild(div_2);
        for (_j = 0; _j <= 2; _j++) {
          p = document.createElement('p');
          a = document.createElement('a');
          s = document.createElement('span');
          div_2.appendChild(p);
          p.appendChild(a);
          a.appendChild(s);
          dom.append_text(s, 'text node');
        }
      }
      return this.stub = dom.replace_html(this.stub);
    }
  });
  repeat('small');
}).call(this);

(function() {
  group('/dom.attrs', {
    before: function() {
      this.flag = true;
      return this.div = document.createElement('div');
    }
  });
  test('id', {
    run: function() {
      this.flag = !this.flag;
      if (this.flag) {
        this.div.setAttribute('id', 'aaaaaa');
      }
      if (!this.flag) {
        return this.div.setAttribute('id', 'zzzzzz');
      }
    }
  });
  test('class', {
    run: function() {
      this.flag = !this.flag;
      if (this.flag) {
        this.div.className = 'title';
      }
      if (this.flag) {
        return this.div.className = 'normal';
      }
    }
  });
  test('title', {
    run: function() {
      this.flag = !this.flag;
      if (this.flag) {
        this.div.setAttribute('title', 'aaaaaa');
      }
      if (!this.flag) {
        return this.div.setAttribute('title', 'zzzzzz');
      }
    }
  });
}).call(this);

(function() {
  group('/dom.events', {
    before: function() {
      this.flag = true;
      this.a = function() {
        return 'a';
      };
      this.b = function() {
        return 'b';
      };
      return this.div = document.createElement('div');
    }
  });
  group('w3c');
  test('attach', {
    run: function() {
      this.flag = !this.flag;
      if (this.flag) {
        this.div.addEventListener('click', this.a);
      }
      if (!this.flag) {
        return this.div.addEventListener('click', this.b);
      }
    }
  });
  test('detach', {
    run: function() {
      this.flag = !this.flag;
      if (this.flag) {
        this.div.removeEventListener('click', this.a);
      }
      if (!this.flag) {
        return this.div.removeEventListener('click', this.b);
      }
    }
  });
  test('both', {
    run: function() {
      if (this.flag = !this.flag) {
        this.div.removeEventListener('click', this.b);
        return this.div.addEventListener('click', this.a);
      } else {
        this.div.removeEventListener('click', this.a);
        return this.div.addEventListener('click', this.b);
      }
    }
  });
  group('yui');
  test('attach', {
    run: function() {
      this.flag = !this.flag;
      if (this.flag) {
        event.attach('click', this.a, this.div);
      }
      if (!this.flag) {
        return event.attach('click', this.b, this.div);
      }
    }
  });
  test('attach -new', {
    before: function() {
      return this.i = 0;
    },
    run: function() {
      var fn, i;
      i = this.i++;
      fn = function() {
        return i;
      };
      return event.attach('click', fn, this.div);
    }
  });
  test('detach', {
    run: function() {
      this.flag = !this.flag;
      if (this.flag) {
        event.detach('click', this.a, this.div);
      }
      if (!this.flag) {
        return event.detach('click', this.b, this.div);
      }
    }
  });
  test('both', {
    run: function() {
      if (this.flag = !this.flag) {
        event.detach('click', this.b, this.div);
        return event.attach('click', this.a, this.div);
      } else {
        event.detach('click', this.a, this.div);
        return event.attach('click', this.b, this.div);
      }
    }
  });
}).call(this);

(function() {
  group('/dom.append', {
    before: function() {
      this.i = 0;
      return this.node = this.stub;
    }
  });
  test('flat', {
    run: function() {
      var e;
      e = document.createElement('div');
      return this.node.appendChild(e);
    }
  });
  pkg.create_tree_test = function(count) {
    return test(count + ' nodes', {
      before: function() {
        this.i = 0;
        this.l = 0;
        this.count = count;
        this["new"] = [];
        this.arr = [this.node];
        this.len = this.arr.length;
        return this.max = Math.pow(this.count, this.l + 1);
      },
      run: function() {
        var e, p;
        p = this.arr[this.i++ % this.len];
        e = document.createElement('div');
        p.appendChild(e);
        this["new"].push(e);
        if (!(this.i < this.max)) {
          this.i = 0;
          this.l += 1;
          this.arr = this["new"];
          this["new"] = [];
          this.len = this.arr.length;
          return this.max = Math.pow(this.count, this.l + 1);
        }
      }
    });
  };
  pkg.create_tree_test(2);
  pkg.create_tree_test(5);
  pkg.create_tree_test(10);
  pkg.create_tree_test(50);
  pkg.create_tree_test(250);
  pkg.create_tree_test(1000);
}).call(this);

(function() {
  group('/dom.create');
  group('basic');
  test('create', {
    run: function() {
      return document.createElement('div');
    }
  });
  test('clone', {
    before: function() {
      return this.div = document.createElement('div');
    },
    run: function() {
      return this.div.cloneNode();
    }
  });
  group('5 elements', {
    before: function() {
      this.html = '<div></div><span>text node</span><a></a>';
      return this.arr = dom.create_html(this.html);
    }
  });
  test('naive', {
    run: function() {
      var e, root, _i, _len, _ref;
      root = document.createElement('div');
      _ref = this.arr;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        root.appendChild(e.cloneNode(true));
      }
    }
  });
  test('fragment', {
    run: function() {
      var e, frag, root, _i, _len, _ref;
      root = document.createElement('div');
      frag = document.createDocumentFragment();
      _ref = this.arr;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        frag.appendChild(e);
      }
      root.appendChild(frag.cloneNode(true));
    }
  });
  test('inner_html', {
    run: function() {
      var root;
      root = document.createElement('div');
      return root.innerHTML = this.html;
    }
  });
  group('30 elements -flat', {
    before: function() {
      this.html = '<a>A</a><a>B</a><a>C</a><a>D</a><a>E</a><a>F</a>\n<a>G</a><a>H</a><a>I</a><a>J</a><a>K</a><a>L</a>\n<a>M</a><a>N</a><a>O</a>';
      return this.arr = dom.create_html(this.html);
    }
  });
  repeat('5 elements');
  group('30 elements -deep', {
    before: function() {
      this.html = '<div><div><div>\n  <p><a><span>text node</span></a></p>\n  <p><a><span>text node</span></a></p>\n  <p><a><span>text node</span></a></p>\n</div></div></div>\n<div><div><div>\n  <p><a><span>text node</span></a></p>\n  <p><a><span>text node</span></a></p>\n  <p><a><span>text node</span></a></p>\n</div></div></div>';
      return this.arr = dom.create_html(this.html);
    }
  });
  repeat('5 elements');
}).call(this);


}, '3.0' ,{requires:['event', 'fierry.dom', 'fierry.performance']});

YUI.add( 'fierry.pfc.create', function( Env ) {

var core = Env.namespace('core');
var test = Env.namespace('performance.register_test');
var group = Env.namespace('performance.register_group');
(function() {
  group('/create');
}).call(this);

(function() {
  group('/create.object');
  group('hash');
  test(' 0 length', {
    run: function() {
      var h;
      return h = {};
    }
  });
  test(' 5 length', {
    run: function() {
      var h;
      return h = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5
      };
    }
  });
  test('10 length', {
    run: function() {
      var h;
      return h = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
        f: 6,
        g: 7,
        h: 8,
        i: 9,
        j: 10
      };
    }
  });
  group('nested');
  test(' 5 length', {
    run: function() {
      var h;
      return h = {
        a: 1,
        b: 2,
        c: {
          c: 3
        },
        d: 4,
        e: {
          e: 5
        }
      };
    }
  });
  test('10 length', {
    run: function() {
      var h;
      return h = {
        a: 1,
        b: 2,
        c: {
          c: 3
        },
        d: 4,
        e: {
          e: 5
        },
        f: 6,
        g: 7,
        h: {
          h: 8
        },
        i: 9,
        j: 10
      };
    }
  });
  group('standard');
  test(' 0 length', {
    before: function() {
      return this.h = {};
    },
    run: function() {
      return Object.create(this.h);
    }
  });
  test(' 5 length', {
    before: function() {
      return this.h = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5
      };
    },
    run: function() {
      return Object.create(this.h);
    }
  });
  test('10 length', {
    before: function() {
      return this.h = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
        f: 6,
        g: 7,
        h: 8,
        i: 9,
        j: 10
      };
    },
    run: function() {
      return Object.create(this.h);
    }
  });
  group('class');
  test('core.App', {
    run: function() {
      var o;
      return o = new core.App();
    }
  });
  test('0 length -prototype', {
    before: function() {
      this.cls = function() {};
      return this.cls.prototype = {};
    },
    run: function() {
      var o;
      return o = new this.cls();
    }
  });
  test('5 length -prototype', {
    before: function() {
      this.cls = function() {};
      return this.cls.prototype = {
        a: function() {
          return 'a';
        },
        b: function() {
          return 'b';
        },
        c: function() {
          return 'c';
        },
        d: function() {
          return 'd';
        },
        e: function() {
          return 'e';
        }
      };
    },
    run: function() {
      var o;
      return o = new this.cls();
    }
  });
  test('2 length -prototype -nested', {
    before: function() {
      this.anc = function() {};
      this.anc.prototype = {
        a: function() {
          return 'a';
        },
        b: function() {
          return 'b';
        }
      };
      this.cls = function() {};
      return this.cls.prototype = new this.anc();
    },
    run: function() {
      var o;
      return o = new this.cls();
    }
  });
}).call(this);

(function() {
  group('/create.instanceof');
  test('class -true', {
    before: function() {
      return this.o = new core.App();
    },
    run: function() {
      return this.o instanceof core.App;
    }
  });
  test('class -false', {
    before: function() {
      return this.o = new core.App();
    },
    run: function() {
      return this.o instanceof String;
    }
  });
  test('string', {
    run: function() {
      return 'a' instanceof core.App;
    }
  });
}).call(this);

(function() {
  group('/create.primitives');
  test('boolean', {
    run: function() {
      var r;
      return r = true;
    }
  });
  test('integer', {
    run: function() {
      var r;
      return r = 101;
    }
  });
  test('float', {
    run: function() {
      var r;
      return r = 1.01;
    }
  });
  test('string', {
    run: function() {
      var r;
      return r = 'string';
    }
  });
  test('regexp', {
    run: function() {
      var r;
      return r = /regexp/;
    }
  });
  group('/create.wrappers');
  test('boolean', {
    run: function() {
      var r;
      return r = new Boolean(true);
    }
  });
  test('integer', {
    run: function() {
      var r;
      return r = new Number(101);
    }
  });
  test('float', {
    run: function() {
      var r;
      return r = new Number(1.01);
    }
  });
  test('string', {
    run: function() {
      var r;
      return r = new String('string');
    }
  });
  test('regexp', {
    run: function() {
      var r;
      return r = new RegExp('regexp');
    }
  });
  group('/create.others');
  test('Date', {
    run: function() {
      var o;
      return o = new Date();
    }
  });
  test('Date.now', {
    run: function() {
      var o;
      return o = Date.now();
    }
  });
}).call(this);

(function() {
  group('/create.array');
  group('normal');
  test(' 0 length', {
    run: function() {
      var a;
      return a = [];
    }
  });
  test(' 5 length', {
    run: function() {
      var a;
      return a = [0, 1, 2, 3, 4];
    }
  });
  test('10 length', {
    run: function() {
      var a;
      return a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
  });
  test('10 length -string', {
    run: function() {
      var a;
      return a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    }
  });
  group('nested');
  test(' 5 length -nested -pre-created', {
    run: function() {
      var a, _1, _2;
      _1 = [];
      _2 = [];
      return a = [0, 1, _1, 2, _2];
    }
  });
  test('10 length -nested -pre-created', {
    run: function() {
      var a, _1, _2, _3;
      _1 = [];
      _2 = [];
      _3 = [];
      return a = [0, 1, _1, 2, 3, 4, 5, _2, 6, _3];
    }
  });
  test(' 5 length -nested', {
    run: function() {
      var a;
      return a = [0, 1, [], 2, []];
    }
  });
  test('10 length -nested', {
    run: function() {
      var a;
      return a = [0, 1, [], 2, 3, 4, 5, [], 6, []];
    }
  });
}).call(this);

(function() {
  group('/create.function');
  test('1 line -empty', {
    run: function() {
      var fn;
      return fn = function() {};
    }
  });
  test('1 line -simple', {
    run: function() {
      var fn;
      return fn = function(a, b, c) {
        return a + b + c;
      };
    }
  });
  test('1 line -compex', {
    run: function() {
      var fn;
      return fn = function() {
        return ['a', ['a', 'b', 'c'], 'b', ['a', 'b', 'c'], 'c'];
      };
    }
  });
  test('3 lines -simple', {
    run: function() {
      var fn;
      return fn = function(a, b, c) {
        var _results;
        _results = [];
        while (a !== b) {
          a++;
          _results.push(b--);
        }
        return _results;
      };
    }
  });
  test('3 lines -complex', {
    run: function() {
      var fn;
      return fn = function(a, b, c) {
        var x, y;
        x = ['a', ['a', 'b', 'c'], 'b', ['a', 'b', 'c'], 'c'];
        y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        return {
          x: x,
          y: y
        };
      };
    }
  });
}).call(this);


}, '3.0' ,{requires:['fierry.core', 'fierry.storage', 'fierry.performance']});

YUI.add( 'fierry.view', function( Env ) {

var app = Env.namespace('app');
var uid = Env.namespace('uid');
var core = Env.namespace('core');
var array = Env.namespace('array');
var assert = Env.namespace('assert');
var pkg = Env.namespace('core.view');
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  pkg.Action = (function() {
    __extends(Action, core.PriorityMap);
    function Action(uid, id, tags, _value_def, _nodes_def, _behavior) {
      this.uid = uid;
      this.id = id;
      this.tags = tags;
      this._value_def = _value_def;
      this._nodes_def = _nodes_def;
      this._behavior = _behavior;
      this.update = __bind(this.update, this);;
    }
    Action.prototype.execute = function(parent) {
      var _base, _base2, _base3, _ref;
      this.parent = parent;
      if ((_ref = this.parent) != null ? _ref.finalized : void 0) {
        this.parent.attach(this);
      }
      this._curr_daos = [];
      if (typeof (_base = this._behavior).create == "function") {
        _base.create(this);
      }
      if (typeof (_base2 = this._behavior).update == "function") {
        _base2.update(this, this._value_def());
      }
      this._children = this._process_nodes();
      this._register_all();
      if (typeof (_base3 = this._behavior).finalize == "function") {
        _base3.finalize(this);
      }
      this.finalized = true;
      return this;
    };
    Action.prototype._process_nodes = function() {
      var node, _i, _len, _ref, _results;
      _ref = this._nodes_def(this);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        _results.push(node.execute(this));
      }
      return _results;
    };
    Action.prototype.update = function() {
      var new_nodes, node, old_nodes, _base, _i, _j, _len, _len2, _ref;
      if (this.disposed) {
        return;
      }
      this._prev_daos = this._curr_daos;
      this._curr_daos = [];
      if (typeof (_base = this._behavior).update == "function") {
        _base.update(this, this._value_def());
      }
      _ref = this._get_changed_nodes(), old_nodes = _ref[0], new_nodes = _ref[1];
      for (_i = 0, _len = old_nodes.length; _i < _len; _i++) {
        node = old_nodes[_i];
        node.dispose();
      }
      for (_j = 0, _len2 = new_nodes.length; _j < _len2; _j++) {
        node = new_nodes[_j];
        node.execute(this);
      }
      this._submit_changes();
    };
    Action.prototype._get_changed_nodes = function() {
      var a, arra, arrb, b, new_nodes, old_nodes, ua, ub;
      old_nodes = [];
      new_nodes = [];
      a = 0;
      b = 0;
      arra = this._children;
      arrb = this._nodes_def(this);
      while (a < arra.length && b < arrb.length) {
        ua = arra[a].uid;
        ub = arrb[b].uid;
        if (ua < ub) {
          old_nodes.push(arra[a]);
          a++;
        }
        if (ua > ub) {
          new_nodes.push(arrb[b]);
          b++;
        }
        if (ua === ub) {
          a++;
          b++;
        }
      }
      if (a < arra.length) {
        old_nodes = old_nodes.concat(arra.slice(a));
      }
      if (b < arrb.length) {
        new_nodes = new_nodes.concat(arrb.slice(b));
      }
      return [old_nodes, new_nodes];
    };
    Action.prototype.dispose = function() {
      var n, _base, _i, _len, _ref;
      if (this.parent && !this.parent.disposed) {
        this.parent.detach(this);
      }
      this.disposed = true;
      if (typeof (_base = this._behavior).dispose == "function") {
        _base.dispose(this);
      }
      this._unregister_all();
      _ref = this._children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        n.dispose();
      }
      this._curr_daos = [];
      return this._children = [];
    };
    Action.prototype.attach = function(child) {
      return array.insert_cst(this._children, child, function(a, b) {
        return a - b;
      });
    };
    Action.prototype.detach = function(child) {
      return array.erase(this._children, child);
    };
    Action.prototype.get_scope = function() {
      var scope, _base;
      return scope = (typeof (_base = this._behavior).get_scope == "function" ? _base.get_scope(this.parent) : void 0) || '';
    };
    Action.prototype.register_dao = function(dao) {
      return this._curr_daos.push(dao);
    };
    Action.prototype._register_all = function() {
      var dao, _i, _len, _ref;
      _ref = this._curr_daos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dao = _ref[_i];
        dao.subscribe(this.update);
      }
    };
    Action.prototype._unregister_all = function() {
      var dao, _i, _len, _ref;
      _ref = this._curr_daos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dao = _ref[_i];
        dao.unsubscribe(this.update);
      }
    };
    Action.prototype._submit_changes = function() {
      var dao, _i, _j, _len, _len2, _ref, _ref2, _results;
      _ref = this._prev_daos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dao = _ref[_i];
        if (this._curr_daos.indexOf(dao) === -1) {
          dao.unsubscribe(this.update);
        }
      }
      _ref2 = this._curr_daos;
      _results = [];
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        dao = _ref2[_j];
        if (this._prev_daos.indexOf(dao) === -1) {
          _results.push(dao.subscribe(this.update));
        }
      }
      return _results;
    };
    return Action;
  })();
}).call(this);

(function() {
  var REGISTRY;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
  pkg.Registry = (function() {
    function Registry() {
      this.on_stop = __bind(this.on_stop, this);;
      this.on_start = __bind(this.on_start, this);;      this._reg = {};
      this._queue = [];
    }
    Registry.prototype.register = function() {
      var arg, args, behavior, i, scope, type, _base, _i, _len, _ref, _ref2, _results;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      behavior = args.pop();
      _results = [];
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        arg = args[_i];
        i = arg.lastIndexOf('.');
        _ref = [arg.substr(0, i), arg.substr(i + 1)], scope = _ref[0], type = _ref[1];
        (_ref2 = (_base = this._reg)[scope]) != null ? _ref2 : _base[scope] = {};
        _results.push(this._reg[scope][type] = behavior);
      }
      return _results;
    };
    Registry.prototype.execute = function(type, value_def, nodes_def) {
      var action;
      action = this.create('', type, -1, null, [], value_def, nodes_def);
      this._queue.push(action);
      if (app.is_running()) {
        action.execute();
      }
      return action;
    };
    Registry.prototype.create = function(scope, type, uid, id, tags, value_def, nodes_def) {
      return new pkg.Action(uid, id, tags, value_def, nodes_def, this._get_behavior(scope, type));
    };
    Registry.prototype._get_behavior = function(scope, type) {
      var scope_reg, _base, _ref, _ref2;
      scope_reg = (_ref = (_base = this._reg)[scope]) != null ? _ref : _base[scope] = {};
      return (_ref2 = scope_reg[type]) != null ? _ref2 : scope_reg[type] = __bind(function() {
        assert(scope !== '', "Action handler for " + type + " not found");
        return this._get_handler(scope.substr(0, scope.lastIndexOf('.')), type);
      }, this)();
    };
    Registry.prototype.on_start = function() {
      var action, _i, _len, _ref, _results;
      _ref = this._queue;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        action = _ref[_i];
        _results.push(action.execute());
      }
      return _results;
    };
    Registry.prototype.on_stop = function() {
      var action, _i, _len, _ref, _results;
      _ref = this._queue;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        action = _ref[_i];
        _results.push(action.dispose());
      }
      return _results;
    };
    return Registry;
  })();
  REGISTRY = new pkg.Registry();
  pkg.register = function() {
    return REGISTRY.register.apply(REGISTRY, arguments);
  };
  core.execute = function(type, value_def, nodes_def) {
    return REGISTRY.execute(type, value_def, nodes_def);
  };
  pkg.create = function(scope, type, uid, id, tags, value_def, nodes_def) {
    return REGISTRY.create(scope, type, uid, id, tags, value_def, nodes_def);
  };
  app.add_behavior('start', REGISTRY.on_start);
  app.add_behavior('stop', REGISTRY.on_stop);
}).call(this);

(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  pkg.AbstractDom = (function() {
    function AbstractDom() {}
    AbstractDom.prototype.create = function(o) {};
    AbstractDom.prototype.finalize = function(o) {
      if (!o.parent.finalized) {
        return o.parent.node.appendChild(o.node);
      }
    };
    return AbstractDom;
  })();
  pkg.Div = (function() {
    function Div() {
      Div.__super__.constructor.apply(this, arguments);
    }
    __extends(Div, pkg.AbstractDom);
    Div.prototype.create = function(o) {
      return o.node = document.createElement('div');
    };
    return Div;
  })();
  pkg.Span = (function() {
    function Span() {
      Span.__super__.constructor.apply(this, arguments);
    }
    __extends(Span, pkg.AbstractDom);
    Span.prototype.create = function(o) {
      return o.node = document.createElement('span');
    };
    return Span;
  })();
  pkg.Link = (function() {
    function Link() {
      Link.__super__.constructor.apply(this, arguments);
    }
    __extends(Link, pkg.AbstractDom);
    Link.prototype.create = function(o) {
      return o.node = document.createElement('a');
    };
    return Link;
  })();
  pkg.Root = (function() {
    function Root() {}
    Root.prototype.create = function(o) {};
    return Root;
  })();
}).call(this);

(function() {
  var __register;
  __register = pkg.register;
  __register('div', new pkg.Div());
  __register('span', new pkg.Span());
  __register('link', new pkg.Link());
  __register('root', new pkg.Root());
}).call(this);


}, '3.0' ,{requires:['fierry.core']});

YUI.add( 'fierry.pfc.fv', function( Env ) {

var uid = Env.namespace('uid');
var core = Env.namespace('core');
var assert = Env.namespace('assert');
var view = Env.namespace('core.view');
var pkg = Env.namespace('performance.fv');
var test = Env.namespace('performance.register_test');
var group = Env.namespace('performance.register_group');
(function() {
  var nd_02, nd_05, __registry, _f, _f_00, _f_01, _f_02, _f_03, _f_04, _f_05, _fd_00, _fd_01, _fd_02, _fd_03, _fd_04, _fd_05, _n_00, _n_02, _n_05, _nc_02, _nc_05;
  group('/fv');
  __registry = view;
  __registry.register('dummy', {
    create: function() {},
    update: function() {},
    get_scope: function() {
      return '';
    }
  });
  __registry.register('dummy-root', {
    update: function() {},
    get_scope: function() {
      return '';
    },
    create: function(o) {
      return o.node = document.createElement('div');
    }
  });
  _f = function() {
    return 12;
  };
  _f_00 = function() {
    return 0;
  };
  _f_01 = function() {
    return 1;
  };
  _f_02 = function() {
    return 2;
  };
  _f_03 = function() {
    return 3;
  };
  _f_04 = function() {
    return 4;
  };
  _f_05 = function() {
    return 5;
  };
  _fd_00 = function() {
    return core.get('..data.val0', this);
  };
  _fd_01 = function() {
    return core.get('..data.val1', this);
  };
  _fd_02 = function() {
    return core.get('..data.val2', this);
  };
  _fd_03 = function() {
    return core.get('..data.val3', this);
  };
  _fd_04 = function() {
    return core.get('..data.val4', this);
  };
  _fd_05 = function() {
    return core.get('..data.val5', this);
  };
  _n_00 = function() {
    return [];
  };
  _n_02 = function(o) {
    return [__registry.create(o.get_scope(), 'dummy', 1, null, [], _f_01, _n_00), __registry.create(o.get_scope(), 'dummy', 2, null, [], _f_02, _n_00)];
  };
  _n_05 = function(o) {
    return [__registry.create(o.get_scope(), 'dummy', 1, null, [], _f_01, _n_00), __registry.create(o.get_scope(), 'dummy', 2, null, [], _f_02, _n_00), __registry.create(o.get_scope(), 'dummy', 3, null, [], _f_03, _n_00), __registry.create(o.get_scope(), 'dummy', 4, null, [], _f_04, _n_00), __registry.create(o.get_scope(), 'dummy', 5, null, [], _f_05, _n_00)];
  };
  pkg.dummy_1x2 = function() {
    return __registry.create('', 'dummy', 0, null, [], _f_00, _n_02);
  };
  pkg.dummy_1x5 = function() {
    return __registry.create('', 'dummy', 0, null, [], _f_00, _n_05);
  };
  _nc_02 = function(o) {
    return [__registry.create(o.get_scope(), 'dummy', 1, null, [], _fd_01, _n_00), __registry.create(o.get_scope(), 'dummy', 2, null, [], _fd_02, _n_00)];
  };
  _nc_05 = function(o) {
    return [__registry.create(o.get_scope(), 'dummy', 1, null, [], _fd_01, _n_00), __registry.create(o.get_scope(), 'dummy', 2, null, [], _fd_02, _n_00), __registry.create(o.get_scope(), 'dummy', 3, null, [], _fd_03, _n_00), __registry.create(o.get_scope(), 'dummy', 4, null, [], _fd_04, _n_00), __registry.create(o.get_scope(), 'dummy', 5, null, [], _fd_05, _n_00)];
  };
  pkg.dao_1x2 = function() {
    return __registry.create('', 'dummy', 0, null, [], _fd_00, _nc_02);
  };
  pkg.dao_1x5 = function() {
    return __registry.create('', 'dummy', 0, null, [], _fd_00, _nc_05);
  };
  nd_02 = function(o) {
    return [__registry.create(o.get_scope(), 'div', 1, null, [], _f, _n_00), __registry.create(o.get_scope(), 'div', 2, null, [], _f, _n_00)];
  };
  nd_05 = function(o) {
    return [__registry.create(o.get_scope(), 'div', 1, null, [], _f, _n_00), __registry.create(o.get_scope(), 'div', 2, null, [], _f, _n_00), __registry.create(o.get_scope(), 'div', 3, null, [], _f, _n_00), __registry.create(o.get_scope(), 'div', 4, null, [], _f, _n_00), __registry.create(o.get_scope(), 'div', 5, null, [], _f, _n_00)];
  };
  pkg.dom_1x2 = function() {
    return __registry.create('', 'dummy-root', 0, null, [], _f, nd_02);
  };
  pkg.dom_1x5 = function() {
    return __registry.create('', 'dummy-root', 0, null, [], _f, nd_05);
  };
}).call(this);

(function() {
  group('/fv.draft', {
    before: function() {
      core.set('..data.val0', 10);
      core.set('..data.val1', 11);
      core.set('..data.val2', 12);
      core.set('..data.val3', 13);
      core.set('..data.val4', 14);
      core.set('..data.val5', 15);
      return core.storage.register_rule('data');
    }
  });
  group('dao');
  test('1x2', {
    run: function() {
      return pkg.dao_1x2().execute(null);
    }
  });
  test('1x5', {
    run: function() {
      return pkg.dao_1x5().execute(null);
    }
  });
  group('dummy');
  test('1x2', {
    run: function() {
      return pkg.dummy_1x2().execute(null);
    }
  });
  test('1x5', {
    run: function() {
      return pkg.dummy_1x5().execute(null);
    }
  });
}).call(this);

(function() {
  /*
  group '/fv.create'

  test '3 actions',
    before: ->
      # Takie ulozenie budowy hashy powoduje przyspieszenie z 40 do 120 ops/ms.
      _h01 =
        uid: 1
        type: 'dummy'
        value: -> 1
        nodes: -> []
      _h02 =
        uid: 2
        type: 'dummy'
        value: -> 2
        nodes: -> []
      _h03 =
        uid: 3
        type: 'dummy'
        value: -> 3
        nodes: -> []
      _h04 =
        uid: 4
        type: 'dummy'
        value: -> 4
        nodes: -> []
      _h05 =
        uid: 5
        type: 'dummy'
        value: -> 5
        nodes: -> []

      @h = _h0 =
        uid: 0
        type: 'dummy',
        value: -> 0
        #nodes: -> {'1': _h01, '2': _h02}
        nodes: -> [_h01, _h02]
        #nodes: -> []

      @env = new fv.Environment()
      @env.set('scope', '')

    run: ->
      @env.push_node()

      action = fv.REGISTRY.create(@h, @env.get('scope')) # spadek z 9k do 2.9k
      action.create(null, @env)
      action.update(@env)
      action.finalize(@env)

      @env.pop_node()

  test '3 actions + 3 dao',
    before: ->
      core.set('..data.value', 21)
      core.storage.register_rule('data.value')

      _h01 =
        uid: 1
        type: 'dummy'
        value: (o) -> core.get('..data.value', o)
        nodes: -> []
      _h02 =
        uid: 2
        type: 'dummy'
        value: (o) -> core.get('..data.value', o)
        nodes: -> []
      @h = _h0 =
        uid: 0
        type: 'dummy',
        value: (o) -> core.get('..data.value', o)
        #nodes: -> {'1': _h01, '2': _h02}
        nodes: -> [_h01, _h02]
        #nodes: -> []

      @env = new fv.Environment()
      @env.set('scope', '')

    run: ->
      @env.push_node()

      action = fv.REGISTRY.create(@h, @env.get('scope')) # spadek z 9k do 2.9k
      action.create(null, @env)
      action.update(@env)
      action.finalize(@env)

      @env.pop_node()*/
}).call(this);


}, '3.0' ,{requires:['fierry.view']});

YUI.add( 'fierry.storage', function( Env ) {

var core = Env.namespace('core');
var array = Env.namespace('array');
var object = Env.namespace('object');
var app = Env.namespace('app');
var uid = Env.namespace('uid');
var assert = Env.namespace('assert');
var dao = Env.namespace('core.dao');
var pkg = Env.namespace('core.storage');
var storage = Env.namespace('core.storage');
var behavior = Env.namespace('app.add_behavior');
(function() {
  storage.NotifyPoint = (function() {
    function NotifyPoint() {
      this._queue = [];
      this._enabled = true;
    }
    NotifyPoint.prototype.subscribe = function(fn) {
      return this._queue.push(fn);
    };
    NotifyPoint.prototype.unsubscribe = function(fn) {
      return array.erase(this._queue, fn);
    };
    NotifyPoint.prototype.set_emitter_disabled = function(enabled) {
      return this._enabled = !enabled;
    };
    NotifyPoint.prototype.dispatch = function() {
      var o, _i, _len, _ref;
      if (this._enabled) {
        _ref = this._queue;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          o = _ref[_i];
          core.async_notify(o);
        }
      }
    };
    return NotifyPoint;
  })();
  storage.NotifyPoint = (function() {
    function NotifyPoint() {}
    return NotifyPoint;
  })();
  core.install('async.emitter', storage.NotifyPoint);
}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  dao.Plain = (function() {
    function Plain(_str, _array) {
      this._str = _str;
      this._array = _array;
      this._on_change = __bind(this._on_change, this);;
      storage.subscribe(this._array, this._str, this._on_change);
    }
    Plain.prototype._on_change = function() {
      this._value = storage.get(this._array);
      return this.dispatch();
    };
    Plain.prototype.get = function() {
      var _ref;
      return (_ref = this._value) != null ? _ref : this._value = storage.get(this._array);
    };
    Plain.prototype.set = function(nv) {
      return storage.set(this._array, this._str, nv);
    };
    return Plain;
  })();
  core.install('async.emitter', dao.Plain);
}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  core.Storage = (function() {
    function Storage() {
      this._nps = {};
      this._root = {};
      this._daos = {};
      this._rules = {};
    }
    Storage.prototype.get = function(arr) {
      return object.get(this._root, arr);
    };
    Storage.prototype.set = function(arr, str, v) {
      object.set(this._root, arr, v);
      if (app.is_running()) {
        return this._get_np(arr, str).dispatch();
      }
    };
    Storage.prototype.subscribe = function(arr, str, fn) {
      return this._get_np(arr, str).subscribe(fn);
    };
    Storage.prototype.unsubscribe = function(arr, str, fn) {
      return this._get_np(arr, str).unsubscribe(fn);
    };
    Storage.prototype.disable_notify = function(arr, str) {
      return this._get_np(arr, str).set_emitter_disabled(true);
    };
    Storage.prototype.enable_notify = function(arr, str) {
      return this._get_np(arr, str).set_emitter_disabled(false);
    };
    Storage.prototype._get_np = function(arr, str) {
      var _base, _ref;
      if (!str) {
        str = arr.join('.');
      }
      return (_ref = (_base = this._nps)[str]) != null ? _ref : _base[str] = __bind(function() {
        var np, _base, _ref;
        np = this._get_np_path(arr[0], str);
        return (_ref = (_base = this._nps)[np]) != null ? _ref : _base[np] = new pkg.NotifyPoint();
      }, this)();
    };
    Storage.prototype._get_np_path = function(head, raw) {
      var max, rule, rules, tmp, _i, _len;
      max = '';
      rules = this._rules[head];
      if (rules) {
        for (_i = 0, _len = rules.length; _i < _len; _i++) {
          rule = rules[_i];
          tmp = raw.match(rule);
          if (tmp && tmp[0].length > max.length) {
            max = tmp[0];
          }
        }
      }
      return max || head;
    };
    Storage.prototype.register_rule = function(raw) {
      var head, idx, _base, _ref;
      assert(app.is_stopped(), 'Application should be stopped');
      idx = raw.indexOf('.');
      head = raw.substr(0, idx > 0 ? idx : void 0);
      raw = raw.replace(/\./g, "\\.");
      raw = raw.replace(/\*/g, "[-a-zA-Z0-9_]+");
      raw += "(?![-a-zA-Z0-9_])";
      (_ref = (_base = this._rules)[head]) != null ? _ref : _base[head] = [];
      return this._rules[head].push(new RegExp('^' + raw));
    };
    Storage.prototype.retrieve_dao = function(key) {
      return this._daos[key];
    };
    Storage.prototype.create_dao = function(key, g, str, arr) {
      var _base, _ref;
      return (_ref = (_base = this._daos)[key]) != null ? _ref : _base[key] = this._strategy_create(g, str, arr);
    };
    Storage.prototype._strategy_create = function(g, str, arr) {
      if (this._is_complex(str)) {
        return new dao.Complex(arr);
      }
      return new dao.Plain(str, arr);
    };
    Storage.prototype._is_complex = function(str) {
      return str.indexOf('{') !== -1;
    };
    Storage.prototype._clear = function() {
      this._nps = {};
      this._root = {};
      this._daos = {};
      return this._rules = {};
    };
    return Storage;
  })();
}).call(this);

(function() {
  pkg.DOT = 46;
  pkg.CLOSURE_BEGIN = 123;
  pkg.CLOSURE_END = 125;
}).call(this);

(function() {
  core.Dao = (function() {
    function Dao() {}
    Dao.prototype.is = function(o) {
      return o instanceof dao.Plain;
    };
    Dao.prototype.get = function(key, o) {
      var dao;
      dao = this._retrieve_dao(key, o);
      if (o != null) {
        if (typeof o.register_dao == "function") {
          o.register_dao(dao);
        }
      }
      return dao.get();
    };
    Dao.prototype.set = function(key, v, o) {
      return this._retrieve_dao(key, o).set(v);
    };
    Dao.prototype.create = function(key, g, str, arr, o) {
      return pkg.STORAGE.create_dao(key, g, str, arr);
    };
    Dao.prototype._retrieve_dao = function(key, o) {
      var arr, dao;
      dao = pkg.STORAGE.retrieve_dao(key);
      if (!dao) {
        arr = this.compile(key, o);
        dao = pkg.STORAGE.create_dao(key, arr.g, arr.s, arr);
      }
      return dao;
    };
    Dao.prototype.compile = function(str, o) {
      var arr, char, dao, i, l, nkey, nstr, p, st;
      i = 0;
      p = 0;
      l = str.length;
      st = [];
      arr = [];
      while (i < l) {
        char = str.charCodeAt(i);
        if (char === pkg.DOT) {
          if (arr.g == null) {
            arr.g = str.charCodeAt(i + 1) === pkg.DOT;
            arr.p = i;
          } else {
            if (p !== i) {
              arr.push(str.substring(p, i));
            }
          }
          p = i + 1;
        } else if (char === pkg.CLOSURE_BEGIN) {
          if (p !== i) {
            arr.push(str.substring(p, i));
          }
          st.push(arr);
          arr = [];
          p = i + 1;
        } else if (char === pkg.CLOSURE_END) {
          if (p !== i) {
            arr.push(str.substring(p, i));
          }
          nkey = str.substring(arr.p, i);
          nstr = nkey.substr(arr.g ? 2 : 1);
          dao = this.create(nkey, arr.g, nstr, arr, o);
          arr = st.pop();
          arr.push(dao);
          p = i + 1;
        }
        i++;
      }
      if (p !== i) {
        arr.push(str.substr(p));
      }
      arr.s = str.substr(arr.p);
      return arr;
    };
    return Dao;
  })();
}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  dao.Complex = (function() {
    __extends(Complex, dao.Plain);
    function Complex(_nested) {
      var e, _i, _len, _ref;
      this._nested = _nested;
      this._on_nested_change = __bind(this._on_nested_change, this);;
      this._recompile();
      _ref = this._nested;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        if (dao.is(e)) {
          e.subscribe(this._on_nested_change);
        }
      }
      Complex.__super__.constructor.call(this, this._str, this._array);
      return;
    }
    Complex.prototype._on_nested_change = function() {
      storage.unsubscribe(this._array, this._str, this._on_change);
      this._recompile();
      storage.subscribe(this._array, this._str, this._on_change);
      return this._on_change();
    };
    Complex.prototype._recompile = function() {
      var e;
      this._array = (function() {
        var _i, _len, _ref, _results;
        _ref = this._nested;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          _results.push(dao.is(e) ? e.get() : e);
        }
        return _results;
      }).call(this);
      return this._str = this._array.join('.');
    };
    return Complex;
  })();
}).call(this);

(function() {
  pkg.DAO = new core.Dao();
  pkg.STORAGE = new core.Storage();
  core.get = function(str, instance, no_evaluate) {
    return pkg.DAO.get(str, instance, no_evaluate);
  };
  core.set = function(str, v, instance, no_evaluate) {
    return pkg.DAO.set(str, v, instance, no_evaluate);
  };
  dao.is = function(o) {
    return pkg.DAO.is(o);
  };
  dao.create = function(is_global, str, arr, instance) {
    return pkg.DAO.create(is_global, str, arr, instance);
  };
  dao.compile = function(raw) {
    return pkg.DAO.compile(raw);
  };
  dao.subscribe = function(str, fn, instance) {
    return pkg.DAO._retrieve_dao(str, instance).subscribe(fn);
  };
  dao.unsubscribe = function(str, fn, instance) {
    return pkg.DAO._retrieve_dao(str, instance).unsubscribe(fn);
  };
  storage.get = function(arr) {
    return pkg.STORAGE.get(arr);
  };
  storage.set = function(arr, str, v) {
    return pkg.STORAGE.set(arr, str, v);
  };
  storage.subscribe = function(arr, str, fn) {
    return pkg.STORAGE.subscribe(arr, str, fn);
  };
  storage.unsubscribe = function(arr, str, fn) {
    return pkg.STORAGE.unsubscribe(arr, str, fn);
  };
  storage.disable_notify = function(arr, str) {
    return pkg.STORAGE.disable_notify(arr, str);
  };
  storage.enable_noitfy = function(arr, str) {
    return pkg.STORAGE.enable_noitfy(arr, str);
  };
  storage.register_rule = function(raw) {
    return pkg.STORAGE.register_rule(raw);
  };
  behavior('stop', function() {
    return pkg.STORAGE._clear();
  });
}).call(this);


}, '3.0' ,{requires:['fierry.core', 'fierry.async']});

YUI.add( 'fierry.pfc.string', function( Env ) {

var core = Env.namespace('core');
var math = Env.namespace('math');
var string = Env.namespace('string');
var gen = Env.namespace('core.generation');
var test = Env.namespace('performance.register_test');
var group = Env.namespace('performance.register_group');
(function() {
  group('/string');
}).call(this);

(function() {
  group('/string.substr', {
    before: function() {
      return this.i = 0;
    }
  });
  test('   25 chars', {
    before: function() {
      this.str = gen.big_string(25);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.substr(this.i++ % this.len);
    }
  });
  test('  250 chars', {
    before: function() {
      this.str = gen.big_string(250);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.substr(this.i++ % this.len);
    }
  });
  test('2 500 chars', {
    before: function() {
      this.str = gen.big_string(2500);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.substr(this.i++ % this.len);
    }
  });
  test('   25 chars -10-length', {
    before: function() {
      this.str = gen.big_string(25);
      return this.len = this.str.length - 11;
    },
    run: function() {
      return this.str.substr(this.i++ % this.len, 10);
    }
  });
  test('  250 chars -10-length', {
    before: function() {
      this.str = gen.big_string(250);
      return this.len = this.str.length - 11;
    },
    run: function() {
      return this.str.substr(this.i++ % this.len, 10);
    }
  });
  test('2 500 chars -10-length', {
    before: function() {
      this.str = gen.big_string(2500);
      return this.len = this.str.length - 11;
    },
    run: function() {
      return this.str.substr(this.i++ % this.len, 10);
    }
  });
}).call(this);

(function() {
  group('/string.split', {
    before: function() {
      return this.str = 'simple.path/with.six.parts/yep';
    }
  });
  test('to_array', {
    run: function() {
      return this.str.split('');
    }
  });
  test('character', {
    run: function() {
      return this.str.split('.');
    }
  });
  test('regexp', {
    run: function() {
      return this.str.split(/\/|\./);
    }
  });
  test('double', {
    run: function() {
      var arr, str, _i, _len, _results;
      arr = this.str.split('/');
      _results = [];
      for (_i = 0, _len = arr.length; _i < _len; _i++) {
        str = arr[_i];
        _results.push(str.split('.'));
      }
      return _results;
    }
  });
}).call(this);

(function() {
  group('/string.slice');
  test('   25 chars', {
    before: function() {
      this.i = 0;
      this.str = gen.big_string(25);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.slice(this.i++ % this.len);
    }
  });
  test('  250 chars', {
    before: function() {
      this.i = 0;
      this.str = gen.big_string(250);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.slice(this.i++ % this.len);
    }
  });
  test('2 500 chars', {
    before: function() {
      this.i = 0;
      this.str = gen.big_string(2500);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.slice(this.i++ % this.len);
    }
  });
  test('   25 chars -10-length', {
    before: function() {
      this.i = 0;
      this.str = gen.big_string(25);
      return this.len = this.str.length - 11;
    },
    run: function() {
      var inx;
      inx = this.i++ % this.len;
      return this.str.slice(inx, inx + 10);
    }
  });
  test('  250 chars -10-length', {
    before: function() {
      this.i = 0;
      this.str = gen.big_string(250);
      return this.len = this.str.length - 11;
    },
    run: function() {
      var inx;
      inx = this.i++ % this.len;
      return this.str.slice(inx, inx + 10);
    }
  });
  test('2 500 chars -10-length', {
    before: function() {
      this.i = 0;
      this.str = gen.big_string(2500);
      return this.len = this.str.length - 11;
    },
    run: function() {
      var inx;
      inx = this.i++ % this.len;
      return this.str.slice(inx, inx + 10);
    }
  });
}).call(this);

(function() {
  group('/string.replace');
  test('20 chars -1 replace', {
    before: function() {
      return this.str = 'aaa|bbb|ccc|ddd|eee|';
    },
    run: function() {
      return this.str.replace(/a/, '&');
    }
  });
  test('30 chars -0 replace', {
    before: function() {
      return this.str = '.xxx{.sasa{.fafa}gaga}cos{.xxx}';
    },
    run: function() {
      return this.str.replace(/\ /g, '');
    }
  });
  test('30 chars -3 replace', {
    before: function() {
      return this.str = '.xxx{.sasa{.fafa}gaga}cos{.xxx}';
    },
    run: function() {
      return this.str.replace(/\{/g, '');
    }
  });
}).call(this);

(function() {
  group('/string.indexOf', {
    before: function() {
      return this.str = 'simple.path.with.five.parts';
    }
  });
  group('forward');
  test('25 chars -fast-found', {
    run: function() {
      return this.str.indexOf('simple') !== -1;
    }
  });
  test('25 chars -end-found', {
    run: function() {
      return this.str.indexOf('parts') !== -1;
    }
  });
  test('25 chars -not_found', {
    run: function() {
      return this.str.indexOf('---') !== -1;
    }
  });
  group('backward');
  test('25 chars -fast-found', {
    run: function() {
      return this.str.lastIndexOf('parts') !== -1;
    }
  });
  test('25 chars -end-found', {
    run: function() {
      return this.str.lastIndexOf('simple') !== -1;
    }
  });
  test('25 chars -not-found', {
    run: function() {
      return this.str.lastIndexOf('---') !== -1;
    }
  });
}).call(this);

(function() {
  group('/string.match');
  test('regexp -same', {
    before: function() {
      this.str = 'menu.items.0';
      return this.regexp = /^menu\.items\.[a-zA-Z0-9_]+/;
    },
    run: function() {
      return this.str.match(this.regexp);
    }
  });
  test('regexp -dynamic', {
    before: function() {
      var i;
      this.i = 0;
      this.max = 50000;
      for (i = 0; i <= 50000; i++) {
        this.arr = 'menu.items.' + i;
      }
      return this.regexp = /^menu\.items\.[a-zA-Z0-9_]+/;
    },
    run: function() {
      return this.arr[this.i % this.max].match(this.regexp);
    }
  });
  test('regexp_from_string', {
    before: function() {
      this.str = 'menu.items.0';
      return this.regexp = new RegExp("^menu\.items\.[a-zA-Z0-9_]+");
    },
    run: function() {
      return this.str.match(this.regexp);
    }
  });
  test('string', {
    before: function() {
      this.str = 'menu.items.0';
      return this.regexp = '^menu\.items\.[a-zA-Z0-9_]+';
    },
    run: function() {
      return this.str.match(this.regexp);
    }
  });
}).call(this);

(function() {
  group('/string.sequential-read');
  group('char-code-at');
  test('   250 chars', {
    before: function() {
      this.str = gen.big_string(250);
      return this.len = this.str.length - 1;
    },
    run: function() {
      var i, _ref;
      for (i = 0, _ref = this.len; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        this.str.charCodeAt(math.rand(i));
      }
    }
  });
  test(' 2 500 chars', {
    before: function() {
      this.str = gen.big_string(2500);
      return this.len = this.str.length - 1;
    },
    run: function() {
      var i, _ref;
      for (i = 0, _ref = this.len; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        this.str.charCodeAt(math.rand(i));
      }
    }
  });
  test('25 000 chars', {
    before: function() {
      this.str = gen.big_string(25000);
      return this.len = this.str.length - 1;
    },
    run: function() {
      var i, _ref;
      for (i = 0, _ref = this.len; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        this.str.charCodeAt(math.rand(i));
      }
    }
  });
  group('char-at');
  test('   250 chars', {
    before: function() {
      this.str = gen.big_string(250);
      return this.len = this.str.length - 1;
    },
    run: function() {
      var i, _ref;
      for (i = 0, _ref = this.len; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        this.str.charAt(math.rand(i));
      }
    }
  });
  test(' 2 500 chars', {
    before: function() {
      this.str = gen.big_string(2500);
      return this.len = this.str.length - 1;
    },
    run: function() {
      var i, _ref;
      for (i = 0, _ref = this.len; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        this.str.charAt(math.rand(i));
      }
    }
  });
  test('25 000 chars', {
    before: function() {
      this.str = gen.big_string(25000);
      return this.len = this.str.length - 1;
    },
    run: function() {
      var i, _ref;
      for (i = 0, _ref = this.len; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        this.str.charAt(math.rand(i));
      }
    }
  });
  group('direct');
  test('   250 chars', {
    before: function() {
      this.str = gen.big_string(250);
      return this.len = this.str.length - 1;
    },
    run: function() {
      var i, _ref;
      for (i = 0, _ref = this.len; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        this.str.charAt(math.rand(i));
      }
    }
  });
  test(' 2 500 chars', {
    before: function() {
      this.str = gen.big_string(2500);
      return this.len = this.str.length - 1;
    },
    run: function() {
      var i, _ref;
      for (i = 0, _ref = this.len; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        this.str.charAt(math.rand(i));
      }
    }
  });
  test('25 000 chars', {
    before: function() {
      this.str = gen.big_string(25000);
      return this.len = this.str.length - 1;
    },
    run: function() {
      var i, _ref;
      for (i = 0, _ref = this.len; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        this.str[math.rand(i)];
      }
    }
  });
}).call(this);

(function() {
  group('/string.search');
  test('string', {
    before: function() {
      return this.str = 'simple.path.with.five.parts';
    },
    run: function() {
      return this.str.search('path');
    }
  });
  test('regexp', {
    before: function() {
      return this.str = 'simple.path.with.five.parts';
    },
    run: function() {
      return this.str.search(/\./);
    }
  });
  test('regexp_or', {
    before: function() {
      return this.str = 'simple.path.with.five.parts';
    },
    run: function() {
      return this.str.search(/(\.|\{)/);
    }
  });
}).call(this);

(function() {
  group('/string.concat');
  test('1 char', {
    before: function() {
      this.a = 'a';
      return this.b = 'b';
    },
    run: function() {
      var str;
      return str = this.a + this.b;
    }
  });
  test('5 chars', {
    before: function() {
      this.a = 'abcde';
      return this.b = 'fghij';
    },
    run: function() {
      var str;
      return str = this.a + this.b;
    }
  });
  test('25 chars', {
    before: function() {
      this.a = 'abcdeabcdeabcdeabcdeabcde';
      return this.b = 'fghijfghijfghijfghijfghij';
    },
    run: function() {
      var str;
      return str = this.a + this.b;
    }
  });
  test('big', {
    before: function() {
      return this.str = '';
    },
    run: function() {
      return this.str += 'a';
    }
  });
}).call(this);

(function() {
  group('/string.access');
  group('char-code-at');
  test('   250 chars', {
    before: function() {
      this.str = gen.big_string(250);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.charCodeAt(math.rand(this.len));
    }
  });
  test(' 2 500 chars', {
    before: function() {
      this.str = gen.big_string(2500);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.charCodeAt(math.rand(this.len));
    }
  });
  test('25 000 chars', {
    before: function() {
      this.str = gen.big_string(25000);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.charCodeAt(math.rand(this.len));
    }
  });
  group('char-at');
  test('   250 chars', {
    before: function() {
      this.str = gen.big_string(250);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.charAt(math.rand(this.len));
    }
  });
  test(' 2 500 chars', {
    before: function() {
      this.str = gen.big_string(2500);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.charAt(math.rand(this.len));
    }
  });
  test('25 000 chars', {
    before: function() {
      this.str = gen.big_string(25000);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.charAt(math.rand(this.len));
    }
  });
  group('direct');
  test('   250 chars', {
    before: function() {
      this.str = gen.big_string(250);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str[math.rand(this.len)];
    }
  });
  test(' 2 500 chars', {
    before: function() {
      this.str = gen.big_string(2500);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str[math.rand(this.len)];
    }
  });
  test('25 000 chars', {
    before: function() {
      this.str = gen.big_string(25000);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str[math.rand(this.len)];
    }
  });
}).call(this);


}, '3.0' ,{requires:['fierry.generation', 'fierry.performance']});

YUI.add( 'fierry.pfc.priority-map', function( Env ) {

var core = Env.namespace('core');
var test = Env.namespace('performance.register_test');
var group = Env.namespace('performance.register_group');
(function() {
  group('/priority-map');
}).call(this);

(function() {
  group('/priority-map.all', {
    before: function() {
      this.i = 0;
      return this.map = new core.PriorityMap();
    }
  });
  group('set');
  test(' 1 key,  1 priority', {
    run: function() {
      return this.map.set('key', 'value', 1);
    }
  });
  test(' 5 keys, 1 priority', {
    before: function() {
      return this.keys = ['a', 'b', 'c', 'd', 'e'];
    },
    run: function() {
      return this.map.set(this.keys[this.i++ % 5], 'value', 1);
    }
  });
  group('remove');
  test(' 1 key,  1 priority', {
    run: function() {
      this.map.set('key', 'value', 1);
      return this.map.remove('key', 1);
    }
  });
  group('get', {
    before: function() {
      this.map.set('a', 'a', 1);
      this.map.set('b', 'a', 1);
      this.map.set('c', 'a', 1);
      this.map.set('d', 'a', 1);
      return this.map.set('e', 'a', 1);
    }
  });
  test('1 key', {
    run: function() {
      return this.map.get('a');
    }
  });
  test('5 keys', {
    before: function() {
      return this.keys = ['a', 'b', 'c', 'd', 'e'];
    },
    run: function() {
      return this.map.get(this.keys[this.i++ % 5]);
    }
  });
  test('unexisting', {
    run: function() {
      return this.map.get('key');
    }
  });
}).call(this);


}, '3.0' ,{requires:['fierry.core', 'fierry.performance']});

YUI.add( 'fierry.pfc.utils', function( Env ) {

var uid = Env.namespace('uid');
var core = Env.namespace('core');
var lang = Env.namespace('lang');
var math = Env.namespace('math');
var array = Env.namespace('array');
var assert = Env.namespace('assert');
var test = Env.namespace('performance.register_test');
var group = Env.namespace('performance.register_group');
(function() {
  group('/utils');
}).call(this);

(function() {
  group('/utils.math');
  group('round');
  test('Math.round', {
    run: function() {
      var x;
      return x = Math.round(12.3456);
    }
  });
  test('Binary shift', {
    run: function() {
      var x;
      return x = 12.3456 << 0;
    }
  });
  test('Double complement', {
    run: function() {
      var x;
      return x = ~~12.3456;
    }
  });
}).call(this);

(function() {
  group('/utils.lang');
  test('bool', {
    before: function() {
      return this.o = true;
    },
    run: function() {
      return lang.boolean(this.o);
    }
  });
  test('number', {
    before: function() {
      return this.o = 12;
    },
    run: function() {
      return lang.number(this.o);
    }
  });
  test('string', {
    before: function() {
      return this.o = 'string';
    },
    run: function() {
      return lang.string(this.o);
    }
  });
  test('function', {
    before: function() {
      return this.o = function() {};
    },
    run: function() {
      return lang["function"](this.o);
    }
  });
  test('array', {
    before: function() {
      return this.o = [];
    },
    run: function() {
      return lang.array(this.o);
    }
  });
  test('object', {
    before: function() {
      return this.o = {};
    },
    run: function() {
      return lang.object(this.o);
    }
  });
  test('date', {
    before: function() {
      return this.o = new Date();
    },
    run: function() {
      return lang.date(this.o);
    }
  });
  test('regexp', {
    before: function() {
      return this.o = /regexp/;
    },
    run: function() {
      return lang.regexp(this.o);
    }
  });
}).call(this);

(function() {
  group('/utils.other');
  test('uid', {
    run: function() {
      return uid({});
    }
  });
  test('assert', {
    run: function() {
      return assert(true, 'Illegal state occurred');
    }
  });
  test('math.rand -float', {
    run: function() {
      return math.rand();
    }
  });
  test('math.rand -int', {
    run: function() {
      return math.rand(1000);
    }
  });
}).call(this);


}, '3.0' ,{requires:['fierry.core', 'fierry.performance']});

YUI.add( 'fierry.pfc.object', function( Env ) {

var uid = Env.namespace('uid');
var core = Env.namespace('core');
var object = Env.namespace('object');
var gen = Env.namespace('core.generation');
var test = Env.namespace('performance.register_test');
var group = Env.namespace('performance.register_group');
(function() {
  group('/object');
  group('/object.cache');
}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  group('/object.foreach', {
    before: function() {
      this.i = 0;
      return this.o = {
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd',
        e: 'e',
        f: 'f',
        g: 'g',
        h: 'h',
        i: 'i',
        j: 'j'
      };
    }
  });
  test('for-in', {
    run: function() {
      var k, v, _ref;
      _ref = this.o;
      for (k in _ref) {
        v = _ref[k];
        if (v) {
          this.i++;
        }
      }
    }
  });
  test('keys', {
    run: function() {
      var k, keys, _i, _len;
      keys = Object.keys(this.o);
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        k = keys[_i];
        if (this.o[k]) {
          this.i++;
        }
      }
    }
  });
  test('yui', {
    run: function() {
      return Env.Object.each(this.o, __bind(function(v) {
        if (v) {
          return this.i++;
        }
      }, this));
    }
  });
}).call(this);

(function() {
  group('/object.cache.get');
  test(' 25 000', {
    before: function() {
      var str, _i, _len, _ref, _results;
      this.i = 0;
      this.max = 25000;
      this.strings = gen.string_array(25000, 10);
      this.cache = {};
      _ref = this.strings;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        str = _ref[_i];
        _results.push(this.cache[str] = str);
      }
      return _results;
    },
    run: function() {
      return this.cache[this.strings[this.i++ % this.max]];
    }
  });
  test(' 50 000', {
    before: function() {
      var str, _i, _len, _ref, _results;
      this.i = 0;
      this.max = 50000;
      this.strings = gen.string_array(50000, 10);
      this.cache = {};
      _ref = this.strings;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        str = _ref[_i];
        _results.push(this.cache[str] = str);
      }
      return _results;
    },
    run: function() {
      return this.cache[this.strings[this.i++ % this.max]];
    }
  });
  test('100 000', {
    before: function() {
      var str, _i, _len, _ref, _results;
      this.i = 0;
      this.max = 100000;
      this.strings = gen.string_array(100000, 10);
      this.cache = {};
      _ref = this.strings;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        str = _ref[_i];
        _results.push(this.cache[str] = str);
      }
      return _results;
    },
    run: function() {
      return this.cache[this.strings[this.i++ % this.max]];
    }
  });
  test('prefix_string', {
    before: function() {
      var str, _i, _len, _ref, _results;
      this.i = 0;
      this.max = 100000;
      this.strings = (function() {
        var _i, _len, _ref, _results;
        _ref = gen.string_array(100000, 10);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          str = _ref[_i];
          _results.push('..' + str);
        }
        return _results;
      })();
      this.cache = {};
      _ref = this.strings;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        str = _ref[_i];
        _results.push(this.cache[str] = str);
      }
      return _results;
    },
    run: function() {
      return this.cache[this.strings[this.i++ % this.max]];
    }
  });
}).call(this);

(function() {
  group('/object.get');
  group('standard');
  test('depth-1', {
    before: function() {
      return this.o = {
        a: 'a',
        b: 'b',
        c: 'c'
      };
    },
    run: function() {
      return object.get(this.o, ['b']);
    }
  });
  test('depth-2', {
    before: function() {
      return this.o = {
        a: 'a',
        b: {
          d: 'd',
          e: 'e'
        },
        c: 'c'
      };
    },
    run: function() {
      return object.get(this.o, ['b', 'd']);
    }
  });
  test('depth-3', {
    before: function() {
      return this.o = {
        a: 'a',
        b: {
          d: {
            f: 'f',
            g: 'g'
          },
          e: 'e'
        },
        c: 'c'
      };
    },
    run: function() {
      return object.get(this.o, ['b', 'd', 'g']);
    }
  });
  test('depth-4', {
    before: function() {
      return this.o = {
        a: 'a',
        b: {
          d: {
            f: {
              h: 'h',
              i: 'i'
            },
            g: 'g'
          },
          e: 'e'
        },
        c: 'c'
      };
    },
    run: function() {
      return object.get(this.o, ['b', 'd', 'f', 'i']);
    }
  });
  group('not-exist');
  test('depth-1', {
    before: function() {
      return this.o = {
        a: 'a',
        b: {
          d: {
            f: 'f',
            g: 'g'
          },
          e: 'e'
        },
        c: 'c'
      };
    },
    run: function() {
      return object.get(this.o, ['h', 'i', 'j']);
    }
  });
  test('depth-2', {
    before: function() {
      return this.o = {
        a: 'a',
        b: {
          d: {
            f: 'f',
            g: 'g'
          },
          e: 'e'
        },
        c: 'c'
      };
    },
    run: function() {
      return object.get(this.o, ['b', 'h', 'i']);
    }
  });
  group('array');
  test('depth-2', {
    before: function() {
      return this.o = {
        a: ['a', 'b', 'c', 'd', 'e', 'f']
      };
    },
    run: function() {
      return object.get(this.o, ['a', '0']);
    }
  });
  test('depth-2 -array^2', {
    before: function() {
      return this.o = [0, 1, [0, 1, 2], 2];
    },
    run: function() {
      return object.get(this.o, ['2', '2']);
    }
  });
  test('depth-2 -int-path', {
    before: function() {
      return this.o = {
        a: ['a', 'b', 'c', 'd', 'e', 'f']
      };
    },
    run: function() {
      return object.get(this.o, ['a', 0]);
    }
  });
  test('depth-3', {
    before: function() {
      return this.o = {
        a: {
          b: ['a', 'b', 'c', 'd', 'e', 'f']
        }
      };
    },
    run: function() {
      return object.get(this.o, ['a', 'b', '0']);
    }
  });
  test('depth-3 -array^2', {
    before: function() {
      return this.o = {
        a: ['a', ['b', 'c', 'd'], 'e', 'f']
      };
    },
    run: function() {
      return object.get(this.o, ['a', '1', '1']);
    }
  });
  test('depth-4', {
    before: function() {
      return this.o = {
        a: [
          'a', {
            b: [0, 1, 2, 3, 4]
          }, 'b', 'c'
        ]
      };
    },
    run: function() {
      return object.get(this.o, ['a', '1', 'b', '2']);
    }
  });
}).call(this);

(function() {
  group('/object.cache.set', {
    before: function() {
      this.i = 0;
      this.cache = {};
      return this.max = 100000;
    }
  });
  test('random_int', {
    before: function() {
      return this.ints = gen.int_array(100000, 20);
    },
    run: function() {
      return this.cache[this.ints[this.i++ % this.max]] = true;
    }
  });
  test('uid', {
    before: function() {},
    run: function() {
      return this.cache[uid({})] = true;
    }
  });
  test('random_string', {
    before: function() {
      return this.strings = gen.string_array(100000, 10);
    },
    run: function() {
      return this.cache[this.strings[this.i++ % this.max]] = true;
    }
  });
  test('prefix_string -2 chars', {
    before: function() {
      var str;
      return this.strings = (function() {
        var _i, _len, _ref, _results;
        _ref = gen.string_array(100000, 5);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          str = _ref[_i];
          _results.push('..' + str);
        }
        return _results;
      })();
    },
    run: function() {
      return this.cache[this.strings[this.i++ % this.max]] = true;
    }
  });
  test('prefix_string -5 chars', {
    before: function() {
      var str;
      return this.strings = (function() {
        var _i, _len, _ref, _results;
        _ref = gen.string_array(100000, 5);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          str = _ref[_i];
          _results.push('asdfg' + str);
        }
        return _results;
      })();
    },
    run: function() {
      return this.cache[this.strings[this.i++ % this.max]] = true;
    }
  });
  test('yui_stamp', {
    before: function() {
      this.i = 0;
      this.cache = {};
      return this.stamp = Env.stamp({});
    },
    run: function() {
      return this.cache[this.stamp + this.i++] = true;
    }
  });
}).call(this);

(function() {
  group('/object.set', {
    before: function() {
      this.i = 0;
      this.max = 100000;
      return this.arr = gen.string_array(this.max, 5);
    }
  });
  group('new');
  group('new.string');
  test('depth-1', {
    before: function() {
      return this.o = {
        a: 'a',
        b: 'b',
        c: 'c'
      };
    },
    run: function() {
      return object.set(this.o, [this.arr[this.i % this.max]], 'd');
    }
  });
  test('depth-2', {
    before: function() {
      return this.o = {
        a: 'a',
        b: {
          d: 'd',
          e: 'e'
        },
        c: 'c'
      };
    },
    run: function() {
      return object.set(this.o, ['b', this.arr[this.i % this.max]], 'f');
    }
  });
  test('depth-3', {
    before: function() {
      return this.o = {
        a: 'a',
        b: {
          d: {
            f: 'f',
            g: 'g'
          },
          e: 'e'
        },
        c: 'c'
      };
    },
    run: function() {
      return object.set(this.o, ['b', 'd', this.arr[this.i % this.max]], 'h');
    }
  });
  group('new.int');
  test('depth-1', {
    before: function() {
      return this.o = {
        a: 'a',
        b: 'b',
        c: 'c'
      };
    },
    run: function() {
      return object.set(this.o, [this.i++], 'd');
    }
  });
  test('depth-2', {
    before: function() {
      return this.o = {
        a: 'a',
        b: {
          d: 'd',
          e: 'e'
        },
        c: 'c'
      };
    },
    run: function() {
      return object.set(this.o, ['b', this.i++], 'f');
    }
  });
  test('depth-3', {
    before: function() {
      return this.o = {
        a: 'a',
        b: {
          d: {
            f: 'f',
            g: 'g'
          },
          e: 'e'
        },
        c: 'c'
      };
    },
    run: function() {
      return object.set(this.o, ['b', 'd', this.i++], 'h');
    }
  });
  group('change');
  test('depth-1', {
    before: function() {
      return this.o = {
        a: 'a',
        b: 'b',
        c: 'c'
      };
    },
    run: function() {
      return object.set(this.o, ['c'], this.i++);
    }
  });
  test('depth-2', {
    before: function() {
      return this.o = {
        a: 'a',
        b: {
          d: 'd',
          e: 'e'
        },
        c: 'c'
      };
    },
    run: function() {
      return object.set(this.o, ['b', 'd'], this.i++);
    }
  });
  test('depth-3', {
    before: function() {
      return this.o = {
        a: 'a',
        b: {
          d: {
            f: 'f',
            g: 'g'
          },
          e: 'e'
        },
        c: 'c'
      };
    },
    run: function() {
      return object.set(this.o, ['b', 'd', 'g'], this.i++);
    }
  });
  group('empty');
  test('depth-2', {
    run: function() {
      return object.set({}, ['a', 'b'], true);
    }
  });
  test('depth-3', {
    run: function() {
      return object.set({}, ['a', 'b', 'c'], true);
    }
  });
  test('depth-4', {
    run: function() {
      return object.set({}, ['a', 'b', 'c', 'd'], true);
    }
  });
  test('depth-5', {
    run: function() {
      return object.set({}, ['a', 'b', 'c', 'd', 'e'], true);
    }
  });
}).call(this);

(function() {
  group('/object.clone');
  test('for-in', {
    before: function() {
      return this.a = {
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd',
        e: 'e',
        f: 'f',
        g: 'g',
        h: 'h',
        i: 'i',
        j: 'j'
      };
    },
    run: function() {
      var k, v, _ref;
      this.b = {};
      _ref = this.a;
      for (k in _ref) {
        v = _ref[k];
        this.b[k] = v;
      }
    }
  });
  test('keys', {
    before: function() {
      this.keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      return this.a = {
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd',
        e: 'e',
        f: 'f',
        g: 'g',
        h: 'h',
        i: 'i',
        j: 'j'
      };
    },
    run: function() {
      var k, _i, _len, _ref, _results;
      this.b = {};
      _ref = this.keys;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        k = _ref[_i];
        _results.push(this.b[k] = this.a[k]);
      }
      return _results;
    }
  });
  test('explicit', {
    before: function() {
      return this.a = {
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd',
        e: 'e',
        f: 'f',
        g: 'g',
        h: 'h',
        i: 'i',
        j: 'j'
      };
    },
    run: function() {
      this.b = {};
      this.b.a = 'a';
      this.b.b = 'b';
      this.b.c = 'c';
      this.b.d = 'd';
      this.b.e = 'e';
      this.b.f = 'f';
      this.b.g = 'g';
      this.b.h = 'h';
      this.b.i = 'i';
      return this.b.j = 'j';
    }
  });
}).call(this);


}, '3.0' ,{requires:['fierry.core', 'fierry.generation', 'fierry.performance']});

YUI.add( 'fierry.pfc.storage', function( Env ) {

var core = Env.namespace('core');
var dao = Env.namespace('core.dao');
var storage = Env.namespace('core.storage');
var gen = Env.namespace('core.generation');
var pkg = Env.namespace('performance.storage');
var test = Env.namespace('performance.register_test');
var group = Env.namespace('performance.register_group');
var repeat = Env.namespace('performance.register_tests_from');
var env = Env.namespace('performance.register_environment');
(function() {
  group('/storage', {
    before: function() {
      return this.storage = storage.STORAGE;
    }
  });
  group('/dao', {
    before: function() {
      return this.dao = storage.DAO;
    }
  });
  env('storage.paths', {
    before: function() {
      var str;
      this.i = 0;
      this.path_str_5 = gen.path_array(10000, 5);
      this.path_arr_5 = (function() {
        var _i, _len, _ref, _results;
        _ref = this.path_str_5;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          str = _ref[_i];
          _results.push(str.split('.'));
        }
        return _results;
      }).call(this);
      this.path_str_4 = gen.path_array(10000, 4);
      this.path_arr_4 = (function() {
        var _i, _len, _ref, _results;
        _ref = this.path_str_4;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          str = _ref[_i];
          _results.push(str.split('.'));
        }
        return _results;
      }).call(this);
      this.path_str_3 = gen.path_array(10000, 3);
      this.path_arr_3 = (function() {
        var _i, _len, _ref, _results;
        _ref = this.path_str_3;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          str = _ref[_i];
          _results.push(str.split('.'));
        }
        return _results;
      }).call(this);
      this.path_str_2 = gen.path_array(10000, 2);
      this.path_arr_2 = (function() {
        var _i, _len, _ref, _results;
        _ref = this.path_str_2;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          str = _ref[_i];
          _results.push(str.split('.'));
        }
        return _results;
      }).call(this);
      this.rules_1 = gen.rules_array(1);
      return this.rules_5 = gen.rules_array(5);
    }
  });
  env('storage.data', {
    before: function() {
      storage.register_rule('started');
      storage.register_rule('user.login');
      storage.register_rule('view.active');
      storage.register_rule('menu.items.*');
      storage.set(['started'], null, true);
      storage.set(['user', 'login'], null, {
        age: 21,
        name: 'Bilbo',
        status: 'guest',
        surname: 'Baggins'
      });
      storage.set(['view', 'active'], null, 2);
      storage.set(['menu', 'items'], null, ['General', 'Fleets', 'Space', 'Settings']);
      return storage.set(['simple', 'path', 'with', 'five', 'parts'], null, new Date());
    }
  });
}).call(this);

(function() {
  group('/storage.np', {
    envs: ['storage.paths']
  });
  group('1 rule', {
    before: function() {
      var r, _i, _len, _ref, _results;
      _ref = this.rules_1;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        r = _ref[_i];
        _results.push(this.storage.register_rule(r));
      }
      return _results;
    }
  });
  test('    50 paths', {
    run: function() {
      var i;
      i = this.i++ % 50;
      return this.storage._get_np(this.path_arr_5[i], this.path_str_5[i]);
    }
  });
  test('   500 paths', {
    run: function() {
      var i;
      i = this.i++ % 500;
      return this.storage._get_np(this.path_arr_5[i], this.path_str_5[i]);
    }
  });
  test(' 2 500 paths', {
    run: function() {
      var i;
      i = this.i++ % 2500;
      return this.storage._get_np(this.path_arr_5[i], this.path_str_5[i]);
    }
  });
  test(' 5 000 paths', {
    run: function() {
      var i;
      i = this.i++ % 5000;
      return this.storage._get_np(this.path_arr_5[i], this.path_str_5[i]);
    }
  });
  test('10 000 paths', {
    run: function() {
      var i;
      i = this.i++ % 10000;
      return this.storage._get_np(this.path_arr_5[i], this.path_str_5[i]);
    }
  });
  group('5 rules', {
    before: function() {
      var r, _i, _len, _ref, _results;
      _ref = this.rules_5;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        r = _ref[_i];
        _results.push(this.storage.register_rule(r));
      }
      return _results;
    }
  });
  repeat('1 rule');
  group('no rules');
  repeat('1 rule');
}).call(this);

(function() {
  group('/dao.create', {
    envs: ['storage.paths']
  });
  group('plain', {
    before: function() {
      var i, v;
      this.path_str = this.path_str_5;
      this.path_arr = this.path_arr_5;
      return this.key_str = (function() {
        var _len, _ref, _results;
        _ref = this.path_str;
        _results = [];
        for (i = 0, _len = _ref.length; i < _len; i++) {
          v = _ref[i];
          _results.push('..' + v);
        }
        return _results;
      }).call(this);
    }
  });
  test('    50 paths', {
    run: function() {
      var i;
      i = this.i++ % 50;
      return dao.create(this.key_str[i], true, this.path_str[i], this.path_arr[i]);
    }
  });
  test('   500 paths', {
    run: function() {
      var i;
      i = this.i++ % 500;
      return dao.create(this.key_str[i], true, this.path_str[i], this.path_arr[i]);
    }
  });
  test(' 2 500 paths', {
    run: function() {
      var i;
      i = this.i++ % 2500;
      return dao.create(this.key_str[i], true, this.path_str[i], this.path_arr[i]);
    }
  });
  test(' 5 000 paths', {
    run: function() {
      var i;
      i = this.i++ % 5000;
      return dao.create(this.key_str[i], true, this.path_str[i], this.path_arr[i]);
    }
  });
  group('+/complex', {
    before: function() {
      this.path_str = this.path_str_4;
      return this.path_arr = this.path_arr_4;
    }
  });
  group('  1 nested', {
    before: function() {
      var i, v, _, _len, _ref;
      _ref = this.path_str;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        _ = _ref[i];
        this.path_str[i] += '{..movie.title}';
        this.path_arr[i].push(this.dao._retrieve_dao('..movie.title'));
      }
      return this.key_str = (function() {
        var _len, _ref, _results;
        _ref = this.path_str;
        _results = [];
        for (i = 0, _len = _ref.length; i < _len; i++) {
          v = _ref[i];
          _results.push('..' + v);
        }
        return _results;
      }).call(this);
    }
  });
  repeat('/dao.create.plain');
  group('500 nested', {
    before: function() {
      var i, v, _, _len, _ref;
      _ref = this.path_str;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        _ = _ref[i];
        this.path_str[i] += '{..' + this.path_str_2[i % 500] + '}';
        this.path_arr[i].push(this.dao._retrieve_dao('..' + this.path_str_2[i % 500]));
      }
      return this.key_str = (function() {
        var _len, _ref, _results;
        _ref = this.path_str;
        _results = [];
        for (i = 0, _len = _ref.length; i < _len; i++) {
          v = _ref[i];
          _results.push('..' + v);
        }
        return _results;
      }).call(this);
    }
  });
  repeat('/dao.create.plain');
}).call(this);

(function() {
  group('/storage.get');
  group('< > length', {
    envs: ['storage.data']
  });
  test('2 length', {
    run: function() {
      return this.storage.get(['view', 'active']);
    }
  });
  test('5 length', {
    run: function() {
      return this.storage.get(['simple', 'path', 'with', 'five', 'parts']);
    }
  });
  group('< > count', {
    envs: ['storage.paths']
  });
  test('    50 paths', {
    run: function() {
      var i;
      i = this.i++ % 50;
      return this.storage.get(this.path_arr_5[i]);
    }
  });
  test('   500 paths', {
    run: function() {
      var i;
      i = this.i++ % 500;
      return this.storage.get(this.path_arr_5[i]);
    }
  });
  test(' 2 500 paths', {
    run: function() {
      var i;
      i = this.i++ % 2500;
      return this.storage.get(this.path_arr_5[i]);
    }
  });
}).call(this);

(function() {
  /*
  group
    name: 'storage.set'
    before: ->
      @storage = new core.Storage()

      @i = 0
      @str = gen.path_array(5000)
      @arr = (str.split('.') for str in @str)


  test
    name: '1 length'
    before: ->
      @arr = (str.split('.') for str in gen.path_array(5000, 1))
    run: ->
      @storage.set(@arr[@i++ % 5000], null, 'value')

  test
    name: '2 length'
    before: ->
      @arr = (str.split('.') for str in gen.path_array(5000, 2))
    run: ->
      @storage.set(@arr[@i++ % 5000], null, 'value')

  test
    name: '3 length'
    before: ->
      @arr = (str.split('.') for str in gen.path_array(5000, 3))
    run: ->
      @storage.set(@arr[@i++ % 5000], null, 'value')

  test
    name: '5 length'
    before: ->
      @arr = (str.split('.') for str in gen.path_array(5000, 5))
    run: ->
      @storage.set(@arr[@i++ % 5000], null, 'value')*/
}).call(this);

(function() {
  group('/dao.compile', {
    envs: ['storage.paths']
  });
  group('plain');
  test('  1 path', {
    run: function() {
      return dao.compile('.anna.likes.something');
    }
  });
  test('500 paths', {
    run: function() {
      return dao.compile('.' + this.path_str_3[this.i % 500]);
    }
  });
  group('complex');
  test('  1 path', {
    run: function() {
      return dao.compile('.anna{..but.not.here}');
    }
  });
  test('500 paths', {
    before: function() {
      var i, _, _len, _ref, _results;
      _ref = this.path_str_2;
      _results = [];
      for (i = 0, _len = _ref.length; i < _len; i++) {
        _ = _ref[i];
        _results.push(this.path_str_3[i] += '{..' + this.path_str_2[i % 500 + 500] + '}');
      }
      return _results;
    },
    run: function() {
      return dao.compile('.' + this.path_str_3[this.i % 500]);
    }
  });
}).call(this);

(function() {
  group('/dao.get');
  group('< > length', {
    envs: ['storage.data']
  });
  test('2 length', {
    run: function() {
      return core.get('..view.active');
    }
  });
  test('5 length', {
    run: function() {
      return core.get('..simple.path.with.five.parts');
    }
  });
  group('< > count', {
    envs: ['storage.paths'],
    before: function() {
      var i, v, _len, _ref, _results;
      _ref = this.path_str_5;
      _results = [];
      for (i = 0, _len = _ref.length; i < _len; i++) {
        v = _ref[i];
        _results.push(this.path_str_5[i] = '..' + v);
      }
      return _results;
    }
  });
  test('    50 paths', {
    run: function() {
      var i;
      i = this.i++ % 50;
      return core.get(this.path_str_5[i]);
    }
  });
  test('   500 paths', {
    run: function() {
      var i;
      i = this.i++ % 500;
      return core.get(this.path_str_5[i]);
    }
  });
  test(' 2 500 paths', {
    run: function() {
      var i;
      i = this.i++ % 2500;
      return core.get(this.path_str_5[i]);
    }
  });
}).call(this);


}, '3.0' ,{requires:['fierry.storage']});

YUI.add( 'fierry.dom', function( Env ) {

var core = Env.namespace('core');
var array = Env.namespace('array');
(function() {
  pkg.AbstractDom = (function() {
    function AbstractDom(_parent, _after) {
      this._parent = _parent;
      this._after = _after;
      this._node = this.create_node();
    }
    AbstractDom.prototype.attach = function() {
      if (this._after) {
        return this._parent.injectBefore(this._node, this._after);
      } else {
        return this._parent.appendChild(this._node);
      }
    };
    AbstractDom.prototype.detach = function() {
      return this._parent.removeChild(this._node);
    };
    return AbstractDom;
  })();
}).call(this);

(function() {
  core.Dom = (function() {
    function Dom() {}
    Dom.prototype.$ = function(id) {
      return document.getElementById(id);
    };
    Dom.prototype.replace_html = function(e, html) {
      var n;
      n = e.cloneNode(false);
      if (html) {
        n.innerHTML = html;
      }
      e.parentNode.replaceChild(n, e);
      return n;
    };
    Dom.prototype.create_html = function(html) {
      var div, nodes;
      div = document.createElement('div');
      div.innerHTML = html;
      nodes = array.to_array(div.childNodes);
      if (nodes.length === 1) {
        return nodes[0];
      }
      return nodes;
    };
    Dom.prototype.append_text = function(e, text) {
      return e.appendChild(document.createTextNode(text));
    };
    return Dom;
  })();
}).call(this);

(function() {
  Env.dom = new core.Dom();
}).call(this);


}, '3.0' ,{requires:['fierry.core']});

YUI.add( 'fierry.async', function( Env ) {

var uid = Env.namespace('uid');
var core = Env.namespace('core');
var pkg = Env.namespace('core.scheduler');
var behaviour = Env.namespace('app.add_behavior');
(function() {
  pkg.Async = (function() {
    function Async(_interval, _scheduler) {
      this._interval = _interval;
      this._scheduler = _scheduler;
      this._delay = 0;
      this._running = true;
    }
    Async.prototype.execute = function() {};
    Async.prototype.start = function() {
      this._running = true;
      return this._reschedule();
    };
    Async.prototype.stop = function() {
      return this._running = false;
    };
    Async.prototype.delay = function(delay) {
      return this._delay = delay;
    };
    Async.prototype._reschedule = function() {
      var flag, time;
      if (this._running) {
        time = this._delay || this._interval;
        flag = this._scheduler._schedule(this, time);
        if (flag) {
          this._delay = 0;
        }
      }
      return this;
    };
    return Async;
  })();
}).call(this);

(function() {
  core.register_mixin('async.emitter', function(cls, conf) {
    cls.prototype.set_emitter_disabled = function(disable) {
      return this.__emitter_disabled = true;
    };
    cls.prototype.subscribe = function(fn) {
      return this.__get_listeners().push(fn);
    };
    cls.prototype.unsubscribe = function(fn) {
      return array.erase(this.__get_listeners(), fn);
    };
    cls.prototype.__get_listeners = function() {
      var _ref;
      return (_ref = this.__listeners_registry) != null ? _ref : this.__listeners_registry = [];
    };
    return cls.prototype.dispatch = function() {
      var fn, _i, _len, _ref;
      if (!this.__emitter_disabled) {
        _ref = this.__get_listeners();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          fn = _ref[_i];
          core.async_notify(fn);
        }
      }
    };
  });
}).call(this);

(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  pkg.AsyncFunction = (function() {
    __extends(AsyncFunction, pkg.Async);
    function AsyncFunction(_fn, _periodic, scheduler, time) {
      this._fn = _fn;
      this._periodic = _periodic;
      AsyncFunction.__super__.constructor.call(this, time, scheduler);
    }
    AsyncFunction.prototype.execute = function() {
      if (this._running) {
        this._fn();
        this._reschedule();
        if (!this._periodic) {
          return this._running = false;
        }
      }
    };
    return AsyncFunction;
  })();
}).call(this);

(function() {
  var INSTANCE;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  pkg.Scheduler = (function() {
    function Scheduler() {
      this._run_loop = __bind(this._run_loop, this);;      this._cache = {};
      this._registry = [];
      this._interval = 10;
    }
    Scheduler.prototype.async = function(fn, delay, periodic) {
      var async;
      async = new pkg.AsyncFunction(fn, periodic, this, delay);
      return async._reschedule();
    };
    Scheduler.prototype.async_array = function(arr, fn) {
      var async;
      async = new pkg.AsyncArray(fn, arr.slice(), this, this._interval);
      return async._reschedule();
    };
    Scheduler.prototype._run_loop = function() {
      var async, _i, _len, _ref, _results;
      _ref = this._registry.shift() || [];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        async = _ref[_i];
        this._cache[uid(async)] = false;
        _results.push(async.execute());
      }
      return _results;
    };
    Scheduler.prototype._schedule = function(async, delay) {
      var i, _base, _ref;
      if (this._cache[uid(async)]) {
        return false;
      }
      i = Math.max(0, ((delay / this._interval) << 0) - 1);
      (_ref = (_base = this._registry)[i]) != null ? _ref : _base[i] = [];
      this._registry[i].push(async);
      this._cache[uid(async)] = true;
      return true;
    };
    Scheduler.prototype.start = function() {
      return this._timer = setInterval(this._run_loop, this._interval);
    };
    Scheduler.prototype.stop = function() {
      return clearInterval(this._timer);
    };
    return Scheduler;
  })();
  INSTANCE = new pkg.Scheduler();
  core.async = function(fn, delay, periodic) {
    return INSTANCE.async(fn, delay, periodic);
  };
  core.async_array = function(arr, fn) {
    return INSTANCE.async_array(arr, fn);
  };
  behaviour('resume', function() {
    return INSTANCE.start();
  });
  behaviour('pause', function() {
    return INSTANCE.stop();
  });
  pkg.RAW = new pkg.Scheduler();
  pkg.RAW.start();
}).call(this);

(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  pkg.AsyncArray = (function() {
    __extends(AsyncArray, pkg.Async);
    function AsyncArray(_fn, _arr, scheduler, time) {
      this._fn = _fn;
      this._arr = _arr;
      AsyncArray.__super__.constructor.call(this, time, scheduler);
    }
    AsyncArray.prototype.execute = function() {
      var arg, empty;
      if (this._running) {
        arg = this._arr.shift();
        empty = this._arr.length === 0;
        this._fn(arg, empty);
        this._reschedule();
        if (empty) {
          return this._running = false;
        }
      }
    };
    return AsyncArray;
  })();
}).call(this);

(function() {
  var EMITTER;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  pkg.Emitter = (function() {
    function Emitter() {
      this.notify = __bind(this.notify, this);;      this._dirty = [];
      this._visited = [];
    }
    Emitter.prototype.register_listener = function(fn) {
      if (!this._visited[uid(fn)]) {
        this._visited[uid(fn)] = true;
        return this._dirty.push(fn);
      }
    };
    Emitter.prototype.notify = function() {
      var i, l;
      i = 0;
      l = this._dirty.length;
      while (i < l) {
        this._execute(i++);
        if (i === l) {
          l = this._dirty.length;
        }
      }
      return this._dirty = [];
    };
    Emitter.prototype._execute = function(i) {
      var fn;
      fn = this._dirty[i];
      fn();
      return this._visited[uid(fn)] = false;
    };
    return Emitter;
  })();
  EMITTER = new pkg.Emitter();
  core.async_notify = function(fn) {
    return EMITTER.register_listener(fn);
  };
  core.async(EMITTER.notify, 10, true);
}).call(this);


}, '3.0' ,{requires:['fierry.core']});

YUI.add( 'fierry.performance', function( Env ) {

var app = Env.namespace('app');
var core = Env.namespace('core');
var math = Env.namespace('math');
var array = Env.namespace('array');
var string = Env.namespace('string');
var assert = Env.namespace('assert');
var pfc = Env.namespace('performance');
var pkg = Env.namespace('performance.internal');
var union = Env.namespace('set.union');
var scheduler = Env.namespace('core.scheduler.RAW');
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  pkg.Runner = (function() {
    function Runner(registry, arr) {
      this._run_once = __bind(this._run_once, this);;      this._registry = registry;
      this._suites = this._remove_duplicates(arr);
    }
    Runner.prototype._remove_duplicates = function(arr) {
      var bool, i;
      arr = Array.prototype.slice.call(arr).sort();
      i = 1;
      while (i < arr.length) {
        bool = arr[i].indexOf(arr[i - 1] + '.') === 0;
        if (bool) {
          arr.splice(i, 1);
        } else {
          i++;
        }
      }
      return arr;
    };
    Runner.prototype.run = function() {
      var cases, tests;
      tests = this._extract_tests(this._suites);
      cases = this._build_test_cases(tests);
      this.dispatch("tests.found", tests);
      assert(cases.length > 0, "No test cases found for suites: " + this._suites);
      return scheduler.async_array(cases, this._run_once);
    };
    Runner.prototype._run_once = function(test, last) {
      var arg, time;
      app.stop();
      arg = test.measure();
      time = test.run(arg);
      test.get_result().register(arg, time);
      this.dispatch("test.finished", test);
      if (last) {
        return this.dispatch("tests.finished");
      }
    };
    Runner.prototype._extract_tests = function(arr) {
      var name, obj, r, _i, _len;
      r = [];
      for (_i = 0, _len = arr.length; _i < _len; _i++) {
        name = arr[_i];
        obj = this._registry.get(name);
        if (obj instanceof pkg.Test) {
          r.push(obj);
        }
        if (obj instanceof pkg.Group) {
          r = r.concat(obj.get_tests());
        }
      }
      return r;
    };
    Runner.prototype._build_test_cases = function(tests) {
      var i, r, test, _i, _len, _ref;
      r = [];
      for (_i = 0, _len = tests.length; _i < _len; _i++) {
        test = tests[_i];
        test.create_test_result();
        for (i = 1, _ref = pkg.EXECUTE_RETRY; (1 <= _ref ? i <= _ref : i >= _ref); (1 <= _ref ? i += 1 : i -= 1)) {
          r.push(test);
        }
      }
      return r;
    };
    return Runner;
  })();
  core.install('emitter', pkg.Runner);
}).call(this);

(function() {
  pkg.EXECUTE_RETRY = 5;
  pkg.EXECUTE_LIMIT = 50;
  pkg.MEASURE_LIMIT = 5;
  pkg.MEASURE_RETRY = 3;
}).call(this);

(function() {
  pkg.Environments = (function() {
    function Environments() {
      this._envs = {};
    }
    Environments.prototype.register = function(name, env) {
      var _ref, _ref2;
      (_ref = env.after) != null ? _ref : env.after = function() {};
      (_ref2 = env.before) != null ? _ref2 : env.before = function() {};
      return this._envs[name] = env;
    };
    Environments.prototype.get = function(name) {
      assert(this._envs[name], "Environment '" + name + "' not found");
      return this._envs[name];
    };
    return Environments;
  })();
}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  pkg.ProgressListener = (function() {
    function ProgressListener() {
      this.tests_finished = __bind(this.tests_finished, this);;
      this.test_finished = __bind(this.test_finished, this);;
      this.tests_found = __bind(this.tests_found, this);;      this._count = 0;
      this._group = '';
    }
    ProgressListener.prototype.tests_found = function(tests) {
      return console.log("Found", tests.length, "test cases.");
    };
    ProgressListener.prototype.test_finished = function(test) {
      var group;
      group = test.group.name;
      if (group !== this._group) {
        this._switch_groups(group);
      }
      if (this._is_last_entry()) {
        return console.log(this._get_output_name(test), this._get_output_ops(test), "  ops/ms");
      }
    };
    ProgressListener.prototype.tests_finished = function() {
      var i, _ref, _results;
      _results = [];
      for (i = 0, _ref = this._get_group_length(); (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        _results.push(console.groupEnd());
      }
      return _results;
    };
    ProgressListener.prototype._switch_groups = function(group) {
      var curr, i, j, prev, _ref, _ref2;
      curr = group.split('.');
      prev = this._group.split('.');
      i = 0;
      while (curr[i] === prev[i]) {
        i++;
      }
      for (j = i, _ref = prev.length - 1; (i <= _ref ? j <= _ref : j >= _ref); (i <= _ref ? j += 1 : j -= 1)) {
        console.groupEnd();
      }
      for (j = i, _ref2 = curr.length - 1; (i <= _ref2 ? j <= _ref2 : j >= _ref2); (i <= _ref2 ? j += 1 : j -= 1)) {
        console.group(curr[j]);
      }
      return this._group = group;
    };
    ProgressListener.prototype._get_group_length = function() {
      return this._group.split('.').length - 1;
    };
    ProgressListener.prototype._get_output_name = function(test) {
      return string.rpad(test.name, this._get_padding());
    };
    ProgressListener.prototype._get_output_ops = function(test) {
      var ops, rgx;
      rgx = /(\d+)(\d{3})(\.\d{2})/;
      ops = test.get_result().get_average().toFixed(2);
      ops = ops.replace(rgx, '$1' + ' ' + '$2$3');
      return string.lpad(ops, 10);
    };
    ProgressListener.prototype._is_last_entry = function() {
      return ++this._count % pkg.EXECUTE_RETRY === 0;
    };
    ProgressListener.prototype._get_padding = function() {
      return 50 - this._get_group_length() * 2;
    };
    return ProgressListener;
  })();
}).call(this);

(function() {
  pkg.Test = (function() {
    function Test(_ref, group) {
      this._ref = _ref;
      this.group = group;
      this._results = [];
      this.name = this._ref.name;
      this._run = this._ref.run;
      this._after = this._ref.after || (function() {});
      this._before = this._ref.before || (function() {});
      this._min_arg = this._ref.min_arg || group.get_min_arg();
      this._envs = this._get_envs(this._ref.envs || [], this.group.get_envs());
    }
    Test.prototype.clone = function(group) {
      return new pkg.Test(this._ref, group);
    };
    Test.prototype._get_envs = function(t_names, g_names) {
      var name, _i, _len, _ref, _results;
      _ref = union(t_names, g_names);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        _results.push(pkg.ENVS.get(name));
      }
      return _results;
    };
    Test.prototype.accept = function(visitor) {
      return visitor.on_test(this);
    };
    Test.prototype.measure = function() {
      var arg, arr, i, time;
      if (this._arg) {
        return this._arg;
      }
      arg = 1;
      time = 0;
      while (time === 0) {
        time = this.run(arg);
        arg *= 10;
      }
      while (time < pkg.MEASURE_LIMIT) {
        arg *= 2;
        time = this.run(arg);
      }
      arr = (function() {
        var _ref, _results;
        _results = [];
        for (i = 1, _ref = pkg.MEASURE_RETRY; (1 <= _ref ? i <= _ref : i >= _ref); (1 <= _ref ? i += 1 : i -= 1)) {
          _results.push(this.run(arg));
        }
        return _results;
      }).call(this);
      this._arg = pkg.EXECUTE_LIMIT / math.avg(arr) * arg;
      if (this._arg < this._min_arg) {
        this._arg = this._min_arg;
      }
      return this._arg;
    };
    Test.prototype.run = function(arg) {
      var end, env, i, start, _i, _j, _len, _len2, _ref, _ref2;
      _ref = this._envs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        env = _ref[_i];
        env.before.call(this);
      }
      this.group.run_before(this);
      this._before();
      app.start();
      start = new Date();
      for (i = 0; (0 <= arg ? i <= arg : i >= arg); (0 <= arg ? i += 1 : i -= 1)) {
        this._run();
      }
      end = new Date();
      app.stop();
      this._after;
      this.group.run_after(this);
      _ref2 = this._envs;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        env = _ref2[_j];
        env.after.call(this);
      }
      return end - start;
    };
    Test.prototype.create_test_result = function() {
      return this._results.push(new pkg.TestResult());
    };
    Test.prototype.get_result = function() {
      return this._results[this._results.length - 1];
    };
    return Test;
  })();
}).call(this);

(function() {
  pkg.ConsoleVisitor = (function() {
    function ConsoleVisitor() {}
    ConsoleVisitor.prototype.on_group_start = function(group) {
      return console.group(group.name);
    };
    ConsoleVisitor.prototype.on_group_end = function(group) {
      return console.groupEnd();
    };
    ConsoleVisitor.prototype.on_test = function(test) {
      var name, res;
      name = test.name.substr(test.name.lastIndexOf('.') + 1);
      res = test.get_result();
      return console.log(name, "---", Math.round(res.get_average()), "ops");
    };
    return ConsoleVisitor;
  })();
}).call(this);

(function() {
  pkg.TestResult = (function() {
    function TestResult() {
      this._registry = [];
    }
    TestResult.prototype.register = function(arg, time) {
      if (time !== 0) {
        return this._registry.push(arg / time);
      }
    };
    TestResult.prototype.get_average = function() {
      var ops, sum, _i, _len, _ref;
      sum = 0;
      _ref = this._registry;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ops = _ref[_i];
        sum += ops;
      }
      return sum / this._registry.length;
    };
    TestResult.prototype.get_all = function() {
      return this._registry;
    };
    return TestResult;
  })();
}).call(this);

(function() {
  pkg.Registry = (function() {
    function Registry() {
      this._root = new pkg.Group({
        name: ''
      });
      this._last_group = this._root;
      this._node_group = this._root;
    }
    Registry.prototype.register_group = function(name, h) {
      var group, parent, _ref;
      if (h == null) {
        h = {};
      }
      _ref = this._resolve_name(name), h.name = _ref[0], h.is_node = _ref[1];
      parent = this.get(this._get_parent(h.name));
      group = new pkg.Group(h, parent);
      parent.add(group);
      this._last_group = group;
      if (h.is_node) {
        return this._node_group = group;
      }
    };
    Registry.prototype._resolve_name = function(name) {
      var n_name;
      n_name = this._node_group.name + '.';
      if (/^\//.test(name)) {
        return [name.substr(1), true];
      }
      if (/^\+\//.test(name)) {
        return [n_name + name.substr(2), true];
      }
      return [n_name + name, false];
    };
    Registry.prototype._get_parent = function(name) {
      var idx;
      idx = name.lastIndexOf('.');
      if (idx > -1) {
        return name.substr(0, idx);
      } else {
        return '';
      }
    };
    Registry.prototype.register_test = function(name, h) {
      var parent, test;
      if (h == null) {
        h = {};
      }
      h.name = name;
      parent = h.group ? this.get(h.group) : this._last_group;
      test = new pkg.Test(h, parent);
      return parent.add(test, false);
    };
    Registry.prototype.register_tests_from = function(name) {
      name = this._resolve_name(name)[0];
      return this.get(name).export_tests(this._last_group);
    };
    Registry.prototype.get = function(name) {
      var child, group, _ref;
      group = this._root;
      while (name.length > 0) {
        _ref = this._get_first_child(name), child = _ref[0], name = _ref[1];
        group = group.get(child);
      }
      return group;
    };
    Registry.prototype._get_first_child = function(name) {
      var idx;
      idx = name.indexOf('.');
      if (idx === -1) {
        idx = name.length;
      }
      return [name.substr(0, idx), name.substr(idx + 1)];
    };
    return Registry;
  })();
}).call(this);

(function() {
  pkg.Group = (function() {
    function Group(_ref, parent) {
      this._ref = _ref;
      this.parent = parent;
      this.name = this._ref.name;
      this._nodes = [];
      this._envs = this._ref.envs || [];
      this._after = this._ref.after || (function() {});
      this._before = this._ref.before || (function() {});
      this._min_arg = this._ref.min_arg || 0;
    }
    Group.prototype.accept = function(visitor) {
      var node, _i, _len, _ref;
      visitor.on_group_start(this);
      _ref = this._nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        node.accept(visitor);
      }
      return visitor.on_group_end(this);
    };
    Group.prototype.add = function(node, ignore) {
      var n, _i, _len, _ref;
      _ref = this._nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        if (n.name === node.name) {
          if (ignore) {
            return;
          }
          throw new Error("Node " + node.name + " already exists");
        }
      }
      return this._nodes.push(node);
    };
    Group.prototype.get = function(name) {
      var n, _i, _len, _ref;
      if (this.name !== '') {
        name = this.name + "." + name;
      }
      _ref = this._nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        if (n.name === name) {
          return n;
        }
      }
      throw new Error("Node not found " + this.name + "." + name);
    };
    Group.prototype.get_tests = function() {
      var arr, n, _i, _len, _ref;
      arr = [];
      _ref = this._nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        if (n instanceof pkg.Test) {
          arr.push(n);
        }
        if (n instanceof pkg.Group) {
          arr = arr.concat(n.get_tests());
        }
      }
      return arr;
    };
    Group.prototype.export_tests = function(group) {
      var n, _i, _len, _ref, _results;
      _ref = this._nodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        if (n instanceof pkg.Test) {
          _results.push(group.add(n.clone(group), true));
        }
      }
      return _results;
    };
    Group.prototype.run_before = function(ctx) {
      if (this.parent) {
        this.parent.run_before(ctx);
      }
      return this._before.call(ctx);
    };
    Group.prototype.run_after = function(ctx) {
      this._after.call(ctx);
      if (this.parent) {
        return this.parent.run_after(ctx);
      }
    };
    Group.prototype.get_min_arg = function() {
      if (this.parent) {
        return this._min_arg || this.parent.get_min_arg();
      }
      return this._min_arg;
    };
    Group.prototype.get_envs = function() {
      if (this.parent) {
        return union(this._envs, this.parent.get_envs());
      }
      return this._envs;
    };
    return Group;
  })();
}).call(this);

(function() {
  pkg.INSTANCE = new pkg.Registry();
  pkg.ENVS = new pkg.Environments();
  pfc.register_group = function(group, arg) {
    return pkg.INSTANCE.register_group(group, arg);
  };
  pfc.register_test = function(test, arg) {
    return pkg.INSTANCE.register_test(test, arg);
  };
  pfc.register_tests_from = function(name) {
    return pkg.INSTANCE.register_tests_from(name);
  };
  pfc.register_environment = function(name, env) {
    return pkg.ENVS.register(name, env);
  };
  pfc.run = function() {
    var listener, runner;
    runner = new pkg.Runner(pkg.INSTANCE, arguments);
    listener = new pkg.ProgressListener();
    runner.subscribe("tests.found", listener.tests_found);
    runner.subscribe("test.finished", listener.test_finished);
    runner.subscribe("tests.finished", listener.tests_finished);
    return runner.run();
  };
}).call(this);


}, '3.0' ,{requires:['fierry.core', 'fierry.async']});

YUI.add( 'fierry.core', function( Env ) {

var core = Env.namespace('core');
(function() {
  core.install_head = function(h, fn) {
    var k, v;
    for (k in h) {
      v = h[k];
      fn[k] = v;
    }
    return fn;
  };
}).call(this);

(function() {
  Env.assert = function(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  };
}).call(this);

(function() {
  Env.object = {
    get: function(o, p) {
      var i, _i, _len;
      for (_i = 0, _len = p.length; _i < _len; _i++) {
        i = p[_i];
        if (o === void 0) {
          return;
        }
        o = o[i];
      }
      return o;
    },
    set: function(o, p, v) {
      var e, i, l, _ref;
      i = 0;
      l = p.length - 1;
      while (l--) {
        e = p[i++];
        o = (_ref = o[e]) != null ? _ref : o[e] = {};
      }
      return o[p[i]] = v;
    }
  };
}).call(this);

(function() {
  var $lang;
  Env.lang = $lang = {
    array: function(o) {
      return Array.isArray(o);
    },
    string: function(o) {
      return typeof o === 'string' || o.toString() === '[object String]';
    },
    number: function(o) {
      return typeof o === 'number' || o.toString() === '[object Number]';
    },
    boolean: function(o) {
      return typeof o === 'boolean' || o.toString() === '[object Boolean]';
    },
    "function": function(o) {
      return typeof o === 'function' || o.toString() === '[object Function]';
    },
    object: function(o) {
      return typeof o === 'object' && o.toString() === '[object Object]';
    },
    date: function(o) {
      return o instanceof Date;
    },
    regexp: function(o) {
      return o instanceof RegExp;
    }
  };
}).call(this);

(function() {
  var INSTALLER;
  core.Installer = (function() {
    function Installer() {
      this._reg = {};
    }
    Installer.prototype.register = function(name, fn) {
      Env.assert(!this._reg[name], "Mixin " + name + " already registered.");
      return this._reg[name] = fn;
    };
    Installer.prototype.install = function(name, cls, conf) {
      if (conf == null) {
        conf = {};
      }
      Env.assert(this._reg[name], "Mixin " + name + " not found.");
      return this._reg[name](cls, conf);
    };
    return Installer;
  })();
  INSTALLER = new core.Installer();
  core.register_mixin = function(name, fn) {
    return INSTALLER.register(name, fn);
  };
  core.install = function(name, cls, conf) {
    return INSTALLER.install(name, cls, conf);
  };
}).call(this);

(function() {
  var $uid;
  $uid = {
    stamp: function(obj) {
      var _ref;
      return (_ref = obj.__uid__) != null ? _ref : obj.__uid__ = ++$uid.__counter__;
    },
    __counter__: 1,
    equals: function(a, b) {
      return $uid.stamp(a) === $uid.stamp(b);
    },
    sort_asc: function(a, b) {
      return $uid.stamp(a) - $uid.stamp(b);
    },
    sort_desc: function(a, b) {
      return $uid.stamp(b) - $uid.stamp(a);
    },
    bsearch: function(arr, it) {
      return Env.array.binary_search(it, arr, $uid.sort_asc);
    },
    indexOf: function(arr, it, i) {
      var l;
      if (i == null) {
        i = 0;
      }
      l = arr.length;
      while (i++ < l) {
        if ($uid.equals(arr[i - 1], it)) {
          return i - 1;
        }
      }
      return -1;
    },
    erase: function(arr, it) {
      return array.erase_cst(arr, it, $uid.equals);
    },
    insert: function(arr, it) {
      return array.insert_cst(arr, it, $uid.sort_asc);
    }
  };
  Env.uid = core.install_head($uid, $uid.stamp);
}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  core.App = (function() {
    function App() {
      this.add_behavior = __bind(this.add_behavior, this);;      this._behaviors = {
        stop: [],
        start: [],
        pause: [],
        resume: []
      };
      this._paused = false;
      this._running = false;
    }
    App.prototype.start = function() {
      if (this._can('start')) {
        this._trigger_behavior('start');
        this._trigger_behavior('resume');
        return this._running = true;
      }
    };
    App.prototype.stop = function() {
      if (this._can('stop')) {
        this._running = false;
        if (!this._paused) {
          this._trigger_behavior('pause');
        }
        return this._trigger_behavior('stop');
      }
    };
    App.prototype.resume = function() {
      if (this._can('resume')) {
        this._trigger_behavior('resume');
        return this._paused = false;
      }
    };
    App.prototype.pause = function() {
      if (this._can('pause')) {
        this._paused = true;
        return this._trigger_behavior('pause');
      }
    };
    App.prototype.is_running = function() {
      return this._running && !this._paused;
    };
    App.prototype.is_stopped = function() {
      return !this._running;
    };
    App.prototype.is_paused = function() {
      return this._paused;
    };
    App.prototype._can = function(state) {
      switch (state) {
        case 'stop':
          return this._running;
        case 'start':
          return !this._running;
        case 'pause':
          return this._running && !this._paused;
        case 'resume':
          return this._running && this._paused;
      }
    };
    App.prototype._trigger_behavior = function(state) {
      var fn, _i, _len, _ref;
      _ref = this._behaviors[state];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fn = _ref[_i];
        fn();
      }
    };
    App.prototype.add_behavior = function(state, fn) {
      return this._behaviors[state].push(fn);
    };
    return App;
  })();
  Env.app = new core.App();
}).call(this);

(function() {
  core.PriorityMap = (function() {
    function PriorityMap() {}
    PriorityMap.prototype.get = function(key) {
      var arr;
      arr = this._arr(key);
      return arr[arr.length - 1];
    };
    PriorityMap.prototype.get_all = function(key) {
      return this._arr(key);
    };
    PriorityMap.prototype.set = function(key, value, priority) {
      var arr;
      arr = this._arr(key);
      arr[priority] = value;
      return priority === arr.length - 1;
    };
    PriorityMap.prototype.remove = function(key, priority) {
      var arr, l;
      arr = this._arr(key);
      arr[priority] = void 0;
      if (priority === (l = arr.length - 1)) {
        while (l > -1 && arr[l] === void 0) {
          l--;
        }
        arr.length = l + 1;
        return true;
      }
      return false;
    };
    PriorityMap.prototype._arr = function(key) {
      var _base, _ref, _ref2;
      (_ref = this._map) != null ? _ref : this._map = {};
      return (_ref2 = (_base = this._map)[key]) != null ? _ref2 : _base[key] = [];
    };
    return PriorityMap;
  })();
}).call(this);

(function() {
  var __slice = Array.prototype.slice;
  Env.set = {
    union: function() {
      var args, arr, i, set, _i, _j, _len, _len2;
      arr = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      set = arr.slice();
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        arr = args[_i];
        for (_j = 0, _len2 = arr.length; _j < _len2; _j++) {
          i = arr[_j];
          if (set.indexOf(i) === -1) {
            set.push(i);
          }
        }
      }
      return set;
    },
    difference: function() {
      var args, arr, i, set, _i, _j, _len, _len2;
      arr = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      set = arr.slice();
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        arr = args[_i];
        for (_j = 0, _len2 = arr.length; _j < _len2; _j++) {
          i = arr[_j];
          Env.array.erase(set, i);
        }
      }
      return set;
    }
  };
}).call(this);

(function() {
  var $arr;
  Env.array = $arr = {
    bsearch: function(arr, key) {
      var h, l, mid, mval;
      l = 0;
      h = arr.length - 1;
      while (l <= h) {
        mid = l + h >> 1;
        mval = arr[mid];
        if (mval < key) {
          l = mid + 1;
        } else {
          h = mid - 1;
        }
      }
      if (mval === key) {
        return mid;
      } else {
        return -(l + 1);
      }
    },
    bsearch_cst: function(arr, key, fn) {
      var h, l, mid, mval;
      l = 0;
      h = arr.length - 1;
      while (l <= h) {
        mid = l + h >> 1;
        mval = arr[mid];
        if (fn(mval, key) < 0) {
          l = mid + 1;
        } else {
          h = mid - 1;
        }
      }
      if (mval === key) {
        return mid;
      } else {
        return -(l + 1);
      }
    },
    erase: function(arr, it) {
      var l;
      l = arr.length;
      while (l--) {
        if (arr[l] === it) {
          arr.splice(l, 1);
        }
      }
    },
    erase_cst: function(arr, it, fn) {
      var l;
      l = arr.length;
      while (l--) {
        if (fn(arr[l], it)) {
          arr.splice(l, 1);
        }
      }
    },
    insert: function(arr, it) {
      var i;
      i = $arr.bsearch(arr, it);
      if (i < 0) {
        i = -1 * (i + 1);
      }
      return arr.splice(i >> 0, 0, it);
    },
    insert_cst: function(arr, it, fn) {
      var i;
      i = $arr.bsearch_cst(arr, it, fn);
      if (i < 0) {
        i = -1 * (i + 1);
      }
      return arr.splice(i >> 0, 0, it);
    },
    shuffle: function(arr) {
      var i, j, v;
      i = arr.length;
      while (i--) {
        v = arr[i];
        j = Math.random() * i << 0;
        arr[i] = arr[j];
        arr[j] = v;
      }
      return arr;
    },
    to_array: function(any) {
      return Array.prototype.slice.call(any);
    },
    unique: function(arr) {
      var h, i, k, _i, _len, _results;
      h = {};
      for (_i = 0, _len = arr.length; _i < _len; _i++) {
        i = arr[_i];
        h[i] = true;
      }
      _results = [];
      for (k in h) {
        _results.push(k);
      }
      return _results;
    }
  };
}).call(this);

(function() {
  var __slice = Array.prototype.slice;
  Env.math = {
    avg: function(arr) {
      var i, sum, _i, _len;
      sum = 0;
      for (_i = 0, _len = arr.length; _i < _len; _i++) {
        i = arr[_i];
        sum += i;
      }
      return sum / arr.length;
    },
    rand: function(max) {
      if (max) {
        return Math.random() * max << 0;
      }
      return Math.random();
    },
    ops_per_ms: function() {
      var op, ops, sum, _i, _len;
      ops = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      sum = 0;
      for (_i = 0, _len = ops.length; _i < _len; _i++) {
        op = ops[_i];
        sum += 1 / (op * 1000);
      }
      return 1 / sum / 1000;
    }
  };
}).call(this);

(function() {
  Env.string = {
    lpad: function(str, len) {
      while (str.length < len) {
        str = ' ' + str;
      }
      return str;
    },
    rpad: function(str, len) {
      while (str.length < len) {
        str += ' ';
      }
      return str;
    }
  };
}).call(this);

(function() {
  core.register_mixin('registry', function(cls, conf) {
    cls.prototype.register = function(name, arg) {
      var map, _ref;
      map = (_ref = this._registry_map) != null ? _ref : this._registry_map = {};
      if (!conf.override) {
        assert(!(map[name] != null), "Element " + name + " already registered.");
      }
      return map[name] = arg;
    };
    return cls.prototype.retrieve = function(name) {
      var map, _ref;
      map = (_ref = this._registry_map) != null ? _ref : this._registry_map = {};
      if (!conf.nullable) {
        assert(map[name] != null, "Element " + name + " not found.");
      }
      return map[name];
    };
  });
}).call(this);

(function() {
  var __slice = Array.prototype.slice;
  core.register_mixin('emitter', function(cls, conf) {
    cls.prototype.set_emitter_disabled = function(disable) {
      return this.__emitter_disabled = true;
    };
    cls.prototype.subscribe = function(type, fn) {
      return this.__get_listeners(type).push(fn);
    };
    cls.prototype.unsubscribe = function(type, fn) {
      return array.erase(this.__get_listeners(type), fn);
    };
    cls.prototype.__get_listeners = function(type) {
      var reg, _ref, _ref2;
      reg = (_ref = this.__listeners_registry) != null ? _ref : this.__listeners_registry = {};
      return (_ref2 = reg[type]) != null ? _ref2 : reg[type] = [];
    };
    return cls.prototype.dispatch = function() {
      var args, fn, type, _i, _len, _ref;
      type = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (!this.__emitter_disabled) {
        _ref = this.__get_listeners(type);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          fn = _ref[_i];
          fn.apply(null, args);
        }
      }
    };
  });
}).call(this);

(function() {

}).call(this);


}, '3.0' ,{requires:[]});

YUI.add( 'fierry.pfc.function', function( Env ) {

var core = Env.namespace('core');
var test = Env.namespace('performance.register_test');
var group = Env.namespace('performance.register_group');
(function() {
  group('/function');
}).call(this);

(function() {
  group('/function.execute');
  test('empty', {
    before: function() {
      return this.fn = function() {};
    },
    run: function() {
      return this.fn();
    }
  });
  test('number', {
    before: function() {
      return this.fn = function() {
        return 0;
      };
    },
    run: function() {
      return this.fn();
    }
  });
  test('string', {
    before: function() {
      return this.fn = function() {
        return 'string';
      };
    },
    run: function() {
      return this.fn();
    }
  });
  test('function', {
    before: function() {
      return this.fn = function() {
        return function() {
          return 0;
        };
      };
    },
    run: function() {
      return this.fn();
    }
  });
  test('array', {
    before: function() {
      return this.fn = function() {
        return [];
      };
    },
    run: function() {
      return this.fn();
    }
  });
  test('array > hash -1', {
    before: function() {
      return this.fn = function() {
        return [
          {
            uid: 1,
            type: 'dummy'
          }
        ];
      };
    },
    run: function() {
      return this.fn();
    }
  });
  test('array > hash -1 -alternative', {
    before: function() {
      return this.fn = function() {
        var h;
        h = {
          uid: 1,
          type: 'dummy'
        };
        return [h];
      };
    },
    run: function() {
      return this.fn();
    }
  });
  test('array > hash -2', {
    before: function() {
      return this.fn = function() {
        return [
          {
            uid: 1,
            type: 'dummy'
          }, {
            uid: 2,
            type: 'dummy'
          }
        ];
      };
    },
    run: function() {
      return this.fn();
    }
  });
  test('array > hash -2 -alternative', {
    before: function() {
      return this.fn = function() {
        var h1, h2;
        h1 = {
          uid: 1,
          type: 'dummy'
        };
        h2 = {
          uid: 2,
          type: 'dummy'
        };
        return [h1, h2];
      };
    },
    run: function() {
      return this.fn();
    }
  });
  test('object', {
    before: function() {
      return this.fn = function() {
        return new Object();
      };
    },
    run: function() {
      return this.fn();
    }
  });
  test('hash', {
    before: function() {
      return this.fn = function() {
        return {
          type: 'value'
        };
      };
    },
    run: function() {
      return this.fn();
    }
  });
  test('hash > function -1', {
    before: function() {
      return this.fn = function() {
        return {
          type: 'value',
          func: function() {
            return 0;
          }
        };
      };
    },
    run: function() {
      return this.fn();
    }
  });
  test('hash > function -2', {
    before: function() {
      return this.fn = function() {
        return {
          type: 'value',
          funcA: function() {
            return 0;
          },
          funcB: function() {
            return 1;
          }
        };
      };
    },
    run: function() {
      return this.fn();
    }
  });
  test('hash > function -workaround', {
    before: function() {
      var h1, h2;
      h1 = {
        type: 'dummy',
        value: function() {
          return 1;
        },
        nodes: function() {
          return [];
        }
      };
      h2 = {
        type: 'dummy',
        value: function() {
          return 2;
        },
        nodes: function() {
          return [];
        }
      };
      return this.fn = function() {
        return [h1, h2];
      };
    },
    run: function() {
      return this.fn();
    }
  });
}).call(this);


}, '3.0' ,{requires:['fierry.core', 'fierry.performance']});

YUI.add( 'fierry.pfc.array', function( Env ) {

var uid = Env.namespace('uid');
var core = Env.namespace('core');
var math = Env.namespace('math');
var array = Env.namespace('array');
var gen = Env.namespace('core.generation');
var pkg = Env.namespace('performance.array');
var test = Env.namespace('performance.register_test');
var group = Env.namespace('performance.register_group');
(function() {
  group('/array');
  group('/array.cache');
}).call(this);

(function() {
  group('/array.foreach', {
    before: function() {
      this.i = 0;
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    }
  });
  test('for-in', {
    run: function() {
      var v, _i, _len, _ref;
      _ref = this.arr;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        v = _ref[_i];
        if (v) {
          this.i++;
        }
      }
    }
  });
}).call(this);

(function() {
  group('/array.push-pop', {
    before: function() {
      this.i = 0;
      this.empty = [];
      return this.full = gen.int_array(10000000, 5, true);
    }
  });
  test('-pop-only', {
    run: function() {
      return this.full.pop();
    }
  });
  test('-push-only', {
    run: function() {
      return this.empty.push(this.i++);
    }
  });
  test(' 5 chars', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e'];
    },
    run: function() {
      this.arr.push('f');
      return this.arr.pop();
    }
  });
  test('10 chars', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      this.arr.push('k');
      return this.arr.pop();
    }
  });
  test('50 chars', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      this.arr.push('k');
      return this.arr.pop();
    }
  });
}).call(this);

(function() {
  group('/array.erase');
  group('existing');
  test(' 3 length', {
    run: function() {
      var arr;
      arr = ['a', 'b', 'c'];
      return array.erase(arr, 'b');
    }
  });
  test('10 length', {
    run: function() {
      var arr;
      arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      return array.erase(arr, 'b');
    }
  });
  test('50 length', {
    run: function() {
      var arr;
      arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      return array.erase(arr, 'b');
    }
  });
  group('unexisting');
  test(' 3 length -unexisting', {
    run: function() {
      var arr;
      arr = ['a', 'b', 'c'];
      return array.erase(arr, 'd');
    }
  });
  test('10 length -unexisting', {
    run: function() {
      var arr;
      arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      return array.erase(arr, 'k');
    }
  });
  test('50 length', {
    run: function() {
      var arr;
      arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      return array.erase(arr, 'z');
    }
  });
  group('custom', {
    before: function() {
      return this.fn = function(a, b) {
        return a === b;
      };
    }
  });
  test(' 3 length', {
    run: function() {
      var arr;
      arr = ['a', 'b', 'c'];
      return array.erase_cst(arr, 'b', this.fn);
    }
  });
  test('10 length', {
    run: function() {
      var arr;
      arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      return array.erase_cst(arr, 'b', this.fn);
    }
  });
  test('50 length', {
    run: function() {
      var arr;
      arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', '-', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      return array.erase_cst(arr, 'b', this.fn);
    }
  });
}).call(this);

(function() {
  group('/array.join');
  group('str');
  test(' 5 length -primitive', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e'];
    },
    run: function() {
      var i, str, _i, _len, _ref, _results;
      str = '';
      _ref = this.arr;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        _results.push(str += str ? '.' + i : i);
      }
      return _results;
    }
  });
  test(' 5 length -default-token', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e'];
    },
    run: function() {
      return this.arr.join();
    }
  });
  test(' 5 length -custom-token', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e'];
    },
    run: function() {
      return this.arr.join('.-.');
    }
  });
  test(' 5 length -no-token', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e'];
    },
    run: function() {
      return this.arr.join('');
    }
  });
  test('10 length', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.join();
    }
  });
  test('40 length', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.join();
    }
  });
  test('40 length -no-token', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.join('');
    }
  });
  group('recursive');
  test('small', {
    before: function() {
      return this.arr = [['a', 'b', 'c', 'd']];
    },
    run: function() {
      return this.arr.join();
    }
  });
  test('standard', {
    before: function() {
      return this.arr = ['a', ['b', 'c', 'd'], 'e'];
    },
    run: function() {
      return this.arr.join();
    }
  });
  test('recursive -big', {
    before: function() {
      return this.arr = ['a', ['b', 'c', 'd', 'e'], 'f', 'g', ['h', 'i', 'j', 'k', 'l']];
    },
    run: function() {
      return this.arr.join();
    }
  });
  group('int');
  test('10 length -one-int', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 10];
    },
    run: function() {
      return this.arr.join();
    }
  });
  test('10 length -all-ints', {
    before: function() {
      return this.arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    },
    run: function() {
      return this.arr.join();
    }
  });
}).call(this);

(function() {
  group('/array.push', {
    before: function() {
      this.i = 0;
      return this.empty = [];
    }
  });
  test(' 5 chars', {
    run: function() {
      var arr;
      arr = ['a', 'b', 'c', 'd', 'e'];
      return arr.push('f');
    }
  });
  test('10 chars', {
    run: function() {
      var arr;
      arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      return arr.push('k');
    }
  });
  test('50 chars', {
    run: function() {
      var arr;
      arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      return arr.push('k');
    }
  });
  test('all', {
    run: function() {
      return this.empty.push(this.i++);
    }
  });
}).call(this);

(function() {
  group('/array.concat');
  test(' 5 length', {
    before: function() {
      this.a = ['a', 'b', 'c'];
      return this.b = ['d', 'e'];
    },
    run: function() {
      return this.a.concat(this.b);
    }
  });
  test('10 length', {
    before: function() {
      this.a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
      return this.b = ['k'];
    },
    run: function() {
      return this.a.concat(this.b);
    }
  });
  test('15 length', {
    before: function() {
      this.a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      return this.b = ['k', 'i', 'j', 'l', 'm'];
    },
    run: function() {
      return this.a.concat(this.b);
    }
  });
  test('40 length', {
    before: function() {
      this.a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      return this.b = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.a.concat(this.b);
    }
  });
}).call(this);

(function() {
  group('/array.bsearch', {
    before: function() {
      this.i = 0;
      return this.max = 100000;
    }
  });
  group('int');
  test('    100 -1 step', {
    before: function() {
      return this.ints = gen.int_array(100, 1, true);
    },
    run: function() {
      return array.bsearch(this.ints, this.i++ % this.max);
    }
  });
  test('    100 -5 step', {
    before: function() {
      return this.ints = gen.int_array(100, 5, true);
    },
    run: function() {
      return array.bsearch(this.ints, this.i++ % this.max);
    }
  });
  test(' 10 000 -1 step', {
    before: function() {
      return this.ints = gen.int_array(10000, 1, true);
    },
    run: function() {
      return array.bsearch(this.ints, this.i++ % this.max);
    }
  });
  test(' 10 000 -5 step', {
    before: function() {
      return this.ints = gen.int_array(10000, 5, true);
    },
    run: function() {
      return array.bsearch(this.ints, this.i++ % this.max);
    }
  });
  test('100 000 -1 step', {
    before: function() {
      return this.ints = gen.int_array(100000, 1, true);
    },
    run: function() {
      return array.bsearch(this.ints, this.i++ % this.max);
    }
  });
  test('100 000 -5 step', {
    before: function() {
      return this.ints = gen.int_array(100000, 5, true);
    },
    run: function() {
      return array.bsearch(this.ints, this.i++ % this.max);
    }
  });
  group('string');
  test('    100  -5 length', {
    before: function() {
      return this.arr = gen.string_array(100, 5, true);
    },
    run: function() {
      return array.bsearch(this.arr, this.arr[this.i % 10]);
    }
  });
  test('    100 -20 length', {
    before: function() {
      return this.arr = gen.string_array(100, 20, true);
    },
    run: function() {
      return array.bsearch(this.arr, this.arr[this.i % 10]);
    }
  });
  test(' 10 000  -5 length', {
    before: function() {
      return this.ints = gen.string_array(10000, 5, true);
    },
    run: function() {
      return array.bsearch(this.ints, this.ints[this.i % this.max]);
    }
  });
  test(' 10 000 -20 length', {
    before: function() {
      return this.ints = gen.string_array(10000, 20, true);
    },
    run: function() {
      return array.bsearch(this.ints, this.ints[this.i % this.max]);
    }
  });
  test('100 000  -5 length', {
    before: function() {
      return this.ints = gen.string_array(100000, 5, true);
    },
    run: function() {
      return array.bsearch(this.ints, this.ints[this.i % this.max]);
    }
  });
  test('100 000 -20 length', {
    before: function() {
      return this.ints = gen.string_array(100000, 20, true);
    },
    run: function() {
      return array.bsearch(this.ints, this.ints[this.i % this.max]);
    }
  });
  group('custom', {
    before: function() {
      return this.fn = function(a, b) {
        return a - b;
      };
    }
  });
  test('    100 -1 step', {
    before: function() {
      return this.ints = gen.int_array(100, 1, true);
    },
    run: function() {
      return array.bsearch_cst(this.ints, this.i++ % this.max, this.fn);
    }
  });
  test('    100 -5 step', {
    before: function() {
      return this.ints = gen.int_array(100, 5, true);
    },
    run: function() {
      return array.bsearch_cst(this.ints, this.i++ % this.max, this.fn);
    }
  });
  test(' 10 000 -1 step', {
    before: function() {
      return this.ints = gen.int_array(10000, 1, true);
    },
    run: function() {
      return array.bsearch_cst(this.ints, this.i++ % this.max, this.fn);
    }
  });
  test(' 10 000 -5 step', {
    before: function() {
      return this.ints = gen.int_array(10000, 5, true);
    },
    run: function() {
      return array.bsearch_cst(this.ints, this.i++ % this.max, this.fn);
    }
  });
  test('100 000 -1 step', {
    before: function() {
      return this.ints = gen.int_array(100000, 1, true);
    },
    run: function() {
      return array.bsearch_cst(this.ints, this.i++ % this.max, this.fn);
    }
  });
  test('100 000 -5 step', {
    before: function() {
      return this.ints = gen.int_array(100000, 5, true);
    },
    run: function() {
      return array.bsearch_cst(this.ints, this.i++ % this.max, this.fn);
    }
  });
}).call(this);

(function() {
  group('/array.pop', {
    before: function() {
      return this.full = gen.int_array(10000000, 5, true);
    }
  });
  test(' 5 chars', {
    run: function() {
      var arr;
      arr = ['a', 'b', 'c', 'd', 'e'];
      return arr.pop();
    }
  });
  test('10 chars', {
    run: function() {
      var arr;
      arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      return arr.pop();
    }
  });
  test('50 chars', {
    run: function() {
      var arr;
      arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      return arr.pop();
    }
  });
  test('all', {
    run: function() {
      return this.full.pop();
    }
  });
}).call(this);

(function() {
  group('/array.splice');
  test('     3', {
    run: function() {
      return ['a', 'b', 'c'].splice(1, 0, 'f');
    }
  });
  test('    10', {
    run: function() {
      return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].splice(5, 0, 'k');
    }
  });
  test('   100 -2x', {
    before: function() {
      var i;
      return this.arr = (function() {
        var _results;
        _results = [];
        for (i = 0; i <= 100; i++) {
          _results.push(i);
        }
        return _results;
      })();
    },
    run: function() {
      this.arr.splice(math.rand(100), 0, 'a');
      return this.arr.splice(math.rand(100), 1);
    }
  });
  test('   200 -2x', {
    before: function() {
      var i;
      return this.arr = (function() {
        var _results;
        _results = [];
        for (i = 0; i <= 200; i++) {
          _results.push(i);
        }
        return _results;
      })();
    },
    run: function() {
      this.arr.splice(math.rand(200), 0, 'a');
      return this.arr.splice(math.rand(200), 1);
    }
  });
  test('   500 -2x', {
    before: function() {
      var i;
      return this.arr = (function() {
        var _results;
        _results = [];
        for (i = 0; i <= 500; i++) {
          _results.push(i);
        }
        return _results;
      })();
    },
    run: function() {
      this.arr.splice(math.rand(500), 0, 'a');
      return this.arr.splice(math.rand(500), 1);
    }
  });
  test(' 1 000 -2x', {
    before: function() {
      var i;
      return this.arr = (function() {
        var _results;
        _results = [];
        for (i = 0; i <= 1000; i++) {
          _results.push(i);
        }
        return _results;
      })();
    },
    run: function() {
      this.arr.splice(math.rand(1000), 0, 'a');
      return this.arr.splice(math.rand(1000), 1);
    }
  });
  test('10 000 -500-last -2x', {
    before: function() {
      var i;
      return this.arr = (function() {
        var _results;
        _results = [];
        for (i = 0; i <= 10000; i++) {
          _results.push(i);
        }
        return _results;
      })();
    },
    run: function() {
      this.arr.splice(10000 - math.rand(500), 0, 'a');
      return this.arr.splice(10000 - math.rand(500), 1);
    }
  });
  test('10 000 -all-rand -2x', {
    before: function() {
      var i;
      return this.arr = (function() {
        var _results;
        _results = [];
        for (i = 0; i <= 10000; i++) {
          _results.push(i);
        }
        return _results;
      })();
    },
    run: function() {
      this.arr.splice(math.rand(10000), 0, 'a');
      return this.arr.splice(math.rand(10000), 1);
    }
  });
}).call(this);

(function() {
  group('/array.cache.get');
  test(' 25 000', {
    before: function() {
      var i, _i, _len, _ref, _results;
      this.i = 0;
      this.max = 25000;
      this.ints = gen.int_array(this.max, 5);
      this.cache = [];
      _ref = this.ints;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        _results.push(this.cache[i] = i);
      }
      return _results;
    },
    run: function() {
      return this.cache[this.ints[this.i++ % this.max]];
    }
  });
  test(' 50 000', {
    before: function() {
      var i, _i, _len, _ref, _results;
      this.i = 0;
      this.max = 50000;
      this.ints = gen.int_array(this.max, 5);
      this.cache = [];
      _ref = this.ints;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        _results.push(this.cache[i] = i);
      }
      return _results;
    },
    run: function() {
      return this.cache[this.ints[this.i++ % this.max]];
    }
  });
  test('100 000', {
    before: function() {
      var i, _i, _len, _ref, _results;
      this.i = 0;
      this.max = 100000;
      this.ints = gen.int_array(this.max, 5);
      this.cache = [];
      _ref = this.ints;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        _results.push(this.cache[i] = i);
      }
      return _results;
    },
    run: function() {
      return this.cache[this.ints[this.i++ % this.max]];
    }
  });
}).call(this);

(function() {
  group('/array.insert');
  group('start');
  test(' 3 length', {
    run: function() {
      var arr;
      arr = ['b', 'c', 'e'];
      return array.insert(arr, 'a');
    }
  });
  test('10 length', {
    run: function() {
      var arr;
      arr = ['b', 'c', 'd', 'e', 'f', 'g', 'i', 'j', 'k', 'l'];
      return array.insert(arr, 'a');
    }
  });
  test('50 length', {
    run: function() {
      var arr;
      arr = ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'];
      return array.insert(arr, 'a');
    }
  });
  group('middle');
  test(' 3 length', {
    run: function() {
      var arr;
      arr = ['b', 'c', 'e'];
      return array.insert(arr, 'd');
    }
  });
  test('10 length', {
    run: function() {
      var arr;
      arr = ['b', 'c', 'd', 'e', 'f', 'g', 'i', 'j', 'k', 'l'];
      return array.insert(arr, 'h');
    }
  });
  test('50 length', {
    run: function() {
      var arr;
      arr = ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'];
      return array.insert(arr, 'e');
    }
  });
  group('end');
  test(' 3 length', {
    run: function() {
      var arr;
      arr = ['b', 'c', 'e'];
      return array.insert(arr, 'f');
    }
  });
  test('10 length', {
    run: function() {
      var arr;
      arr = ['b', 'c', 'd', 'e', 'f', 'g', 'i', 'j', 'k', 'l'];
      return array.insert(arr, 'm');
    }
  });
  test('50 length', {
    run: function() {
      var arr;
      arr = ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'];
      return array.insert(arr, 'h');
    }
  });
  group('custom', {
    before: function() {
      return this.fn = function(a, b) {
        if (a < b) {
          return -1;
        } else {
          return 1;
        }
      };
    }
  });
  test(' 3 length', {
    run: function() {
      var arr;
      arr = ['b', 'c', 'e'];
      return array.insert_cst(arr, 'd', this.fn);
    }
  });
  test('10 length', {
    run: function() {
      var arr;
      arr = ['b', 'c', 'd', 'e', 'f', 'g', 'i', 'j', 'k', 'l'];
      return array.insert_cst(arr, 'h', this.fn);
    }
  });
  test('50 length', {
    run: function() {
      var arr;
      arr = ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'];
      return array.insert_cst(arr, 'e', this.fn);
    }
  });
}).call(this);

(function() {
  group('/array.cache.set');
  test('random_int', {
    before: function() {
      this.i = 0;
      this.cache = [];
      this.max = 100000;
      return this.ints = gen.int_array(this.max, 20);
    },
    run: function() {
      return this.cache[this.ints[this.i++ % this.max]] = true;
    }
  });
  test('uid', {
    before: function() {
      var i;
      this.i = 0;
      this.cache = [];
      this.max = 100000;
      return this.objects = (function() {
        var _ref, _results;
        _results = [];
        for (i = 0, _ref = this.max; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
          _results.push({});
        }
        return _results;
      }).call(this);
    },
    run: function() {
      return this.cache[uid(this.objects[this.i++ % this.max])] = true;
    }
  });
}).call(this);

(function() {
  group('/array.slice');
  test('small -clone', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e'];
    },
    run: function() {
      return this.arr.slice();
    }
  });
  test('standard -clone', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.slice();
    }
  });
  test('inx-1', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.slice(1);
    }
  });
  test('inx-5', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.slice(5);
    }
  });
  test('inx-9', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.slice(9);
    }
  });
  test('big', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.slice(15);
    }
  });
}).call(this);

(function() {
  group('/array.indexOf');
  test('     0 length', {
    before: function() {
      return this.arr = [];
    },
    run: function() {
      return this.arr.indexOf('path');
    }
  });
  test('    10 length -first-found', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.indexOf('a');
    }
  });
  test('    10 length -middle-found', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.indexOf('d');
    }
  });
  test('    10 length -last-found', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.indexOf('j');
    }
  });
  test('    10 length -not-found', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.indexOf('z');
    }
  });
  test('    40 length -found', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.indexOf('j');
    }
  });
  test('    40 length -not-found', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.indexOf('z');
    }
  });
  test('   500 length', {
    before: function() {
      this.arr = gen.string_array(500, 5);
      return this.it = this.arr[math.rand(500)];
    },
    run: function() {
      return this.arr.indexOf(this.it);
    }
  });
  test(' 5 000 length', {
    before: function() {
      this.arr = gen.string_array(5000, 5);
      return this.it = this.arr[math.rand(5000)];
    },
    run: function() {
      return this.arr.indexOf(this.it);
    }
  });
  test('50 000 length', {
    before: function() {
      this.arr = gen.string_array(50000, 5);
      return this.it = this.arr[math.rand(50000)];
    },
    run: function() {
      return this.arr.indexOf(this.it);
    }
  });
}).call(this);

(function() {
  group('/array.shift-unshift', {
    before: function() {
      this.i = 0;
      this.empty = [];
      return this.full = gen.int_array(10000000, 5, true);
    }
  });
  test('-shift-only', {
    run: function() {
      return this.full.shift();
    }
  });
  test('-unshift-only', {
    run: function() {
      return this.empty.unshift(this.i++);
    }
  });
  test(' 5 chars', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e'];
    },
    run: function() {
      this.arr.unshift('f');
      return this.arr.shift();
    }
  });
  test('10 chars', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      this.arr.unshift('k');
      return this.arr.shift();
    }
  });
  test('50 chars', {
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      this.arr.unshift('k');
      return this.arr.shift();
    }
  });
}).call(this);


}, '3.0' ,{requires:['fierry.generation', 'fierry.performance']});

YUI.add( 'fierry.generation', function( Env ) {

var core = Env.namespace('core');
var math = Env.namespace('math');
var array = Env.namespace('array');
var uid = Env.namespace('uid');
var pkg = Env.namespace('core.generation');
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  pkg.IntGenerator = (function() {
    function IntGenerator() {
      this._ireg = {};
    }
    IntGenerator.prototype.int_array = function(count, step, sorted) {
      var k, _base, _ref;
      if (step == null) {
        step = 1;
      }
      if (sorted == null) {
        sorted = false;
      }
      k = "" + count + "_" + sorted;
      return (_ref = (_base = this._ireg)[k]) != null ? _ref : _base[k] = __bind(function() {
        var arr, i, j;
        i = 0;
        arr = (function() {
          var _results;
          _results = [];
          for (j = 1; (1 <= count ? j <= count : j >= count); (1 <= count ? j += 1 : j -= 1)) {
            _results.push(i += math.rand(step - 1) + 1);
          }
          return _results;
        })();
        if (!sorted) {
          array.shuffle(arr);
        }
        return arr;
      }, this)();
    };
    return IntGenerator;
  })();
}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  pkg.StringGenerator = (function() {
    function StringGenerator() {
      this._sreg = {};
      this._min_char = 0;
      this._max_length = 20;
    }
    StringGenerator.prototype.string_array = function(count, length, sorted, range) {
      var k, _base, _ref;
      if (length == null) {
        length = 10;
      }
      if (sorted == null) {
        sorted = false;
      }
      if (range == null) {
        range = 127;
      }
      k = "" + count + "_" + length + "_" + range + "_" + sorted;
      return (_ref = (_base = this._sreg)[k]) != null ? _ref : _base[k] = __bind(function() {
        var arr, str;
        arr = this._get_string_array(count, range);
        arr = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = arr.length; _i < _len; _i++) {
            str = arr[_i];
            _results.push(str.substr(0, length));
          }
          return _results;
        })();
        if (sorted) {
          arr.sort();
        }
        return arr;
      }, this)();
    };
    StringGenerator.prototype._get_string_array = function(count, range) {
      var k, _base, _ref;
      k = "" + count + "_" + this._max_length + "_" + range + "_false";
      return (_ref = (_base = this._sreg)[k]) != null ? _ref : _base[k] = this._gen_string_array(count, range);
    };
    StringGenerator.prototype._gen_string_array = function(count, range, min_char) {
      var arr, char, i, j, str, _, _results;
      if (min_char == null) {
        min_char = this._min_char;
      }
      _results = [];
      for (_ = 1; (1 <= count ? _ <= count : _ >= count); (1 <= count ? _ += 1 : _ -= 1)) {
        arr = (function() {
          var _ref, _results;
          _results = [];
          for (j = 1, _ref = this._max_length; (1 <= _ref ? j <= _ref : j >= _ref); (1 <= _ref ? j += 1 : j -= 1)) {
            i = math.rand(range) + min_char;
            _results.push(char = String.fromCharCode(i));
          }
          return _results;
        }).call(this);
        _results.push(str = arr.join(''));
      }
      return _results;
    };
    StringGenerator.prototype.big_string = function(length, range) {
      var key, _base, _ref;
      if (range == null) {
        range = 200;
      }
      key = "" + length + "_" + range;
      return (_ref = (_base = this._sreg)[key]) != null ? _ref : _base[key] = __bind(function() {
        var arr, count;
        count = Math.ceil(length / this._max_length);
        arr = this._get_string_array(count, range);
        return arr.join('');
      }, this)();
    };
    return StringGenerator;
  })();
}).call(this);

(function() {
  pkg.PathGenerator = (function() {
    function PathGenerator() {
      this._reg = {};
    }
    PathGenerator.prototype.path_array = function(count, length, arr) {
      var key, _base, _ref;
      if (length == null) {
        length = 5;
      }
      if (arr == null) {
        arr = pkg.PATHS_ARRAY;
      }
      key = "" + (uid(arr)) + "_" + count + "_" + length;
      return (_ref = (_base = this._reg)[key]) != null ? _ref : _base[key] = this._get_path_array(arr, count, length);
    };
    PathGenerator.prototype.rules_array = function(count, length, arr) {
      var i, l, parr, path, _len, _results;
      if (length == null) {
        length = 5;
      }
      if (arr == null) {
        arr = pkg.PATHS_ARRAY;
      }
      l = arr.length;
      parr = this.path_array(count * l, length - 1, arr);
      _results = [];
      for (i = 0, _len = parr.length; i < _len; i++) {
        path = parr[i];
        _results.push(parr[i % l] + '.' + path.replace(parr[math.rand(l - 1)], '*'));
      }
      return _results;
    };
    PathGenerator.prototype._get_path_array = function(arr, count, length) {
      var key, max;
      key = "" + (uid(arr)) + "_" + length;
      max = this._reg[key] || [];
      if (max.length < count) {
        max = this._reg[key] = this._permutate_paths(arr, count, length);
      }
      return max.slice(0, count);
    };
    PathGenerator.prototype._permutate_paths = function(arr, count, length) {
      var l, _, _results;
      l = arr.length;
      _results = [];
      while (count--) {
        _results.push(((function() {
          var _ref, _results;
          _results = [];
          for (_ = 0, _ref = length - 1; (0 <= _ref ? _ <= _ref : _ >= _ref); (0 <= _ref ? _ += 1 : _ -= 1)) {
            _results.push(arr[math.rand(l - 1)]);
          }
          return _results;
        })()).join('.'));
      }
      return _results;
    };
    return PathGenerator;
  })();
}).call(this);

(function() {
  pkg.INT_INSTANCE = new pkg.IntGenerator();
  pkg.PATH_INSTANCE = new pkg.PathGenerator();
  pkg.STRING_INSTANCE = new pkg.StringGenerator();
  pkg.int_array = function(count, step, sorted) {
    return pkg.INT_INSTANCE.int_array(count, step, sorted);
  };
  pkg.string_array = function(count, length, range, sorted) {
    return pkg.STRING_INSTANCE.string_array(count, length, range, sorted);
  };
  pkg.big_string = function(length, range) {
    return pkg.STRING_INSTANCE.big_string(length, range);
  };
  pkg.path_array = function(count, length, arr) {
    return pkg.PATH_INSTANCE.path_array(count, length, arr).slice();
  };
  pkg.rules_array = function(count, length, arr) {
    return pkg.PATH_INSTANCE.rules_array(count, length, arr).slice();
  };
  pkg.PATHS_ARRAY = ['open', 'seem', 'together', 'next', 'white', 'children', 'begin', 'got', 'walk', 'example', 'ease', 'paper', 'often', 'always', 'music', 'those', 'both', 'mark', 'book', 'letter', 'until', 'mile', 'river', 'car', 'feet', 'care', 'second', 'group', 'carry', 'took', 'rain', 'eat', 'room', 'friend', 'began', 'idea', 'fish', 'mountain', 'north', 'once', 'base', 'hear', 'horse', 'cut', 'sure', 'watch', 'color', 'face', 'wood', 'main'];
}).call(this);


}, '3.0' ,{requires:['fierry.core']});

