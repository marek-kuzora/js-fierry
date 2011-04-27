class pkg.Scheduler

  constructor: ->
    @_cache = {}
    @_registry = []
    @_interval = 10

  async: (fn, time, once) ->
    async = new pkg.AsyncFunction(fn, once, @, time)
    return async.reschedule()

  async_array: (fn, arr) ->
    async = new pkg.AsyncArray(fn, arr, @, @_interval)
    return async.reschedule()

  #
  # Runs function scheduled for next immediate invocation.
  #
  _run_loop: =>
    for async in @_registry.shift()
      @_cache[core.uid(async)]= false
      async.execute()

  #
  # Schedules the async object for next invocation.
  # @param async - pkg.Async
  # @param delay - Number
  #
  _schedule: (async, delay) ->
    return false if @_cache[core.uid(async)]

    i = Math.max(0, Math.round(time / @_interval) - 1)
    @_registry[i] ?= []
    @_registry[i].push(async)

    @_cache[core.uid(async)] = true
    return true

  #
  # Clears singleton state.
  #
  __clear: ->
    @stop()
    @_cache = {}
    @_registry = []

  #
  # Starts the scheduler.
  #
  start: ->
    @_timer = setInterval(@_run_loop, @_interval)

  #
  # Stops the scheduler.
  #
  stop: ->
    clearInterval(@_timer)
