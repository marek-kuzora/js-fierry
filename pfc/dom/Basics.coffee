#
# Create is as fast as clone.
# Currently browser can create 1000 elements in 1ms.
#
group
  name: 'dom.basics'

test
  name: 'create'
  run: ->
    document.createElement('div')

test
  name: 'clone'
  before: ->
    @div = document.createElement('div')
  run: ->
    @div.cloneNode()
