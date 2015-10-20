
AuditInput = React.createClass({

  render() {
    if (! this.props.item) {
      return <div>404: Not found</div>;
    }
    //console.log('schema: ' +JSON.stringify(this.props.schema,2));
    var sects = Object.keys(this.props.schema).map( i => {
      return <div key={i}>
        <h2>{i}</h2>
        <InputTable collection={Audits} fields={this.props.schema[i]} section={i} />
      </div>
    })

    return <div>
      {sects}
    </div>;
  }
});



