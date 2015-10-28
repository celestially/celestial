celestial.getNavItems = function (id_old, section, schema, objs, item) {

  const id = item._id;
  const navs = objs.map(route => {
    //console.log('NI route: ' + JSON.stringify(route));
    let item
    let label = route.label || route.name;
    if (section == route.name) {
      item = (<div className='nav-cell orange'>
        {label}
      </div>)

    } else {
      item = (<div className='nav-cell'>
        <a href={'/' + schema.name + '/' + id + '/' + route.name}>
          {label}</a>
      </div>)
    }
    return item;
  })

  return <div>
    <div className='row'>
      {navs}
      <div className='nav-cell'>
        <SimpleModal name='Structure' label='Structure'
                     value={JSON.stringify(item, null, 4)}/>
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

