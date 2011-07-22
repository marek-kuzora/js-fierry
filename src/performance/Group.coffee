class pkg.Group

  constructor: (@_ref, @parent) ->
    @name = @_ref.name
    
    @_nodes = []
    @_envs = @_ref.envs || []
    @_after = @_ref.after || (->)
    @_before = @_ref.before || (->)
    @_min_arg = @_ref.min_arg || 0
  
  #
  # Accepts the given visitor for retrospection.
  # @param visitor
  #
  accept: (visitor) ->
    visitor.on_group_start(@)
    node.accept(visitor) for node in @_nodes
    visitor.on_group_end(@)

  #
  # Adds new node as a child.
  # @param node - group/test object.
  #
  add: (node, ignore) ->
    for n in @_nodes when n.name is node.name
      return if ignore
      throw new Error "Node #{node.name} already exists"

    @_nodes.push(node)

  #
  # Returns node with specified name.
  # @param name - group/test name.
  #
  get: (name) ->
    name = @name + "." + name if @name isnt ''
    for n in @_nodes when n.name is name
      return n

    throw new Error "Node not found #{@name}.#{name}"

  #
  # Extracts tests from the group.
  # If recursive is provided, extracts tests from the child groups also.
  # @returns array of test instances.
  #
  get_tests: () ->
    arr = []
    for n in @_nodes
      if n instanceof pkg.Test  then arr.push(n)
      if n instanceof pkg.Group then arr = arr.concat(n.get_tests())
    return arr

  #
  # Exports tests to the given group.
  # @param pkg.Group group
  #
  export_tests: (group) ->
    for n in @_nodes when n instanceof pkg.Test
      group.add(n.clone(group), true)

  #
  # Runs before method starting with the top parent group and going down.
  # @param ctx - execution context.
  #
  run_before: (ctx) ->
    @parent.run_before(ctx) if @parent
    @_before.call(ctx)

  #
  # Runs after method starting with this group and going up to the parent group.
  # @param ctx - execution context.
  #
  run_after: (ctx) ->
    @_after.call(ctx)
    @parent.run_after(ctx) if @parent

  #
  # Returns minimal number of loops for belonging pfc cases.
  #
  get_min_arg: ->
    return @_min_arg || @parent.get_min_arg() if @parent
    return @_min_arg
  
  #
  # Returns union of environments names used by the group.
  #
  get_envs: ->
    return union(@_envs, @parent.get_envs()) if @parent
    return @_envs
