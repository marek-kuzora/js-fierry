cls = require '/source/core/emitter'

group '/create.instanceof'

test 'class -true',
  before: ->
    @o = new cls()
  run: ->
    @o instanceof cls

test 'class -false',
  before: ->
    @o = new cls()
  run: ->
    @o instanceof String

test 'string',
  run: ->
    'a' instanceof cls

