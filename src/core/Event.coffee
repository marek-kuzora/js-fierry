class core.Event
  
  #
  # Subscribes the function to listen for events of the given type.
  # @param type - event type.
  # @param fn - listener function.
  #
  subscribe: (type, fn) ->
    @__getListeners(type).push(fn)
    return

  #
  # Unsubscribes the function from listening for events of the given type.
  # @param type - event type.
  # @param fn - listener function.
  #
  unsubscribe: (type, fn) ->
    array.erase(@__getListeners(type), fn)
    return

  #
  # Dispatches event of the given type.
  # @param type - event type.
  # @param args - any number of additional event arguments.
  #
  dispatch: (type, args...) ->
    fn.apply(null, args) for fn in @__getListeners(type)
    return

  #
  # Returns listeners subscribed to event of specific type.
  # @param type - event type.
  #
  __getListeners: (type) ->
    @__eventRegistry ?= {}
    @__eventRegistry[type] ?= []
