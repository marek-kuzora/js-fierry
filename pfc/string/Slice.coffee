#
# Exactly same performance as string.substr
#
group '/string.slice'

test '   25 chars',
  before: ->
    @i = 0
    @str = gen.big_string(25)
    @len = @str.length - 1
  run: ->
    @str.slice(@i++ % @len)

test '  250 chars',
  before: ->
    @i = 0
    @str = gen.big_string(250)
    @len = @str.length - 1
  run: ->
    @str.slice(@i++ % @len)

test '2 500 chars',
  before: ->
    @i = 0
    @str = gen.big_string(2500)
    @len = @str.length - 1
  run: ->
    @str.slice(@i++ % @len)

test '   25 chars -10-length',
  before: ->
    @i = 0
    @str = gen.big_string(25)
    @len = @str.length - 11
  run: ->
    inx = @i++ % @len
    @str.slice(inx, inx+10)

test '  250 chars -10-length',
  before: ->
    @i = 0
    @str = gen.big_string(250)
    @len = @str.length - 11
  run: ->
    inx = @i++ % @len
    @str.slice(inx, inx+10)

test '2 500 chars -10-length',
  before: ->
    @i = 0
    @str = gen.big_string(2500)
    @len = @str.length - 11
  run: ->
    inx = @i++ % @len
    @str.slice(inx, inx+10)


