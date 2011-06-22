class storage.Global extends storage.Abstract

  constructor: ->
    super()
    @_rules = {}

  #
  # Creates rule described by the raw.
  #
  # @param String raw
  #
  register_rule: (raw) ->
    assert app.is_stopped(), 'Application should be stopped'

    idx  = raw.indexOf('.')
    head = raw.substr(0, if idx > 0 then idx else undefined)

    raw  = raw.replace(/\./g, "\\.")
    raw  = raw.replace(/\*/g, "[-a-zA-Z0-9_]+")
    raw += "(?![-a-zA-Z0-9_])"

    @_rules[head] ?= []
    @_rules[head].push(new RegExp('^' + raw))

  #
  # Returns pkg.NotifyPoint for the given path.
  #
  # @param Array arr - path array representation.
  # @param String str - path string representation.
  #
  _get_np: (arr, str) ->
    str = arr.join('.') unless str

    return @_nps[str] ?= do =>
      np = @_get_np_path(arr[0], str)
      @_nps[np] ?= new pkg.NotifyPoint()

  #
	# Returns path to the closest pkg.NotifyPoint available.
  #
	# @param String head - path head.
  # @param String raw - path string representation.
  #
  _get_np_path: (head, raw) ->
    max = ''
    rules = @_rules[head]

    for rule in rules
      tmp = raw.match(rule)
      max = tmp[0] if tmp and tmp[0].length > max.length
    return max
