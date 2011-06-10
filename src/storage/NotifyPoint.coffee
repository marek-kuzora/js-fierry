class pkg.NotifyPoint

  constructor: ->
    @_queue = []

  register: (fn) ->
    @_queue.push(fn) if array.contains(@_queue, fn)

  unregister: (fn) ->
    array.erase(@_queue, fn)

  set_dirty: ->
    core.notifier.set_dirty(o) for o in @_queue
