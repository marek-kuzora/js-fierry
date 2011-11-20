app    = require '../core/app'
assert = require '../core/assert'


Nodes  = require 'nodes'
Action = require 'action'


#
# @singleton
#
class Roots

  constructor: ->
    @_queue = []

    app.register 'start', @on_start
    app.register 'stop',  @on_stop

  execute: (type, behavior, nodes) ->
    action = @_create(type, behavior, nodes)
    @_queue.push(action)
    
    return Nodes.execute(action) if app.is_running()
    return action

  execute_raw: (type, behavior, nodes) ->
    Nodes.execute(@_create(type, behavior, nodes))

  _create: (type, behavior, nodes) ->
    return new Action(type, 0, null, behavior, (->), nodes)

  on_start: =>
    Nodes.execute(action) for action in @_queue
    return

  on_stop: =>
    Nodes.dispose(action) for action in @_queue
    return


return new Roots()
