pkg.np_suite = ->
  test
    name: '    50 paths'
    run: ->
      i = @i++ % 50
      @storage._get_np(@arr[i], @str[i])

  test
    name: '   500 paths'
    run: ->
      i = @i++ % 500
      @storage._get_np(@arr[i], @str[i])

  test
    name: ' 2 500 paths'
    run: ->
      i = @i++ % 2500
      @storage._get_np(@arr[i], @str[i])


  test
    name: ' 5 000 paths'
    run: ->
      i = @i++ % 5000
      @storage._get_np(@arr[i], @str[i])

  test
    name: '10 000 paths'
    run: ->
      i = @i++ % 10000
      @storage._get_np(@arr[i], @str[i])

