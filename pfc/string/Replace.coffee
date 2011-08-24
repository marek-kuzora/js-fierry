group '/string.replace'

test '20 chars -1 replace',
  before: ->
    @str = 'aaa|bbb|ccc|ddd|eee|'
  run: ->
    @str.replace(/a/, '&')

test '30 chars -0 replace',
  before: ->
    @str = '.xxx{.sasa{.fafa}gaga}cos{.xxx}'
  run: ->
    @str.replace(/\ /g, '')

test '30 chars -3 replace',
  before: ->
    @str = '.xxx{.sasa{.fafa}gaga}cos{.xxx}'
  run: ->
    @str.replace(/\{/g, '')
