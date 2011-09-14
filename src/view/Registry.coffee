class pkg.Registry

  constructor: ->
    @_queue = []
    @_cache = {}

  register_root: (type, behavior) ->
    assert !@_cache[type], "Behavior for '#{type}' already defined."
    @_cache[type] = behavior

  execute: (type, value, nodes) ->
    action = @_create_root(type, value, nodes)
    @_queue.push(action)
    
    return pkg.execute_node(action) if app.is_running()
    return action

  execute_raw: (type, value, nodes) ->
    pkg.execute_node(@_create_root(type, value, nodes))

  _create_root: (type, value, nodes) ->
    assert @_cache[type], "Behavior for '#{type}' not found."
    return new pkg.Action(type, 0, value, nodes, null, @_cache[type])

  on_start: =>
    pkg.execute_node(action) for action in @_queue
    return

  on_stop: =>
    pkg.dispose_node(action) for action in @_queue
    return


#
# Global Registry instance and its public API.
#
REGISTRY = new pkg.Registry()

pkg.register_root = (type, behavior) ->
  return REGISTRY.register_root(type, behavior)

pkg.execute = (type, value, nodes) ->
  return REGISTRY.execute(type, value, nodes)

pkg.execute_raw = (type, value, nodes) ->
  return REGISTRY.execute_raw(type, value, nodes)

#
# Registers execute/dispose Registry behavior.
#
app.add_behavior 'start', REGISTRY.on_start
app.add_behavior 'stop',  REGISTRY.on_stop
