#
# Need to check reading from full string at once!
#

group
  name: 'string.charAt'

test
  name: '25 chars -function'
  before: ->
    @str = 'simple.path.with.five.parts'
    @len = @str.length - 1
  run: ->
    @str.charAt(core.rand(@len))

test
  name: '25 chars -direct'
  before: ->
    @str = 'simple.path.with.five.parts'
    @len = @str.length - 1
  run: ->
    @str[core.rand(@len)]

