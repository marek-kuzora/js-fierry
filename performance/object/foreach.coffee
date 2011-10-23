group '/object.foreach',
  before: ->
    @i = 0
    @o = {a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j'}

test 'for-in',
  run: ->
    (@i++ if v) for k, v of @o
    return

test 'keys',
  run: ->
    keys = Object.keys(@o)
    (@i++ if @o[k]) for k in keys
    return
