
function withAudit(Component) {
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
        <Component item={this.data.item} collection={Audits} {...this.props} />
      </div>
    }
  })
};

function renderForm(schema, section) {
  return React.createClass({
    render() {
      console.log('section: ' + section);
      return <div>
        <AuditNavbar section={section} />
        <AuditInput schema={schema} {...this.props} />
        </div>
    }
  })
};


Reaktor.init(
  <Router>
    <Route path="/audits"
           layout={Layout2}
           content={AuditList}/>
    <Route path="/audit/:id"
           layout={Layout2}
           content={AuditInput}/>
    <Route path="/audit/:id/MD"
           layout={Layout2}
           content={renderForm(AuditDataMDSchema, 'MD')}/>
    <Route path="/audit/DC"
           layout={Layout2}
           content={renderForm(AuditDataDCSchema)}/>
    <Route path="/audit/report"
           layout={Layout2}
           content={withAudit(AuditRecommendations)}/>
  </Router>
);
