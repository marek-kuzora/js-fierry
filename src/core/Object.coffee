#
# Module providing clients ability for fast access of object's
# properties in a path-based way.
#
Env.object =

  #
  # Returns object's property that is described by the given
  # array path. Will return undefined if property is not found,
  # or any object in the path doesn't exist.
  #
  # @param Object o - e.g: {user: {name: 'Bilbo', age: 123}}.
  # @param String[] p - e.g: ['user', 'name'].
  #
  get: (o, p) ->
    for i in p
      return if o is undefined
      o = o[i]
    return o

  #
  # Sets value under specified path. Will create all the objects
  # that are in the path and doesn't already exist.
  #
  # @param Object o - e.g: {user: {name: 'Bilbo', age: 123}}
  # @param String[] p - e.g: ['user', 'surname'].
  # @param Any v - e.g: 'Baggins'.
  #
  set: (o, p, v) ->
    i = 0
    l = p.length - 1
    while l--
      e = p[i++]
      o = o[e] ?= {}
    o[p[i]] = v


