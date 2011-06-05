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
  # Returns initialized, but not created, action.
  # @param {...} ref
  # @param AbstractAction parent
  #
  get: (ref, parent) ->
    name = ref.type

    assert @_reg[name], "Action #{name} not found"
    return new @_reg[name] ref, parent

  #
  # Returns initialized and created action.
  # @param {...} ref
  # @param AbstractAction parent
  #
  get_created: (ref, parent) ->
    action = @get ref, parent

    action.create()
    action.create_nodes()

    action.attach()
    action.finalize()

    return action

#
# Registers service as dj.actions
#
rtm.register_service 'dj.actions', new Service()
