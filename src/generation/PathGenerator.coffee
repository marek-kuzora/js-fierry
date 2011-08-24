class pkg.PathGenerator

  constructor: ->
    @_reg = {}

  #
  # Permutates given array of path segments into paths with specified length.
  #
  # @param arr - array of path segments.
  # @param count - generated array size.
  # @param length - each path length.
  #
  path_array: (count, length = 5, arr = pkg.PATHS_ARRAY) ->
    key = "#{uid arr}_#{count}_#{length}"
    return @_reg[key] ?= @_get_path_array(arr, count, length)

  #
  # Permuates given array of path segments into rules with specified length.
  # Replaces random path segments with wildchars '*'.
  #
  # @param arr - array of path segments.
  # @param count - number of rules per head.
  # @param length - each path length.
  #
  rules_array: (count, length = 5, arr = pkg.PATHS_ARRAY) ->
    l = arr.length
    parr = @path_array(count * l, length - 1, arr)

    for path, i in parr
      parr[i % l] + '.' + path.replace(parr[math.rand l-1], '*')

  #
  # Returns array of paths with the given count & length.
  #
  # @param arr - array of path segments.
  # @param count - number of rules per head.
  # @param length - each path length.
  #
  _get_path_array: (arr, count, length) ->
    key = "#{uid arr}_#{length}"
    max = @_reg[key] or []

    if max.length < count
      max = @_reg[key] = @_permutate_paths(arr, count, length)
    return max.slice(0, count)

  #
  # Generates array of random paths with the given count & length.
  #
  # @param arr - array of path segments.
  # @param count - number of rules per head.
  # @param length - each path length.
  #
  _permutate_paths: (arr, count, length) ->
    l = arr.length
    while count--
      (arr[math.rand l-1] for _ in [0..length - 1]).join('.')
