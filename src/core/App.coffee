class core.App

  constructor: ->
    @_behaviors =
      stop:   []
      start:  []
      pause:  []
      resume: []

    @_paused = false
    @_running = false

  #
  # Starts the application.
  # Starts all of the desired functionality.
  #
  start: ->
    if @_can 'start'
      @_trigger_behaviour('start')
      @_trigger_behaviour('resume')
      @_running = true

  #
  # Stops the application and clears its state.
  #
  stop: ->
    if @_can 'stop'
      @_running = false
      @_trigger_behaviour('pause')
      @_trigger_behaviour('stop')

  #
  # Resumes the application (from inactive state).
  # Restores all non-essential functionality.
  #
  resume: ->
    if @_can 'resume'
      @_trigger_behaviour('resume')
      @_paused = false
  
  #
  # Pauses the application (into inactive state).
  # Stops all non-essential functionality.
  #
  pause: ->
    if @_can 'pause'
      @_paused = true
      @_trigger_behaviour('pause')

  #
  # Returns true if the application is running and not paused.
  #
  is_running: ->
    return @_running and !@_paused

  #
  # Returns true if the application is stopped.
  #
  is_stopped: ->
    return !@_running

  #
  # Returns true if the application is paused (inactive).
  #
  is_paused: ->
    return @_paused

  #
  # Returns true if the application can change its state into the given one.
  #
  # @param String state
  #
  _can: (state) ->
    switch state
      when 'stop'   then  @_running
      when 'start'  then !@_running
      when 'pause'  then  @_running and !@_paused
      when 'resume' then  @_running and  @_paused

  #
  # Triggers behavior binded with the given application state.
  #
  # @param String state
  #
  _trigger_behaviour: (state) ->
    fn() for fn in @_behaviors[state]
    return

  #
  # Registers behaviour funciton for the given application state.
  #
  # @param String state
  # @param Function fn
  #
  add_behavior: (state, fn) =>
    @_behaviors[state].push(fn)
