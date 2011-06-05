rtm.register_executor 'dj.into'
  services:
    _uid:     'dj.uid'
    _actions: 'dj.actions'

  #
  # Executes 'dj.into' requests from DeclarativeJ language.
  # @param {id, nodes} ref
  #
  run: (req) ->
    parent = @_uid.get_ref(req.id)
    parent.nodes = parent.nodes.concat(req.nodes)  # weak..
    
    live_refs = @_uid.get_live(req.id)

    for n in req.nodes
      @traverse_ref(n, parent)
      @attach_live_ref(n, live_refs)
    return

  #
  # Traverse down the references tree.
  # - Binds reference with its parent. 
  # - Pushes into _uid service if it has an ID.
  # @param ref
  # @param parent
  #
  traverse_ref: (ref, parent) ->
    @_uid.cache_ref(ref.id, ref) if ref.id
    ref.parent = parent

    @traverse_ref(n, ref) for n in ref.nodes

  # TODO create the intoCls action instead
  # TODO update the liveRef creation in UidService!!
  #attach_live_ref: (ref, parents) ->
  #  for l in parents
  #    live_ref = {ref: ref, parent: l}
  #    l.nodes.push(live_ref) # no need - action will add itself to its parent!
  #    rtm.push_request 'dj.subtree', live_ref

  attach_live_ref: (ref, parents) ->
    for p in parents
      console.log 'dj.subtree', ref
      #rtm.push_request 'dj.subtree', @_actions.get(ref, p)
