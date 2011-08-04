class pkg.Action

  # Koszt tworzenia obiektu:
  # - update_fn przez =>
  # - nodes = {}
  # - _prev & _curr = {}
  # Wylaczenie tych rzeczy daje wzrost z 1.6k -> 3.2k
  constructor: (@_ref, @_handler, @_registry) ->
    @nodes = {}
    @disposed  = false
    @finalized = false

  create: (@parent, env) ->
    @_env = env.get_node()
    @_handler.create?(@, env)

    @parent.attach(@) if @parent
    return
  
  # Kluczowe jest pozbycie sie tych tablic przy ustaniu, oraz lepsze get_changes!
  # Brak bind'a dla kazdej akcji powoduje przyspieszenie z 1.7->2.3k
  update: (env = new pkg.Environment(@_env)) ->
    @_prev_daos = @_curr_daos ?= []
    @_curr_daos = []

    @_handler.update?(@, @_ref.value?(@), env)
    [old_nodes, new_nodes] = @_get_changes(@_ref.nodes?(@)) # Glowny spadek!
    @_submit_changes()

    if old_nodes.length
      node.dispose() for node in old_nodes

    if new_nodes.length
      @_create_node(ref, env) for ref in new_nodes
    return

  update: (env = new pkg.Environment(@_env)) =>
    @_prev_daos = @_curr_daos ?= []
    @_curr_daos = []

    @_handler.update?(@, @_ref.value?(@), env)
    @_create_node(ref, env) for ref in @_ref.nodes?(@)
    
    @_submit_changes()
    return

  # Tutaj kluczowe aby przyspieszyc!
  # Byc moze podczas create nie potrzeba recznie tego przetwarzac???
  # W tej chwili zamieniam obiekt na tablice...
  _get_changes: (nodes, create = false) ->
    return [
      n for uid, n of @nodes when not nodes[uid]
      n for uid, n of nodes  when not @nodes[uid]
    ]

  _submit_changes: ->
    for dao in @_prev_daos when dao && not @_curr_daos[uid dao]
      dao.unregister(@update)

    for dao in @_curr_daos when dao && not @_prev_daos[uid dao]
      dao.register(@update)
    return
  
  _unregister_all: ->
    dao.unregister(@update) for dao in @_curr_daos

  _create_node: (ref, env) ->
    env.push_node()

    node = @_registry.create(ref, env.get('scope'))
    node.create(@, env)
    node.update(env)
    node.finalize(env)

    env.pop_node()
    
  finalize: (env) ->
    @_handler.finalize?(@, env)
    @finalized = true
    return

  dispose: ->
    @_handler.dispose?(@)
    @_unregister_all()

    node.dipose() for node in @nodes
    @disposed = true

    @parent.detach(@) if @parent

  attach: (node) ->
    @nodes[node.uid()] = node

  detach: (node) ->
    delete @nodes[node.uid()]

  uid: ->
    return @_ref.uid

  track_dao: (dao) ->
    @_curr_daos[uid dao] = dao

  get_local_storage: ->
    return core.storage.STORAGE_INSTANCE


  get_siblings: (filter_fn) ->
    # 1) Foreach przez wszystkie elementy parenta
    # 2) Na kazdym uruchamiamy compare_fn i jesli zwroci true to dopisujemy do listy
    # 3) Na koniec sort asc po uid() i mozna zwracac tablice!
