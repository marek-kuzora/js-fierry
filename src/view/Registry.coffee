#
# Responsible for registering the provided action handlers 
# and creating Action instances from the reference declarations.
#
# @singleton
#
class pkg.Registry

  constructor: ->
    @_reg   = {}
    @_queue = []

  #
  # Registers action's behavior for the given scopes.
  # Function takes variable number of arguments:
  # - first argument is expected to be a String scope.
  # - arguments between first & last are expected to be a String scope.
  # - last argument is expected to be {} handler.
  #
  # @param String... scopes
  # @param {} handler
  #
  register: (args...) ->
    behavior = args.pop()

    for arg in args
      i = arg.lastIndexOf('.')
      [scope, type] = [arg.substr(0, i), arg.substr(i + 1)]

      @_reg[scope] ?= {}
      @_reg[scope][type] = behavior

  #
  # Executes the given configuration. Creates the root action
  # and executes it. Root action has negative uid (because uid
  # for root does not matter), null id and empty tags list. 
  # Other params are passed as provided in the arguments list.
  #
  # Executing actions is expected to happen while the application
  # is running. If the application is stopped, the execution will
  # be postponed until application is started. Actions may assume
  # that the environment is fully started while being processed.
  #
  # @param String type
  # @param Function value_def
  # @param Function nodes_def
  #
  execute: (type, value_def, nodes_def) ->
    action = @create('', type, -1, null, [], value_def, nodes_def)
    @_queue.push(action)
    
    action.execute() if app.is_running()
    return action

  #
  # Creates new Action instance. Each action will be configured
  # with appropriate behavior, matching the provided type & scope.
  #
  # @param String scope
  # @param String type
  # @param String uid
  # @param String id* - null if not provided.
  # @param String[] tags* - empty array if not provided.
  # @param Function value_def
  # @param Function nodes_def
  #
  create: (scope, type, uid, id, tags, value_def, nodes_def) ->
    return new pkg.Action(uid, id, tags, value_def, nodes_def,
      @_get_behavior(scope, type)
    )

  #
  # Retrieves action's behavior for the given type. Assuming the
  # scope is 'dom.img' and the type is 'src', function will
  # search for behaviors in 'dom.img.src', 'dom.src', 'src' 
  # and will return the first matching handler.
  #
  # @param String type
  # @param String scope
  #
  _get_behavior: (scope, type) ->
    scope_reg = @_reg[scope] ?= {}
    
    return scope_reg[type] ?= do =>
      assert scope isnt '', "Action handler for #{type} not found"
      return @_get_handler(scope.substr(0, scope.lastIndexOf('.')), type)

  #
  # Executes all of the queued configuration on application
  # startup.
  #
  on_start: =>
    action.execute() for action in @_queue

  #
  # Disposes all of the queued configuration on application
  # shutdown.
  #
  on_stop: =>
    action.dispose() for action in @_queue


#
# Global Registry instance and its public API.
#
REGISTRY = new pkg.Registry()

pkg.register = ->
  REGISTRY.register.apply(REGISTRY, arguments)

core.execute = (type, value_def, nodes_def) ->
  return REGISTRY.execute(type, value_def, nodes_def)

pkg.create = (scope, type, uid, id, tags, value_def, nodes_def) ->
  return REGISTRY.create(scope, type, uid, id, tags, value_def, nodes_def)

#
# Registers execute/dispose Registry behavior.
#
app.add_behavior 'start', REGISTRY.on_start
app.add_behavior 'stop',  REGISTRY.on_stop
