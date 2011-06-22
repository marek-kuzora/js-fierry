YUI.add( 'fierry.pfc.dom', function( Env ) {

var dom = Env.namespace('dom');
var test = Env.namespace('performance.register_test');
var group = Env.namespace('performance.register_group');
(function() {
  group({
    name: 'dom',
    before: function() {
      return this.stub = dom.$('stub');
    },
    after: function() {
      return this.stub = dom.replace_html(this.stub);
    }
  });
}).call(this);

(function() {
  group({
    name: 'dom.styles'
  });
  test({
    name: 'background',
    before: function() {
      this.flag = true;
      return this.div = document.createElement('div');
    },
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
  test({
    name: 'position',
    before: function() {
      this.flag = true;
      return this.div = document.createElement('div');
    },
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
  test({
    name: 'opacity',
    before: function() {
      this.flag = true;
      return this.div = document.createElement('div');
    },
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
  group({
    name: 'dom.basics'
  });
  group({
    name: 'dom.basics.elements'
  });
  test({
    name: 'create',
    run: function() {
      return document.createElement('div');
    }
  });
  test({
    name: 'clone',
    before: function() {
      return this.div = document.createElement('div');
    },
    run: function() {
      return this.div.cloneNode();
    }
  });
  group({
    name: 'dom.basics.selectors'
  });
  test({
    name: 'getElementById',
    run: function() {
      return document.getElementById('stub');
    }
  });
  test({
    name: 'querySelector',
    run: function() {
      return document.querySelector('[id="stub"]');
    }
  });
  test({
    name: 'querySelectorAll',
    run: function() {
      return document.querySelectorAll('[id="stub"]');
    }
  });
}).call(this);

(function() {
  var fragment_replace, inner_html_replace, mixed_html_replace, naive_replace;
  group({
    name: 'dom.replace',
    min_arg: 2500
  });
  naive_replace = {
    name: 'naive -cached',
    run: function() {
      var e, _i, _len, _ref;
      _ref = this.arr;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        this.stub.appendChild(e.cloneNode(true));
      }
      return this.stub = dom.replace_html(this.stub);
    }
  };
  fragment_replace = {
    name: 'fragment -cached',
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
  };
  inner_html_replace = {
    name: 'inner_html',
    run: function() {
      this.stub.innerHTML = this.html;
      return this.stub.innerHTML = '';
    }
  };
  mixed_html_replace = {
    name: 'replace_html',
    run: function() {
      return this.stub = dom.replace_html(this.stub, this.html);
    }
  };
  group({
    name: 'dom.replace.small',
    before: function() {
      this.html = '<div></div><span>text node</span><a></a>';
      return this.arr = dom.create_html(this.html);
    }
  });
  test({
    name: 'naive',
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
  test(naive_replace);
  test(fragment_replace);
  test(inner_html_replace);
  test(mixed_html_replace);
  group({
    name: 'dom.replace.flat',
    before: function() {
      this.html = '<a>A</a><a>B</a><a>C</a><a>D</a><a>E</a><a>F</a><a>G</a><a>H</a><a>I</a><a>J</a><a>K</a>\
             <a>L</a><a>M</a><a>N</a><a>O</a><a>P</a><a>R</a><a>S</a><a>T</a><a>U</a><a>W</a><a>X</a>\
             <a>Y</a><a>Z</a><a>_</a>';
      return this.arr = dom.create_html(this.html);
    }
  });
  test({
    name: 'naive',
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
  test({
    name: 'naive -bad',
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
  test(naive_replace);
  test(fragment_replace);
  test(inner_html_replace);
  test(mixed_html_replace);
  group({
    name: 'dom.replace.deep',
    before: function() {
      this.html = '<div><div><div>\n  <p><a><span>text node</span></a></p>\n  <p><a><span>text node</span></a></p>\n  <p><a><span>text node</span></a></p>\n</div></div></div>\n<div><div><div>\n  <p><a><span>text node</span></a></p>\n  <p><a><span>text node</span></a></p>\n  <p><a><span>text node</span></a></p>\n</div></div></div>';
      return this.arr = dom.create_html(this.html);
    }
  });
  test({
    name: 'naive',
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
  test({
    name: 'naive -bad',
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
  test(naive_replace);
  test(fragment_replace);
  test(inner_html_replace);
  test(mixed_html_replace);
}).call(this);

(function() {
  group({
    name: 'dom.attrs'
  });
  test({
    name: 'id',
    before: function() {
      this.flag = true;
      return this.div = document.createElement('div');
    },
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
  test({
    name: 'class',
    before: function() {
      this.flag = true;
      return this.div = document.createElement('div');
    },
    run: function() {
      this.flag = !this.flag;
      if (this.flag) {
        this.div.className = 'bold black';
      }
      if (this.flag) {
        return this.div.className = 'title italic';
      }
    }
  });
  test({
    name: 'title',
    before: function() {
      this.flag = true;
      return this.div = document.createElement('div');
    },
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
  group({
    name: 'dom.append',
    before: function() {
      this.i = 0;
      return this.node = this.stub;
    }
  });
  test({
    name: 'flat',
    run: function() {
      var e;
      e = document.createElement('div');
      return this.node.appendChild(e);
    }
  });
  test({
    name: 'hierarchical',
    run: function() {
      var e;
      e = document.createElement('div');
      this.node.appendChild(e);
      if (this.i++ % 200) {
        return this.node = e;
      }
    }
  });
}).call(this);


}, '3.0' ,{requires:['fierry.dom', 'fierry.performance']});

YUI.add( 'fierry.pfc.core.string', function( Env ) {

var core = Env.namespace('core');
var gen = Env.namespace('core.generation');
var test = Env.namespace('performance.register_test');
var group = Env.namespace('performance.register_group');
(function() {
  group({
    name: 'string'
  });
  group({
    name: 'string.regexp'
  });
}).call(this);

(function() {
  group({
    name: 'string.substr'
  });
  test({
    name: '   25 chars',
    before: function() {
      this.i = 0;
      this.str = gen.big_string(25);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.substr(this.i++ % this.len);
    }
  });
  test({
    name: '  250 chars',
    before: function() {
      this.i = 0;
      this.str = gen.big_string(250);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.substr(this.i++ % this.len);
    }
  });
  test({
    name: '2 500 chars',
    before: function() {
      this.i = 0;
      this.str = gen.big_string(2500);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.substr(this.i++ % this.len);
    }
  });
  test({
    name: '   25 chars -10-length',
    before: function() {
      this.i = 0;
      this.str = gen.big_string(25);
      return this.len = this.str.length - 11;
    },
    run: function() {
      return this.str.substr(this.i++ % this.len, 10);
    }
  });
  test({
    name: '  250 chars -10-length',
    before: function() {
      this.i = 0;
      this.str = gen.big_string(250);
      return this.len = this.str.length - 11;
    },
    run: function() {
      return this.str.substr(this.i++ % this.len, 10);
    }
  });
  test({
    name: '2 500 chars -10-length',
    before: function() {
      this.i = 0;
      this.str = gen.big_string(2500);
      return this.len = this.str.length - 11;
    },
    run: function() {
      return this.str.substr(this.i++ % this.len, 10);
    }
  });
}).call(this);

(function() {
  group({
    name: 'string.split'
  });
  test({
    name: 'character',
    before: function() {
      return this.str = 'simple.path.with.five.parts';
    },
    run: function() {
      return this.str.split('.');
    }
  });
  test({
    name: 'regrex',
    before: function() {
      return this.str = 'simple.path/with.six.parts/yep';
    },
    run: function() {
      return this.str.split(/\/|\./);
    }
  });
  test({
    name: 'double',
    before: function() {
      return this.str = 'simple.path/with.six.parts/yep';
    },
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
  group({
    name: 'string.regexp.replace'
  });
  test({
    name: '20 chars -1 replace',
    before: function() {
      return this.str = 'aaa|bbb|ccc|ddd|eee|';
    },
    run: function() {
      return this.str.replace(/a/, '&');
    }
  });
  test({
    name: '30 chars -0 replace',
    before: function() {
      return this.str = '.xxx{.sasa{.fafa}gaga}cos{.xxx}';
    },
    run: function() {
      return this.str.replace(/\ /g, '');
    }
  });
  test({
    name: '30 chars -6 replace',
    before: function() {
      return this.str = '.xxx{.sasa{.fafa}gaga}cos{.xxx}';
    },
    run: function() {
      return this.str.replace(/\{/g, '');
    }
  });
}).call(this);

(function() {
  group({
    name: 'string.regexp.index-of'
  });
  test({
    name: 'start',
    before: function() {
      return this.str = 'simple.path.with.five.parts';
    },
    run: function() {
      return this.str.indexOf('simple') !== -1;
    }
  });
  test({
    name: 'start -last',
    before: function() {
      return this.str = 'simple.path.with.five.parts';
    },
    run: function() {
      return this.str.lastIndexOf('parts') !== -1;
    }
  });
  test({
    name: 'end',
    before: function() {
      return this.str = 'simple.path.with.five.parts';
    },
    run: function() {
      return this.str.indexOf('parts') !== -1;
    }
  });
  test({
    name: 'end -last',
    before: function() {
      return this.str = 'simple.path.with.five.parts';
    },
    run: function() {
      return this.str.lastIndexOf('simple') !== -1;
    }
  });
  test({
    name: 'not_found',
    before: function() {
      return this.str = 'simple.path.with.five.parts';
    },
    run: function() {
      return this.str.indexOf('---') !== -1;
    }
  });
  test({
    name: 'not_found -last',
    before: function() {
      return this.str = 'simple.path.with.five.parts';
    },
    run: function() {
      return this.str.lastIndexOf('---') !== -1;
    }
  });
}).call(this);

(function() {
  group({
    name: 'string.regexp.match'
  });
  test({
    name: 'regexp -same',
    before: function() {
      this.str = 'menu.items.0';
      return this.regexp = /^menu\.items\.[a-zA-Z0-9_]+/;
    },
    run: function() {
      return this.str.match(this.regexp);
    }
  });
  test({
    name: 'regexp -dynamic',
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
  test({
    name: 'regexp_from_string',
    before: function() {
      this.str = 'menu.items.0';
      return this.regexp = new RegExp("^menu\.items\.[a-zA-Z0-9_]+");
    },
    run: function() {
      return this.str.match(this.regexp);
    }
  });
  test({
    name: 'string',
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
  group({
    name: 'string.sequential-read'
  });
  group({
    name: 'string.sequential-read.char-code-at'
  });
  test({
    name: '   250 chars',
    before: function() {
      this.str = gen.big_string(250);
      return this.len = this.str.length - 1;
    },
    run: function() {
      var i, _ref;
      for (i = 0, _ref = this.len; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        this.str.charCodeAt(core.rand(i));
      }
    }
  });
  test({
    name: ' 2 500 chars',
    before: function() {
      this.str = gen.big_string(2500);
      return this.len = this.str.length - 1;
    },
    run: function() {
      var i, _ref;
      for (i = 0, _ref = this.len; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        this.str.charCodeAt(core.rand(i));
      }
    }
  });
  test({
    name: '25 000 chars',
    before: function() {
      this.str = gen.big_string(25000);
      return this.len = this.str.length - 1;
    },
    run: function() {
      var i, _ref;
      for (i = 0, _ref = this.len; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        this.str.charCodeAt(core.rand(i));
      }
    }
  });
  group({
    name: 'string.sequential-read.char-at'
  });
  test({
    name: '   250 chars',
    before: function() {
      this.str = gen.big_string(250);
      return this.len = this.str.length - 1;
    },
    run: function() {
      var i, _ref;
      for (i = 0, _ref = this.len; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        this.str.charAt(core.rand(i));
      }
    }
  });
  test({
    name: ' 2 500 chars',
    before: function() {
      this.str = gen.big_string(2500);
      return this.len = this.str.length - 1;
    },
    run: function() {
      var i, _ref;
      for (i = 0, _ref = this.len; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        this.str.charAt(core.rand(i));
      }
    }
  });
  test({
    name: '25 000 chars',
    before: function() {
      this.str = gen.big_string(25000);
      return this.len = this.str.length - 1;
    },
    run: function() {
      var i, _ref;
      for (i = 0, _ref = this.len; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        this.str.charAt(core.rand(i));
      }
    }
  });
  group({
    name: 'string.sequential-read.direct'
  });
  test({
    name: '   250 chars',
    before: function() {
      this.str = gen.big_string(250);
      return this.len = this.str.length - 1;
    },
    run: function() {
      var i, _ref;
      for (i = 0, _ref = this.len; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        this.str.charAt(core.rand(i));
      }
    }
  });
  test({
    name: ' 2 500 chars',
    before: function() {
      this.str = gen.big_string(2500);
      return this.len = this.str.length - 1;
    },
    run: function() {
      var i, _ref;
      for (i = 0, _ref = this.len; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        this.str.charAt(core.rand(i));
      }
    }
  });
  test({
    name: '25 000 chars',
    before: function() {
      this.str = gen.big_string(25000);
      return this.len = this.str.length - 1;
    },
    run: function() {
      var i, _ref;
      for (i = 0, _ref = this.len; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        this.str[core.rand(i)];
      }
    }
  });
}).call(this);

(function() {
  group({
    name: 'string.regexp.search'
  });
  test({
    name: 'string',
    before: function() {
      return this.str = 'simple.path.with.five.parts';
    },
    run: function() {
      return this.str.search('path');
    }
  });
  test({
    name: 'regexp',
    before: function() {
      return this.str = 'simple.path.with.five.parts';
    },
    run: function() {
      return this.str.search(/\./);
    }
  });
  test({
    name: 'regexp_or',
    before: function() {
      return this.str = 'simple.path.with.five.parts';
    },
    run: function() {
      return this.str.search(/(\.|\{)/);
    }
  });
}).call(this);

(function() {
  group({
    name: 'string.access'
  });
  group({
    name: 'string.access.char-code-at'
  });
  test({
    name: '   250 chars',
    before: function() {
      this.str = gen.big_string(250);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.charCodeAt(core.rand(this.len));
    }
  });
  test({
    name: ' 2 500 chars',
    before: function() {
      this.str = gen.big_string(2500);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.charCodeAt(core.rand(this.len));
    }
  });
  test({
    name: '25 000 chars',
    before: function() {
      this.str = gen.big_string(25000);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.charCodeAt(core.rand(this.len));
    }
  });
  group({
    name: 'string.access.char-at'
  });
  test({
    name: '   250 chars',
    before: function() {
      this.str = gen.big_string(250);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.charAt(core.rand(this.len));
    }
  });
  test({
    name: ' 2 500 chars',
    before: function() {
      this.str = gen.big_string(2500);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.charAt(core.rand(this.len));
    }
  });
  test({
    name: '25 000 chars',
    before: function() {
      this.str = gen.big_string(25000);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str.charAt(core.rand(this.len));
    }
  });
  group({
    name: 'string.access.direct'
  });
  test({
    name: '   250 chars',
    before: function() {
      this.str = gen.big_string(250);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str[core.rand(this.len)];
    }
  });
  test({
    name: ' 2 500 chars',
    before: function() {
      this.str = gen.big_string(2500);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str[core.rand(this.len)];
    }
  });
  test({
    name: '25 000 chars',
    before: function() {
      this.str = gen.big_string(25000);
      return this.len = this.str.length - 1;
    },
    run: function() {
      return this.str[core.rand(this.len)];
    }
  });
}).call(this);


}, '3.0' ,{requires:['fierry.generation', 'fierry.performance']});

YUI.add( 'fierry.pfc.core.object', function( Env ) {

var core = Env.namespace('core');
var object = Env.namespace('object');
var gen = Env.namespace('core.generation');
var test = Env.namespace('performance.register_test');
var group = Env.namespace('performance.register_group');
(function() {
  group({
    name: 'object'
  });
  group({
    name: 'object.cache'
  });
}).call(this);

(function() {
  group({
    name: 'object.cache.get'
  });
  test({
    name: ' 25 000',
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
  test({
    name: ' 50 000',
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
  test({
    name: '100 000',
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
}).call(this);

(function() {
  group({
    name: 'object.get'
  });
  group({
    name: 'object.get.standard'
  });
  test({
    name: 'depth-1',
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
  test({
    name: 'depth-2',
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
  test({
    name: 'depth-3',
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
  test({
    name: 'depth-4',
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
  group({
    name: 'object.get.not-exist'
  });
  test({
    name: 'depth-1',
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
  test({
    name: 'depth-2',
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
  group({
    name: 'object.get.array'
  });
  test({
    name: 'depth-2 -array-only',
    before: function() {
      return this.o = [0, 1, [0, 1, 2], 2];
    },
    run: function() {
      return object.get(this.o, ['2', '2']);
    }
  });
  test({
    name: 'depth-2 -int-path',
    before: function() {
      return this.o = {
        a: ['a', 'b', 'c', 'd', 'e', 'f']
      };
    },
    run: function() {
      return object.get(this.o, ['a', 0]);
    }
  });
  test({
    name: 'depth-2',
    before: function() {
      return this.o = {
        a: ['a', 'b', 'c', 'd', 'e', 'f']
      };
    },
    run: function() {
      return object.get(this.o, ['a', '0']);
    }
  });
  test({
    name: 'depth-3',
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
  test({
    name: 'depth-3 -array^2',
    before: function() {
      return this.o = {
        a: ['a', ['b', 'c', 'd'], 'e', 'f']
      };
    },
    run: function() {
      return object.get(this.o, ['a', '1', '1']);
    }
  });
  test({
    name: 'depth-4',
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
  group({
    name: 'object.cache.set'
  });
  test({
    name: 'random_int',
    before: function() {
      this.i = 0;
      this.cache = {};
      this.max = 100000;
      return this.ints = gen.int_array(100000, 20);
    },
    run: function() {
      return this.cache[this.ints[this.i++ % this.max]] = true;
    }
  });
  test({
    name: 'core.uid',
    before: function() {
      return this.cache = {};
    },
    run: function() {
      return this.cache[core.uid({})] = true;
    }
  });
  test({
    name: 'random_string',
    before: function() {
      this.i = 0;
      this.cache = {};
      this.max = 100000;
      return this.strings = gen.string_array(100000, 10);
    },
    run: function() {
      return this.cache[this.strings[this.i++ % this.max]] = true;
    }
  });
  test({
    name: 'prefix_string',
    before: function() {
      this.i = 0;
      this.cache = {};
      this.max = 100000;
      this.prefix = 'asdfg';
      return this.strings = gen.string_array(100000, 5);
    },
    run: function() {
      return this.cache[this.prefix + this.strings[this.i++ % this.max]] = true;
    }
  });
  test({
    name: 'yui_stamp',
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
  group({
    name: 'object.set'
  });
  group({
    name: 'object.set.new'
  });
  test({
    name: 'depth-1',
    before: function() {
      return this.o = {
        a: 'a',
        b: 'b',
        c: 'c'
      };
    },
    run: function() {
      return object.set(this.o, ['d'], 'd');
    }
  });
  test({
    name: 'depth-2',
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
      return object.set(this.o, ['b', 'f'], 'f');
    }
  });
  test({
    name: 'depth-3',
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
      return object.set(this.o, ['b', 'd', 'h'], 'h');
    }
  });
  group({
    name: 'object.set.chg'
  });
  test({
    name: 'depth-1',
    before: function() {
      return this.o = {
        a: 'a',
        b: 'b',
        c: 'c'
      };
    },
    run: function() {
      return object.set(this.o, ['c'], 'd');
    }
  });
  test({
    name: 'depth-2',
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
      return object.set(this.o, ['b', 'd'], 'f');
    }
  });
  test({
    name: 'depth-3',
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
      return object.set(this.o, ['b', 'd', 'g'], 'h');
    }
  });
  group({
    name: 'object.set.empty'
  });
  test({
    name: 'depth-2',
    before: function() {
      return this.o = {};
    },
    run: function() {
      return object.set(this.o, ['a', 'b'], true);
    }
  });
  test({
    name: 'depth-3',
    before: function() {
      return this.o = {};
    },
    run: function() {
      return object.set(this.o, ['a', 'b', 'c'], true);
    }
  });
  test({
    name: 'depth-4',
    before: function() {
      return this.o = {};
    },
    run: function() {
      return object.set(this.o, ['a', 'b', 'c', 'd'], true);
    }
  });
  test({
    name: 'depth-5',
    before: function() {
      return this.o = {};
    },
    run: function() {
      return object.set(this.o, ['a', 'b', 'c', 'd', 'e'], true);
    }
  });
}).call(this);

(function() {
  group({
    name: 'object.clone'
  });
  test({
    name: 'for-in',
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
  test({
    name: 'explicit',
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

YUI.add( 'fierry.pfc.core.utils', function( Env ) {

var core = Env.namespace('core');
var array = Env.namespace('array');
var test = Env.namespace('performance.register_test');
var group = Env.namespace('performance.register_group');
(function() {
  group({
    name: 'utils'
  });
}).call(this);

(function() {
  group({
    name: 'utils.lang'
  });
  test({
    name: 'bool',
    before: function() {
      return this.o = true;
    },
    run: function() {
      return core.type(this.o);
    }
  });
  test({
    name: 'int',
    before: function() {
      return this.o = 12;
    },
    run: function() {
      return core.type(this.o);
    }
  });
  test({
    name: 'string',
    before: function() {
      return this.o = 'string';
    },
    run: function() {
      return core.type(this.o);
    }
  });
  test({
    name: 'array',
    before: function() {
      return this.o = [];
    },
    run: function() {
      return core.type(this.o);
    }
  });
  test({
    name: 'object',
    before: function() {
      return this.o = {};
    },
    run: function() {
      return core.type(this.o);
    }
  });
  test({
    name: 'regexp',
    before: function() {
      return this.o = /regexp/;
    },
    run: function() {
      return core.type(this.o);
    }
  });
  test({
    name: 'function',
    before: function() {
      return this.o = function() {};
    },
    run: function() {
      return core.type(this.o);
    }
  });
  test({
    name: 'null',
    before: function() {
      return this.o = null;
    },
    run: function() {
      return core.type(this.o);
    }
  });
  test({
    name: 'undefined',
    before: function() {
      return this.o = void 0;
    },
    run: function() {
      return core.type(this.o);
    }
  });
}).call(this);

(function() {
  group({
    name: 'utils.other'
  });
  test({
    name: 'core.uid',
    run: function() {
      return core.uid({});
    }
  });
  test({
    name: 'core.assert',
    run: function() {
      return core.assert(true, 'Illegal state occurred');
    }
  });
  test({
    name: 'core.rand -float',
    run: function() {
      return core.rand();
    }
  });
  test({
    name: 'core.rand -int',
    run: function() {
      return core.rand(1000);
    }
  });
}).call(this);


}, '3.0' ,{requires:['fierry.core', 'fierry.performance']});

YUI.add( 'fierry.pfc.core.array', function( Env ) {

var core = Env.namespace('core');
var array = Env.namespace('array');
var gen = Env.namespace('core.generation');
var pkg = Env.namespace('performance.array');
var test = Env.namespace('performance.register_test');
var group = Env.namespace('performance.register_group');
(function() {
  group({
    name: 'array'
  });
}).call(this);

(function() {
  group({
    name: 'array.splice'
  });
  test({
    name: '     -3',
    run: function() {
      return ['a', 'b', 'c'].splice(1, 0, 'f');
    }
  });
  test({
    name: '    -10',
    run: function() {
      return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].splice(5, 0, 'k');
    }
  });
  test({
    name: '   -100 -2x',
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
      this.arr.splice(core.rand(100), 0, 'a');
      return this.arr.splice(core.rand(100), 1);
    }
  });
  test({
    name: '   -200 -2x',
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
      this.arr.splice(core.rand(200), 0, 'a');
      return this.arr.splice(core.rand(200), 1);
    }
  });
  test({
    name: '   -500 -2x',
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
      this.arr.splice(core.rand(500), 0, 'a');
      return this.arr.splice(core.rand(500), 1);
    }
  });
  test({
    name: ' -1 000 -2x',
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
      this.arr.splice(core.rand(1000), 0, 'a');
      return this.arr.splice(core.rand(1000), 1);
    }
  });
  test({
    name: '-10 000 -500-last -2x',
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
      this.arr.splice(10000 - core.rand(500), 0, 'a');
      return this.arr.splice(10000 - core.rand(500), 1);
    }
  });
  test({
    name: '-10 000 -all-rand -2x',
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
      this.arr.splice(core.rand(10000), 0, 'a');
      return this.arr.splice(core.rand(10000), 1);
    }
  });
}).call(this);

(function() {
  group({
    name: 'array.slice'
  });
  test({
    name: 'small -clone',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e'];
    },
    run: function() {
      return this.arr.slice();
    }
  });
  test({
    name: 'standard -clone',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.slice();
    }
  });
  test({
    name: 'inx-1',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.slice(1);
    }
  });
  test({
    name: 'inx-5',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.slice(5);
    }
  });
  test({
    name: 'inx-9',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.slice(9);
    }
  });
  test({
    name: 'big',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.slice(15);
    }
  });
}).call(this);

(function() {
  group({
    name: 'array.join'
  });
  group({
    name: 'array.join.str'
  });
  test({
    name: ' 5 length -primitive',
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
  test({
    name: ' 5 length -default-token',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e'];
    },
    run: function() {
      return this.arr.join();
    }
  });
  test({
    name: ' 5 length -custom-token',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e'];
    },
    run: function() {
      return this.arr.join('.-.');
    }
  });
  test({
    name: '10 length',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.join();
    }
  });
  test({
    name: '40 length',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.join();
    }
  });
  test({
    name: '40 length -no-token',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.join('');
    }
  });
  group({
    name: 'array.join.recursive'
  });
  test({
    name: 'small',
    before: function() {
      return this.arr = [['a', 'b', 'c', 'd']];
    },
    run: function() {
      return this.arr.join();
    }
  });
  test({
    name: 'standard',
    before: function() {
      return this.arr = ['a', ['b', 'c', 'd'], 'e'];
    },
    run: function() {
      return this.arr.join();
    }
  });
  test({
    name: 'recursive -big',
    before: function() {
      return this.arr = ['a', ['b', 'c', 'd', 'e'], 'f', 'g', ['h', 'i', 'j', 'k', 'l']];
    },
    run: function() {
      return this.arr.join();
    }
  });
  group({
    name: 'array.join.int'
  });
  test({
    name: '10 length -one-int',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 10];
    },
    run: function() {
      return this.arr.join();
    }
  });
  test({
    name: '10 length -all-ints',
    before: function() {
      return this.arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    },
    run: function() {
      return this.arr.join();
    }
  });
}).call(this);

(function() {
  group({
    name: 'array.indexOf'
  });
  test({
    name: 'empty',
    before: function() {
      return this.arr = [];
    },
    run: function() {
      return this.arr.indexOf('path');
    }
  });
  test({
    name: 'standard -first-found',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.indexOf('a');
    }
  });
  test({
    name: 'standard -middle-found',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.indexOf('d');
    }
  });
  test({
    name: 'standard -last-found',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.indexOf('j');
    }
  });
  test({
    name: 'standard -not-found',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.indexOf('z');
    }
  });
  test({
    name: 'big -found',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.indexOf('j');
    }
  });
  test({
    name: 'big -not-found',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.indexOf('z');
    }
  });
}).call(this);

(function() {
  group({
    name: 'array.bsearch'
  });
  group({
    name: 'array.bsearch.int'
  });
  test({
    name: '    100 -1 step',
    before: function() {
      this.i = 0;
      this.max = 10000;
      return this.ints = gen.int_array(100, 1, true);
    },
    run: function() {
      return array.binary_search(this.ints, this.i++ % this.max);
    }
  });
  test({
    name: '    100 -5 step',
    before: function() {
      this.i = 0;
      this.max = 10000;
      return this.ints = gen.int_array(100, 5, true);
    },
    run: function() {
      return array.binary_search(this.ints, this.i++ % this.max);
    }
  });
  test({
    name: ' 10 000 -1 step',
    before: function() {
      this.i = 0;
      this.max = 10000;
      return this.ints = gen.int_array(10000, 1, true);
    },
    run: function() {
      return array.binary_search(this.ints, this.i++ % this.max);
    }
  });
  test({
    name: ' 10 000 -5 step',
    before: function() {
      this.i = 0;
      this.max = 10000;
      return this.ints = gen.int_array(10000, 5, true);
    },
    run: function() {
      return array.binary_search(this.ints, this.i++ % this.max);
    }
  });
  test({
    name: '100 000 -1 step',
    before: function() {
      this.i = 0;
      this.max = 100000;
      return this.ints = gen.int_array(100000, 1, true);
    },
    run: function() {
      return array.binary_search(this.ints, this.i++ % this.max);
    }
  });
  test({
    name: '100 000 -5 step',
    before: function() {
      this.i = 0;
      this.max = 100000;
      return this.ints = gen.int_array(100000, 5, true);
    },
    run: function() {
      return array.binary_search(this.ints, this.i++ % this.max);
    }
  });
  group({
    name: 'array.bsearch.string'
  });
  test({
    name: '    100  -5 length',
    before: function() {
      this.i = 0;
      return this.arr = gen.string_array(100, 5, true);
    },
    run: function() {
      return array.binary_search(this.arr, this.arr[this.i % 10]);
    }
  });
  test({
    name: '    100 -20 length',
    before: function() {
      this.i = 0;
      return this.arr = gen.string_array(100, 20, true);
    },
    run: function() {
      return array.binary_search(this.arr, this.arr[this.i % 10]);
    }
  });
  test({
    name: ' 10 000  -5 length',
    before: function() {
      this.i = 0;
      this.max = 10000;
      return this.ints = gen.string_array(10000, 5, true);
    },
    run: function() {
      return array.binary_search(this.ints, this.ints[this.i % this.max]);
    }
  });
  test({
    name: ' 10 000 -20 length',
    before: function() {
      this.i = 0;
      this.max = 10000;
      return this.ints = gen.string_array(10000, 20, true);
    },
    run: function() {
      return array.binary_search(this.ints, this.ints[this.i % this.max]);
    }
  });
  test({
    name: '100 000  -5 length',
    before: function() {
      this.i = 0;
      this.max = 100000;
      return this.ints = gen.string_array(100000, 5, true);
    },
    run: function() {
      return array.binary_search(this.ints, this.ints[this.i % this.max]);
    }
  });
  test({
    name: '100 000 -20 length',
    before: function() {
      this.i = 0;
      this.max = 100000;
      return this.ints = gen.string_array(100000, 20, true);
    },
    run: function() {
      return array.binary_search(this.ints, this.ints[this.i % this.max]);
    }
  });
}).call(this);

(function() {
  group({
    name: 'array.push-pop',
    before: function() {
      this.i = 0;
      this.empty = [];
      return this.full = gen.int_array(10000000, 5, true);
    }
  });
  test({
    name: '-pop-only',
    run: function() {
      return this.full.pop();
    }
  });
  test({
    name: '-push-only',
    run: function() {
      return this.empty.push(this.i++);
    }
  });
  test({
    name: ' 5 chars',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e'];
    },
    run: function() {
      this.arr.push('f');
      return this.arr.pop();
    }
  });
  test({
    name: '10 chars',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      this.arr.push('k');
      return this.arr.pop();
    }
  });
  test({
    name: '50 chars',
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
  group({
    name: 'array.concat'
  });
  test({
    name: 'tiny',
    before: function() {
      this.a = ['a', 'b', 'c'];
      return this.b = ['d', 'e'];
    },
    run: function() {
      return this.a.concat(this.b);
    }
  });
  test({
    name: 'small',
    before: function() {
      this.a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      return this.b = ['k'];
    },
    run: function() {
      return this.a.concat(this.b);
    }
  });
  test({
    name: 'standard',
    before: function() {
      this.a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      return this.b = ['k', 'i', 'j', 'l', 'm'];
    },
    run: function() {
      return this.a.concat(this.b);
    }
  });
  test({
    name: 'big',
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
  group({
    name: 'array.shift-unshift',
    before: function() {
      this.i = 0;
      this.empty = [];
      return this.full = gen.int_array(10000000, 5, true);
    }
  });
  test({
    name: '-shift-only',
    run: function() {
      return this.full.shift();
    }
  });
  test({
    name: '-unshift-only',
    run: function() {
      return this.empty.unshift(this.i++);
    }
  });
  test({
    name: ' 5 chars',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e'];
    },
    run: function() {
      this.arr.unshift('f');
      return this.arr.shift();
    }
  });
  test({
    name: '10 chars',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      this.arr.unshift('k');
      return this.arr.shift();
    }
  });
  test({
    name: '50 chars',
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

YUI.add( 'fierry.storage', function( Env ) {

var core = Env.namespace('core');
var array = Env.namespace('array');
var object = Env.namespace('object');
var app = Env.namespace('core.app');
var uid = Env.namespace('core.uid');
var assert = Env.namespace('core.assert');
var dao = Env.namespace('core.dao');
var pkg = Env.namespace('core.storage');
var storage = Env.namespace('core.storage');
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  pkg.Storage = (function() {
    function Storage() {
      this._nps = {};
      this._root = {};
      this._rules = {};
    }
    Storage.prototype.get = function(expr) {
      return object.get(this._root, this._to_array(expr));
    };
    Storage.prototype.set = function(expr, val) {
      object.set(this._root, this._to_array(expr), val);
      if (app.is_running()) {
        return this._get_np(expr).set_dirty();
      }
    };
    Storage.prototype._to_array = function(expr) {
      if (dao.is(expr)) {
        return expr.to_array();
      } else {
        return expr;
      }
    };
    Storage.prototype.register = function(expr, fn) {
      return this._get_np(expr).register(fn);
    };
    Storage.prototype.unregister = function(expr, fn) {
      return this._get_np(expr).unregister(fn);
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
    Storage.prototype._get_np = function(expr, str) {
      var arr, _base, _ref;
      if (dao.is(expr)) {
        arr = expr.to_array();
        str = expr.to_string();
      } else {
        arr = expr;
        if (!str) {
          str = expr.join('.');
        }
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
      for (_i = 0, _len = rules.length; _i < _len; _i++) {
        rule = rules[_i];
        tmp = raw.match(rule);
        if (tmp && tmp[0].length > max.length) {
          max = tmp[0];
        }
      }
      return max;
    };
    return Storage;
  })();
}).call(this);

(function() {
  storage.Abstract = (function() {
    function Abstract() {
      this._nps = {};
      this._root = {};
    }
    Abstract.prototype.get = function(arr) {
      return object.get(this._root, arr);
    };
    Abstract.prototype.set = function(arr, v, str) {
      if (str == null) {
        str = '';
      }
      object.set(this._root, arr, v);
      if (app.is_running()) {
        return this._get_np(arr).set_dirty();
      }
    };
    Abstract.prototype.register = function(arr, fn, str) {
      if (str == null) {
        str = '';
      }
      return this._get_np(arr, str).register(fn);
    };
    Abstract.prototype.unregister = function(arr, fn, str) {
      if (str == null) {
        str = '';
      }
      return this._get_np(arr, str).unregister(fn);
    };
    Abstract.prototype._get_np = function(arr, str) {
      throw new Error('Unsupported method');
    };
    return Abstract;
  })();
}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  storage.Notifier = (function() {
    function Notifier() {
      this.notify = __bind(this.notify, this);;      this._dirty = [];
      this._visited = [];
    }
    Notifier.prototype.set_dirty = function(fn) {
      if (!this._visited[uid(fn)]) {
        this._visited[uid(fn)] = true;
        return this._dirty.push(fn);
      }
    };
    Notifier.prototype.notify = function() {
      var i, l, _results;
      i = 0;
      l = this._dirty.length;
      _results = [];
      while (i < l) {
        this._execute(i++);
        _results.push(i === l ? l = this._dirty.length : void 0);
      }
      return _results;
    };
    Notifier.prototype._execute = function(i) {
      var fn;
      fn = this._dirty[i];
      fn();
      return this._visited[uid(fn)] = false;
    };
    return Notifier;
  })();
}).call(this);

(function() {
  storage.NotifyPoint = (function() {
    function NotifyPoint() {
      this._queue = [];
    }
    NotifyPoint.prototype.register = function(fn) {
      if (array.contains(this._queue, fn)) {
        return this._queue.push(fn);
      }
    };
    NotifyPoint.prototype.unregister = function(fn) {
      return array.erase(this._queue, fn);
    };
    NotifyPoint.prototype.set_dirty = function() {
      var o, _i, _len, _ref, _results;
      _ref = this._queue;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        o = _ref[_i];
        _results.push(pkg.NOTIFIER_INSTANCE.set_dirty(o));
      }
      return _results;
    };
    return NotifyPoint;
  })();
}).call(this);

(function() {
  dao.is = function(expr) {
    return false;
  };
  dao.create = function() {};
  dao.is_complex = function(dao) {
    return dao[1] && dao[1].charCodeAt(0) === pkg.DOT_CHAR_CODE;
  };
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
  storage.Local = (function() {
    __extends(Local, storage.Abstract);
    function Local() {
      Local.__super__.constructor.call(this);
      this._daos = {};
    }
    Local.prototype.get_dao = function(str, arr) {};
    Local.prototype._get_np = function(arr, str) {
      var _base, _name, _ref;
      return (_ref = (_base = this._nps)[_name = arr[0]]) != null ? _ref : _base[_name] = new storage.NotifyPoint();
    };
    return Local;
  })();
}).call(this);

(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  storage.Global = (function() {
    __extends(Global, storage.Abstract);
    function Global() {
      Global.__super__.constructor.call(this);
      this._rules = {};
    }
    Global.prototype.register_rule = function(raw) {
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
    Global.prototype._get_np = function(arr, str) {
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
    Global.prototype._get_np_path = function(head, raw) {
      var max, rule, rules, tmp, _i, _len;
      max = '';
      rules = this._rules[head];
      for (_i = 0, _len = rules.length; _i < _len; _i++) {
        rule = rules[_i];
        tmp = raw.match(rule);
        if (tmp && tmp[0].length > max.length) {
          max = tmp[0];
        }
      }
      return max;
    };
    return Global;
  })();
}).call(this);

(function() {
  pkg.STORAGE_INSTANCE = new storage.Global();
  pkg.NOTIFIER_INSTANCE = new storage.Notifier();
  core.async(pkg.NOTIFIER_INSTANCE.notify, 10);
}).call(this);


}, '3.0' ,{requires:['fierry.core', 'fierry.scheduler']});

YUI.add( 'fierry.pfc.storage', function( Env ) {

var core = Env.namespace('core');
var pkg = Env.namespace('performance.storage');
var test = Env.namespace('performance.register_test');
var group = Env.namespace('performance.register_group');
(function() {
  group({
    name: 'storage'
  });
  pkg.PATHS_ARRAY = ['movie', 'title', 'name', 'status', 'current', 'user', 'logged', 'guest', 'description', 'visible'];
  pkg.permutate_paths = function(count, length, arr) {
    var l, _, _results;
    if (length == null) {
      length = 5;
    }
    if (arr == null) {
      arr = pkg.PATHS_ARRAY;
    }
    l = arr.length - 1;
    _results = [];
    while (count--) {
      _results.push(((function() {
        var _ref, _results;
        _results = [];
        for (_ = 0, _ref = length - 1; (0 <= _ref ? _ <= _ref : _ >= _ref); (0 <= _ref ? _ += 1 : _ -= 1)) {
          _results.push(arr[core.rand(l)]);
        }
        return _results;
      })()).join('.'));
    }
    return _results;
  };
  pkg.permutate_rules = function(count, length, arr) {
    var i, l, path, results, _len, _results;
    if (length == null) {
      length = 5;
    }
    if (arr == null) {
      arr = pkg.PATHS_ARRAY;
    }
    l = arr.length;
    results = pkg.permutate_paths(count * l, length - 1, arr);
    _results = [];
    for (i = 0, _len = results.length; i < _len; i++) {
      path = results[i];
      _results.push(arr[i % l] + '.' + path.replace(arr[core.rand(l)], '*'));
    }
    return _results;
  };
}).call(this);

(function() {
  group({
    name: 'storage.get',
    before: function() {
      this.storage = new core.storage.Global();
      return this.storage._root = {
        user: {
          name: 'Bilbo',
          surname: 'Baggins',
          status: 'VIP'
        },
        simple: {
          path: {
            "with": {
              five: {
                parts: true
              }
            }
          }
        },
        one_part: 'yep'
      };
    }
  });
  group({
    name: 'storage.get.array'
  });
  test({
    name: '1 length',
    before: function() {
      return this.arr = ['one_part'];
    },
    run: function() {
      return this.storage.get(this.arr);
    }
  });
  test({
    name: '2 length',
    before: function() {
      return this.arr = ['user', 'name'];
    },
    run: function() {
      return this.storage.get(this.arr);
    }
  });
  test({
    name: '5 length',
    before: function() {
      return this.arr = ['simple', 'path', 'with', 'five', 'parts'];
    },
    run: function() {
      return this.storage.get(this.arr);
    }
  });
  /*
  group
    name: 'storage.get.dao'

  test
    name: '1 length'
    before: ->
      @dao = [true, 'one_part', ['one_part']]
    run: ->
      @storage.get(@dao)

  test
    name: '2 length'
    before: ->
      @dao = [true, 'user.name', ['user', 'name']]
    run: ->
      @storage.get(@dao)

  test
    name: '5 length'
    before: ->
      @dao = [true, 'simple.path.with.five.parts', ['simple', 'path', 'with', 'five', 'parts']]
    run: ->
      @storage.get(@dao)*/
}).call(this);

(function() {
  group({
    name: 'storage.set',
    before: function() {
      var str;
      this.storage = new core.storage.Global();
      this.i = 0;
      this.str = pkg.permutate_paths(5000);
      return this.arr = (function() {
        var _i, _len, _ref, _results;
        _ref = this.str;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          str = _ref[_i];
          _results.push(str.split('.'));
        }
        return _results;
      }).call(this);
    }
  });
  test({
    name: '1 length',
    before: function() {
      var str;
      return this.arr = (function() {
        var _i, _len, _ref, _results;
        _ref = pkg.permutate_paths(5000, 1);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          str = _ref[_i];
          _results.push(str.split('.'));
        }
        return _results;
      })();
    },
    run: function() {
      return this.storage.set(this.arr[this.i++ % 5000], 'value');
    }
  });
  test({
    name: '2 length',
    before: function() {
      var str;
      return this.arr = (function() {
        var _i, _len, _ref, _results;
        _ref = pkg.permutate_paths(5000, 2);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          str = _ref[_i];
          _results.push(str.split('.'));
        }
        return _results;
      })();
    },
    run: function() {
      return this.storage.set(this.arr[this.i++ % 5000], 'value');
    }
  });
  test({
    name: '3 length',
    before: function() {
      var str;
      return this.arr = (function() {
        var _i, _len, _ref, _results;
        _ref = pkg.permutate_paths(5000, 3);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          str = _ref[_i];
          _results.push(str.split('.'));
        }
        return _results;
      })();
    },
    run: function() {
      return this.storage.set(this.arr[this.i++ % 5000], 'value');
    }
  });
  test({
    name: '5 length',
    before: function() {
      var str;
      return this.arr = (function() {
        var _i, _len, _ref, _results;
        _ref = pkg.permutate_paths(5000, 5);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          str = _ref[_i];
          _results.push(str.split('.'));
        }
        return _results;
      })();
    },
    run: function() {
      return this.storage.set(this.arr[this.i++ % 5000], 'value');
    }
  });
}).call(this);

(function() {
  pkg.get_np_tests = function() {
    test({
      name: '    1 path',
      run: function() {
        return this.storage._get_np(this.arr[0], this.str[0]);
      }
    });
    test({
      name: '   50 paths',
      run: function() {
        var i;
        i = this.i++ % 50;
        return this.storage._get_np(this.arr[i], this.str[i]);
      }
    });
    test({
      name: '  500 paths',
      run: function() {
        var i;
        i = this.i++ % 500;
        return this.storage._get_np(this.arr[i], this.str[i]);
      }
    });
    test({
      name: '2 500 paths',
      run: function() {
        var i;
        i = this.i++ % 2500;
        return this.storage._get_np(this.arr[i], this.str[i]);
      }
    });
    return test({
      name: '5 000 paths',
      run: function() {
        var i;
        i = this.i++ % 5000;
        return this.storage._get_np(this.arr[i], this.str[i]);
      }
    });
  };
  group({
    name: 'storage.np',
    before: function() {
      var str;
      this.storage = new core.storage.Global();
      this.i = 0;
      this.str = pkg.permutate_paths(5000);
      return this.arr = (function() {
        var _i, _len, _ref, _results;
        _ref = this.str;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          str = _ref[_i];
          _results.push(str.split('.'));
        }
        return _results;
      }).call(this);
    }
  });
  group({
    name: 'storage.np.1 rule',
    before: function() {
      var rule, _i, _len, _ref, _results;
      _ref = pkg.permutate_rules(1);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rule = _ref[_i];
        _results.push(this.storage.register_rule(rule));
      }
      return _results;
    }
  });
  pkg.get_np_tests();
  group({
    name: 'storage.np.5 rules',
    before: function() {
      var rule, _i, _len, _ref, _results;
      _ref = pkg.permutate_rules(5);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rule = _ref[_i];
        _results.push(this.storage.register_rule(rule));
      }
      return _results;
    }
  });
  pkg.get_np_tests();
}).call(this);


}, '3.0' ,{requires:['fierry.storage']});

YUI.add( 'fierry.pfc.core', function( Env ) {


}, '3.0' ,{requires:['fierry.pfc.core.array', 'fierry.pfc.core.object', 'fierry.pfc.core.string', 'fierry.pfc.core.create', 'fierry.pfc.core.utils']});

YUI.add( 'fierry.dom', function( Env ) {

var core = Env.namespace('core');
var array = Env.namespace('array');
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

YUI.add( 'fierry.performance', function( Env ) {

var core = Env.namespace('core');
var array = Env.namespace('array');
var string = Env.namespace('string');
var api = Env.namespace('performance');
var pkg = Env.namespace('performance.internal');
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
        bool = arr[i].indexOf(arr[i - 1]) === 0;
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
      core.assert(cases.length > 0, "No test cases found for suites: " + this._suites);
      return core.async_array(cases, this._run_once);
    };
    Runner.prototype._run_once = function(test, last) {
      var arg, time;
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
  core.include(pkg.Runner, core.Event);
}).call(this);

(function() {
  pkg.EXECUTE_RETRY = 5;
  pkg.EXECUTE_LIMIT = 50;
  pkg.MEASURE_LIMIT = 5;
  pkg.MEASURE_RETRY = 3;
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
    function Test(test, group) {
      this.group = group;
      this._results = [];
      this.name = test.name;
      this._run = test.run;
      this._after = test.after || (function() {});
      this._before = test.before || (function() {});
      this._min_arg = test.min_arg || group.get_min_arg();
    }
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
      this._arg = pkg.EXECUTE_LIMIT / array.avg(arr) * arg;
      if (this._arg < this._min_arg) {
        this._arg = this._min_arg;
      }
      return this._arg;
    };
    Test.prototype.run = function(arg) {
      var end, i, start;
      this.group.run_before(this);
      this._before();
      start = new Date();
      for (i = 0; (0 <= arg ? i <= arg : i >= arg); (0 <= arg ? i += 1 : i -= 1)) {
        this._run();
      }
      end = new Date();
      this._after;
      this.group.run_after(this);
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
      this._last_group = null;
    }
    Registry.prototype.register_group = function(hash) {
      var group, parent;
      parent = this.get(this._get_parent(hash.name));
      group = new pkg.Group(hash, parent);
      parent.add(group);
      return this._last_group = group;
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
    Registry.prototype.register_test = function(hash) {
      var parent, test;
      parent = hash.group ? this.get(hash.group) : this._last_group;
      test = new pkg.Test(hash, parent);
      return parent.add(test);
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
    function Group(group, parent) {
      this.parent = parent;
      this.name = group.name;
      this._nodes = [];
      this._after = group.after || (function() {});
      this._before = group.before || (function() {});
      this._min_arg = group.min_arg || 0;
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
    Group.prototype.add = function(node) {
      var n, name, _i, _len, _ref;
      name = node.name;
      _ref = this._nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        if (n.name === name) {
          throw new Error("Node " + name + " already exists");
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
    return Group;
  })();
}).call(this);

(function() {
  pkg.INSTANCE = new pkg.Registry();
  api.register_group = function(group) {
    return pkg.INSTANCE.register_group(group);
  };
  api.register_test = function(test) {
    return pkg.INSTANCE.register_test(test);
  };
  api.run = function() {
    var listener, runner;
    runner = new pkg.Runner(pkg.INSTANCE, arguments);
    listener = new pkg.ProgressListener();
    runner.subscribe("tests.found", listener.tests_found);
    runner.subscribe("test.finished", listener.test_finished);
    runner.subscribe("tests.finished", listener.tests_finished);
    return runner.run();
  };
}).call(this);


}, '3.0' ,{requires:['fierry.core', 'fierry.scheduler']});

YUI.add( 'fierry.core', function( Env ) {

var core = Env.namespace('core');
(function() {
  var __slice = Array.prototype.slice;
  core.include = function() {
    var cls, method, mixin, mixins, name, _i, _len, _ref;
    cls = arguments[0], mixins = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = mixins.length; _i < _len; _i++) {
      mixin = mixins[_i];
      _ref = mixin.prototype;
      for (name in _ref) {
        method = _ref[name];
        cls.prototype[name] = method;
      }
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
  core.type = function(o) {
    var t;
    if (o === null) {
      return 'null';
    }
    t = typeof o;
    if (t !== 'object') {
      return t;
    }
    switch (o.toString()) {
      case '[object Date]':
        return 'date';
      case '[object Array]':
        return 'array';
      case '[object Number]':
        return 'number';
      case '[object Object]':
        return 'object';
      case '[object RegExp]':
        return 'regexp';
      case '[object String]':
        return 'string';
      case '[object Boolean]':
        return 'boolean';
      case '[object Function]':
        return 'function';
    }
    return 'object';
  };
}).call(this);

(function() {
  core.App = (function() {
    function App() {
      this._stop_arr = [];
      this._start_arr = [];
      this._running = false;
    }
    App.prototype.start = function() {
      var fn, _i, _len, _ref, _results;
      this._running = true;
      _ref = this._start_arr;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fn = _ref[_i];
        _results.push(fn());
      }
      return _results;
    };
    App.prototype.stop = function() {
      var fn, _i, _len, _ref, _results;
      this._running = false;
      _ref = this._stop_arr;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fn = _ref[_i];
        _results.push(fn());
      }
      return _results;
    };
    App.prototype.is_running = function() {
      return this._running;
    };
    App.prototype.is_stopped = function() {
      return !this._running;
    };
    App.prototype.add_start_handler = function(fn) {
      this._start_arr.push(fn);
    };
    App.prototype.add_stop_handler = function(fn) {
      this._stop_arr.push(fn);
    };
    return App;
  })();
}).call(this);

(function() {
  var __slice = Array.prototype.slice;
  core.Event = (function() {
    function Event() {}
    Event.prototype.subscribe = function(type, fn) {
      this.__get_listeners(type).push(fn);
    };
    Event.prototype.unsubscribe = function(type, fn) {
      array.erase(this.__get_listeners(type), fn);
    };
    Event.prototype.dispatch = function() {
      var args, fn, type, _i, _len, _ref;
      type = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      _ref = this.__get_listeners(type);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fn = _ref[_i];
        fn.apply(null, args);
      }
    };
    Event.prototype.__get_listeners = function(type) {
      var _base, _ref, _ref2;
      (_ref = this.__eventRegistry) != null ? _ref : this.__eventRegistry = {};
      return (_ref2 = (_base = this.__eventRegistry)[type]) != null ? _ref2 : _base[type] = [];
    };
    return Event;
  })();
}).call(this);

(function() {
  var __slice = Array.prototype.slice;
  core.assert = function(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  };
  core.uid = function(obj) {
    var _ref;
    return (_ref = obj.__uid__) != null ? _ref : obj.__uid__ = ++core.uid.__counter__;
  };
  core.uid.__counter__ = 1;
  core.rand = function(max) {
    if (max === void 0) {
      return Math.random();
    }
    return Math.round(Math.random() * max);
  };
  core.sum_ops = function() {
    var op, ops, sum, _i, _len;
    ops = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    sum = 0;
    for (_i = 0, _len = ops.length; _i < _len; _i++) {
      op = ops[_i];
      sum += 1 / (op * 1000);
    }
    return 1 / sum / 1000;
  };
}).call(this);

(function() {
  Env.array = {
    avg: function(arr) {
      var i, sum, _i, _len;
      sum = 0;
      for (_i = 0, _len = arr.length; _i < _len; _i++) {
        i = arr[_i];
        sum += i;
      }
      return sum / arr.length;
    },
    binary_search: function(arr, key) {
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
    contains: function(arr, it) {
      return arr.indexOf(it) === !-1;
    },
    empty: function(arr) {
      return arr.length === 0;
    },
    erase: function(arr, it, i) {
      if (i == null) {
        i = 0;
      }
      while (i < arr.length) {
        if (arr[i] === it) {
          arr.splice(i, 1);
        } else {
          i++;
        }
      }
    },
    is: function(o) {
      return core.type(o) === 'array';
    },
    shuffle: function(arr) {
      var i, j, x, _ref;
      i = arr.length;
      while (i) {
        j = parseInt(Math.random() * i);
        x = arr[--i];
        _ref = [arr[j], x], arr[i] = _ref[0], arr[j] = _ref[1];
      }
      return arr;
    },
    to_array: function(arr) {
      return Array.prototype.slice.call(arr);
    },
    unique: function(arr) {
      var hash, i, r, _i, _len;
      r = [];
      hash = {};
      for (_i = 0, _len = arr.length; _i < _len; _i++) {
        i = arr[_i];
        hash[i] = 0;
      }
      for (i in hash) {
        r.push(i);
      }
      return r;
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
    },
    split_index: function(str, idx) {
      return [str.substr(0, idx), str.substr(idx + 1)];
    }
  };
}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  core.Runtime = (function() {
    function Runtime() {
      this._setup = __bind(this._setup, this);;      this._requests = [];
      this._services = {};
      this._executors = {};
    }
    Runtime.prototype.register_service = function(name, service) {
      if (core.app.is_running()) {
        throw new Error('Cannot register new services if app is running');
      }
      return this._services[name] = service;
    };
    Runtime.prototype.register_executor = function(type, executor) {
      if (core.app.is_running()) {
        throw new Error('Cannot register new executors if app is running');
      }
      return this._executors[type] = executor;
    };
    Runtime.prototype.push_request = function(type, request) {
      return this._requests.push({
        type: type,
        req: request
      });
    };
    Runtime.prototype.execute_on_service = function(name, fn) {
      if (!this._services[name]) {
        throw new Error("Service " + name + " not found.");
      }
      return fn.call(this._services[name]);
    };
    Runtime.prototype.flush = function() {
      var req, service, type, _i, _len, _ref, _ref2;
      while (this._requests.length !== 0) {
        _ref = this._requests.shift(), type = _ref.type, req = _ref.req;
        core.assert(this._executors[type], "Executor for " + type + " not found");
        this._executors[type].run(req);
      }
      _ref2 = this._services;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        service = _ref2[_i];
        if (service.cleanup) {
          service.cleanup();
        }
      }
    };
    Runtime.prototype._setup = function() {
      var executor, service, _, _ref, _ref2, _results;
      _ref = this._services;
      for (_ in _ref) {
        service = _ref[_];
        this._setup_resource(service);
      }
      _ref2 = this._executors;
      _results = [];
      for (_ in _ref2) {
        executor = _ref2[_];
        _results.push(this._setup_resource(executor));
      }
      return _results;
    };
    Runtime.prototype._setup_resource = function(resource) {
      var key, name, _ref;
      _ref = resource.services || {};
      for (key in _ref) {
        name = _ref[key];
        if (!this._services[name]) {
          throw new Error("Service " + name + " not found.");
        }
        resource[key] = this._services[name];
      }
      if (resource.setup) {
        return resource.setup();
      }
    };
    return Runtime;
  })();
}).call(this);

(function() {
  core.app = new core.App();
  core.runtime = new core.Runtime();
  core.app.add_start_handler(core.runtime._setup);
}).call(this);


}, '3.0' ,{requires:[]});

YUI.add( 'fierry.pfc.core.create', function( Env ) {

var core = Env.namespace('core');
var test = Env.namespace('performance.register_test');
var group = Env.namespace('performance.register_group');
(function() {
  group({
    name: 'create'
  });
}).call(this);

(function() {
  group({
    name: 'create.object'
  });
  group({
    name: 'create.object.hash'
  });
  test({
    name: ' 0 length',
    run: function() {
      var h;
      return h = {};
    }
  });
  test({
    name: ' 5 length',
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
  test({
    name: '10 length',
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
  group({
    name: 'create.object.nested'
  });
  test({
    name: ' 5 length',
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
  test({
    name: '10 length',
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
  group({
    name: 'create.object.standard'
  });
  test({
    name: ' 0 length',
    before: function() {
      return this.h = {};
    },
    run: function() {
      return Object.create(this.h);
    }
  });
  test({
    name: ' 5 length',
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
  test({
    name: '10 length',
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
  group({
    name: 'create.object.class'
  });
  test({
    name: 'core.Event',
    run: function() {
      var o;
      return o = new core.Event();
    }
  });
  test({
    name: '0 length -prototype',
    before: function() {
      this.cls = function() {};
      return this.cls.prototype = {};
    },
    run: function() {
      var o;
      return o = new this.cls();
    }
  });
  test({
    name: '5 length -prototype',
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
  test({
    name: '2 length -prototype -nested',
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
  group({
    name: 'create.primitives'
  });
  test({
    name: 'boolean',
    run: function() {
      var r;
      return r = true;
    }
  });
  test({
    name: 'integer',
    run: function() {
      var r;
      return r = 101;
    }
  });
  test({
    name: 'float',
    run: function() {
      var r;
      return r = 1.01;
    }
  });
  test({
    name: 'string',
    run: function() {
      var r;
      return r = 'string';
    }
  });
  test({
    name: 'regexp',
    run: function() {
      var r;
      return r = /regexp/;
    }
  });
  group({
    name: 'create.wrappers'
  });
  test({
    name: 'boolean',
    run: function() {
      var r;
      return r = new Boolean(true);
    }
  });
  test({
    name: 'integer',
    run: function() {
      var r;
      return r = new Number(101);
    }
  });
  test({
    name: 'float',
    run: function() {
      var r;
      return r = new Number(1.01);
    }
  });
  test({
    name: 'string',
    run: function() {
      var r;
      return r = new String('string');
    }
  });
  test({
    name: 'regexp',
    run: function() {
      var r;
      return r = new RegExp('regexp');
    }
  });
  group({
    name: 'create.others'
  });
  test({
    name: 'Date',
    run: function() {
      var o;
      return o = new Date();
    }
  });
}).call(this);

(function() {
  group({
    name: 'create.array'
  });
  group({
    name: 'create.array.normal'
  });
  test({
    name: ' 0 length',
    run: function() {
      var a;
      return a = [];
    }
  });
  test({
    name: ' 5 length',
    run: function() {
      var a;
      return a = [0, 1, 2, 3, 4];
    }
  });
  test({
    name: '10 length',
    run: function() {
      var a;
      return a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
  });
  group({
    name: 'create.array.nested'
  });
  test({
    name: ' 5 length -nested',
    run: function() {
      var a;
      return a = [0, 1, [], 2, []];
    }
  });
  test({
    name: '10 length -nested',
    run: function() {
      var a;
      return a = [0, 1, [], 2, 3, 4, 5, [], 6, []];
    }
  });
}).call(this);


}, '3.0' ,{requires:['fierry.core', 'fierry.storage', 'fierry.performance']});

YUI.add( 'fierry.scheduler', function( Env ) {

var core = Env.namespace('core');
var pkg = Env.namespace('core.scheduler');
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
        this._cache[core.uid(async)] = false;
        _results.push(async.execute());
      }
      return _results;
    };
    Scheduler.prototype._schedule = function(async, delay) {
      var i, _base, _ref;
      if (this._cache[core.uid(async)]) {
        return false;
      }
      i = Math.max(0, Math.round(delay / this._interval) - 1);
      (_ref = (_base = this._registry)[i]) != null ? _ref : _base[i] = [];
      this._registry[i].push(async);
      this._cache[core.uid(async)] = true;
      return true;
    };
    Scheduler.prototype.__clear = function() {
      this.stop();
      this._cache = {};
      return this._registry = [];
    };
    Scheduler.prototype.start = function() {
      return this._timer = setInterval(this._run_loop, this._interval);
    };
    Scheduler.prototype.stop = function() {
      return clearInterval(this._timer);
    };
    return Scheduler;
  })();
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
  pkg.INSTANCE = new pkg.Scheduler();
  pkg.INSTANCE.start();
  core.async = function(fn, delay, periodic) {
    return pkg.INSTANCE.async(fn, delay, periodic);
  };
  core.async_array = function(arr, fn) {
    return pkg.INSTANCE.async_array(arr, fn);
  };
}).call(this);


}, '3.0' ,{requires:['fierry.core']});

YUI.add( 'fierry.generation', function( Env ) {

var core = Env.namespace('core');
var array = Env.namespace('array');
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
            _results.push(i += core.rand(step - 1) + 1);
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
      this._max_count = {};
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
            i = core.rand(range) + min_char;
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
  pkg.INT_INSTANCE = new pkg.IntGenerator();
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
}).call(this);


}, '3.0' ,{requires:['fierry.core']});

