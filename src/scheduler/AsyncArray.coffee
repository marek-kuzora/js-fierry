class pkg.AsyncArray extends pkg.Async

  constructor: (@_fn, @_arr, scheduler, time) ->
    super time, scheduler

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
