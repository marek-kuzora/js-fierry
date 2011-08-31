class pkg.Action extends core.PriorityMap

  constructor: (@uid, @id, @tags, @_value_def, @_nodes_def, @_behavior) ->

  execute: (@parent) ->
    @parent.attach(@) if @parent?.finalized

    @_curr_daos = []

    # Chcemy parenta przekazywac oraz trzymac stara value?
    @_behavior.create?(@)
    @_behavior.update?(@, @_value_def(@))

    @_children = @_process_nodes()
    @_register_all()

    @_behavior.finalize?(@)
    @finalized = true

    return @

  _process_nodes: ->
    node.execute(@) for node in @_nodes_def(@)

  update: =>
    return if @disposed

    @_prev_daos = @_curr_daos
    @_curr_daos = []

    @_behavior.update?(@, @_value_def(@))
    [old_nodes, new_nodes] = @_get_changed_nodes()
    
    node.dispose() for node in old_nodes
    node.execute(@) for node in new_nodes

    @_submit_changes()
    return

  _get_changed_nodes: ->
    old_nodes = []
    new_nodes = []

    a = 0
    b = 0
    arra = @_children
    arrb = @_nodes_def(@)
    
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
    @parent.detach(@) if @parent && !@parent.disposed
    @disposed = true
    
    @_behavior.dispose?(@)
    @_unregister_all()

    n.dispose() for n in @_children

    @_curr_daos = []
    @_children  = []

  attach: (child) ->
    array.insert_cst(@_children, child, (a,b) -> a - b)

  detach: (child) ->
    array.erase(@_children, child)

  get_scope: ->
    return scope = @_behavior.get_scope?(@parent) || ''

  register_dao: (dao) ->
    @_curr_daos.push(dao)

  _register_all: ->
    dao.subscribe(@update) for dao in @_curr_daos
    return

  _unregister_all: ->
    dao.unsubscribe(@update) for dao in @_curr_daos
    return

  _submit_changes: ->
    for dao in @_prev_daos when @_curr_daos.indexOf(dao) is -1
      dao.unsubscribe(@update)

    for dao in @_curr_daos when @_prev_daos.indexOf(dao) is -1
      dao.subscribe(@update)

  find: (fn) ->
    return fn(@_children)
