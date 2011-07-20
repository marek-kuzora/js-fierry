#
# Creating primitives
#
group '/create.primitives'

test 'boolean',
  run: ->
    r = true

test 'integer',
  run: ->
    r = 101

test 'float',
  run: ->
    r = 1.01

test 'string',
  run: ->
    r = 'string'

test 'regexp',
  run: ->
    r = /regexp/

#
# Creating primitives via object wrappers.
#
group '/create.wrappers'

test 'boolean',
  run: ->
    r = new Boolean(true)

test 'integer',
  run: ->
    r = new Number(101)

test 'float',
  run: ->
    r = new Number(1.01)

test 'string',
  run: ->
    r = new String('string')

test 'regexp',
  run: ->
    r = new RegExp('regexp')

#
# Creating other primitive-like objects.
#
group '/create.others'

#
# Building new date is relatively slow.
#
test 'Date',
  run: ->
    o = new Date()

test 'Date.now',
  run: ->
    o = Date.now()
