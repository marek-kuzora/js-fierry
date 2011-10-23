app    = require '../core/app'
assert = require '../core/assert'


Nodes  = require 'nodes'
Action = require 'action'

#
# @{set:roots}
# @singleton
#
class Roots

  constructor: ->
    @_queue = []
    @_cache = {}

    app.register 'start', @on_start
    app.register 'stop',  @on_stop

  register: (type, behavior) ->
    assert !@_cache[type], "Behavior for '#{type}' already defined."
    @_cache[type] = behavior

  execute: (type, nodes) ->
    action = @_create(type, nodes)
    @_queue.push(action)
    
    return Nodes.execute(action) if app.is_running()
    return action

  # Jesli utworze poprzez _create samodzielnie (/export) to nastepnie moge taka akcje wykonac poprzez Nodes.execute(root);
  execute_raw: (type, nodes) ->
    Nodes.execute(@_create(type, nodes))

  _create: (type, nodes) ->
    assert @_cache[type], "Behavior for '#{type}' not found."
    return new Action(type, 0, (->), nodes, null, @_cache[type])

  on_start: =>
    Nodes.execute(action) for action in @_queue
    return

  on_stop: =>
    Nodes.dispose(action) for action in @_queue
    return


return new Roots()
