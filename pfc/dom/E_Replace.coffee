group '/dom.replace'


group 'small',
  before: ->
    @html = '<div></div><span>text node</span><a></a>'
    @arr = dom.create_html(@html)

#
# This test case uses DOM approach without any elements caching.
#
test 'naive'
  run: ->
    @arr = []
    @arr[0] = document.createElement('div')
    @arr[1] = document.createElement('span')
    @arr[2] = document.createElement('a')

    @arr[1].appendChild(document.createTextNode('text node'))
    @stub.appendChild(e) for e in @arr
    @stub = dom.replace_html(@stub)

test 'naive -cached',
  run: ->
    @stub.appendChild(e.cloneNode(true)) for e in @arr
    @stub = dom.replace_html(@stub)

test 'fragment -cached',
  run: ->
    frag = document.createDocumentFragment()
    frag.appendChild(e) for e in @arr

    @stub.appendChild(frag.cloneNode(true))
    @stub = dom.replace_html(@stub)

test 'inner_html',
  run: ->
    @stub.innerHTML = @html
    @stub.innerHTML = ''

test 'replace_html',
  run: ->
    @stub = dom.replace_html(@stub, @html)


group 'flat',
  before: ->
    @html = '<a>A</a><a>B</a><a>C</a><a>D</a><a>E</a><a>F</a><a>G</a><a>H</a><a>I</a><a>J</a><a>K</a>
             <a>L</a><a>M</a><a>N</a><a>O</a><a>P</a><a>R</a><a>S</a><a>T</a><a>U</a><a>W</a><a>X</a>
             <a>Y</a><a>Z</a><a>_</a>'
    @arr = dom.create_html(@html)

#
# This test case uses DOM approach without any elements caching.
#
test 'naive',
  run: ->
    for _ in [1..25]
      a = document.createElement('a')
      a.appendChild(document.createTextNode('A'))
      @stub.appendChild(a)
    @stub = dom.replace_html(@stub)

#
# This test case uses wrong order when appending children.
#
test 'naive -bad',
  run: ->
    for _ in [1..25]
      a = document.createElement('a')
      @stub.appendChild(a)
      a.appendChild(document.createTextNode('A'))
    @stub = dom.replace_html(@stub)

repeat 'small'


group 'deep',
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

#
# This test case uses DOM approach without any elements caching.
#
test 'naive',
  run: ->
    for _i in [0..1]
      div_0 = document.createElement('div')
      div_1 = document.createElement('div')
      div_2 = document.createElement('div')
      for _j in [0..2]
        p = document.createElement('p')
        a = document.createElement('a')
        s = document.createElement('span')

        dom.append_text(s, 'text node')
        a.appendChild(s)
        p.appendChild(a)
        div_2.appendChild(p)

      div_1.appendChild(div_2)
      div_0.appendChild(div_1)
      @stub.appendChild(div_0)

    @stub = dom.replace_html(@stub)

#
# This test case uses wrong order when appending children.
#
test 'naive -bad',
  run: ->
    for _i in [0..1]
      div_0 = document.createElement('div')
      div_1 = document.createElement('div')
      div_2 = document.createElement('div')

      @stub.appendChild(div_0)
      div_0.appendChild(div_1)
      div_1.appendChild(div_2)

      for _j in [0..2]
        p = document.createElement('p')
        a = document.createElement('a')
        s = document.createElement('span')

        div_2.appendChild(p)
        p.appendChild(a)
        a.appendChild(s)
        dom.append_text(s, 'text node')

    @stub = dom.replace_html(@stub)

repeat 'small'
