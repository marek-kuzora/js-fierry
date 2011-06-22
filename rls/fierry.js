YUI.add( 'fierry.dj', function( Env ) {

var pkg = Env.namespace('dj');

}, '3.0' ,{requires:['fierry.dj.actions', 'fierry.dj.services', 'fierry.dj.executors']});

YUI.add( 'fierry.dj.actions', function( Env ) {

var pkg = Env.namespace('dj');
var rtm = Env.namespace('core.runtime');
var assert = Env.namespace('core.assert');
(function() {
  pkg.IAction = (function() {
    function IAction() {}
    IAction.prototype.create = function() {};
    IAction.prototype.create_nodes = function() {};
    IAction.prototype.finalize = function() {};
    IAction.prototype.attach = function() {};
    IAction.prototype.detach = function() {};
    IAction.prototype.update = function() {};
    return IAction;
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
  pkg.AbstractAction = (function() {
    __extends(AbstractAction, pkg.IAction);
    function AbstractAction(ref, parent) {
      this._ref = ref;
      this._nodes = [];
      this._setup_structure(parent);
    }
    AbstractAction.prototype._setup_structure = function(parent) {
      this._parent = parent;
      if (this._parent.has_nodes()) {
        this._before = parent.get_last_node();
        return this._before.set_after_sibling(this);
      }
    };
    AbstractAction.prototype.push_node = function(node) {
      return this._nodes.push(node);
    };
    AbstractAction.prototype.set_after_sibling = function(after) {
      return this._after = after;
    };
    AbstractAction.prototype.has_nodes = function() {
      return this._nodes.length !== 0;
    };
    AbstractAction.prototype.get_last_node = function() {
      return this._nodes[this._nodes.length - 1];
    };
    AbstractAction.prototype.create_nodes = function() {
      var ref, _i, _len, _ref, _results;
      _ref = this._ref.nodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ref = _ref[_i];
        _results.push(this.push_node(this._actions.get_created(ref, this)));
      }
      return _results;
    };
    return AbstractAction;
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
  pkg.DomAction = (function() {
    __extends(DomAction, pkg.AbstractAction);
    function DomAction(ref, parent) {
      DomAction.__super__.constructor.call(this, ref, parent);
      this._attrs = ref.attrs();
      this._attached = false;
    }
    DomAction.prototype.create = function() {
      this._attrs = this._ref.attrs();
      return this._node = this.create_node();
    };
    DomAction.prototype.create_node = function() {
      throw new Error('Unsupported method');
    };
    DomAction.prototype.get_dom_reference = function() {
      return this._node;
    };
    DomAction.prototype.attach = function() {
      var pnode;
      pnode = this._parent.get_dom_reference();
      if (this._after && this._after.is_attached()) {
        return pnode.insertBefore(this._node, this._after.get_dom_reference());
      } else {
        return pnode.appendChild(this._node);
      }
    };
    DomAction.prototype.is_attached = function() {
      return this._node.parentNode !== null;
    };
    DomAction.prototype.detach = function() {
      return this._node.parentNode.removeChild(this._node);
    };
    return DomAction;
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
  pkg.TextAction = (function() {
    function TextAction() {
      TextAction.__super__.constructor.apply(this, arguments);
    }
    __extends(TextAction, pkg.DomAction);
    TextAction.prototype.create_node = function() {
      var node;
      node = document.createElement('span');
      node.innerHTML = this._attrs.text;
      return node;
    };
    return TextAction;
  })();
  pkg.register_action('dom:text', pkg.TextAction);
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
  pkg.HeaderAction = (function() {
    function HeaderAction() {
      HeaderAction.__super__.constructor.apply(this, arguments);
    }
    __extends(HeaderAction, pkg.DomAction);
    HeaderAction.prototype.create_node = function() {
      var node;
      node = document.createElement('h1');
      node.className = this._ref.classes.join(' ');
      return node;
    };
    return HeaderAction;
  })();
  pkg.register_action('dom:h1', pkg.HeaderAction);
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
  pkg.ExistingDomAction = (function() {
    __extends(ExistingDomAction, pkg.AbstractAction);
    function ExistingDomAction(ref) {
      this._ref = ref;
      this._nodes = [];
    }
    ExistingDomAction.prototype.get_dom_reference = function() {
      return this._ref.dom;
    };
    ExistingDomAction.prototype.create_nodes = function() {
      throw new Error('Unsupported method');
    };
    ExistingDomAction.prototype.attach = function() {
      throw new Error('Unsupported method');
    };
    ExistingDomAction.prototype.detach = function() {
      throw new Error('Unsupported method');
    };
    return ExistingDomAction;
  })();
  pkg.register_action('existing_dom', pkg.ExistingDomAction);
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
  pkg.DivAction = (function() {
    function DivAction() {
      DivAction.__super__.constructor.apply(this, arguments);
    }
    __extends(DivAction, pkg.DomAction);
    DivAction.prototype.create_node = function() {
      var node;
      node = document.createElement('div');
      if (this._ref.id) {
        node.id = this._ref.id;
      }
      return node;
    };
    return DivAction;
  })();
  pkg.register_action('dom:div', pkg.DivAction);
}).call(this);


}, '3.0' ,{requires:['fierry.core', 'fierry.dj.services']});

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

YUI.add( 'fierry.dj.executors', function( Env ) {

var pkg = Env.namespace('dj');
var rtm = Env.namespace('core.runtime');
var assert = Env.namespace('core.assert');
(function() {
  rtm.register_executor('dj.into', {
    services: {
      _uid: 'dj.uid',
      _actions: 'dj.actions'
    },
    run: function(req) {
      var live_refs, n, parent, _i, _len, _ref;
      parent = this._uid.get_ref(req.id);
      live_refs = this._uid.get_live(req.id);
      _ref = req.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        parent.nodes.push(n);
        this.traverse_ref(n, parent);
        this.attach_live_ref(n, live_refs);
      }
    },
    traverse_ref: function(ref, parent) {
      var n, _i, _len, _ref, _results;
      if (ref.id) {
        this._uid.cache_ref(ref.id, ref);
      }
      ref.parent = parent;
      _ref = ref.nodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        _results.push(this.traverse_ref(n, ref));
      }
      return _results;
    },
    attach_live_ref: function(ref, parents) {
      var p, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = parents.length; _i < _len; _i++) {
        p = parents[_i];
        _results.push(p.push_node(this._actions.get_created(ref, p)));
      }
      return _results;
    }
  });
}).call(this);


}, '3.0' ,{requires:['fierry.core', 'fierry.dj.services']});

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

YUI.add( 'fierry.dj.services', function( Env ) {

var pkg = Env.namespace('dj');
var rtm = Env.namespace('core.runtime');
var assert = Env.namespace('core.assert');
(function() {
  var Service;
  Service = (function() {
    function Service() {
      this._reg = {};
    }
    Service.prototype.register = function(name, handler) {
      assert(!this._reg[name], "Action " + name + " already exists");
      handler.prototype._actions = this;
      return this._reg[name] = handler;
    };
    Service.prototype.get = function(ref, parent) {
      var name;
      name = ref.type;
      assert(this._reg[name], "Action " + name + " not found");
      return new this._reg[name](ref, parent);
    };
    Service.prototype.get_created = function(ref, parent) {
      var action;
      action = this.get(ref, parent);
      action.create();
      action.create_nodes();
      action.attach();
      action.finalize();
      return action;
    };
    return Service;
  })();
  rtm.register_service('dj.actions', new Service());
}).call(this);

(function() {
  var Service;
  Service = (function() {
    Service.prototype.services = {
      _actions: 'dj.actions'
    };
    function Service() {
      this._uids = {};
    }
    Service.prototype.setup = function() {
      return this._retrospect_html(document.body);
    };
    Service.prototype._retrospect_html = function(e) {
      var id, n, _i, _len, _ref;
      if (e instanceof Text) {
        return;
      }
      if (id = e.getAttribute('id')) {
        this._uids[id] = {
          ref: {
            nodes: []
          },
          live: [this._create_live(e)]
        };
      }
      _ref = e.childNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        this._retrospect_html(n);
      }
    };
    Service.prototype._create_live = function(e) {
      return this._actions.get({
        type: 'existing_dom',
        dom: e
      });
    };
    Service.prototype.cache_ref = function(id, ref) {
      assert(!this._uids[id], "Uid entry for " + id + " already defined");
      return this._uids[id] = {
        ref: ref,
        live: []
      };
    };
    Service.prototype.cache_live = function(id, live) {
      assert(this._uids[id], "Uid entry for " + id + " not found");
      return this._uids[id].live.push(live);
    };
    Service.prototype.get_ref = function(id) {
      assert(this._uids[id], "Uid entry for " + id + " not found");
      return this._uids[id].ref;
    };
    Service.prototype.get_live = function(id) {
      assert(this._uids[id], "Uid entry for " + id + " not found");
      return this._uids[id].live;
    };
    return Service;
  })();
  rtm.register_service('dj.uid', new Service());
}).call(this);

(function() {
  pkg.register_action = function(name, handler) {
    return rtm.execute_on_service('dj.actions', function() {
      return this.register(name, handler);
    });
  };
}).call(this);


}, '3.0' ,{requires:['fierry.core']});

YUI.add( 'fierry.ui2', function( Env ) {

var pkg = Env.namespace('ui');
var rtm = Env.namespace('core.runtime');
var assert = Env.namespace('core.assert');
(function() {
  var Service;
  Service = (function() {
    function Service() {
      this._reg = {};
    }
    Service.prototype.register = function(name, handler) {
      assert(!this._reg[name], "Action " + name + " already exists");
      return this._reg[name] = handler;
    };
    Service.prototype.get = function(name) {
      assert(this._reg[name], "Action " + name + " not found");
      return this._reg[name];
    };
    return Service;
  })();
  rtm.register_service('dj.actions', new Service());
}).call(this);

(function() {
  rtm.register_executor('dj.subtree', {
    services: {
      uid: 'dj.uid',
      actions: 'dj.actions'
    },
    run: function(req) {
      return console.log('processed', req);
    }
  });
}).call(this);

(function() {
  /*

  executor
    order: '1.2'

    services:
      nodes: 'nodes'
      index: 'nodes.indexed'

    # How can I use that to get info if the executor should be runned?
    requests:
      arr: 'dom.attach'

    run: ->
      for req in @arr
        parent = @nodes.resolve(req.parentID)
        before = if req.beforeID then @nodes.resolve(req.beforeID) else null
        @index.setCached(req.node, parent, before)


    ui.into document.body, [
    type: 'div'
    attrs:
      id: 'cokolwiek'
      class: 'fafa'
    content: [
      type: 'span'
      attrs:
        text: 'title'
        font: 'ui'
      content: [
        type: 'span'
        attrs:
          text: '!'
          font: 'b'
      ]
    ,
      type: 'br'
    ,
      type: 'span'
      attrs:
        text: 'some text'
    ]
  ,
    type: 'div'
  ]

  ui.into document.body,

    # I could use the fist line to define all in custom syntax. id, class, etc
    # But if so, there would be no uid there...
    ui.append 'div #fafa'
      id: 'cokolwiek'
      class: 'fafa'

    ui.append 'br', # musze miec tutaj , jak chce wciecie a nie definiuje attrybutow!
                    # To dziala zamiast wciec! Brak wciecia i ',' definiuje dziecko tez :/

      ui.append 'span'
        text: 'title'
        font: 'ui'

        ui.append 'span'
          text: '!'
          font: 'b'

          ui.append 'br'

      ui.append 'span'
        text: 'some text'

    ui.append 'div'

  # Here I would like to import all dom, tpl, text functions from ui namespace in batch
  # It should be easy to import in batch for this use case!
  ui.into '#body',                # only id is accepted at the moment

    dom 'div #left'
      uid: 'left'                 # Defines uid - that element can be a target of ui.into

      dom 'h1 .title .center',    # Defines classes for the element. All spaces are trimmed.
        text '=Navigation'        # Defines text after = There can be space before first letter - trim it
        text 'b] =!'              # Probably needed syntax for defining attrs or default attr (here font)

      tpl 'menu:left'             # Invokes template. Can specify additional arguments to customize

    dom 'div #main'
      uid: 'main'

    dom 'div #right'
      uid: 'right'

  ui.define 'menu:left',
    dom 'ul',
      dom 'li =first'
      dom 'li =second'

  # Template definition
  ui.define 'template'

  # Experimenting...
  ui.cond
    if: current_user.is_logged()

    ui.append 'span'
      text: current_user.email

  ui.loop
    item: i
    array: '..data'

  # Have to build in a way, that I could run it multiple times.*/
}).call(this);

(function() {
  rtm.register_executor('dj.into', {
    services: {
      uid: 'dj.uid'
    },
    run: function(req) {
      var live_refs, n, parent, _i, _len, _ref;
      parent = this.uid.get_ref(req.id);
      parent.nodes = parent.nodes.concat(req.nodes);
      live_refs = this.uid.get_live(req.id);
      _ref = req.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        this.traverse_ref(n, parent);
        this.attach_live_ref(n, live_refs);
      }
    },
    traverse_ref: function(ref, parent) {
      var n, _i, _len, _ref, _results;
      if (ref.id) {
        this.uid.cache_ref(ref.id, ref);
      }
      ref.parent = parent;
      _ref = ref.nodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        _results.push(this.traverse_ref(n, ref));
      }
      return _results;
    },
    attach_live_ref: function(ref, live_refs) {
      var l, live_ref, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = live_refs.length; _i < _len; _i++) {
        l = live_refs[_i];
        live_ref = {
          ref: ref,
          parent: l
        };
        l.nodes.push(live_ref);
        _results.push(rtm.push({
          type: 'dj.subtree',
          ref: live_ref
        }));
      }
      return _results;
    }
  });
}).call(this);

(function() {
  var __slice = Array.prototype.slice;
  pkg.Structure = (function() {
    function Structure() {
      this._reg = {};
      this._refs = this._retrospect_html(document.body);
      this._struct = {};
    }
    Structure.prototype._retrospect_html = function(e) {
      var h, n;
      h = {
        type: 'dom-ready',
        html: e
      };
      if (!(e instanceof Text)) {
        h.uid = e.getAttribute('id');
      }
      h.nodes = (function() {
        var _i, _len, _ref, _results;
        _ref = e.childNodes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          n = _ref[_i];
          _results.push(this._retrospect_html(n));
        }
        return _results;
      }).call(this);
      if (h.uid) {
        this._reg[h.uid] = {
          ref: h,
          struct: []
        };
      }
      return h;
    };
    Structure.prototype.inject_into = function() {
      var children, id, node, nodes, _i, _len, _results;
      id = arguments[0], nodes = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      children = this._reg[id].ref.nodes;
      _results = [];
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        node = nodes[_i];
        _results.push(children.push(node));
      }
      return _results;
    };
    return Structure;
  })();
}).call(this);

(function() {
  var Service;
  Service = (function() {
    function Service() {
      this._uids = {};
      this._retrospect_html(document.body);
    }
    Service.prototype._retrospect_html = function(e) {
      var id, n, _i, _len, _ref;
      if (e instanceof Text) {
        return;
      }
      if (id = e.getAttribute('id')) {
        this._uids[id] = {
          ref: {
            nodes: []
          },
          live: [
            {
              dom: e,
              nodes: []
            }
          ]
        };
      }
      _ref = e.childNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        this._retrospect_html(n);
      }
    };
    Service.prototype.cache_ref = function(id, ref) {
      assert(!this._uids[id], "Uid entry for " + id + " already defined");
      return this._uids[id] = {
        ref: ref,
        live: []
      };
    };
    Service.prototype.cache_live = function(id, live) {
      assert(this._uids[id], "Uid entry for " + id + " not found");
      return this._uids[id].live.push(live);
    };
    Service.prototype.get_ref = function(id) {
      assert(this._uids[id], "Uid entry for " + id + " not found");
      return this._uids[id].ref;
    };
    Service.prototype.get_live = function(id) {
      assert(this._uids[id], "Uid entry for " + id + " not found");
      return this._uids[id].live;
    };
    return Service;
  })();
  rtm.register_service('dj.uid', new Service());
}).call(this);

(function() {
  rtm.register_executor('dj.action', {
    services: {
      actions: 'dj.actions'
    },
    run: function(req) {
      return this.actions.register(req.name, req.handler);
    }
  });
}).call(this);

(function() {
  pkg.register_action = function(name, handler) {
    return rtm.push({
      type: 'dj.action',
      name: name,
      handler: handler
    });
  };
}).call(this);


}, '3.0' ,{requires:['fierry.core']});

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

