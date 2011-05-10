group
  name: 'string.access'

group
  name: 'string.access.char-code-at'

test
  name: '   250 chars'
  before: ->
    @str = gen.big_string(250)
    @len = @str.length - 1
  run: ->
    @str.charCodeAt(core.rand(@len))

test
  name: ' 2 500 chars'
  before: ->
    @str = gen.big_string(2500)
    @len = @str.length - 1
  run: ->
    @str.charCodeAt(core.rand(@len))

test
  name: '25 000 chars'
  before: ->
    @str = gen.big_string(25000)
    @len = @str.length - 1
  run: ->
    @str.charCodeAt(core.rand(@len))

group
  name: 'string.access.char-at'

test
  name: '   250 chars'
  before: ->
    @str = gen.big_string(250)
    @len = @str.length - 1
  run: ->
    @str.charAt(core.rand(@len))

test
  name: ' 2 500 chars'
  before: ->
    @str = gen.big_string(2500)
    @len = @str.length - 1
  run: ->
    @str.charAt(core.rand(@len))

test
  name: '25 000 chars'
  before: ->
    @str = gen.big_string(25000)
    @len = @str.length - 1
  run: ->
    @str.charAt(core.rand(@len))


group
  name: 'string.access.direct'

test
  name: '   250 chars'
  before: ->
    @str = gen.big_string(250)
    @len = @str.length - 1
  run: ->
    @str[core.rand(@len)]


test
  name: ' 2 500 chars'
  before: ->
    @str = gen.big_string(2500)
    @len = @str.length - 1
  run: ->
    @str[core.rand(@len)]


test
  name: '25 000 chars'
  before: ->
    @str = gen.big_string(25000)
    @len = @str.length - 1
  run: ->
    @str[core.rand(@len)]

