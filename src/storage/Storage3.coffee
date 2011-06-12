class pkg.Storage3

  constructor: ->
    @_nps = {}
    @_rules = {}

  register_rule: (arr) ->
    assert app.is_stopped(), 'Application should be stopped'
    object.set(@_rules, arr, new Boolean(true))

  _get_np: (arr, str) ->
    str = arr.join('.') unless str

    return @_nps[str] ?= do =>
      np = @_get_np_path(arr)
      @_nps[np] ?= new pkg.NotifyPoint()

  # Brak obslugi * w pathu...
  _get_np_path: (arr) ->
    tmp = ''
    path = ''
    rules = @_rules

    for a in arr
      break if rules[a] == undefined # Najwiecej czasu zabiera!!
      rules = rules[a]
      
      tmp += if tmp then '.' + a else a
      path = tmp if rules == true
    return path
