pkg.get_dao_create_tests = ->

  test
    name: '   50 paths'
    run: ->
      i = @i++ % 50
      dao.create(true, @str[i], @arr[i], @instance)

  test
    name: '  500 paths'
    run: ->
      i = @i++ % 500
      dao.create(true, @str[i], @arr[i], @instance)

  test
    name: '2 500 paths'
    run: ->
      i = @i++ % 2500
      dao.create(true, @str[i], @arr[i], @instance)

  test
    name: '5 000 paths'
    run: ->
      i = @i++ % 5000
      dao.create(true, @str[i], @arr[i], @instance)

  test
    name: '10 000 paths'
    run: ->
      i = @i++ % 10000
      dao.create(true, @str[i], @arr[i], @instance)


group
  name: 'dao.create'
  before: ->
    storage  = new core.Storage()
    @instance = {get_local_storage: -> return storage }

    @i = 0
    @str = gen.path_array(10000).slice()
    @arr = (str.split('.') for str in @str)

group
  name: 'dao.create.plain'

pkg.get_dao_create_tests()

group
  name: 'dao.create.complex'
  before: ->
    @dao_a = dao.create(true, 'movie.title', ['movie', 'title'], @instance)
    @dao_b = dao.create(true, 'current.user', ['current', 'user'], @instance)

group
  name: 'dao.create.complex.1 nested'
  before: ->
    for arr_path, i in @arr
      @str[i] = @str[i].replace('\.' + arr_path[1] + '\.', '{..movie.title}')
      arr_path[1] = @dao_a

pkg.get_dao_create_tests()

group
  name: 'dao.create.complex.2 nested'
  before: ->
    for arr_path, i in @arr
      @str[i] = @str[i].replace('\.' + arr_path[1] + '\.', '{..movie.title}')
      @str[i] = @str[i].replace('\.' + arr_path[3] + '\.', '{..current.user}')

      arr_path[1] = @dao_a
      arr_path[3] = @dao_b

pkg.get_dao_create_tests()
