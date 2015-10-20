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
        item: Audits.findOne({ _id: this.props.params.id })
        //item: Audits.findOne()
      };
    },

    render() {
      if (! this.data.item) {
        return <div>404: Not found</div>;
      }

      console.log('this.data.item: ' + JSON.stringify(this.data.item));

      return <div>
        {getNavItems(this.props.params.id, section, AuditSchema, objs, this.data.item)}

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
  ['path', 'name', 'content', 'label'],
  ['/:id/Main', 'Main', renderForm(AuditMainSchema)],
  ['/:id/MD', 'MD', renderForm(AuditDataMDSchema), 'MD Data'],
  ['/:id/DC', 'DC', renderForm(AuditDataDCSchema)],
  ['/:id/ReportSections', 'ReportSections', AuditReport],
  ['/:id/ReportPreview', 'ReportPreview', ReportComponent],
];

const objs = convertToArrayOfObjects(auditRoutes);

const routes = objs.map(route => {
  console.log('route: ' + JSON.stringify(route));
  //console.log('route.c: ' + route.content);
  console.log('route.n: ' + route.name);
  return <Route path={'/audit' + route.path}
                layout={Layout2}
                content={withAudit(route.content,route.name)}
    />
})

Reaktor.init(
  <Router>
    {routes}
  </Router>);

