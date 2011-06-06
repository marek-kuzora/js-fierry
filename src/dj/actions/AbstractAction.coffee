class pkg.AbstractAction extends pkg.IAction

  constructor: (ref, parent) ->
    @_ref = ref
    @_nodes = []

    @_setup_structure parent

  #
  # Inserts node into the structure.
  # - Sets parent and pushes parent's new node.
  # - Sets before sibling and before's after sibling.
  # @param AbstractAction parent
  #
  _setup_structure: (parent) ->
    @_parent = parent

    if @_parent.has_nodes()
      @_before = parent.get_last_node()
      @_before.set_after_sibling(@)

  #
  # Pushes action's new child node.
  # @param AbstractAction node
  #
  push_node: (node) ->
    @_nodes.push node

  #
  # Sets action's immediate after sibling.
  # @param AbstractAction after
  #
  set_after_sibling: (after) ->
    @_after = after

  #
  # Returns true if action has any child nodes.
  #
  has_nodes: ->
    return @_nodes.length != 0

  #
  # Returns current action's last node.
  #
  get_last_node: ->
    return @_nodes[@_nodes.length - 1]

  #
  # (see: src/dj/actions/IAction.coffee)
  #
  create_nodes: ->
    for ref in @_ref.nodes
      @push_node @_actions.get_created ref, @
