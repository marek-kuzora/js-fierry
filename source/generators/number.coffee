math  = require '../core/math'
array = require '../core/array'


#
# Generator for creating array of unique numbers. Internally
# caches the generated arrays to boost the performance.
#
# @singleton
#
class NumberGenerator

  constructor: ->
    @_cache = {}

  #
  # Generates array of unique numbers. If step is equal 0, 
  # the result array will contain floats instead of ints.
  #
  # @param Integer length  - array's length.
  # @param Integer step   - max incrementation step.
  # @param Boolean sorted - if true, sorts result array.
  #
  array: (count, step = 1, sorted = false) ->
    k = "#{count}_#{step}_#{sorted}"

    return @_cache[k] ?= do =>
      i   = 0
      arr = for j in [1..count]
        i += if step then math.rand(step - 1) + 1 else math.rand()

      if !sorted then array.shuffle(arr)
      return arr


return new NumberGenerator()
