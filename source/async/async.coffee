#
# Abstract class for all asynchronous behaviors. Provides
# functionality to start, stop or delay asynchronous execution.
# Does not specify the exact execute function - this is intended
# to be overriden by subclasses.
#
return class Async

  #
  # @param Integer _interval - interval between invocations [ms].
  # @param Scheduler _scheduler - object's scheduler.
  #
  constructor: (@_interval, @_scheduler) ->
    @_delay = 0
    @_running = true

  execute: ->

  #
  # Starts async object. Sets to running & schedules for next
  # execution.
  #
  start: ->
    @_running = true
    @_reschedule()

  #
  # Stops async object from scheduling for the next execution.
  # Async object may be executed once more before it is stopped
  # pernamently.
  #
  stop: ->
    @_running = false

  #
  # Delays the async object execution. Will delay execution one
  # time only on next object's scheduling for execution.
  #
  delay: (delay) ->
    @_delay = delay

  #
  # Schedules async object for next execution if it's still
  # running.
  #
  _reschedule: ->
    if @_running
      time = @_delay || @_interval
      flag = @_scheduler._schedule(@, time)
      @_delay = 0 if flag
    return @
