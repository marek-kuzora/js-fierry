class storage.Notifier

  constructor: ->
    @_dirty = []
    @_visited = []

  #
  # Sets the given function as dirty.
  # The function will be executed at the nearest notify.
  #
  # @param Function fn
  #
  set_dirty: (fn) ->
    unless @_visited[uid fn]
      @_visited[uid fn] = true
      @_dirty.push(fn)

  #
  # Executes all queued dirty functions.
  # Commonly used to notify listeners about storage changes.
  #
  notify: =>
    i = 0
    l = @_dirty.length

    while i < l
      @_execute(i++)
      l = @_dirty.length if i is l

  #
  # Executes the function with specified index.
  #
  # @param Integer i - function index.
  #
  _execute: (i) ->
    fn = @_dirty[i]
    fn()

    @_visited[uid fn] = false
