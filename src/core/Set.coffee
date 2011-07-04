Env.set =

  #
  # Performs union operation on the given sets.
  #
  # @param Array arr
  # @param Array[] args
  #
  union: (arr, args...) ->
    set = arr.slice()

    for arr in args
      for i in arr
        set.push(i) if set.indexOf(i) is -1

    return set

  #
  # Performs difference operation on the given sets.
  # Treats first argument as the set to substract from.
  #
  # @param Array arr
  # @param Array[] args
  #
  difference: (arr, args...) ->
    set = arr.slice()

    for arr in args
      for i in arr
        Env.array.erase(set, i) if set.indexOf(i) isnt -1

    return set
