class storage.NotifyPoint

  constructor: ->
    @_queue = []

  #
  # Registers listener for NP if not already registered.
  #
  # @param Function fn
  #
  register: (fn) ->
    @_queue.push(fn) if array.contains(@_queue, fn)

  #
  # Unregisters listener from the NP.
  #
  # @param Function fn
  #
  unregister: (fn) ->
    array.erase(@_queue, fn)

  #
  # Sets all registered listeners as dirty in the storage.Notifier.
  #
  set_dirty: ->
    pkg.NOTIFIER_INSTANCE.set_dirty(o) for o in @_queue
