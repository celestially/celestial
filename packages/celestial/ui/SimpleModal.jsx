var LinkedStateMixin = React.addons.LinkedStateMixin;

SimpleModal = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState() {
    return {
      textarea: false,
    }
  },

  renderVal() {
    if (this.state.textarea) {
      return <textarea value={this.props.value} />
    } else {
      return <pre>{this.props.value}</pre>
    }
  },

  render() {
    return (
      <div>
        <a href={'#openModal' + this.props.name}>{this.props.label}</a>
        <div id={'openModal' + this.props.name} className="modalDialog">
          <div><a href="#close" title="Close" className="close">X</a>
            <input type="checkbox"
                   checkedLink={this.linkState('textarea')} />
            {this.renderVal()}
          </div>
        </div>
      </div>
    );
  }
});

