class pkg.Async

  constructor: (@_interval, @_scheduler) ->
    @_delay = 0
    @_running = true

  execute: ->

  #
  # Starts async object.
  # Sets to running & schedules for next execution.
  #
  start: ->
    @_running = true
    @_reschedule()

  #
  # Stops async object from scheduling for the next execution.
  # Async object may be executed once more before it is stopped pernamently.
  #
  stop: ->
    @_running = false

  #
  # Delays the async object execution.
  # Will delay once on next object's scheduling for execution.
  #
  delay: (delay) ->
    @_delay = delay

  #
  # Schedules async object for next execution if it's still running.
  #
  _reschedule: ->
    if @_running
      time = @_delay || @_interval
      flag = @_scheduler._schedule(@, time)
      @_delay = 0 if flag
    return @
