group '/view.new_create'

test ' 4 actions: 1x3',
  before: ->
    @root = require 'create:1x3'
  run: ->
    @root()

test ' 4 actions: 1x1x1x1',
  before: ->
    @root = require 'create:1x1x1x1'
  run: ->
    @root()

test ' 6 actions: 1x5',
  before: ->
    @root = require 'create:1x5'
  run: ->
    @root()

test ' 7 actions: 1x3x1',
  before: ->
    @root = require 'create:1x3x1'
  run: ->
    @root()

test ' 7 actions: 1x2x1x1',
  before: ->
    @root = require 'create:1x2x1x1'
  run: ->
    @root()

test '10 actions: 1x3x2',
  before: ->
    @root = require 'create:1x3x2'
  run: ->
    @root()

