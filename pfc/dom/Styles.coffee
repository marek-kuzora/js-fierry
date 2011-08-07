#
# Styles performance is very low. 10x slower than setting attributes or classes!
#
group '/dom.styles',
  before: ->
    @flag = true
    @div = document.createElement('div')

test 'background',
  run: ->
    @flag = !@flag
    @div.style.background = 'black' if @flag
    @div.style.background = 'white' if !@flag

test 'position',
  run: ->
    @flag = !@flag
    @div.style.position = 'absolute' if @flag
    @div.style.position = 'static' if !@flag

test 'opacity',
  run: ->
    @flag = !@flag
    @div.style.opacity = '0.5' if @flag
    @div.style.opacity = '1.0' if !@flag
