class dao.Complex extends dao.Plain

  constructor: (str, storage, array) ->
    super

    @_nested = ((np if dao.is(np)) for np in @_array)
    @_registered = false
    @_update()

    for np in @_nested
      np.register(@_update) if np
        
  _update: =>
    if @_registered
      @_storage.unregister(@_array, @set_dirty, @_str)

    for np, i in @_nested
      @_array[i] = @get() if np
   
    @_str = @_array.join('.')
    @_storage.register(@_array, @set_dirty, @_str)
    @_registered = true

    @set_dirty()
