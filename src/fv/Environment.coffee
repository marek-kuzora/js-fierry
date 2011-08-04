#
# Stack based storage, where stack's nodes behave as a simple cache.
# Each storage node is independent from the other nodes.
# New nodes are added as a copy of previously current storage node.
#
# Environment is fast when operating on small set of different keys 
# (around 20). Having more will degradate the push_node() performance.
#

# Env mocno zalezy od zaglebienia! Wiele wywolan == duzy koszt! :/
class pkg.Environment

  constructor: (@_arr = []) ->
    @_uid  = 0
    @_keys = {}
    @_vars = [@_arr]

  #
  # Pushes new storage node on the stack. The storage contains initialy 
  # all items that the parent storage contained.
  #

  # Wydajnosc zalezy od zaglebienia! ;/
  # FIXME to mi wyglada na 5k/ms zamiast 10k/ms...
  push_node: ->
    @_vars.push(@_arr = @_arr.slice())

  #
  # Pops storage node from the stack. Sets current storage node as 
  # the top existing storage node.
  #
  pop_node: ->
    @_vars.pop()
    @_arr = @_vars[@_vars.length - 1]

  #
  # Returns current storage node.
  #
  get_node: ->
    return @_arr

  #
  # Sets new value to the current storage node.
  #
  # @param String key
  # @param Any value
  #
  set: (k, v) ->
    i = @_keys[k] ?= @_uid++
    @_arr[i] = v

  #
  # Gets value corresponding to the given key from the current 
  # storage node. Will return undefined if the value is not set.
  #
  # @param String key
  #
  get: (k) ->
    i = @_keys[k]
    return @_arr[i]
