#
# Finding 'last' element is similar to element not found.
# LastIndexOf seems to be faster with finding its 'first' element
#
group
  name: 'string.index_of'

test
  name: 'start'
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    @str.indexOf('simple') != -1

test
  name: 'start -last'
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    @str.lastIndexOf('parts') != -1

test
  name: 'end'
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    @str.indexOf('parts') != -1

test
  name: 'end -last'
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    @str.lastIndexOf('simple') != -1

test
  name: 'not_found'
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    @str.indexOf('---') != -1

test
  name: 'not_found -last'
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    @str.lastIndexOf('---') != -1
