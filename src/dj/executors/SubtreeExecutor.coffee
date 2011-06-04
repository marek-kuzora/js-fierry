rtm.register_executor 'dj.subtree'
  services:
    uid:     'dj.uid'
    actions: 'dj.actions'

  # Ok, potrzebowalbym tutaj wykonac pelne przetwarzanie :) Na pewno musze miec moj obiekt z attrs wy-ewaluowanymi i bede musial budowac dzieci jesli akcja ich nie zdefiniowala! :O
  # 

  # Chyba duzo prosciej bedzie pisac w object-oriented actions. Wlasciwie standardowy schemat juz mam - powstal kiedys juz...
  run: (req) ->
    console.log 'processed', req
