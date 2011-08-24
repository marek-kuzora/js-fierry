#
# Class responsible for scheduling asynchronous execution.
# Provides functionality to execute function or array of
# functions in an asynchronous and efficient way. This class 
# is initialized as two instances - RAW exists beyond standard
# application scope and provides scheduling mainly for testing
# frameworks; INSTANCE is binded with application's states 
# and intended to use by clients of Fierry Framework.
#
# @singleton
#
class pkg.Scheduler

  constructor: ->
    @_cache = {}
    @_registry = []
    @_interval = 10

  #
  # Executes given function asynchronously. Will stop after 
  # first execution if the function is defined as 'once'.  
  #
  # @param fn - Function
  # @param delay - time to invoke [ms].
  # @param periodic - Boolean
  #
  async_exec: (fn, delay, periodic) ->
    async = new pkg.Function(fn, periodic, @, delay)
    return async._reschedule()

  #
  # Executes function asynchronously for each item of the array.
  # Will stop when array is empty.
  #
  # @param arr - Array
  # @param fn - Function
  #
  async_array: (arr, fn) ->
    async = new pkg.Array(fn, arr.slice(), @, @_interval)
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
  #
  # @param async - pkg.Async
  # @param delay - Number
  #
  _schedule: (async, delay) ->
    return false if @_cache[uid async]

    i = Math.max(0, ((delay / @_interval) << 0) - 1)
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

#
# Global Scheduler instance and its public API. The singleton is
# managed and intended for scheduling asynchronous execution
# inside fierry application.
#
INSTANCE = new pkg.Scheduler()

core.async_exec = (fn, delay, periodic) ->
  return INSTANCE.async_exec(fn, delay, periodic)

core.async_array = (arr, fn) ->
  return INSTANCE.async_array(arr, fn)

#
# Binding managed Scheduler behavior to the application states.
#
behaviour 'resume', -> INSTANCE.start()
behaviour 'pause',  -> INSTANCE.stop()

#
# Unguarded Scheduler instance. This instance is intended to run
# outside fierry application scope - used mainly for running
# asynchronous test cases.
#
pkg.RAW = new pkg.Scheduler()
pkg.RAW.start()
