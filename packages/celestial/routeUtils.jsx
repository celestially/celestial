celestial.createRoutes = function(module) {
  return module.routes.map(route => {
    //console.log('celestial route: ' + JSON.stringify(route));
    return <Route path={'/' +module.name + route.path}
                  layout={module.layout}
                  content={celestial.ItemWrapper(route.content, route.name, module, route.docKey)}
    />
  })

}