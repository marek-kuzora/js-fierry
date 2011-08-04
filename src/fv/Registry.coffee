#
# Responsible for registering the provided action handlers 
# and creating pkg.Action instances from the reference declarations.
#
# @singleton
#
class pkg.Registry

  constructor: ->
    @_reg = {}

  #
  # Registers action handler for the given scopes.
  # Function takes variable number of arguments:
  # - first argument is expected to be a String scope.
  # - arguments between first & last are expected to be a String scope.
  # - last argument is expected to be {} handler.
  #
  # @param String... scopes
  # @param {} handler
  #
  register: (args...) ->
    h = args.pop()
    @_reg[name] = h for name in args

  #
  # Retrieves handler for the action of the given type.
  # Assuming the scope is 'dom.img' and the type is 'src', function will
  # search for handlers in 'dom.img.src', 'dom.src', 'src' and will return
  # the first matching handler.
  #
  # @param String type
  # @param String scope
  #

  # Zdecydowanie zbyt wolne!
  _get_handler:(type, scope) ->
    dt = '.' + type

    while scope.length
      return h if h = @_reg[scope + dt]
      scope = scope.substr(0, scope.lastIndexOf('.'))

    assert @_reg[type], "Action handler for #{type} not found."
    return @_reg[type]

  #
  # Cretes new Action isntance using the given reference and 
  # corresponding action handler.
  #
  # @param {} ref
  # @param String scope
  #
  create: (ref, scope) ->
    return new pkg.Action(ref, @_get_handler(ref.type, scope), @)
