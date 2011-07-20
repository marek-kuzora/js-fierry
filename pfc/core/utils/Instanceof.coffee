group '/utils.instanceof'

test 'class -true',
  before: ->
    @o = new core.Event()
  run: ->
    @o instanceof core.Event

test 'class -false',
  before: ->
    @o = new core.Event()
  run: ->
    @o instanceof core.Runtime

test 'string',
  run: ->
    'a' instanceof core.Event
