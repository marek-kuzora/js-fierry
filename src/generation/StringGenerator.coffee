class pkg.StringGenerator

  constructor: ->
    @_sreg = {}

    @_min_char = 32
    @_max_count = {}
    @_max_length = 20

  #
  # Generates array of unique (mostly) strings.
  # @param Integer count
  # @param Integer length
  # @param Integer range - possible different values of single character.
  # @param Boolean sorted - if true, returns sorted array.
  #
  string_array: (count, length = 10, range = 200, sorted = false) ->
    k = "#{count}_#{length}_#{range}_#{sorted}"

    return @_sreg[k] ?= do =>
      arr = @_get_string_array(count, range)
      arr = (str.substr(0, length) for str in arr)

      if sorted then arr.sort()
      return arr

  #
  # Returns array of strings  with the given count & range.
  # @param Integer count
  # @param Integer range - possible different values of single character.
  #
  _get_string_array: (count, range) ->
    k = "#{count}_#{@_max_length}_#{range}_false"
    return @_sreg[k] ?= @_gen_string_array(count, range)

  #
  # Generates array of unique strings with the given count & range.
  # Each string's lengths is equal to @_max_length
  # @param Integer count
  # @param Integer range - possible different values of single character.
  #
  _gen_string_array: (count, range) ->
    for _ in [1..count]
      arr = for j in [1..@_max_length]
        i = core.rand(range) + @_min_char
        char = String.fromCharCode(i)
      str = arr.join('')

  #
  # Generates string of the specified length.
  # @param Integer length
  # @param Integer range - possible different values of single character.
  #
  big_string: (length, range = 200) ->
    key = "#{length}_#{range}"
    return @_sreg[key] ?= do =>
      count = Math.ceil(length / @_max_length)
      arr = @_get_string_array(count, range)
      return arr.join('')
