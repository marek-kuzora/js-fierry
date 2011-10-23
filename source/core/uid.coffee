oop   = require 'oop'
array = require 'array'


#
# Module providing additional functionality for objects
# identification: stamp, equals & sort comparators, binary
# search, indexOf, insert into and erase from array.
#
uid =

  #
  # Stamps object with unique Integer identificator.
  #
  # @param Object obj
  #
  stamp: (obj) ->
    obj.__uid__ ?= ++uid.__counter__

  #
  # Uid global counter. Starts with 1 as 0 is falsy value when
  # forced to act as a boolean.
  #
  __counter__: 1

  #
  # Comparator for equality testing of uid objects.
  #
  equals: (a,b) -> uid.stamp(a) is uid.stamp(b)

  #
  # Comparators for ascending sorting of uid objects.
  #
  sort_asc: (a,b) -> uid.stamp(a) - uid.stamp(b)

  #
  # Comparators for descending sorting of uid objects.
  #
  sort_desc: (a,b) -> uid.stamp(b) - uid.stamp(a)

  #
  # Performs binary search of the given object in the array using
  # uid ascending comparator.
  #
  # @see array.bsearch()
  #
  # @param Array arr
  # @param Any it
  #
  bsearch: (arr, it) ->
    array.bsearch(it, arr, uid.sort_asc)

  #
  # Returns the first index of an element within the array equal to 
  # the specified value, or -1 if none is found. Uses uid#equals()
  # to compare the objects.
  #
  # @param Array arr
  # @param Any it
  #
  indexOf: (arr, it, i = 0) ->
    l = arr.length
    while i++ < l
      return i - 1 if uid.equals(arr[i - 1], it)
    return -1

  #
  # Erases all instances of the given item from the array using
  # uid equality comparator.
  #
  # @see array.erase()
  #
  # @param Array arr
  # @param Any it
  #
  erase: (arr, it) ->
    array.erase_cst(arr, it, uid.equals)

  #
  # Inserts item into the sorted array using uid asc comparator.
  # @see array.insert()
  #
  # @param Array arr
  # @param Any it
  #
  insert: (arr, it) ->
    array.insert_cst(arr, it, uid.sort_asc)


#
# Wraps uid helper with uid.stamp function as its root.
#
return oop.install_head(uid, uid.stamp)

