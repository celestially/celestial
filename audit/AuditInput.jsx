Audits = new Mongo.Collection('audit');


AuditInput = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    console.log('id: ' + this.props.params.slug)
    return {
      //item: Audits.findOne({ _id: this.props.params.slug })
      item: Audits.findOne()
    };
  },

  render() {
    if (! this.data.item) {
      return <div>404: Not found</div>;
    }
    //var schemaLinks = schemas.map( it => {
    //  return <a href='#'>{it[0]}</a>
    //})

    console.log('schema: ' +JSON.stringify(this.props.schema,2));
    var sects = Object.keys(this.props.schema).map( i => {
      return <div key={i}>
        <h2>{i}</h2>
        <InputTable collection={Audits} fields={this.props.schema[i]} section={i} />
      </div>
    })

    return <div>
      <a href='#'>Foo</a>
      Audit: {this.data.item.title}
      {sects}

    </div>;
  }
});



