class pkg.Registry
  constructor: ->
    @_root = new pkg.Group({name: ''})

  #
  # Registers the performance group.
  # @param group - {name, *parent, *args, *before, *after}
  #
  registerGroup: (hash) ->
    parent = @get(@_getParent(hash.name))
    group = new pkg.Group(hash, parent)

    parent.add(group)

  #
  # Registers the performance test case.
  # @param test - {group, name, run, *args, *before, *after, *retry}
  #
  registerTest: (hash) ->
    parent = @get(@_getParent(hash.name))
    test = new pkg.Test(hash, parent)
    
    parent.add(test)

  #
  # Returns parent for the given group/test name.
  # @param name - group/test name.
  #
  _getParent: (name) ->
    idx = name.lastIndexOf('.')
    return if idx > -1 then name.substr(0, idx) else ''

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
      [child, name] = @_getFirstChild(name)
      group = group.get(child)
    return group

  #
  # Returns first child of the given group/test name.
  # @param name - group/test name.
  #
  _getFirstChild: (name) ->
    idx = name.indexOf('.')
    idx = name.length if idx == -1
    return [name.substr(0, idx), name.substr(idx+1)]
