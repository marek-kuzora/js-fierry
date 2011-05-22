#
# TODO refactor into better cases
# There should be tests for creating all kinds of structures - empty, existing, etc
# - objects, classes, arrays, primitives, object-primitives, etc
#
# Also hash cloning needs to be refactored into another file - more possibilities!
#
group
  name: 'object.create'

group
  name: 'object.create.emtpy'

test
  name: 'hash'
  before: ->
    @arr = []
  run: ->
    @arr.push {}

test
  name: 'Object.create'
  before: ->
    @arr = []
  run: ->
    @arr.push Object.create({})

group
  name: 'object.create.simple'

test
  name: 'hash'
  before: ->
    @arr = []
  run: ->
    @arr.push {a: 'a', b: 'b', c: 12, d: 12.04}

test
  name: 'Object.create'
  before: ->
    @arr = []
  run: ->
    @arr.push Object.create({a: 'a', b: 'b', c: 12, d: 12.04})


test
  name: 'clone hash'
  before: ->
    @a = {a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j'}
  run: ->
    @b = {}
    @b[k] = v for k, v of @a
    return

test
  name: 'clone explicit'
  before: ->
    @a = {a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j'}
  run: ->
    @b = {}
    @b.a = 'a'
    @b.b = 'b'
    @b.c = 'c'
    @b.d = 'd'
    @b.e = 'e'
    @b.f = 'f'
    @b.g = 'g'
    @b.h = 'h'
    @b.i = 'i'
    @b.j = 'j'
