//TODO: this module doesn't work yet

Schemas = new Mongo.Collection('schema');

//<NavLink href="/schema/:id/NewSchemaKey"
//         label='New Key' {...this.props} />

SchemaLayout = React.createClass({
  render() {
    //const keys = Object.keys(this.props.item);
    //{keys.map(key => {
    //  <a href='#'>key</a>
    //  })}
    return (
      <div>
        <TopNav/>
        <div className='row'>
          <div className='col-xs-3'>
            <div className='reportSections orange'>
              Key List
            </div>
          </div>
          <div className='col-xs-9'>
            {this.props.content}
          </div>
        </div>
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

