#
# Data Storage class definition.
# One instance always exists as global storage.
# There can be unlimited number of local storage instances.
#
class core.Storage

  constructor: ->
    @_nps = {}
    @_root = {}
    @_daos = {}
    @_rules = {}

  #
  # Returns value from the path.
  # If the path does not exist, returns undefined.
  #
  # @param Array arr
  #
  get: (arr) ->
    return object.get(@_root, arr)

  #
  # Sets value at the end of the path.
  # If path does not exist, creates it.
  # Sets listeners corresponding to the given path as dirty.
  #
  # @param Array arr
  # @param String str
  # @param Any v
  #
  set: (arr, str, v) ->
    object.set(@_root, arr, v)
    @_get_np(arr, str).set_dirty() if app.is_running()

  #
	# Registers listener for the given path.
  #
  # @param Array arr
  # @param String str
	# @param Function fn
	#
  register: (arr, str, fn) ->
    @_get_np(arr, str).register(fn)

  #
	# Unregisters listener from the given path.
  #
  # @param Array arr
  # @param String str
	# @param Function fn
	#
  unregister: (arr, str, fn) ->
    @_get_np(arr, str).unregister(fn)

  #
  # Disables notifications of matching NotifyPoint.
  #
  # @param Array arr
  # @param String str
  #
  disable_notify: (arr, str) ->
    @_get_np(arr, str).set_enabled(false)

  #
  # Enables notifications of matching NotifyPoint.
  #
  # @param Array arr
  # @param String str
  #

  enable_notify: (arr, str) ->
    @_get_np(arr, str).set_enabled(true)

  #
  # Returns NotifyPoint for the given path.
  #
  # @param Array arr
  # @param String str
  #
  _get_np: (arr, str) ->
    str = arr.join('.') unless str

    return @_nps[str] ?= do =>
      np = @_get_np_path(arr[0], str)
      @_nps[np] ?= new pkg.NotifyPoint()

  #
	# Returns path to the closest NotifyPoint available.
  #
	# @param String head
  # @param String raw
  #
  _get_np_path: (head, raw) ->
    max = ''
    rules = @_rules[head]

    if rules
      for rule in rules
        tmp = raw.match(rule)
        max = tmp[0] if tmp and tmp[0].length > max.length

    return max || head

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
  # Returns dao from the cache.
  #
  # @param String key - string path _with_ leading dots.
  #
  retrieve_dao: (key) ->
    return @_daos[key]

  #
  # Creates and caches dao if not found.
  #
  # @param Boolean g  - true if the path is global.
  # @param String str - string path _without_ leading dots.
  # @param Array arr  - compiled array path.
  #
  create_dao: (key, g, str, arr) ->
    return @_daos[key] ?= @_strategy_create(g, str, arr, @)

  #
  # Creates the appropriate dao instance.
  #
  # @param String str
  # @param Array arr
  # @param core.Storage storage
  #
  _strategy_create: (g, str, arr, storage) ->
    storage = pkg.STORAGE_INSTANCE if g
    
    return new dao.Complex(arr, storage) if @_is_complex(str)
    return new dao.Plain(str, arr, storage)

  #
  # Returns true if String representation of the path is complex.
  #
  # @param String str
  #
  _is_complex: (str) ->
    return str.indexOf('{') isnt -1

  _clear: ->
    @_nps = {}
    @_root = {}
    @_daos = {}
    @_rules = {}
