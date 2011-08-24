#
# Finding 'last' element is similar to element not found.
# LastIndexOf seems to be faster with finding its 'first' element
#
group '/string.indexOf',
  before: ->
    @str = 'simple.path.with.five.parts'


group 'forward'

test '25 chars -fast-found',
  run: ->
    @str.indexOf('simple') != -1

test '25 chars -end-found',
  run: ->
    @str.indexOf('parts') != -1

test '25 chars -not_found',
  run: ->
    @str.indexOf('---') != -1


group 'backward'

test '25 chars -fast-found',
  run: ->
    @str.lastIndexOf('parts') != -1

test '25 chars -end-found',
  run: ->
    @str.lastIndexOf('simple') != -1

test '25 chars -not-found',
  run: ->
    @str.lastIndexOf('---') != -1
