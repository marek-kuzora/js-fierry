group '/create.instanceof'

test 'class -true',
  before: ->
    @o = new core.App()
  run: ->
    @o instanceof core.App

test 'class -false',
  before: ->
    @o = new core.App()
  run: ->
    @o instanceof String

test 'string',
  run: ->
    'a' instanceof core.App
