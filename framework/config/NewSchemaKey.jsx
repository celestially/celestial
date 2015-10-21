var LinkedStateMixin = React.addons.LinkedStateMixin;

NewSchemaKey = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {key: 'Hello'};
  },

  doSubmit() {
    let key = this.state.key;
    console.log('key: ' + key);
  },

  render() {
    return (
      <div>
          <input type="text" valueLink={this.linkState('key')}/>
          <button onClick={this.doSubmit}>Add Key</button>
      </div>
    );
  }
})