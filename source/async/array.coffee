Async = require 'async'


#
# Class responsible for executing the given function for each
# item in the array. In each invocation, the function will
# receive the currently processed item as its first argument, 
# and a flag indicating if there are any more items in the array
# as the second argument.
#
# Each invocation is run asynchronously with proper intervals
# between invocations.
#
return class Array extends Async

  #
  # @param Array _arr
  # @param Function _fn
  # @param Integer _interval - interval between invocations [ms].
  # @param Scheduler _scheduler - object's scheduler.
  #
  constructor: (@_arr, @_fn, _interval, _scheduler) ->
    super _interval, _scheduler

  #
  # Executes asynchronous function for each item of the array.
  # Will stop if array is empty.
  #
  execute: ->
    if @_running
      arg = @_arr.shift()
      empty = @_arr.length == 0

      @_fn(arg, empty)
      @_reschedule()
      @_running = false if empty
