group '/function.execute'

test 'empty',
  before: ->
    @fn = ->
  run: ->
    @fn()

test 'number',
  before: ->
    @fn = -> 0
  run: ->
    @fn()

test 'string',
  before: ->
    @fn = -> 'string'
  run: ->
    @fn()

test 'function',
  before: ->
    @fn = -> -> 0
  run: ->
    @fn()

test 'array',
  before: ->
    @fn = -> []
  run: ->
    @fn()

test 'array > hash -1',
  before: ->
    @fn = ->
      return [
        uid: 1
        type: 'dummy'
      ]
  run: ->
    @fn()

test 'array > hash -1 -alternative',
  before: ->
    @fn = ->
      h =
        uid: 1
        type: 'dummy'
      return [h]
  run: ->
    @fn()

test 'array > hash -2',
  before: ->
    @fn = ->
      return [
        uid: 1
        type: 'dummy'
      ,
        uid: 2
        type: 'dummy'
      ]
  run: ->
    @fn()

test 'array > hash -2 -alternative',
  before: ->
    @fn = ->
      h1 =
        uid: 1
        type: 'dummy'
      h2 =
        uid: 2
        type: 'dummy'
      return [h1, h2]
  run: ->
    @fn()



test 'object',
  before: ->
    @fn = -> new Object()
  run: ->
    @fn()

test 'hash',
  before: ->
    @fn = ->
      type: 'value'
  run: ->
    @fn()

test 'hash > function -1',
  before: ->
    @fn = ->
      type: 'value'
      func: -> 0
  run: ->
    @fn()

test 'hash > function -2',
  before: ->
    @fn = ->
      type: 'value'
      funcA: -> 0
      funcB: -> 1
  run: ->
    @fn()

test 'hash > function -workaround'
    before: ->
      h1 =
        type: 'dummy'
        value: -> 1
        nodes: -> []
      h2 =
        type: 'dummy'
        value: -> 2
        nodes: -> []
      @fn = -> [h1, h2]
    run: ->
      @fn()

