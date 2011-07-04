group
  name: 'dao.create'
  before: ->
    storage  = new core.Storage()
    @instance = {get_local_storage: -> return storage } # as env ?

    @i = 0
    @str = gen.path_array(10000).slice()
    @arr = (str.split('.') for str in @str)


group
  name: 'dao.create.plain'

pkg.create_suite()


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

pkg.create_suite()


group
  name: 'dao.create.complex.2 nested'
  before: ->
    for arr_path, i in @arr
      @str[i] = @str[i].replace('\.' + arr_path[1] + '\.', '{..movie.title}')
      @str[i] = @str[i].replace('\.' + arr_path[3] + '\.', '{..current.user}')

      arr_path[1] = @dao_a
      arr_path[3] = @dao_b

pkg.create_suite()
