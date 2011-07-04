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
    @storage = new core.Storage()

    @i = 0
    @str = gen.path_array(10000)
    @arr = (str.split('.') for str in @str)

group
  name: 'storage.np.1 rule'
  before: ->
    for rule in gen.rules_array(1)
      @storage.register_rule(rule)

pkg.np_suite()

group
  name: 'storage.np.5 rules'
  before: ->
    for rule in gen.rules_array(5)
      @storage.register_rule(rule)

pkg.np_suite()
