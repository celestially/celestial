getNavItems = function (id, section, schema, objs, item) {

  console.log('getNavItems: ' );
  const navs = objs.map(route => {
    console.log('NI route: ' + JSON.stringify(route));
    let item
    //console.log('NI section: ' + section);
    //console.log('NI route.name: ' + route.name);
    //console.log('NI schema.singularName: ' + schema.singularName);
    let label = route.label || route.name;
    if (section == route.name) {
      item = (<div className='nav-cell orange'>
        {label}
      </div>)

    } else {
      item = (<div className='nav-cell'>
        <a href={'/' + schema.singularName + '/' + id + '/' + route.name}>
          {label}</a>
      </div>)
    }
    return item;
  })

  return <div>
    <div className='row'>
      {navs}
      <div className='nav-cell'>
        <a href="#openModal">Structure View</a>
        <div id="openModal" className="modalDialog">
          <div><a href="#close" title="Close" className="close">X</a>
            <pre>{JSON.stringify(item, null, 4)}</pre>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>
}

NavLink = React.createClass({
  render() {
    let href;
    try {
      this.props.href.replace(':id',this.props.item._id);
    } catch(e) {href=''}

    return (
      <a href={href}>{this.props.label}</a>
    );
  }
});

