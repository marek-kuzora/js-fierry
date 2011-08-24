#
# Event emitter for asynchronous events notifications. Whenever 
# a change occurrs and dispatch() method is invoked, all of the
# subscribed listeners are registered into core.async.
# GlobalEmitter for scheduled notification in batch. For
# performance reasons, this emitter will not provide data what
# has changed, or why the listener is invoked - it will only
# notify that a change has occurred - listener itself needs to
# investigate what has changed whenever necessary.
#
# Each listener is guaranteed to be invoked once only, even if
# multiple changes has occurred and the listener was 'dispatched'
# from many asynchronous emitters during that time.
#
class pkg.Emitter

  #
  # Subscribes listener to the emitter. For performance reasons,
  # the emitter does not prevent from subscribing same listener
  # multiple times. Client is reponsible for assuring that each
  # listener will be subscribed only once.
  #
  # @param Function fn - listener.
  #
  subscribe: (fn) ->
    @__get_listeners().push(fn)

  #
  # Unsubscribes listener from the emitter. This method will
  # unsubscribe all instances of the same listener if found.
  # However it is unnecessary for clients to register same
  # listeners multiple times.
  #
  # @param Function fn - listener.
  #
  unsubscribe: (fn) ->
    array.erase(@__get_listeners(), fn)

  #
  # Asynchronously notifies subscribed listeners. Registers all
  # listeners into global emitter instance, where they will be
  # notified once the core.async.GlobalEmiter.notify() is invoked.
  # Will do nothing if the emitter is disabled.
  #
  dispatch: ->
    unless @__emitter_disabled
      core.async_notify(fn) for fn in @__get_listeners()
    return

  #
  # Retrieves listeners subscribed for notification.
  #
  __get_listeners: ->
    return @__listeners_registry ?= []

  #
  # Sets emitter as disabled or enabled. Disabled emitters will
  # not dispatch changes to their listeners.
  #
  # @param Boolean enabled
  #
  set_emitter_disabled: (disable) ->
    @__emitter_disabled = disable
