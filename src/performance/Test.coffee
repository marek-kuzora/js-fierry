class pkg.Test

  constructor: (test, @_group) ->
    @_results = []
    
    @name = _group.name + '.' + test.name
    @_run = test.run
    @_after = test.after || (->)
    @_before = test.before || (->)

    @_arg = @measure()

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
    arg = 1
    time = 0

    while time == 0
      time = @run(arg)
      arg *= 10

    while time < pkg.MEASURE_LIMIT
      time = @run(arg)
      arg *= 2

    arr = (@run(arg) for i in [1..pkg.MEASURE_RETRY])
    return pkg.EXECUTE_LIMIT / array.avg(arr) * arg

  #
  # Runs the test given times and retunrs the elapsed time.
  # Registers elapsed time into active test result if log is true.
  # @param arg - Integer argument.
  # @param log - Boolean log the result.
  #
  run: (m_arg) ->
    arg = if m_arg then m_arg else @_arg

    @_group.runBefore(@)
    @_before()

    start = new Date()
    @_run() for i in [0..arg]
    end = new Date()

    @_after
    @_group.runAfter(@)
    
    @getResult().register(arg, end - start) unless m_arg
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
