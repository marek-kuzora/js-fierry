var require = (function() {

	// Cache to store executed modules public API.
	var cache = {};
	
	// Function that resolves absolute & relative modules paths.
	var resolve = function(module, path) {
		if(path[0] === "/") {
			return path.substr(1);
		}
		
		var regexp = /[0-9a-zA-Z_]+\/\.\.\//;
		var name = module + '/' + path;
		
		// Recursive path's normalization.
		while(name.indexOf('../') > -1) {
			name = name.replace(regexp, '');
		}
		return name;
	};
	
	// Function that requires modules specified by absolute or relative path.
	var require = function(module, path) {
		var name = resolve(module, path);
		
		// Check if module was execute & returns its public API.
		if(cache.hasOwnProperty(name)) {
		
			// Fail if required module is currently being evaluated.
			if(cache[name] === -1) {
				throw new Error('Cyclic dependency found when requiring: ' + name);
			}
			return cache[name];
		}
		
		// Check if module function exists.
		if(modules[name] == null) {
			throw new Error('Module not found: ' + name);
		}
		
		cache[name] = -1;
		
		// Executes module & caches its public API.
		var base = name.substr(0, name.lastIndexOf('/'));
		return cache[name] = modules[name](function(path) {
			return require(base, path);
		});
	};
	return function(path) {
		return require('', path);
	};
})();

var modules = {};
modules["source/storage/dao"] = function(require) {
  var CLOSURE_BEGIN, CLOSURE_END, DOT, Dao, storage;
  
  storage = require('storage');
  
  DOT = 46;
  
  CLOSURE_BEGIN = 123;
  
  CLOSURE_END = 125;
  
  Dao = (function() {
  
    function Dao() {}
  
    Dao.prototype.get = function(key, o) {
      var dao;
      dao = this._retrieve_dao(key, o);
      if (o != null) if (typeof o.register_dao === "function") o.register_dao(dao);
      return dao.get();
    };
  
    Dao.prototype.set = function(key, v, o) {
      return this._retrieve_dao(key, o).set(v);
    };
  
    Dao.prototype.subscribe = function(str, fn, instance) {
      return this._retrieve_dao(str, instance).subscribe(fn);
    };
  
    Dao.prototype.unsubscribe = function(str, fn, instance) {
      return this._retrieve_dao(str, instance).unsubscribe(fn);
    };
  
    Dao.prototype.create = function(key, g, str, arr) {
      return storage.create_dao(key, g, str, arr);
    };
  
    Dao.prototype._retrieve_dao = function(key, o) {
      var arr, dao;
      dao = storage.retrieve_dao(key);
      if (!dao) {
        arr = this.compile(key, o);
        dao = storage.create_dao(key, arr.g, arr.s, arr);
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
        if (char === DOT) {
          if (arr.g == null) {
            arr.g = str.charCodeAt(i + 1) === DOT;
            arr.p = i;
          } else {
            if (p !== i) arr.push(str.substring(p, i));
          }
          p = i + 1;
        } else if (char === CLOSURE_BEGIN) {
          if (p !== i) arr.push(str.substring(p, i));
          st.push(arr);
          arr = [];
          p = i + 1;
        } else if (char === CLOSURE_END) {
          if (p !== i) arr.push(str.substring(p, i));
          nkey = str.substring(arr.p, i);
          nstr = nkey.substr(arr.g ? 2 : 1);
          dao = this.create(nkey, arr.g, nstr, arr, o);
          arr = st.pop();
          arr.push(dao);
          p = i + 1;
        }
        i++;
      }
      if (p !== i) arr.push(str.substr(p));
      arr.s = str.substr(arr.p);
      return arr;
    };
  
    return Dao;
  
  })();
  
  return new Dao();
}
modules["performance/storage/storage_get"] = function(require) {
  var storage;
  
  storage = require('/source/storage/storage');
  
  group('/storage.get');
  
  group('< > length', {
    envs: ['storage.data']
  });
  
  test('2 length', {
    run: function() {
      return storage.get(['view', 'active']);
    }
  });
  
  test('5 length', {
    run: function() {
      return storage.get(['simple', 'path', 'with', 'five', 'parts']);
    }
  });
  
  group('< > count', {
    envs: ['storage.paths']
  });
  
  test('    50 paths', {
    run: function() {
      var i;
      i = this.i++ % 50;
      return storage.get(this.path_arr_5[i]);
    }
  });
  
  test('   500 paths', {
    run: function() {
      var i;
      i = this.i++ % 500;
      return storage.get(this.path_arr_5[i]);
    }
  });
  
  test(' 2 500 paths', {
    run: function() {
      var i;
      i = this.i++ % 2500;
      return storage.get(this.path_arr_5[i]);
    }
  });
}
modules["performance/storage/dao_compile"] = function(require) {
  var dao;
  
  dao = require('/source/storage/dao');
  
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
}
modules["performance/create"] = function(require) {
  group('/create');
  
  require('create/array');
  
  require('create/function');
  
  require('create/instanceof');
  
  require('create/object');
  
  require('create/primitives');
}
modules["source/async/emitter"] = function(require) {
  var Emitter, array, async;
  
  array = require('../core/array');
  
  async = require('global_emitter');
  
  return Emitter = (function() {
  
    function Emitter() {}
  
    Emitter.prototype.subscribe = function(fn) {
      return this.__get_listeners().push(fn);
    };
  
    Emitter.prototype.unsubscribe = function(fn) {
      return array.erase(this.__get_listeners(), fn);
    };
  
    Emitter.prototype.dispatch = function() {
      var fn, _i, _len, _ref;
      if (!this.__emitter_disabled) {
        _ref = this.__get_listeners();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          fn = _ref[_i];
          async.notify(fn);
        }
      }
    };
  
    Emitter.prototype.__get_listeners = function() {
      var _ref;
      return (_ref = this.__listeners_registry) != null ? _ref : this.__listeners_registry = [];
    };
  
    Emitter.prototype.set_emitter_disabled = function(disable) {
      return this.__emitter_disabled = disable;
    };
  
    return Emitter;
  
  })();
}
modules["performance/create/primitives"] = function(require) {
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
}
modules["source/view/nodes"] = function(require) {
  var Nodes;
  
  return Nodes = {
    execute: function(action) {
      var node, _i, _len, _ref;
      action.create();
      _ref = action.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        Nodes.execute(node);
      }
      return action.finalize();
    },
    dispose: function(action) {
      var node, _i, _len, _ref;
      action.dispose();
      _ref = action.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        Nodes.dispose(node);
      }
    }
  };
}
modules["source/async/scheduler"] = function(require) {
  var API, AsyncArray, AsyncFunction, INSTANCE, RAW, Scheduler, app, uid;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  
  app = require('../core/app');
  
  uid = require('../core/uid');
  
  AsyncArray = require('array');
  
  AsyncFunction = require('function');
  
  Scheduler = (function() {
  
    function Scheduler() {
      this.stop = __bind(this.stop, this);
      this.start = __bind(this.start, this);
      this._run_loop = __bind(this._run_loop, this);    this._cache = {};
      this._registry = [];
      this._interval = 10;
    }
  
    Scheduler.prototype.exec = function(fn, delay, periodic) {
      var async;
      async = new AsyncFunction(fn, periodic, delay || this._interval, this);
      return async._reschedule();
    };
  
    Scheduler.prototype.array = function(arr, fn, delay) {
      var async;
      async = new AsyncArray(arr.slice(), fn, delay || this._interval, this);
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
      if (this._cache[uid(async)]) return false;
      i = Math.max(0, ((delay / this._interval) << 0) - 1);
      if ((_ref = (_base = this._registry)[i]) == null) _base[i] = [];
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
  
  RAW = new Scheduler();
  
  RAW.start();
  
  INSTANCE = new Scheduler();
  
  app.register('resume', INSTANCE.start);
  
  app.register('pause', INSTANCE.stop);
  
  return API = {
    exec_raw: function(fn, delay, periodic) {
      return RAW.exec(fn, delay, periodic);
    },
    array_raw: function(arr, fn) {
      return RAW.array(arr, fn);
    },
    exec: function(fn, delay, periodic) {
      return INSTANCE.exec(fn, delay, periodic);
    },
    array: function(arr, fn) {
      return INSTANCE.array(arr, fn);
    }
  };
}
modules["performance/app"] = function(require) {
  var group, repeat, test, _ref;
  
  _ref = require('/source/performance/registry'), group = _ref.group, test = _ref.test, repeat = _ref.repeat;
  
  window['test'] = test;
  
  window['group'] = group;
  
  window['repeat'] = repeat;
  
  window['run'] = require('/source/performance/runner');
  
  require('array');
  
  require('create');
  
  require('function');
  
  require('object');
  
  require('storage');
  
  require('view');
}
modules["source/performance/registry"] = function(require) {
  var API, Group, INSTANCE, Registry, Test;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  
  Test = require('test');
  
  Group = require('group');
  
  Registry = (function() {
  
    function Registry() {
      this.register_test = __bind(this.register_test, this);
      this.register_group = __bind(this.register_group, this);    this._root = new Group({
        name: ''
      });
      this._last_group = this._root;
      this._node_group = this._root;
    }
  
    Registry.prototype.register_group = function(name, h) {
      var group, parent, _ref;
      if (h == null) h = {};
      _ref = this._resolve_name(name), h.name = _ref[0], h.is_node = _ref[1];
      parent = this.get(this._get_parent(h.name));
      group = new Group(h, parent);
      parent.add(group);
      this._last_group = group;
      if (h.is_node) return this._node_group = group;
    };
  
    Registry.prototype._resolve_name = function(name) {
      var n_name;
      n_name = this._node_group.name + '.';
      if (/^\//.test(name)) return [name.substr(1), true];
      if (/^\+\//.test(name)) return [n_name + name.substr(2), true];
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
      if (h == null) h = {};
      h.name = name;
      parent = h.group ? this.get(h.group) : this._last_group;
      test = new Test(h, parent);
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
      if (idx === -1) idx = name.length;
      return [name.substr(0, idx), name.substr(idx + 1)];
    };
  
    return Registry;
  
  })();
  
  INSTANCE = new Registry();
  
  return API = {
    get: function(name) {
      return INSTANCE.get(name);
    },
    group: function(name, h) {
      return INSTANCE.register_group(name, h);
    },
    test: function(name, h) {
      return INSTANCE.register_test(name, h);
    },
    repeat: function(name) {
      return INSTANCE.register_tests_from(name);
    }
  };
}
modules["performance/storage/storage_np"] = function(require) {
  var storage;
  
  storage = require('/source/storage/storage');
  
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
        _results.push(storage.register_rule(r));
      }
      return _results;
    }
  });
  
  test('    50 paths', {
    run: function() {
      var i;
      i = this.i++ % 50;
      return storage._get_np(this.path_arr_5[i], this.path_str_5[i]);
    }
  });
  
  test('   500 paths', {
    run: function() {
      var i;
      i = this.i++ % 500;
      return storage._get_np(this.path_arr_5[i], this.path_str_5[i]);
    }
  });
  
  test(' 2 500 paths', {
    run: function() {
      var i;
      i = this.i++ % 2500;
      return storage._get_np(this.path_arr_5[i], this.path_str_5[i]);
    }
  });
  
  test(' 5 000 paths', {
    run: function() {
      var i;
      i = this.i++ % 5000;
      return storage._get_np(this.path_arr_5[i], this.path_str_5[i]);
    }
  });
  
  test('10 000 paths', {
    run: function() {
      var i;
      i = this.i++ % 10000;
      return storage._get_np(this.path_arr_5[i], this.path_str_5[i]);
    }
  });
  
  group('5 rules', {
    before: function() {
      var r, _i, _len, _ref, _results;
      _ref = this.rules_5;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        r = _ref[_i];
        _results.push(storage.register_rule(r));
      }
      return _results;
    }
  });
  
  repeat('1 rule');
  
  group('no rules');
  
  repeat('1 rule');
}
modules["source/view/roots"] = function(require) {
  var Action, Nodes, Roots, app, assert;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  
  app = require('../core/app');
  
  assert = require('../core/assert');
  
  Nodes = require('nodes');
  
  Action = require('action');
  
  Roots = (function() {
  
    function Roots() {
      this.on_stop = __bind(this.on_stop, this);
      this.on_start = __bind(this.on_start, this);    this._queue = [];
      this._cache = {};
      app.register('start', this.on_start);
      app.register('stop', this.on_stop);
    }
  
    Roots.prototype.register = function(type, behavior) {
      assert(!this._cache[type], "Behavior for '" + type + "' already defined.");
      return this._cache[type] = behavior;
    };
  
    Roots.prototype.execute = function(type, nodes) {
      var action;
      action = this._create(type, nodes);
      this._queue.push(action);
      if (app.is_running()) return Nodes.execute(action);
      return action;
    };
  
    Roots.prototype.execute_raw = function(type, nodes) {
      return Nodes.execute(this._create(type, nodes));
    };
  
    Roots.prototype._create = function(type, nodes) {
      assert(this._cache[type], "Behavior for '" + type + "' not found.");
      return new Action(type, 0, (function() {}), nodes, null, this._cache[type]);
    };
  
    Roots.prototype.on_start = function() {
      var action, _i, _len, _ref;
      _ref = this._queue;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        action = _ref[_i];
        Nodes.execute(action);
      }
    };
  
    Roots.prototype.on_stop = function() {
      var action, _i, _len, _ref;
      _ref = this._queue;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        action = _ref[_i];
        Nodes.dispose(action);
      }
    };
  
    return Roots;
  
  })();
  
  return new Roots();
}
modules["source/storage/complex"] = function(require) {
  var Complex, Plain;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  Plain = require('plain');
  
  return Complex = (function() {
  
    __extends(Complex, Plain);
  
    function Complex(_nested, _storage) {
      var e, _i, _len, _ref;
      this._nested = _nested;
      this._on_nested_change = __bind(this._on_nested_change, this);
      this._recompile();
      _ref = this._nested;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        if (e instanceof Plain) e.subscribe(this._on_nested_change);
      }
      Complex.__super__.constructor.call(this, this._str, this._array, _storage);
      return;
    }
  
    Complex.prototype._on_nested_change = function() {
      this._storage.unsubscribe(this._array, this._str, this._on_change);
      this._recompile();
      this._storage.subscribe(this._array, this._str, this._on_change);
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
          if (e instanceof Plain) {
            _results.push(e.get());
          } else {
            _results.push(e);
          }
        }
        return _results;
      }).call(this);
      return this._str = this._array.join('.');
    };
  
    return Complex;
  
  })();
}
modules["source/view/action"] = function(require) {
  var Action, COMPARE_FN, Nodes, array, assert;
  
  assert = require('../core/assert');
  
  array = require('../core/array');
  
  Nodes = require('nodes');
  
  COMPARE_FN = function(a, b) {
    return a.uid - b.uid;
  };
  
  return Action = (function() {
  
    function Action(type, uid, _value_fn, _nodes_fn, parent, _behavior) {
      this.type = type;
      this.uid = uid;
      this._value_fn = _value_fn;
      this._nodes_fn = _nodes_fn;
      this.parent = parent;
      this._behavior = _behavior;
    }
  
    Action.prototype.create = function() {
      var _ref;
      var _this = this;
      if (this.parent && this.parent.finalized) this.parent.attach(this);
      this._daos = [];
      this.value = this._value_fn();
      this.nodes = this._nodes_fn();
      if ((_ref = this._behavior) == null) {
        this._behavior = this.parent.get_behavior_for(this.type);
      }
      this._behavior.create(this);
      this._behavior.update(this);
      this._update = function() {
        return _this.update();
      };
      this._register_all();
    };
  
    Action.prototype.finalize = function() {
      this._behavior.finalize(this);
      this.finalized = true;
      return this;
    };
  
    Action.prototype.update = function() {
      var new_nodes, node, old_nodes, _i, _j, _len, _len2, _ref;
      if (this.disposed) return;
      this._prev_daos = this._daos;
      this._daos = [];
      this.value = this._value_fn();
      this.nodes = this._nodes_fn();
      this._behavior.update(this);
      _ref = this._get_changed_nodes(), old_nodes = _ref[0], new_nodes = _ref[1];
      for (_i = 0, _len = old_nodes.length; _i < _len; _i++) {
        node = old_nodes[_i];
        Nodes.dispose(node);
      }
      for (_j = 0, _len2 = new_nodes.length; _j < _len2; _j++) {
        node = new_nodes[_j];
        Nodes.execute(node);
      }
      this._submit_changes();
    };
  
    Action.prototype._get_changed_nodes = function() {
      var a, arra, arrb, b, new_nodes, old_nodes, ua, ub;
      old_nodes = [];
      new_nodes = [];
      a = 0;
      b = 0;
      arra = this.nodes;
      arrb = this._nodes_fn();
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
      if (a < arra.length) old_nodes = old_nodes.concat(arra.slice(a));
      if (b < arrb.length) new_nodes = new_nodes.concat(arrb.slice(b));
      return [old_nodes, new_nodes];
    };
  
    Action.prototype.dispose = function() {
      var node, _i, _len, _ref;
      if (this.parent && !this.parent.disposed) this.parent.detach(this);
      this.disposed = true;
      this._behavior.dispose(this);
      this._unregister_all();
      _ref = this.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        Nodes.dispose(node);
      }
      return this.nodes = [];
    };
  
    Action.prototype.attach = function(node) {
      return array.insert_cst(this.nodes, node, COMPARE_FN);
    };
  
    Action.prototype.detach = function(child) {
      return array.erase(this.nodes, child);
    };
  
    Action.prototype.get_behavior_for = function(type) {
      var behavior;
      behavior = this._behavior.get_cached_behavior(type);
      assert(behavior, "Behavior for '" + type + "' not found.");
      return behavior;
    };
  
    Action.prototype.register_dao = function(dao) {
      return this._daos.push(dao);
    };
  
    Action.prototype._register_all = function() {
      var dao, _i, _len, _ref;
      _ref = this._daos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dao = _ref[_i];
        dao.subscribe(this._update);
      }
    };
  
    Action.prototype._unregister_all = function() {
      var dao, _i, _len, _ref;
      _ref = this._daos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dao = _ref[_i];
        dao.unsubscribe(this._update);
      }
      return this._daos = [];
    };
  
    Action.prototype._submit_changes = function() {
      var dao, _i, _j, _len, _len2, _ref, _ref2;
      _ref = this._prev_daos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dao = _ref[_i];
        if (this._daos.indexOf(dao) === -1) dao.unsubscribe(this._update);
      }
      _ref2 = this._daos;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        dao = _ref2[_j];
        if (this._prev_daos.indexOf(dao) === -1) dao.subscribe(this._update);
      }
    };
  
    Action.prototype.find = function(fn) {
      return fn(this.nodes);
    };
  
    return Action;
  
  })();
}
modules["performance/array/join"] = function(require) {
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
}
modules["performance/view"] = function(require) {
  var Behavior, Dummy, Dummy_1, Dummy_2, Dummy_3, HtmlRoot, roots;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  roots = require('/source/view/roots');
  
  Behavior = require('/source/view/behavior');
  
  group('/view');
  
  Dummy = (function() {
  
    __extends(Dummy, Behavior);
  
    function Dummy() {
      Dummy.__super__.constructor.apply(this, arguments);
    }
  
    Dummy.prototype.get_behavior = function(type) {
      if (type === 'dummy-1') return Dummy_1;
      if (type === 'dummy-2') return Dummy_2;
      if (type === 'dummy-3') return Dummy_3;
    };
  
    return Dummy;
  
  })();
  
  Dummy_1 = (function() {
  
    __extends(Dummy_1, Dummy);
  
    function Dummy_1() {
      Dummy_1.__super__.constructor.apply(this, arguments);
    }
  
    return Dummy_1;
  
  })();
  
  Dummy_2 = (function() {
  
    __extends(Dummy_2, Dummy);
  
    function Dummy_2() {
      Dummy_2.__super__.constructor.apply(this, arguments);
    }
  
    return Dummy_2;
  
  })();
  
  Dummy_3 = (function() {
  
    __extends(Dummy_3, Dummy);
  
    function Dummy_3() {
      Dummy_3.__super__.constructor.apply(this, arguments);
    }
  
    return Dummy_3;
  
  })();
  
  Dummy_1 = new Dummy_1();
  
  Dummy_2 = new Dummy_2();
  
  Dummy_3 = new Dummy_3();
  
  roots.register('dummy', new Dummy());
  
  HtmlRoot = (function() {
  
    __extends(HtmlRoot, Behavior);
  
    function HtmlRoot() {
      HtmlRoot.__super__.constructor.apply(this, arguments);
    }
  
    HtmlRoot.prototype.create = function($) {
      return $.node = document.createElement('div');
    };
  
    HtmlRoot.prototype.get_behavior = function(type) {
      return dom.ELEMENTS[type];
    };
  
    return HtmlRoot;
  
  })();
  
  roots.register('html-root', new HtmlRoot());
  
  require('view/create');
  
  require('view/new_create');
}
modules["source/performance/group"] = function(require) {
  var Group, Test, set;
  
  set = require('../core/array');
  
  Test = require('test');
  
  return Group = (function() {
  
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
        if (!(n.name === node.name)) continue;
        if (ignore) return;
        throw new Error("Node " + node.name + " already exists");
      }
      return this._nodes.push(node);
    };
  
    Group.prototype.get = function(name) {
      var n, _i, _len, _ref;
      if (this.name !== '') name = this.name + "." + name;
      _ref = this._nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        if (n.name === name) return n;
      }
      throw new Error("Node not found " + this.name + "." + name);
    };
  
    Group.prototype.get_tests = function() {
      var arr, n, _i, _len, _ref;
      arr = [];
      _ref = this._nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        if (n instanceof Test) arr.push(n);
        if (n instanceof Group) arr = arr.concat(n.get_tests());
      }
      return arr;
    };
  
    Group.prototype.export_tests = function(group) {
      var n, _i, _len, _ref, _results;
      _ref = this._nodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        if (n instanceof Test) _results.push(group.add(n.clone(group), true));
      }
      return _results;
    };
  
    Group.prototype.run_before = function(ctx) {
      if (this.parent) this.parent.run_before(ctx);
      return this._before.call(ctx);
    };
  
    Group.prototype.run_after = function(ctx) {
      this._after.call(ctx);
      if (this.parent) return this.parent.run_after(ctx);
    };
  
    Group.prototype.get_min_arg = function() {
      if (this.parent) return this._min_arg || this.parent.get_min_arg();
      return this._min_arg;
    };
  
    Group.prototype.get_envs = function() {
      if (this.parent) return set.union(this._envs, this.parent.get_envs());
      return this._envs;
    };
  
    return Group;
  
  })();
}
modules["source/generators/string"] = function(require) {
  var StringGenerator, math;
  
  math = require('../core/math');
  
  StringGenerator = (function() {
  
    function StringGenerator() {
      this._cache = {};
      this._min_char = 0;
      this._max_length = 20;
    }
  
    StringGenerator.prototype.array = function(count, length, sorted, range) {
      var k, _base, _ref;
      var _this = this;
      if (length == null) length = 10;
      if (sorted == null) sorted = false;
      if (range == null) range = 127;
      k = "" + count + "_" + length + "_" + range + "_" + sorted;
      return (_ref = (_base = this._cache)[k]) != null ? _ref : _base[k] = (function() {
        var arr, str;
        arr = _this._get_string_array(count, range);
        arr = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = arr.length; _i < _len; _i++) {
            str = arr[_i];
            _results.push(str.substr(0, length));
          }
          return _results;
        })();
        if (!sorted) {}
        return arr;
      })();
    };
  
    StringGenerator.prototype.big = function(length, range) {
      var key, _base, _ref;
      var _this = this;
      if (range == null) range = 200;
      key = "" + length + "_" + range;
      return (_ref = (_base = this._cache)[key]) != null ? _ref : _base[key] = (function() {
        var arr, count;
        count = Math.ceil(length / _this._max_length);
        arr = _this._get_string_array(count, range);
        return arr.join('');
      })();
    };
  
    StringGenerator.prototype._get_string_array = function(count, range) {
      var k, _base, _ref;
      k = "" + count + "_" + this._max_length + "_" + range + "_false";
      return (_ref = (_base = this._cache)[k]) != null ? _ref : _base[k] = this._gen_string_array(count, range);
    };
  
    StringGenerator.prototype._gen_string_array = function(count, range, min_char) {
      var arr, char, i, j, str, _, _results;
      if (min_char == null) min_char = this._min_char;
      _results = [];
      for (_ = 1; 1 <= count ? _ <= count : _ >= count; 1 <= count ? _++ : _--) {
        arr = (function() {
          var _ref, _results2;
          _results2 = [];
          for (j = 1, _ref = this._max_length; 1 <= _ref ? j <= _ref : j >= _ref; 1 <= _ref ? j++ : j--) {
            i = math.rand(range) + min_char;
            _results2.push(char = String.fromCharCode(i));
          }
          return _results2;
        }).call(this);
        _results.push(str = arr.join(''));
      }
      return _results;
    };
  
    return StringGenerator;
  
  })();
  
  return new StringGenerator();
}
modules["performance/array/splice"] = function(require) {
  var math;
  
  math = require('/source/core/math');
  
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
}
modules["source/performance/environments"] = function(require) {
  var Environments, assert;
  
  assert = require('../core/assert');
  
  Environments = (function() {
  
    function Environments() {
      this._envs = {};
    }
  
    Environments.prototype.register = function(name, env) {
      var _ref, _ref2;
      if ((_ref = env.after) == null) env.after = function() {};
      if ((_ref2 = env.before) == null) env.before = function() {};
      return this._envs[name] = env;
    };
  
    Environments.prototype.get = function(name) {
      assert(this._envs[name], "Environment '" + name + "' not found");
      return this._envs[name];
    };
  
    return Environments;
  
  })();
  
  return new Environments();
}
modules["source/core/emitter"] = function(require) {
  var Emitter;
  var __slice = Array.prototype.slice;
  
  return Emitter = (function() {
  
    function Emitter() {}
  
    Emitter.prototype.subscribe = function(type, fn) {
      return this.__get_listeners(type).push(fn);
    };
  
    Emitter.prototype.unsubscribe = function(type, fn) {
      return array.erase(this.__get_listeners(type), fn);
    };
  
    Emitter.prototype.dispatch = function() {
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
  
    Emitter.prototype.__get_listeners = function(type) {
      var reg, _ref, _ref2;
      reg = (_ref = this.__listeners_registry) != null ? _ref : this.__listeners_registry = {};
      return (_ref2 = reg[type]) != null ? _ref2 : reg[type] = [];
    };
  
    Emitter.prototype.set_emitter_disabled = function(disable) {
      return this.__emitter_disabled = disable;
    };
  
    return Emitter;
  
  })();
}
modules["source/core/array"] = function(require) {
  var array;
  var __slice = Array.prototype.slice;
  
  return array = {
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
    },
    erase: function(arr, it) {
      var l;
      l = arr.length;
      while (l--) {
        if (arr[l] === it) arr.splice(l, 1);
      }
    },
    erase_cst: function(arr, it, fn) {
      var l;
      l = arr.length;
      while (l--) {
        if (fn(arr[l], it)) arr.splice(l, 1);
      }
    },
    insert: function(arr, it) {
      var i;
      i = array.bsearch(arr, it);
      if (i < 0) i = -1 * (i + 1);
      return arr.splice(~~i, 0, it);
    },
    insert_cst: function(arr, it, fn) {
      var i;
      i = array.bsearch_cst(arr, it, fn);
      if (i < 0) i = -1 * (i + 1);
      return arr.splice(~~i, 0, it);
    },
    shuffle: function(arr) {
      var i, j, v;
      i = arr.length;
      while (i--) {
        v = arr[i];
        j = ~~(Math.random() * i);
        arr[i] = arr[j];
        arr[j] = v;
      }
      return arr;
    },
    to_array: function(any) {
      return Array.prototype.slice.call(any);
    },
    union: function() {
      var args, arr, i, set, _i, _j, _len, _len2;
      arr = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      set = arr.slice();
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        arr = args[_i];
        for (_j = 0, _len2 = arr.length; _j < _len2; _j++) {
          i = arr[_j];
          if (set.indexOf(i) === -1) set.push(i);
        }
      }
      return set;
    },
    unique: function(arr) {
      var h, i, k, _i, _len;
      h = {};
      for (_i = 0, _len = arr.length; _i < _len; _i++) {
        i = arr[_i];
        h[i] = true;
      }
      return (function() {
        var _results;
        _results = [];
        for (k in h) {
          _results.push(k);
        }
        return _results;
      })();
    }
  };
}
modules["performance/array/erase"] = function(require) {
  var array;
  
  array = require('/source/core/array');
  
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
}
modules["source/core/assert"] = function(require) {
  var assert;
  
  return assert = function(condition, message) {
    if (!condition) throw new Error(message);
  };
}
modules["source/async/async"] = function(require) {
  var Async;
  
  return Async = (function() {
  
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
        if (flag) this._delay = 0;
      }
      return this;
    };
  
    return Async;
  
  })();
}
modules["performance/storage/dao_get"] = function(require) {
  var dao;
  
  dao = require('/source/storage/dao');
  
  group('/dao.get');
  
  group('< > length', {
    envs: ['storage.data']
  });
  
  test('2 length', {
    run: function() {
      return dao.get('..view.active');
    }
  });
  
  test('5 length', {
    run: function() {
      return dao.get('..simple.path.with.five.parts');
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
      return dao.get(this.path_str_5[i]);
    }
  });
  
  test('   500 paths', {
    run: function() {
      var i;
      i = this.i++ % 500;
      return dao.get(this.path_str_5[i]);
    }
  });
  
  test(' 2 500 paths', {
    run: function() {
      var i;
      i = this.i++ % 2500;
      return dao.get(this.path_str_5[i]);
    }
  });
}
modules["performance/object/foreach"] = function(require) {
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
        if (v) this.i++;
      }
    }
  });
  
  test('keys', {
    run: function() {
      var k, keys, _i, _len;
      keys = Object.keys(this.o);
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        k = keys[_i];
        if (this.o[k]) this.i++;
      }
    }
  });
}
modules["source/storage/storage"] = function(require) {
  var Complex, Emitter, Plain, Storage, app, assert, object;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  
  app = require('../core/app');
  
  assert = require('../core/assert');
  
  object = require('../core/object');
  
  Plain = require('plain');
  
  Complex = require('complex');
  
  Emitter = require('../async/emitter');
  
  Storage = (function() {
  
    function Storage() {
      this._clear = __bind(this._clear, this);    this._nps = {};
      this._root = {};
      this._daos = {};
      this._rules = {};
      app.register('stop', this._clear);
    }
  
    Storage.prototype.get = function(arr) {
      return object.get(this._root, arr);
    };
  
    Storage.prototype.set = function(arr, str, v) {
      object.set(this._root, arr, v);
      if (app.is_running()) return this._get_np(arr, str).dispatch();
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
      var _this = this;
      if (!str) str = arr.join('.');
      return (_ref = (_base = this._nps)[str]) != null ? _ref : _base[str] = (function() {
        var np, _base2, _ref2;
        np = _this._get_np_path(arr[0], str);
        return (_ref2 = (_base2 = _this._nps)[np]) != null ? _ref2 : _base2[np] = new Emitter();
      })();
    };
  
    Storage.prototype._get_np_path = function(head, raw) {
      var max, rule, rules, tmp, _i, _len;
      max = '';
      rules = this._rules[head];
      if (rules) {
        for (_i = 0, _len = rules.length; _i < _len; _i++) {
          rule = rules[_i];
          tmp = raw.match(rule);
          if (tmp && tmp[0].length > max.length) max = tmp[0];
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
      if ((_ref = (_base = this._rules)[head]) == null) _base[head] = [];
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
      if (this._is_complex(str)) return new Complex(arr, this);
      return new Plain(str, arr, this);
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
  
  return new Storage();
}
modules["source/dom/tag"] = function(require) {
  var Behavior, Tag;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  Behavior = require('../view/behavior');
  
  Tag = (function() {
  
    __extends(Tag, Behavior);
  
    function Tag() {
      Tag.__super__.constructor.apply(this, arguments);
    }
  
    Tag.prototype.create = function($) {
      var _base, _ref;
      $.node = $.parent.node;
      return (_ref = (_base = $.node).tags) != null ? _ref : _base.tags = {};
    };
  
    Tag.prototype.update = function($) {
      if ($.old_value) this._erase_tags($.tags, $.old_value);
      if ($.value) this._insert_tags($.tags, $.value);
      $.old_value = $.value;
      return $.node.setAttribute('class', Object.keys($.tags));
    };
  
    Tag.prototype.dispose = function($) {
      if ($.old_value) this._erase_tags($.tags, $.old_value);
      return $.node.setAttribute('class', Object.keys($.tags));
    };
  
    Tag.prototype._insert_tags = function(h, tags) {
      var v, _i, _len;
      for (_i = 0, _len = tags.length; _i < _len; _i++) {
        v = tags[_i];
        if (!++h[v]) h[v] = 1;
      }
    };
  
    Tag.prototype._erase_tags = function(h, tags) {
      var v, _i, _len;
      for (_i = 0, _len = tags.length; _i < _len; _i++) {
        v = tags[_i];
        if (--h[v] === 0) delete h[v];
      }
    };
  
    return Tag;
  
  })();
  
  return new Tag();
}
modules["performance/object"] = function(require) {
  group('/object');
  
  require('object/clone');
  
  require('object/foreach');
  
  require('object/get');
}
modules["source/generators/path"] = function(require) {
  var PATHS_ARRAY, PathGenerator, math, uid;
  
  uid = require('../core/uid');
  
  math = require('../core/math');
  
  PATHS_ARRAY = require('path_array');
  
  PathGenerator = (function() {
  
    function PathGenerator() {
      this._cache = {};
    }
  
    PathGenerator.prototype.array = function(count, length, arr) {
      var key, _base, _ref;
      if (length == null) length = 5;
      if (arr == null) arr = PATHS_ARRAY;
      key = "" + (uid(arr)) + "_" + count + "_" + length;
      return (_ref = (_base = this._cache)[key]) != null ? _ref : _base[key] = this._get_path_array(arr, count, length);
    };
  
    PathGenerator.prototype._get_path_array = function(arr, count, length) {
      var key, max;
      key = "" + (uid(arr)) + "_" + length;
      max = this._cache[key] || [];
      if (max.length < count) {
        max = this._cache[key] = this._permutate_paths(arr, count, length);
      }
      return max.slice(0, count);
    };
  
    PathGenerator.prototype._permutate_paths = function(arr, count, length) {
      var l, _, _results;
      l = arr.length;
      _results = [];
      while (count--) {
        _results.push(((function() {
          var _ref, _results2;
          _results2 = [];
          for (_ = 0, _ref = length - 1; 0 <= _ref ? _ <= _ref : _ >= _ref; 0 <= _ref ? _++ : _--) {
            _results2.push(arr[math.rand(l - 1)]);
          }
          return _results2;
        })()).join('.'));
      }
      return _results;
    };
  
    return PathGenerator;
  
  })();
  
  return new PathGenerator();
}
modules["performance/create/instanceof"] = function(require) {
  var cls;
  
  cls = require('/source/core/emitter');
  
  group('/create.instanceof');
  
  test('class -true', {
    before: function() {
      return this.o = new cls();
    },
    run: function() {
      return this.o instanceof cls;
    }
  });
  
  test('class -false', {
    before: function() {
      return this.o = new cls();
    },
    run: function() {
      return this.o instanceof String;
    }
  });
  
  test('string', {
    run: function() {
      return 'a' instanceof cls;
    }
  });
}
modules["performance/create/object"] = function(require) {
  var cls;
  
  cls = require('/source/core/emitter');
  
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
      return o = new cls();
    }
  });
  
  test('core.App -indirect', {
    before: function() {
      return this.types = {
        'app': cls
      };
    },
    run: function() {
      return new this.types['app']();
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
}
modules["performance/object/get"] = function(require) {
  var object;
  
  object = require('/source/core/object');
  
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
}
modules["source/generators/rules"] = function(require) {
  var PATHS_ARRAY, RulesGenerator, math, path;
  
  path = require('path');
  
  math = require('../core/math');
  
  PATHS_ARRAY = require('path_array');
  
  RulesGenerator = (function() {
  
    function RulesGenerator() {}
  
    RulesGenerator.prototype.array = function(count, length, arr) {
      var i, l, p, parr, _len, _results;
      if (length == null) length = 5;
      if (arr == null) arr = PATHS_ARRAY;
      l = arr.length;
      parr = path.array(count * l, length - 1, arr);
      _results = [];
      for (i = 0, _len = parr.length; i < _len; i++) {
        p = parr[i];
        _results.push(parr[i % l] + '.' + p.replace(parr[math.rand(l - 1)], '*'));
      }
      return _results;
    };
  
    return RulesGenerator;
  
  })();
  
  return new RulesGenerator();
}
modules["performance/view/new_create"] = function(require) {
  group('/view.new_create');
  
  test(' 4 actions: 1x3', {
    before: function() {
      return this.root = require('create:1x3');
    },
    run: function() {
      return this.root();
    }
  });
  
  test(' 4 actions: 1x1x1x1', {
    before: function() {
      return this.root = require('create:1x1x1x1');
    },
    run: function() {
      return this.root();
    }
  });
  
  test(' 6 actions: 1x5', {
    before: function() {
      return this.root = require('create:1x5');
    },
    run: function() {
      return this.root();
    }
  });
  
  test(' 7 actions: 1x3x1', {
    before: function() {
      return this.root = require('create:1x3x1');
    },
    run: function() {
      return this.root();
    }
  });
  
  test(' 7 actions: 1x2x1x1', {
    before: function() {
      return this.root = require('create:1x2x1x1');
    },
    run: function() {
      return this.root();
    }
  });
  
  test('10 actions: 1x3x2', {
    before: function() {
      return this.root = require('create:1x3x2');
    },
    run: function() {
      return this.root();
    }
  });
}
modules["source/core/lang"] = function(require) {
  var lang;
  
  return lang = {
    is_array: function(o) {
      return Array.isArray(o);
    },
    is_string: function(o) {
      return typeof o === 'string' || o.toString() === '[object String]';
    },
    is_number: function(o) {
      return typeof o === 'number' || o.toString() === '[object Number]';
    },
    is_boolean: function(o) {
      return typeof o === 'boolean' || o.toString() === '[object Boolean]';
    },
    is_function: function(o) {
      return typeof o === 'function' || o.toString() === '[object Function]';
    },
    is_object: function(o) {
      return typeof o === 'object' && o.toString() === '[object Object]';
    },
    is_date: function(o) {
      return o instanceof Date;
    },
    is_regexp: function(o) {
      return o instanceof RegExp;
    }
  };
}
modules["source/dom/attribute"] = function(require) {
  var Attribute, Behavior;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  Behavior = require('../view/behavior');
  
  Attribute = (function() {
  
    __extends(Attribute, Behavior);
  
    function Attribute() {
      Attribute.__super__.constructor.apply(this, arguments);
    }
  
    Attribute.prototype.create = function($) {
      return $.node = $.parent.node;
    };
  
    Attribute.prototype.update = function($) {
      return $.node.setAttribute($.type, $.value);
    };
  
    Attribute.prototype.dispose = function($) {
      return $.node.setAttribute($.type, $.parent.get($.type));
    };
  
    return Attribute;
  
  })();
  
  return new Attribute();
}
modules["source/performance/events"] = function(require) {
  var Events, settings, string;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  
  string = require('../core/string');
  
  settings = require('settings');
  
  return Events = (function() {
  
    function Events() {
      this.tests_finished = __bind(this.tests_finished, this);
      this.test_finished = __bind(this.test_finished, this);
      this.tests_found = __bind(this.tests_found, this);    this._count = 0;
      this._group = '';
    }
  
    Events.prototype.tests_found = function(tests) {
      return console.log("Found", tests.length, "test cases.");
    };
  
    Events.prototype.test_finished = function(test) {
      var group;
      group = test.group.name;
      if (group !== this._group) this._switch_groups(group);
      if (this._is_last_entry()) {
        return console.log(this._get_output_name(test), this._get_output_ops(test), "  ops/ms");
      }
    };
  
    Events.prototype.tests_finished = function() {
      var i, _ref, _results;
      _results = [];
      for (i = 0, _ref = this._get_group_length(); 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        _results.push(console.groupEnd());
      }
      return _results;
    };
  
    Events.prototype._switch_groups = function(group) {
      var curr, i, j, prev, _ref, _ref2;
      curr = group.split('.');
      prev = this._group.split('.');
      i = 0;
      while (curr[i] === prev[i]) {
        i++;
      }
      for (j = i, _ref = prev.length - 1; i <= _ref ? j <= _ref : j >= _ref; i <= _ref ? j++ : j--) {
        console.groupEnd();
      }
      for (j = i, _ref2 = curr.length - 1; i <= _ref2 ? j <= _ref2 : j >= _ref2; i <= _ref2 ? j++ : j--) {
        console.group(curr[j]);
      }
      return this._group = group;
    };
  
    Events.prototype._get_group_length = function() {
      return this._group.split('.').length - 1;
    };
  
    Events.prototype._get_output_name = function(test) {
      return string.rpad(test.name, this._get_padding());
    };
  
    Events.prototype._get_output_ops = function(test) {
      var ops, rgx;
      rgx = /(\d+)(\d{3})(\.\d{2})/;
      ops = test.get_result().get_average().toFixed(2);
      ops = ops.replace(rgx, '$1' + ' ' + '$2$3');
      return string.lpad(ops, 10);
    };
  
    Events.prototype._is_last_entry = function() {
      return ++this._count % settings.EXECUTE_RETRY === 0;
    };
  
    Events.prototype._get_padding = function() {
      return 50 - this._get_group_length() * 2;
    };
  
    return Events;
  
  })();
}
modules["performance/function/view_representation"] = function(require) {
  var Class;
  
  Class = (function() {
  
    function Class() {}
  
    return Class;
  
  })();
  
  group('/function.view', {
    before: function() {
      this.v0 = function() {};
      this.v1 = function() {};
      this.v2 = function() {};
      return this.n0 = function() {
        return [];
      };
    }
  });
  
  test('inside -arr', {
    before: function() {
      return this.n = function() {
        var arr, n1, n2, v;
        v = function() {};
        n1 = function() {
          var arr, n;
          v = function() {};
          n = function() {
            return [];
          };
          arr = [];
          arr[0] = new Class('type', v, n);
          return arr;
        };
        n2 = function() {
          var arr, n;
          v = function() {};
          n = function() {};
          arr = [];
          arr[0] = new Class('type', v, n);
          return arr;
        };
        arr = [];
        arr[0] = new Class('type', v, n1);
        arr[1] = new Class('type', v, n2);
        return arr;
      };
    },
    run: function() {
      return this.n();
    }
  });
  
  test('inside -arr-push', {
    before: function() {
      return this.n = function() {
        var arr, n1, n2, v;
        v = function() {};
        n1 = function() {
          var arr, n;
          v = function() {};
          n = function() {
            return [];
          };
          arr = [];
          arr.push(new Class('type', v, n));
          return arr;
        };
        n2 = function() {
          var arr, n;
          v = function() {};
          n = function() {};
          arr = [];
          arr.push(new Class('type', v, n));
          return arr;
        };
        arr = [];
        arr.push(new Class('type', v, n1));
        arr.push(new Class('type', v, n2));
        return arr;
      };
    },
    run: function() {
      return this.n();
    }
  });
  
  test('inside -1', {
    before: function() {
      return this.n = function() {
        var arr;
        arr = [];
        arr.push(new Class('type', (function() {}), function() {
          arr = [];
          arr.push(new Class('type', (function() {}), function() {
            return [];
          }));
          return arr;
        }));
        arr.push(new Class('type', (function() {}), function() {
          arr = [];
          arr.push(new Class('type', (function() {}), function() {
            return [];
          }));
          return arr;
        }));
        return arr;
      };
    },
    run: function() {
      return this.n();
    }
  });
  
  test('inside -1 -for', {
    before: function() {
      return this.n = function() {
        var arr, i;
        arr = [];
        arr.push(new Class('type', (function() {}), function() {
          arr = [];
          arr.push(new Class('type', (function() {}), function() {
            return [];
          }));
          return arr;
        }));
        for (i = 1; i <= 1; i++) {
          arr.push(new Class('type', (function() {}), function() {
            arr = [];
            arr.push(new Class('type', (function() {}), function() {
              return [];
            }));
            return arr;
          }));
        }
        return arr;
      };
    },
    run: function() {
      return this.n();
    }
  });
  
  test('inside -1 -if', {
    before: function() {
      return this.n = function() {
        var arr;
        arr = [];
        arr.push(new Class('type', (function() {}), function() {
          arr = [];
          arr.push(new Class('type', (function() {}), function() {
            return [];
          }));
          return arr;
        }));
        if (1 < 2) {
          arr.push(new Class('type', (function() {}), function() {
            arr = [];
            arr.push(new Class('type', (function() {}), function() {
              return [];
            }));
            return arr;
          }));
        }
        return arr;
      };
    },
    run: function() {
      return this.n();
    }
  });
  
  test('inside -arr-literal', {
    before: function() {
      return this.n = function() {
        var n1, n2, v;
        v = function() {};
        n1 = function() {
          var n;
          v = function() {};
          n = function() {
            return [];
          };
          return [new Class('type', v, n)];
        };
        n2 = function() {
          var n;
          v = function() {};
          n = function() {};
          return [new Class('type', v, n)];
        };
        return [new Class('type', v, n1), new Class('type', v, n2)];
      };
    },
    run: function() {
      return this.n();
    }
  });
  
  /*
  test 'outside'
    before: ->
      v0 = ->
      v1 = ->
      v2 = ->
      n0 = ->
      n1 = ->
        return [
          new Class('type', v1, n0)
        ]
      n2 = ->
        return [
          new Class('type', v1, n0)
        ]
      @n = ->
        return [
          new Class('type', v0, n1)
          new Class('type', v0, n2)
          new Class('type', v0, n0)
        ]
    run: ->
      @n()
  
  test 'outside -arr'
    before: ->
      v1 = ->
      v2 = ->
      n0 = ->
      n1 = ->
        arr = []
        arr[0] = new Class('type', v1, n0)
        return arr
      n2 = ->
        arr = []
        arr[0] = new Class('type', v2, n0)
        return arr
      v0 = ->
      @n = ->
        arr = []
        arr[0] = new Class('type', v0, n1)
        arr[1] = new Class('type', v0, n2)
        return arr
    run: ->
      @n()
  
  # Jak moge tutaj modelowac ify oraz fory??
  */
}
modules["source/core/uid"] = function(require) {
  var array, oop, uid;
  
  oop = require('oop');
  
  array = require('array');
  
  uid = {
    stamp: function(obj) {
      var _ref;
      return (_ref = obj.__uid__) != null ? _ref : obj.__uid__ = ++uid.__counter__;
    },
    __counter__: 1,
    equals: function(a, b) {
      return uid.stamp(a) === uid.stamp(b);
    },
    sort_asc: function(a, b) {
      return uid.stamp(a) - uid.stamp(b);
    },
    sort_desc: function(a, b) {
      return uid.stamp(b) - uid.stamp(a);
    },
    bsearch: function(arr, it) {
      return array.bsearch(it, arr, uid.sort_asc);
    },
    indexOf: function(arr, it, i) {
      var l;
      if (i == null) i = 0;
      l = arr.length;
      while (i++ < l) {
        if (uid.equals(arr[i - 1], it)) return i - 1;
      }
      return -1;
    },
    erase: function(arr, it) {
      return array.erase_cst(arr, it, uid.equals);
    },
    insert: function(arr, it) {
      return array.insert_cst(arr, it, uid.sort_asc);
    }
  };
  
  return oop.install_head(uid, uid.stamp);
}
modules["performance/storage/dao_create"] = function(require) {
  var dao;
  
  dao = require('/source/storage/dao');
  
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
        this.path_arr[i].push(dao._retrieve_dao('..movie.title'));
      }
      return this.key_str = (function() {
        var _len2, _ref2, _results;
        _ref2 = this.path_str;
        _results = [];
        for (i = 0, _len2 = _ref2.length; i < _len2; i++) {
          v = _ref2[i];
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
        this.path_arr[i].push(dao._retrieve_dao('..' + this.path_str_2[i % 500]));
      }
      return this.key_str = (function() {
        var _len2, _ref2, _results;
        _ref2 = this.path_str;
        _results = [];
        for (i = 0, _len2 = _ref2.length; i < _len2; i++) {
          v = _ref2[i];
          _results.push('..' + v);
        }
        return _results;
      }).call(this);
    }
  });
  
  repeat('/dao.create.plain');
}
modules["performance/array/bsearch"] = function(require) {
  var array, int, string;
  
  array = require('/source/core/array');
  
  int = require('/source/generators/number');
  
  string = require('/source/generators/string');
  
  group('/array.bsearch', {
    before: function() {
      this.i = 0;
      return this.max = 100000;
    }
  });
  
  group('int');
  
  test('    100 -1 step', {
    before: function() {
      return this.ints = int.array(100, 1, true);
    },
    run: function() {
      return array.bsearch(this.ints, this.i++ % this.max);
    }
  });
  
  test('    100 -5 step', {
    before: function() {
      return this.ints = int.array(100, 5, true);
    },
    run: function() {
      return array.bsearch(this.ints, this.i++ % this.max);
    }
  });
  
  test(' 10 000 -1 step', {
    before: function() {
      return this.ints = int.array(10000, 1, true);
    },
    run: function() {
      return array.bsearch(this.ints, this.i++ % this.max);
    }
  });
  
  test(' 10 000 -5 step', {
    before: function() {
      return this.ints = int.array(10000, 5, true);
    },
    run: function() {
      return array.bsearch(this.ints, this.i++ % this.max);
    }
  });
  
  test('100 000 -1 step', {
    before: function() {
      return this.ints = int.array(100000, 1, true);
    },
    run: function() {
      return array.bsearch(this.ints, this.i++ % this.max);
    }
  });
  
  test('100 000 -5 step', {
    before: function() {
      return this.ints = int.array(100000, 5, true);
    },
    run: function() {
      return array.bsearch(this.ints, this.i++ % this.max);
    }
  });
  
  group('string');
  
  test('    100  -5 length', {
    before: function() {
      return this.arr = string.array(100, 5, true);
    },
    run: function() {
      return array.bsearch(this.arr, this.arr[this.i % 10]);
    }
  });
  
  test('    100 -20 length', {
    before: function() {
      return this.arr = string.array(100, 20, true);
    },
    run: function() {
      return array.bsearch(this.arr, this.arr[this.i % 10]);
    }
  });
  
  test(' 10 000  -5 length', {
    before: function() {
      return this.ints = string.array(10000, 5, true);
    },
    run: function() {
      return array.bsearch(this.ints, this.ints[this.i % this.max]);
    }
  });
  
  test(' 10 000 -20 length', {
    before: function() {
      return this.ints = string.array(10000, 20, true);
    },
    run: function() {
      return array.bsearch(this.ints, this.ints[this.i % this.max]);
    }
  });
  
  test('100 000  -5 length', {
    before: function() {
      return this.ints = string.array(100000, 5, true);
    },
    run: function() {
      return array.bsearch(this.ints, this.ints[this.i % this.max]);
    }
  });
  
  test('100 000 -20 length', {
    before: function() {
      return this.ints = string.array(100000, 20, true);
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
      return this.ints = int.array(100, 1, true);
    },
    run: function() {
      return array.bsearch_cst(this.ints, this.i++ % this.max, this.fn);
    }
  });
  
  test('    100 -5 step', {
    before: function() {
      return this.ints = int.array(100, 5, true);
    },
    run: function() {
      return array.bsearch_cst(this.ints, this.i++ % this.max, this.fn);
    }
  });
  
  test(' 10 000 -1 step', {
    before: function() {
      return this.ints = int.array(10000, 1, true);
    },
    run: function() {
      return array.bsearch_cst(this.ints, this.i++ % this.max, this.fn);
    }
  });
  
  test(' 10 000 -5 step', {
    before: function() {
      return this.ints = int.array(10000, 5, true);
    },
    run: function() {
      return array.bsearch_cst(this.ints, this.i++ % this.max, this.fn);
    }
  });
  
  test('100 000 -1 step', {
    before: function() {
      return this.ints = int.array(100000, 1, true);
    },
    run: function() {
      return array.bsearch_cst(this.ints, this.i++ % this.max, this.fn);
    }
  });
  
  test('100 000 -5 step', {
    before: function() {
      return this.ints = int.array(100000, 5, true);
    },
    run: function() {
      return array.bsearch_cst(this.ints, this.i++ % this.max, this.fn);
    }
  });
}
modules["performance/array/foreach"] = function(require) {
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
        if (v) this.i++;
      }
    }
  });
}
modules["source/performance/settings"] = function(require) {
  var settings;
  
  return settings = {
    EXECUTE_RETRY: 5,
    EXECUTE_LIMIT: 50,
    MEASURE_LIMIT: 5,
    MEASURE_RETRY: 3
  };
}
modules["performance/array/index_of"] = function(require) {
  var group, test, _ref;
  
  _ref = require('/source/performance/registry'), group = _ref.group, test = _ref.test;
  
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
}
modules["source/core/app"] = function(require) {
  var App;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  
  App = (function() {
  
    function App() {
      this.register = __bind(this.register, this);    this._behaviors = {
        'stop': [],
        'start': [],
        'pause': [],
        'resume': []
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
        if (!this._paused) this._trigger_behavior('pause');
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
  
    App.prototype.register = function(state, fn) {
      return this._behaviors[state].push(fn);
    };
  
    return App;
  
  })();
  
  return new App();
}
modules["performance/array"] = function(require) {
  group('/array');
  
  require('array/bsearch');
  
  require('array/concat');
  
  require('array/erase');
  
  require('array/foreach');
  
  require('array/insert');
  
  require('array/join');
  
  require('array/slice');
  
  require('array/splice');
}
modules["source/dom/element"] = function(require) {
  var Behavior, Element;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  Behavior = require('../view/behavior');
  
  Element = (function() {
  
    __extends(Element, Behavior);
  
    function Element() {
      Element.__super__.constructor.apply(this, arguments);
    }
  
    Element.prototype.create = function($) {
      $.pnode = $.parent.node;
      return $.node = document.createElement($.type);
    };
  
    Element.prototype.update = function($) {
      $.text_node = $.value != null;
      if ($.text_node) return $.node.textContent = $.value;
    };
  
    Element.prototype.finalize = function($) {
      if ($.parent.text_node) {
        throw new Error('Cannot attach elements to text node.');
      }
      if ($.parent.finalized) {
        return $.pnode.injectBefore($.node, $.parent.find(function(nodes) {
          var i, l, _results;
          i = nodes.indexOf($);
          l = nodes.length;
          _results = [];
          while (i++ < l) {
            if (nodes[i].node instanceof Abstract) return nodes[i].node;
          }
          return _results;
        }));
      }
      return $.pnode.appendChild($.node);
    };
  
    Element.prototype.dispose = function($) {
      return $.pnode.removeChild($.node);
    };
  
    return Element;
  
  })();
  
  return new Element();
}
modules["performance/storage/storage_def"] = function(require) {
  
}
modules["performance/array/concat"] = function(require) {
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
}
modules["performance/create/array"] = function(require) {
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
}
modules["source/dom/style"] = function(require) {
  var Behavior, Style;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  Behavior = require('../view/behavior');
  
  Style = (function() {
  
    __extends(Style, Behavior);
  
    function Style() {
      Style.__super__.constructor.apply(this, arguments);
    }
  
    Style.prototype.create = function($) {
      return $.node = $.parent.node;
    };
  
    Style.prototype.update = function($) {
      return $.node.style[$.type] = $.value;
    };
  
    Style.prototype.dispose = function($) {
      return $.node.style[$.type] = $.parent.get($.type);
    };
  
    return Style;
  
  })();
  
  return new Style();
}
modules["source/performance/test_result"] = function(require) {
  var TestResult;
  
  return TestResult = (function() {
  
    function TestResult() {
      this._registry = [];
    }
  
    TestResult.prototype.register = function(arg, time) {
      if (time !== 0) return this._registry.push(arg / time);
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
}
modules["performance/function"] = function(require) {
  group('/function');
  
  require('function/execute');
  
  require('function/view_representation');
}
modules["source/generators/number"] = function(require) {
  var NumberGenerator, array, math;
  
  math = require('../core/math');
  
  array = require('../core/array');
  
  NumberGenerator = (function() {
  
    function NumberGenerator() {
      this._cache = {};
    }
  
    NumberGenerator.prototype.array = function(count, step, sorted) {
      var k, _base, _ref;
      var _this = this;
      if (step == null) step = 1;
      if (sorted == null) sorted = false;
      k = "" + count + "_" + step + "_" + sorted;
      return (_ref = (_base = this._cache)[k]) != null ? _ref : _base[k] = (function() {
        var arr, i, j;
        i = 0;
        arr = (function() {
          var _results;
          _results = [];
          for (j = 1; 1 <= count ? j <= count : j >= count; 1 <= count ? j++ : j--) {
            _results.push(i += step ? math.rand(step - 1) + 1 : math.rand());
          }
          return _results;
        })();
        if (!!sorted) {}
        return arr;
      })();
    };
  
    return NumberGenerator;
  
  })();
  
  return new NumberGenerator();
}
modules["source/core/math"] = function(require) {
  var math;
  var __slice = Array.prototype.slice;
  
  return math = {
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
      if (max != null) return Math.random() * max << 0;
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
}
modules["performance/array/insert"] = function(require) {
  var array;
  
  array = require('/source/core/array');
  
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
}
modules["source/view/behavior"] = function(require) {
  var Behavior;
  
  return Behavior = (function() {
  
    function Behavior() {
      this._bcache = {};
    }
  
    Behavior.prototype.create = function() {};
  
    Behavior.prototype.update = function() {};
  
    Behavior.prototype.finalize = function() {};
  
    Behavior.prototype.dispose = function() {};
  
    Behavior.prototype.get_behavior = function() {
      return null;
    };
  
    Behavior.prototype.get_cached_behavior = function(type) {
      var _base, _ref;
      return (_ref = (_base = this._bcache)[type]) != null ? _ref : _base[type] = this.get_behavior(type);
    };
  
    return Behavior;
  
  })();
}
modules["source/performance/test"] = function(require) {
  var Test, TestResult, app, envs, math, set, settings;
  
  app = require('../core/app');
  
  math = require('../core/math');
  
  set = require('../core/array');
  
  envs = require('environments');
  
  settings = require('settings');
  
  TestResult = require('test_result');
  
  return Test = (function() {
  
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
      return new Test(this._ref, group);
    };
  
    Test.prototype._get_envs = function(t_names, g_names) {
      var name, _i, _len, _ref, _results;
      _ref = set.union(t_names, g_names);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        _results.push(envs.get(name));
      }
      return _results;
    };
  
    Test.prototype.accept = function(visitor) {
      return visitor.on_test(this);
    };
  
    Test.prototype.measure = function() {
      var arg, arr, i, time;
      if (this._arg) return this._arg;
      arg = 1;
      time = 0;
      while (time === 0) {
        time = this.run(arg);
        arg *= 10;
      }
      while (time < settings.MEASURE_LIMIT) {
        arg *= 2;
        time = this.run(arg);
      }
      arr = (function() {
        var _ref, _results;
        _results = [];
        for (i = 1, _ref = settings.MEASURE_RETRY; 1 <= _ref ? i <= _ref : i >= _ref; 1 <= _ref ? i++ : i--) {
          _results.push(this.run(arg));
        }
        return _results;
      }).call(this);
      this._arg = settings.EXECUTE_LIMIT / math.avg(arr) * arg;
      if (this._arg < this._min_arg) this._arg = this._min_arg;
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
      for (i = 0; 0 <= arg ? i <= arg : i >= arg; 0 <= arg ? i++ : i--) {
        this._run();
      }
      end = new Date();
      app.stop();
      this._after();
      this.group.run_after(this);
      _ref2 = this._envs;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        env = _ref2[_j];
        env.after.call(this);
      }
      return end - start;
    };
  
    Test.prototype.create_test_result = function() {
      return this._results.push(new TestResult());
    };
  
    Test.prototype.get_result = function() {
      return this._results[this._results.length - 1];
    };
  
    return Test;
  
  })();
}
modules["source/performance/runner"] = function(require) {
  var Emitter, Events, Group, Runner, Test, app, assert, async, registry, run, settings;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  app = require('../core/app');
  
  assert = require('../core/assert');
  
  async = require('../async/scheduler');
  
  registry = require('registry');
  
  settings = require('settings');
  
  Test = require('test');
  
  Group = require('group');
  
  Events = require('events');
  
  Emitter = require('../core/emitter');
  
  Runner = (function() {
  
    __extends(Runner, Emitter);
  
    function Runner(registry, arr) {
      this._run_once = __bind(this._run_once, this);    this._registry = registry;
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
      async.array_raw(cases, this._run_once);
    };
  
    Runner.prototype._run_once = function(test, last) {
      var arg, time;
      app.stop();
      arg = test.measure();
      time = test.run(arg);
      test.get_result().register(arg, time);
      this.dispatch("test.finished", test);
      if (last) return this.dispatch("tests.finished");
    };
  
    Runner.prototype._extract_tests = function(arr) {
      var name, obj, r, _i, _len;
      r = [];
      for (_i = 0, _len = arr.length; _i < _len; _i++) {
        name = arr[_i];
        obj = this._registry.get(name);
        if (obj instanceof Test) r.push(obj);
        if (obj instanceof Group) r = r.concat(obj.get_tests());
      }
      return r;
    };
  
    Runner.prototype._build_test_cases = function(tests) {
      var i, r, test, _i, _len, _ref;
      r = [];
      for (_i = 0, _len = tests.length; _i < _len; _i++) {
        test = tests[_i];
        test.create_test_result();
        for (i = 1, _ref = settings.EXECUTE_RETRY; 1 <= _ref ? i <= _ref : i >= _ref; 1 <= _ref ? i++ : i--) {
          r.push(test);
        }
      }
      return r;
    };
  
    return Runner;
  
  })();
  
  return run = function() {
    var events, runner;
    runner = new Runner(registry, arguments);
    events = new Events();
    runner.subscribe("tests.found", events.tests_found);
    runner.subscribe("test.finished", events.test_finished);
    runner.subscribe("tests.finished", events.tests_finished);
    return runner.run();
  };
}
modules["source/core/oop"] = function(require) {
  var oop;
  
  return oop = {
    install_head: function(h, fn) {
      var k, v;
      for (k in h) {
        v = h[k];
        fn[k] = v;
      }
      return fn;
    }
  };
}
modules["source/async/global_emitter"] = function(require) {
  var GlobalEmitter, async, uid;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  
  uid = require('../core/uid');
  
  async = require('scheduler');
  
  GlobalEmitter = (function() {
  
    function GlobalEmitter() {
      this.notify = __bind(this.notify, this);    this._dirty = [];
      this._visited = [];
      async.exec(this.notify, 10, true);
    }
  
    GlobalEmitter.prototype.register_listener = function(fn) {
      if (!this._visited[uid(fn)]) {
        this._visited[uid(fn)] = true;
        return this._dirty.push(fn);
      }
    };
  
    GlobalEmitter.prototype.notify = function() {
      var i, l;
      i = 0;
      l = this._dirty.length;
      while (i < l) {
        this._execute(i++);
        if (i === l) l = this._dirty.length;
      }
      return this._dirty = [];
    };
  
    GlobalEmitter.prototype._execute = function(i) {
      var fn;
      fn = this._dirty[i];
      fn();
      return this._visited[uid(fn)] = false;
    };
  
    return GlobalEmitter;
  
  })();
  
  return new GlobalEmitter();
}
modules["source/async/array"] = function(require) {
  var Array, Async;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  Async = require('async');
  
  return Array = (function() {
  
    __extends(Array, Async);
  
    function Array(_arr, _fn, _interval, _scheduler) {
      this._arr = _arr;
      this._fn = _fn;
      Array.__super__.constructor.call(this, _interval, _scheduler);
    }
  
    Array.prototype.execute = function() {
      var arg, empty;
      if (this._running) {
        arg = this._arr.shift();
        empty = this._arr.length === 0;
        this._fn(arg, empty);
        this._reschedule();
        if (empty) return this._running = false;
      }
    };
  
    return Array;
  
  })();
}
modules["source/core/object"] = function(require) {
  var object;
  
  return object = {
    get: function(o, p) {
      var i, _i, _len;
      for (_i = 0, _len = p.length; _i < _len; _i++) {
        i = p[_i];
        if (o === void 0) return;
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
}
modules["source/core/string"] = function(require) {
  var string;
  
  return string = {
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
}
modules["source/storage/plain"] = function(require) {
  var Emitter, Plain;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  Emitter = require('../async/emitter');
  
  return Plain = (function() {
  
    __extends(Plain, Emitter);
  
    function Plain(_str, _array, _storage) {
      this._str = _str;
      this._array = _array;
      this._storage = _storage;
      this._on_change = __bind(this._on_change, this);
      this._storage.subscribe(this._array, this._str, this._on_change);
    }
  
    Plain.prototype._on_change = function() {
      this._value = this._storage.get(this._array);
      return this.dispatch();
    };
  
    Plain.prototype.get = function() {
      var _ref;
      return (_ref = this._value) != null ? _ref : this._value = this._storage.get(this._array);
    };
  
    Plain.prototype.set = function(nv) {
      return this._storage.set(this._array, this._str, nv);
    };
  
    return Plain;
  
  })();
}
modules["performance/array/slice"] = function(require) {
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
}
modules["performance/create/function"] = function(require) {
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
}
modules["source/dom/event"] = function(require) {
  var Behavior, Event;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  Behavior = require('../view/behavior');
  
  Event = (function() {
  
    __extends(Event, Behavior);
  
    function Event() {
      Event.__super__.constructor.apply(this, arguments);
    }
  
    Event.prototype.create = function($) {
      return $.node = $.parent.node;
    };
  
    Event.prototype.update = function($) {
      if ($.value) $.node.addEventListener($.value);
      if ($.old_value != null) $.node.removeEventListener($.old_value);
      return $.old_value = $.value;
    };
  
    Event.prototype.dispose = function($) {
      if ($.value != null) return $.node.removeEventListener($.value);
    };
  
    return Event;
  
  })();
  
  return new Event();
}
modules["source/generators/path_array"] = function(require) {
  var PATHS_ARRAY;
  
  return PATHS_ARRAY = ['open', 'seem', 'together', 'next', 'white', 'children', 'begin', 'got', 'walk', 'example', 'ease', 'paper', 'often', 'always', 'music', 'those', 'both', 'mark', 'book', 'letter', 'until', 'mile', 'river', 'car', 'feet', 'care', 'second', 'group', 'carry', 'took', 'rain', 'eat', 'room', 'friend', 'began', 'idea', 'fish', 'mountain', 'north', 'once', 'base', 'hear', 'horse', 'cut', 'sure', 'watch', 'color', 'face', 'wood', 'main'];
}
modules["performance/object/clone"] = function(require) {
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
}
modules["performance/function/execute"] = function(require) {
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
  
  test('hash > function -3', {
    before: function() {
      return this.fn = function() {
        var h1;
        h1 = {
          type: 'dummy',
          value: function() {
            return 1;
          },
          nodes: function() {
            return [];
          }
        };
        return h1;
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
}
modules["performance/storage"] = function(require) {
  var env, path, rules, storage;
  
  storage = require('/source/storage/storage');
  
  path = require('/source/generators/path');
  
  rules = require('/source/generators/rules');
  
  env = require('/source/performance/environments');
  
  env.register('storage.paths', {
    before: function() {
      var str;
      this.i = 0;
      this.path_str_5 = path.array(10000, 5);
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
      this.path_str_4 = path.array(10000, 4);
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
      this.path_str_3 = path.array(10000, 3);
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
      this.path_str_2 = path.array(10000, 2);
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
      this.rules_1 = rules.array(1);
      return this.rules_5 = rules.array(5);
    }
  });
  
  env.register('storage.data', {
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
  
  group('/dao');
  
  group('/storage');
  
  require('storage/storage_get');
  
  require('storage/storage_np');
  
  require('storage/dao_compile');
  
  require('storage/dao_create');
  
  require('storage/dao_get');
}
modules["performance/view/create"] = function(require) {
  var Action, roots;
  
  roots = require('/source/view/roots');
  
  Action = require('/source/view/action');
  
  group('/view.create', {
    before: function() {
      this.f0 = function() {};
      this.f1 = function() {
        return 1;
      };
      this.f2 = function() {
        return 2;
      };
      this.f3 = function() {
        return 3;
      };
      this.f4 = function() {
        return 4;
      };
      this.f5 = function() {
        return 5;
      };
      return this.n0 = function() {
        return [];
      };
    }
  });
  
  group('outside');
  
  test(' 4 actions: 1x3', {
    before: function() {
      var $;
      this.fn = require('create:1x3');
      $ = this;
      return this.n = function() {
        return [new Action('dummy-1', 1, $.f1, $.n0, this), new Action('dummy-1', 2, $.f2, $.n0, this), new Action('dummy-1', 3, $.f3, $.n0, this)];
      };
    },
    run: function() {
      return roots.execute_raw('dummy', this.n);
    }
  });
  
  test(' 4 actions: 1x1x1x1', {
    before: function() {
      var $;
      $ = this;
      this.n2 = function() {
        return [new Action('dummy-3', 1, $.f1, $.n0, this)];
      };
      this.n1 = function() {
        return [new Action('dummy-2', 1, $.f1, $.n2, this)];
      };
      return this.n = function() {
        return [new Action('dummy-1', 1, $.f1, $.n1, this)];
      };
    },
    run: function() {
      return roots.execute_raw('dummy', this.n);
    }
  });
  
  test(' 6 actions: 1x5', {
    before: function() {
      var $;
      $ = this;
      return this.n = function() {
        return [new Action('dummy-1', 1, $.f1, $.n0, this), new Action('dummy-1', 2, $.f2, $.n0, this), new Action('dummy-1', 3, $.f3, $.n0, this), new Action('dummy-1', 4, $.f4, $.n0, this), new Action('dummy-1', 5, $.f5, $.n0, this)];
      };
    },
    run: function() {
      return roots.execute_raw('dummy', this.n);
    }
  });
  
  test(' 7 actions: 1x3x1', {
    before: function() {
      var $;
      $ = this;
      this.n1 = function() {
        return [new Action('dummy-2', 1, $.f1, $.n0, this)];
      };
      return this.n = function() {
        return [new Action('dummy-1', 1, $.f1, $.n1, this), new Action('dummy-1', 2, $.f2, $.n1, this), new Action('dummy-1', 3, $.f3, $.n1, this)];
      };
    },
    run: function() {
      return roots.execute_raw('dummy', this.n);
    }
  });
  
  test(' 7 actions: 1x2x1x1', {
    before: function() {
      var $;
      $ = this;
      this.n2 = function() {
        return [new Action('dummy-3', 1, $.f1, $.n0, this)];
      };
      this.n1 = function() {
        return [new Action('dummy-2', 1, $.f1, $.n2, this)];
      };
      return this.n = function() {
        return [new Action('dummy-1', 1, $.f1, $.n1, this), new Action('dummy-1', 2, $.f2, $.n1, this)];
      };
    },
    run: function() {
      return roots.execute_raw('dummy', this.n);
    }
  });
  
  test('10 actions: 1x3x2', {
    before: function() {
      var $;
      $ = this;
      this.n1 = function() {
        return [new Action('dummy-2', 1, $.f1, $.n0, this), new Action('dummy-2', 1, $.f2, $.n0, this)];
      };
      return this.n = function() {
        return [new Action('dummy-1', 1, $.f1, $.n1, this), new Action('dummy-1', 2, $.f2, $.n1, this), new Action('dummy-1', 3, $.f3, $.n1, this)];
      };
    },
    run: function() {
      return roots.execute_raw('dummy', this.n);
    }
  });
  
  group('inside');
  
  test(' 4 actions: 1x1x1x1', {
    before: function() {
      var $;
      $ = this;
      return this.n = function() {
        var n;
        n = function() {
          n = function() {
            return [new Action('dummy-3', 1, $.f1, $.n0, this)];
          };
          return [new Action('dummy-2', 1, $.f1, n, this)];
        };
        return [new Action('dummy-1', 1, $.f1, n, this)];
      };
    },
    run: function() {
      return roots.execute_raw('dummy', this.n);
    }
  });
  
  test(' 7 actions: 1x2x1x1', {
    before: function() {
      var $;
      $ = this;
      return this.n = function() {
        var n;
        n = function() {
          n = function() {
            return [new Action('dummy-3', 1, $.f1, $.n0, this)];
          };
          return [new Action('dummy-2', 1, $.f1, n, this)];
        };
        return [new Action('dummy-1', 1, $.f1, n, this), new Action('dummy-1', 2, $.f2, n, this)];
      };
    },
    run: function() {
      return roots.execute_raw('dummy', this.n);
    }
  });
  
  test('10 actions: 1x3x2', {
    before: function() {
      var $;
      $ = this;
      return this.n = function() {
        var n;
        n = function() {
          return [new Action('dummy-2', 1, $.f1, $.n0, this), new Action('dummy-2', 1, $.f2, $.n0, this)];
        };
        return [new Action('dummy-1', 1, $.f1, n, this), new Action('dummy-1', 2, $.f2, n, this), new Action('dummy-1', 3, $.f3, n, this)];
      };
    },
    run: function() {
      return roots.execute_raw('dummy', this.n);
    }
  });
}
modules["source/dom/abstract"] = function(require) {
  
}
modules["source/async/function"] = function(require) {
  var Async, Function;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  Async = require('async');
  
  return Function = (function() {
  
    __extends(Function, Async);
  
    function Function(_fn, _periodic, _interval, _scheduler) {
      this._fn = _fn;
      this._periodic = _periodic;
      Function.__super__.constructor.call(this, _interval, _scheduler);
    }
  
    Function.prototype.execute = function() {
      if (this._running) {
        this._fn();
        this._reschedule();
        if (!this._periodic) return this._running = false;
      }
    };
  
    return Function;
  
  })();
}
modules["performance/view/create:1x3"] = function(require) {
  var roots  = require('/source/view/roots');
  var action = require('/source/view/action');
  
  
  
  var n0 = function() { return []; };
  var n = function() {
    arr = []
    arr.push(new action("dummy-1", 'fG', (function() {
      return 1;
    }), (function() {
      var arr;
      arr = [];
      return arr;
    }), this));
    
    arr.push(new action("dummy-1", 'fH', (function() {
      return 2;
    }), (function() {
      var arr;
      arr = [];
      return arr;
    }), this));
    
    arr.push(new action("dummy-1", 'fI', (function() {
      return 3;
    }), (function() {
      var arr;
      arr = [];
      return arr;
    }), this));
    return arr;
  }
  return function() { return roots.execute_raw('dummy', n); };
}
modules["performance/view/create:1x5"] = function(require) {
  var roots  = require('/source/view/roots');
  var action = require('/source/view/action');
  
  
  
  var n0 = function() { return []; };
  var n = function() {
    arr = []
    arr.push(new action("dummy-1", 'jj', (function() {
      return 1;
    }), (function() {
      var arr;
      arr = [];
      return arr;
    }), this));
    
    arr.push(new action("dummy-1", 'jk', (function() {
      return 2;
    }), (function() {
      var arr;
      arr = [];
      return arr;
    }), this));
    
    arr.push(new action("dummy-1", 'jl', (function() {
      return 3;
    }), (function() {
      var arr;
      arr = [];
      return arr;
    }), this));
    
    arr.push(new action("dummy-1", 'jm', (function() {
      return 4;
    }), (function() {
      var arr;
      arr = [];
      return arr;
    }), this));
    
    arr.push(new action("dummy-1", 'jn', (function() {
      return 5;
    }), (function() {
      var arr;
      arr = [];
      return arr;
    }), this));
    return arr;
  }
  return function() { return roots.execute_raw('dummy', n); };
}
modules["performance/view/create:1x3x1"] = function(require) {
  var roots  = require('/source/view/roots');
  var action = require('/source/view/action');
  
  
  
  var n0 = function() { return []; };
  var n = function() {
    arr = []
    arr.push(new action("dummy-1", 'fG', (function() {
      return 1;
    }), (function() {
      var arr;
      arr = [];
      arr.push(new action("dummy-2", 'b3', (function() {
        return 1;
      }), (function() {
        arr = [];
        return arr;
      }), this));
      return arr;
    }), this));
    
    arr.push(new action("dummy-1", 'fH', (function() {
      return 2;
    }), (function() {
      var arr;
      arr = [];
      arr.push(new action("dummy-2", 'b3', (function() {
        return 1;
      }), (function() {
        arr = [];
        return arr;
      }), this));
      return arr;
    }), this));
    
    arr.push(new action("dummy-1", 'fI', (function() {
      return 3;
    }), (function() {
      var arr;
      arr = [];
      arr.push(new action("dummy-2", 'b3', (function() {
        return 1;
      }), (function() {
        arr = [];
        return arr;
      }), this));
      return arr;
    }), this));
    return arr;
  }
  return function() { return roots.execute_raw('dummy', n); };
}
modules["performance/view/create:1x3x2"] = function(require) {
  var roots  = require('/source/view/roots');
  var action = require('/source/view/action');
  
  
  
  var n0 = function() { return []; };
  var n = function() {
    arr = []
    arr.push(new action("dummy-1", 'fG', (function() {
      return 1;
    }), (function() {
      var arr;
      arr = [];
      arr.push(new action("dummy-2", 'dR', (function() {
        return 1;
      }), (function() {
        arr = [];
        return arr;
      }), this));
      arr.push(new action("dummy-2", 'dS', (function() {
        return 1;
      }), (function() {
        arr = [];
        return arr;
      }), this));
      return arr;
    }), this));
    
    arr.push(new action("dummy-1", 'fH', (function() {
      return 2;
    }), (function() {
      var arr;
      arr = [];
      arr.push(new action("dummy-2", 'dR', (function() {
        return 1;
      }), (function() {
        arr = [];
        return arr;
      }), this));
      arr.push(new action("dummy-2", 'dS', (function() {
        return 1;
      }), (function() {
        arr = [];
        return arr;
      }), this));
      return arr;
    }), this));
    
    arr.push(new action("dummy-1", 'fI', (function() {
      return 3;
    }), (function() {
      var arr;
      arr = [];
      arr.push(new action("dummy-2", 'dR', (function() {
        return 1;
      }), (function() {
        arr = [];
        return arr;
      }), this));
      arr.push(new action("dummy-2", 'dS', (function() {
        return 1;
      }), (function() {
        arr = [];
        return arr;
      }), this));
      return arr;
    }), this));
    return arr;
  }
  return function() { return roots.execute_raw('dummy', n); };
}
modules["performance/view/create:1x1x1x1"] = function(require) {
  var roots  = require('/source/view/roots');
  var action = require('/source/view/action');
  
  
  
  var n0 = function() { return []; };
  var n = function() {
    arr = []
    arr.push(new action("dummy-1", 'b3', (function() {
      return 1;
    }), (function() {
      var arr;
      arr = [];
      arr.push(new action("dummy-2", 'b3', (function() {
        return 2;
      }), (function() {
        arr = [];
        arr.push(new action("dummy-3", 'b3', (function() {
          return 3;
        }), (function() {
          arr = [];
          return arr;
        }), this));
        return arr;
      }), this));
      return arr;
    }), this));
    return arr;
  }
  return function() { return roots.execute_raw('dummy', n); };
}
modules["performance/view/create:1x2x1x1"] = function(require) {
  var roots  = require('/source/view/roots');
  var action = require('/source/view/action');
  
  
  
  var n0 = function() { return []; };
  var n = function() {
    arr = []
    arr.push(new action("dummy-1", 'dR', (function() {
      return 1;
    }), (function() {
      var arr;
      arr = [];
      arr.push(new action("dummy-2", 'b3', (function() {
        return 1;
      }), (function() {
        arr = [];
        arr.push(new action("dummy-3", 'b3', (function() {
          return 1;
        }), (function() {
          arr = [];
          return arr;
        }), this));
        return arr;
      }), this));
      return arr;
    }), this));
    
    arr.push(new action("dummy-1", 'dS', (function() {
      return 2;
    }), (function() {
      var arr;
      arr = [];
      arr.push(new action("dummy-2", 'b3', (function() {
        return 1;
      }), (function() {
        arr = [];
        arr.push(new action("dummy-3", 'b3', (function() {
          return 1;
        }), (function() {
          arr = [];
          return arr;
        }), this));
        return arr;
      }), this));
      return arr;
    }), this));
    return arr;
  }
  return function() { return roots.execute_raw('dummy', n); };
}
require('/performance/app');