class core.Dom

  #
  # Returns element with the given id.
  # @param String id
  #
  $: (id) ->
    return document.getElementById(id)

  #
  # Replace innerHTML of the given element.
  # @param HTMLElement e
  # @param String html
  #
  replace_html: (e, html) ->
    n = e.cloneNode(false)
    n.innerHTML = html if html

    e.parentNode.replaceChild(n, e)
    return n

  #
  # Creates HTMLElement(s) from the given string.
  # @param String html
  #
  create_html: (html) ->
    div = document.createElement('div')
    div.innerHTML = html

    nodes = array.to_array(div.childNodes)
    return nodes[0] if nodes.length is 1
    return nodes

  append_text: (e, text) ->
    e.appendChild(document.createTextNode(text))
