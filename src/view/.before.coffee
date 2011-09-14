pkg.execute_node = (action) ->
  action.create()
  pkg.execute_node(node) for node in action.nodes
  action.finalize()

pkg.dispose_node = (action) ->
  action.dispose()
  pkg.dispose_node(node) for node in action.nodes
  return
