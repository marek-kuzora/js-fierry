class Service

  constructor: ->
    @_reg = {}

  #
  # Registers handler for the action with the given name.
  # @param String name
  # @param {} handler
  #
  register: (name, handler) ->
    assert !@_reg[name], "Action #{name} already exists"

    handler.prototype._actions = @
    @_reg[name] = handler

  #
  # Returns handler for the action with the given name.
  # @param String name
  #
  get: (ref, parent) ->
    name = ref.type

    assert @_reg[name], "Action #{name} not found"
    return new @_reg[name] ref, parent

rtm.register_service 'dj.actions', new Service()
