#
# Responsible for registering the provided Actions and creating 
# their instances from the reference declarations.
#
# @singleton
#
class pkg.Registry

  constructor: ->
    @_queue = []
    @_scache = {}
    @_tcache = {}

  register: ->
    return @_register_behavior(arguments...) if arguments[2]?
    return @_register_scope(arguments...)

  _register_scope: (scope, factory) ->
    assert !@_scache[scope], "Behavior factory for scope #{scope} already defined."
    @_scache[scope] = factory

  _register_behavior: (scope, type, behavior) ->
    @_tcache[scope] ?= {}
    @_tcache[scope][type] ?= behavior

  #
  # Creates new Action instance. Each action will be configured
  # with appropriate class, matching the provided type & scope.
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
    cls = @_get_class(scope, type)
    return new cls(type, uid, id, tags, value_def, nodes_def)
  
  create_cst: (parent, type, uid, id, tags, value_def, nodes_def) ->
    cls = parent.get_class_type(type)
    return new cls(type, uid, id, tags, value_def, nodes_def)

  #
  # Retrieves action's class for the given scope & type.
  # This class will be used to initialize the action instance
  # in Registry.create() method.
  #
  _get_class: (scope, type) ->
    @_tcache[scope] ?= {}

    return @_tcache[scope][type] ?= do =>
      assert @_scache[scope], "Behavior factory for scope #{scope} not found"
      return @_scache[scope](type)

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
  REGISTRY.register(arguments...)

core.execute = (type, value_def, nodes_def) ->
  return REGISTRY.execute(type, value_def, nodes_def)

pkg.create = (scope, type, uid, id, tags, value_def, nodes_def) ->
  return REGISTRY.create(scope, type, uid, id, tags, value_def, nodes_def)

pkg.create_cst = (parent, type, uid, id, tags, value_def, nodes_def) ->
  return REGISTRY.create_cst(parent, type, uid, id, tags, value_def, nodes_def)


#
# Registers execute/dispose Registry behavior.
#
app.add_behavior 'start', REGISTRY.on_start
app.add_behavior 'stop',  REGISTRY.on_stop

pkg.register '', 'dd-dummy', pkg.SolidDummy
