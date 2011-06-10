class pkg.Storage

  constructor: ->
    @_nps = {}
    @_root = {}
    @_rules = {}

  get: (arr) ->
    return object.get(@_root, arr)

  set: (arr, val) ->
    object.set(@_root, arr, val)
    @_get_np(arr).set_dirty() if app.is_running()

  register: (arr, fn) ->
    @_get_np(arr).register(fn)

  unregister: (arr, fn) ->
    @_get_np(arr).unregister(fn)

  register_rule: (path) ->
    assert app.is_stopped(), 'Application should be stopped'

    idx = path.indexOf('.')
    head = path.substr(0, if idx > 0 then idx else undefined)

    path = path.replace(/\./g, "\\.")
    path = path.replace(/\*/g, "[-a-zA-Z0-9_]+")
    path += "(?![-a-zA-Z0-9_])"

    @_rules[head] ?= []
    @_rules[head].push(new RegExp('^' + path))

  _get_np: (arr) ->
    path = @_get_np_path(arr)
    return @_nps[path] ?= new pkg.NotifyPoint()

  _get_np_path: (arr) ->
    max = ''
    rules = @_rules[arr[0]]

    if rules
      raw = arr.join('.')
      for rule in rules
        tmp = raw.match(rule)
        max = tmp[0] if tmp && tmp[0].length > max.length
    return max
