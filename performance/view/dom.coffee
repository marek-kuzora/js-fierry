roots   = require '/fierry/view/roots'
Action  = require '/fierry/view/action'

Html    = require 'html_behavior'
Tag     = require '/fierry/dom/tag'
Attr    = require '/fierry/dom/attribute'
Style   = require '/fierry/dom/style'
Element = require '/fierry/dom/element'


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

test 'manual',
  before: ->
    $ = @
    @n = ->
      return [
        new Action('div', 1, @, Element, $.v, $.n0)
        new Action('div', 2, @, Element, $.v, $.n0)
        new Action('div', 3, @, Element, $.v, $.n0)
      ]
  run: ->
    roots.execute_raw('html', Html, @n)


test 'auto',
  before: ->
    @root = require 'dom:3x div'
  run: ->
    @root()

test 'jquery',
  run: ->
    p = document.createElement('div')
    for i in [0..2]
      $(p).append('<div></div>')



#
#--------------- DIV BASIC STRUCTURE - 1x3x1
#
group '6x div + article'

test 'native',
  run: ->
    n0 = document.createElement('div')
    for i in [0..2]
      n1 = document.createElement('div')
      n2 = document.createElement('article')
      n1.appendChild(n2)
      n0.appendChild(n1)


test 'manual',
  before: ->
    $ = @
    @n1 = ->
      return [
        new Action('article', 1, @, Element, $.v, $.n0)
      ]
    @n = ->
      return [
        new Action('div', 1, @, Element, $.v, $.n1)
        new Action('div', 2, @, Element, $.v, $.n1)
        new Action('div', 3, @, Element, $.v, $.n1)
      ]
  run: ->
    roots.execute_raw('html', Html, @n)


test 'manual -inside',
  before: ->
    $ = @
    @n = ->
      n = ->
        n = -> []
        return [
          new Action('article', 1, @, Element, $.v, n)
        ]
      return [
        new Action('div', 1, @, Element, $.v, n)
        new Action('div', 2, @, Element, $.v, n)
        new Action('div', 3, @, Element, $.v, n)
      ]
  run: ->
    roots.execute_raw('html', Html, @n)


test 'auto',
  before: ->
    @root = require 'dom:6x div + article'
  run: ->
    @root()



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


test 'manual',
  before: ->
    $ = @
    @n2 = ->
      return [
        new Action('section', 1, @, Element, $.v, $.n0)
        new Action('section', 2, @, Element, $.v, $.n0)
      ]
    @n1 = ->
      return [
        new Action('article', 1, @, Element, $.v, $.n2)
        new Action('article', 2, @, Element, $.v, $.n2)
        new Action('article', 3, @, Element, $.v, $.n2)
      ]
    @n = ->
      return [
        new Action('div', 1, @, Element, $.v, $.n1)
        new Action('div', 2, @, Element, $.v, $.n1)
        new Action('div', 3, @, Element, $.v, $.n1)
      ]
  run: ->
    roots.execute_raw('html', Html, @n)


test 'manual -inside',
  before: ->
    $ = @
    @n = ->
      n = ->
        n = ->
          n = -> []
          return [
            new Action('section', 1, @, Element, $.v, n)
            new Action('section', 2, @, Element, $.v, n)
          ]
        return [
          new Action('article', 1, @, Element, $.v, n)
          new Action('article', 2, @, Element, $.v, n)
          new Action('article', 3, @, Element, $.v, n)
        ]
      return [
        new Action('div', 1, @, Element, $.v, n)
        new Action('div', 2, @, Element, $.v, n)
        new Action('div', 3, @, Element, $.v, n)
      ]
  run: ->
    roots.execute_raw('html', Html, @n)


test 'auto',
  before: ->
    @root = require 'dom:30x div + article + section'
  run: ->
    @root()



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


test 'manual',
  before: ->
    $ = @
    @n = ->
      return [
        new Action('div', 1, @, Element, $.v1, $.n0)
        new Action('div', 2, @, Element, $.v2, $.n0)
        new Action('div', 3, @, Element, $.v3, $.n0)
      ]
  run: ->
    roots.execute_raw('html', Html, @n)


test 'auto',
  before: ->
    @root = require 'dom:3x div + text'
  run: ->
    @root()



#
#--------------- DIV + ATTRIBUTES - 1x1x3
#
group '1x div + 3x attributes',
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


test 'manual',
  before: ->
    $ = @
    @n1 = ->
      return [
        new Action('title', 1, @, Attr, $.v1, $.n0)
        new Action('lang', 2, @, Attr, $.v2, $.n0)
        new Action('draggable', 3, @, Attr, $.v3, $.n0)
      ]
    @n = ->
      return [
        new Action('div', 1, @, Element, $.v, $.n1)
      ]
  run: ->
    roots.execute_raw('html', Html, @n)


test 'auto',
  before: ->
    @root = require 'dom:1x div + 3x attributes'
  run: ->
    @root()



#
#--------------- DIVS + ATTRIBUTE - 1x3x1
#
group '3x div + 1x attribute',
  before: ->
    @v1 = -> 'title'

test 'native',
  run: ->
    p = document.createElement('div')
    for i in [0..2]
      n = document.createElement('div')
      n.setAttribute('title', 'title')
      p.appendChild(n)


test 'manual',
  before: ->
    $ = @
    @n1 = ->
      return [
        new Action('title', 1, @, Attr, $.v1, $.n0)
      ]
    @n = ->
      return [
        new Action('div', 1, @, Element, $.v, $.n1)
        new Action('div', 2, @, Element, $.v, $.n1)
        new Action('div', 3, @, Element, $.v, $.n1)
      ]
  run: ->
    roots.execute_raw('html', Html, @n)

test 'auto',
  before: ->
    @root = require 'dom:3x div + 1x attribute'
  run: ->
    @root()



#
#--------------- DIV + STYLES - 1x1x3
#
group '1x div + 3x styles',
  before: ->
    @v1 = -> 'red'
    @v2 = -> 'solid 1px gold'
    @v3 = -> 'gray'

test 'native',
  run: ->
    p = document.createElement('div')
    n = document.createElement('div')
    n.style.color = 'red'
    n.style.border = 'solid 1px gold'
    n.style.background = 'gray'
    p.appendChild(n)

test 'manual',
  before: ->
    $ = @
    @n1 = ->
      return [
        new Action('color', 1, @, Style, $.v1, $.n0)
        new Action('border', 2, @, Style, $.v2, $.n0)
        new Action('background', 3, @, Style, $.v3, $.n0)
      ]
    @n = ->
      return [
        new Action('div', 1, @, Element, $.v, $.n1)
      ]
  run: ->
    roots.execute_raw('html', Html, @n)

test 'auto',
  before: ->
    @root = require 'dom:1x div + 3x styles'
  run: ->
    @root()



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


test 'manual',
  before: ->
    $ = @
    @n1 = ->
      return [
        new Action('color', 1, @, Style, $.v1, $.n0)
      ]
    @n = ->
      return [
        new Action('div', 1, @, Element, $.v, $.n1)
        new Action('div', 2, @, Element, $.v, $.n1)
        new Action('div', 3, @, Element, $.v, $.n1)
      ]
  run: ->
    roots.execute_raw('html', Html, @n)

test 'auto',
  before: ->
    @root = require 'dom:3x div + 1x style'
  run: ->
    @root()


#
#--------------- DIVS + TAGS - 1x1x3
#
group '1x div + 3x tags',
  before: ->
    @v1 = -> 'header'
    @v2 = -> 'content'
    @v3 = -> 'footer'


test 'native',
  run: ->
    p = document.createElement('div')
    n = document.createElement('div')
    n.className  = 'header '
    n.className += 'content '
    n.className += 'footer'
    p.appendChild(n)

test 'manual',
  before: ->
    $ = @
    @n1 = ->
      return [
        new Action('tag', 1, @, Tag, $.v1, $.n0)
        new Action('tag', 2, @, Tag, $.v2, $.n0)
        new Action('tag', 3, @, Tag, $.v3, $.n0)
      ]
    @n = ->
      return [
        new Action('div', 1, @, Element, $.v, $.n1)
      ]
  run: ->
    roots.execute_raw('html', Html, @n)

test 'auto',
  before: ->
    @root = require 'dom:1x div + 3x tags'
  run: ->
    @root()

