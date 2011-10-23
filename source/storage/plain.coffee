Emitter = require '../async/emitter'


#
# Internal class representing the current storage value under
# the specified path. Enables clients to get / set / listen for
# changes of the value presented by underlying storage path.
#
return class Plain extends Emitter

  constructor: (@_str, @_array, @_storage) ->
    @_storage.subscribe(@_array, @_str, @_on_change)

  #
  # Listenr binded with PlainDao instance. Will trigger whenever
  # value from the underlying storage path changes.
  #
  _on_change: =>
    @_value = @_storage.get(@_array)
    @dispatch()

  #
  # Returns value from the underlying storage path.
  #
  get: ->
    return @_value ?= @_storage.get(@_array)

  #
  # Sets new value under the underlying storage path.
  #
  # @param Any nv
  #
  set: (nv) ->
    @_storage.set(@_array, @_str, nv)
