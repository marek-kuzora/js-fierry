group '/array.join'

group 'str'

test ' 5 length -primitive',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e']
  run: ->
    str = ''
    for i in @arr
      str += if str then '.' + i else i

test ' 5 length -default-token',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e']
  run: ->
    @arr.join()

test ' 5 length -custom-token',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e']
  run: ->
    @arr.join('.-.')

test ' 5 length -no-token',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e']
  run: ->
    @arr.join('')

test '10 length',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.join()

test '40 length',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.join()

test '40 length -no-token',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  run: ->
    @arr.join('')


group 'recursive'

test 'small',
  before: ->
    @arr = [['a', 'b', 'c', 'd']]
  run: ->
    @arr.join()

test 'standard',
  before: ->
    @arr = ['a', ['b', 'c', 'd'], 'e']
  run: ->
    @arr.join()

test 'recursive -big',
  before: ->
    @arr = ['a', ['b', 'c', 'd', 'e'], 'f', 'g', ['h', 'i', 'j', 'k', 'l']]
  run: ->
    @arr.join()


group 'int'

test '10 length -one-int',
  before: ->
    @arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 10]
  run: ->
    @arr.join()

test '10 length -all-ints',
  before: ->
    @arr = [1,2,3,4,5,6,7,8,9,10]
  run: ->
    @arr.join()

