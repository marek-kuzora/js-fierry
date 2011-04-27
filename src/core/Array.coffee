Env.array =

  #
  # Returns true if array contains the given item.
  # @param arr
  # @param it
  #
  contains: (arr, it) ->
    arr.indexOf(it) is not -1

  #
  # Returns true if array does not contain any items.
  # @param arr
  #
  empty: (arr) ->
    arr.length is 0

  #
  # Erases all instances of the given item from the array.
  # @param arr
  # @param it - item to remove.
  # @param i - offset
  #
  erase: (arr, it, i=0) ->
    while i < arr.length
      if arr[i] is it then arr.splice(i, 1) else i++
    return

  #
  # Returns average value from array of numbers.
  # @param arr
  #
  avg: (arr) ->
    sum = 0
    sum += i for i in arr
    return sum / arr.length

  #
  # Returns unique array from the given one.
  # Will work only on array of primitives
  # @param arr
  #
  unique: (arr) ->
    r = []
    hash = {}
    hash[i] = 0 for i in arr
    r.push(i) for i of hash
    return r
