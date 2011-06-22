group
  name: 'string.regexp.replace'

test
  name: '20 chars -1 replace'
  before: ->
    @str = 'aaa|bbb|ccc|ddd|eee|'
  run: ->
    @str.replace(/a/, '&')

test
  name: '30 chars -0 replace'
  before: ->
    @str = '.xxx{.sasa{.fafa}gaga}cos{.xxx}'
  run: ->
    @str.replace(/\ /g, '')

test
  name: '30 chars -6 replace'
  before: ->
    @str = '.xxx{.sasa{.fafa}gaga}cos{.xxx}'
  run: ->
    @str.replace(/\{/g, '')

