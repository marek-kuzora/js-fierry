storage = require '/fierry/storage/storage'


group '/storage.get'


group '< > length',
  envs: ['storage.data']

test '2 length',
  run: ->
    storage.get(['view', 'active'])

test '5 length',
  run: ->
    storage.get(['simple', 'path', 'with', 'five', 'parts'])


group '< > count',
  envs: ['storage.paths']

test '    50 paths',
  run: ->
    i = @i++ % 50
    storage.get(@path_arr_5[i])

test '   500 paths',
  run: ->
    i = @i++ % 500
    storage.get(@path_arr_5[i])

test ' 2 500 paths',
  run: ->
    i = @i++ % 2500
    storage.get(@path_arr_5[i])

