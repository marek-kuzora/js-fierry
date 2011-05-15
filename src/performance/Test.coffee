class pkg.Test

  constructor: (test, @group) ->
    @_results = []

    @name = test.name
    @_run = test.run
    @_after = test.after || (->)
    @_before = test.before || (->)
    @_min_arg = test.min_arg || group.get_min_arg()

  #
  # Accepts the given visitor for retrospection.
  # @param visitor
  #
  accept: (visitor) ->
    visitor.onTest(@)

  #
  # Returns expected number of invocations of @_run in the given time.
  # @param - limit time [ms].
  #
  measure: ->
    return @_arg if @_arg

    arg = 1
    time = 0

    while time == 0
      time = @run(arg)
      arg *= 10

    while time < pkg.MEASURE_LIMIT
      arg *= 2
      time = @run(arg)

    arr = (@run(arg) for i in [1..pkg.MEASURE_RETRY])
    
    @_arg = pkg.EXECUTE_LIMIT / array.avg(arr) * arg
    @_arg = @_min_arg if @_arg < @_min_arg
    return @_arg

  #
  # Runs the test given times and retunrs the elapsed time.
  # Registers elapsed time into active test result if log is true.
  # @param arg - Integer argument.
  # @param log - Boolean log the result.
  #
  run: (arg) ->
    @group.runBefore(@)
    @_before()

    start = new Date()
    @_run() for i in [0..arg]
    end = new Date()

    @_after
    @group.runAfter(@)

    return end - start

  #
  # Creates new active test result.
  #
  createTestResult: ->
    @_results.push(new pkg.TestResult())


  #
  # Returns the active test result.
  #
  getResult: ->
    return @_results[@_results.length - 1]
