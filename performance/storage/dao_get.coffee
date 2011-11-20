dao = require '/fierry/storage/dao'


group '/dao.get'


group '< > length',
  envs: ['storage.data']

test '2 length',
  run: ->
    dao.get('..view.active')

test '5 length',
  run: ->
    dao.get('..simple.path.with.five.parts')


group '< > count',
  envs: ['storage.paths']
  before: ->
    @path_str_5[i] = '..' + v for v, i in @path_str_5

test '    50 paths',
  run: ->
    i = @i++ % 50
    dao.get(@path_str_5[i])

test '   500 paths',
  run: ->
    i = @i++ % 500
    dao.get(@path_str_5[i])

test ' 2 500 paths',
  run: ->
    i = @i++ % 2500
    dao.get(@path_str_5[i])

