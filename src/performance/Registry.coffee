class pkg.Registry
  constructor: ->
    @_root = new pkg.Group({name: ''})
    @_last_group = @_root
    @_node_group = @_root

  #
  # Registers the performance group.
  # @param h - {name, *parent, *args, *before, *after}
  #
  register_group: (name, h = {}) ->
    [h.name, h.is_node] = @_resolve_name(name)
    
    parent = @get(@_get_parent(h.name))
    group  = new pkg.Group(h, parent)

    parent.add(group)
    @_last_group = group
    @_node_group = group if h.is_node

  #
  # Returns fully resolved group name.
  # @param name - group name.
  #
  _resolve_name: (name) ->
    n_name = @_node_group.name + '.'
    #console.log n_name, name
    return [name.substr(1), true]          if /^\//.test(name)
    return [n_name + name.substr(2), true] if /^\+\//.test(name)
    return [n_name + name, false]

  #
  # Returns parent for the given group/test name.
  # @param name - group/test name.
  #
  _get_parent: (name) ->
    idx = name.lastIndexOf('.')
    return if idx > -1 then name.substr(0, idx) else ''

  #
  # Registers performance test case.
  # @param h - {group, name, run, *args, *before, *after, *retry}
  #
  register_test: (name, h = {}) ->
    h.name = name
    parent = if h.group then @get(h.group) else @_last_group
    test   = new pkg.Test(h, parent)
    
    parent.add(test)

  #
  # Registers performance test cases that are already registed to another group.
  # @param name - group name from which to import test cases.
  #
  register_tests_from: (name) ->
    group = @get(@_resolve_name(name))
    group.export_tests(@_last_group)

  #
  # Returns the group/test corresponding to the given name.
  # Each name points directly at:
  #   - group, e.g. "array.splice"
  #   - test, e.g "array.splice.hard"
  # @param name - String
  #
  get: (name) ->
    group = @_root
    while name.length > 0
      [child, name] = @_get_first_child(name)
      group = group.get(child)
    return group

  #
  # Returns first child of the given group/test name.
  # @param name - group/test name.
  #
  _get_first_child: (name) ->
    idx = name.indexOf('.')
    idx = name.length if idx == -1
    return [name.substr(0, idx), name.substr(idx+1)]
