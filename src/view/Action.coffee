class pkg.Action extends core.PriorityMap

  constructor: (@type, @uid, @id, @tags, @_value_def, @_nodes_def) ->

  execute: (@parent) ->
    @parent.attach(@) if @parent?.finalized

    @_curr_daos = []

    @on_create()
    @on_update()

    @_children = @execute_children(@_nodes_def())
    @_register_all()

    @on_finalize()
    return @

  update: =>
    return if @disposed

    @_prev_daos = @_curr_daos
    @_curr_daos = []

    @on_update()

    [old_nodes, new_nodes] = @_get_changed_nodes()
    @dispose_children(old_nodes)
    @execute_children(new_nodes)

    @_submit_changes()

  dispose: ->
    @parent.detach(@) if @parent && !@parent.disposed
    
    @on_dispose()
    @_unregister_all()

    @dispose_children(@_children)

    @_children  = []
    @_curr_daos = []

  # @extendable
  on_create: ->

  # @extendable
  on_update: ->
    @old_value = @value
    @value = @_value_def()

  # @extendable
  on_finalize: ->
    @finalized = true

  # @extendable
  on_dispose: ->
    @disposed = true

  # @extendable
  execute_children: (nodes) ->
    node.execute(@) for node in nodes

  # @extendable
  dispose_children: (nodes) ->
    node.dispose() for node in nodes

  attach: (child) ->
    array.insert_cst(@_children, child, (a,b) -> a.uid - b.uid)

  detach: (child) ->
    array.erase(@_children, child)

  register_dao: (dao) ->
    @_curr_daos.push(dao)

  _register_all: ->
    dao.subscribe(@update) for dao in @_curr_daos
    return

  _unregister_all: ->
    dao.unsubscribe(@update) for dao in @_curr_daos
    return

  _get_changed_nodes: ->
    old_nodes = []
    new_nodes = []

    a = 0
    b = 0
    arra = @_children
    arrb = @_nodes_def()
    
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

  _submit_changes: ->
    for dao in @_prev_daos when @_curr_daos.indexOf(dao) is -1
      dao.unsubscribe(@update)

    for dao in @_curr_daos when @_prev_daos.indexOf(dao) is -1
      dao.subscribe(@update)
    return

  find: (fn) ->
    return fn(@_children)

  get_scope: -> ''


class pkg.Dummy extends pkg.Action
  get_scope: -> ''

class pkg.AbstractDummy extends pkg.Dummy

class pkg.SolidDummy extends pkg.AbstractDummy
