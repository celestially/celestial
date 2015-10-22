
withSchema = function(Component, section) {
  return React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
      //console.log('id: ' + this.props.params.id)
      return {
        item: Schemas.findOne({ _id: this.props.params.id })
        //item: Schemas.findOne()
      };
    },

    render() {
      if (! this.data.item) {
        return <div>404: Not found</div>;
      }
      return <div>
        <Component item={this.data.item} collection={Schemas} {...this.props} />
      </div>
    }
  })
}

//configList = function() {
//  return React.createClass({
//    render() {
//      console.log('renderList: ');
//      return <ItemList Collection={Schemas} module="config" >
//    }
//  })
//}


const codeGenRoutes = [
  ['path', 'name', 'content', 'label'],
  ['/:id/main', 'main', ConfigEditor],
  ['/:id/SchemaInput', 'SchemaInput', SchemaInput],
];

const objs = convertToArrayOfObjects(codeGenRoutes);

const routes = objs.map(route => {
  console.log('config route: ' + JSON.stringify(route));
  //console.log('route.c: ' + route.content);
  //console.log('route.n: ' + route.name);
  return <Route path={'/config' + route.path}
                layout={SchemaLayout}
                content={withSchema(route.content,route.name)}
    />
})

Reaktor.init(
  <Router>
    {routes}
    <Route path="/config" layout={SchemaLayout} content={ConfigList}/>
    <Route path="/config/report" layout={SchemaLayout} content={withSchema(ConfigEditor)}/>
  </Router>);

