#
# Class responsible for executing asynchronous notifications. 
# It collects listeners sent from asynchronous events emitters 
# & executes them in a batch when Emitter#notify() is invoked.
#
# @singleton
# 
class pkg.Emitter

  constructor: ->
    @_dirty = []
    @_visited = []

  #
  # Registers the given listener as dirty. Each unique listener
  # can be registered only once. The listener function will be
  # executed at the nearest invocation of notify().
  #
  # @param Function fn
  #
  register_listener: (fn) ->
    unless @_visited[uid fn]
      @_visited[uid fn] = true
      @_dirty.push(fn)

  #
  # Executes all queued dirty functions. Commonly used to notify
  # listeners about storage changes. This method is invoked
  # asynchronously once each 10 miliseconds.
  #
  notify: =>
    i = 0
    l = @_dirty.length

    while i < l
      @_execute(i++)
      l = @_dirty.length if i is l

    @_dirty = []

  #
  # Executes the function with specified index. Removes function
  # identificator from @_visited array in order to allow later
  # registering its listener for notification (even during same
  # notify loop). 
  #
  # @param Integer i - function index.
  #
  _execute: (i) ->
    fn = @_dirty[i]
    
    fn()
    @_visited[uid fn] = false


#
# Global Emitter instance and its public API.
#
EMITTER = new pkg.Emitter()

core.async_notify = (fn) ->
  EMITTER.register_listener(fn)


#
# Scheduling asynchronous, periodic notifications.
#
core.async(EMITTER.notify, 10, true)

