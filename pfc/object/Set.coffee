group '/object.set',
  before: ->
    @i = 0
    @max = 100000
    @arr = gen.string_array(@max, 5)


group 'new'


group 'new.string'

test 'depth-1',
  before: ->
    @o = {a: 'a', b: 'b', c: 'c'}
  run: ->
    object.set(@o, [@arr[@i % @max]], 'd')

test 'depth-2',
  before: ->
    @o = {a: 'a', b: {d: 'd', e: 'e'}, c: 'c'}
  run: ->
    object.set(@o, ['b', @arr[@i % @max]], 'f')

test 'depth-3',
  before: ->
    @o = {a: 'a', b: {d: {f: 'f', g: 'g'}, e: 'e'}, c: 'c'}
  run: ->
    object.set(@o, ['b', 'd', @arr[@i % @max]], 'h')


#
# Adding new property to the object.
#
group 'new.int'
  
test 'depth-1',
  before: ->
    @o = {a: 'a', b: 'b', c: 'c'}
  run: ->
    object.set(@o, [@i++], 'd')

test 'depth-2',
  before: ->
    @o = {a: 'a', b: {d: 'd', e: 'e'}, c: 'c'}
  run: ->
    object.set(@o, ['b', @i++], 'f')

test 'depth-3',
  before: ->
    @o = {a: 'a', b: {d: {f: 'f', g: 'g'}, e: 'e'}, c: 'c'}
  run: ->
    object.set(@o, ['b', 'd', @i++], 'h')


#
# Changing existing object's property.
#
group 'change'

test 'depth-1',
  before: ->
    @o = {a: 'a', b: 'b', c: 'c'}
  run: ->
    object.set(@o, ['c'], @i++)

test 'depth-2',
  before: ->
    @o = {a: 'a', b: {d: 'd', e: 'e'}, c: 'c'}
  run: ->
    object.set(@o, ['b', 'd'], @i++)

test 'depth-3',
  before: ->
    @o = {a: 'a', b: {d: {f: 'f', g: 'g'}, e: 'e'}, c: 'c'}
  run: ->
    object.set(@o, ['b', 'd', 'g'], @i++)


#
# Setting property on empty object.
#
group 'empty'

test 'depth-2',
  run: ->
    object.set({}, ['a', 'b'], true)

test 'depth-3',
  run: ->
    object.set({}, ['a', 'b', 'c'], true)

test 'depth-4',
  run: ->
    object.set({}, ['a', 'b', 'c', 'd'], true)

test 'depth-5',
  run: ->
    object.set({}, ['a', 'b', 'c', 'd', 'e'], true)

