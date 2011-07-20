#
# Currently object discovering is very slow.
# Of course, any type discovering of any non primitive will also be slow.
#
group '/utils.lang'

test 'bool',
  before: ->
    @o = true
  run: ->
    core.type @o

test 'int',
  before: ->
    @o = 12
  run: ->
    core.type @o

test 'string',
  before: ->
    @o = 'string'
  run: ->
    core.type @o

test 'function',
  before: ->
    @o = ->
  run: ->
    core.type @o

test 'null',
  before: ->
    @o = null
  run: ->
    core.type @o

test 'undefined',
  before: ->
    @o = undefined
  run: ->
    core.type @o

test 'array',
  before: ->
    @o = []
  run: ->
    core.type @o

test 'object',
  before: ->
    @o = {}
  run: ->
    core.type @o

test 'regexp',
  before: ->
    @o = /regexp/
  run: ->
    core.type @o
