#
# Event emitter mixin for synchronous events notification.
# Enables clients to synchronously dispatch events, with optional
# additional arguments, to subscribed listeners. The emitter can
# be temporary disabled - will not dispatch any events to
# subscribed listeners while in such state.
#
# Configuration: none available.
#
core.register_mixin 'emitter', (cls, conf) ->

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
  # @param String type - event's type.
  # @param Function fn - listener.
  #
  cls::subscribe = (type, fn) ->
    @__get_listeners(type).push(fn)

  #
  # Unsubscribes listener from the emitter. This method will
  # unsubscribe all instances of the same listener if found.
  # However it is unnecessary for clients to register same
  # listeners multiple times.
  #
  # @param String type - event's type.
  # @param Function fn - listener.
  #
  cls::unsubscribe = (type, fn) ->
    array.erase(@__get_listeners(type), fn)

  #
  # Retrieves listeners subscribed for notification for events 
  # of the given type.
  #
  # @param String type
  #
  cls::__get_listeners = (type) ->
    reg = @__listeners_registry ?= {}
    return reg[type] ?= []

  #
  # Notifies subscribed listeners. Optionally provides additional
  # arguments to each notified listener function. Will do nothing
  # if the emitter is disabled.
  #
  # @param String type
  # @param Any[] args
  #
  cls::dispatch = (type, args...) ->
    unless @__emitter_disabled
      fn.apply(null, args) for fn in @__get_listeners(type)
    return
