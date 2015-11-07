celestial.getNavItems = function (section, module, id, theItem) {

  //const id = item._id;
  const navs = module.routes.map(route => {
    //console.log('NI route: ' + JSON.stringify(route));
    let item
    let label = route.label || route.name;
    if (section == route.name) {
      item = (<div className='nav-cell orange'>
        {label}
      </div>)

    } else {
      idPart = route.listRoute ? '' : id + '/'
      item = (<div className='nav-cell'>
        <a href={'/' + module.name + '/' + idPart + route.name}>
          {label}</a>
      </div>)
    }
    return item;
  })


  return <div>
    <div className='row'>
      {navs}
        <div className='nav-cell'>
        <SimpleModal name='Structure' label='JSON'
      value={JSON.stringify(theItem, null, 4)}/>
      </div>
    </div>
    <hr />
  </div>
}

