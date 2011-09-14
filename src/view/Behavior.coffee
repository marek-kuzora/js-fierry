class pkg.Behavior

  constructor: ->
    @_bcache = {}

  create: ->

  update: ->

  finalize: ->

  dispose: ->

  get_behavior: -> null

  get_cached_behavior: (type) ->
    return @_bcache[type] ?= @get_behavior(type)
