group '/string.match'

test 'regexp -same',
  before: ->
    @str = 'menu.items.0'
    @regexp = /^menu\.items\.[a-zA-Z0-9_]+/
  run: ->
    @str.match(@regexp)

test 'regexp -dynamic',
  before: ->
    @i = 0
    @max = 50000
    @arr = 'menu.items.' + i for i in [0..50000]
    @regexp = /^menu\.items\.[a-zA-Z0-9_]+/
  run: ->
    @arr[@i % @max].match(@regexp)


test 'regexp_from_string',
  before: ->
    @str = 'menu.items.0'
    @regexp = new RegExp("^menu\.items\.[a-zA-Z0-9_]+")
  run: ->
    @str.match(@regexp)

test 'string',
  before: ->
    @str = 'menu.items.0'
    @regexp = '^menu\.items\.[a-zA-Z0-9_]+'
  run: ->
    @str.match(@regexp)
