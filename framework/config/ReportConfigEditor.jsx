var LinkedStateMixin = React.addons.LinkedStateMixin;

ReportConfigEditor = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      //value: {}
    };
  },

  updateValue() {
    const selKey = this.props.selectedKey
    console.log('updateValue: ' + this.props.selectedKey);
    let obj = {}
    obj[selKey] = this.state
    Schemas.update(this.props.item._id, {"$set": obj})

  },

  renderForm() {
    let schema = ['section', 'code']
    let rows = schema.map((field) => {
      return <tr key={field}>
        <td className="meta-head">{field}</td>
        <td><textarea name={field} valueLink={this.linkState(field)} /></td>
      </tr>;
    })
    return <table id="meta">
      <tbody>
      {rows}
      </tbody></table>;
  },

  render() {
    if (this.props.selectedKey) {
      return <div>
        <div className='row'>
          {this.renderForm()}
          <textarea rows='25' cols='100'
                    valueLink={this.linkState('listInput')}/>
          <button onClick={this.updateValue}>Update Value</button>
        </div>
        <SimpleModal name='State' label='State'
                     value={JSON.stringify(this.state, null, 4)} />
      </div>
    } else {
      return <div>No key</div>
    }
  }

})