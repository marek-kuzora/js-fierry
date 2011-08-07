#
# Internal class representing the current storage value under
# the specified path. Enables clients to get / set / listen for
# changes of the value presented by underlying storage path.
#
class dao.Plain extends storage.NotifyPoint

  constructor: (@_str, @_array, @_storage) ->
    super()
    storage.register(@_array, @_str, @_on_change)

  #
  # Listenr binded with PlainDao instance. Will trigger whenever
  # value from the underlying storage path changes.
  #
  _on_change: =>
    @_value = @_storage.get(@_array)
    @set_dirty()

  #
  # Returns value from the underlying storage path.
  #
  get: ->
    return @_value ?= storage.get(@_array)

  #
  # Sets new value under the underlying storage path.
  #
  # @param Any nv
  #
  set: (nv) ->
    storage.set(@_array, @_str, nv)
