# TODO Documentation!
rtm.register_executor 'dj.into'
  services:
    uid: 'dj.uid'

  #
  # Executes 'dj.into' requests from DeclarativeJ language.
  # @param {id, nodes} ref
  run: (req) ->
    parent = @uid.get_ref(req.id)
    parent.nodes = parent.nodes.concat(req.nodes)
    
    live_refs = @uid.get_live(req.id)

    for n in req.nodes
      @traverse_ref(n, parent)
      @attach_live_ref(n, live_refs)
    return

  #
  # Traverse down the references tree.
  #
  # Binds reference with its parent. 
  # Pushes into uid service if it has an ID.
  #
  # @param ref
  # @param parent
  #
  traverse_ref: (ref, parent) ->
    @uid.cache_ref(ref.id, ref) if ref.id
    ref.parent = parent

    @traverse_ref(n, ref) for n in ref.nodes

  # TODO create the intoCls action instead
  # TODO update the liveRef creation in UidService!!
  attach_live_ref: (ref, live_refs) ->
    for l in live_refs
      live_ref = {ref: ref, parent: l}

      l.nodes.push(live_ref)
      rtm.push({type: 'dj.subtree', ref: live_ref})
