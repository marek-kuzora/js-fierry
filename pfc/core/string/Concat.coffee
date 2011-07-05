group
  name: 'string.concat'

test
  name: '1 char'
  before: ->
    @a = 'a'
    @b = 'b'
  run: ->
    str = @a + @b

test
  name: '5 chars'
  before: ->
    @a = 'abcde'
    @b = 'fghij'
  run: ->
    str = @a + @b

test
  name: '25 chars'
  before: ->
    @a = 'abcdeabcdeabcdeabcdeabcde'
    @b = 'fghijfghijfghijfghijfghij'
  run: ->
    str = @a + @b

test
  name: 'big'
  before: ->
    @str = ''
  run: ->
    @str += 'a'
