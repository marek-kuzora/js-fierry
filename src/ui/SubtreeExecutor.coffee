rtm.register_executor 'dj.subtree'
  services:
    uid: 'uid.registry'

  run: (req) ->
    console.log 'processed', req
