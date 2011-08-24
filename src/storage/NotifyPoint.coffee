#
# Notification point that, when dirty, sets all its listeners 
# as dirty in order to notify them about the changes. Will only
# notify that a change has occurred, will not notify what has
# changed.
#
# Its creation is defined by storage rules and should be created
# foreach entry path, where the data is directly set.
#
class storage.NotifyPoint

  constructor: ->
    @_queue = []
    @_enabled = true

  #
  # Registers listener for NP if not already registered.
  #
  # @param Function fn
  #
  subscribe: (fn) ->
    @_queue.push(fn)

  #
  # Unregisters listener from the NP.
  #
  # @param Function fn
  #
  unsubscribe: (fn) ->
    array.erase(@_queue, fn)

  #
  # Sets NP as enabled or disabled.
  # Disabled NP will not set its listeners dirty on np.set_dirty().
  #
  # @param Boolean enabled
  #
  set_emitter_disabled: (enabled) ->
    @_enabled = not enabled

  #
  # Sets all registered listeners as dirty in the storage.Notifier.
  #
  dispatch: ->
    if @_enabled
      core.async_notify(o) for o in @_queue
    return

class storage.NotifyPoint

core.install 'async.emitter', storage.NotifyPoint
