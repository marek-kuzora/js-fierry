#
# Currently object discovering is very slow.
# Of course, any type discovering of any non primitive will also be slow.
#
group '/utils.lang'

test 'bool',
  before: ->
    @o = true
  run: ->
    lang.boolean(@o)

test 'number',
  before: ->
    @o = 12
  run: ->
    lang.number(@o)

test 'string',
  before: ->
   @o = 'string'
  run: ->
    lang.string(@o)

test 'function',
  before: ->
    @o = ->
  run: ->
    lang.function(@o)

test 'array',
  before: ->
    @o = []
  run: ->
    lang.array(@o)

test 'object',
  before: ->
    @o = {}
  run: ->
    lang.object(@o)

test 'date',
  before: ->
    @o = new Date()
  run: ->
    lang.date(@o)

test 'regexp',
  before: ->
    @o = /regexp/
  run: ->
    lang.regexp(@o)
