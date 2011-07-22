# W ten sposob okreslamy base group do ktorej nastepnie mozna sie dopinac
group '/storage.np',
  envs: ['storage.paths']

group '1 rule',
  before: ->
    @storage.register_rule(r) for r in @rules_1

test '    50 paths',
  run: ->
    i = @i++ % 50
    @storage._get_np(@path_arr_5[i], @path_str_5[i])

test '   500 paths',
  run: ->
    i = @i++ % 500
    @storage._get_np(@path_arr_5[i], @path_str_5[i])

test ' 2 500 paths',
  run: ->
    i = @i++ % 2500
    @storage._get_np(@path_arr_5[i], @path_str_5[i])

test ' 5 000 paths',
  run: ->
    i = @i++ % 5000
    @storage._get_np(@path_arr_5[i], @path_str_5[i])

test '10 000 paths',
  run: ->
    i = @i++ % 10000
    @storage._get_np(@path_arr_5[i], @path_str_5[i])


group '5 rules',
  before: ->
    @storage.register_rule(r) for r in @rules_5

repeat '1 rule'


group 'no rules'

repeat '1 rule'
