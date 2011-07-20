group '/dom.attrs',
  before: ->
    @flag = true
    @div = document.createElement('div')

test 'id',
  run: ->
    @flag = !@flag
    @div.setAttribute('id', 'aaaaaa') if @flag
    @div.setAttribute('id', 'zzzzzz') if !@flag

test 'class',
  run: ->
    @flag = !@flag
    @div.className = 'title' if @flag
    @div.className = 'normal' if @flag

test 'title',
  run: ->
    @flag = !@flag
    @div.setAttribute('title', 'aaaaaa') if @flag
    @div.setAttribute('title', 'zzzzzz') if !@flag
