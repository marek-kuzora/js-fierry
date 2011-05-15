group
  name: 'dom.attrs'

test
  name: 'id'
  before: ->
    @flag = true
    @div = document.createElement('div')
  run: ->
    @flag = !@flag
    @div.setAttribute('id', 'aaaaaa') if @flag
    @div.setAttribute('id', 'zzzzzz') if !@flag

test
  name: 'class'
  before: ->
    @flag = true
    @div = document.createElement('div')
  run: ->
    @flag = !@flag
    @div.className = 'bold black' if @flag
    @div.className = 'title italic' if @flag

test
  name: 'title'
  before: ->
    @flag = true
    @div = document.createElement('div')
  run: ->
    @flag = !@flag
    @div.setAttribute('title', 'aaaaaa') if @flag
    @div.setAttribute('title', 'zzzzzz') if !@flag
