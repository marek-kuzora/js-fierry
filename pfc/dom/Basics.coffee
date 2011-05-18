#
# Create is as fast as clone.
# Currently browser can create 1000 elements in 1ms.
#
group
  name: 'dom.basics'

group
  name: 'dom.basics.elements'

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

#
# GetElementById is 75x faster than the others.
#
group
  name: 'dom.basics.selectors'

test
  name: 'getElementById'
  run: ->
    document.getElementById('stub')

test
  name: 'querySelector'
  run: ->
    document.querySelector('[id="stub"]')

test
  name: 'querySelectorAll'
  run: ->
    document.querySelectorAll('[id="stub"]')
