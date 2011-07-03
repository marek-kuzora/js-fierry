class core.App2

  constructor: ->
    @_stop_arr = []
    @_start_arr = []
    @_clear_arr = []
    @_running = false

  #
  # Starts the application.
  # Starts all of the desired functionality.
  #
  start: ->
    @_running = true

    fn() for fn in @_start_arr
    return

  #
  # Stops the applications.
  # Stops all of the ongoing functionality.
  #
  stop: ->
    @_running = false

    fn() for fn in @_stop_arr
    return

  clear_state: ->
    fn() for fn in @_clear_arr

  #
  # Returns true if the application is running.
  #
  is_running: ->
    return @_running

  #
  # Returns true if the application is stopped.
  #
  is_stopped: ->
    return !@_running

  #
  # Registers handler function for starting the application.
  #
  add_start_handler: (fn) ->
    @_start_arr.push(fn)

  #
  # Registers handler funciton for stopping the application.
  #
  add_stop_handler: (fn) ->
    @_stop_arr.push(fn)

  add_clear_handler: (fn) ->
    @_clear_arr.push(fn)
