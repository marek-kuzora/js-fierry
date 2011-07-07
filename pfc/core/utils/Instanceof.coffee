group
  name: 'utils.instanceof'

test
  name: 'class -true'
  before: ->
    @o = new core.Event()
  run: ->
    @o instanceof core.Event

test
  name: 'class -false'
  before: ->
    @o = new core.Event()
  run: ->
    @o instanceof core.Runtime

test
  name: 'string'
  run: ->
    'a' instanceof core.Event
