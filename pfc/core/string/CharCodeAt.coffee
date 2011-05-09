#
# Need to check reading from full string at once!
#

group
  name: 'string.charCodeAt'

test
  name: '    25 chars'
  before: ->
    @str = 'simple.path.with.five.parts'
    @len = @str.length - 1
  run: ->
    @str.charCodeAt(core.rand(@len))

#
# Will be better to use a string generator, get first n results and join them into big string
#
test
  name: '   250 chars'
  before: ->
    @str = ''
    @str += 'simple.path.with.five.parts' for i in [0..10]
    @len = @str.length - 1
  run: ->
    @str.charCodeAt(core.rand(@len))

test
  name: ' 2 500 chars'
  before: ->
    @str = ''
    @str += 'simple.path.with.five.parts' for i in [0..100]
    @len = @str.length - 1
  run: ->
    @str.charCodeAt(core.rand(@len))

test
  name: '25 000 chars'
  before: ->
    @str = ''
    @str += 'simple.path.with.five.parts' for i in [0..1000]
    @len = @str.length - 1
  run: ->
    @str.charCodeAt(core.rand(@len))
