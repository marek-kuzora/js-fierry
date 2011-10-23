Async = require 'async'


#
# Class reponsible for executing the given function
# asynchronously. The function can be run once only
# (~setTimeout()) or periodically (~setInterval()). Enables
# clients to stop, start or delay next asynchronous execution.
#
return class Function extends Async

  #
  # @param Function _fn
  # @param Boolean _periodic
  # @param Integer _interval - interval between invocations [ms].
  # @param Scheduler _scheduler - object's scheduler.
  #
  constructor: (@_fn, @_periodic, _interval, _scheduler) ->
    super _interval, _scheduler

  #
  # Executes the async function. Will stop after first execution
  # if the function isn't defined as periodic.
  #
  execute: ->
    if @_running
      @_fn()
      @_reschedule()
      @_running = false unless @_periodic
