Audits = new Mongo.Collection('audit');

const schemas = [
  ["Maryland", AuditDataMDSchema],
  ["DC", AuditDataDCSchema]
];

AuditInput = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      schema: schemas[0]
    }
  },

  getMeteorData() {
    console.log('id: ' + this.props.params.slug)
    return {
      item: Audits.findOne({ _id: this.props.params.slug })
    };
  },

  render() {
    if (! this.data.item) {
      return <div>404: Not found</div>;
    }
    var schemaLinks = schemas.map( it => {
      return <a href='#'>{it[0]}</a>
    })

    var sects = Object.keys(AuditDataMDSchema).map( i => {
      return <div key={i}>
        <h2>{i}</h2>
        <InputTable collection={Audits} fields={AuditDataMDSchema[i]} section={i} />
      </div>
    })

    return <div>
      <a href='#'>Foo</a>
      schema: {this.state.schema[0]}
      {schemaLinks}
      Audit: {this.data.item.title}
      {sects}

    </div>;
  }
});

InputTable = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      item: this.props.collection.findOne()
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
      return <tr key={field}>
        <td className="meta-head">{field}</td>
        <td><textarea name={field} onChange={this.handleChange} value={this.data.item[this.props.section] [field]}></textarea></td>
      </tr>;
    })
    return <table id="meta">
      <tbody>
      {rows}
      </tbody></table>;
  }

});

