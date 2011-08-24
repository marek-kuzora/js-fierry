group '/string.split',
  before: ->
    @str = 'simple.path/with.six.parts/yep'

test 'to_array',
  run: ->
    @str.split('')

test 'character',
  run: ->
    @str.split('.')

test 'regexp',
  run: ->
    @str.split(/\/|\./)

test 'double',
  run: ->
    arr = @str.split('/')
    str.split('.') for str in arr
