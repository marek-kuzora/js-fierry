class pkg.Group

  constructor: (group, @parent) ->
    @name = group.name
    
    @_nodes = []
    @_after = group.after || (->)
    @_before = group.before || (->)

  #
  # Accepts the given visitor for retrospection.
  # @param visitor
  #
  accept: (visitor) ->
    visitor.onGroupStart(@)
    node.accept(visitor) for node in @_nodes
    visitor.onGroupEnd(@)


  #
  # Adds new node as a child.
  # @param node - group/test object.
  #
  add: (node) ->
    name = node.name
    for n in @_nodes when n.name == name
      throw new Error("Node #{name} already exists")

    @_nodes.push(node)

  #
  # Returns node with specified name.
  # @param name - group/test name.
  #
  get: (name) ->
    name = @name + "." + name if @name != ''
    for n in @_nodes when n.name == name
      return n

    throw new Error("Node not found #{@name}.#{name}")
    
  #
  # Extracts tests from the group.
  # If recursive is provided, extracts tests from the child groups also.
  # @returns array of test instances.
  #
  getTests: () ->
    arr = []
    for n in @_nodes
      if n instanceof pkg.Test  then arr.push(n)
      if n instanceof pkg.Group then arr = arr.concat(n.getTests())
    return arr

  #
  # Runs before method starting with the top parent group and going down.
  # @param ctx - execution context.
  #
  runBefore: (ctx) ->
    @parent.runBefore(ctx) if @parent
    @_before.call(ctx)

  #
  # Runs after method starting with this group and going up to the parent group.
  # @param ctx - execution context.
  #
  runAfter: (ctx) ->
    @_after.call(ctx)
    @parent.runAfter(ctx) if @parent
