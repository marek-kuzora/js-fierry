app      = require '../core/app'
assert   = require '../core/assert'
async    = require '../async/scheduler'

registry = require 'registry'
settings = require 'settings'

Test     = require 'test'
Group    = require 'group'
Events   = require 'events'
Emitter  = require '../core/emitter'

class Runner extends Emitter

  #
  # Constructs test Runner.
  # @param registry - pkg.Registry.
  # @param arr - array of group/test names.
  #
  constructor: (registry, arr) ->
    @_registry = registry
    @_suites = @_remove_duplicates(arr)

  #
  # Removes the duplicated groups/tests from argument array.
  # @param arr - array of unprocessed groups/tests names.
  # @returns array of groups/tests names without duplicates.
  #
  _remove_duplicates: (arr) ->
    arr = Array.prototype.slice.call(arr).sort()
    i = 1

    while i < arr.length
      bool = arr[i].indexOf(arr[i - 1] + '.') is 0
      if bool then arr.splice(i, 1) else i++
    return arr

  #
  # Runs the tests corresponding to the given group/test names.
  # @param arr - unprocessed array of group/test names.
  #
  run: ->
    tests = @_extract_tests(@_suites)
    cases = @_build_test_cases(tests)

    @dispatch("tests.found", tests)

    assert cases.length > 0, "No test cases found for suites: #{@_suites}"
    async.array_raw(cases, @_run_once)
    return

  #
  # Executes the single test case & schedules next one if defined.
  # @param i -  internal test cases array item [test,arg]
  # @param last - true if the given item is last array's last item
  #
  _run_once: (test, last) =>
    app.stop()

    arg = test.measure()
    time = test.run(arg)
    test.get_result().register(arg, time)

    @dispatch("test.finished", test)
    @dispatch("tests.finished") if last

  #
  # Extracts Tests instances for testing.
  # @param arr - array of groups/tests names.
  # @return r - extracted pkg.Test instances.
  #
  _extract_tests: (arr) ->
    r = []
    for name in arr
      obj = @_registry.get(name)
      if obj instanceof Test  then r.push(obj)
      if obj instanceof Group then r = r.concat(obj.get_tests())
    return r

  #
  # Builds internal test-cases array for asynchronous execution.
  # @param tests - array of pkg.Test instances.
  #
  _build_test_cases: (tests) ->
    r = []
    for test in tests
      test.create_test_result()
      r.push(test) for i in [1..settings.EXECUTE_RETRY]
    return r

return run = () ->
  runner = new Runner(registry, arguments)
  events = new Events()

  runner.subscribe("tests.found", events.tests_found)
  runner.subscribe("test.finished", events.test_finished)
  runner.subscribe("tests.finished", events.tests_finished)

  runner.run()
