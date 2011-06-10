class pkg.Notifier

  constructor: ->
    @_dirty = []
    @_visited = []

  set_dirty: (fn) ->
    unless @_visited[uid(fn)]
      @_visited[uid(fn)]
      @_dirty.push(fn)

  # I probably don't need here any shift...
  # I could have array index and iterate untill i reach the i == length-1.
  # After each fn invocation I would 
  notify: =>
    until array.empty(@_dirty)
      fn = @_dirty.shift()

      fn()
      @_visited[uid(fn)] = false

  # TODO better formatting...
  notify_new: =>
    i = 0
    while i < @_dirty.length
      fn = @_dirty[i++]
      fn()
      @_visited[uid(fn)] = false
    @_dirty = []
