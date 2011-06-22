pkg.get_np_tests = ->
  test
    name: '    1 path'
    run: ->
      @storage._get_np(@arr[0], @str[0])

  test
    name: '   50 paths'
    run: ->
      i = @i++ % 50
      @storage._get_np(@arr[i], @str[i])

  test
    name: '  500 paths'
    run: ->
      i = @i++ % 500
      @storage._get_np(@arr[i], @str[i])

  test
    name: '2 500 paths'
    run: ->
      i = @i++ % 2500
      @storage._get_np(@arr[i], @str[i])


  test
    name: '5 000 paths'
    run: ->
      i = @i++ % 5000
      @storage._get_np(@arr[i], @str[i])

#
# Tests for getting the NotifyPoint for the given path.
#
# Providing array path together with string based form 
# greatly improves the performance. Overall performance 
# starts to degrade when more than 2 000 different paths 
# and 5 rules per head exists.
#
group
  name: 'storage.np'
  before: ->
    @storage = new core.storage.Global()

    @i = 0
    @str = pkg.permutate_paths(5000)
    @arr = (str.split('.') for str in @str)

group
  name: 'storage.np.1 rule'
  before: ->
    for rule in pkg.permutate_rules(1)
      @storage.register_rule(rule)

pkg.get_np_tests()

group
  name: 'storage.np.5 rules'
  before: ->
    for rule in pkg.permutate_rules(5)
      @storage.register_rule(rule)

pkg.get_np_tests()
