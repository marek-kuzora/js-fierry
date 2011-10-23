uid   = require '../core/uid'
async = require 'scheduler'

#
# Class responsible for executing asynchronous notifications. 
# It collects listeners sent from asynchronous events emitters 
# & executes them in batch when Emitter#notify() is invoked.
#
# @singleton
# 
class GlobalEmitter

  constructor: ->
    @_dirty = []
    @_visited = []

    # Scheduling asynchronous, periodic notifications.
    async.exec(@notify, 10, true)

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


return new GlobalEmitter()
