assert = require '../core/assert'
array  = require '../core/array'


Nodes  = require 'nodes'


#
# Compares two Action instances.
#
COMPARE_FN = (a,b) -> a.uid - b.uid


return class Action

  #
  # Constructor for Action class. Instances of this class are
  # usually created inside array literal that is returned from
  # directly from a function. Because of that, creating an array
  # or function property inside the constructor will compromise
  # the object's initialization performance (by a factor of 2).
  #
  constructor: (@type, @uid, @parent, @_behavior, @_value_fn, @_nodes_fn) ->

  create: ->
    # Getting @parent.finalized makes flat representation 
    # 2.5 times slower. Don't know why, dont care (?)
    @parent.attach(@) if @parent and @parent.finalized

    @_daos = []
    @value = @_value_fn()
    @nodes = @_nodes_fn()

    @_behavior ?= @parent.get_behavior_for(@type)
    @_behavior.create(@)
    @_behavior.update(@)

    # Chrome optimalization bug. The following lines makes view
    # 5-7 times faster than running "@_update = => @update()" 
    # which yields exactly the same results.
    @_update = (fn = => @update())

    @_register_all()
    return

  finalize: ->
    @_behavior.finalize(@)
    @finalized = true
    return @

  update: ->
    return if @disposed

    @_prev_daos = @_daos
    @_daos = []

    @value = @_value_fn()
    @nodes = @_nodes_fn()

    @_behavior.update(@)

    [old_nodes, new_nodes] = @_get_changed_nodes()

    Nodes.dispose(node) for node in old_nodes
    Nodes.execute(node) for node in new_nodes

    @_submit_changes()
    return

  _get_changed_nodes: ->
    old_nodes = []
    new_nodes = []

    a = 0
    b = 0
    arra = @nodes
    arrb = @_nodes_fn()
    
    while a < arra.length and b < arrb.length
      ua = arra[a].uid
      ub = arrb[b].uid

      if ua < ub
        old_nodes.push(arra[a])
        a++

      if ua > ub
        new_nodes.push(arrb[b])
        b++

      if ua is ub
        a++
        b++

    if a < arra.length
      old_nodes = old_nodes.concat(arra.slice(a))

    if b < arrb.length
      new_nodes = new_nodes.concat(arrb.slice(b))
    
    return [old_nodes, new_nodes]

  dispose: ->
    @parent.detach(@) if @parent && not @parent.disposed
    @disposed = true

    @_behavior.dispose(@)
    @_unregister_all()

    Nodes.dispose(node) for node in @nodes
    @nodes = []

  attach: (node) ->
    array.insert_cst(@nodes, node, COMPARE_FN)

  detach: (child) ->
    array.erase(@nodes, child)

  get_behavior_for: (type) ->
    behavior = @_behavior.get_cached_behavior(type)

    assert behavior, "Behavior for '#{type}' not found."
    return behavior

  register_dao: (dao) ->
    @_daos.push(dao)

  _register_all: ->
    dao.subscribe(@_update) for dao in @_daos
    return

  _unregister_all: ->
    dao.unsubscribe(@_update) for dao in @_daos
    @_daos = []

  _submit_changes: ->
    for dao in @_prev_daos when @_daos.indexOf(dao) is -1
      dao.unsubscribe(@_update)

    for dao in @_daos when @_prev_daos.indexOf(dao) is -1
      dao.subscribe(@_update)
    return

  find: (fn) ->
    return fn(@nodes)
