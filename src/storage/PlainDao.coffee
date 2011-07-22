class dao.Plain extends storage.NotifyPoint

  constructor: (@_str, @_array, @_storage) ->
    super()
    @_date = new Date()
    @_storage.register(@_array, @_str, @_on_change)

  _on_change: =>
    @_date  = new Date()
    @_value = @_storage.get(@_array)

    @set_dirty()

  get: ->
    return @_value ?= @_storage.get(@_array)

  set: (nv) ->
    @_storage.set(@_array, @_str, nv)
