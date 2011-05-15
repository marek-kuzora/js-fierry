#
# Styles performance is very low. 10x slower than setting attributes or classes!
#
group
  name: 'dom.styles'

test
  name: 'background'
  before: ->
    @flag = true
    @div = document.createElement('div')
  run: ->
    @flag = !@flag
    @div.style.background = 'black' if @flag
    @div.style.background = 'white' if !@flag

test
  name: 'position'
  before: ->
    @flag = true
    @div = document.createElement('div')
  run: ->
    @flag = !@flag
    @div.style.position = 'absolute' if @flag
    @div.style.position = 'static' if !@flag

test
  name: 'opacity'
  before: ->
    @flag = true
    @div = document.createElement('div')
  run: ->
    @flag = !@flag
    @div.style.opacity = '0.5' if @flag
    @div.style.opacity = '1.0' if !@flag

