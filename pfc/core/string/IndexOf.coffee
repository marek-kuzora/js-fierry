#
# Finding 'last' element is similar to element not found.
# LastIndexOf seems to be faster with finding its 'first' element
#
group
  name: 'string.regexp.index-of'

group
  name: 'string.regexp.index-of.forward'

test
  name: '25 chars -fast-found'
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    @str.indexOf('simple') != -1

test
  name: '25 chars -end-found'
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    @str.indexOf('parts') != -1

test
  name: '25 chars -not_found'
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    @str.indexOf('---') != -1

group
  name: 'string.regexp.index-of.backward'

test
  name: '25 chars -fast-found'
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    @str.lastIndexOf('parts') != -1

test
  name: '25 chars -end-found'
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    @str.lastIndexOf('simple') != -1

test
  name: '25 chars -not-found'
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    @str.lastIndexOf('---') != -1

#
# These tests returns 14/45/20k ops/ms.
# It is unrealistic, because the smallest number of steps has the first test...
#
group
  name: 'string.regexp.index-of.code-at'

test
  name: '25 chars -fast-found'
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    string.char_index_of(@str, '.')
    return

test
  name: '25 chars -end-found'
  before: ->
    @str = 'simple.path.with.five.partX'
  run: ->
    string.char_index_of(@str, 'X')
    return

test
  name: '25 chars -not-found'
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    string.char_index_of(@str, '-')
    return
