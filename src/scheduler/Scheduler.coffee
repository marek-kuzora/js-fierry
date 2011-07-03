class pkg.Scheduler

  constructor: ->
    @_cache = {}
    @_registry = []
    @_interval = 10

  #
  # Executes given function asynchronously.
  # Will stop after first execution if the function is defined as 'once'.  
  # @param fn - Function
  # @param delay - time to invoke [ms].
  # @param periodic - Boolean
  #
  async: (fn, delay, periodic) ->
    async = new pkg.AsyncFunction(fn, periodic, @, delay)
    return async._reschedule()

  #
  # Executes function asynchronously for each item of the array.
  # Will stop when array is empty.
  # @param arr - Array
  # @param fn - Function
  #
  async_array: (arr, fn) ->
    async = new pkg.AsyncArray(fn, arr.slice(), @, @_interval)
    return async._reschedule()

  #
  # Runs function scheduled for next immediate invocation.
  #
  _run_loop: =>
    for async in @_registry.shift() || []
      @_cache[uid async]= false
      async.execute()

  #
  # Schedules the async object for next invocation.
  # @param async - pkg.Async
  # @param delay - Number
  #
  _schedule: (async, delay) ->
    return false if @_cache[uid async]

    i = Math.max(0, Math.round(delay / @_interval) - 1)
    @_registry[i] ?= []
    @_registry[i].push(async)

    @_cache[uid async] = true
    return true

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
