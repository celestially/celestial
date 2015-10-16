//var auditSection = FlowRouter.group({
//  prefix: "/admin"
//});
//
//auditSection.route('/', {
//  action: function() {
//    console.log('admin section')
//  }
//});


Reaktor.init(
  <Router>
    <Route path="/a2" layout={Layout2} content={AuditList} />
    <Route path="/a2/audit2" layout={Layout2} content={AuditList} />
  </Router>
);
