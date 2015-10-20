getNavItems = function(id, section, schema, objs) {
  const navs = objs.map(route => {
    let item
    //console.log('NI section: ' + section);
    //console.log('NI route.name: ' + route.name);
    //console.log('NI schema.singularName: ' + schema.singularName);
    if (section == route.name) {
      item = (<div className='col-xs-3 orange'>
        {section}
      </div>)

    } else {
      item = (<div className='col-xs-3'>
        <a href={'/' + schema.singularName + '/' + id + '/' + route.name}>
          {route.name}</a>
      </div>)
    }
    console.log('NI route: ' + JSON.stringify(route));
    return item;
  })
  return <div>
    <div className='row'>
      {navs}
    </div>
    <hr />
  </div>
}
