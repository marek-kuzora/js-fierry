class Class

group '/function.view'
  before: ->
    @v0 = ->
    @v1 = ->
    @v2 = ->
    @n0 = -> []

test 'inside -arr'
  before: ->
    @n = ->
      v = ->
      n1 = ->
        v = ->
        n = -> []
        arr = []
        arr[0] = new Class('type', v, n)
        return arr
      n2 = ->
        v = ->
        n = ->
        arr = []
        arr[0] = new Class('type', v, n)
        return arr
      arr = []
      arr[0] = new Class('type', v, n1)
      arr[1] = new Class('type', v, n2)
      return arr
  run: ->
    @n()

test 'inside -arr-push'
  before: ->
    @n = ->
      v = ->
      n1 = ->
        v = ->
        n = -> []
        arr = []
        arr.push(new Class('type', v, n))
        return arr
      n2 = ->
        v = ->
        n = ->
        arr = []
        arr.push(new Class('type', v, n))
        return arr
      arr = []
      arr.push(new Class('type', v, n1))
      arr.push(new Class('type', v, n2))
      return arr
  run: ->
    @n()

# Przy takim drukowaniu to wlasciwie nie potrzebuje buildera ;>
#
# Przy kazdym run nastepuje utworzenie 2x Akcji i 4x funkcji. 
#   - Funkcje beda w miare skomplikowane - create kazdej z nich to 14k ops/ms. 
test 'inside -1'
  before: ->
    @n = ->
      arr = []
      arr.push(new Class('type', (->), ->
        arr = []
        arr.push(new Class('type', (->), -> []))
        return arr
      ))
      arr.push(new Class('type', (->), ->
        arr = []
        arr.push(new Class('type', (->), -> []))
        return arr
      ))
      return arr
  run: ->
    @n()

test 'inside -1 -for'
  before: ->
    @n = ->
      arr = []
      arr.push(new Class('type', (->), ->
        arr = []
        arr.push(new Class('type', (->), -> []))
        return arr
      ))
      for i in [1..1]
        arr.push(new Class('type', (->), ->
          arr = []
          arr.push(new Class('type', (->), -> []))
          return arr
        ))
      return arr
  run: ->
    @n()

test 'inside -1 -if'
  before: ->
    @n = ->
      arr = []
      arr.push(new Class('type', (->), ->
        arr = []
        arr.push(new Class('type', (->), -> []))
        return arr
      ))
      if 1 < 2
        arr.push(new Class('type', (->), ->
          arr = []
          arr.push(new Class('type', (->), -> []))
          return arr
        ))
      return arr
  run: ->
    @n()

test 'inside -arr-literal'
  before: ->
    @n = ->
      v = ->
      n1 = ->
        v = ->
        n = -> []
        return [
          new Class('type', v, n)
        ]
      n2 = ->
        v = ->
        n = ->
        return [
          new Class('type', v, n)
        ]
      return [
        new Class('type', v, n1)
        new Class('type', v, n2)
      ]
  run: ->
    @n()

###
test 'outside'
  before: ->
    v0 = ->
    v1 = ->
    v2 = ->
    n0 = ->
    n1 = ->
      return [
        new Class('type', v1, n0)
      ]
    n2 = ->
      return [
        new Class('type', v1, n0)
      ]
    @n = ->
      return [
        new Class('type', v0, n1)
        new Class('type', v0, n2)
        new Class('type', v0, n0)
      ]
  run: ->
    @n()

test 'outside -arr'
  before: ->
    v1 = ->
    v2 = ->
    n0 = ->
    n1 = ->
      arr = []
      arr[0] = new Class('type', v1, n0)
      return arr
    n2 = ->
      arr = []
      arr[0] = new Class('type', v2, n0)
      return arr
    v0 = ->
    @n = ->
      arr = []
      arr[0] = new Class('type', v0, n1)
      arr[1] = new Class('type', v0, n2)
      return arr
  run: ->
    @n()

# Jak moge tutaj modelowac ify oraz fory??
###
