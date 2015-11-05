celestial.initApp = function(module) {
  Reaktor.init(
    <Router>
      {celestial.createRoutes(module)}
      {celestial.createListRoute(module)}
    </Router>);
}


celestial.createListRoute = function(module) {
  return module.listRoute && <Route path={'/' + module.name + module.listRoute}
                                    layout={module.layout}
                                    content={celestial.getListComponent(module)} />
}

celestial.createRoutes = function(module) {
  return module.routes.map(route => {
    //console.log('celestial route: ' + JSON.stringify(route));
    return <Route path={'/' +module.name + route.path}
                  layout={module.layout}
                  content={celestial.ItemWrapper(route.content, route.name, module, route.docKey, route)}
    />
  })
}