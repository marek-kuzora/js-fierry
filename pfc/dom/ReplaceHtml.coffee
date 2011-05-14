#
# Predefined test cases for 3 different test groups.
# TODO For now, these test cases prefer naive approach because all of the elements are already created :/
# I should probably build each element using createElement and append manualy??
#
naive_replace =
  name: 'naive'
  run: ->
    @stub.appendChild(e.cloneNode(true)) for e in @arr
    @stub.innerHTML = ''

fragment_replace =
  name: 'fragment'
  run: ->
    frag = document.createDocumentFragment()
    frag.appendChild(e) for e in @arr

    @stub.appendChild(frag.cloneNode(true))
    @stub.innerHTML = ''

inner_html_replace =
  name: 'inner_html'
  run: ->
    @stub.innerHTML = @html
    @stub.innerHTML = ''

mixed_html_replace =
  name: 'replace_html'
  run: ->
    @stub = dom.replace_html(@stub, @html)

group
  name: 'dom.replace.small'
  before: ->
    @html = '<div></div><span>text node</span><a href="www.example.com"></a>'
    @arr = dom.create_html(@html)

test naive_replace
test fragment_replace
test inner_html_replace
test mixed_html_replace

group
  name: 'dom.replace.flat'
  before: ->
    @html = '<a>A</a><a>B</a><a>C</a><a>D</a><a>E</a><a>F</a><a>G</a><a>H</a><a>I</a><a>J</a><a>K</a>
             <a>L</a><a>M</a><a>N</a><a>O</a><a>P</a><a>R</a><a>S</a><a>T</a><a>U</a><a>W</a><a>X</a>
             <a>Y</a><a>Z</a>'
    @arr = dom.create_html(@html)

test naive_replace
test fragment_replace
test inner_html_replace
test mixed_html_replace

group
  name: 'dom.replace.deep'
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

test naive_replace
test fragment_replace
test inner_html_replace
test mixed_html_replace

