//var auditSection = FlowRouter.group({
//  prefix: "/admin"
//});
//
//auditSection.route('/', {
//  action: function() {
//    console.log('admin section')
//  }
//});


function withAudit(Component) {
  return React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
      console.log('id: ' + this.props.params.slug)
      return {
        //item: Audits.findOne({ _id: this.props.params.slug })
        item: Audits.findOne()
      };
    },

    render() {
      return <div>
      Ok
    <Component item={this.data.item} collection={Audits} {...this.props} />
    </div>
    }
  })
};

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
    <Route path="/audit"
           layout={Layout2}
           content={AuditList} />
    <Route path="/audit/main"
           layout={Layout2}
           content={AuditInput} />
    <Route path="/audit/MD"
           layout={Layout2}
           content={renderForm(AuditDataMDSchema)} />
    <Route path="/audit/DC"
           layout={Layout2}
           content={renderForm(AuditDataDCSchema)} />
    <Route path="/audit/report"
           layout={Layout2}
           content={withAudit(AuditRecommendations)} />
  </Router>
);
