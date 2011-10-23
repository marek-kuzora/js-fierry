path = require 'path'
math = require '../core/math'


PATHS_ARRAY = require 'path_array'


#
# @singleton
#
class RulesGenerator

  #
  # Permuates given array of path segments into rules with
  # specified length. Replaces random path segments with
  # wildchars '*'.
  #
  # @param String[] arr   - array of path segments.
  # @param Integer count  - number of rules per head.
  # @param Integer length - each path length.
  #
  array: (count, length = 5, arr = PATHS_ARRAY) ->
    l = arr.length
    parr = path.array(count * l, length - 1, arr)

    for p, i in parr
      parr[i % l] + '.' + p.replace(parr[math.rand l-1], '*')


return new RulesGenerator()

