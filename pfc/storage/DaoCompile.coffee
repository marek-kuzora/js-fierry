group '/dao.compile',
  envs: ['storage.paths']


group 'plain'

test '  1 path'
  run: ->
    dao.compile('.anna.likes.something')

test '500 paths'
  run: ->
    dao.compile('.' + @path_str_3[@i % 500])


group 'complex'
  
test '  1 path'
  run: ->
    dao.compile('.anna{..but.not.here}')

test '500 paths'
  before: ->
    for _, i in @path_str_2
      @path_str_3[i] += '{..' + @path_str_2[i % 500 + 500] + '}'
  run: ->
    dao.compile('.' + @path_str_3[@i % 500])
