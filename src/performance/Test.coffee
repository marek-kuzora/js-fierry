class pkg.Test

  constructor: (@_ref, @group) ->
    @_results = []

    @name = @_ref.name
    @_run = @_ref.run
    @_after = @_ref.after || (->)
    @_before = @_ref.before || (->)

    @_min_arg = @_ref.min_arg || group.get_min_arg()
    @_envs = @_get_envs(@_ref.envs || [], @group.get_envs())

  #
  # Clones test and attaches to the given group.
  # @param pkg.Group group
  #
  clone: (group) ->
    return new pkg.Test(@_ref, group)

  #
  # Returns environments instances from the given arrays of string names.
  #
  # @param String[] t_names
  # @param String[] g_names
  #
  _get_envs: (t_names, g_names) ->
    pkg.ENVS.get(name) for name in union(t_names, g_names)
  
  #
  # Accepts the given visitor for retrospection.
  # @param visitor
  #
  accept: (visitor) ->
    visitor.on_test(@)

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
    env.before().call(@) for env in @_envs

    @group.run_before(@)
    @_before()

    app.start()
    start = new Date()

    @_run() for i in [0..arg]

    end = new Date()
    app.stop()

    @_after
    @group.run_after(@)

    env.after().call(@) for env in @_envs
    return end - start

  #
  # Creates new active test result.
  #
  create_test_result: ->
    @_results.push(new pkg.TestResult())

  #
  # Returns the active test result.
  #
  get_result: ->
    return @_results[@_results.length - 1]
