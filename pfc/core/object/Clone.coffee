group
  name: 'object.clone'

test
  name: 'for-in'
  before: ->
    @a = {a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j'}
  run: ->
    @b = {}
    @b[k] = v for k, v of @a
    return

test
  name: 'explicit'
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
