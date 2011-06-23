group
  name: 'string.split'

test
  name: 'to_array'
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    @str.split('')

test
  name: 'character'
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    @str.split('.')

test
  name: 'regexp'
  before: ->
    @str = 'simple.path/with.six.parts/yep'
  run: ->
    @str.split(/\/|\./)

test
  name: 'double'
  before: ->
    @str = 'simple.path/with.six.parts/yep'
  run: ->
    arr = @str.split('/')
    str.split('.') for str in arr
