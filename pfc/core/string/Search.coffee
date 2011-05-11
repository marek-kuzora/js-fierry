group
  name: 'string.search'

test
  name: 'string'
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    @str.search('path')

test
  name: 'regexp'
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    @str.search(/\./)

test
  name: 'regexp_or'
  before: ->
    @str = 'simple.path.with.five.parts'
  run: ->
    @str.search(/(\.|\{)/)
