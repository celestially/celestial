Schemas = new Mongo.Collection('schema');

SchemaLayout = React.createClass({
  render() {
    return (
      <div>
        <TopNav/>
        {this.props.content}
      </div>
    );
  }
});

SchemaSchema = {
  singularName: 'Schema',
  pluralName: 'Schemas',
  collection: Schemas,
  layout: SchemaLayout
}

