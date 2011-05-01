group
  name: 'object.set'

#
# Adding new property to the object.
#
group
  name: 'object.set.new'

test
  name: 'depth-1'
  before: ->
    @o = {a: 'a', b: 'b', c: 'c'}
  run: ->
    object.set(@o, ['d'], 'd')

test
  name: 'depth-2'
  before: ->
    @o = {a: 'a', b: {d: 'd', e: 'e'}, c: 'c'}
  run: ->
    object.set(@o, ['b', 'f'], 'f')

test
  name: 'depth-3'
  before: ->
    @o = {a: 'a', b: {d: {f: 'f', g: 'g'}, e: 'e'}, c: 'c'}
  run: ->
    object.set(@o, ['b', 'd', 'h'], 'h')

#
# Changing existing object's property.
#
group
  name: 'object.set.chg'

test
  name: 'depth-1'
  before: ->
    @o = {a: 'a', b: 'b', c: 'c'}
  run: ->
    object.set(@o, ['c'], 'd')

test
  name: 'depth-2'
  before: ->
    @o = {a: 'a', b: {d: 'd', e: 'e'}, c: 'c'}
  run: ->
    object.set(@o, ['b', 'd'], 'f')

test
  name: 'depth-3'
  before: ->
    @o = {a: 'a', b: {d: {f: 'f', g: 'g'}, e: 'e'}, c: 'c'}
  run: ->
    object.set(@o, ['b', 'd', 'g'], 'h')

#
# Setting property on empty object.
#
group
  name: 'object.set.empty'

test
  name: 'depth-2'
  before: ->
    @o = {}
  run: ->
    object.set(@o, ['a', 'b'], true)

test
  name: 'depth-3'
  before: ->
    @o = {}
  run: ->
    object.set(@o, ['a', 'b', 'c'], true)

test
  name: 'depth-4'
  before: ->
    @o = {}
  run: ->
    object.set(@o, ['a', 'b', 'c', 'd'], true)

test
  name: 'depth-5'
  before: ->
    @o = {}
  run: ->
    object.set(@o, ['a', 'b', 'c', 'd', 'e'], true)

