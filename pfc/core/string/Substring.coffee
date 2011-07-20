group '/string.substr',
  before: ->
    @i = 0

test '   25 chars',
  before: ->
    @str = gen.big_string(25)
    @len = @str.length - 1
  run: ->
    @str.substr(@i++ % @len)

test '  250 chars',
  before: ->
    @str = gen.big_string(250)
    @len = @str.length - 1
  run: ->
    @str.substr(@i++ % @len)

test '2 500 chars',
  before: ->
    @str = gen.big_string(2500)
    @len = @str.length - 1
  run: ->
    @str.substr(@i++ % @len)

test '   25 chars -10-length',
  before: ->
    @str = gen.big_string(25)
    @len = @str.length - 11
  run: ->
    @str.substr(@i++ % @len, 10)

test '  250 chars -10-length',
  before: ->
    @str = gen.big_string(250)
    @len = @str.length - 11
  run: ->
    @str.substr(@i++ % @len, 10)

test '2 500 chars -10-length',
  before: ->
    @str = gen.big_string(2500)
    @len = @str.length - 11
  run: ->
    @str.substr(@i++ % @len, 10)

