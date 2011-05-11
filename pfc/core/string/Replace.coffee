group
  name: 'string.regexp.replace'

test
  name: '30 chars -0-replace'
  before: ->
    @str = '.xxx{.sasa{.fafa}gaga}cos{.xxx}'
  run: ->
    @str.replace(/\ /g, '')

test
  name: '30 chars -6-replace'
  before: ->
    @str = '.xxx{.sasa{.fafa}gaga}cos{.xxx}'
  run: ->
    @str.replace(/\{}/g, '')

