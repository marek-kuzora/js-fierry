group
  name: 'string.substr'

test
  name: '   25 chars'
  before: ->
    @i = 0
    @str = gen.big_string(25)
    @len = @str.length - 1
  run: ->
    @str.substr(@i++ % @len)

test
  name: '  250 chars'
  before: ->
    @i = 0
    @str = gen.big_string(250)
    @len = @str.length - 1
  run: ->
    @str.substr(@i++ % @len)

test
  name: '2 500 chars'
  before: ->
    @i = 0
    @str = gen.big_string(2500)
    @len = @str.length - 1
  run: ->
    @str.substr(@i++ % @len)

test
  name: '   25 chars -10-length'
  before: ->
    @i = 0
    @str = gen.big_string(25)
    @len = @str.length - 11
  run: ->
    @str.substr(@i++ % @len, 10)

test
  name: '  250 chars -10-length'
  before: ->
    @i = 0
    @str = gen.big_string(250)
    @len = @str.length - 11
  run: ->
    @str.substr(@i++ % @len, 10)

test
  name: '2 500 chars -10-length'
  before: ->
    @i = 0
    @str = gen.big_string(2500)
    @len = @str.length - 11
  run: ->
    @str.substr(@i++ % @len, 10)

