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
    @_reg[name] = handler

  #
  # Returns handler for the action with the given name.
  # @param String name
  #
  get: (name) ->
    assert @_reg[name], "Action #{name} not found"
    return @_reg[name]

rtm.register_service('dj.actions', new Service())
