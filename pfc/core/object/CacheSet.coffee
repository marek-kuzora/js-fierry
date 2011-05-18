group
  name: 'object.cache.set'

test
  name: 'random_int'
  before: ->
    @i = 0
    @cache = {}
    @max = 100000
    @ints = gen.int_array(100000, 20)
  run: ->
    @cache[@ints[@i++ % @max]] = true

test
  name: 'core.uid'
  before: ->
    @cache = {}
  run: ->
    @cache[core.uid({})] = true

test
  name: 'random_string'
  before: ->
    @i = 0
    @cache = {}
    @max = 100000
    @strings = gen.string_array(100000, 10)
  run: ->
    @cache[@strings[@i++ % @max]] = true

test
  name: 'prefix_string'
  before: ->
    @i = 0
    @cache = {}
    @max = 100000
    @prefix = 'asdfg'
    @strings = gen.string_array(100000, 5)
  run: ->
    @cache[@prefix + @strings[@i++ % @max]] = true

test
  name: 'yui_stamp'
  before: ->
    @i = 0
    @cache = {}
    @stamp = Env.stamp({})
  run: ->
    @cache[@stamp + @i++] = true
