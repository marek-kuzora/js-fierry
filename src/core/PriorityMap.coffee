#
# Class providing map functionality and enabling to hide its 
# values by the higher priority. For performance reasons,
# the priority should be relatively low.
#
class core.PriorityMap

  #
  # Returns the map's value for the given key. If there are many
  # possible values, will return the value that were set with 
  # the highest priority.
  #
  # @param String key
  #
  get: (key) ->
    arr = @_arr(key)
    return arr[arr.length - 1]
  
  # Returns all map's values assigned to the given key. Please
  # note that it is likely for the array to contain many
  # undefined values as its items - these should be ignored.
  # Also, this method assumes that the array will not be 
  # changed in the client.
  #
  # @param String key
  #
  get_all: (key) ->
    return @_arr(key)
  
  #
  # Puts value into the map under the given key. If the map
  # already contains assigned value with exactly the same
  # priority, the older value will be overrided and unrecoverable.
  #
  # @param String key
  # @param Any value
  # @param Integer priority
  #
  set: (key, value, priority) ->
    arr = @_arr(key)
    arr[priority] = value

    return priority is arr.length - 1

  #
  # Removes value from the map for the given key and priority.
  # If that value had assigned the highest priority available for
  # the given key, then the internal key's array is shrank to
  # point at previously hidden value - and that operation is slow.
  #
  # @param String key
  # @param Integer priority
  #
  remove: (key, priority) ->
    arr = @_arr(key)
    arr[priority] = undefined

    if priority is l = arr.length - 1
      l-- while l > -1 and arr[l] is undefined
      arr.length = l + 1

      return true
    return false

  #
  # Returns the internal values array for the given key.
  #
  _arr: (key) ->
    @_map ?= {}
    return @_map[key] ?= []
