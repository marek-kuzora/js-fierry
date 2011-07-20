group '/create.object'

#
# Creating objects using simple hashes.
# Efficient enough when creating transport-only objects.
#
group 'hash'

test ' 0 length',
  run: ->
    h = {}

test ' 5 length',
  run: ->
    h = {a: 1, b: 2, c: 3, d: 4, e: 5}

test '10 length',
  run: ->
    h = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10}

#
# Creating objects with nested objects using hashes.
# Performance stands at 6-8k ops/ms which is slower than anticipated.
#
group 'nested'

test ' 5 length',
  run: ->
    h = {a: 1, b: 2, c: {c: 3}, d: 4, e: {e: 5}}

test '10 length',
  run: ->
    h = {a: 1, b: 2, c: {c: 3}, d: 4, e: {e: 5}, f: 6, g: 7, h: {h: 8}, i: 9, j: 10}


#
# Creating objects using Object.create().
# Provides poor performance.
#
group 'standard'

test ' 0 length',
  before: ->
    @h = {}
  run: ->
    Object.create(@h)

test ' 5 length',
  before: ->
    @h = {a: 1, b: 2, c: 3, d: 4, e: 5}
  run: ->
    Object.create(@h)

test '10 length',
  before: ->
    @h = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10}
  run: ->
    Object.create(@h)

#
# Creating object from predefined classes.
# Insane performance :)
#
group 'class'

test 'core.Event',
  run: ->
    o = new core.Event()

test '0 length -prototype',
  before: ->
    @cls = ->
    @cls.prototype = {}
  run: ->
    o = new @cls()

test '5 length -prototype',
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

test '2 length -prototype -nested',
  before: ->
    @anc = ->
    @anc.prototype =
      a: -> 'a'
      b: -> 'b'
    @cls = ->
    @cls.prototype = new @anc()
  run: ->
    o = new @cls()
