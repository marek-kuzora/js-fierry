uid   = require '../core/uid'
math  = require '../core/math'


PATHS_ARRAY = require 'path_array'


#
# @singleton
#
class PathGenerator

  constructor: ->
    @_cache = {}

  #
  # Permutates given array of path segments into paths with
  # specified length.
  #
  # @param String[] arr   - array of path segments.
  # @param Integer count  - generated array size.
  # @param Integer length - each path length.
  #
  array: (count, length = 5, arr = PATHS_ARRAY) ->
    key = "#{uid arr}_#{count}_#{length}"
    return @_cache[key] ?= @_get_path_array(arr, count, length)

  #
  # Returns array of paths with the given count & length.
  #
  # @param String[] arr   - array of path segments.
  # @param Integer count  - number of rules per head.
  # @param Integer length - each path length.
  #
  _get_path_array: (arr, count, length) ->
    key = "#{uid arr}_#{length}"
    max = @_cache[key] or []

    if max.length < count
      max = @_cache[key] = @_permutate_paths(arr, count, length)
    return max.slice(0, count)

  #
  # Generates array of random paths with the given count & length.
  #
  # @param String[] arr   - array of path segments.
  # @param Integer count  - number of rules per head.
  # @param Integer length - each path length.
  #
  _permutate_paths: (arr, count, length) ->
    l = arr.length
    while count--
      (arr[math.rand l-1] for _ in [0..length - 1]).join('.')


return new PathGenerator()
