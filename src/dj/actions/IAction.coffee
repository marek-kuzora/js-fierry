class pkg.IAction

  #
  # Creates the action itself.
  #
  create: ->

  #
  # Creates the action's child nodes.
  #
  create_nodes: ->

  #
  # Finalizes the action's creation.
  #
  finalize: ->

  #
  # Attaches action to its parent.
  # - It is assumed that the parent is already known.
  #
  attach: ->

  #
  # Detaches action from its parent.
  # - It is assumed that the parent is already known.
  #
  detach: ->

  #
  # Update the action itself.
  #
  update: ->
