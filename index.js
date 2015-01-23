
/**
 * Expose `Delegator`.
 */

module.exports = Delegator;

/**
 * Initialize a delegator.
 *
 * @param {Object} proto
 * @param {String} target
 * @api public
 */

function Delegator(proto, target) {
  if (!(this instanceof Delegator)) return new Delegator(proto, target);
  this.proto = proto;
  this.target = target;
  this.methods = [];
  this.getters = [];
  this.setters = [];
  this.fluents = [];
}

/**
 * Delegate method `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.method = function(name){
  var proto = this.proto;
  var target = this.target;
  this.methods.push(name);

  proto[name] = new Function(
    "return this" + dot(target) + dot(name) + ".apply(this" + dot(target) + ", arguments);"
  );

  return this;
};

/**
 * Delegator accessor `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.access = function(name){
  return this.getter(name).setter(name);
};

/**
 * Delegator getter `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.getter = function(name){
  var proto = this.proto;
  var target = this.target;
  this.getters.push(name);

  proto.__defineGetter__(name, new Function(
    "return this" + dot(target) + dot(name) +";"
  ));

  return this;
};

/**
 * Delegator setter `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.setter = function(name){
  var proto = this.proto;
  var target = this.target;
  this.setters.push(name);

  proto.__defineSetter__(name, new Function('val',
    "return this" + dot(target) + dot(name) + "= val;"
  ));

  return this;
};

/**
 * Delegator fluent accessor
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.fluent = function (name) {
  var proto = this.proto;
  var target = this.target;
  this.fluents.push(name);

  proto[name] = new Function('val',
    "if ('undefined' != typeof val) {" +
      "this" + dot(target) + dot(name) + " = val;" +
      "return this;" +
    "} else {" +
      "return this" + dot(target) + dot(name) + ";" +
    "}"
  );

  return this;
};

function requiresBoxNotation(propName){
  if( propName.indexOf('.') !== -1 ) return true;
  if( propName.indexOf('"') !== -1 ) return true;
  if( propName.indexOf('\'') !== -1 ) return true;
  return false;
}

function dot(propName){
  if(requiresBoxNotation(propName)){
    propName = propName.replace('"','\\"');
    return '["' + propName + '"]';
  }

  return '.' + propName;
}