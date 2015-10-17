//var auditSection = FlowRouter.group({
//  prefix: "/admin"
//});
//
//auditSection.route('/', {
//  action: function() {
//    console.log('admin section')
//  }
//});


function renderForm(section) {
  return React.createClass({
    render() {
      console.log('section: ' + section);
      return <AuditInput schema={section} {...this.props} />
    }
  })
};



Reaktor.init(
  <Router>
    <Route path="/audit" layout={Layout2} content={AuditList} />
    <Route path="/audit/main" layout={Layout2} content={AuditInput} />
    <Route path="/audit/MD" layout={Layout2} content={renderForm(AuditDataMDSchema)} />
    <Route path="/audit/DC" layout={Layout2} content={renderForm(AuditDataDCSchema)} />
  </Router>
);
