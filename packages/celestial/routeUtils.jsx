celestial.initApp = function(module) {

  //let routes2 = []
  if (module.listRoute) {
    var r = {}
    r.path = '/' + module.listRoute
    r.name = module.listRoute
    r.content = celestial.getListComponent(module)
    r.label = "List Tasks"
    r.listRoute = true
    //routes2.push(r)
  }
  //routes2.push(module.routes)
  module.routes.unshift(r)
  console.log('module.routes: ' + JSON.stringify(module.routes));
  //routes.push(celestial.createRoutes(module))

  Reaktor.init(
    <Router>
      {celestial.createRoutes(module)}
    </Router>);

  celestial.modules[module.name] = module
}


celestial.createListRoute = function(module) {
  return module.listRoute && <Route path={'/' + module.name + module.listRoute}
                                    layout={module.layout}
                                    content={celestial.getListComponent(module)} />
}

celestial.getListComponent = function(module) {
  return React.createClass({
    render() {
      //console.log('getListComponent: ' + JSON.stringify(module.collection));
      //console.log('Customers: ' + Customers);
      return <ItemList module={module} itemFactory={module.itemFactory} renderNav='true'/>
    }
  })
}

celestial.createRoutes = function(module) {
  return module.routes.map(r => {
    const c = r.listRoute
      ? r.content
      : celestial.ItemWrapper(r.content, r.name, module, r.docKey, r)
    console.log('add route: ' + JSON.stringify(r));
    //console.log('celestial route: ' + JSON.stringify(route));
    return <Route path={'/' +module.name + r.path}
                  layout={module.layout}
                  content={c}
    />
  })
}

