#
# Creating primitives
#
group
  name: 'create.primitives'

test
  name: 'boolean'
  run: ->
    r = true

test
  name: 'integer'
  run: ->
    r = 101

test
  name: 'float'
  run: ->
    r = 1.01

test
  name: 'string'
  run: ->
    r = 'string'

test
  name: 'regexp'
  run: ->
    r = /regexp/

#
# Creating primitives via object wrappers.
#
group
  name: 'create.wrappers'

test
  name: 'boolean'
  run: ->
    r = new Boolean(true)

test
  name: 'integer'
  run: ->
    r = new Number(101)

test
  name: 'float'
  run: ->
    r = new Number(1.01)

test
  name: 'string'
  run: ->
    r = new String('string')

test
  name: 'regexp'
  run: ->
    r = new RegExp('regexp')

#
# Creating other primitive-like objects.
#
group
  name: 'create.others'

#
# Building new date is relatively slow.
#
test
  name: 'Date'
  run: ->
    o = new Date()
