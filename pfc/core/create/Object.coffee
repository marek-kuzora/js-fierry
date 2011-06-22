#
# Creating objects using simple hashes.
# Efficient enough when creating transport-only objects.
#
group
  name: 'create.object'

group
  name: 'create.object.hash'

test
  name: ' 0 length'
  run: ->
    h = {}

test
  name: ' 5 length'
  run: ->
    h = {a: 1, b: 2, c: 3, d: 4, e: 5}

test
  name: '10 length'
  run: ->
    h = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10}

#
# Creating objects with nested objects using hashes.
# Performance stands at 6-8k ops/ms which is slower than anticipated.
#
group
  name: 'create.object.nested'

test
  name: ' 5 length'
  run: ->
    h = {a: 1, b: 2, c: {c: 3}, d: 4, e: {e: 5}}

test
  name: '10 length'
  run: ->
    h = {a: 1, b: 2, c: {c: 3}, d: 4, e: {e: 5}, f: 6, g: 7, h: {h: 8}, i: 9, j: 10}


#
# Creating objects using Object.create().
# Provides poor performance.
#
group
  name: 'create.object.standard'

test
  name: ' 0 length'
  before: ->
    @h = {}
  run: ->
    Object.create(@h)

test
  name: ' 5 length'
  before: ->
    @h = {a: 1, b: 2, c: 3, d: 4, e: 5}
  run: ->
    Object.create(@h)

test
  name: '10 length'
  before: ->
    @h = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10}
  run: ->
    Object.create(@h)

#
# Creating object from predefined classes.
# Insane performance :)
#
group
  name: 'create.object.class'

test
  name: 'core.Event'
  run: ->
    o = new core.Event()

test
  name: '0 length -prototype'
  before: ->
    @cls = ->
    @cls.prototype = {}
  run: ->
    o = new @cls()

test
  name: '5 length -prototype'
  before: ->
    @cls = ->
    @cls.prototype =
      a: -> 'a'
      b: -> 'b'
      c: -> 'c'
      d: -> 'd'
      e: -> 'e'
  run: ->
    o = new @cls()

test
  name: '2 length -prototype -nested'
  before: ->
    @anc = ->
    @anc.prototype =
      a: -> 'a'
      b: -> 'b'
    @cls = ->
    @cls.prototype = new @anc()
  run: ->
    o = new @cls()
