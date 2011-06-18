#
# Currently array discovering is slightly slow and object discovering is very slow.
# Of course, any type discovering of any non primitive will also be slow.
#
group
  name: 'utils.lang'

test
  name: 'bool'
  before: ->
    @o = true
  run: ->
    core.type @o

test
  name: 'int'
  before: ->
    @o = 12
  run: ->
    core.type @o


test
  name: 'string'
  before: ->
    @o = 'string'
  run: ->
    core.type @o

test
  name: 'array'
  before: ->
    @o = []
  run: ->
    core.type @o

test
  name: 'object'
  before: ->
    @o = {}
  run: ->
    core.type @o

test
  name: 'regexp'
  before: ->
    @o = /regexp/
  run: ->
    core.type @o

test
  name: 'function'
  before: ->
    @o = ->
  run: ->
    core.type @o

test
  name: 'null'
  before: ->
    @o = null
  run: ->
    core.type @o

test
  name: 'undefined'
  before: ->
    @o = undefined
  run: ->
    core.type @o

