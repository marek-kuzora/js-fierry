#
# Module providing additional functionality for arrays: binary
# search, contains element, erase element, suffling, building
# unique sets and casting collections to arrays.
#
Env.array = $arr =

  #
  # Performs binary search on sorted array. Returns index of 
  # the found key or negative value if key wasn't found. 
  # Having negative value, one can obtain index where to insert
  # that key to retain the sorted order: index = -1 * (value+1).
  #
  # Compares items via '<' - primitives only. For comparing
  # other content use bsearch_cst which takes additional 
  # custom comparator.
  #
  # @param Array arr
  # @param Any key
  # @param Function cmp *
  #
  bsearch: (arr, key) ->
    l = 0
    h = arr.length - 1

    while l <= h
      mid = l + h >> 1
      mval = arr[mid]

      if mval < key then l = mid + 1
      else h = mid - 1

    if mval is key then return mid
    else return -(l+1)

  #
  # Performs binary search on sorted array. Returns index of 
  # the found key or negative value if key wasn't found. 
  # Having negative value, one can obtain index where to insert
  # that key to retain the sorted order: index = -1 * (value+1).
  # @see array.bsearch()
  #
  # @param Array arr
  # @param Any key
  # @param Function fn 
  #     - comparator, that should return -1 if a < b
  #
  bsearch_cst: (arr, key, fn) ->
    l = 0
    h = arr.length - 1

    while l <= h
      mid = l + h >> 1
      mval = arr[mid]

      if fn(mval, key) < 0 then l = mid + 1
      else h = mid - 1

    if mval is key then return mid
    else return -(l+1)

  #
  # Erases all instances of the given item from the array.
  # Compares items via '===' - references only. For comparing
  # other content use erase_cst which takes additional custom 
  # comparator.
  #
  # @param Array arr
  # @param Any it - item to remove.
  #
  erase: (arr, it) ->
    l = arr.length
    (arr.splice(l, 1) if arr[l] is it) while l--
    return

  #
  # Erases all instances of the given item from the array using
  # custom equality comparator.
  #
  # @param Array arr
  # @param Any it - item to remove.
  # @param Function fn - comparator.
  #
  erase_cst: (arr, it, fn) ->
    l = arr.length
    (arr.splice(l, 1) if fn(arr[l],it)) while l--
    return

  #
  # Inserts item into the sorted array. Compares items via '<'
  # - primitives only. For comparing other content use
  # insert_cst() which takes additional custom comparator.
  #
  # To workaround Chrome bug of native Array.splice() function,
  # the index is explicitly casted into primitive integer.
  #
  # @param Array arr
  # @param Any it
  #
  insert: (arr, it) ->
    i = $arr.bsearch(arr, it)
    i = -1 * (i + 1) if i < 0
    arr.splice(i >> 0, 0, it)

  #
  # Inserts item into the sorted array using custom comparator.
  # @see array.insert()
  #
  # @param Array arr
  # @param Any it
  # @param Function fn 
  #     - comparator, that should return -1 if a < b
  #
  insert_cst: (arr, it, fn) ->
    i = $arr.bsearch_cst(arr, it, fn)
    i = -1 * (i + 1) if i < 0
    arr.splice(i >> 0, 0, it)

  #
  # Shuffles the given array.
  #
  # @param Array arr
  #
  shuffle: (arr) ->
    i = arr.length

    while i--
      v = arr[i]
      j = Math.random() * i << 0
      arr[i] = arr[j]
      arr[j] = v
    return arr

  #
  # Casts collection into JavaScript Array.
  #
  # @param Any any - arguments, live dom collection, etc.
  #
  to_array: (any) ->
    return Array.prototype.slice.call(any)

  #
  # Returns unique array from the given one. Will work only for
  # arrays containing strings and numbers.
  #
  # @param Array arr
  #
  unique: (arr) ->
    h = {}
    h[i] = true for i in arr
    return (k for k of h)
