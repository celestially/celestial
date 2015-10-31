
//var _ = require('lodash');
//var React = require('react');
//var Tether = require('tether-browserify/tether');


// NOTE: This is not a React component. It's a plain JS object that manages a React component.

TetheredElement = function(reactComponent, tetherOptions) {
  this.reactComponent = reactComponent;

  this.domNode = document.createElement('div');
  this.domNode.style.position = 'absolute'; // needed for Tether
  document.body.appendChild(this.domNode);

  this.tether = new Tether(_.merge({
    element: this.domNode,
  }, tetherOptions));

  this.update();
}
TetheredElement.prototype.update = function () {
  React.render(
    this.reactComponent,
    this.domNode,
    () => this.tether.position()
  );
};
TetheredElement.prototype.destroy = function () {
  React.unmountComponentAtNode(this.domNode);
  this.domNode.parentNode.removeChild(this.domNode);
  this.tether.destroy();
};

//module.exports = TetheredElement;