#
# Class responsible for managing application's state. Enables
# clients to hook into starting, stopping, resuming & pausing
# the application and executing custom logic.
#
# @singleton
#
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
      @_trigger_behavior('start')
      @_trigger_behavior('resume')
      @_running = true

  #
  # Stops the application and clears its state.
  #
  stop: ->
    if @_can 'stop'
      @_running = false
      @_trigger_behavior('pause') unless @_paused
      @_trigger_behavior('stop')

  #
  # Resumes the application (from inactive state).
  # Restores all non-essential functionality.
  #
  resume: ->
    if @_can 'resume'
      @_trigger_behavior('resume')
      @_paused = false

  #
  # Pauses the application (into inactive state).
  # Stops all non-essential functionality.
  #
  pause: ->
    if @_can 'pause'
      @_paused = true
      @_trigger_behavior('pause')

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
  # Returns true if the application can change its state 
  # into the given one.
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
  _trigger_behavior: (state) ->
    fn() for fn in @_behaviors[state]
    return

  #
  # Registers behavior funciton for the given application state.
  #
  # @param String state
  # @param Function fn
  #
  add_behavior: (state, fn) =>
    @_behaviors[state].push(fn)

#
# Singleton instance visible as app namespace.
#
Env.app = new core.App()
