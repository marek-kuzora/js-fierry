#
# Event emitter mixin for asynchronous events notification.
#
# FIXME Enables clients to asynchronously dispatch events, with optional
# additional arguments, to subscribed listeners. The emitter can
# be temporary disabled - will not dispatch any events to
# subscribed listeners while in such state.
#
# Configuration: none available.
#
core.register_mixin 'async.emitter', (cls, conf) ->
  
  #
  # Sets emitter as disabled or enabled. Disabled emitters will
  # not dispatch changes to their listeners.
  #
  # @param Boolean enabled
  #
  cls::set_emitter_disabled = (disable) ->
    @__emitter_disabled = true

  #
  # Subscribes listener to the emitter. For performance reasons,
  # the emitter does not prevent from subscribing same listener
  # multiple times. Client is reponsible for assuring that each
  # listener will be subscribed only once.
  #
  # @param Function fn - listener.
  #
  cls::subscribe = (fn) ->
    @__get_listeners().push(fn)

  #
  # Unsubscribes listener from the emitter. This method will
  # unsubscribe all instances of the same listener if found.
  # However it is unnecessary for clients to register same
  # listeners multiple times.
  #
  # @param Function fn - listener.
  #
  cls::unsubscribe = (fn) ->
    array.erase(@__get_listeners(), fn)

  #
  # Retrieves listeners subscribed for notification.
  #
  cls::__get_listeners = ->
    return @__listeners_registry ?= []

  # TODO comment...
  cls::dispatch = ->
    unless @__emitter_disabled
      core.async_notify(fn) for fn in @__get_listeners()
    return
