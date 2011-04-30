class pkg.Runner

  #
  # Constructs test Runner.
  # @param registry - pkg.Registry.
  # @param arr - array of group/test names.
  #
  constructor: (registry, arr) ->
    @_registry = registry
    @_suites = @_removeDuplicates(arr)

  #
  # Removes the duplicated groups/tests from argument array.
  # @param arr - array of unprocessed groups/tests names.
  # @returns array of groups/tests names without duplicates.
  #
  _removeDuplicates: (arr) ->
    arr = Array.prototype.slice.call(arr).sort()
    i = 1

    while i < arr.length
      bool = arr[i].indexOf(arr[i - 1]) == 0
      if bool then arr.splice(i, 1) else i++
    return arr

  #
  # Runs the tests corresponding to the given group/test names.
  # @param arr - unprocessed array of group/test names.
  #
  run: ->
    tests = @_extractTests(@_suites)
    cases = @_buildTestCases(tests)
    
    @dispatch("tests.found", tests)

    core.assert cases.length > 0, "No test cases found for suites: #{@_suites}"
    core.async_array(cases, @_runOnce)

  #
  # Executes the single test case & schedules next one if defined.
  # @param i -  internal test cases array item [test,arg]
  # @param last - true if the given item is last array's last item
  #
  _runOnce: (test, last) =>
    arg = test.measure()
    time = test.run(arg)

    test.getResult().register(arg, time)

    @dispatch("test.finished", test)
    @dispatch("tests.finished") if last
   
  #
  # Extracts Tests instances for testing.
  # @param arr - array of groups/tests names.
  # @return r - extracted pkg.Test instances.
  #
  _extractTests: (arr) ->
    r = []
    for name in arr
      obj = @_registry.get(name)
      if obj instanceof pkg.Test  then r.push(obj)
      if obj instanceof pkg.Group then r = r.concat(obj.getTests())
    return r

  #
  # Builds internal test-cases array for asynchronous execution.
  # @param tests - array of pkg.Test instances.
  #
  _buildTestCases: (tests) ->
    r = []
    for test in tests
      test.createTestResult()
      r.push(test) for i in [1..pkg.EXECUTE_RETRY]
    return r

#
# Includes core.Event functionality in the pkg.Runner.
#
core.include(pkg.Runner, core.Event)
