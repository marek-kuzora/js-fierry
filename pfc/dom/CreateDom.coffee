#
# In realu usage naive DOM or replaceHTML seems be the most promising.
#
group
  name: 'dom.create'
  before: ->
    @stub = document.getElementById('stub')
  after: ->
    @stub.innerHTML = ''

group
  name: 'dom.create.flat'
  before: ->
    @divs = (document.createElement('div') for i in [0..9])
    @stub.appendChild(div) for div in @divs

    @arr = [
      document.createElement('div')
      document.createElement('span')
      document.createElement('a')
    ]
    @html = '<div></div><span></span><a></a>'

test
  name: 'naive'
  run: ->
    for div in @divs
      div.appendChild(el.cloneNode(true)) for el in @arr
      div.innerHTML = ''

test
  name: 'fragment'
  run: ->
    frag = document.createDocumentFragment()
    frag.appendChild(el) for el in @arr
    for div in @divs
      div.appendChild(frag.cloneNode(true))
      div.innerHTML = ''

test
  name: 'inner_html'
  run: ->
    for div in @divs
      div.innerHTML = @html
      div.innerHTML = ''

test
  name: 'replace_html'
  run: ->
    for i in [0..9]
      n_div = @divs[i].cloneNode(false)
      n_div.innerHTML = @html
      @stub.replaceChild(n_div, @divs[i])
      @divs[i] = n_div

#
# Adding big structure to a div shows huge performance gain for replaceHTML.
# Other methods are about 20x slower!
#
group
  name: 'dom.create.deep'
  before: ->
    @div = document.createElement('div')
    @stub.appendChild(@div)

    # Need to have better structure here? About 20 elems and deep inside - 2-3 levels deep?
    @arr = (for i in [0..24]
      span = document.createElement('span')
      span.appendChild(document.createTextNode('Blablabla'))
    )
    @html = ('<span>Blablabla</span>' for i in [0..24]).join('')

test
  name: 'naive'
  run: ->
    @div.appendChild(el.cloneNode(true)) for el in @arr
    @div.innerHTML = ''

test
  name: 'fragment'
  run: ->
    frag = document.createDocumentFragment()
    frag.appendChild(el) for el in @arr

    @div.appendChild(frag.cloneNode(true))
    @div.innerHTML = ''

test
  name: 'fragment -before'
  before: ->
    @frag = document.createDocumentFragment()
    @frag.appendChild(el) for el in @arr
  run: ->
    @div.appendChild(@frag.cloneNode(true))
    @div.innerHTML = ''


test
  name: 'inner_html'
  run: ->
    @div.innerHTML = @html
    @div.innerHTML = ''

test
  name: 'replace_html'
  run: ->
    n_div = @div.cloneNode(false)
    @stub.replaceChild(n_div, @div)
    @div = n_div

group:
  name: 'dom.create.5x10x10'
  before: ->
    @divs = (document.createElement('div') for i in [0..4])
    @stub.appendChild(div) for div in @divs
