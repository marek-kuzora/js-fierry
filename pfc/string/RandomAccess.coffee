group '/string.access'


group 'char-code-at'

test '   250 chars',
  before: ->
    @str = gen.big_string(250)
    @len = @str.length - 1
  run: ->
    @str.charCodeAt(math.rand(@len))

test ' 2 500 chars',
  before: ->
    @str = gen.big_string(2500)
    @len = @str.length - 1
  run: ->
    @str.charCodeAt(math.rand(@len))

test '25 000 chars',
  before: ->
    @str = gen.big_string(25000)
    @len = @str.length - 1
  run: ->
    @str.charCodeAt(math.rand(@len))


group 'char-at'

test '   250 chars',
  before: ->
    @str = gen.big_string(250)
    @len = @str.length - 1
  run: ->
    @str.charAt(math.rand(@len))

test ' 2 500 chars',
  before: ->
    @str = gen.big_string(2500)
    @len = @str.length - 1
  run: ->
    @str.charAt(math.rand(@len))

test '25 000 chars',
  before: ->
    @str = gen.big_string(25000)
    @len = @str.length - 1
  run: ->
    @str.charAt(math.rand(@len))


group 'direct'

test '   250 chars',
  before: ->
    @str = gen.big_string(250)
    @len = @str.length - 1
  run: ->
    @str[math.rand(@len)]


test ' 2 500 chars',
  before: ->
    @str = gen.big_string(2500)
    @len = @str.length - 1
  run: ->
    @str[math.rand(@len)]


test '25 000 chars',
  before: ->
    @str = gen.big_string(25000)
    @len = @str.length - 1
  run: ->
    @str[math.rand(@len)]

