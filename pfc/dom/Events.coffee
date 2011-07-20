#
# Cases for attaching event listeners into dom. 
# W3C method is about 6x faster than YUI when attaching small number of listeners to a node.
#
group '/dom.events'
  before: ->
    @flag = true
    @a = -> 'a'
    @b = -> 'b'
    @div = document.createElement('div')

group 'w3c'

test 'attach',
  run: ->
    @flag = !@flag
    @div.addEventListener('click', @a) if @flag
    @div.addEventListener('click', @b) if !@flag

#
# Does not do well when attaching huge number of listeners.
# Time to attach new listener depends on how many listeners already exists!
#
#test 'attach -new',
#  before: ->
#    @i = 0
#  run: ->
#    i = @i++
#    @div.addEventListener('click', -> i)
    
test 'detach',
  run: ->
    @flag = !@flag
    @div.removeEventListener('click', @a) if @flag
    @div.removeEventListener('click', @b) if !@flag

test 'both',
  run: ->
    if @flag = !@flag
      @div.removeEventListener('click', @b)
      @div.addEventListener('click', @a)
    else
      @div.removeEventListener('click', @a)
      @div.addEventListener('click', @b)


group 'yui'

test 'attach',
  run: ->
    @flag = !@flag
    event.attach('click', @a, @div) if @flag
    event.attach('click', @b, @div) if !@flag

#
# Probably injects own listener for handling incomming events.
# The injected listener will then notify my listeners about events.
#
test 'attach -new',
  before: ->
    @i = 0
  run: ->
    i = @i++
    fn = -> i
    event.attach('click', fn, @div)

test 'detach',
  run: ->
    @flag = !@flag
    event.detach('click', @a, @div) if @flag
    event.detach('click', @b, @div) if !@flag

test 'both',
  run: ->
    if @flag = !@flag
      event.detach('click', @b, @div)
      event.attach('click', @a, @div)
    else
      event.detach('click', @a, @div)
      event.attach('click', @b, @div)
