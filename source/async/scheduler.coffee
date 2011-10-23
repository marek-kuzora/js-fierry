app = require '../core/app'
uid = require '../core/uid'

AsyncArray    = require 'array'
AsyncFunction = require 'function'

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
class Scheduler

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
  exec: (fn, delay, periodic) ->
    async = new AsyncFunction(fn, periodic, delay || @_interval, @)
    return async._reschedule()

  #
  # Executes function asynchronously for each item of the array.
  # Will stop when array is empty.
  #
  # @param arr - Array
  # @param fn - Function
  #
  array: (arr, fn, delay) ->
    async = new AsyncArray(arr.slice(), fn, delay || @_interval, @)
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
  start: =>
    @_timer = setInterval(@_run_loop, @_interval)

  #
  # Stops the scheduler.
  #
  stop: =>
    clearInterval(@_timer)


#
# Unguarded Scheduler instance. This instance is intended to run
# outside fierry application scope - used mainly for running
# asynchronous test cases.
#
RAW = new Scheduler()
RAW.start()


#
# Global Scheduler instance. The singleton is managed and
# intended for scheduling asynchronous execution inside fierry
# application.
#
INSTANCE = new Scheduler()

app.register 'resume', INSTANCE.start
app.register 'pause',  INSTANCE.stop


#
# Exposed API.
#
return API =
  
  exec_raw: (fn, delay, periodic) ->
    return RAW.exec(fn, delay, periodic)

  array_raw: (arr, fn) ->
    return RAW.array(arr, fn)

  exec: (fn, delay, periodic) ->
    return INSTANCE.exec(fn, delay, periodic)

  array: (arr, fn) ->
    return INSTANCE.array(arr, fn)
