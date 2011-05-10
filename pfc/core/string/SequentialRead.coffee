group
  name: 'string.sequential-read'

group
  name: 'string.sequential-read.char-code-at'

test
  name: '   250 chars'
  before: ->
    @str = gen.big_string(250)
    @len = @str.length - 1
  run: ->
    @str.charCodeAt(core.rand(i)) for i in [0..@len]
    return

test
  name: ' 2 500 chars'
  before: ->
    @str = gen.big_string(2500)
    @len = @str.length - 1
  run: ->
    @str.charCodeAt(core.rand(i)) for i in [0..@len]
    return

test
  name: '25 000 chars'
  before: ->
    @str = gen.big_string(25000)
    @len = @str.length - 1
  run: ->
    @str.charCodeAt(core.rand(i)) for i in [0..@len]
    return

group
  name: 'string.sequential-read.char-at'

test
  name: '   250 chars'
  before: ->
    @str = gen.big_string(250)
    @len = @str.length - 1
  run: ->
    @str.charAt(core.rand(i)) for i in [0..@len]
    return

test
  name: ' 2 500 chars'
  before: ->
    @str = gen.big_string(2500)
    @len = @str.length - 1
  run: ->
    @str.charAt(core.rand(i)) for i in [0..@len]
    return

test
  name: '25 000 chars'
  before: ->
    @str = gen.big_string(25000)
    @len = @str.length - 1
  run: ->
    @str.charAt(core.rand(i)) for i in [0..@len]
    return

group
  name: 'string.sequential-read.direct'

test
  name: '   250 chars'
  before: ->
    @str = gen.big_string(250)
    @len = @str.length - 1
  run: ->
    @str.charAt(core.rand(i)) for i in [0..@len]
    return

test
  name: ' 2 500 chars'
  before: ->
    @str = gen.big_string(2500)
    @len = @str.length - 1
  run: ->
    @str.charAt(core.rand(i)) for i in [0..@len]
    return

test
  name: '25 000 chars'
  before: ->
    @str = gen.big_string(25000)
    @len = @str.length - 1
  run: ->
    @str[core.rand(i)] for i in [0..@len]
    return
