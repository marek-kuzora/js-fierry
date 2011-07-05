group
  name: 'object.cache.set'
  before: ->
    @i = 0
    @cache = {}
    @max = 100000

test
  name: 'random_int'
  before: ->
    @ints = gen.int_array(100000, 20)
  run: ->
    @cache[@ints[@i++ % @max]] = true

test
  name: 'core.uid'
  before: ->
  run: ->
    @cache[core.uid({})] = true

test
  name: 'random_string'
  before: ->
    @strings = gen.string_array(100000, 10)
  run: ->
    @cache[@strings[@i++ % @max]] = true

test
  name: 'prefix_string -2 chars'
  before: ->
    @strings = ('..' + str for str in gen.string_array(100000, 5))
  run: ->
    @cache[@strings[@i++ % @max]] = true

test
  name: 'prefix_string -5 chars'
  before: ->
    @strings = ('asdfg' + str for str in gen.string_array(100000, 5))
  run: ->
    @cache[@strings[@i++ % @max]] = true

test
  name: 'yui_stamp'
  before: ->
    @i = 0
    @cache = {}
    @stamp = Env.stamp({})
  run: ->
    @cache[@stamp + @i++] = true
