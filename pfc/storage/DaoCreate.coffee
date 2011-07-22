group '/dao.create',
  envs: ['storage.paths']

group 'plain'
  before: ->
    @path_str = @path_str_5
    @path_arr = @path_arr_5

test '    50 paths',
  run: ->
    i = @i++ % 50
    dao.create(true, @path_str[i], @path_arr[i])

test '   500 paths',
  run: ->
    i = @i++ % 500
    dao.create(true, @path_str[i], @path_arr[i])

test ' 2 500 paths',
  run: ->
    i = @i++ % 2500
    dao.create(true, @path_str[i], @path_arr[i])

test ' 5 000 paths',
  run: ->
    i = @i++ % 5000
    dao.create(true, @path_str[i], @path_arr[i])

# Nie widzi @path_str_4 z env...
group '+/complex',
  before: ->
    @path_str = @path_str_4
    @path_arr = @path_arr_4


group '  1 nested',
  before: ->
    for _, i in @path_str
      @path_str[i] += '{..movie.title}'
      @path_arr[i].push(@dao._retrieve_dao('..movie.title'))

repeat '/dao.create.plain'


group '500 nested',
  before: ->
    for _, i in @path_str
      @path_str[i] += '{..' + @path_str_2[i % 500] + '}'
      @path_arr[i].push(@dao._retrieve_dao('..' + @path_str_2[i % 500]))

repeat '/dao.create.plain'
