
var assert = require('assert');

try {
  var delegate = require('..');
} catch (e) {
  var delegate = require('delegates');
}


describe('.method(name)', function(){
  it('should delegate methods', function(){
    var obj = {};

    obj.request = {
      foo: function(bar){
        assert(this == obj.request);
        return bar;
      }
    };

    delegate(obj, 'request').method('foo');
    assert('something' == obj.foo('something'));
  })

  it('should not error out when there is no target', function(){
    var obj = {};

    delegate(obj, 'request').method('foo');

    try {
      obj.foo('whatever');
    } catch (e) {
      assert(null == e);
    }

  });
})

describe('.getter(name)', function(){
  it('should delegate getters', function(){
    var obj = {};

    obj.request = {
      get type() {
        return 'text/html';
      }
    }

    delegate(obj, 'request').getter('type');
    assert('text/html' == obj.type);
  })

  it('should not error out when there is no target', function(){
    var obj = {};
    delegate(obj, 'request').getter('type');

    try {
      assert(undefined == obj.type);
    } catch (e) {
      assert(null == e);
    }

  });
})

describe('.setter(name)', function(){
  it('should delegate setters', function(){
    var obj = {};

    obj.request = {
      get type() {
        return this._type.toUpperCase();
      },

      set type(val) {
        this._type = val;
      }
    }

    delegate(obj, 'request').setter('type');

    obj.type = 'hey';
    assert('HEY' == obj.request.type);
  })

  it('should not error out when there is no target', function(){
    var obj = {};
    delegate(obj, 'request').setter('type');

    try {
      obj.type = 'hey';
      assert(undefined == obj.type);
      assert(undefined == obj.request);
    } catch (e) {
      assert(null == e);
    }

  });
})

describe('.access(name)', function(){
  it('should delegate getters and setters', function(){
    var obj = {};

    obj.request = {
      get type() {
        return this._type.toUpperCase();
      },

      set type(val) {
        this._type = val;
      }
    }

    delegate(obj, 'request').access('type');

    obj.type = 'hey';
    assert('HEY' == obj.type);
  })
})
