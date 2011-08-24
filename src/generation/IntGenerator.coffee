class pkg.IntGenerator

  constructor: ->
    @_ireg = {}

  #
  # Generates array of unique ints.
  #
  # @param Integer count
  # @param Integer step - max incrementation step, > 1.
  # @param Boolean sorted - if true, returns sorted array.
  #
  int_array: (count, step = 1, sorted = false) ->
    k = "#{count}_#{sorted}"

    return @_ireg[k] ?= do =>
      i = 0
      arr = (i += math.rand(step - 1) + 1 for j in [1..count])

      if !sorted then array.shuffle(arr)
      return arr
