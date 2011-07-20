group '/string.sequential-read'


#
# About 2x faster than direct, char-at access.
# Currently can handle 25k string in less than 1ms.
#
group 'char-code-at'

test '   250 chars',
  before: ->
    @str = gen.big_string(250)
    @len = @str.length - 1
  run: ->
    @str.charCodeAt(core.rand(i)) for i in [0..@len]
    return

test ' 2 500 chars',
  before: ->
    @str = gen.big_string(2500)
    @len = @str.length - 1
  run: ->
    @str.charCodeAt(core.rand(i)) for i in [0..@len]
    return

test '25 000 chars',
  before: ->
    @str = gen.big_string(25000)
    @len = @str.length - 1
  run: ->
    @str.charCodeAt(core.rand(i)) for i in [0..@len]
    return

group 'char-at'

test '   250 chars',
  before: ->
    @str = gen.big_string(250)
    @len = @str.length - 1
  run: ->
    @str.charAt(core.rand(i)) for i in [0..@len]
    return

test ' 2 500 chars',
  before: ->
    @str = gen.big_string(2500)
    @len = @str.length - 1
  run: ->
    @str.charAt(core.rand(i)) for i in [0..@len]
    return

test '25 000 chars',
  before: ->
    @str = gen.big_string(25000)
    @len = @str.length - 1
  run: ->
    @str.charAt(core.rand(i)) for i in [0..@len]
    return

group 'direct'

test '   250 chars',
  before: ->
    @str = gen.big_string(250)
    @len = @str.length - 1
  run: ->
    @str.charAt(core.rand(i)) for i in [0..@len]
    return

test ' 2 500 chars',
  before: ->
    @str = gen.big_string(2500)
    @len = @str.length - 1
  run: ->
    @str.charAt(core.rand(i)) for i in [0..@len]
    return

test '25 000 chars',
  before: ->
    @str = gen.big_string(25000)
    @len = @str.length - 1
  run: ->
    @str[core.rand(i)] for i in [0..@len]
    return
