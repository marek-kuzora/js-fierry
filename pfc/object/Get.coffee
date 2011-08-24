group '/object.get'

#
# Accessing object using different length paths.
# Gets with longer paths lasts longer.
#
group 'standard'

test 'depth-1',
  before: ->
    @o = {a: 'a', b: 'b', c: 'c'}
  run: ->
    object.get(@o, ['b'])

test 'depth-2',
  before: ->
    @o = {a: 'a', b: {d: 'd', e: 'e'}, c: 'c'}
  run: ->
    object.get(@o, ['b', 'd'])

test 'depth-3',
  before: ->
    @o = {a: 'a', b: {d: {f: 'f', g: 'g'}, e: 'e'}, c: 'c'}
  run: ->
    object.get(@o, ['b', 'd', 'g'])

test 'depth-4',
  before: ->
    @o = {a: 'a', b: {d: {f: {h: 'h', i: 'i'}, g: 'g'}, e: 'e'}, c: 'c'}
  run: ->
    object.get(@o, ['b', 'd', 'f', 'i'])


#
# Accessing object using unexisting paths.
# There is big pfc loss when accessing undefined property.
#
group 'not-exist'

test 'depth-1',
  before: ->
    @o = {a: 'a', b: {d: {f: 'f', g: 'g'}, e: 'e'}, c: 'c'}
  run: ->
    object.get(@o, ['h', 'i', 'j'])

test 'depth-2',
  before: ->
    @o = {a: 'a', b: {d: {f: 'f', g: 'g'}, e: 'e'}, c: 'c'}
  run: ->
    object.get(@o, ['b', 'h', 'i'])

#
# Accessing array inside the object.
# All tests behaves just as the gets on pure objects - no surprises here.
#
group 'array'

test 'depth-2',
  before: ->
    @o = {a: ['a', 'b', 'c', 'd', 'e', 'f']}
  run: ->
    object.get(@o, ['a', '0'])

test 'depth-2 -array^2',
  before: ->
    @o = [0, 1, [0, 1, 2], 2]
  run: ->
    object.get(@o, ['2', '2'])

test 'depth-2 -int-path',
  before: ->
    @o = {a: ['a', 'b', 'c', 'd', 'e', 'f']}
  run: ->
    object.get(@o, ['a', 0])


test 'depth-3',
  before: ->
    @o = {a: {b: ['a', 'b', 'c', 'd', 'e', 'f']}}
  run: ->
    object.get(@o, ['a', 'b', '0'])

test 'depth-3 -array^2',
  before: ->
    @o = {a: ['a', ['b', 'c', 'd'], 'e', 'f']}
  run: ->
    object.get(@o, ['a', '1', '1'])

test 'depth-4',
  before: ->
    @o = {a: ['a', {b: [0, 1, 2, 3, 4]}, 'b', 'c']}
  run: ->
    object.get(@o, ['a', '1', 'b', '2'])
