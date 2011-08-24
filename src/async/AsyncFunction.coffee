class pkg.AsyncFunction extends pkg.Async

  constructor: (@_fn, @_periodic, scheduler, time) ->
    super time, scheduler

  #
  # Executes the async function.
  # Will stop after first execution if the function is defined as 'once'.
  #
  execute: ->
    if @_running
      @_fn()
      @_reschedule()
      @_running = false unless @_periodic
