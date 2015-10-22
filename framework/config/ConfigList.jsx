ConfigList = React.createClass({

  newModule() {
    Schemas.insert({
      name: "New Module",
      _meta: {
        class: 'module',
        schema: ['name', 'routes_input']
      }
    });
  },

  render() {
    console.log('confList: ');
    return <ItemList Collection={Schemas} module="config" >
      <input type='button'
             onClick={this.newModule}
             value='Create New Module'/>
    </ItemList>
  }
});


