class dao.Complex extends dao.Plain

  constructor: (_, @_nested, @_storage) ->
    @_recompile()

    for e in @_nested
      e.register(@_on_nested_change) if dao.is(e)

    super(@_str, @_array, @_storage)
    return

  _on_nested_change: =>
    @_storage.unregister(@_array, @_str, @_on_change)
    @_recompile()
    @_storage.register(@_array, @_str, @_on_change)
    @_on_change()

  _recompile: ->
    @_array = for e in @_nested
      if dao.is(e) then e.get() else e

    @_str = @_array.join('.')
