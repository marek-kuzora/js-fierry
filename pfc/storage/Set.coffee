group
  name: 'storage.set'
  before: ->
    @storage = new core.storage.Global()
    
    @i = 0
    @str = pkg.permutate_paths(5000)
    @arr = (str.split('.') for str in @str)


test
  name: '1 length'
  before: ->
    @arr = (str.split('.') for str in pkg.permutate_paths(5000, 1))
  run: ->
    @storage.set(@arr[@i++ % 5000], null, 'value')

test
  name: '2 length'
  before: ->
    @arr = (str.split('.') for str in pkg.permutate_paths(5000, 2))
  run: ->
    @storage.set(@arr[@i++ % 5000], null, 'value')

test
  name: '3 length'
  before: ->
    @arr = (str.split('.') for str in pkg.permutate_paths(5000, 3))
  run: ->
    @storage.set(@arr[@i++ % 5000], null, 'value')

test
  name: '5 length'
  before: ->
    @arr = (str.split('.') for str in pkg.permutate_paths(5000, 5))
  run: ->
    @storage.set(@arr[@i++ % 5000], null, 'value')
