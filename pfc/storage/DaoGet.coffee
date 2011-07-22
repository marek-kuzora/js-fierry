group '/dao.get'


group '< > length',
  envs: ['storage.data']

test '2 length',
  run: ->
    core.get('..view.active')

test '3 length',
  run: ->
    core.get('..items.menu.0')


test '5 length',
  run: ->
    core.get('..simple.path.with.five.parts')


group '< > count',
  envs: ['storage.paths']

test '    50 paths',
  run: ->
    i = @i++ % 50
    core.get('..' + @path_str_5[i])

test '   500 paths',
  run: ->
    i = @i++ % 500
    core.get('..' + @path_str_5[i])

test ' 2 500 paths',
  run: ->
    i = @i++ % 2500
    core.get('..' + @path_str_5[i])
