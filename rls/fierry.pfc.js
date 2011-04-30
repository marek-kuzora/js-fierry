YUI.add( 'fierry.pfc.core', function( Env ) {

var test = Env.namespace('performance.registerTest');
var group = Env.namespace('performance.registerGroup');
(function() {
  group({
    name: 'array'
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
    name: 'array.join'
  });
  group({
    name: 'array.join.str'
  });
  test({
    name: 'small -default-token',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e'];
    },
    run: function() {
      return this.arr.join();
    }
  });
  test({
    name: 'small -custom-token',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e'];
    },
    run: function() {
      return this.arr.join('.-.');
    }
  });
  test({
    name: 'standard',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.join();
    }
  });
  test({
    name: 'big',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    },
    run: function() {
      return this.arr.join();
    }
  });
  test({
    name: 'big -no-token',
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
    name: 'one-only',
    before: function() {
      return this.arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 10];
    },
    run: function() {
      return this.arr.join();
    }
  });
  test({
    name: 'all-ints',
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
    name: 'array.concat'
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
}).call(this);


}, '3.0' ,{requires:['fierry.performance']});

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
  core.assert = function(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  };
  core.uid = function(obj) {
    var _ref;
    return (_ref = obj.__uid__) != null ? _ref : obj.__uid__ = ++core.uid.__counter__;
  };
  core.uid.__counter__ = 0;
}).call(this);

(function() {
  Env.array = {
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
    avg: function(arr) {
      var i, sum, _i, _len;
      sum = 0;
      for (_i = 0, _len = arr.length; _i < _len; _i++) {
        i = arr[_i];
        sum += i;
      }
      return sum / arr.length;
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


}, '3.0' ,{requires:[]});

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
      this._runOnce = __bind(this._runOnce, this);;      this._registry = registry;
      this._suites = this._removeDuplicates(arr);
    }
    Runner.prototype._removeDuplicates = function(arr) {
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
      tests = this._extractTests(this._suites);
      cases = this._buildTestCases(tests);
      this.dispatch("tests.found", tests);
      core.assert(cases.length > 0, "No test cases found for suites: " + this._suites);
      return core.async_array(cases, this._runOnce);
    };
    Runner.prototype._runOnce = function(test, last) {
      var arg, time;
      arg = test.measure();
      time = test.run(arg);
      test.getResult().register(arg, time);
      this.dispatch("test.finished", test);
      if (last) {
        return this.dispatch("tests.finished");
      }
    };
    Runner.prototype._extractTests = function(arr) {
      var name, obj, r, _i, _len;
      r = [];
      for (_i = 0, _len = arr.length; _i < _len; _i++) {
        name = arr[_i];
        obj = this._registry.get(name);
        if (obj instanceof pkg.Test) {
          r.push(obj);
        }
        if (obj instanceof pkg.Group) {
          r = r.concat(obj.getTests());
        }
      }
      return r;
    };
    Runner.prototype._buildTestCases = function(tests) {
      var i, r, test, _i, _len, _ref;
      r = [];
      for (_i = 0, _len = tests.length; _i < _len; _i++) {
        test = tests[_i];
        test.createTestResult();
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
      ops = test.getResult().getAverage().toFixed(2);
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
    }
    Test.prototype.accept = function(visitor) {
      return visitor.onTest(this);
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
        time = this.run(arg);
        arg *= 2;
      }
      arr = (function() {
        var _ref, _results;
        _results = [];
        for (i = 1, _ref = pkg.MEASURE_RETRY; (1 <= _ref ? i <= _ref : i >= _ref); (1 <= _ref ? i += 1 : i -= 1)) {
          _results.push(this.run(arg));
        }
        return _results;
      }).call(this);
      return this._arg = pkg.EXECUTE_LIMIT / array.avg(arr) * arg;
    };
    Test.prototype.run = function(arg) {
      var end, i, start;
      this.group.runBefore(this);
      this._before();
      start = new Date();
      for (i = 0; (0 <= arg ? i <= arg : i >= arg); (0 <= arg ? i += 1 : i -= 1)) {
        this._run();
      }
      end = new Date();
      this._after;
      this.group.runAfter(this);
      return end - start;
    };
    Test.prototype.createTestResult = function() {
      return this._results.push(new pkg.TestResult());
    };
    Test.prototype.getResult = function() {
      return this._results[this._results.length - 1];
    };
    return Test;
  })();
}).call(this);

(function() {
  pkg.ConsoleVisitor = (function() {
    function ConsoleVisitor() {}
    ConsoleVisitor.prototype.onGroupStart = function(group) {
      return console.group(group.name);
    };
    ConsoleVisitor.prototype.onGroupEnd = function(group) {
      return console.groupEnd();
    };
    ConsoleVisitor.prototype.onTest = function(test) {
      var name, res;
      name = test.name.substr(test.name.lastIndexOf('.') + 1);
      res = test.getResult();
      return console.log(name, "---", Math.round(res.getAverage()), "ops");
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
    TestResult.prototype.getAverage = function() {
      var ops, sum, _i, _len, _ref;
      sum = 0;
      _ref = this._registry;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ops = _ref[_i];
        sum += ops;
      }
      return sum / this._registry.length;
    };
    TestResult.prototype.getAll = function() {
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
    Registry.prototype.registerGroup = function(hash) {
      var group, parent;
      parent = this.get(this._getParent(hash.name));
      group = new pkg.Group(hash, parent);
      parent.add(group);
      return this._last_group = group;
    };
    Registry.prototype._getParent = function(name) {
      var idx;
      idx = name.lastIndexOf('.');
      if (idx > -1) {
        return name.substr(0, idx);
      } else {
        return '';
      }
    };
    Registry.prototype.registerTest = function(hash) {
      var parent, test;
      parent = hash.group ? this.get(hash.group) : this._last_group;
      test = new pkg.Test(hash, parent);
      return parent.add(test);
    };
    Registry.prototype.get = function(name) {
      var child, group, _ref;
      group = this._root;
      while (name.length > 0) {
        _ref = this._getFirstChild(name), child = _ref[0], name = _ref[1];
        group = group.get(child);
      }
      return group;
    };
    Registry.prototype._getFirstChild = function(name) {
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
    }
    Group.prototype.accept = function(visitor) {
      var node, _i, _len, _ref;
      visitor.onGroupStart(this);
      _ref = this._nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        node.accept(visitor);
      }
      return visitor.onGroupEnd(this);
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
    Group.prototype.getTests = function() {
      var arr, n, _i, _len, _ref;
      arr = [];
      _ref = this._nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        if (n instanceof pkg.Test) {
          arr.push(n);
        }
        if (n instanceof pkg.Group) {
          arr = arr.concat(n.getTests());
        }
      }
      return arr;
    };
    Group.prototype.runBefore = function(ctx) {
      if (this.parent) {
        this.parent.runBefore(ctx);
      }
      return this._before.call(ctx);
    };
    Group.prototype.runAfter = function(ctx) {
      this._after.call(ctx);
      if (this.parent) {
        return this.parent.runAfter(ctx);
      }
    };
    return Group;
  })();
}).call(this);

(function() {
  pkg.INSTANCE = new pkg.Registry();
  api.registerGroup = function(group) {
    return pkg.INSTANCE.registerGroup(group);
  };
  api.registerTest = function(test) {
    return pkg.INSTANCE.registerTest(test);
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

