group '/string.concat'

test '1 char',
  before: ->
    @a = 'a'
    @b = 'b'
  run: ->
    str = @a + @b

test '5 chars',
  before: ->
    @a = 'abcde'
    @b = 'fghij'
  run: ->
    str = @a + @b

test '25 chars',
  before: ->
    @a = 'abcdeabcdeabcdeabcdeabcde'
    @b = 'fghijfghijfghijfghijfghij'
  run: ->
    str = @a + @b

test 'big',
  before: ->
    @str = ''
  run: ->
    @str += 'a'
