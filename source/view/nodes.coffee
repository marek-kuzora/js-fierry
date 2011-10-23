return Nodes =

  execute: (action) ->
    action.create()
    Nodes.execute(node) for node in action.nodes
    action.finalize()

  dispose: (action) ->
    action.dispose()
    Nodes.dispose(node) for node in action.nodes
    return
