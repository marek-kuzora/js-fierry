pkg.create_suite = ->

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
