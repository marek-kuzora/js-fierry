class core.Dao

  constructor: ->
    @_dot_code = 46

  #
  # Returns true if the given expression is a dao instance
  #
  # @param dao.Plain dao
  #
  is: (o) ->
    return o instanceof dao.Plain

  #
  # Returns value from the underlying dao expression.
  # Tracks all affected daos if instance.track_dao() is present.
  #
  # @param String str
  # @param Object instance
  #
  get: (str, instance, no_evaluate) ->
    arr = []
    v   = @_get_dao(str, instance).get(arr, no_evaluate)

    if instance and instance.track_dao
      instance.track_dao(dao) for dao in arr

    return v

  #
  # Sets value to the underlying dao expression
  #
  # @param String str
  # @param Any v
  # @param Object instance
  #
  set: (str, v, instance, no_evaluate) ->
    @_get_dao(str, instance).set(v, no_evaluate)

  #
  # Returns dao instance for specified path and dao_cache.
  #
  # @param String str
  # @param Object instance
  #
  _get_dao: (str, instance) ->
    global   = @_is_global(str)
    instance = @_retrieve_dao_cache(global, instance)

    if global
      str = str.substr(2)
      storage = pkg.STORAGE_INSTANCE
    else
      str = str.substr(1)
      storage = instance
    
    return instance.get_dao(str, storage)

  #
  # Creates dao expression and caches in the given dao_cache.
  # It is assumed that String representation will be given without
  # any leading dots.
  # TODO it should be also possible to omit is_global & arr parameters!
  #
  # @param Boolean is_global
  # @param String str
  # @param Array arr
  # @param Object instance
  #
  create: (is_global, str, arr, instance) ->
    instance = @_retrieve_dao_cache(is_global, instance)
    storage  = if is_global then pkg.STORAGE_INSTANCE else instance

    instance.create_dao(str, arr, storage)

  #
  # Returns dao_cache from the given instance object.
  #
  # @param Boolean is_global
  # @param Object instance
  #
  _retrieve_dao_cache: (is_global, instance) ->
    if instance and instance.get_local_storage
      return instance.get_local_storage()

    if is_global
      return pkg.STORAGE_INSTANCE

    throw new Error 'No dao cache found for local dao expression'

  #
  # Returns true if String representation of the path is global.
  #
  # @param String str
  #
  _is_global: (str) ->
    return str.charCodeAt(0) is @_dot_code and str.charCodeAt(1) is @_dot_code

###
#
# Transforms the given string raw path into array-based compiled path.
#
# @param String raw
#
dao.compile = (raw) ->
  i  = 0
  st = 0
  l  = raw.length

  arr = []
  stack = []

  while i < l
    char = raw.charCodeAt(i)

    # . handling
    if char is 46
      if arr.length == 0 # should not compile that way??
        arr[0] = raw.charCodeAt(i+1) is 46
      else
        if st is not i
          arr.push(raw.substring(st, i))
      st = i + 1

    # { handling
    else if char is 123
      if st is not i
        arr.push(raw.substring(st, i))
      st = i+1

      stack.push(arr)
      arr.push([])
      arr = arr[arr.length-1]

    # } handling
    else if char is 125
      if st is not i
        arr.push(raw.substring(st, i))
      st = i + 1
      arr = stack.pop()
    
    i++

  # . { } all not found
  if st is not l
    arr.push(raw, substring, st, l)
  return arr

