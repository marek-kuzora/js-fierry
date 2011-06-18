#
# It's just simple cccv - need to think if that could be done better!
#
Env.object =

  #
  # Get value from the given path.
  # @param Object o
  # @param Array p
  #
  get: (o,p) ->
    for i in p
      return if o == undefined
      o = o[i]
    return o

  #
  # Sets value under specified path
  # @param Object o
  # @param Array p
  # @param Any v
  #
  set: (o,p,v) ->
    i = 0
    l = p.length - 1
    while l--
      e = p[i++]
      o = o[e] ?= {}
    o[p[i]] = v
