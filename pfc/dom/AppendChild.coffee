#
# Nearly all tests have around 0.7k ops/ms.
# Interesting, the performance does not degradate when flat appending.
# However, there is very poor performance of recursive appending - should NOT BE USED.
# (the browser usually hangs or performs 0.002 ops/ms...)
#
group
  name: 'dom.append'
  before: ->
    @i = 0
    @node = @stub

test
  name: 'flat'
  run: ->
    e = document.createElement('div')
    @node.appendChild(e)

pkg.create_tree_test = (count) ->
  test
    name: count + ' nodes'
    before: ->
      @i = 0
      @l = 0
      @count = count

      @new = []
      @arr = [@node]

      @len = @arr.length
      @max = Math.pow(@count, @l+1)
    run: ->
      p = @arr[@i++ % @len]
      e = document.createElement('div')

      p.appendChild(e)
      @new.push(e)

      unless @i < @max
        @i  = 0
        @l += 1
        @arr = @new
        @new = []

        @len = @arr.length
        @max = Math.pow(@count, @l+1)

pkg.create_tree_test(2)
pkg.create_tree_test(5)
pkg.create_tree_test(10)
pkg.create_tree_test(50)
pkg.create_tree_test(250)
pkg.create_tree_test(1000)
