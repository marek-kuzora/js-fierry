Env.array =

  #
  # Returns average value from array of numbers.
  # @param Array arr
  #
  avg: (arr) ->
    sum = 0
    sum += i for i in arr
    return sum / arr.length

  #
  # Performs binary search on sorted array.
  # Returns idx of the found key or -idx if key wasn't found.
  #   Transformation for splicing the new element: idx = -1*(idx+1)
  # Works only on primitive array content!
  # @param Array arr
  # @param Any key
  #
  binary_search: (arr, key) ->
    l = 0
    h = arr.length - 1

    while l <= h
      mid = l + h >> 1
      mval = arr[mid]

      if mval < key then l = mid + 1
      else if mval > key then h = mid - 1
      else return mid
    return -(l+1)

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
  # @param Array arr
  # @param Any it - item to remove.
  # @param Integer i - offset.
  #
  erase: (arr, it, i=0) ->
    while i < arr.length
      if arr[i] is it then arr.splice(i, 1) else i++
    return

  #
  # Shuffles the given array.
  # @param Array arr
  #
  shuffle: (arr) ->
    i = arr.length
    while i
      j = parseInt(Math.random()*i)
      x = arr[--i]
      [arr[i], arr[j]] = [arr[j], x]
    return arr

  #
  # Cast collection into JavaScript Array
  # @param Collection arr - arguments, live dom collection, ...
  #
  to_array: (arr) ->
    return Array.prototype.slice.call(arr)

  #
  # Returns unique array from the given one.
  # Will work only on array of primitives
  # @param Array arr
  #
  unique: (arr) ->
    r = []
    hash = {}
    hash[i] = 0 for i in arr
    r.push(i) for i of hash
    return r
