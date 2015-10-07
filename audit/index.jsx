Audits = new Mongo.Collection('audit');

AuditInput = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      item: Audits.findOne({ slug: this.props.params.slug })
    };
  },

  renderInputTable() {
    return <table id="meta">
      <tbody>
      <tr>
      <td class="meta-head">Invoice #</td>
      <td><textarea>000123</textarea></td>
      </tr>
      </tbody></table>;
  },

  render() {
    if (! this.data.item) {
      return <div>404: Not found</div>;
    }
    var sects = Object.keys(AuditDataMDSchema).map( i => {
      return <AuditInputTable fields={AuditDataMDSchema[i]} section={i} />
    })

      return <div>
      Audit: {this.data.item.title}
        {sects}

    </div>;
  }
});

AuditInputTable = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      item: Audits.findOne()
    };
  },

  handleChange(e) {
    console.log('change: ' + e.target.name + ", " + e.target.value);
    var obj = {}
    obj[this.props.section + "." + e.target.name] = e.target.value
    Audits.update(this.data.item._id, {"$set" : obj})
  },

  render() {
    var rows = this.props.fields.map((field) => {
      return <tr>
        <td className="meta-head">{field}</td>
        <td><textarea name={field} onChange={this.handleChange} value={this.data.item[this.props.section + "." + field]}></textarea></td>
      </tr>;
    })
    return <table id="meta">
      <tbody>
      {rows}
      </tbody></table>;
  }

});

