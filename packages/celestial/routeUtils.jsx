Celestial.initModule = function(module) {

  if (!module.routes) {
    module.routes = []
    if (module.schemas) {
      module.schemas.forEach( (schema,i) => {
        const name = (i == 0) ? 'main' : schema
        route = {
          path: '/:id/' + name,
          name: name,
          content: JSONViewWrapper(ItemInput),
          label: schema,
          docKey: schema
        }
        module.routes.push(route)
      })
    }
  }
  //let routes2 = []
  if (module.listRoute) {
    var r = {}
    r.path = '/' + module.listRoute
    r.name = module.listRoute
    r.content = Celestial.getListComponent(module)
    r.label = "List " + module.pluralName
    r.listRoute = true
    //routes2.push(r)
  }
  console.log('listRoute: ' + JSON.stringify(r));
  //routes2.push(module.routes)
  module.routes.unshift(r)
  console.log('module.routes: ' + JSON.stringify(module.routes));
  //routes.push(Celestial.createRoutes(module))

  Reaktor.init(
    <Router>
      {Celestial.createRoutes(module)}
    </Router>);

  Celestial.modules[module.name] = module
}


Celestial.createListRoute = function(module) {
  return module.listRoute && <Route path={'/' + module.name + module.listRoute}
                                    layout={module.layout}
                                    content={Celestial.getListComponent(module)} />
}

Celestial.getListComponent = function(module) {
  return React.createClass({
    render() {
      //console.log('getListComponent: ' + JSON.stringify(module.collection));
      //console.log('Customers: ' + Customers);
      return <ItemList module={module} itemFactory={module.itemFactory} renderNav={false} />
    }
  })
}

Celestial.createRoutes = function(module) {
  return module.routes.map(r => {
    const c = r.listRoute
      ? r.content
      : Celestial.ItemWrapper(r.content, r.name, module, r.docKey, r)
    console.log('add route: ' + module.name + ', ' + JSON.stringify(r));
    //console.log('Celestial route: ' + JSON.stringify(route));
    return <Route path={'/' +module.name + r.path}
                  layout={module.layout}
                  content={c}
    />
  })
}

