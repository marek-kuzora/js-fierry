group '/view.dom',
  before: ->
    @v  = ->
    @n0 = -> []


#
#--------------- DIV BASIC STRUCTURE - 1x3
#
group '3x div'

test 'native',
  run: ->
    p = document.createElement('div')
    for i in [0..2]
      n = document.createElement('div')
      p.appendChild(n)


test 'view',
  before: ->
    $ = @
    @n = ->
      return [
        new view.Action('div', 1, $.v, $.n0, @)
        new view.Action('div', 2, $.v, $.n0, @)
        new view.Action('div', 3, $.v, $.n0, @)
      ]
  run: ->
    view.execute_raw('html-root', @v, @n)


test 'jquery',
  run: ->
    p = document.createElement('div')
    for i in [0..2]
      $(p).append('<div></div>')


#
#--------------- DIV BASIC STRUCTURE - 1x3x1
#
group '3x div + article'

test 'native',
  run: ->
    n0 = document.createElement('div')
    for i in [0..2]
      n1 = document.createElement('div')
      n2 = document.createElement('article')
      n1.appendChild(n2)
      n0.appendChild(n1)


test 'view',
  before: ->
    $ = @
    @n1 = ->
      return [
        new view.Action('article', 1, $.v, $.n0, @)
      ]
    @n = ->
      return [
        new view.Action('div', 1, $.v, $.n1, @)
        new view.Action('div', 2, $.v, $.n1, @)
        new view.Action('div', 3, $.v, $.n1, @)
      ]
  run: ->
    view.execute_raw('html-root', @v, @n)


test 'view -fn-inside',
  before: ->
    $ = @
    @n = ->
      n = ->
        n = -> []
        return [
          new view.Action('article', 1, $.v, n, @)
        ]
      return [
        new view.Action('div', 1, $.v, n, @)
        new view.Action('div', 2, $.v, n, @)
        new view.Action('div', 3, $.v, n, @)
      ]
  run: ->
    view.execute_raw('html-root', @v, @n)


#
#--------------- DIV BASIC STRUCTURE - 1x3x3x2
#
group '30x div + article + section'

test 'native',
  run: ->
    n0 = document.createElement('div')
    for i in [0..2]
      n1 = document.createElement('div')
      for j in [0..2]
        n2 = document.createElement('article')
        for g in [0..1]
          n3 = document.createElement('section')
          n2.appendChild(n3)
        n1.appendChild(n2)
      n0.appendChild(n1)


test 'view',
  before: ->
    $ = @
    @n2 = ->
      return [
        new view.Action('section', 1, $.v, $.n0, @)
        new view.Action('section', 2, $.v, $.n0, @)
      ]
    @n1 = ->
      return [
        new view.Action('article', 1, $.v, $.n2, @)
        new view.Action('article', 2, $.v, $.n2, @)
        new view.Action('article', 3, $.v, $.n2, @)
      ]
    @n = ->
      return [
        new view.Action('div', 1, $.v, $.n1, @)
        new view.Action('div', 2, $.v, $.n1, @)
        new view.Action('div', 3, $.v, $.n1, @)
      ]
  run: ->
    view.execute_raw('html-root', @v, @n)


test 'view -fn-inside',
  before: ->
    $ = @
    @n = ->
      n = ->
        n = ->
          n = -> []
          return [
            new view.Action('section', 1, $.v, n, @)
            new view.Action('section', 2, $.v, n, @)
          ]
        return [
          new view.Action('article', 1, $.v, n, @)
          new view.Action('article', 2, $.v, n, @)
          new view.Action('article', 3, $.v, n, @)
        ]
      return [
        new view.Action('div', 1, $.v, n, @)
        new view.Action('div', 2, $.v, n, @)
        new view.Action('div', 3, $.v, n, @)
      ]
  run: ->
    view.execute_raw('html-root', @v, @n)


#
#--------------- DIVS + TEXT - 1x3
#
group '3x div + text',
  before: ->
    @v1 = -> 'hello'
    @v2 = -> 'world'
    @v3 = -> 'etc'

test 'native',
  run: ->
    p = document.createElement('div')
    for i in [0..2]
      n = document.createElement('div')
      n.setAttribute('class', 'bold')
      p.appendChild(n)


test 'view',
  before: ->
    $ = @
    @n = ->
      return [
        new view.Action('div', 1, $.v1, $.n0, @)
        new view.Action('div', 2, $.v2, $.n0, @)
        new view.Action('div', 3, $.v3, $.n0, @)
      ]
  run: ->
    view.execute_raw('html-root', @v, @n)


#
#--------------- DIV + ATTRIBUTES - 1x1x3
#
group '1x div + 3x attrs',
  before: ->
    @v1 = -> 'title'
    @v2 = -> 'pl-PL'
    @v3 = -> 'true'

test 'native',
  run: ->
    p = document.createElement('div')
    n = document.createElement('div')
    n.setAttribute('title', 'title')
    n.setAttribute('lang', 'pl-PL')
    n.setAttribute('draggable', 'true')
    p.appendChild(n)


test 'view',
  before: ->
    $ = @
    @n1 = ->
      return [
        new view.Action('title', 1, $.v1, $.n0, @)
        new view.Action('lang', 2, $.v2, $.n0, @)
        new view.Action('draggable', 3, $.v3, $.n0, @)
      ]
    @n = ->
      return [
        new view.Action('div', 1, $.v, $.n1, @)
      ]
  run: ->
    view.execute_raw('html-root', @v, @n)


#
#--------------- DIVS + ATTRIBUTE - 1x3x1
#
group '3x div + 1x attr',
  before: ->
    @v1 = -> 'title'

test 'native',
  run: ->
    p = document.createElement('div')
    for i in [0..2]
      n = document.createElement('div')
      n.setAttribute('title', 'title')
      p.appendChild(n)


test 'view',
  before: ->
    $ = @
    @n1 = ->
      return [
        new view.Action('title', 1, $.v1, $.n0, @)
      ]
    @n = ->
      return [
        new view.Action('div', 1, $.v, $.n1, @)
        new view.Action('div', 2, $.v, $.n1, @)
        new view.Action('div', 3, $.v, $.n1, @)
      ]
  run: ->
    view.execute_raw('html-root', @v, @n)


#
#--------------- DIV + STYLES - 1x1x3
#
group '1x div + 3x styles',
  before: ->
    @v1 = -> 'red'
    @v2 = -> 'bold'
    @v3 = -> 'gray'

test 'native',
  run: ->
    p = document.createElement('div')
    n = document.createElement('div')
    n.style.color = 'red'
    n.style.fontWeight = 'bold'
    n.style.background = 'gray'
    p.appendChild(n)

test 'view',
  before: ->
    $ = @
    @n1 = ->
      return [
        new view.Action('color', 1, $.v1, $.n0, @)
        new view.Action('fontWeight', 2, $.v2, $.n0, @)
        new view.Action('background', 3, $.v3, $.n0, @)
      ]
    @n = ->
      return [
        new view.Action('div', 1, $.v, $.n1, @)
      ]
  run: ->
    view.execute_raw('html-root', @v, @n)


#
#--------------- DIVS + STYLE - 1x3x1
#
group '3x div + 1x style',
  before: ->
    @v1 = -> 'red'

test 'native',
  run: ->
    p = document.createElement('div')
    for i in [0..2]
      n = document.createElement('div')
      n.style.color = 'red'
      p.appendChild(n)


test 'view',
  before: ->
    $ = @
    @n1 = ->
      return [
        new view.Action('color', 1, $.v1, $.n0, @)
      ]
    @n = ->
      return [
        new view.Action('div', 1, $.v, $.n1, @)
        new view.Action('div', 2, $.v, $.n1, @)
        new view.Action('div', 3, $.v, $.n1, @)
      ]
  run: ->
    view.execute_raw('html-root', @v, @n)


#
#--------------- DIVS + TAGS - 1x3
#

