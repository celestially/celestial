//function auditNav(Component, section) {
//  return React.createClass({
//    render() {
//      console.log('section: ' + section);
//      return <div>
//        <AuditNavbar section={section}/>
//        <Component {...this.props} />
//      </div>
//    }
//  })
//}

function withAudit(Component, section) {
  return React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
      console.log('id: ' + this.props.params.id)
      return {
        //item: Audits.findOne({ _id: this.props.params.slug })
        item: Audits.findOne()
      };
    },

    render() {
      return <div>
        {getNavItems(this.props.params.id, section, AuditSchema, objs)}
        <Component item={this.data.item} collection={Audits} {...this.props} />
      </div>
    }
  })
}

function renderForm(schema, section) {
  return React.createClass({
    render() {
      console.log('section: ' + section);
      return <div>
        <AuditInput schema={schema} {...this.props} />
      </div>
    }
  })
}

const auditRoutes = [
  ['path', 'name', 'content'],
  ['/:id/main', 'main', withAudit(renderForm(AuditMainSchema), 'main')],
  ['/:id/MD', 'MD', withAudit(renderForm(AuditDataMDSchema), 'MD')],
  ['/:id/DC', 'DC', withAudit(renderForm(AuditDataDCSchema), 'DC')],
  ['/:id/report', 'report', withAudit(AuditReport, 'report')],
];

const objs = convertToArrayOfObjects(auditRoutes);

const routes = objs.map(route => {
  console.log('route: ' + JSON.stringify(route));
  //console.log('route.c: ' + route.content);
  console.log('route.n: ' + route.name);
  return <Route path={'/audit' + route.path}
                layout={Layout2}
                content={route.content}
    />
})

Reaktor.init(
  <Router>
    {routes}
    <Route path="/audit/list" layout={Layout2} content={AuditList}/>
  </Router>);

