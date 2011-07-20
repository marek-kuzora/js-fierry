#
# Create is as fast as clone.
# Currently browser can create 1000 elements in 1ms.
#
group '/dom.basics'

group 'elements'

test 'create',
  run: ->
    document.createElement('div')

test 'clone',
  before: ->
    @div = document.createElement('div')
  run: ->
    @div.cloneNode()


#
# GetElementById is 75x faster than the others.
#
group 'selectors'

test 'getElementById',
  run: ->
    document.getElementById('stub')

test 'getElementsByTagName',
  run: ->
    document.getElementsByTagName('div')

test 'querySelector',
  run: ->
    document.querySelector('[id="stub"]')

test 'querySelectorAll',
  run: ->
    document.querySelectorAll('[id="stub"]')
