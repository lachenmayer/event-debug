'use strict'

var assert = require('assert')
var util = require('util')
var EventEmitter = require('events').EventEmitter
var eventDebug = require('./')

var stdoutWrite = process.stdout.write
var emitter

// *****

process.stdout.write = function (chunk) {
  var line = chunk.toString().trim()
  assert.strictEqual(line, 'EventEmitter: foo')
  process.stdout.write = stdoutWrite
  stdoutWrite.apply(this, arguments)
}

emitter = new EventEmitter()
eventDebug(emitter)
emitter.emit('foo')

// *****

process.stdout.write = function (chunk) {
  var line = chunk.toString().trim()
  assert.strictEqual(line, 'MyEmitter: bar')
  process.stdout.write = stdoutWrite
  stdoutWrite.apply(this, arguments)
}

function MyEmitter () { EventEmitter.call(this) }
util.inherits(MyEmitter, EventEmitter)
emitter = new MyEmitter()
eventDebug(emitter)
emitter.emit('bar')

// *****

process.stdout.write = function (chunk) {
  var line = chunk.toString().trim()
  assert.strictEqual(line, 'Object: baz')
  process.stdout.write = stdoutWrite
  stdoutWrite.apply(this, arguments)
}

emitter = { emit: function () {} }
eventDebug(emitter)
emitter.emit('baz')

// *****

process.stdout.write = function () {
  assert(false)
  process.stdout.write = stdoutWrite
  stdoutWrite.apply(this, arguments)
}

eventDebug({})
eventDebug({ emit: 'foo' })
eventDebug(null)
eventDebug(undefined)
eventDebug(1)
eventDebug(NaN)
eventDebug(true)
eventDebug('foo')
eventDebug()
