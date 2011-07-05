group
  name: 'object.cache.get'

test
  name: ' 25 000'
  before: ->
    @i = 0
    @max = 25000
    @strings = gen.string_array(25000, 10)

    @cache = {}
    @cache[str] = str for str in @strings
  run: ->
    @cache[@strings[@i++ % @max]]

test
  name: ' 50 000'
  before: ->
    @i = 0
    @max = 50000
    @strings = gen.string_array(50000, 10)

    @cache = {}
    @cache[str] = str for str in @strings
  run: ->
    @cache[@strings[@i++ % @max]]


test
  name: '100 000'
  before: ->
    @i = 0
    @max = 100000
    @strings = gen.string_array(100000, 10)

    @cache = {}
    @cache[str] = str for str in @strings
  run: ->
    @cache[@strings[@i++ % @max]]

test
  name: 'prefix_string'
  before: ->
    @i = 0
    @max = 100000
    @strings = ('..' + str for str in gen.string_array(100000, 10))

    @cache = {}
    @cache[str] = str for str in @strings
  run: ->
    @cache[@strings[@i++ % @max]]
