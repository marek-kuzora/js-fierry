group '/dom.create'


#
# Basic tests for create versus clone element.
#
# Create is as fast as clone.
# Currently browser can create ~1500 elements in 1ms.
#
group 'basic'

test 'create',
  run: ->
    document.createElement('div')

test 'clone',
  before: ->
    @div = document.createElement('div')
  run: ->
    @div.cloneNode()

#
# Tests creating small number of elements.
#
group '5 elements',
  before: ->
    @html = '<div></div><span>text node</span><a></a>'
    @arr = dom.create_html(@html)


test 'naive',
  run: ->
    root = document.createElement('div')
    root.appendChild(e.cloneNode(true)) for e in @arr
    return

test 'fragment',
  run: ->
    root = document.createElement('div')
    frag = document.createDocumentFragment()
    
    frag.appendChild(e) for e in @arr
    root.appendChild(frag.cloneNode(true))
    return

#
# Currently the slowest method.
# It's good news, because I prefer the DOM method personally :)
#
test 'inner_html',
  run: ->
    root = document.createElement('div')
    root.innerHTML = @html

#
# Tests creating medium number of flat-range elements
# (not deeply nested).
#
group '30 elements -flat',
  before: ->
    @html = '''
            <a>A</a><a>B</a><a>C</a><a>D</a><a>E</a><a>F</a>
            <a>G</a><a>H</a><a>I</a><a>J</a><a>K</a><a>L</a>
            <a>M</a><a>N</a><a>O</a>
            '''
    @arr = dom.create_html(@html)

repeat '5 elements'


#
# Tests creating medium number of deeply nested elements.
#
group '30 elements -deep',
  before: ->
    @html = '''
            <div><div><div>
              <p><a><span>text node</span></a></p>
              <p><a><span>text node</span></a></p>
              <p><a><span>text node</span></a></p>
            </div></div></div>
            <div><div><div>
              <p><a><span>text node</span></a></p>
              <p><a><span>text node</span></a></p>
              <p><a><span>text node</span></a></p>
            </div></div></div>
            '''
    @arr = dom.create_html(@html)

repeat '5 elements'
