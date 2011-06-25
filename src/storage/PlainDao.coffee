class dao.Plain extends storage.NotifyPoint

  constructor: (@_str, @_array, @_storage) ->
    super
    @_update()

  # I would like to cache retrieved value and update on each change
  # But I don't know how to cope with indirect expressions...
  get: (arr, no_evaluate) ->
    v = @_storage.get(@_array)

    if dao.is(v) and not no_evaluate
      v = v.get(arr)

    if arr
      arr.push(this)

    return v

  set: (nv, no_evaluate) ->
    unless no_evaluate
      v = @_storage.get(@arr)

      if dao.is(v)
        return v.set(nv, no_evaluate)

    @_storage.set(@_array, @_str, nv)

  _update: ->
    @_storage.register(@_array, @str, @_refresh)

  _refresh: =>
    @set_dirty()
