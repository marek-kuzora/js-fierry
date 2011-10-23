math  = require '../core/math'


#
# Generator for creating array of (mostly) unique strings and
# big random strings. Internally caches the generated arrays to
# boost the performance.
#
# @singleton
#
class StringGenerator

  constructor: ->
    @_cache = {}
    @_min_char = 0
    @_max_length = 20

  #
  # Generates array of unique (mostly) strings.
  #
  # @param Integer count
  # @param Integer length
  # @param Integer range - different values of single character.
  # @param Boolean sorted - if true, returns sorted array.
  #
  array: (count, length = 10, sorted = false, range = 127) ->
    k = "#{count}_#{length}_#{range}_#{sorted}"

    return @_cache[k] ?= do =>
      arr = @_get_string_array(count, range)
      arr = (str.substr(0, length) for str in arr)

      if sorted then arr.sort()
      return arr

  #
  # Generates string of the specified length.
  #
  # @param Integer length
  # @param Integer range - different values of single character.
  #
  big: (length, range = 200) ->
    key = "#{length}_#{range}"
    return @_cache[key] ?= do =>
      count = Math.ceil(length / @_max_length)
      arr = @_get_string_array(count, range)
      return arr.join('')

  #
  # Returns array of strings  with the given count & range.
  #
  # @param Integer count
  # @param Integer range - different values of single character.
  #
  _get_string_array: (count, range) ->
    k = "#{count}_#{@_max_length}_#{range}_false"
    return @_cache[k] ?= @_gen_string_array(count, range)

  #
  # Generates array of unique strings with the given count 
  # & range. Each string's lengths is equal to @_max_length.
  #
  # @param Integer count
  # @param Integer range - different values of single character.
  #
  _gen_string_array: (count, range, min_char = @_min_char) ->
    for _ in [1..count]
      arr = for j in [1..@_max_length]
        i = math.rand(range) + min_char
        char = String.fromCharCode(i)
      str = arr.join('')


return new StringGenerator()
