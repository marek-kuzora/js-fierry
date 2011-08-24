group '/string.search'

test 'string',
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    @str.search('path')

test 'regexp',
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    @str.search(/\./)

test 'regexp_or',
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    @str.search(/(\.|\{)/)
