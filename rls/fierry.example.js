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

YUI.add( 'fierry.example.view', function( Env ) {

var app = Env.namespace('app');
var core = Env.namespace('core');
var fv = Env.namespace('core.view');
var storage = Env.namespace('core.storage');
var pkg = Env.namespace('example.view');
(function() {
  var label_nodes, menu_0_label, menu_1_label, menu_2_label, menu_3_label, menu_exact_nodes, menu_label, user_exact_label, user_exact_node, user_label;
  fv.register('logger-root', {
    get_scope: function() {
      return 'logger';
    }
  });
  fv.register('logger.log', {
    create: function(action) {
      return console.log("Created action with uid: " + action.uid);
    },
    update: function(action, value) {
      return console.log("Updated action with uid: " + action.uid + " with value: '" + value + "'");
    },
    dispose: function(action) {
      return console.log("Disposed action with uid: " + action.uid);
    },
    get_scope: function() {
      return 'logger';
    }
  });
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
  storage.set(['simple', 'path', 'with', 'five', 'parts'], null, new Date());
  user_label = function() {
    return 'User name';
  };
  user_exact_label = function() {
    return core.get('..user.login.name', this) + ' ' + core.get('..user.login.surname', this);
  };
  menu_label = function() {
    return 'Menu items';
  };
  menu_0_label = function() {
    return core.get('..menu.items.0', this);
  };
  menu_1_label = function() {
    return core.get('..menu.items.1', this);
  };
  menu_2_label = function() {
    return core.get('..menu.items.2', this);
  };
  menu_3_label = function() {
    return core.get('..menu.items.3', this);
  };
  user_exact_node = function() {
    return [
      fv.create(this.get_scope(), 'log', 1, null, [], user_exact_label, function() {
        return [];
      })
    ];
  };
  menu_exact_nodes = function() {
    return [
      fv.create(this.get_scope(), 'log', 1, null, [], menu_0_label, function() {
        return [];
      }), fv.create(this.get_scope(), 'log', 2, null, [], menu_1_label, function() {
        return [];
      }), fv.create(this.get_scope(), 'log', 3, null, [], menu_2_label, function() {
        return [];
      }), fv.create(this.get_scope(), 'log', 4, null, [], menu_3_label, function() {
        return [];
      })
    ];
  };
  label_nodes = function() {
    if (core.get('..started', this)) {
      return [fv.create(this.get_scope(), 'log', 1, null, [], user_label, user_exact_node)];
    } else {
      return [fv.create(this.get_scope(), 'log', 2, null, [], menu_label, menu_exact_nodes)];
    }
  };
  core.execute('logger-root', (function() {}), label_nodes);
}).call(this);


}, '3.0' ,{requires:['fierry.view', 'fierry.storage']});

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

