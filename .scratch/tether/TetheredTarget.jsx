
//var _ = require('lodash');
//var React = require('react');

//var TetheredElement = require('./TetheredElement');

_ = lodash;

TetherTarget = React.createClass({
  propTypes: {
    tethered: React.PropTypes.node.isRequired,
    tetherOptions: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return {tooltipVisible: false};
  },
  componentDidMount: function () {
    var tetherOptions = _.merge({
      target: this.getDOMNode(),
    }, this.props.tetherOptions);
    this.tethered = new TetheredElement(this.props.tethered, tetherOptions);
  },
  componentWillUnmount: function () {
    this.tethered.destroy();
  },
  componentDidUpdate: function () {
    this.tethered.update();
  },
  render: function () {
    var divProps = _.omit(this.props, ['tethered', 'tetherOptions']);
    return <div {... divProps }>
      { this.props.children }
    </div>;
  },
});

//module.exports = TetherTarget;