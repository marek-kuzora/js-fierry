class dao.Complex extends dao.Plain

  constructor: (str, array, storage) ->
    @_nested = ((np if dao.is(np)) for np in array)
    @_registered = false

    super

    for np in @_nested
      np.register(@_update) if np

  _update: =>
     if @_registered
       @_storage.unregister(@_array, @set_dirty, @_str)

     for np, i in @_nested
       @_array[i] = np.get() if np

     @_str = @_array.join('.')
     @_storage.register(@_array, @_str, @set_dirty)
     @_registered = true

     @set_dirty()
